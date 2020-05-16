require 'cowsay'
require_relative 'models/business'

count = 0
Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'

  business = Business.create(name: "business ##{Business.count}")
  count = count + 1 rescue count = "NIL"
  res.body = Cowsay.say("count #{count} Hello! New business entry created. Business count is: #{Business.count}", 'cow')
end
