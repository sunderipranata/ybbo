class BusinessSiteMapSerializer
  include FastJsonapi::ObjectSerializer

  set_id :id

  attributes :name, :slug
end
