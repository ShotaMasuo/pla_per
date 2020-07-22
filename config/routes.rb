Rails.application.routes.draw do
  devise_for :users
  root "schedules#index"
  resources :schedules, only:[:index, :edit, :create, :update] do
    member do
      get 'otherday'
    end
  end
  resources :friends, only:[:index, :show, :new, :create, :destroy] do
    member do
      get 'otherday(/:schedate)', to: "friends#otherday"
    end
  end
end
