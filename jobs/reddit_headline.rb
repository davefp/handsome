recurring_job('1m') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/r/todayilearned.json?limit=2')))
  title = listing['data']['children'][1]['data']['title']
  score = listing['data']['children'][1]['data']['score']
  {
    reddit_headline: {text: title},
    reddit_score: {number: score}
  }
end
