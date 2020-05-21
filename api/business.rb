require_relative '../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin
    case req.request_method
    when "GET"
      id = req.query['id'] || ""
      limit = req.query['limit'].present? ? req.query['limit'].to_i || 10
      offset = req.query['offset'].present? ? BSON::ObjectId(req.query['offset']).to_time : Time.now

      # TODO: add filter location?
      # location = req.query['location'].present? ? req.query['location'] : nil
      category = req.query['category'].present? ? req.query['category'] : nil

      if id.blank?
        if category.blank?
          business = Business.where(:created_at.lte => offset).order_by(:created_at.desc).limit(limit)
        else
          business = Business.where(category: /#{category.downcase}/, :created_at.lte => offset).order_by(:created_at.desc).limit(limit)
        end
        res.status = HTTP_STATUS_OK
        res.body = JSON::Response::Data.many(business, BusinessSimpleSerializer, limit, res.status)
      else
        business = Business.find_by(id: id)
        res.status = HTTP_STATUS_OK
        res.body = JSON::Response::Data.one(business, BusinessDetailSerializer, res.status)
      end
    when "POST"
      # do stuff authentication stuffs here
      # query parameter
      # Business.new(...).validate!

      # b = Business.create(...)
      # b.backers.create(...)
      # b.store_accounts.create(...)

      res.status = HTTP_STATUS_CREATED
      res.body = JSON::Response.message("unimplemented", res.status)
    end
  rescue Business::ValidationError => e
    res.status = 422
    res.body = JSON::Response.error(e.message, BUSINESS_VALIDATION_ERROR, res.status)
  end
end
