require_relative '../../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  case req.request_method
  when "GET"
    limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
    skip = req.query['skip'].present? ? req.query['skip'].to_i : 0
    category = req.query['category'].present? ? req.query['category'] : nil

    business, total = Business.feed(category, skip, limit)
    res.status = HTTP_STATUS_OK
    res.body = JSON::Response::Data.many(business, BusinessSimpleSerializer, res.status, pagination_meta: true, limit: limit, total: total)
  end
end
