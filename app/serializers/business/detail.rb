class BusinessDetailSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :location, :category, :description, :instructions, :icon_url, :thumbnail_url, :assets_url, :pictures_url
  attribute :backers_count do |object|
    object.backers_count rescue object.backers.count
  end
  has_many :store_accounts
end
