class RemoveIndicesFromNotebooks < ActiveRecord::Migration
  def change
    remove_index :notebooks, :title
    remove_index :notebooks, :user_id
    add_index :notebooks, [:title, :user_id], unique: true
  end
end
