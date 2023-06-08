# == Schema Information
#
# Table name: reviews
#
#  id             :bigint           not null, primary key
#  listing_id     :bigint           not null
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
  validates :listing_id, :reviewer_id, presence: true
  validates :cleanliness, :accuracy, :value, :communication, :check_in, :location, presence: true, inclusion: { in: 0..5 }
  before_save :calculate_rating

  belongs_to :listing
  belongs_to :reviewer,
             class_name: :User,
             foreign_key: :listings_id
  has_many :reviews,
           dependent: :destroy

  def calculate_rating
    self.overall_rating = (cleanliness + accuracy + value + communication + check_in + location) / 6.0
  end
end
