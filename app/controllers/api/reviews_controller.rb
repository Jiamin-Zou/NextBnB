class Api::ReviewsController < ApplicationController

    def index
        @listing = Listing.find_by(id: params[:listing_id])
        @reviews = @listing.reviews.includes(:reviewer)
        render :index
    end
end
