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
  end

  def destroy
    @note = Note.find(params[:note][:id])
    @note.delete

    render json: @note
  end

  private

    def note_params
      params.require(:note).permit(:title, :body)
    end
end
