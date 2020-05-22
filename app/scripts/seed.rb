b = Business.new
# b = Business.find_by()

b.name = :lala
b.location = 'Kemang, Jakarta Barat'
b.description = "Jual murah ... ... ... .. ... .. .."
b.instructions = "silakan order lewat go food!"
b.icon_url = "https://"
b.icon_url = "https://youngmenshealthsite.org/wp-content/uploads/2015/05/iStock_000016515039Small-150x150.jpg"
b.thumbnail_url = "https://youngmenshealthsite.org/wp-content/uploads/2015/05/iStock_000016515039Small-150x150.jpg"
b.push(pictures_url: "https://youngmenshealthsite.org/wp-content/uploads/2015/05/iStock_000016515039Small-150x150.jpg")
b.validate!
b.save