module JSON
  module Response
    module Data
      module_function

      def one(object, serializer, http_status)
        options = {}
        options[:meta] = {
          http_status: http_status
        }
        serializer.new(object, options).serializable_hash.to_json
      end

      def many(object, serializer, http_status, options={})
        serializer_options = {}
        serializer_options[:meta] = {
          http_status: http_status
        }
        if options[:pagination_meta] == true
          serializer_options[:meta][:offset] = object&.first&.id.to_s
          serializer_options[:meta][:limit] = options[:limit]
          serializer_options[:meta][:total] = options[:total] || object&.count || 0
        end
        serializer.new(object, serializer_options).serializable_hash.to_json
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
