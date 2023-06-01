class Api::ListingsController < ApplicationController

    def categories
        render json: Listing::CATEGORIES
    end

    def index
        @listings = Listing.all
        render :index
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        if @listing
            render :show
        else
            render json: { errors: ["Oops... That listing doesn't exist!"] }, status: 404
        end

    end
end
