class Schedule < ApplicationRecord
  belongs_to :users, optional: true
  belongs_to :firends, optional: true
end
