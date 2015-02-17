widget_job('hello', '5s') do
  {text: ["world","galaxy","universe"].sample}
end

widget_job('number', '5s') do
  {text: (1..10).to_a.sample}
end
