json.extract! note, :id, :title, :body, :shortcut
json.updated_at time_ago_in_words(note.updated_at)
