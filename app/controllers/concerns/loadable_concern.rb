module LoadableConcern
  extend ActiveSupport::Concern

  def chest_loads
    load_by_style(style: "chest")
  end

  def leg_loads
    load_by_style(style: "leg")
  end

  def arm_loads
    load_by_style(style: "arm")
  end

  def back_loads
    load_by_style(style: "back")
  end

  def load_by_style(style:)
    workout_loads = []
    Workout.unscope(:order).order(completed_at: :asc).where("LOWER(style) LIKE ?", "%#{style}%").each do |workout|
      total_load = 0
      workout_date = workout.completed_at.strftime('%m/%d/%Y')
      workout.workout_lifts.each do |workout_lift|
        barbell = workout_lift.lift.name.downcase.include?('barbell') ? true : false
        workout_lift.lift_sets.each do |set|
          weight = set.weight
          weight += 45 if barbell
          lift_load = weight * set.reps
          total_load += lift_load
        end
      end
      workout_loads <<  [workout_date, total_load]
    end
    workout_loads
  end
end


