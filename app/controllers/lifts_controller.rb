class LiftsController < ApplicationController

  def index
    @lifts = Lift.all
    @lift = Lift.new
  end

  def show
  end

  def edit
    @lift = Lift.find(params[:id])
  end

  def update
    Lift.find(params[:id]).update(lift_params)
    redirect_to lifts_path
  end

  def create
    lift = Lift.new(lift_params)
    lift.save
    redirect_to lifts_path
  end

  def destroy
  end

  private

  def lift_params
    params.require(:lift).permit(
      :name,
    )
  end
end
