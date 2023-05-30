ApplicationRecord.transaction do 
    puts "Destroying tables..."
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."

    # Demo User
    User.create!(
        first_name: 'Demo',
        last_name: 'User', 
        email: 'demo.user@test.com', 
        password: 'demouser'
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
            "#{f_name}#{l_name[0]}#{rand(1..1000)}"
        ].sample
        domain = ["gmail.com", "yahoo.com", "gmx.com", "icloud.com", "hotmail.com", "outlook.com"].sample

        User.create!({
            first_name: f_name,
            last_name: l_name,
            email: Faker::Internet.unique.email(name: email_name, domain: domain),
            password: Faker::Internet.password(min_length: 6, max_length: 20)
        }) 
    end
  
    puts "Done!"
  end