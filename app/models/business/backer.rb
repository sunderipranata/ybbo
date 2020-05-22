class Business::Backer
  include Mongoid::Document
  include SimpleEnum::Mongoid
  include Mongoid::Timestamps::Created

  ACCOUNT_TYPE = {
    instagram: 0,
    facebook:  1,
    twitter:   2
  }.freeze

  as_enum :account_type, ACCOUNT_TYPE

  field :username, type: String
  field :comment,  type: String
  field :verified, type: Boolean, default: false
  field :anonym,   type: Boolean, default: false

  belongs_to :business, counter_cache: true
  # to reset counter, use business.reset_counters(:backers)

  index({ username: 1, account_type_cd: 1 }, { unique: true, background: true }) # _cd is because of SimpleEnum::Mongoid naming schemes

  validates :username, :account_type, presence: true
  validate :username_regex

  def username_regex
    errors.add(:username, "instagram username validation failed") if  self.instagram? && self.username !~ /^[a-zA-Z0-9_]{3,}$/
  end
end
