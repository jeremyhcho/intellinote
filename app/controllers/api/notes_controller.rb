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
      msg = @note.errors.full_messages[0]
      render json: msg, status: 422
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
    @note = Note.find(params[:id])
    @note.destroy

    render json: @note
  end

  private

    def note_params
      params.require(:note).permit(:title, :body, :notebook_id, :shortcut)
    end
end
