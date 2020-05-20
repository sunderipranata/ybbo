class Business
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Attributes::Dynamic

  class ValidationError < StandardError
    def initialize(msg="no message")
      super
    end
  end

  field :name,              type: String
  field :location,          type: String
  field :category,          type: String
  field :description,       type: String
  field :instructions,      type: String
  field :icon_url,          type: String
  field :thumbnail_url,     type: String
  field :assets_url,        type: String
  field :pictures_url,      type: Array

  has_many :store_accounts, class_name: 'Business::StoreAccount'
  has_many :backers, class_name: 'Business::Backer'

  index({ created_at: -1 }, { background: true })
  index({ location: 1, created_at: -1 }, { background: true })
  index({ category: 1, created_at: -1 }, { background: true })


  validate :key_existence

  def key_existence
    attributes.each do |attr_name, value|
      raise ValidationError, "#{attr_name} does not exist" if value.blank?
    end
  end
end