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

  def self.update_widget(name, data)
    redis = Redis.new
    redis.set(name, JSON.generate(data))
  end

  def render_error(widget)
    JSON.generate({error: "No widget for key '#{widget}'"})
  end

  scheduler = Rufus::Scheduler.new

  scheduler.every '1s' do
    data = {text: ["world","galaxy","universe"].sample}

    update_widget("hello", data)
    update_widget("number", {text: (1..10).to_a.sample})
  end
end
