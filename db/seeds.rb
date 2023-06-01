ApplicationRecord.transaction do
  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!("users")
  ApplicationRecord.connection.reset_pk_sequence!("listings")

  puts "Creating users..."

  # Demo User
  User.create!(
    first_name: "Demo",
    last_name: "User",
    email: "demo.user@test.com",
    password: "demouser",
  )

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

    User.create!({
      first_name: f_name,
      last_name: l_name,
      email: Faker::Internet.unique.email(name: email_name, domain: domain),
      password: Faker::Internet.password(min_length: 8, max_length: 20),
    })
  end

  puts "Users created!"

  puts "Creating listings..."

  Listing.create!(
    host_id: 2,
    property_type: "House",
    address: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "California",
    country: "United States",
    title: "Spacious House in Mountain View",
    description: "A spacious and beautiful house located in Mountain View, California.",
    num_beds: 4,
    num_bedrooms: 3,
    num_bathrooms: 2,
    night_price: 250.0,
    cleaning_fee: 80.0,
  )

  Listing.create!(
    host_id: 3,
    property_type: "Apartment",
    address: "221B Baker Street",
    city: "London",
    state: "England",
    country: "United Kingdom",
    title: "Cozy Apartment in London",
    description: "A cozy apartment located at the famous 221B Baker Street in London.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 180.0,
    cleaning_fee: 40.0,
  )

  Listing.create!(
    host_id: 4,
    property_type: "House",
    address: "Eiffel Tower",
    city: "Paris",
    state: "Ile-de-France",
    country: "France",
    title: "Luxury House near the Eiffel Tower",
    description: "A luxurious house situated near the iconic Eiffel Tower in Paris.",
    num_beds: 5,
    num_bedrooms: 4,
    num_bathrooms: 3,
    night_price: 350.0,
    cleaning_fee: 100.0,
  )

  Listing.create!(
    host_id: 5,
    property_type: "Apartment",
    address: "123 Broadway",
    apt_num: "Apt 4C",
    city: "New York",
    state: "NY",
    country: "USA",
    title: "Modern Apartment in Manhattan",
    description: "A modern and stylish apartment located in the heart of Manhattan.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 200.0,
    cleaning_fee: 50.0,
  )

  Listing.create!(
    host_id: 6,
    property_type: "House",
    address: "456 Park Avenue",
    city: "New York",
    state: "NY",
    country: "USA",
    title: "Luxury Townhouse on Park Avenue",
    description: "A luxurious townhouse situated on Park Avenue in New York City.",
    num_beds: 4,
    num_bedrooms: 3,
    num_bathrooms: 2,
    night_price: 400.0,
    cleaning_fee: 100.0,
  )

  Listing.create!(
    host_id: 7,
    property_type: "Apartment",
    address: "789 5th Avenue",
    apt_num: "Apt 15D",
    city: "New York",
    state: "NY",
    country: "USA",
    title: "Penthouse Apartment with Central Park View",
    description: "A luxurious penthouse apartment with stunning views of Central Park.",
    num_beds: 3,
    num_bedrooms: 2,
    num_bathrooms: 2,
    night_price: 350.0,
    cleaning_fee: 80.0,
  )

  Listing.create!(
    host_id: 8,
    property_type: "Apartment",
    address: "456 Carrer de Mallorca",
    apt_num: "Floor 2",
    city: "Barcelona",
    state: "Catalonia",
    country: "Spain",
    title: "Stylish Apartment in Barcelona",
    description: "A stylish apartment located in the vibrant city of Barcelona.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 180.0,
    cleaning_fee: 40.0,
  )

  Listing.create!(
    host_id: 9,
    property_type: "House",
    address: "123 Kensington High Street",
    city: "London",
    state: "England",
    country: "United Kingdom",
    title: "Spacious House in London",
    description: "A spacious house located in the bustling city of London.",
    num_beds: 5,
    num_bedrooms: 4,
    num_bathrooms: 3,
    night_price: 500.0,
    cleaning_fee: 120.0,
  )

  Listing.create!(
    host_id: 10,
    property_type: "Apartment",
    address: "3 Chome-17-6 Shinjuku",
    apt_num: "Unit 5A",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    title: "Modern Apartment in Shinjuku",
    description: "A modern apartment located in the vibrant Shinjuku district of Tokyo.",
    num_beds: 2,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 220.0,
    cleaning_fee: 50.0,
  )

  Listing.create!(
    host_id: 11,
    property_type: "Apartment",
    address: "123 Main Street",
    apt_num: "Unit 7B",
    city: "San Francisco",
    state: "California",
    country: "United States",
    title: "Modern Apartment in San Francisco",
    description: "A modern apartment located in the vibrant city of San Francisco.",
    num_beds: 1,
    num_bedrooms: 1,
    num_bathrooms: 1,
    night_price: 180.0,
    cleaning_fee: 40.0,
  )

  Listing.create!(
    host_id: 12,
    property_type: "House",
    address: "456 Oak Avenue",
    city: "Los Angeles",
    state: "California",
    country: "United States",
    title: "Spacious House in Los Angeles",
    description: "A spacious house located in the beautiful city of Los Angeles.",
    num_beds: 4,
    num_bedrooms: 3,
    num_bathrooms: 2,
    night_price: 350.0,
    cleaning_fee: 100.0
  )  

  puts "Listings created!"
  puts "Done!"
end
