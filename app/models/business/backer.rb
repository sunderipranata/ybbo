class Business::Backer
  include Mongoid::Document
  include SimpleEnum::Mongoid
  include Mongoid::Timestamps::Created

  as_enum :account_type, instagram: 0, facebook: 1, twitter: 2

  field :username, type: String
  field :comment,  type: String
  field :verified, type: Boolean, default: false
  field :anonym,   type: Boolean, default: false

  belongs_to :business, counter_cache: true

  index({ username: 1 }, { unique: true, background: true })
  index({ category: 1, created_at: -1 }, { background: true })
end
