json.listings do
  @listings.each do |listing|
    json.set! listing.id do
      json.partial! "listing", listing: listing
    end
  end
end

reservations = Reservation.all
json.reservations do
  reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :listing_id, :guest_id, :num_guests, :total_price, :start_date, :end_date
    end
  end
end
