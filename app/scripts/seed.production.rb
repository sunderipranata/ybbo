
# Production seed script

b = Business.new
b.name = "Cookies Jar (Sample)"
b.category = "food_and_beverage"
b.location = 'Jakarta'
b.description = "Cookies enak dengan berbagai rasa: coklat, mocha, dan vanilla. Harga 45000 per jar."
b.assets_url = "https://drive.google.com/open?id=1lbGAcUaflXn1NMgo0c44D5jaFFM8Qt6v"
b.icon_url = "https://drive.google.com/uc?export=view&id=1Ml9kh71Kdra1EsPL7DIcA2Tfcx6leC7y"
b.thumbnail_url = "https://drive.google.com/uc?export=view&id=1Ml9kh71Kdra1EsPL7DIcA2Tfcx6leC7y"
b.push(pictures_url: "https://drive.google.com/uc?export=view&id=1Ml9kh71Kdra1EsPL7DIcA2Tfcx6leC7y")
b.push(pictures_url: "https://drive.google.com/uc?export=view&id=1ongY4R6RhopFjjy5HW9mxMKuX4pk-rgm")
b.validate!
b.save

toped_store = b.store_accounts.new
toped_store.account_type = :tokopedia
toped_store.name = "Cookies Jar"
toped_store.url = "https://tokopedia.com"
toped_store.validate!
toped_store.save

bukalapak_store = b.store_accounts.new
bukalapak_store.account_type = :bukalapak
bukalapak_store.name = "Cookies Jar"
bukalapak_store.url = "https://bukalapak.com"
bukalapak_store.validate!
bukalapak_store.save

whatsapp_store = b.store_accounts.new
whatsapp_store.account_type = :whatsapp
whatsapp_store.name = "Cookies Jar"
whatsapp_store.url = "https://wa.me/+6287818123456"
whatsapp_store.validate!
whatsapp_store.save