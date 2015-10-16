json.array! @notebooks do |notebook|
  json.id notebook.id
  json.title notebook.title
  json.user_id notebook.user_id
  json.notes notebook.notes do |note|
    json.partial! 'notes', note: note
  end
end
