SCHEDULER = Rufus::Scheduler.new

def update_widget(name, data, next_time)
  redis = Redis.new(url: ENV["REDISTOGO_URL"] || "redis://localhost:6379")
  redis.set(name, JSON.generate({payload: data, next_time: next_time}))
end

def recurring_job(interval, &block)
  SCHEDULER.every(interval, first: :now) do |job|
    data = yield
    data.each do |name, payload|
      update_widget(name, payload, job.next_time)
    end
  end
end

Dir[File.join(File.dirname(__FILE__), 'jobs', '*.rb')].each { |file| require file }
