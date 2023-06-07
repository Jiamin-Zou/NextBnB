class Api::ReservationsController < ApplicationController
  before_action :require_logged_in, only: [:index, :create, :show, :update, :destroy]
  before_action :set_reservation, only: [:show, :update, :destroy]

  wrap_parameters include: Reservation.attribute_names

  def index
    @reservations = current_user.reservations
    @listings = current_user.trip_listings
    render :index
  end

  def create
    listing = Listing.find_by(id: params[:listing_id])
    if listing
      @reservation = Reservation.new(reservation_params)
      @reservation.listing_id = listing.id
      @reservation.guest_id = current_user.id

      if @reservation.save
        render :show
      else
        render json: { errors: @reservation.errors.full_messages }, status: 422
      end
    else
      render json: { errors: ["Trying to create reservation for a non-existing listing"] }, status: 422
    end
  end

  def show
    if @reservation
        render :show
    else
        render json: { errors: ["Oops... That reservation doesn't exist!"] }, status: 404
    end
  end

  def update
    if @reservation
        if(@reservation.guest_id == current_user.id)
            if @reservation.update(reservation_params)
                render :show
            else
                render json: { errors: @reservation.errors.full_messages }, status: 422
            end
        else
            render json: {errors: ["Not allowed. That reservation doesn't belong to you."]}, status: 401
        end
    else
        render json: { errors: ["Oops... That reservation doesn't exist!"] }, status: 404
    end
  end

  def destroy
    if(@reservation.guest_id == current_user.id)
        @reservation.destroy
        head :no_content
    else
        render json: {errors: ["Not allowed. That reservation doesn't belong to you."]}, status: 401
    end
  end

  private

  def set_reservation
    @reservation = Reservation.find_by(id: params[:id])
  end

  def reservation_params
    params.require(:reservation).permit(:total_price, :num_guests, :start_date, :end_date)
  end
end
