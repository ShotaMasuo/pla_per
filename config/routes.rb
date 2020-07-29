Rails.application.routes.draw do
  devise_for :users
  root "schedules#index"
  resources :schedules, only:[:index, :edit, :create, :update, :destroy] do
    member do
      get 'otherday'
      post 'edidel', to: "schedules#edi"
    end
    collection do
      post 'spreadsheet'
      get 'edidel'
    end
  end
  resources :friends, only:[:index, :show, :new, :create, :destroy] do
    member do
      get 'otherday(/:schedate)', to: "friends#otherday"
    end
  end
  namespace :api do
    resources :schedules, only: :index, defaults: {format: 'json'}
  end
end
