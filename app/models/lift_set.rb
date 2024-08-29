# == Schema Information
#
# Table name: lift_sets
#
#  id              :bigint           not null, primary key
#  reps            :integer          not null
#  style           :string           default("normal"), not null
#  weight          :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  workout_lift_id :bigint           not null
#
# Indexes
#
#  index_lift_sets_on_workout_lift_id  (workout_lift_id)
#
# Foreign Keys
#
#  fk_rails_...  (workout_lift_id => workout_lifts.id)
#
class LiftSet < ApplicationRecord
  default_scope -> { order("id ASC NULLS LAST") }
  validates_presence_of :reps, :style, :weight
  belongs_to :workout_lift
end
