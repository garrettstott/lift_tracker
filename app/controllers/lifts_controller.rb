class LiftsController < ApplicationController

  def index
    @lifts = Lift.all
  end

  def show
  end

  def edit
  end

  def update
  end

  def create

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
