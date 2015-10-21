class Notebook < ActiveRecord::Base
  validates :title, :user_id, presence: { message: "Oops, you're missing a notebook title!"}
  validates :title, uniqueness: {scope: :user_id, message: "You already have a notebook by that name."}

  belongs_to :user
  has_many :notes, dependent: :destroy
end
