Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :update, :destroy]
    resources :listings, only: [:index, :show] do
      resources :reservations, only: [:create]
    end
    
    resources :reservations, only: [:show, :update, :destroy]
    resource :session, only: [:create, :show, :destroy]
  end
  get "*path", to: "static_pages#frontend_index"
end
