require 'time'
# models
require_relative '../api_helper/models/business'

# initializers
require_relative '../api_helper/initializers/mongoid'
require_relative '../api_helper/initializers/response'
require_relative '../api_helper/initializers/errors'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin
    case req.request_method
    when "GET"
      id = req.query['id'] || ""
      limit = req.query['limit'].to_i || 10
      offset = req.query['offset'].present? ? BSON::ObjectId(req.query['offset']).to_time : Time.now

      # TODO: add filter by category and location
      # category = req.query['category'].present? ? req.query['category'] : nil
      # location = req.query['location'].present? ? req.query['location'] : nil
      # category_regex=/(?i)\.*#{category}.*\b/
      # location_regex=/(?i)\.*#{location}.*\b/

      if id.blank?
        business = Business.where(:created_at.lte => offset).order_by(:created_at.desc).limit(limit)
        res.status = 200
        res.body = JSON::Response.paginate(business, limit, res.status)
      else
        business = Business.find_by(id: id)
        res.status = 200
        res.body = JSON::Response.data(business, res.status)
      end
    when "POST"
      # do stuff authentication stuffs here
      # query parameter
      # Business.new(...).validate!

      # Business.create(name: "Risol pak gembus",
      # ig_account:"@risolpakgembus",
      # location:"Kemang, Jakarta Selatan",
      # category:"Makanan dan Minuman",
      # description:"risol enak dan murah, 1 hanya 5000 rupiah kalau beli 5 cuma 20000 rupiah, yuk diorder!",
      # instructions:"Cara mendukung: Pesan makanan ini melalui tokopedia / bukalapak dengan nama username: risolpakgembus, kemudian upload story ig kamu dan mention akun instagram kami: @yukbantubisnis.online",
      # thumbnail_link:"https=>//drive.google.com/asdfasdf",
      # assets_link:"https=>//drive.google.com/asdfasdf",
      # anonymous_backers: 10,
      # instagram_backers: [
      #   "@lulu",
      #   "@lala",
      #   "@wkwk"
      # ])

      res.status = 200
      res.body = JSON::Response.message("unimplemented", res.status)
    end
  rescue Business::ValidationError => e
    res.status = 422
    res.body = JSON::Response.error(e.message, BUSINESS_VALIDATION_ERROR, res.status)
  end
end
