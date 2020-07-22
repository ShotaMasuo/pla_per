class Schedule < ApplicationRecord
  belongs_to :users, optional: true
  belongs_to :firends, optional: true
  validates :name, presence: true
end
