class Api::NotesController < ApplicationController
  def index
    @notes = Note.where(author_id: current_user.id);
  end

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id

    if @note.save
      params[:note][:tags].each do |tag|
        Tag.create({name: tag, user_id: current_user.id, note_id: @note.id});
      end

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

      tags_to_delete = @note.tags.to_a.map { |tag| tag.name } - (params[:note][:tags] || [])
      tags_to_delete = tags_to_delete.map do |tag|
        Tag.where(name: tag, note_id: @note.id)
      end

      if params[:note][:tags]
        tags_to_add = params[:note][:tags].select { |tag| !@note.tags.include?(tag) }
      else
        tags_to_add = []
      end

      tags_to_add.each do |tag|
        Tag.create({name: tag, user_id: current_user.id, note_id: @note.id})
      end

      tags_to_delete.each do |tag|
        Tag.destroy(tag)
      end
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
