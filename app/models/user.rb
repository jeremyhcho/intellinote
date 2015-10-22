class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :notes,
    class_name: "Note",
    foreign_key: "author_id",
    primary_key: "id"

  has_many :sent_messages,
    class_name: "Message",
    foreign_key: "sender_id",
    primary_key: "id"

  has_many :received_messages,
    class_name: "Message",
    foreign_key: "recipient_id",
    primary_key: "id"

  has_many :tags,
    class_name: "Tag",
    foreign_key: "user_id",
    primary_key: "id"

  has_many :notebooks

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  private

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64
    end
end
