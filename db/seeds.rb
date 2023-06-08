require "open-uri"

listings = []

ApplicationRecord.transaction do
  puts "Destroying tables..."
  User.destroy_all
  Listing.destroy_all
  Reservation.destroy_all
  Review.destroy_all

  puts "Deleting Active Storage attachments and blobs..."
  ActiveStorage::Attachment.delete_all
  ActiveStorage::Blob.delete_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!("users")
  ApplicationRecord.connection.reset_pk_sequence!("listings")
  ApplicationRecord.connection.reset_pk_sequence!("reservations")
  ApplicationRecord.connection.reset_pk_sequence!("reviews")
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

  puts "Total users generated: #{users.length}"

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
    night_price: 1967.0,
    cleaning_fee: 689.0,
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

  listing17 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Apartment",
    address: "440 W 41st St",
    apt_num: "16H",
    city: "Manhattan",
    state: "New York",
    country: "USA",
    title: "Chic City Abode | 2BR/2BA",
    description: "Immerse yourself in a sophisticated retreat at this impeccably positioned condo in the heart of Midtown Manhattan. Embrace the essence of New York living as you step into this exquisite escape, where sweeping city vistas greet you at every turn. From the mesmerizing sunrise to the captivating sunset, indulge in breathtaking views that will leave you in awe. With its spacious layout, family-friendly atmosphere, and meticulous design, this condo offers a true sense of comfort and homeliness in the world's greatest city. Experience the epitome of stylish living and create cherished memories in this remarkable urban oasis.",
    num_beds: 2,
    num_bedrooms: 2,
    num_bathrooms: 2,
    night_price: 537.0,
    cleaning_fee: 219.0,
    category: "omg",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: false,
  )

  listings << listing17

  listing18 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "Cabin",
    address: "607 Stewart Creek Rd",
    city: "Lehighton",
    state: "Pennsylvania",
    country: "USA",
    title: "Tiny cabin with outdoor hot tub",
    description: "Discover a serene off-grid retreat nestled in a sprawling twelve-acre estate, where a gentle brook meanders alongside. Immerse yourself in the captivating beauty of this Japanese-inspired tiny cabin, perched atop a deck overlooking a tranquil waterway fed by a year-round natural spring. Relax and rejuvenate in the cedar-lined, in-ground hot tub, heated by a wood-burning stove, as you marvel at the surrounding wooded scenery. With its alternative power source and eco-friendly design, this private oasis offers a unique glamping experience—one of two magnificent sites within the expansive grounds.",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 190.0,
    cleaning_fee: 60.0,
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

  listings << listing18

  listing19 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "20 Ellen Dr",
    city: "Browns Mills",
    state: "New Jersey",
    country: "USA",
    title: "Cottage with gorgeous pond view",
    description: "Immerse yourself in the beauty of nature at this enchanting cottage in Browns Mills, New Jersey. Bask in the breathtaking views of the tranquil pond just steps away from your doorstep. Explore the pristine waters by kayak, or venture onto nearby trails for exhilarating hikes through picturesque landscapes. With two bedrooms, a cozy fireplace, and ample space to unwind, this retreat offers a perfect blend of comfort and natural splendor. Experience the serenity of lakeside living and create cherished memories in this idyllic getaway.",
    num_beds: 4,
    num_bedrooms: 2,
    num_bathrooms: 2,
    night_price: 255.0,
    cleaning_fee: 129.0,
    category: "lakefront",
    has_wifi: true,
    has_pets: true,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing19

  listing20 = Listing.create!(
    host_id: generate_random_user_id(users),
    property_type: "House",
    address: "244 Banks Rd",
    city: "Easton",
    state: "Connecticut",
    country: "USA",
    title: "Luxurious Mansion Retreat in Tranquil Easton",
    description: "Indulge in the ultimate luxury at this magnificent mansion nestled in the serene town of Easton, Connecticut. With nine beds, six bedrooms, and six bathrooms, this opulent retreat offers ample space for relaxation and entertainment. Immerse yourself in the grandeur of the meticulously designed interiors, featuring modern amenities and elegant decor. Enjoy the convenience of WiFi, a fully equipped kitchen, AC, and a cozy fireplace. With pristine surroundings and impeccable craftsmanship, this mansion provides a haven of tranquility and sophistication. Experience a lavish escape like no other, where every detail is crafted to perfection.",
    num_beds: 9,
    num_bedrooms: 6,
    num_bathrooms: 6,
    night_price: 1855.0,
    cleaning_fee: 541.0,
    category: "mansion",
    has_wifi: true,
    has_pets: false,
    has_kitchen: true,
    has_ac: true,
    has_heat: true,
    has_tv: true,
    has_parking: true,
    has_fireplace: true,
  )

  listings << listing20

  puts "Listings created!"

  puts "Total listings generated: #{listings.length}"

  puts "Creating reservations..."

  res1_1 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: demo_user.id,
    num_guests: 4,
    start_date: Date.new(2022, 11, 30),
    end_date: Date.new(2022, 12, 8),
  )

  res1_2 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[5].id,
    num_guests: 3,
    start_date: Date.new(2023, 5, 16),
    end_date: Date.new(2023, 5, 19),
  )

  res1_3 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[3].id,
    num_guests: 3,
    start_date: Date.new(2023, 6, 13),
    end_date: Date.new(2023, 6, 19),
  )

  res1_4 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[18].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 6),
    end_date: Date.new(2023, 7, 11),
  )

  res1_5 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[8].id,
    num_guests: 3,
    start_date: Date.new(2023, 7, 15),
    end_date: Date.new(2023, 7, 17),
  )

  res1_6 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[15].id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 18),
    end_date: Date.new(2023, 9, 22),
  )

  res1_7 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[11].id,
    num_guests: 4,
    start_date: Date.new(2023, 9, 28),
    end_date: Date.new(2023, 10, 1),
  )
  res1_8 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[2].id,
    num_guests: 3,
    start_date: Date.new(2023, 10, 9),
    end_date: Date.new(2023, 10, 16),
  )
  res1_9 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[16].id,
    num_guests: 2,
    start_date: Date.new(2023, 11, 3),
    end_date: Date.new(2023, 11, 10),
  )
  res1_10 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[7].id,
    num_guests: 2,
    start_date: Date.new(2023, 12, 5),
    end_date: Date.new(2023, 12, 8),
  )
  res1_11 = Reservation.create!(
    listing_id: listing1.id,
    guest_id: users[14].id,
    num_guests: 3,
    start_date: Date.new(2023, 12, 16),
    end_date: Date.new(2023, 12, 20),
  )

  res2_1 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[5].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 20),
    end_date: Date.new(2023, 6, 21),
  )

  res2_2 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 11),
    end_date: Date.new(2023, 7, 15),
  )

  res2_2 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[10].id,
    num_guests: 1,
    start_date: Date.new(2023, 7, 19),
    end_date: Date.new(2023, 7, 21),
  )

  res2_3 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[13].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 4),
    end_date: Date.new(2023, 8, 6),
  )
  res2_4 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[4].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 19),
    end_date: Date.new(2023, 8, 23),
  )
  res2_5 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[9].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 26),
    end_date: Date.new(2023, 8, 30),
  )
  res2_6 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[17].id,
    num_guests: 1,
    start_date: Date.new(2023, 9, 14),
    end_date: Date.new(2023, 9, 27),
  )
  res2_7 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[14].id,
    num_guests: 1,
    start_date: Date.new(2023, 11, 5),
    end_date: Date.new(2023, 11, 9),
  )
  res2_8 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[7].id,
    num_guests: 3,
    start_date: Date.new(2023, 11, 28),
    end_date: Date.new(2023, 12, 4),
  )
  res2_9 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[13].id,
    num_guests: 1,
    start_date: Date.new(2023, 12, 11),
    end_date: Date.new(2023, 12, 13),
  )
  res2_10 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[18].id,
    num_guests: 2,
    start_date: Date.new(2024, 1, 3),
    end_date: Date.new(2024, 1, 7),
  )
  res2_11 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[5].id,
    num_guests: 2,
    start_date: Date.new(2024, 1, 19),
    end_date: Date.new(2024, 1, 22),
  )
  res2_12 = Reservation.create!(
    listing_id: listing2.id,
    guest_id: users[8].id,
    num_guests: 2,
    start_date: Date.new(2024, 2, 8),
    end_date: Date.new(2024, 2, 11),
  )

  res3_1 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[3].id,
    num_guests: 7,
    start_date: Date.new(2023, 1, 18),
    end_date: Date.new(2023, 1, 21),
  )
  res3_2 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[3].id,
    num_guests: 6,
    start_date: Date.new(2023, 6, 12),
    end_date: Date.new(2023, 6, 16),
  )
  res3_3 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[8].id,
    num_guests: 8,
    start_date: Date.new(2023, 6, 29),
    end_date: Date.new(2023, 7, 2),
  )
  res3_4 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[2].id,
    num_guests: 6,
    start_date: Date.new(2023, 7, 21),
    end_date: Date.new(2023, 7, 26),
  )

  res3_5 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[10].id,
    num_guests: 8,
    start_date: Date.new(2023, 8, 7),
    end_date: Date.new(2023, 8, 12),
  )
  res3_6 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: demo_user.id,
    num_guests: 7,
    start_date: Date.new(2023, 8, 17),
    end_date: Date.new(2023, 8, 20),
  )
  res3_6 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[14].id,
    num_guests: 7,
    start_date: Date.new(2023, 9, 9),
    end_date: Date.new(2023, 9, 12),
  )
  res3_7 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[17].id,
    num_guests: 6,
    start_date: Date.new(2023, 10, 4),
    end_date: Date.new(2023, 10, 8),
  )
  res3_8 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[6].id,
    num_guests: 6,
    start_date: Date.new(2023, 11, 18),
    end_date: Date.new(2023, 11, 22),
  )
  res3_9 = Reservation.create!(
    listing_id: listing3.id,
    guest_id: users[16].id,
    num_guests: 7,
    start_date: Date.new(2023, 12, 3),
    end_date: Date.new(2023, 12, 6),
  )

  res4_1 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2022, 12, 17),
    end_date: Date.new(2022, 12, 20),
  )
  res4_2 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[19].id,
    num_guests: 1,
    start_date: Date.new(2023, 7, 2),
    end_date: Date.new(2023, 7, 5),
  )
  res4_3 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[11].id,
    num_guests: 1,
    start_date: Date.new(2023, 7, 22),
    end_date: Date.new(2023, 7, 28),
  )
  res4_4 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[13].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 15),
    end_date: Date.new(2023, 8, 17),
  )
  res4_5 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[7].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 23),
    end_date: Date.new(2023, 8, 27),
  )
  res4_6 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[4].id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 7),
    end_date: Date.new(2023, 9, 9),
  )
  res4_8 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[8].id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 26),
    end_date: Date.new(2023, 10, 1),
  )
  res4_9 = Reservation.create!(
    listing_id: listing4.id,
    guest_id: users[13].id,
    num_guests: 2,
    start_date: Date.new(2023, 10, 19),
    end_date: Date.new(2023, 10, 25),
  )

  res_5_1 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[11].id,
    num_guests: 6,
    start_date: Date.new(2023, 5, 17),
    end_date: Date.new(2023, 5, 19),
  )
  res_5_2 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[4].id,
    num_guests: 7,
    start_date: Date.new(2023, 6, 6),
    end_date: Date.new(2023, 6, 10),
  )
  res_5_3 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[7].id,
    num_guests: 8,
    start_date: Date.new(2023, 6, 21),
    end_date: Date.new(2023, 6, 29),
  )
  res_5_4 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[9].id,
    num_guests: 5,
    start_date: Date.new(2023, 7, 16),
    end_date: Date.new(2023, 7, 18),
  )
  res_5_5 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[5].id,
    num_guests: 6,
    start_date: Date.new(2023, 7, 31),
    end_date: Date.new(2023, 8, 2),
  )
  res_5_6 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[15].id,
    num_guests: 6,
    start_date: Date.new(2023, 8, 16),
    end_date: Date.new(2023, 8, 17),
  )
  res_5_7 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[4].id,
    num_guests: 3,
    start_date: Date.new(2023, 9, 11),
    end_date: Date.new(2023, 9, 15),
  )
  res_5_8 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[17].id,
    num_guests: 6,
    start_date: Date.new(2023, 10, 3),
    end_date: Date.new(2023, 10, 6),
  )
  res_5_9 = Reservation.create!(
    listing_id: listing5.id,
    guest_id: users[14].id,
    num_guests: 5,
    start_date: Date.new(2023, 11, 14),
    end_date: Date.new(2023, 11, 16),
  )

  res_6_1 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 2, 11),
    end_date: Date.new(2023, 2, 14),
  )
  res_6_2 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[3].id,
    num_guests: 4,
    start_date: Date.new(2023, 6, 7),
    end_date: Date.new(2023, 6, 11),
  )
  res_6_3 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[10].id,
    num_guests: 3,
    start_date: Date.new(2023, 6, 27),
    end_date: Date.new(2023, 6, 30),
  )
  res_6_4 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[11].id,
    num_guests: 4,
    start_date: Date.new(2023, 7, 23),
    end_date: Date.new(2023, 7, 26),
  )
  res_6_5 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[12].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 8),
    end_date: Date.new(2023, 8, 14),
  )
  res_6_6 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[15].id,
    num_guests: 4,
    start_date: Date.new(2023, 9, 8),
    end_date: Date.new(2023, 9, 13),
  )
  res_6_7 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[13].id,
    num_guests: 4,
    start_date: Date.new(2023, 10, 10),
    end_date: Date.new(2023, 10, 12),
  )
  res_6_8 = Reservation.create!(
    listing_id: listing6.id,
    guest_id: users[6].id,
    num_guests: 3,
    start_date: Date.new(2023, 11, 2),
    end_date: Date.new(2023, 11, 6),
  )

  res_7_1 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2022, 12, 28),
    end_date: Date.new(2023, 1, 1),
  )
  res_7_2 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[0].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 13),
    end_date: Date.new(2023, 6, 15),
  )
  res_7_3 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[2].id,
    num_guests: 1,
    start_date: Date.new(2023, 6, 25),
    end_date: Date.new(2023, 6, 29),
  )
  res_7_4 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[5].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 18),
    end_date: Date.new(2023, 7, 23),
  )
  res_7_5 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 1),
    end_date: Date.new(2023, 8, 5),
  )
  res_7_6 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[11].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 17),
    end_date: Date.new(2023, 8, 20),
  )
  res_7_7 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[9].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 23),
    end_date: Date.new(2023, 8, 27),
  )
  res_7_8 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[10].id,
    num_guests: 1,
    start_date: Date.new(2023, 9, 6),
    end_date: Date.new(2023, 9, 9),
  )
  res_7_9 = Reservation.create!(
    listing_id: listing7.id,
    guest_id: users[12].id,
    num_guests: 2,
    start_date: Date.new(2023, 10, 9),
    end_date: Date.new(2023, 10, 15),
  )

  res_8_1 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: users[12].id,
    num_guests: 3,
    start_date: Date.new(2023, 6, 15),
    end_date: Date.new(2023, 6, 19),
  )
  res_8_2 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: users[14].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 27),
    end_date: Date.new(2023, 6, 29),
  )
  res_8_3 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: demo_user.id,
    num_guests: 3,
    start_date: Date.new(2023, 7, 4),
    end_date: Date.new(2023, 7, 8),
  )
  res_8_4 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: users[0].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 23),
    end_date: Date.new(2023, 7, 29),
  )
  res_8_5 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: users[11].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 14),
    end_date: Date.new(2023, 8, 19),
  )
  res_8_6 = Reservation.create!(
    listing_id: listing8.id,
    guest_id: users[7].id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 21),
    end_date: Date.new(2023, 9, 23),
  )

  res9_1 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: users[2].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 5),
    end_date: Date.new(2023, 6, 8),
  )
  res9_2 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 19),
    end_date: Date.new(2023, 6, 23),
  )
  res9_3 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: users[0].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 2),
    end_date: Date.new(2023, 7, 8),
  )
  res9_4 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: users[3].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 19),
    end_date: Date.new(2023, 7, 26),
  )
  res9_5 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: users[4].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 21),
    end_date: Date.new(2023, 8, 23),
  )
  res9_6 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 3),
    end_date: Date.new(2023, 9, 9),
  )
  res9_7 = Reservation.create!(
    listing_id: listing9.id,
    guest_id: users[10].id,
    num_guests: 2,
    start_date: Date.new(2023, 10, 11),
    end_date: Date.new(2023, 10, 15),
  )

  res10_1 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: demo_user.id,
    num_guests: 1,
    start_date: Date.new(2023, 5, 30),
    end_date: Date.new(2023, 6, 2),
  )
  res10_2 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: users[12].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 17),
    end_date: Date.new(2023, 7, 19),
  )
  res10_3 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: users[7].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 29),
    end_date: Date.new(2023, 8, 1),
  )
  res10_4 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: users[5].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 15),
    end_date: Date.new(2023, 8, 18),
  )
  res10_5 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: users[7].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 27),
    end_date: Date.new(2023, 9, 3),
  )
  res10_6 = Reservation.create!(
    listing_id: listing10.id,
    guest_id: users[9].id,
    num_guests: 2,
    start_date: Date.new(2023, 9, 9),
    end_date: Date.new(2023, 9, 13),
  )

  res11_1 = Reservation.create!(
    listing_id: listing11.id,
    guest_id: users[6].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 29),
    end_date: Date.new(2023, 7, 3),
  )
  res11_2 = Reservation.create!(
    listing_id: listing11.id,
    guest_id: users[2].id,
    num_guests: 2,
    start_date: Date.new(2023, 7, 19),
    end_date: Date.new(2023, 7, 22),
  )
  res11_3 = Reservation.create!(
    listing_id: listing11.id,
    guest_id: users[0].id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 1),
    end_date: Date.new(2023, 8, 7),
  )
  res11_4 = Reservation.create!(
    listing_id: listing11.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 8, 8),
    end_date: Date.new(2023, 8, 10),
  )

  res12_1 = Reservation.create!(
    listing_id: listing12.id,
    guest_id: users[11].id,
    num_guests: 8,
    start_date: Date.new(2023, 6, 13),
    end_date: Date.new(2023, 6, 15),
  )
  res12_2 = Reservation.create!(
    listing_id: listing12.id,
    guest_id: users[4].id,
    num_guests: 10,
    start_date: Date.new(2023, 7, 1),
    end_date: Date.new(2023, 7, 4),
  )
  res12_3 = Reservation.create!(
    listing_id: listing12.id,
    guest_id: users[8].id,
    num_guests: 9,
    start_date: Date.new(2023, 7, 12),
    end_date: Date.new(2023, 7, 13),
  )
  res12_4 = Reservation.create!(
    listing_id: listing12.id,
    guest_id: users[14].id,
    num_guests: 9,
    start_date: Date.new(2023, 8, 9),
    end_date: Date.new(2023, 8, 12),
  )
  res12_5 = Reservation.create!(
    listing_id: listing12.id,
    guest_id: users[18].id,
    num_guests: 7,
    start_date: Date.new(2023, 9, 2),
    end_date: Date.new(2023, 9, 5),
  )

  res13_1 = Reservation.create!(
    listing_id: listing13.id,
    guest_id: users[9].id,
    num_guests: 4,
    start_date: Date.new(2023, 6, 14),
    end_date: Date.new(2023, 6, 17),
  )
  res13_2 = Reservation.create!(
    listing_id: listing13.id,
    guest_id: users[5].id,
    num_guests: 5,
    start_date: Date.new(2023, 7, 8),
    end_date: Date.new(2023, 7, 20),
  )
  res13_3 = Reservation.create!(
    listing_id: listing13.id,
    guest_id: users[10].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 11),
    end_date: Date.new(2023, 8, 15),
  )
  res13_4 = Reservation.create!(
    listing_id: listing13.id,
    guest_id: demo_user.id,
    num_guests: 4,
    start_date: Date.new(2023, 8, 19),
    end_date: Date.new(2023, 8, 23),
  )

  res14_1 = Reservation.create!(
    listing_id: listing14.id,
    guest_id: users[3].id,
    num_guests: 4,
    start_date: Date.new(2023, 6, 11),
    end_date: Date.new(2023, 6, 12),
  )
  res14_2 = Reservation.create!(
    listing_id: listing14.id,
    guest_id: users[7].id,
    num_guests: 4,
    start_date: Date.new(2023, 6, 27),
    end_date: Date.new(2023, 6, 30),
  )
  res14_3 = Reservation.create!(
    listing_id: listing14.id,
    guest_id: users[17].id,
    num_guests: 4,
    start_date: Date.new(2023, 7, 8),
    end_date: Date.new(2023, 7, 15),
  )
  res14_4 = Reservation.create!(
    listing_id: listing14.id,
    guest_id: users[16].id,
    num_guests: 4,
    start_date: Date.new(2023, 8, 20),
    end_date: Date.new(2023, 8, 24),
  )

  res15_1 = Reservation.create!(
    listing_id: listing15.id,
    guest_id: users[1].id,
    num_guests: 20,
    start_date: Date.new(2023, 7, 2),
    end_date: Date.new(2023, 7, 4),
  )
  res15_2 = Reservation.create!(
    listing_id: listing15.id,
    guest_id: demo_user.id,
    num_guests: 18,
    start_date: Date.new(2023, 7, 8),
    end_date: Date.new(2023, 7, 10),
  )

  res15_3 = Reservation.create!(
    listing_id: listing15.id,
    guest_id: users[14].id,
    num_guests: 19,
    start_date: Date.new(2023, 7, 18),
    end_date: Date.new(2023, 7, 21),
  )

  res16_1 = Reservation.create!(
    listing_id: listing16.id,
    guest_id: demo_user.id,
    num_guests: 3,
    start_date: Date.new(2023, 3, 18),
    end_date: Date.new(2023, 3, 22),
  )
  res16_2 = Reservation.create!(
    listing_id: listing16.id,
    guest_id: users[16].id,
    num_guests: 3,
    start_date: Date.new(2023, 8, 9),
    end_date: Date.new(2023, 8, 19),
  )
  res16_3 = Reservation.create!(
    listing_id: listing16.id,
    guest_id: users[16].id,
    num_guests: 3,
    start_date: Date.new(2023, 10, 13),
    end_date: Date.new(2023, 10, 16),
  )
  res17_1 = Reservation.create!(
    listing_id: listing17.id,
    guest_id: demo_user.id,
    num_guests: 4,
    start_date: Date.new(2023, 9, 27),
    end_date: Date.new(2023, 9, 29),
  )
  res17_2 = Reservation.create!(
    listing_id: listing17.id,
    guest_id: users[19].id,
    num_guests: 3,
    start_date: Date.new(2023, 6, 24),
    end_date: Date.new(2023, 6, 30),
  )

  res18_1 = Reservation.create!(
    listing_id: listing18.id,
    guest_id: users[19].id,
    num_guests: 2,
    start_date: Date.new(2023, 6, 24),
    end_date: Date.new(2023, 6, 30),
  )
  res18_2 = Reservation.create!(
    listing_id: listing18.id,
    guest_id: users[9].id,
    num_guests: 1,
    start_date: Date.new(2023, 8, 3),
    end_date: Date.new(2023, 8, 11),
  )
  res18_3 = Reservation.create!(
    listing_id: listing18.id,
    guest_id: demo_user.id,
    num_guests: 2,
    start_date: Date.new(2023, 5, 12),
    end_date: Date.new(2023, 5, 14),
  )

  res19_1 = Reservation.create!(
    listing_id: listing19.id,
    guest_id: demo_user.id,
    num_guests: 4,
    start_date: Date.new(2023, 4, 6),
    end_date: Date.new(2023, 4, 9),
  )

  res20_1 = Reservation.create!(
    listing_id: listing20.id,
    guest_id: demo_user.id,
    num_guests: 10,
    start_date: Date.new(2023, 7, 12),
    end_date: Date.new(2023, 7, 15),
  )
  res20_2 = Reservation.create!(
    listing_id: listing20.id,
    guest_id: users[16].id,
    num_guests: 20,
    start_date: Date.new(2023, 9, 12),
    end_date: Date.new(2023, 9, 17),
  )

  puts "Reservations created!"

  reservations = Reservation.all

  puts "Total reservations generated: #{reservations.length}"



  puts "Creating reviews..."

  def generate_reviews(reservations)
    reviews = []
    
    review_texts = [
      "We had an amazing stay at this place! The cleanliness and accuracy were top-notch. The host was very communicative and the check-in process was seamless.",
      "The value for the price was unbeatable. The location was perfect for exploring the city and the overall experience exceeded our expectations.",
      "We thoroughly enjoyed our stay here. The host was friendly and the communication was excellent. The check-in was smooth and the location was convenient.",
      "The cleanliness of the place was exceptional. The accuracy of the listing matched our expectations perfectly. We would definitely recommend this place to others.",
      "The value for the price was outstanding. The communication with the host was prompt and helpful. The location was ideal for exploring nearby attractions.",
      "We had a wonderful time staying here. The check-in process was easy, and the host provided all the necessary information. The location was beautiful and peaceful.",
      "Everything about our stay was fantastic. The cleanliness, accuracy, and communication were all superb. The value for the price exceeded our expectations.",
      "We loved our time at this place. The host was very accommodating and the check-in was hassle-free. The location was great with easy access to local amenities.",
      "We absolutely loved our stay at this place! The cleanliness was impeccable, and the host's communication was outstanding. The location was perfect for exploring the city.",
      "The accuracy of the listing was spot on, and the value for the price exceeded our expectations. The check-in process was seamless, and the host provided great recommendations for local attractions.",
      "We had a fantastic experience staying here. The host was incredibly responsive and accommodating. The check-in was smooth, and the overall cleanliness and comfort of the place were exceptional.",
      "We had a wonderful time at this charming accommodation. The host went above and beyond to ensure our stay was enjoyable. The location was peaceful, and the cleanliness of the place was top-notch.",
      "Our stay at this place was amazing! The host was friendly and communicative, making us feel welcome throughout our visit. The accuracy of the listing and the overall value were excellent.",
      "We had a delightful time at this property. The check-in process was easy, and the host provided clear instructions. The cleanliness and comfort of the place were exceptional.",
      "The host was incredibly helpful and responsive throughout our stay. The accuracy of the listing and the cleanliness of the place were outstanding. We would highly recommend this accommodation.",
      "We had a fantastic stay at this place. The location was convenient, and the host's communication was excellent. The cleanliness and amenities provided were top-notch.",
      "Our experience at this accommodation was wonderful. The host was attentive, and the check-in process was seamless. The cleanliness and accuracy of the listing were exceptional.",
      "We had a great time staying at this property. The host was friendly and responsive, and the overall value for the price was excellent. The cleanliness and comfort exceeded our expectations."
    ]
    
    reservations.each_with_index do |reservation, index|
      review = {
        reservation_id: reservation.id,
        reviewer_id: reservation.guest_id,
        cleanliness: rand(4..5),
        accuracy: rand(4..5),
        value: rand(4..5),
        communication: rand(4..5),
        check_in: rand(4..5),
        location: rand(4..5),
        body: review_texts.sample
      }
      
      reviews << review
    end
    
    Review.create!(reviews)
  end

  generate_reviews(reservations)
  
  puts "Reviews created!"
  reviews = Review.all
  puts "Total reviews generated: #{reviews.length}"
end

puts "Attaching photos to Listings"

listings.each_with_index do |listing, i|
  listing.photos.attach([
    { io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{1}.webp"), filename: "listing#{i + 1}_#{1}.webp" },
    { io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{2}.webp"), filename: "listing#{i + 1}_#{2}.webp" },
    { io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{3}.webp"), filename: "listing#{i + 1}_#{3}.webp" },
    { io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{4}.webp"), filename: "listing#{i + 1}_#{4}.webp" },
    { io: URI.open("https://nextbnb-seed.s3.amazonaws.com/listings/listing#{i + 1}_#{5}.webp"), filename: "listing#{i + 1}_#{5}.webp" },
  ])
end

puts "Done!"
