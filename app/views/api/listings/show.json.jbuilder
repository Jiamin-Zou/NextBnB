json.listing do
    json.partial! 'listing', listing: @listing
end

json.host do
    host = @listing.host
    json.set! host.id do
        json.extract! host, :id, :first_name, :last_name
    end
end