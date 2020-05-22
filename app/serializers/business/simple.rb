class BusinessSimpleSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :category, :location, :thumbnail_url
  attribute :backers_count do |object|
    object.backers.count
  end
end
