module Serializer
  module Business
    class Detail
      include FastJsonapi::ObjectSerializer

      set_id :id
      set_type :business_detail

      attributes :name, :location, :category, :description, :instructions, :icon_url, :thumbnail_url, :assets_url, :pictures_url
      has_many :store_accounts
    end
  end
end