SCHEDULER.every '5s' do |job|
  data = {text: ["world","galaxy","universe"].sample}

  update_widget("hello", data, job.next_time)
  update_widget("number", {text: (1..10).to_a.sample}, job.next_time)
end
