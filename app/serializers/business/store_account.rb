class BusinessStoreAccountSerializer
  include FastJsonapi::ObjectSerializer

  attributes :account_type, :name, :url
end
