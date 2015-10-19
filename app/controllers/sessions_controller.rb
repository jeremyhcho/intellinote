class SessionsController < ApplicationController
  def new
    redirect_to root_url if current_user
  end

  def create
    @user = User.find_by(username: params[:user][:username])

    if @user.nil?
      flash.now[:errors] = ["Invalid Username and/or Password"]
      render :new
    else
      if @user.is_password?(params[:user][:password])
        login_user!(@user)
      else
        flash.now[:errors] = ["Invalid Username and/or Password"]
        render :new
      end
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = SecureRandom.urlsafe_base64
    redirect_to new_session_url
  end
end
