require_relative '../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin
    business_id = req.query['businessid'] || ""
    if business_id.blank?
      res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
      res.body = JSON::Response.error("missing business_id", MISSING_REQUIRED_PARAMETER, res.status)
      return
    end

    case req.request_method
    when "GET"
      limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
      offset = req.query['offset'].present? ? BSON::ObjectId(offset).to_time : Time.now
      business = Business.find_by(id: business_id)
      backers = business.present? ? business.backers.where(:created_at.lte => offset).order_by(:created_at.desc).limit(limit) : nil

      res.status = HTTP_STATUS_OK
      res.body = JSON::Response::Data.many(backers, BusinessBackerSerializer, limit, res.status)
    when "POST"
      res.status = HTTP_STATUS_CREATED
      res.body = JSON::Response.message("unimplemented", res.status)
    end
  rescue BSON::ObjectId::Invalid => e
    res.status = HTTP_STATUS_BAD_REQUEST
    res.body = JSON::Response.error("invalid business_id", INVALID_PARAMETER, res.status)
  rescue Business::ValidationError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, BUSINESS_VALIDATION_ERROR, res.status)
  end
end
