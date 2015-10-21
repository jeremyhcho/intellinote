class Api::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.where(user_id: current_user.id)
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id

    if @notebook.save
      render :add
    else
      msg = @notebook.errors.messages[:title][0]
      render json: msg, status: 422
    end
  end

  def update
  end

  def show
    @notebook = Notebook.find(params[:notebook][:id])
  end

  def destroy
    @notebook = Notebook.find(params[:id])

    if current_user.notebooks.length > 1
      @notebook.delete

      render :destroy
    else
      render json: "You must have at least one notebook", status: 422;
    end
  end

  private

    def notebook_params
      params.require(:notebook).permit(:title)
    end
end
