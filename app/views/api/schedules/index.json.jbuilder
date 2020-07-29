json.array! @schedules do |schedule|
  json.name schedule.name
  json.sche_day schedule.sche_day
  json.start_time schedule.start_time.strftime("%H:%M")
  json.finish_time schedule.finish_time.strftime("%H:%M")
  json.started_time schedule.started_time
  json.finished_time schedule.finished_time
  json.color schedule.color
end