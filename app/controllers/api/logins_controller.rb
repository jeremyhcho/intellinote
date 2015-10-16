class Api::LoginsController < ApplicationController
  def find
    if current_user
      render :current_user
    else
      render json: { errors: "No current user" }, status: 200
    end
  end
end
