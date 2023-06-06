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
