class AddStartedTimeToSchedules < ActiveRecord::Migration[6.0]
  def change
    add_column :schedules, :started_time, :time, null: true
    add_column :schedules, :finished_time, :time, null: true
  end
end
