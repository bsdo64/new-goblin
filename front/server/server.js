import express from 'express'
import Iso from 'iso';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, browserHistory, Route, Router, Link } from 'react-router';

import alt from 'alt';
import fs from 'fs';
import path from 'path';

const app = express();
const iso = new Iso();

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/user/123" activeClassName="active">Bob</Link></li>
          <li><Link to="/user/abc" activeClassName="active">Sally</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class User extends React.Component {
  render() {
    const { userID } = this.props.params

    return (
      <div className="User">
        <h1>User id: {userID}</h1>
        <ul>
          <li><Link to={`/user/${userID}/tasks/foo`} activeClassName="active">foo task</Link></li>
          <li><Link to={`/user/${userID}/tasks/bar`} activeClassName="active">bar task</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class Task extends React.Component {
  render() {
    const { userID, taskID } = this.props.params

    return (
      <div className="Task">
        <h2>User ID: {userID}</h2>
        <h3>Task ID: {taskID}</h3>
      </div>
    )
  }
}

const routes = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="user/:userID" component={User}>
      <Route path="tasks/:taskID" component={Task} />
    </Route>
  </Route>
</Router>;

app.use((req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
});

app.listen(3000);
