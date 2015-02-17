SCHEDULER = Rufus::Scheduler.new

def update_widget(name, data, next_time)
  redis = Redis.new
  redis.set(name, JSON.generate({payload: data, next_time: next_time}))
end

def widget_job(name, interval, &block)
  SCHEDULER.every(interval) do |job|
    data = yield
    update_widget(name, data, job.next_time)
  end
end

Dir[File.join(File.dirname(__FILE__), 'jobs', '*.rb')].each { |file| require file }
