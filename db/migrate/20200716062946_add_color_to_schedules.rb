class AddColorToSchedules < ActiveRecord::Migration[6.0]
  def change
    add_column :schedules, :color, :string, default: "FFFFFF"
  end
end
