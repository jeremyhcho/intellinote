Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    get '/logins/find', to: 'logins#find'
    resources :notes
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
