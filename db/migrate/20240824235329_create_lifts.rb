class CreateLifts < ActiveRecord::Migration[7.2]
  def change
    create_table :lifts do |t|
      t.datetime :completed
      t.timestamps
    end
  end
end
