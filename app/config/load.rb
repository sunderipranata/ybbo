require 'mongoid'
require 'hanami/validations'
require 'simple_enum/mongoid'
require 'fast_jsonapi'
require 'json'
require 'time'
require 'dotenv'


Dotenv.load
puts '
==========================================
==========================================
WARNING, YOU ARE USING PRODUCTION DATABASE
==========================================
==========================================' if ENV['MONGOID_URI'] =~ /production/

require_relative 'mongoid'

# models
require_relative '../models/business'
require_relative '../models/business/store_account'
require_relative '../models/business/backer'

# serializers
require_relative '../serializers/business/store_account'
require_relative '../serializers/business/backer'
require_relative '../serializers/business/detail'
require_relative '../serializers/business/simple'

# response
require_relative '../response/json'
require_relative '../response/error'
require_relative '../response/http_status'
