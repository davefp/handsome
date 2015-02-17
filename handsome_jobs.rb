SCHEDULER = Rufus::Scheduler.new

def update_widget(name, data)
  redis = Redis.new
  redis.set(name, JSON.generate(data))
end

Dir[File.join(File.dirname(__FILE__), 'jobs', '*.rb')].each { |file| require file }
