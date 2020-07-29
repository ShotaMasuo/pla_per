class Api::SchedulesController < ApplicationController
  def index
    @schedules = Schedule.where(user_id: 1).where(sche_day: Date.today)
    @schedules.each do |schedule|
      schedule.start_time = schedule.start_time.strftime('%H:%M')
      schedule.finish_time = schedule.finish_time.strftime('%H:%M')
      if schedule.started_time != nil
        schedule.started_time = schedule.started_time.strftime('%H:%M')
      else
        schedule.started_time = "未完"
      end
      if schedule.finished_time != nil
        schedule.finished_time = schedule.finished_time.strftime('%H:%M')
      else
        schedule.finished_time = "未完"
      end
    end
  end
end