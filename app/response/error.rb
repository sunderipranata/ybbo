MISSING_REQUIRED_PARAMETER=1000
INVALID_PARAMETER = 1001
RESOURCE_NOT_FOUND = 1002

BACKER_VALIDATION_ERROR=2000
BUSINESS_VALIDATION_ERROR=2001

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
