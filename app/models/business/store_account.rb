class Business::StoreAccount
  include Mongoid::Document
  include SimpleEnum::Mongoid

  ACCOUNT_TYPE = {
    instagram:   0,
    facebook:    1,
    twitter:     2,
    bukalapak:   3,
    tokopedia:   4,
    shopee:      5,
    gojek:       6,
    grab:        7,
    whatsapp:    8
  }.freeze

  as_enum :account_type, ACCOUNT_TYPE
  field :name, type: String
  field :url, type: String

  belongs_to :business

  validates :name, :account_type, presence: true
end
