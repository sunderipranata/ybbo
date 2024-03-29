require_relative '../../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin

    case req.request_method
    when "GET"
      business_id = req.query['business_id'] || ""
      raise MissingParameterError, 'missing business_id' if business_id.blank?

      limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
      offset = req.query['offset'].present? ? BSON::ObjectId(req.query['offset']).to_time : Time.now
      business = Business.find_by(id: business_id)
      backers = business.present? ? business.backers.where(:created_at.lt => offset).order_by(:created_at.desc).limit(limit) : nil

      res.status = HTTP_STATUS_OK
      res.body = JSON::Response::Data.many(backers, BusinessBackerSerializer, res.status, pagination_meta: true, limit: limit)
    when "POST"
      req_body = JSON.parse(req.body)
      business_id = req_body['business_id'] || ""
      raise MissingParameterError, 'missing business_id' if business_id.blank?
      username = req_body['username'].to_s.strip.downcase
      username = username[1..-1] if username[0] == '@'
      account_type = req_body['account_type'].to_sym
      anonym = !!req_body['anonym']
      comment = req_body['comment'].present? ? req_body['comment'].to_ascii.gsub('[?]', '').strip : nil

      business = Business.find_by(id: business_id)
      raise ResourceNotFoundError, 'business not found' if business.blank?
      backer = business.backers.new(username: username, account_type: account_type, anonym: anonym, comment: comment)
      backer.validate!
      business.backers << backer

      res.status = HTTP_STATUS_CREATED
      res.body = JSON::Response.message("backer successfully inserted", res.status)
    end
  rescue JSON::ParserError => e
    res.status = HTTP_STATUS_BAD_REQUEST
    res.body = JSON::Response.error('expected json request body', ERROR_INVALID_REQUEST_BODY, res.status)
  rescue ResourceNotFoundError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_BUSINESS_NOT_FOUND, res.status)
  rescue MissingParameterError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_MISSING_REQUIRED_PARAMETER, res.status)
  rescue BSON::ObjectId::Invalid => e
    res.status = HTTP_STATUS_BAD_REQUEST
    res.body = JSON::Response.error("invalid business_id", INVALID_PARAMETER, res.status)
  rescue ActiveModel::ValidationError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_VALIDATION, res.status)
  rescue Mongo::Error::OperationFailure => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error('duplicate entry', ERROR_DUPLICATE_ENTRY, res.status)
  end
end
