require_relative '../app/config/load'

Handler = Proc.new do |req, res|
  res['Content-Type'] = 'application/json'
  begin
    case req.request_method
    when "GET"
      id = req.query['id'] || ""
      limit = req.query['limit'].present? ? req.query['limit'].to_i : 10
      offset = req.query['offset'].present? ? BSON::ObjectId(req.query['offset']).to_time : Time.now
      category = req.query['category'].present? ? req.query['category'] : nil
      random = req.query['random'].to_s.downcase == 'true'

      # TODO: add filter location?
      # location = req.query['location'].present? ? req.query['location'] : nil

      pagination_meta = true
      if id.blank?
        if category.blank?
          business = Business.where(:created_at.lt => offset).order_by(:created_at.desc).limit(limit)
        else
          if random
            pagination_meta = false
            business = Business.where(category_cd: Business::CATEGORY[category.to_sym]).sample(limit)
          else
            business = Business.where(category_cd: Business::CATEGORY[category.to_sym], :created_at.lt => offset).order_by(:created_at.desc).limit(limit)
          end
        end
        res.status = HTTP_STATUS_OK
        res.body = JSON::Response::Data.many(business, BusinessSimpleSerializer, res.status, pagination_meta: pagination_meta, limit: limit)
      else
        business = Business.find_by_slug_or_id(id)
        res.status = HTTP_STATUS_OK
        res.body = JSON::Response::Data.one(business, BusinessDetailSerializer, res.status)
      end
    when "POST"
      raise AuthenticationError unless ENV['YBBO_ADMIN_TOKEN'] == req['YBBO-Admin-Token']

      req_body = JSON.parse(req.body)
      business_name      = req_body['business_name'].present? ? req_body['business_name'].strip : nil

      raise MissingParameterError, 'missing business_name' if business_name.blank?
      raise InvalidEncodingError if !business_name.ascii_only? || !description.ascii_only?

      category           = Business::CATEGORY_MAP[req_body['category']]
      location           = req_body['location'].present? ? req_body['location'].strip : nil
      description        = req_body['description'].present? ? req_body['description'].strip : nil

      pictures_url = []
      assets_urls        = req_body['assets_urls']
      assets_urls.split(',').each do |url|
        pictures_url << "https://drive.google.com/thumbnail?id=#{url.match(/[\w_-]{20,}+/)[0]}&sz=w500-h500"
      end

      thumbnail_id       = req_body['thumbnail_url'].match(/[\w_-]{20,}+/)[0]
      thumbnail_url      = "https://drive.google.com/thumbnail?id=#{thumbnail_id}&sz=w300-h300"
      icon_url           = "https://drive.google.com/thumbnail?id=#{thumbnail_id}&sz=w200-h200"
      folder_url         = req_body['folder_url']
      store_accounts     = req_body['store_accounts']

      slug = business_name.downcase.to_s.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      slug_count = Business.where(slug: slug).count
      slug = slug + "-#{slug_count}" if slug_count > 0


      b = Business.new
      b.name = business_name
      b.slug = slug
      b.category = category
      b.location = location
      b.description = description
      b.category = category
      b.assets_url = folder_url
      b.icon_url = icon_url
      b.thumbnail_url = thumbnail_url
      pictures_url.each do |url|
        b.push(pictures_url: url)
      end
      b.validate!

      stores = []
      store_accounts.each do |account|
        store_url = account['store_url']
        next if store_url.blank?
        store_type = account['store_type'].to_sym
        store_name = account['store_name'].present? ? account['store_name'].strip : b.business_name

        store_url = case store_type
                    when :whatsapp
                      wa_number = Phonelib.parse(store_url).international(false)
                      "https://wa.me/#{wa_number}"
                    when :instagram
                      instagram_username = (store_url[0] == '@') ? store_url[1..-1] : store_url
                      "https://instagram.com/#{instagram_username}"
                    else
                      "https://#{store_url.strip}" if store_url.present? && store_url !~ /^https:\/\/.*/
                    end

        store = b.store_accounts.new

        store.account_type = store_type
        store.name = store_name
        store.url = store_url
        store.validate!
        stores << store
      end

      b.save!
      stores.each do |store|
        store.save!
      end

      res.status = HTTP_STATUS_CREATED
      res.body = JSON::Response.message("business successfully inserted", res.status)
    end

  rescue AuthenticationError => e
    res.status = HTTP_STATUS_UNAUTHORIZED
    res.body = JSON::Response.error(e.message, ERROR_ADMIN_AUTHENTICATION, res.status)
  rescue InvalidEncodingError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_ASCII_EXPECTED, res.status)
  rescue MissingParameterError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_MISSING_REQUIRED_PARAMETER, res.status)
  rescue ActiveModel::ValidationError => e
    res.status = HTTP_STATUS_UNPROCESSABLE_ENTITY
    res.body = JSON::Response.error(e.message, ERROR_VALIDATION, res.status)
  end
end
