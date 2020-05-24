class BusinessDetailSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :location, :category, :description, :icon_url, :thumbnail_url, :assets_url, :pictures_url, :backers_count
  attribute :store_accounts do |object|
    BusinessStoreAccountSerializer.new(object.store_accounts).as_json
  end
end
