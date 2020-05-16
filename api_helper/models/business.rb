require 'mongoid'
require 'hanami/validations'
require_relative '../initializers/mongoid'

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
  field :anonymous_backers, type: Integer, default: 0
  field :instagram_backers, type: Array

  index({ _id: -1, created_at: -1 }, { background: true, unique: true })
  index({ location: 1 }, { background: true })
  index({ category: 1 }, { background: true })

  validate :key_existence

  def key_existence
    attributes.each do |attr_name, value|
      raise ValidationError, "#{attr_name} does not exist" if value.blank?
    end
  end
end
