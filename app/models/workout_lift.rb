# == Schema Information
#
# Table name: workout_lifts
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  lift_id    :bigint           not null
#  workout_id :bigint           not null
#
# Indexes
#
#  index_workout_lifts_on_lift_id     (lift_id)
#  index_workout_lifts_on_workout_id  (workout_id)
#
# Foreign Keys
#
#  fk_rails_...  (lift_id => lifts.id)
#  fk_rails_...  (workout_id => workouts.id)
#
class WorkoutLift < ApplicationRecord
  belongs_to :workout
  belongs_to :lift

  has_many :lift_sets, dependent: :destroy
  accepts_nested_attributes_for :lift_sets,
                                allow_destroy: true,
                                reject_if: :values_blank

  private

  def values_blank(attributes)
    attributes["weight"].blank? && attributes["reps"].blank?
  end
end
