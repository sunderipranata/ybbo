Mongoid.configure do |config|
  config.clients.default = {
    uri: ENV['MONGOID_URI']
  }
  config.log_level = :info
  config.raise_not_found_error = false
end
Mongo::Logger.logger.level = Logger::INFO
