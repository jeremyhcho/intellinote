class Note < ActiveRecord::Base
  validates :title, :body, :author_id, :notebook_id, presence: true

  belongs_to :user,
    class_name: "User",
    foreign_key: "author_id",
    primary_key: "id"
end
