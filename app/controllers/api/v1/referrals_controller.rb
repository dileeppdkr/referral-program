class Api::V1::ReferralsController < ApplicationController
   skip_before_action :verify_authenticity_token
  def create
    user = User.find(params[:id].to_i)
    p user
    render json: {message: "No User found"} and return if !user
    render json: {message: "Email Not found"} and return if !params[:email] || params[:email] == ""
    if params[:email] && user
      ReferralMailer.referral_email(params[:email], user).deliver_now
      render json: {message: "Referral sent successfully"}, status: 201
    else
      render json: { message: "User / email not found" }, status: 400
    end
  end

  def get_referrals
    users = User.select(:email).where(referred_by_id: params[:id].to_i)

    render json: users, status: 200

  end

  # private

  # def referral_params
  #   params.require(:referral).permit(:email)
  # end
end