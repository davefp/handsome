require 'rubygems'
require 'bundler'

Bundler.require

require './handsome_server'
require './handsome_assets'

unless ENV['RACK_ENV'] == 'production'
  map '/assets' do
    run HandsomeAssets.environment HandsomeServer.settings.root
  end
end

run HandsomeServer
