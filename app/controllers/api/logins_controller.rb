class Api::LoginsController < ApplicationController
  def find
    if current_user
      render :current_user
    else
      render json: { errors: "No user"}, status: 422
    end
  end
end
