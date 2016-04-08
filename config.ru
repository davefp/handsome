$stdout.sync = true

require 'rubygems'
require 'bundler'

Bundler.require

require './handsome_jobs'
require './handsome_server'

run HandsomeServer
