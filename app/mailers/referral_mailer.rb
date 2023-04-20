class ReferralMailer < ApplicationMailer
  def referral_email(email, user)
    p email
    @user = user
    @email = email
    mail to: email, subject: "Referral Program | You got a referral"
  end
end
