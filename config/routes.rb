Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :update, :destroy]
    resource :session, only: [:create, :show, :destroy]
  end
end
