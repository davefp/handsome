SCHEDULER = Rufus::Scheduler.new

def update_widget(name, data, next_time)
  redis = Redis.new
  redis.set(name, JSON.generate({payload: data, next_time: next_time}))
end

Dir[File.join(File.dirname(__FILE__), 'jobs', '*.rb')].each { |file| require file }
