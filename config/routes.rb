Rails.application.routes.draw do
  devise_for :users
  root "schedules#index"
  resources :schedules, only:[:index, :edit]
  resources :friends, only:[:index, :new, :create]
end
