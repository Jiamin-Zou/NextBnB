# == Schema Information
#
# Table name: listings
#
#  id            :bigint           not null, primary key
#  host_id       :bigint           not null
#  property_type :string           not null
#  address       :string           not null
#  apt_num       :string           default(""), not null
#  city          :string           not null
#  state         :string           not null
#  country       :string           not null
#  title         :string           not null
#  description   :text             not null
#  num_beds      :integer          not null
#  num_bedrooms  :integer          not null
#  num_bathrooms :integer          not null
#  night_price   :float            not null
#  cleaning_fee  :float            not null
#  latitude      :float            not null
#  longitude     :float            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  category      :string           not null
#  has_wifi      :boolean          default(FALSE), not null
#  has_pets      :boolean          default(FALSE), not null
#  has_kitchen   :boolean          default(FALSE), not null
#  has_ac        :boolean          default(FALSE), not null
#  has_heat      :boolean          default(FALSE), not null
#  has_tv        :boolean          default(FALSE), not null
#  has_parking   :boolean          default(FALSE), not null
#  has_fireplace :boolean          default(FALSE), not null
#
class Listing < ApplicationRecord
  CATEGORIES = ["beachfront", "countryside", "cabin", "mansion", "lakefront", "amazing views", "tiny home", "modern", "barn", "omg"]

  PROPERTY_TYPES = ["House", "Apartment", "Studio", "Cabin", "Private Room"]

  validates :host_id, :address, :city, :state, :country, :title, :description, :longitude, :latitude, presence: true
  validates :property_type, inclusion: { in: PROPERTY_TYPES }
  validates :category, inclusion: { in: CATEGORIES }
  validates :has_wifi, :has_pets, :has_kitchen, :has_ac, :has_heat, :has_tv, :has_parking, :has_fireplace, inclusion: [true, false]
  validates :num_beds, :num_bedrooms, :num_bathrooms, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :night_price, presence: true, numericality: { greater_than: 0 }
  validates :cleaning_fee, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates_uniqueness_of :address, scope: [:apt_num, :city], message: "has already been listed"

  validate :valid_location

  geocoded_by :full_address
  before_validation :geocode

  has_many_attached :photos, dependent: :destroy

  belongs_to :host,
    class_name: :User,
    foreign_key: :host_id

  has_many :reservations,
    class_name: :Reservation,
    foreign_key: :listing_id,
    dependent: :destroy

  has_many :reviews,
    through: :reservations,
    source: :review,
    dependent: :destroy

  def calc_avg_reviews
    averages = {
      cleanliness: 0,
      accuracy: 0,
      value: 0,
      communication: 0,
      check_in: 0,
      location: 0,
      overall_rating: 0,
    }

    reviews_count = self.reviews.count

    return averages if reviews_count.zero?

    attributes_to_average = [:cleanliness, :accuracy, :value, :communication, :check_in, :location, :overall_rating]

    attributes_to_average.each do |attribute|
      averages[attribute] = self.reviews.average(attribute).to_f.round(2)
    end

    averages
  end

  private

  def valid_location
    errors.add(:address, "is not a valid location") if latitude.blank? || longitude.blank?
  end

  def full_address
    [address, city, state, country].compact.join(", ")
  end
end
