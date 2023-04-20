class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    sign_up(resource_name, resource) if resource.persisted?

    render_resource(resource)
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :referred_by_id)
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: { user: resource, token: resource.email }
    else
      render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end