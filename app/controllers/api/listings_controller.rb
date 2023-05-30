class Api::ListingsController < ApplicationController

    def index
        @listings = Listing.all
        render :index
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        if @listing
            render :show
        else
            render json: { errors: ["Listing does not exist"] }, status: 404
        end

    end
end
