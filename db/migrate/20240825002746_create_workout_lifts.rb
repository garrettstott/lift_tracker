class CreateWorkoutLifts < ActiveRecord::Migration[7.2]
  def change
    create_table :workout_lifts do |t|
      t.belongs_to :workout, null: false, foreign_key: true
      t.belongs_to :lift, null: false, foreign_key: true

      t.timestamps
    end
  end
end
