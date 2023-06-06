json.listing do
  json.partial! "listing", listing: @listing
end

host = @listing.host
json.host do
  json.set! host.id do
    json.extract! host, :id, :first_name, :last_name
  end
end

reservations = @listing.reservations
json.reservations do
  reservations.each do |reservation|
    json.set! reservation.id do
      json.extract! reservation, :id, :listing_id, :guest_id, :num_guests, :total_price, :start_date, :end_date
    end
  end
end
