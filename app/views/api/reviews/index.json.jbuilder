json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review, :reservation_id, :reviewer_id, :overall_rating, :body
      reviewer_name = review.reviewer.first_name + " " + review.reviewer.last_name
      json.listingId @listing.id
      json.reviewer reviewer_name
    end
  end
end
