module Serializer
  module Business
    class Backer
      include FastJsonapi::ObjectSerializer

      attribute :account_type, :username, :comment
    end
  end
end