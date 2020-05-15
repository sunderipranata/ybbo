require 'cowsay'
require_relative 'models/business'

Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'


  business = Business.create(name: "asdfasdfasdf #{Business.count}")

  message = ""
  ENV.each do |k, v|
    message << "#{k}:#{v}"
    message << "<br>"
  end
  res.body = Cowsay.say("Hello #{Business.count} #{business.name}  #{message}", 'cow')

end
