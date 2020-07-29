json.array! @schedules.each do |schedule|
  json.name schedule.name
  json.start_time schedule.start_time.strftime('%H:%M')
  json.finish_time schedule.finish_time.strftime('%H:%M')
  if schedule.started_time!=nil
    json.started_time schedule.started_time.strftime('%H:%M')
  else
    json.started_time "未完"
  end
  if schedule.finished_time!=nil
    json.finished_time schedule.finished_time.strftime('%H:%M')
  else
    json.finished_time "未完"
  end
  json.color  schedule.color
end