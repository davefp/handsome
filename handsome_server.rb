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
    data = JSON.parse(redis.get(key) || "{}")
    if !data.empty?
      next_time = data.delete("next_time")
      now = Time.now
      updates_in_millis = ((Time.parse(next_time) - now + 1) * 1000).to_i
      data[:updates_in_millis] = updates_in_millis > 0 ? updates_in_millis : 0
      JSON.generate(data)
    else
      render_error(key)
    end
  end

  private

  def render_error(widget)
    JSON.generate({error: "No widget for key '#{widget}'"})
  end
end
