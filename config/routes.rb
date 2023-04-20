Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      # get 'registration/create'
      # get 'registration/destroy'
      # get 'sessions/create'
      # get 'sessions/destroy'
      # post 'login', to: 'sessions#create'
      # delete 'logout', to: 'sessions#destroy'
      post 'referrals', to: 'referrals#create'
      get 'referrals', to: 'referrals#get_referrals'
      devise_for :users, controllers: { sessions: 'api/v1/sessions', registration: 'api/v1/registrations' }, defaults: { format: :json }
    end
  end
  
  # devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
