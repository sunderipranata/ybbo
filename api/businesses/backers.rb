require_relative '../../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin
    business_id = req.query['business_id'] || ""
    raise MissingParameterError, 'missing business_id' if business_id.blank?

    case req.request_method
    when "GET"
      limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
      offset = req.query['offset'].present? ? BSON::ObjectId(req.query['offset']).to_time : Time.now
      business = Business.find_by(id: business_id)
      backers = business.present? ? business.backers.where(:created_at.lte => offset).order_by(:created_at.desc).limit(limit) : nil

      res.status = HTTP_STATUS_OK
      res.body = JSON::Response::Data.many(backers, BusinessBackerSerializer, limit, res.status)
    when "POST"
      username = req.query['username']
      account_type = req.query['account_type'].to_sym
      business = Business.find_by(id: business_id)
      raise ResourceNotFoundError, 'business not found' if business.blank?
      backer = business.backers.new(username: username, account_type: account_type)
      backer.validate!
      business.backers << backer
      res.status = HTTP_STATUS_CREATED
      res.body = JSON::Response.message("backer successfully inserted", res.status)
    end
  rescue ResourceNotFoundError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_RESOURCE_NOT_FOUND, res.status)
  rescue MissingParameterError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_MISSING_REQUIRED_PARAMETER, res.status)
  rescue BSON::ObjectId::Invalid => e
    res.status = HTTP_STATUS_BAD_REQUEST
    res.body = JSON::Response.error("invalid business_id", INVALID_PARAMETER, res.status)
  rescue ActiveModel::ValidationError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, BUSINESS_VALIDATION_ERROR, res.status)
  end
end
