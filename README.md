# Handsome Dashboard Framework

## What is Handsome?

Handsome is a dashboard framework written in ruby and [JSX](https://facebook.github.io/jsx/).

It is currently a work-in-progress.

Handsome is a cousin to [Dashing](http://dashing.io), which is also a ruby-based dashboard framework.

# Getting Started

Clone this repository (or fork it and then clone).

Install ruby dependencies:

`$ bundle`

You'll also need redis installed. [Read the quickstart guide to get going quickly](http://redis.io/topics/quickstart).

Start your Handsome server:

`$ foreman start`

Now visit http://localhost:9292 to see the default dashboard.

Hooray! You're running Handsome.

## A bit more detail

For simplicity's sake, Handsome provides a `Procfile` to use in development that starts and manages the ruby server and redis with a single command.

The ruby server is a modular Sinatra app, so you can start it on its own with a simple

`$ rackup`

Similarly, you can get redis going by running

`$ redis-server`

**Note**: Handsome only supports redis' default configuration right now, so it can't connect to a remote instance or a local server running on a port other than 6379. This will be fixed soon!

## How does Handsome differ from Dashing?

Handsome's front-end is powered by [React](https://facebook.github.io/react/), while Dashing's is powered by [Batman.js](http://batmanjs.org/)

Handsome uses a polling model to update dashboards, while Dashing streams data using [Server Sent Events](https://en.wikipedia.org/wiki/Server-sent_events).
