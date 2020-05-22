class BusinessBackerSerializer
  include FastJsonapi::ObjectSerializer

  attributes :account_type, :username, :comment
  attribute :is_verified do |object|
    object.verified?
  end
end
