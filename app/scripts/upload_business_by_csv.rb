
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
  business_name      = row[1].present? ? row[1].strip : nil
  category           = row[2]
  instagram_username = row[3].present? ? row[3].strip : nil
  link_tokopedia     = row[4].present? ? row[4].strip : nil
  link_bukalapak     = row[5].present? ? row[5].strip : nil
  link_shopee        = row[6].present? ? row[6].strip : nil
  wa_number          = row[7].present? ? row[7].strip : nil
  link_gojek         = row[8].present? ? row[8].strip : nil
  link_grab          = row[9].present? ? row[9].strip : nil
  others             = row[10]
  location           = row[11].present? ? row[11].strip : nil
  description        = row[12].present? ? row[12].strip : nil
  assets_urls        = row[13]
  thumbnail_url      = row[14]
  agreement          = row[15]
  link_folder        = row[16]
  done               = row[17]

  if done == 'skip' || done == 'done' || done == 'need update'
    puts "skipping #{business_name}"
    next
  end

  begin
    thumbnail_url = "https://drive.google.com/thumbnail?id=#{thumbnail_url.match(/[\w_-]{20,}+/)[0]}&sz=w500-h500"
    pictures_url = []
    assets_urls.split(',').each do |url|
      pictures_url << "https://drive.google.com/thumbnail?id=#{url.match(/[\w_-]{20,}+/)[0]}&sz=w500-h500"
    end

    wa_number = Phonelib.parse(wa_number).international(false)

    link_tokopedia = "https://#{link_tokopedia}" if link_tokopedia.present? && link_tokopedia !~ /^https:\/\/.*/
    link_bukalapak = "https://#{link_bukalapak}" if link_bukalapak.present? && link_bukalapak !~ /^https:\/\/.*/
    link_shopee    = "https://#{link_shopee}"    if link_shopee.present?    && link_shopee !~ /^https:\/\/.*/
    link_gojek     = "https://#{link_gojek}"     if link_gojek.present?     && link_gojek !~ /^https:\/\/.*/
    link_grab      = "https://#{link_grab}"      if link_grab.present?      && link_grab !~ /^https:\/\/.*/

    instagram_username = instagram_username[1..-1] if instagram_username[0] == '@'

    slug = business_name.downcase.to_s.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
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

    if link_tokopedia.present?
      toped_store = b.store_accounts.new
      toped_store.account_type = :tokopedia
      toped_store.name = business_name
      toped_store.url = link_tokopedia
      toped_store.validate!
    end

    if link_bukalapak.present?
      bukalapak_store = b.store_accounts.new
      bukalapak_store.account_type = :bukalapak
      bukalapak_store.name = business_name
      bukalapak_store.url = link_bukalapak
      bukalapak_store.validate!
    end

    if wa_number.present?
      whatsapp_store = b.store_accounts.new
      whatsapp_store.account_type = :whatsapp
      whatsapp_store.name = business_name
      whatsapp_store.url = "https://wa.me/#{wa_number}"
      whatsapp_store.validate!
    end

    if instagram_username.present?
      instagram_store = b.store_accounts.new
      instagram_store.account_type = :instagram
      instagram_store.name = business_name
      instagram_store.url = "https://instagram.com/#{instagram_username}"
      instagram_store.validate!
    end

    if link_shopee.present?
      shopee_store = b.store_accounts.new
      shopee_store.account_type = :shopee
      shopee_store.name = business_name
      shopee_store.url = link_shopee
      shopee_store.validate!
    end

    if link_gojek.present?
      gojek_store = b.store_accounts.new
      gojek_store.account_type = :gojek
      gojek_store.name = business_name
      gojek_store.url = link_gojek
      gojek_store.validate!
    end

    if link_grab.present?
      grab_store = b.store_accounts.new
      grab_store.account_type = :grab
      grab_store.name = business_name
      grab_store.url = link_grab
      grab_store.validate!
    end

    b.save! if b.present?
    toped_store.save! if toped_store.present?
    bukalapak_store.save! if bukalapak_store.present?
    whatsapp_store.save! if whatsapp_store.present?
    instagram_store.save! if instagram_store.present?
    shopee_store.save! if shopee_store.present?
    gojek_store.save! if gojek_store.present?
    grab_store.save! if grab_store.present?

    puts("#{b.name} successfuly saved!")
    ## There is a kind of "bug"
    # We use created at as offset that is retrieved from BSON ObjectId.
    # The created_at precision is until miliseconds while BSON ObjectId precision is only at seconds.
    # If we search by created_at from id, it will return several results for the same second.
    sleep(2.seconds)
  rescue => exception
    puts(exception)
  end
end
