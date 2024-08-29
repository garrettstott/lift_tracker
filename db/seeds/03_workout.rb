# count = 0
# 20.times do
#   WORKOUT_DEFAULT_STYLES.each do |style|
#     workout = User.first.workouts.new(
#       style: style,
#       completed_at: DateTime.now - count.days,
#     )
#     if workout.save
#       count += 1
#     else
#       puts workout.errors.full_messages
#     end
#   end
# end
#
# puts "Created #{Workout.all.size} workouts"
