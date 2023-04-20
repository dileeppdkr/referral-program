class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  
  before_save :ensure_authentication_token

  belongs_to :user, class_name: 'User', foreign_key: 'referred_by_id', optional: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  def ensure_authentication_token
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(authentication_token: token).first
    end
  end
end
