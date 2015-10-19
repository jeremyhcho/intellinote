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
      render json: { errors: "Unsaveable" }, status: 500
    end
  end

  def update
  end

  def show
    @notebook = Notebook.find(params[:notebook][:id])
  end

  def destroy
    @notebook = Notebook.find(params[:notebook][:id])

    if current_user.notebooks.length > 1
      @notebook.delete
    end

    render json: @notebook
  end

  private

    def notebook_params
      params.require(:notebook).permit(:title)
    end
end
