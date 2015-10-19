class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :sender_id, null: false
      t.integer :recipient_id, null: false
      t.integer :note_id

      t.timestamps null: false
    end
  end
end
