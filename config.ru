$stdout.sync = true

require 'rubygems'
require 'bundler'

Bundler.require

require './handsome_jobs'
require './handsome_server'
require './handsome_assets'

map '/assets' do
  run HandsomeAssets.environment HandsomeServer.settings.root
end


run HandsomeServer
