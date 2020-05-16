require 'json'

module JSON
  module Response
    module_function

    def paginate(data, limit, http_status)
      {
        data: data.to_a,
        meta: {
          http_status: http_status,
          offset: data.first.id,
          limit: limit,
          total: data.count
        }
      }.to_json
    end

    def data(data, http_status)
      {
        data: data.first,
        meta: {
          http_status: http_status
        }
      }.to_json
    end

    def message(msg, http_status)
      {
        message: msg,
        meta: {
          http_status: http_status
        }
      }.to_json
    end

    def message(msg, error_code, http_status)
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
