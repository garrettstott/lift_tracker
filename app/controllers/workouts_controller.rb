class WorkoutsController < ApplicationController

  before_action :build_workout, only: [:new]

  def index
    @next_workout = Workout.next_workout
    @workouts = Workout.all.first(30)
  end

  def show
    redirect_to edit_workout_path(id: params[:id])
  end

  def edit
    @workout = Workout.find(params[:id])
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update(workout_params)
      flash[:success] = "Workout Updated"
      redirect_to workouts_path
    else
      flash[:error] = @workout.errors.full_messages.to_sentence
      render "edit"
    end
  end

  def new
  end

  def create
    @workout = current_user.workouts.new(workout_params)
    if @workout.save
      flash[:success] = "Workout Created"
      redirect_to workouts_path
    else
      flash[:error] = @workout.errors.full_messages.to_sentence
      render :edit
    end
  end

  def destroy
    Workout.find(params[:id]).destroy
    flash[:success] = "Workout Deleted"
    redirect_to workouts_path
  end

  private

  def workout_params
    params.require(:workout).permit(
      :completed_at,
      :style,
      workout_lifts_attributes: [
        :id, :lift_id, :workout_id, :_destroy,
        lift_sets_attributes: [ :id, :weight, :reps, :workout_lift_id, :style, :_destroy ]
      ],
    )
  end

  def build_workout
    if params[:style]
      @workout = Workout.new(style: params[:style])
    else
      @workout = Workout.new
    end

    @last_workout = Workout.where(style: @workout.style).first
    if @last_workout
      @workout.workout_lifts = @last_workout.workout_lifts.map { |wl| wl.dup }
    end
  end
end
