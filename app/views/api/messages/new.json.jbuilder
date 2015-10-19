days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

json.extract! @message, :id, :sender_id, :recipient_id, :body
json.created_at time_ago_in_words(@message.created_at)

split_date = @message.created_at.to_s.split(" ")
date = split_date[0]
time = split_date[1].split(":")
am_pm = time[0].to_i > 12 ? "AM" : "PM"
hour = time[0].to_i > 12 ? time[0].to_i - 12 : hour

day = days[@message.created_at.wday]
month = months[@message.created_at.month]

formatted_date = "#{day}, #{month} #{date[2]} #{hour}:#{time[1]} #{am_pm}"

json.formatted_date formatted_date
json.sender do
  json.partial! 'sender', message: @message
end

json.recipient do
  json.partial! 'recipient', message: @message
end
