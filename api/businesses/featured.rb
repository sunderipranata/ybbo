require_relative '../app/config/load'

FEATURED_BUSINESS_COUNT = 9

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  case req.request_method
  when "GET"
    business = $zache.get(:featured_business, lifetime: 1) {
      Business.all.sample(FEATURED_BUSINESS_COUNT)
    }
    res.status = HTTP_STATUS_OK
    res.body = JSON::Response::Data.many(business, BusinessSimpleSerializer, res.status, pagination_meta: false)
  end
end
