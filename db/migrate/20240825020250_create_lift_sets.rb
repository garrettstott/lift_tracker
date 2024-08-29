class CreateLiftSets < ActiveRecord::Migration[7.2]
  def change
    create_table :lift_sets do |t|
      t.belongs_to :workout_lift, null: false, foreign_key: true
      t.integer :reps, null: false
      t.integer :weight, null: false
      t.string :style, null: false, default: 'normal'
      t.timestamps
    end
  end
end
