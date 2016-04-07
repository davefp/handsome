recurring_job('1m') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/r/todayilearned.json?limit=5')))

  title = "not found"
  score = "0"
  listing['data']['children'].each do |item|
    next if item['data']['stickied']
    title = item['data']['title']
    score = item['data']['score']
    break
  end
  {
    reddit_headline: {text: title},
    reddit_score: {number: score}
  }
end
