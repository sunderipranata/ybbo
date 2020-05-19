require 'mongoid'
require 'hanami/validations'
require_relative '../initializers/mongoid'
require 'simple_enum/mongoid'

class Business
  include Mongoid::Document
  include Mongoid::Timestamps::Created

  class ValidationError < StandardError
    def initialize(msg="no message")
      super
    end
  end

  field :name,              type: String
  field :ig_account,        type: String
  field :location,          type: String
  field :category,          type: String
  field :description,       type: String
  field :instructions,      type: String
  field :thumbnail_link,    type: String
  field :assets_link,       type: String
  embeds_many :backers

  index({ _id: -1 }, { background: true, unique: true })
  index({ created_at: -1 }, { background: true, unique: true })
  index({ location: 1, created_at: -1 }, { background: true })
  index({ category: 1, created_at: -1 }, { background: true })


  validate :key_existence

  def key_existence
    attributes.each do |attr_name, value|
      raise ValidationError, "#{attr_name} does not exist" if value.blank?
    end
  end
end

class Backer
  include Mongoid::Document
  include SimpleEnum::Mongoid

  as_enum :account_type, instagram: 0, facebook: 1, twitter: 2

  field :username, type: String
  field :comment, type: String

  embedded_in :business
end
