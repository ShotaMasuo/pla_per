class SchedulesController < ApplicationController
  def index
    @width_info = Hash.new
    @schedule = Schedule.new(sche_day: Date.today)
    @schedules = Schedule.where(sche_day: Date.today).where(user_id: current_user.id)
    @width_records = display_width_calc(@schedules, @width_info)
  end
  
  def otherday
    day = params[:id].to_date
    @width_info = Hash.new
    @schedule = Schedule.new(sche_day: day)
    @schedules = Schedule.where(sche_day: day).where(user_id: current_user.id)
    @width_records = display_width_calc(@schedules, @width_info)
    @days = [day-1, day, day+1]
  end

  def create
    @schedule = Schedule.new(schedule_params)
    @schedule.sche_day = Date.today
    @start_scale = display_calc(schedule_params["start_time(4i)"], schedule_params["start_time(5i)"])
    @finish_scale = display_calc(schedule_params["finish_time(4i)"], schedule_params["finish_time(5i)"])
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
      redirect_to root_path
    else
      render :edit
    end
  end

  def spreadsheet
    # ログインユーザのスケジュールを予定日時順に取得
    put_schedules = Schedule.where(user_id: current_user.id).order("sche_day ASC").order("start_time ASC")
    session = GoogleDrive::Session.from_config("config.json")
    ws = session.spreadsheet_by_key("1gwW0MvC9981eJTbT1MEZmLwp6c5xUSQyH-v8On1ANmw").worksheets[0]
    header = ["日付", "スケジュール名", "開始予定", "終了予定", "開始時刻", "終了時刻"]
    ws[1,1] = "#{current_user.name}さんの予定と実績です"
    ws[1,2] = "hoge"
    header.length.times do |i|
      ws[2,i+1] = header[i]
    end
    i = 3
    put_schedules.each do |schedule|
      ws[i, 1] = schedule.sche_day
      ws[i, 2] = schedule.name
      ws[i, 3] = schedule.start_time.strftime("%H:%M")
      ws[i, 4] = schedule.finish_time.strftime("%H:%M")
      if schedule.started_time
        ws[i, 5] = schedule.started_time.strftime("%H:%M")
      end
      if schedule.finished_time
        ws[i, 6] = schedule.finished_time.strftime("%H:%M")
      end
      i += 1
    end
    ws.save
    redirect_to root_path

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
