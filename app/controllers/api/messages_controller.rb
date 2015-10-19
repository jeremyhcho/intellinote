class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(sender_id: current_user.id)
    @messages.concat(Message.where(recipient_id: current_user.id))
    @messages = @messages.sort_by { |message| message.created_at}.reverse
  end

  def create
    @recipient = User.find_by(username: params[:message][:username]);

    if @recipient.nil?
      # return error
    else
      @message = Message.create(message_params)
      @message.sender_id = current_user.id
      @message.recipient_id = @recipient.id

      if @message.save
        render :new
      else
        # return error
      end
    end

  end

  private

    def message_params
      params.require(:message).permit(:body)
    end
end
