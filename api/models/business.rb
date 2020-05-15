require 'mongoid'

class Business
 include Mongoid::Document
 field :name, type: String
end