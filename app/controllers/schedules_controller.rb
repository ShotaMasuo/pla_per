class SchedulesController < ApplicationController
  def index
    @width_info = Hash.new
    @schedule = Schedule.new(sche_day: Date.today)
    @schedules = Schedule.where(sche_day: Date.today)
    @width_records = display_width_calc(@schedules, @width_info)
  end
  
  def otherday
    day = params[:id].to_date
    @width_info = Hash.new
    @schedule = Schedule.new(sche_day: day)
    @schedules = Schedule.where(sche_day: day)
    @width_records = display_width_calc(@schedules, @width_info)
    render :index
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
  def update
    @schedule = Schedule.find(params[:id])
    if @schedule.update(schedule_params)
      redirect_to schedules_path
    else
      render :edit
    end
  end


  private
  def display_width_calc(schedules, width_info)
    schedules.each do |schedule|
      width_array = []
      # 開始・終了時刻を取得
      s_time = schedule.start_time
      e_time = schedule.finish_time
      # 開始時刻を取得（時・分）
      s_hour = s_time.strftime("%H")
      s_minute = s_time.strftime("%M")
      # 終了時刻を取得（時・分）
      e_hour = e_time.strftime("%H")
      e_minute = e_time.strftime("%M")
      # 配列に開始・終了の目盛り情報を格納
      width_array << display_calc(s_hour, s_minute)
      width_array << display_calc(e_hour, e_minute)

      # タスクが完了していれば、同じ処理をもう一度行う
      if schedule.started_time and schedule.finished_time
        sed_time = schedule.started_time
        eed_time = schedule.finished_time
        sed_hour = sed_time.strftime("%H")
        sed_minute = sed_time.strftime("%M")
        eed_hour = eed_time.strftime("%H")
        eed_minute = eed_time.strftime("%M")
        width_array << display_calc(sed_hour, sed_minute)
        width_array << display_calc(eed_hour, eed_minute)
      end
      # スケジュールidをキーに、width配列をハッシュに格納
      width_info[schedule.id] = width_array
    end
    return width_info
  end
  def schedule_params
    params.require(:schedule).permit(:name, :sche_day, :start_time, :finish_time, :color, :started_time, :finished_time).merge(user_id: current_user.id)
  end
  def display_calc(hour, minute)
    hour = hour.to_i
    minute = minute.to_i
    4 * hour - 23 + minute / 15 
  end
end
