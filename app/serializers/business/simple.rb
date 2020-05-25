class BusinessSimpleSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :slug, :category, :location, :thumbnail_url, :backers_count
end
