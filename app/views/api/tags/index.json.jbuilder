json.array! @tags do |tag|
  json.partial! 'show', tag: tag
end
