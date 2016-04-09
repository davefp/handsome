# Handsome Dashboard Framework

## What is Handsome?

Handsome is a dashboard framework written in ruby and [JSX](https://facebook.github.io/jsx/).

It is currently a work-in-progress.

Handsome is a cousin to [Dashing](http://dashing.io), which is also a ruby-based dashboard framework.

# Getting Started

## Prerequisites

You will need *ruby* and *npm* installed before you can do anything.

You'll also need *redis* installed. [Read the quickstart guide to get going quickly](http://redis.io/topics/quickstart).

## Installation and setup

Clone this repository (or fork it and then clone).

Install ruby dependencies:

`$ bundle`

Install js dependencies:

`$ npm install`

Start your Handsome server:

`$ foreman start`

Wait a short while for the ruby server to start and webpack to build your js bundle.

Now visit http://localhost:5000 to see the default dashboard.

Hooray! You're running Handsome.

## A bit more detail

For simplicity's sake, Handsome provides a `Procfile` to use in development that starts and starts the ruby server, webpack, and redis with a single command.

**Note**: Handsome only supports redis' default configuration right now, so it can't connect to a remote instance or a local server running on a port other than 6379. This will be fixed soon!

# Adding your own dashboard

The default dashboard is a bit boring, so let's add a new one.

Create a new JSX file under the dashboards directory:

$ touch dashboards/my_dashboard.jsx

The skeleton of a dashboard is a simple ReactDOM.render call:

```
// my_dashboard.jsx

ReactDOM.render(
  <div>
    //Widgets go here!
  </div>,
  document.getElementById('content')
);
```

Now you can populate the dashboard with widgets by simply adding the appropriate React components as children of the existing div.

Each widget needs a `name` so that it knows where to call for updates. Each widget type can also have its own properties. The text widget, for example, takes a 'title' property.

Add a text widget to your dashboard:

```
// my_dashboard.jsx

ReactDOM.render(
  <div>
    <TextWidget name="reddit_headline" title="Top Reddit Headline" />
  </div>,
  document.getElementById('content')
);
```

That's it! You can now navigate to http://localhost:5000/my_dashboard and see your dashboard and widgets.

# Adding Data

Your new dashboard is boring. It's got a widget, but there's no data going to it. You can fix that by adding a new job.

Create a new job file:

`$ touch jobs/my_job.rb`

Handsome provides a helper for creating periodic jobs called `recurring_job`. It takes the name of the widget you want to update, the frequency of the job, and a block that returns a hash of data to pass to the widget.

Here's an example to go with our new widget above that fetches the title of the top Reddit post every minute:

```
recurring_job('reddit_headline', '1m') do
  listing = JSON.parse(Net::HTTP.get(URI('https://www.reddit.com/r/all.json?limit=1')))
  title = listing['data']['children'][0]['data']['title']
  {text: title}
end
```

# Making Custom Widgets

Create a JSX file for your widget:

`$ touch widgets/my_widget.jsx`

It should be an ES6 class that extends the BaseWidget like so:

```
import React from 'react';
import BaseWidget from './widget.jsx'

export default class TextWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {title: "init", text: "init"};
  }

  render() {
    return (
      <div className={"text_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <h2>{this.state.text}</h2>
      </div>
    );
  }
}
```

At a bare minimum it should also implement the `render` method and set some initial state in the constructor so that it can be drawn and have some default data to be shown while waiting for the server.

# How does Handsome differ from Dashing?

Handsome's front-end is powered by [React](https://facebook.github.io/react/), while Dashing's is powered by [Batman.js](http://batmanjs.org/)

Handsome uses a polling model to update dashboards, while Dashing streams data using [Server Sent Events](https://en.wikipedia.org/wiki/Server-sent_events).
