# WorkoutLift.all.each do |workout_lift|
#   5.times do |i|
#     lift_set = workout_lift.lift_sets.new(
#       reps: Faker::Number.between(from: 6, to: 12),
#       weight: Faker::Number.between(from: 30, to: 160),
#       style: i == 4 ? 'super set' : 'normal'
#     )
#     unless lift_set.save
#       puts lift_set.errors.full_messages.to_sentence
#     end
#   end
# end
#
# puts "Created #{LiftSet.all.count} lift sets"
