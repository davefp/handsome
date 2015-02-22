recurring_job('1m') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/r/todayilearned.json?limit=1')))
  title = listing['data']['children'][0]['data']['title']
  {reddit_headline: {text: title}}
end
