names = [
  # CHEST
  'Bench Press',
  'DB Incline Bench Press',
  'DB Bench Press',
  'BB Incline Press',
  # LEGS
  'Back Squat',
  'Leg Extension',
  'Leg Curl',
  'Kettle Bell Squat',
  # ARMS
  'BB Curl',
  'EZ Bar Arm Extension',
  'DB Curl',
  'Cable Arm Extension',
  'Cable Single Arm Extension',
  'BB Arm Extension',
  # BACK
  'Dead Lift',
  'Bent Over Row',
  'Cable Lat Pull Down',
  'Cable Row'
]
names.each do |name|
  lift = Lift.new(
    name: name
  )

  unless lift.save
    puts lift.errors.full_messages.to_sentence
  end
end

puts "Created #{Lift.all.count} Lift records"
