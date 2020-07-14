class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.string :name, null: false
      t.date :sche_day, null: false
      t.time :start_time, null: true
      t.time :finish_time, null: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
