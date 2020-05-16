require 'mongoid'

x=0
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
