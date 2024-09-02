class DashboardController < ApplicationController
  include LoadableConcern

  def index
    if params[:start_date]
      beginning_of_month = DateTime.parse(params[:start_date]).beginning_of_month
      end_of_month = DateTime.parse(params[:start_date]).end_of_month
    else
      beginning_of_month = DateTime.now.beginning_of_month
      end_of_month = DateTime.now.end_of_month
    end
    @workouts = Workout.where(completed_at: beginning_of_month..end_of_month)
    @chest_stats = chest_loads
    @leg_stats = leg_loads
    @arm_stats = arm_loads
    @back_stats = back_loads
  end

end
