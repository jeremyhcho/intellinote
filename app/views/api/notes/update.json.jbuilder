json.extract! @note, :id, :title, :body, :author_id, :notebook_id, :shortcut
json.updated_at time_ago_in_words(@note.updated_at)
