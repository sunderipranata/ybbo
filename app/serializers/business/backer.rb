class BusinessBackerSerializer
  include FastJsonapi::ObjectSerializer

  attributes :created_at, :account_type, :comment
  attribute :username do |object|
    object.anonym? ? :anonim : object.username
  end

  attribute :is_verified do |object|
    object.verified?
  end
end
