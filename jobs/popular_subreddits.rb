recurring_job('1d') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/subreddits/popular.json')))

  list = listing['data']['children'].first(20).map do |item|
    item['data']['display_name']
  end
  {top_subreddits: {list: list}}
end
