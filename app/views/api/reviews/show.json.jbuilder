json.review do
    json.extract! @review, :id, :reservation_id, :reviewer_id, :cleanliness, :accuracy, :value, :communication, :check_in, :location, :overall_rating, :body
end