ERROR_MISSING_REQUIRED_PARAMETER=1000
ERROR_INVALID_PARAMETER = 1001
ERROR_RESOURCE_NOT_FOUND = 1002
ERROR_VALIDATION = 1003
ERROR_DUPLICATE_ENTRY = 1004

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
