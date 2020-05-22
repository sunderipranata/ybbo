Mongoid.configure do |config|
  config.clients.default = {
    uri: "mongodb+srv://ybbo_app:Ynb6HcXHDlLgwzYU@cluster0-ffclo.gcp.mongodb.net/ybbo_test?retryWrites=true&w=majority",
  }
  config.log_level = :info
  config.raise_not_found_error = false
end
Mongo::Logger.logger.level = Logger::INFO

# convert object key "_id" to "id" and remove "_id" from displayed attributes on mongoid documents when represented as JSON
# module Mongoid
#   module Document
#     def as_json(options={})
#       attrs = super(options)
#       id = {id: attrs["_id"].to_s}
#       attrs.delete("_id")
#       id.merge(attrs)
#     end
#   end
# end

# converts object ids from BSON type object id to plain old string
# module BSON
#   class ObjectId
#     alias :to_json :to_s
#     alias :as_json :to_s
#     alias :serializable_hash :to_s
#   end
# end

