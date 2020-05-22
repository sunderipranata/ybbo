class Business::StoreAccount
  include Mongoid::Document
  include SimpleEnum::Mongoid

  as_enum :account_type, instagram: 0, facebook: 1, twitter: 2, bukalapak: 3, tokopedia: 4, shopee: 5, gojek: 6, grab: 7

  field :username, type: String
  field :name, type: String
  field :url, type: String

  belongs_to :business

  index({ username: 1, account_type: -1 }, { unique: true, background: true })
end
