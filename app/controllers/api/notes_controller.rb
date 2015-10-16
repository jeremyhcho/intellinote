class Api::NotesController < ApplicationController
  def index
    @notes = Note.where(author_id: current_user.id);
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id

    if @note.save
      render :show
    else
      render json: { errors: "Unsaveable" }, status: 500
    end
  end

  def show
  end

  def update
    @note = Note.find(params[:note][:id])

    if @note.update(note_params)
      render :update
    else
      render json: { errors: "Not updatable" }, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:note][:id])
    @note.delete

    render json: @note
  end

  private

    def note_params
      params.require(:note).permit(:title, :body, :notebook_id, :shortcut)
    end
end
