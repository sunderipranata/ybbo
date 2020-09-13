require_relative '../../app/config/load'

Handler = Proc.new do |req, res|
    res['Content-Type'] = 'application/json'
  begin
    case req.request_method
    when "GET"
      id = req.query['id'] || ""
      limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
      offset = req.query['skip'].present? ? req.query['skip'] : 0
      category = req.query['category'].present? ? req.query['category'] : nil

      business = Business.feed(category, skip, limit)
      res.status = HTTP_STATUS_OK
      res.body = JSON::Response::Data.many(business, BusinessSimpleSerializer, res.status, pagination_meta: true, limit: limit)
    end
  end
end
