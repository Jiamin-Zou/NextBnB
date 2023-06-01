Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    get 'listings/categories', to: 'listings#categories'
    resources :users, only: [:index, :create, :update, :destroy]
    resources :listings, only: [:index, :show]
    resource :session, only: [:create, :show, :destroy]
  end
end
