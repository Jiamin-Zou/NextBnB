class Api::ReviewsController < ApplicationController

    before_action :require_logged_in, only: [:create, :index, :show, :update, :destroy]
    before_action :set_review, only: [:show, :update, :destroy]

    wrap_parameters include: Reservation.attribute_names

    def index
        @listing = Listing.find_by(id: params[:listing_id])
        @reviews = @listing.reviews.includes(:reviewer)
        render :index
    end

    def create
        reservation = Reservation.find_by(id: params[:reservation_id])
        if (reservation)
            @review = Review.new(review_params)
            @review.reviewer_id = current_user.id
            if (reservation.save)
                render :show
            else
                render json: { errors: @review.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Attemping to review for non-existing reservation"]}
        end

    end

    def show
        debugger
        if @review
            render :show
        else
            render json: { errors: ["Review could not be found"] }, status: 404
        end
    end

    def update

    end

    def destroy

    end

    private

    def set_review
        @review = Review.find_by(id: params[:id])
    end

    def review_params
        params.require(review).permit(:reservation_id, :cleanliness, :accuracy, :value, :communication, :check_in, :location, :body)
    end


end
