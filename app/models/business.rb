class Business
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include SimpleEnum::Mongoid

  CATEGORY = {
    food_and_beverage: 10,
    fashion: 40,
    hobby: 50,
    beauty: 60,
    others: 1000
  }.freeze

  field :name,              type: String
  field :location,          type: String
  field :description,       type: String
  field :icon_url,          type: String
  field :thumbnail_url,     type: String
  field :assets_url,        type: String
  field :slug,              type: String
  field :pictures_url,      type: Array
  field :backers_count,     type: Integer, default: 0

  as_enum :category, CATEGORY
  has_many :store_accounts, class_name: 'Business::StoreAccount'
  has_many :backers, class_name: 'Business::Backer'

  index({ created_at: -1 }, { background: true })
  index({ location: 1, created_at: -1 }, { background: true })
  index({ category_cd: 1, created_at: -1 }, { background: true }) # _cd is because of SimpleEnum::Mongoid naming schemes
  index({ slug: 1 }, {
    unique: true,
    background: true,
    partial_filter_expression:{ slug: {:$exists => true } }
  })

  validates :name, :location, :description, :category, :icon_url, :thumbnail_url, :assets_url, :pictures_url, presence: true
  validates :thumbnail_url, :assets_url, :pictures_url, format: { with: /https:\/\// }

  def self.find_by_slug_or_id(slug_or_id)
    Business.find_by(slug: slug_or_id) || Business.find_by(id: slug_or_id)
  end
end
