# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  last_name       :string           not null
#  first_name      :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email,
            uniqueness: true,
            length: { in: 3..255 },
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :session_token, :password_digest, presence: true
  validates :session_token, uniqueness: true
  validates :password, length: { in: 8..255 }, allow_nil: true

  before_validation :ensure_session_token

  has_one_attached :photo
  
  has_many :listings,
           class_name: :Listing,
           foreign_key: :host_id,
           dependent: :destroy

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    @user&.authenticate(password) ? @user : nil
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom::urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
