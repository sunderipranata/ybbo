require 'cowsay'

Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'
  res.body = Cowsay.say("Hello #{ENV.to_s}", 'cow')
end
