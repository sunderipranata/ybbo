ERROR_ADMIN_AUTHENTICATION = 999
ERROR_MISSING_REQUIRED_PARAMETER=1000
ERROR_INVALID_PARAMETER = 1001
ERROR_RESOURCE_NOT_FOUND = 1002
ERROR_VALIDATION = 1003
ERROR_DUPLICATE_ENTRY = 1004
ERROR_INVALID_REQUEST_BODY = 1005
ERROR_ASCII_EXPECTED = 1006


class AuthenticationError < StandardError
  def initialize(msg="invalid token")
    super
  end
end

class InvalidEncodingError < StandardError
  def initialize(msg="invalid encoding error")
    super
  end
end

class MissingParameterError < StandardError
  def initialize(msg="parameter missing")
    super
  end
end

class ResourceNotFoundError < StandardError
  def initialize(msg="resource not found")
    super
  end
end
