class FriendsController < ApplicationController
  before_action :authenticate_user!
  def index
    if params[:keyword] == nil
      @friends = Friend.includes(:user)
      @friends = @friends.where(user_id: current_user.id)
    else
      user = User.all
      @friends = user.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id).limit(10)
    end
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def new
    @friends = Friend.includes(:user)
    @friends = @friends.where(user_id: current_user.id)
    @friend = Friend.new
  end
  
  def create
    num = friends_params[:follower_ids].length
    num.times do |num|
      follower_id = friends_params[:follower_ids][num]
      friend_flug = Friend.where(user_id: current_user.id).where(follower_id: friends_params[:follower_ids][num])
      if friend_flug == []
        Friend.create(user_id: friends_params[:user_id], follower_id: follower_id)
      end
    end
    redirect_to friends_path
  end
  def destroy
    del_friend = Friend.where(follower_id: params[:id].to_i).where(user_id: current_user.id)
    if del_friend
      Friend.find(del_friend.ids[0]).delete
    end
    respond_to do |format|
      format.html
      format.json
    end
  end
  def otherday
    day = params[:schedate].to_date
    @width_info = Hash.new
    @schedules = Schedule.where(sche_day: day).where(user_id: params[:id])
    @width_records = display_width_calc(@schedules, @width_info)
    @days = [day-1, day, day+1]
    @user_id = params[:id]
  end
  private
  def friends_params
    params.require(:friend).permit(follower_ids: []).merge(user_id: current_user.id)
  end
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
  def display_calc(hour, minute)
    hour = hour.to_i
    minute = minute.to_i
    4 * hour - 23 + minute / 15 
  end
end
