class ApplicationController < ActionController::Base
  before_action :set_time_zone, if: :user_signed_in?
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  before_action :authenticate_user!

  # before_action -> { flash[:notice] = 'notice'; flash[:error] = 'error'; flash[:success] = 'success'}
  private

  def set_time_zone
    Time.zone = 'MST'
  end
end
