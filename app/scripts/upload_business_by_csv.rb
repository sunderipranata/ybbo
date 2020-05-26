
# Example:
# https://drive.google.com/thumbnail?id=1jH3nbVWfHFE6rjBFK9ri407cTSS0Cn_m&sz=w300-h300

# CATEGORY = {
#   food_and_beverage: 10,
#   fashion: 40,
#   hobby: 50,
#   beauty: 60
# }.freeze

CATEGORY_MAP ={
  'Makanan dan Minuman' => :food_and_beverage,
  'Fashion' => :fashion,
  'Hobi' => :hobby,
  'Jasa Kecantikan' => :beauty
}


filename = "../responses/Business.csv"
CSV.foreach("#{filename}", headers: true) do |row|

  timestamp          = row[0]
  business_name      = row[1]
  category           = row[2]
  instagram_username = row[3]
  link_tokopedia     = row[4]
  link_bukalapak     = row[5]
  link_shopee        = row[6]
  wa_number          = row[7]
  link_gojek         = row[8]
  link_grab          = row[9]
  others             = row[10]
  location           = row[11]
  description        = row[12]
  assets_urls        = row[13]
  thumbnail_url     = row[14]
  agreement          = row[15]
  link_folder             = row[16]
  done               = row[17]

  next if done == 'skip' || done == 'done'

  begin
    thumbnail_url = "https://drive.google.com/thumbnail?id=#{thumbnail_url.match(/[\w_-]{20,}+/)[0]}&sz=w500-h500"
    pictures_url = []
    assets_urls.split(',').each do |url|
      pictures_url << "https://drive.google.com/thumbnail?id=#{url.match(/[\w_-]{20,}+/)[0]}&sz=w500-h500"
    end

    wa_number = Phonelib.parse(wa_number).international(false)

    instagram_username = instagram_username[1..-1] if instagram_username[0] == '@'

    slug = business_name.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
    slug_count = Business.where(slug: slug).count
    slug = slug + "-#{slug_count}" if slug_count > 0

    b = Business.new
    b.name = business_name
    b.slug = slug
    b.category = category
    b.location = location
    b.description = description
    b.category = CATEGORY_MAP[category]
    b.assets_url = link_folder
    b.icon_url = thumbnail_url
    b.thumbnail_url = thumbnail_url
    pictures_url.each do |url|
      b.push(pictures_url: url)
    end
    b.validate!
    b.save

    if link_tokopedia.present?
      toped_store = b.store_accounts.new
      toped_store.account_type = :tokopedia
      toped_store.name = business_name
      toped_store.url = link_tokopedia
      toped_store.validate!
      toped_store.save
    end

    if link_bukalapak.present?
      bukalapak_store = b.store_accounts.new
      bukalapak_store.account_type = :bukalapak
      bukalapak_store.name = business_name
      bukalapak_store.url = link_bukalapak
      bukalapak_store.validate!
      bukalapak_store.save
    end

    if wa_number.present?
      whatsapp_store = b.store_accounts.new
      whatsapp_store.account_type = :whatsapp
      whatsapp_store.name = business_name
      whatsapp_store.url = "https://wa.me/#{wa_number}"
      whatsapp_store.validate!
      whatsapp_store.save
    end

    if instagram_username.present?
      instagram_store = b.store_accounts.new
      instagram_store.account_type = :instagram
      instagram_store.name = business_name
      instagram_store.url = "https://instagram.com/#{instagram_username}"
      instagram_store.validate!
      instagram_store.save
    end

    if link_shopee.present?
      shopee_store = b.store_accounts.new
      shopee_store.account_type = :shopee
      shopee_store.name = business_name
      shopee_store.url = link_shopee
      shopee_store.validate!
      shopee_store.save
    end

    if link_gojek.present?
      gojek_store = b.store_accounts.new
      gojek_store.account_type = :gojek
      gojek_store.name = business_name
      gojek_store.url = link_gojek
      gojek_store.validate!
      gojek_store.save
    end

    if link_grab.present?
      grab_store = b.store_accounts.new
      grab_store.account_type = :grab
      grab_store.name = business_name
      grab_store.url = link_grab
      grab_store.validate!
      grab_store.save
    end

    ## There is a kind of "bug"
    # We use created at as offset that is retrieved from BSON ObjectId.
    # The created_at precision is until miliseconds while BSON ObjectId precision is only at seconds.
    # If we search by created_at from id, it will return several results for the same second.
    sleep(2.seconds)
  rescue => exception
    puts(exception)
  end
end
