# Workout.all.each do |workout|
#   5.times do
#     workout_lift = workout.workout_lifts.new(
#       lift_id: Lift.all.pluck(:id).sample
#     )
#     unless workout_lift.save
#       puts workout_lift.errors.full_messages.to_sentence
#     end
#   end
# end
#
# puts "Created #{WorkoutLift.all.count} workout lifts"
