class SchedulesController < ApplicationController
  def index
    @schedule = Schedule.new
  end
  def edit
    @schedule = Schedule.find(params[:id])
  end
end
