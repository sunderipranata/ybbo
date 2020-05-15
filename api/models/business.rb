require 'mongoid'

class Business
  include Mongoid::Document
  field :name, type: String

  def initialize
    Mongoid.configure do |config|
      config.clients.default = {
        hosts: ["#{ENV['MONGOID_HOST']}"],
        database: "#{ENV['MONGOID_CLUSTER']}",
      }
    end

    config.log_level = :warn
  end

end
