require 'cowsay'

Handler = Proc.new do |req, res|
  name = req.query['name'] || 'World'

  res.status = 200
  res['Content-Type'] = 'text/plain'

  message = ""
  ENV.each do |k, v|
    message << "#{k}:#{v}"
    message << "<br>"
  end
  res.body = Cowsay.say("Hello #{message}", 'cow')

end
