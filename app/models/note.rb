class Note < ActiveRecord::Base
  validates :title, :body, :author_id, :notebook_id, presence: true
  validates :shortcut, inclusion: { in: [true, false] }

  belongs_to :user,
    class_name: "User",
    foreign_key: "author_id",
    primary_key: "id"

  belongs_to :notebook,
    class_name: "Notebook",
    foreign_key: "notebook_id",
    primary_key: "id"
end
