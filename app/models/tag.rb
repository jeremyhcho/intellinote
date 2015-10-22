class Tag < ActiveRecord::Base
  validates :name, :user_id, :note_id, presence: true
  validates :name, uniqueness: { scope: :note_id }

  belongs_to :note,
    class_name: "Note",
    foreign_key: "note_id",
    primary_key: "id"

  belongs_to :user,
    class_name: "User",
    foreign_key: "user_id",
    primary_key: "id"
end
