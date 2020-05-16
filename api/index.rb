require 'cowsay'
require_relative 'models/business'

Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'

  business = Business.create(name: "business ##{Business.count}")
  res.body = Cowsay.say("Hello! New business entry created. Business count is: #{Business.count}", 'cow')
end
