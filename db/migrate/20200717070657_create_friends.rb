class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.references :user, foreign_key: true
      t.references :follower, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
