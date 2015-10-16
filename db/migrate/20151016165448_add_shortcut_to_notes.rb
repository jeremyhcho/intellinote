class AddShortcutToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :shortcut, :boolean, default: false
  end
end
