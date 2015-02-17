require 'json'

class HandsomeServer < Sinatra::Base

  # redirect to default dashboard
  get '/' do
    redirect '/default'
  end

  # get the dashboard
  get '/:dashboard' do
    erb :index, locals: {dashboard: params[:dashboard]}
  end

  # get the latest data for the given widget
  get '/widgets/:widget.json' do
    content_type :json

    redis = Redis.new

    key = params[:widget]
    data = redis.get(key)
    if data
      data
    else
      render_error(key)
    end
  end

  private

  def render_error(widget)
    JSON.generate({error: "No widget for key '#{widget}'"})
  end
end
