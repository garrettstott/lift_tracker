class CreateWorkouts < ActiveRecord::Migration[7.2]
  def change
    create_table :workouts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.datetime :completed_at, null: false
      t.string :style, null: false
      t.timestamps
    end
  end
end
