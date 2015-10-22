class Api::TagsController < ApplicationController
  def index
    @tags = Tag.where(user_id: current_user.id).order("name asc")
  end
end
