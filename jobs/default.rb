SCHEDULER.every '1s' do
  data = {text: ["world","galaxy","universe"].sample}

  update_widget("hello", data)
  update_widget("number", {text: (1..10).to_a.sample})
end
