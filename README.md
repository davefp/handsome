[![Build Status](https://travis-ci.org/davefp/handsome.svg?branch=master)](https://travis-ci.org/davefp/handsome)
[![Coverage Status](https://coveralls.io/repos/github/davefp/handsome/badge.svg?branch=master)](https://coveralls.io/github/davefp/handsome?branch=master)
# Handsome Dashboard Framework

## What is Handsome?

Handsome is a dashboard framework written in javascript.

It is currently a work-in-progress.

Handsome is a cousin to [Dashing](http://dashing.io).

# Getting Started

## Prerequisites

You will need *node* and [*yarn*](https://yarnpkg.com/en/) installed before you can do anything.

You'll also need *redis* installed. [Read the quickstart guide to get going quickly](http://redis.io/topics/quickstart).

## Installation and setup

### Easy setup with Docker-compose

This will help you to start with handsome, no redis or npm/yarn requirement, you just need docker-compose & docker.

Build service:

`$ docker-compose build`

Launch the app

`$ docker-compose up`

Now visit <http://localhost:3000> to see the default dashboard!

Hooray! You're running Handsome in docker!!

### docker

To run the standalone image, you need to have a redis server running.

Start redis:

`$ redis-server --protected-mode no`

`--protected-mode` is disabled to allow container connection. This is NOT recommend for production use.

Now you can build & run the docker image:

`$ docker build -t handsome .`

```
$ docker run -d -p 3000:3000 \
    -e REDIS_SERVER_HOST=<redis_ip_address> \
    -v <jobs_folder>:/opt/app/jobs/ \
    -v <dashboards_folder>:/opt/app/dashboards/ \
    handsome
```

 with :
  * <redis_ip_address> : the ip address of a running redis (you can use `ip a` to show your ip)
  * <jobs_folder> : folder on host where handsome can find the jobs
  * <dashboards_folder> : folder on host where handsome can find the dashboards

Example:
```
$ docker run -d -p 3000:3000 \
    -e REDIS_SERVER_HOST=192.168.0.1 \
    -v /home/y0an/handsome/jobs/:/opt/app/jobs/ \
    -v /home/y0an/handsome/dashboards/:/opt/app/dashboards/ \
    handsome
```

### Standard without docker

Clone this repository (or fork it and then clone).

Install dependencies:

`$ yarn install`

This will also build your js bundle and place it in the `build` directory.

Start redis:

`$ redis-server`

Start your Handsome server:

`$ yarn start`

Now visit <http://localhost:3000> to see the default dashboard.

Hooray! You're running Handsome.

## A bit more detail

Behind the scenes, Handsome runs a simple [Express](http://expressjs.com/) app to serve widget data and repeatedly schedule jobs to generate new widget data. The data is stored in redis.

In development, the app will auto-generate and serve the client-side assets. Changing a source file will cause the relevant bundle to be regenerated on the fly.

# Adding your own dashboard

The default dashboard is a bit boring, so let's add a new one.

Create a new JSX file under the dashboards directory:

`$ touch dashboards/my_dashboard.jsx`

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

That's it! You can now navigate to http://localhost:3000/my_dashboard and see your dashboard and widgets.

# Adding Data

Your new dashboard is boring. It's got a widget, but there's no data going to it. You can fix that by adding a new job.

Create a new job file:

`$ touch jobs/my_job.js`

Jobs need to export the following:

* An `interval`, which is the period between each run of the job in milliseconds
* A `promise`, which is a function that takes two arguments: `fulfill` and `reject`. Call `fulfill` with the widget data on success or `reject` with an error message if the job fails.

This function is used to create a [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Here's an example to go with our new widget above that fetches the title of the top Reddit post every minute:

```
import request from "request"
const url = "https://www.reddit.com/subreddits/popular.json";

export const interval = 300000;
export const promise = (fulfill, reject) => {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      var subreddit_list = json['data']['children'].slice(0,19).map(function(item) {
        return item['data']['display_name'];
      });
      fulfill({top_subreddits: {list: subreddit_list}});
    } else {
      reject(error);
    }
  });
};
```


# Making Custom Widgets

Create JSX and Sass files for your widget:

```
$ touch widgets/my_widget.jsx
$ touch widgets/my_widget.scss
```

The widget itself should be an ES6 class that extends the BaseWidget like so:

```
import React from 'react';
import BaseWidget from './widget.jsx';

import './my_widget.scss';

export default class MyWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {title: "init", text: "init"};
  }

  render() {
    return (
      <div className={"my_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <h2>{this.state.text}</h2>
      </div>
    );
  }
}
```

At a bare minimum it should also implement the `render` method and set some initial state in the constructor so that it can be drawn and have some default data to be shown while waiting for the server.

The Sass file should import the variables defined in `styles/_variables.scss` and all styles should be scoped to the widget in question:

```
@import '../styles/variables';

.widget.my_widget {
  background-color: $color_4;
  .h2 {
    font-size: 500%;
  }
}
```

# Using a different storage engine

Handsome stores widget data in redis by default, but it uses [cacheman](https://github.com/cayasso/cacheman) as an interface.

This means that you can use any storage engine that cacheman supports. [Here are the available storage engines](https://github.com/cayasso/cacheman#supported-engines)

To switch engines, install the corresponding cacheman package (e.g. `cacheman-mongo`) for MongoDB and then update the storage options in `config.js` to use the new engine:

```
var Cacheman = require('cacheman');

var storage_options = {
  engine: 'mongo',
  port: 9999,
  host: '127.0.0.1',
  username: 'user',
  ...
};

exports.getStorage = function() {
  return new Cacheman('handsome', storage_options)
};
```

# How does Handsome differ from Dashing?

Handsome's front-end is powered by [React](https://facebook.github.io/react/), while Dashing's is powered by [Batman.js](http://batmanjs.org/)

Handsome's back-end is a node/express app, while Dashing runs Sinatra.

Handsome uses a polling model to update dashboards, while Dashing streams data using [Server Sent Events](https://en.wikipedia.org/wiki/Server-sent_events).
