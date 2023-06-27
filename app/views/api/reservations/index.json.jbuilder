json.reservations do
  @reservations.each do |reservation|
    json.set! reservation.id do
      json.partial! "reservation", reservation: reservation
    end
  end
end

json.listings do
  @listings.each do |listing|
    json.set! listing.id do
      json.partial! "api/listings/listing", listing: listing
    end
  end
end

listingsData = @listings.includes(:host)

json.hosts do
  listingsData.each do |listing|
    host = listing.host
    json.set! host.id do
      json.extract! host, :id, :first_name, :last_name
    end
  end
end
