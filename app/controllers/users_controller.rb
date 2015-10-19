class UsersController < ApplicationController
  def new
    redirect_to root_url if current_user
  end

  def create
    @user = User.new(user_params)
    @user.password = params[:user][:password]

    if @user.save
      Notebook.create({title: "My First Notebook", user_id: @user.id})
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

    def user_params
      params.require(:user).permit(:username)
    end
end
