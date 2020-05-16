require 'time'
# models
require_relative '../api_helper/models/business'

# initializers
require_relative '../api_helper/initializers/mongoid'
require_relative '../api_helper/initializers/response'
require_relative '../api_helper/initializers/errors'

# to be deleted
require 'cowsay'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  debugger = ""
  begin
    case req.request_method
    when "GET"
      id = req.query['id'] || ""
      limit = req.query['limit'].to_i || 10
      offset = req.query['offset'] ? BSON::ObjectId(offset).to_time : Time.now
      debugger << "checkpoint 1"
      if id.blank?
        debugger << "checkpoint 2"
        business = Business.where(:created_at.lte => offset).limit(limit)
        debugger << "checkpoint 3 #{business.count}"
        res.status = 200
        res.body = JSON::Response.paginate(business, limit, res.status)
        debugger << "checkpoint 4 #{res.body}"
      else
        business = Business.find_by(id: id)
        res.status = 200
        res.body = JSON::Response.data(business, res.status)
      end
    when "POST"
      # do stuff here
      res.status = 200
      res.body = JSON::Response.message("unimplemented", res.status)
    end
  rescue Business::ValidationError => e
    res.status=422
    res.body = JSON::Response.error(e.message, BUSINESS_VALIDATION_ERROR, res.status)
  rescue StandardError => e
    res.status = 200
    res['Content-Type'] = 'text/plain'
    res.body = Cowsay.say("#{req.request_method} resulting in error #{e.message} -- debug: #{debugger}", 'cow')
  end
end
