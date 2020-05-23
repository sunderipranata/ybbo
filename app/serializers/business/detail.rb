class BusinessDetailSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :location, :category, :description, :instructions, :icon_url, :thumbnail_url, :assets_url, :pictures_url, :backers_count
  has_many :store_accounts
end
