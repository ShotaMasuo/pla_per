class Api::SchedulesController < ApplicationController
  def index
    @schedules = Schedule.where(user_id: 1).where(sche_day: Date.today)
  end
end