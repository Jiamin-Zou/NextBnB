require "open-uri"

listings = []

ApplicationRecord.transaction do
  puts "Destroying tables..."
  User.destroy_all
  Listing.destroy_all
  Reservation.destroy_all

  puts "Deleting Active Storage attachments and blobs..."
  ActiveStorage::Attachment.delete_all
  ActiveStorage::Blob.delete_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!("users")
  ApplicationRecord.connection.reset_pk_sequence!("listings")
  ApplicationRecord.connection.reset_pk_sequence!("reservations")
  ApplicationRecord.connection.reset_pk_sequence!("active_storage_attachments")
  ApplicationRecord.connection.reset_pk_sequence!("active_storage_blobs")

  puts "Creating users..."

  # Demo User
  demo_user = User.create!(
    first_name: "Demo",
    last_name: "User",
    email: "demo.user@test.com",
    password: "demouser",
  )

  users = []

  20.times do
    f_name = Faker::Name.unique.first_name
    l_name = Faker::Name.unique.last_name
    email_name = [
      "#{f_name}#{l_name[0]}",
      "#{f_name}.#{l_name[0]}",
      "#{f_name[0]}#{l_name}",
      "#{f_name[0]}.#{l_name}",
      "#{f_name}.#{l_name}",
      "#{f_name}#{l_name[0]}#{rand(1..1000)}",
    ].sample
    domain = ["gmail.com", "yahoo.com", "gmx.com", "icloud.com", "hotmail.com", "outlook.com"].sample

    user = User.create!({
      first_name: f_name,
      last_name: l_name,
      email: Faker::Internet.unique.email(name: email_name, domain: domain),
      password: Faker::Internet.password(min_length: 8, max_length: 20),
    })

    users << user
  end

  puts "Users created!"

  def generate_random_user_id(users)
    random_index = rand(users.length)
    random_user = users[random_index]
    return random_user.id
  end

  puts "Creating listings..."

  # 1
  listing1 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "California",
    country: "United States",
    title: "Spacious House in Mountain View",
    description: "A spacious and beautiful house located in Mountain View, California. Enjoy the serene surroundings and modern amenities. Perfect for a family vacation or a relaxing getaway. This house features a fully equipped kitchen, comfortable bedrooms, and a cozy living room with a fireplace. Stay connected with WiFi and unwind with your favorite shows on the TV. Parking is available for your convenience. Experience luxury and comfort in this stunning house.",
    num_beds: 4,
    num_bedrooms: 3,
    num_bathrooms: 2,
    night_price: 240.0,
    cleaning_fee: 80.0,
    category: "amazing views",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: true,
    has_heat: false,
    has_tv: true,
    has_parking: false,
    has_fireplace: true,
  )

  listings << listing1

  # 2
  listing2 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Apartment",
    address: "221b Baker St",
    apt_num: "3H",
    city: "London",
    state: "England",
    country: "United Kingdom",
    title: "Cozy Apartment in London",
    description: "Welcome to our cozy apartment located at the famous 221B Baker Street in London. Experience the charm of this historic neighborhood while enjoying the modern comforts of our stylish apartment. This one-bedroom apartment features a fully equipped kitchen, comfortable bed, and a spacious living area. Stay connected with WiFi and catch up on your favorite shows on the TV. The apartment is pet-friendly and offers parking facilities. Immerse yourself in the rich history and vibrant culture of London.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 178.0,
    cleaning_fee: 45.0,
    category: "omg",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: false,
  )

  listings << listing2

  # 3
  listing3 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "120 Bd de Grenelle",
    city: "Paris",
    state: "Ile-de-France",
    country: "France",
    title: "Luxury House near the Eiffel Tower",
    description: "Indulge in the ultimate luxury at our exquisite house located just a stone's throw away from the iconic Eiffel Tower in Paris. This magnificent residence offers a truly opulent experience with its lavish interiors and breathtaking views of the city's landmarks. With four spacious bedrooms and three beautifully appointed bathrooms, this house is perfect for accommodating larger groups or families seeking the utmost comfort and privacy. Immerse yourself in the charm of Paris while being surrounded by the finest amenities and impeccable service. Prepare to be enchanted by the allure of this exclusive haven.",
    num_beds: 5,
    num_bedrooms: 4,
    num_bathrooms: 3,
    night_price: 395.0,
    cleaning_fee: 100.0,
    category: "amazing views",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: false,
    has_tv: true,
    has_parking: false,
    has_fireplace: false,
  )

  listings << listing3

  # 4
  listing4 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Apartment",
    address: "32 Broadway",
    apt_num: "Apt# 4C",
    city: "Manhattan",
    state: "New York",
    country: "USA",
    title: "Modern Apartment in Manhattan",
    description: "A modern and stylish apartment located in near Battery Park and the river. Enjoy your stay at the big apple in our cozy apartment with a great view of Jersey City skyline and also Statue of liberty!",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 189.0,
    cleaning_fee: 59.0,
    category: "lakefront",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: false,
    has_heat: true,
    has_tv: true,
    has_parking: false,
    has_fireplace: false,
  )

  listings << listing4

  # 5
  listing5 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "456 Park Avenue",
    city: "Brooklyn",
    state: "NY",
    country: "USA",
    title: "Luxury Townhouse on Park Avenue",
    description: "A luxurious townhouse situated on Park Avenue in New York City. Great location: 15 minutes walk to Williamsburg, and 5 minutes walk to Brooklyn Navy Yard!",
    num_beds: 4,
    num_bedrooms: 3,
    num_bathrooms: 2,
    night_price: 398.0,
    cleaning_fee: 99.0,
    category: "modern",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: false,
    has_fireplace: true,
  )

  listings << listing5

  # 6
  listing6 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Cabin",
    address: "198 Prospect Ave",
    city: "Valhalla",
    state: "NY",
    country: "USA",
    title: "Cozy cabin by the lake",
    description: "A small and cozy cabin right by Kensico Lake. Disconnect from the busy city life and slow down you pace, enjoy the nature while enjoying the gorgeous view of the lake by the fireplace. This cabin will sure warm you up!",
    num_beds: 2,
    num_bedrooms: 2,
    num_bathrooms: 1,
    night_price: 229.0,
    cleaning_fee: 80.0,
    category: "cabin",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: false,
    has_heat: false,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing6

  # 7
  listing7 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Private Room",
    address: "456 Carrer de Mallorca",
    apt_num: "Floor 2",
    city: "Barcelona",
    state: "Catalonia",
    country: "Spain",
    title: "Room in stylish apartment",
    description: "Immerse yourself in the vibrant charm of Barcelona with a stay in our stylish private room. Discover the city's iconic attractions, then unwind in comfort with cozy beds, a modern bedroom, and a pristine bathroom. Your unforgettable Barcelona experience starts here!",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 138.0,
    cleaning_fee: 40.0,
    category: "modern",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: false,
    has_fireplace: true,
  )

  listings << listing7

  # 8
  listing8 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "6638 3rd St",
    city: "Fields Landing",
    state: "California",
    country: "USA",
    title: "A small and warming home ",
    description: "Escape to the peaceful countryside in our small and warming home. This spacious house in Fields Landing, California offers 2 beds, 1 bedroom, and 1 bathroom. Enjoy the tranquility of nature while staying connected with WiFi and bring your furry friends along. Experience cozy nights by the fireplace and ample parking for your convenience",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 199.0,
    cleaning_fee: 70.0,
    category: "countryside",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: false,
    has_heat: false,
    has_tv: false,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing8

  # 9
  listing9 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Apartment",
    address: "3 Chome-17-6 Shinjuku",
    apt_num: "Unit 5A",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    title: "Modern Apartment in Shinjuku",
    description: "Discover the vibrant Shinjuku district of Tokyo from our modern apartment. This stylish unit offers 2 beds, 1 bedroom, and 1 bathroom. Enjoy amazing views and convenient amenities including WiFi, air conditioning, and TV. Immerse yourself in the city's excitement with easy access to attractions.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 220.0,
    cleaning_fee: 50.0,
    category: "modern",
    has_wifi: true,
    has_pets: false,
    has_kitchen: false,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: false,
    has_fireplace: false,
  )

  listings << listing9

  # 10
  listing10 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Studio",
    address: "712 Great Hwy",
    apt_num: "2A",
    city: "San Francisco",
    state: "California",
    country: "United States",
    title: "Studio with Ocean Views",
    description: "Indulge in the coastal charm of San Francisco with our stylish beachfront studio apartment. Located on Great Highway, this modern and inviting space offers breathtaking ocean views. Immerse yourself in the vibrant city's atmosphere, with easy access to popular attractions, dining, and entertainment. Enjoy the convenience of amenities like WiFi, a fully-equipped kitchen, and a cozy living area. Experience the beauty of San Francisco's beachfront living at its finest.",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 189.0,
    cleaning_fee: 40.0,
    category: "beachfront",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: true,
    has_heat: false,
    has_tv: true,
    has_parking: false,
    has_fireplace: false,
  )

  listings << listing10

  listing11 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "13 Stone St",
    city: "Cold Spring",
    state: "New York",
    country: "United States",
    title: "Cozy Retreat in Cold Spring",
    description: "Experience a cozy retreat in the heart of Cold Spring with this charming tiny home. Perfect for a romantic getaway or solo escape, this 1-bedroom, 1-bathroom house offers a peaceful atmosphere. Enjoy the warmth of the fireplace, relax in the tranquil surroundings, and bring your furry friend along. WiFi, TV, parking, and pet-friendly amenities are available for your convenience.",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 218.0,
    cleaning_fee: 85.0,
    category: "tiny home",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: false,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing11

  # 12
  listing12 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "39 E 72nd St",
    city: "Manhattan",
    state: "New York",
    country: "United States",
    title: "Luxurious Manhattan Mansion",
    description: "Indulge in the grandeur of this magnificent mansion located in the prestigious neighborhood of Manhattan. With 5 bedrooms, 4 bathrooms, and elegant decor throughout, this luxurious retreat offers ample space and comfort. Enjoy modern amenities including WiFi, AC, and parking. Bring your pets along and unwind by the fireplace in this opulent escape.",
    num_beds: 7,
    num_bedrooms: 5,
    num_bathrooms: 4,
    night_price: 849.0,
    cleaning_fee: 189.0,
    category: "mansion",
    has_wifi: true,
    has_pets: true,
    has_kitchen: false,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing12

  # 13
  listing13 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Cabin",
    address: "616 Long Hill Rd",
    city: "Middletown",
    state: "Connecticut",
    country: "United States",
    title: "Rustic Barn Cabin Retreat",
    description: "Experience the ultimate cozy cabin retreat in the heart of Middletown, Connecticut. This charming barn-style cabin offers 2 bedrooms, 1 bathroom, and a warm and inviting atmosphere. Bring your furry friends along for an unforgettable getaway. With a fully equipped kitchen, TV for entertainment, and a fireplace to gather around, this is the perfect escape from the hustle and bustle of everyday life.",
    num_beds: 3,
    num_bedrooms: 2,
    num_bathrooms: 1,
    night_price: 235.0,
    cleaning_fee: 60.0,
    category: "barn",
    has_wifi: false,
    has_pets: true,
    has_kitchen: true,
    has_ac: false,
    has_heat: false,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing13

  # 14
  listing14 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Apartment",
    address: "Jalan Perai Jaya 6",
    apt_num: "Apt 6J",
    city: "Perai",
    state: "Pulau Pinang",
    country: "Malaysia",
    title: "Tranquil Countryside Apartment in Perai",
    description: "Escape to the serene countryside of Perai, Malaysia with our cozy and inviting apartment. Nestled in the beautiful Taman Teluk Indah, this two-bedroom retreat offers a peaceful getaway surrounded by nature. Enjoy modern amenities including WiFi, a fully-equipped kitchen, and air conditioning. Ideal for pet owners, you can bring your furry friends along for a memorable stay. Unwind in the comfortable living space and take advantage of convenient parking. Experience the tranquility of the countryside while being just a short drive away from the bustling city.",
    num_beds: 2,
    num_bedrooms: 2,
    num_bathrooms: 1,
    night_price: 157.0,
    cleaning_fee: 45.0,
    category: "countryside",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: false,
  )

  listings << listing14

  # 15
  listing15 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "888 Brannan St",
    city: "San Francisco",
    state: "California",
    country: "USA",
    title: "Luxurious Mansion Retreat in the Heart of San Francisco",
    description: "Indulge in the epitome of extravagance with our opulent mansion nestled in the vibrant city of San Francisco. This architectural masterpiece on Brannan Street offers unparalleled luxury and grandeur. Immerse yourself in the lavishness of spacious bedrooms, adorned with elegant furnishings and exquisite decor. Delight in the state-of-the-art amenities including WiFi, a fully-equipped kitchen, and a mesmerizing fireplace. Indulge in the grandeur of this prestigious mansion and create unforgettable memories in the lap of luxury. Your dream getaway awaits.",
    num_beds: 12,
    num_bedrooms: 8,
    num_bathrooms: 5,
    night_price: 1299.0,
    cleaning_fee: 300.0,
    category: "mansion",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing15

  # 16
  listing16 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Private Room",
    address: "2500 Western Ave",
    apt_num: "8L",
    city: "Seattle",
    state: "Washington",
    country: "USA",
    title: "Private room close by downtown Seattle",
    description: "Welcome to our place! Conveniently located on Western Avenue, just a stone's throw away from downtown Seattle. Immerse yourself in the vibrant culinary scene with a plethora of renowned restaurants and cafes within walking distance. Explore famous attractions like Pike Place Market and the Space Needle, mere minutes from your doorstep. After a day of adventure, retreat to our modern and comfortable room, equipped with all the amenities you need for a pleasant stay. Experience the perfect blend of convenience, comfort, and proximity to Seattle's most iconic destinations.",
    num_beds: 2,
    num_bedrooms: 2,
    num_bathrooms: 1,
    night_price: 136.0,
    cleaning_fee: 30.0,
    category: "modern",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: false,
    has_fireplace: false,
  )

  listings << listing16

  puts "Listings created!"

  puts "Creating reservations..."

  res1_1 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: demo_user.id,
    num_guests: 4,
    start_date: Date.today + 1,
    end_date: Date.today + 5,
  )

  res1_2 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[5].id,
    num_guests: 3,
    start_date: Date.today + 6,
    end_date: Date.today + 8,
  )

  res2_1 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.today + 30,
    end_date: Date.today + 35,
  )

  res2_2 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[10].id,
    num_guests: 1,
    start_date: Date.today + 17,
    end_date: Date.today + 20,
  )

  res3_1 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[3].id,
    num_guests: 7,
    start_date: Date.today + 2,
    end_date: Date.today + 4,
  )

  res3_2 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[8].id,
    num_guests: 5,
    start_date: Date.today + 6,
    end_date: Date.today + 9,
  )

  res_5_1 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[11].id,
    num_guests: 6,
    start_date: Date.new(2023, 5, 31),
    end_date: Date.new(2023, 6, 4),
  )

  res_6_1 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 5, 17),
    end_date: Date.new(2023, 5, 19),
  )

  res9_1 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: demo_user.id,
    num_guests: 1,
    start_date: Date.today + 8,
    end_date: Date.today + 11,
  )

  res10_1 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: demo_user.id,
    num_guests: 1,
    start_date: Date.today + 40,
    end_date: Date.today + 43,
  )

  res13_1 = Reservation.create!(
    listing_id: listing13.id,
    guest_id: users[9].id,
    num_guests: 4,
    start_date: Date.today + 5,
    end_date: Date.today + 11,
  )

  res15_1 = Reservation.create!(
    listing_id: listing15.id,
    guest_id: demo_user.id,
    num_guests: 16,
    start_date: Date.today + 17,
    end_date: Date.today + 20,
  )

  puts "Reservations created!"
end

puts "Attaching photos to Listings"

listings.each_with_index do |listing, i|
    listing.photos.attach([
      {io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{1}.webp"), filename: "listing#{i + 1}_#{1}.webp"},
      {io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{2}.webp"), filename: "listing#{i + 1}_#{2}.webp"},
      {io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{3}.webp"), filename: "listing#{i + 1}_#{3}.webp"},
      {io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{4}.webp"), filename: "listing#{i + 1}_#{4}.webp"},
      {io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{5}.webp"), filename: "listing#{i + 1}_#{5}.webp"},
    ])
end

puts "Done!"