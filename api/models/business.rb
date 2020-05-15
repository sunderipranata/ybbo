require 'mongoid'

Mongoid.configure do |config|
  config.clients.default = {
    hosts: ["#{ENV['MONGOID_HOST']}"],
    database: "#{ENV['MONGOID_CLUSTER']}",
  }
  config.log_level = :warn
end

class Business
  include Mongoid::Document
  field :name, type: String
end
