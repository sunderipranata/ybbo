require 'cowsay'
require 'mongoid'

Mongoid.configure do |config|
  config.clients.default = {
    uri: "#{ENV['MONGOID_HOST']}",
  }
  config.log_level = :warn
end

class Business
  include Mongoid::Document
  field :name, type: String
end

Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'

  business = Business.create(name: "business ##{Business.count}")
  res.body = Cowsay.say("Hello! New business entry created. Business count is: #{Business.count}", 'cow')
end
