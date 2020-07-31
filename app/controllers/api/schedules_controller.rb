class Api::SchedulesController < ApplicationController
  def index
    @schedules = Schedule.where(user_id: 1).where(sche_day: Date.today).order("start_time asc")
  end
  def searchPerson
    user = User.where(name: params[:id])
    @schedules = Schedule.where(user_id: user.ids).where(sche_day: Date.today).order("start_time asc")
  end
  def upSchedule
    id = params[:id].to_i
    get_started_time = params[:stime]
    get_finished_time = params[:etime]
    started_hour = get_started_time[0..1].to_i
    started_minute = get_started_time[2..3].to_i
    finished_hour = get_finished_time[0..1].to_i
    finished_minute = get_finished_time[2..3].to_i
    save_started_time = started_hour.to_s + ":" + started_minute.to_s
    save_finished_time = finished_hour.to_s + ":" + finished_minute.to_s
    schedule = Schedule.find(id)
    schedule.started_time = save_started_time
    schedule.finished_time = save_finished_time
    schedule.save
  end
end