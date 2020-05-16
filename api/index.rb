require 'cowsay'
require_relative 'models/business'

count = 0
Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'

  business = Business.create(name: "business ##{Business.count}")
  count += 1
  x+=1
  res.body = Cowsay.say("count #{count} x #{x} Hello! New business entry created. Business count is: #{Business.count}", 'cow')
end
