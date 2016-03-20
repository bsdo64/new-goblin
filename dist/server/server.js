'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _iso = require('iso');

var _iso2 = _interopRequireDefault(_iso);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = (0, _express2.default)();
var iso = new _iso2.default();

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/user/123', activeClassName: 'active' },
              'Bob'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/user/abc', activeClassName: 'active' },
              'Sally'
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

var User = function (_React$Component2) {
  _inherits(User, _React$Component2);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'render',
    value: function render() {
      var userID = this.props.params.userID;


      return _react2.default.createElement(
        'div',
        { className: 'User' },
        _react2.default.createElement(
          'h1',
          null,
          'User id: ',
          userID
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/user/' + userID + '/tasks/foo', activeClassName: 'active' },
              'foo task'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/user/' + userID + '/tasks/bar', activeClassName: 'active' },
              'bar task'
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return User;
}(_react2.default.Component);

var Task = function (_React$Component3) {
  _inherits(Task, _React$Component3);

  function Task() {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Task).apply(this, arguments));
  }

  _createClass(Task, [{
    key: 'render',
    value: function render() {
      var _props$params = this.props.params;
      var userID = _props$params.userID;
      var taskID = _props$params.taskID;


      return _react2.default.createElement(
        'div',
        { className: 'Task' },
        _react2.default.createElement(
          'h2',
          null,
          'User ID: ',
          userID
        ),
        _react2.default.createElement(
          'h3',
          null,
          'Task ID: ',
          taskID
        )
      );
    }
  }]);

  return Task;
}(_react2.default.Component);

var routes = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: 'user/:userID', component: User },
      _react2.default.createElement(_reactRouter.Route, { path: 'tasks/:taskID', component: Task })
    )
  )
);

app.use(function (req, res) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send((0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps)));
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(3000);