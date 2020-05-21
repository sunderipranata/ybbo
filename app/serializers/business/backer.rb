class BusinessBackerSerializer
  include FastJsonapi::ObjectSerializer

  attribute :account_type, :username, :comment
end
