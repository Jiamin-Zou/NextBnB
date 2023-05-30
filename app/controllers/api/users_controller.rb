class Api::UsersController < ApplicationController
    before_action :require_logged_out, only: [:create]
    before_action :require_logged_in, only: [:update, :destroy]

    wrap_parameters include: User.attribute_names + ['password']

    def index
        @user = User.find_by(email: params[:email])

        if @user
            render json: { user_found: true, user: {first_name: @user.first_name, last_name: @user.last_name, email: @user.email}}
          else
            render json: { user_found: false }
          end
    end

    def create
        @user = User.new(user_params)

        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find_by(id: params[:id])
        if @user && current_user == @user
            if @user.update(user_params)
                render :show
            else
                render json: @user.errors.full_messages, status: 422
            end
        else
            render json: { errors: ['User can only edit their own account!'] }, status: 403
        end

    end

    def destroy
        @user = User.find_by(id: params[:id])
        if @user && current_user == @user
            logout!
            @user.destroy
            render json: {id: params[:id]}
        else
            render json: { errors: ['Not authorized'] }, status: 403
        end

    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
