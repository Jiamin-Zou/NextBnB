# == Schema Information
#
# Table name: reviews
#
#  id             :bigint           not null, primary key
#  reservation_id :bigint           not null
#  reviewer_id    :bigint           not null
#  cleanliness    :integer          not null
#  accuracy       :integer          not null
#  value          :integer          not null
#  communication  :integer          not null
#  check_in       :integer          not null
#  location       :integer          not null
#  overall_rating :float            not null
#  body           :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Review < ApplicationRecord
  validates :reservation_id, :reviewer_id, presence: true
  validates :cleanliness, :accuracy, :value, :communication, :check_in, :location, presence: true, inclusion: { in: 1..5 }
  before_save :calculate_rating

  belongs_to :reservation
  belongs_to :reviewer,
             class_name: :User,
             foreign_key: :reviewer_id

  has_one :listing,
    through: :reservation,
    source: :listing,
    dependent: :destroy

  def calculate_rating
    self.overall_rating = ((cleanliness + accuracy + value + communication + check_in + location) / 6.0).round(2)
  end
end
