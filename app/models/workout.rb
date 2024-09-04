# == Schema Information
#
# Table name: workouts
#
#  id           :bigint           not null, primary key
#  completed_at :datetime         not null
#  style        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_workouts_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Workout < ApplicationRecord

  validates_presence_of :completed_at, :style

  belongs_to :user

  has_many :workout_lifts

  accepts_nested_attributes_for :workout_lifts, reject_if: :all_blank, allow_destroy: true

  default_scope -> { order(completed_at: :desc) }

  before_validation :set_completed_at

  class << self

    def last_7_days
      by_date(days: 7)
    end

    def last_30_days
      by_date(days: 30)
    end

    def by_date(days:)
      Workout.where("completed_at > ?", days.days.ago)
    end

    def next_workout
      last_workout = self.first
      return Workout.create(style: WORKOUT_DEFAULT_STYLES.first) if last_workout.nil?
      last_index = WORKOUT_DEFAULT_STYLES.find_index(last_workout.style)
      next_style = WORKOUT_DEFAULT_STYLES[last_index + 1] if last_index
      next_style = WORKOUT_DEFAULT_STYLES.first if next_style.nil?
      Workout.where(style: next_style).last.dup || Workout.new(style: next_style)
    end
  end

  def nice_completed_at
    completed_at.strftime("%m/%d/%Y")
  end

  private

  def set_completed_at
    if self.completed_at.nil?
      self.completed_at = Time.now.in_time_zone("Mountain Time (US & Canada)")
    else
      self.completed_at = self.completed_at.in_time_zone("Mountain Time (US & Canada)")
    end
  end

end
