module JSON
  module Response
    module Data
      module_function

      def one(object, serializer, http_status)
        options = {}
        options[:meta] = {
          http_status: http_status
        }
        serializer.new(object, options).serialized_json
      end

      def many(object, serializer, limit, http_status)
        options = {}
        options[:meta] = {
          http_status: http_status,
          offset: object.first.&id.to_s,
          limit: limit,
          total: object.count
        }
        serializer.new(object, options).serialized_json
      end
    end

    module_function
    def message(msg, http_status)
      {
        message: msg,
        meta: {
          http_status: http_status
        }
      }.to_json
    end

    def error(msg, error_code, http_status)
      {
        message: msg,
        meta: {
          error_code: error_code,
          http_status: http_status
        }
      }.to_json
    end
  end
end
