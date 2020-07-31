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
  def create
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["CONSUMER_KEY"]
      config.consumer_secret     = ENV["CONSUMER_SECRET"]
      config.access_token        = ENV["ACCESS_TOKEN"]
      config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
    end
    schedules = Schedule.where(user_id: current_user.id).where(sche_day: Date.today).order("start_time asc")
    content = "○今日の実績\n"
    schedules.each do |schedule|
      if schedule.started_time != nil && schedule.finished_time
        content += "    ●#{schedule.name} : #{(schedule.finished_time - schedule.started_time) / 3600}時間\n"
      end
    end
    client.update(content)
  end
end