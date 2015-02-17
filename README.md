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

The ruby server is a modular Sinatra app, so you can start it on its own with a simple:

`$ rackup`

Similarly, you can get redis going by running:

`$ redis-server`

**Note**: Handsome only supports redis' default configuration right now, so it can't connect to a remote instance or a local server running on a port other than 6379. This will be fixed soon!

# Adding your own dashboard

The default dashboard is a bit boring, so let's add a new one.

Create a new JSX file under the dashboards directory:

$ touch dashboards/my_dashboard.jsx

The skeleton of a dashboard is a simple React.render call:

```
// my_dashboard.jsx

React.render(
  <div>
    //Widgets go here!
  </div>,
  document.getElementById('content')
);
```

Now you can populate the dashboard with widgets by simply adding the appropriate React components as children of the existing div.

Each widget needs a `name` so that it knows where to call for updates, and a `pollInterval` to tell it how often to check for updates. Each widget type also has its own properties. The text widget, for example, can takes a 'title' property.

Add a text widget to your dashboard:

```
// my_dashboard.jsx

React.render(
  <div>
    <TextWidget name="time" title="The Time" pollInterval={1000} />
  </div>,
  document.getElementById('content')
);
```

That's it! You can now navigate to http://localhost:9292/my_dashboard and see your dashboard and widgets.

# Adding Data

Your new dashboard is boring. It's got a widget, but there's no data going to it. You can fix that by adding a new job.

Create a new job file:

`$ touch jobs/my_job.rb`

Handsome uses rufus-scheduler to do job scheduling, so your job code should be wrapped in a schedule block like this:

```
# jobs/my_job.rb
SCHEDULER.every '1s' do
  # Job code goes here!
end
```

## How does Handsome differ from Dashing?

Handsome's front-end is powered by [React](https://facebook.github.io/react/), while Dashing's is powered by [Batman.js](http://batmanjs.org/)

Handsome uses a polling model to update dashboards, while Dashing streams data using [Server Sent Events](https://en.wikipedia.org/wiki/Server-sent_events).
