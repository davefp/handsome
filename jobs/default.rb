recurring_job('5s') do
  {
    hello: {text: ["world","galaxy","universe"].sample},
    number: {number: (1..1000).to_a.sample}
  }
end
