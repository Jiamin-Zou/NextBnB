json.extract! listing, :id, :host_id, :property_type, :address, :apt_num, :city, :state, :country, :title, :description, :category, :num_beds, :num_bedrooms, :num_bathrooms, :night_price, :cleaning_fee, :has_wifi, :has_pets, :has_kitchen, :has_ac, :has_heat, :has_tv, :has_parking, :has_fireplace, :latitude, :longitude

json.ratings listing.calc_avg_reviews
json.numReviews  listing.reviews.length

json.photoUrls listing.photos.attached? ? listing.photos.map { |photo| url_for(photo) } : []