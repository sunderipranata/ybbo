require 'mongoid'

Mongoid.configure do |config|
  puts "Hello world"
  puts "#{ENV['MONGOID_HOST']}"
  puts "#{ENV['MONGOID_CLUSTER']}"
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
