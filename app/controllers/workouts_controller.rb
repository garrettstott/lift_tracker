class WorkoutsController < ApplicationController
  include LoadableConcern

  before_action :build_workout, only: [:new]

  def index
    @next_workout = current_user.next_workout
    @workouts = current_user.workouts.first(30)
  end

  def show
    @workout = Workout.find(params[:id])
    if params[:start_date]
      beginning_of_month = DateTime.parse(params[:start_date]).beginning_of_month
      end_of_month = DateTime.parse(params[:start_date]).end_of_month
    else
      beginning_of_month = DateTime.now.beginning_of_month
      end_of_month = DateTime.now.end_of_month
    end
    @workouts = current_user.workouts.where(completed_at: beginning_of_month..end_of_month)
    case @workout.style
    when "chest"
      @workout_stats = chest_loads
    when "legs"
      @workout_stats = leg_loads
    when "arms"
      @workout_stats = arm_loads
    when "back"
      @workout_stats = back_loads
    else
      @workout_stats = []
    end
  end

  def edit
    @workout = Workout.find(params[:id])
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update(workout_params)
      flash[:success] = "Workout Updated"
      redirect_to workout_path(@workout)
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
      redirect_to workout_path(@workout)
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

    @last_workout = Workout.where(style: @workout.style, user_id: current_user.id).first
    if @last_workout
      @workout.workout_lifts = @last_workout.workout_lifts.map { |wl| wl.dup }
    end
  end
end
