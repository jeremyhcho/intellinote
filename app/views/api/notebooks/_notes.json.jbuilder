json.extract! note, :id, :title, :body
json.updated_at time_ago_in_words(note.updated_at)
