class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def create
    user = User.find_for_database_authentication(email: params[:email])
    if user && user.valid_password?(params[:password])
      sign_in(user)
      render json: { user: user, token: user.authentication_token }
    else
      render json: { error: 'Invalid email or password' }, status: 401
    end
  end

  def destroy
    user = User.find_by(authentication_token: request.headers['Authorization'])
    if user && user.authentication_token == request.headers['Authorization']
      sign_out(user)
      render json: { message: 'User successfully logged out' }, status: :ok
    else
      render json: { error: 'Invalid token' }, status: 400
    end
  end
end
