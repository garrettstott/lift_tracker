user = User.new(
  email: 'uber@test.com',
  password: 'Testtest123!'
)

unless user.save
  user.errors.full_messages.to_sentence
end

puts "Created #{User.all.size} users"
