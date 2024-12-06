# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  before_validation -> { self.errors.add("base", "I don't think so Tim") if User.all.size >= 1 }
  has_many :workouts

  def next_workout
    last_workout = self.workouts.first
    return self.workouts.new(style: WORKOUT_DEFAULT_STYLES.first) if last_workout.nil?
    last_index = WORKOUT_DEFAULT_STYLES.find_index(last_workout.style)
    next_style = WORKOUT_DEFAULT_STYLES[last_index + 1] if last_index
    next_style = WORKOUT_DEFAULT_STYLES.first if next_style.nil?
    self.workouts.where(style: next_style).last.dup || self.workouts.new(style: next_style)
  end
end
