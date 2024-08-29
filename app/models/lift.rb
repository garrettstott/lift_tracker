# == Schema Information
#
# Table name: lifts
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Lift < ApplicationRecord

  default_scope -> { order(name: :asc) }
  validates_presence_of :name
end
