class BusinessSimpleSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :category, :location, :thumbnail_url
  attribute :backers_count do |object|
    object.backers_count rescue object.backers.count
  end
end
