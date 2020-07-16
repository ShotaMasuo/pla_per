class SchedulesController < ApplicationController
  def index
    @schedule = Schedule.new
  end

  def create
    @schedule = Schedule.new(schedule_params)
    @schedule.sche_day = Date.today
    @start_scale = display_calc(schedule_params["start_time(4i)"], schedule_params["start_time(5i)"])
    @finish_scale = display_calc(schedule_params["finish_time(4i)"], schedule_params["finsh_time(5i)"])
    if @schedule.save
      respond_to do |format|
        format.json
      end
    else
      @schedule = Schedule.new
      render :index
    end
  end

  def edit
    @schedule = Schedule.find(params[:id])
  end


  private
  def schedule_params
    params.require(:schedule).permit(:name, :sche_day, :start_time, :finish_time).merge(user_id: current_user.id)
  end
  def display_calc(hour, minute)
    hour = hour.to_i
    minute = minute.to_i
    4 * hour - 23 + minute / 15 
  end
end
