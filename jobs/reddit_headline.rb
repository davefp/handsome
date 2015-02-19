recurring_job('reddit_headline', '1m') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/r/all.json?limit=1')))
  title = listing['data']['children'][0]['data']['title']
  {text: title}
end
