module Serializer
  module Business
    class Simple
      include FastJsonapi::ObjectSerializer

      set_id :id
      set_type :business

      attributes :category, :location, :thumbnail_url
      attribute :backers_count do |object|
        object.backers.count
      end
    end
  end
end