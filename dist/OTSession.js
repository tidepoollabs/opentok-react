'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createSession2 = require('./createSession');

var _createSession3 = _interopRequireDefault(_createSession2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OTSession = function (_Component) {
  _inherits(OTSession, _Component);

  function OTSession(props) {
    _classCallCheck(this, OTSession);

    var _this = _possibleConstructorReturn(this, (OTSession.__proto__ || Object.getPrototypeOf(OTSession)).call(this, props));

    _this.state = {
      streams: []
    };
    return _this;
  }

  _createClass(OTSession, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { session: this.sessionHelper.session, streams: this.state.streams };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.createSession();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.apiKey !== this.props.apiKey || prevProps.sessionId !== this.props.sessionId || prevProps.token !== this.props.token) {
        this.createSession();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroySession();
    }
  }, {
    key: 'createSession',
    value: function createSession() {
      var _this2 = this;

      this.destroySession();

      this.sessionHelper = (0, _createSession3.default)({
        apiKey: this.props.apiKey,
        sessionId: this.props.sessionId,
        token: this.props.token,
        onStreamsUpdated: function onStreamsUpdated(streams) {
          _this2.setState({ streams: streams });
        },
        onConnect: this.props.onConnect,
        onError: this.props.onError,
        options: this.props.options
      });

      if (this.props.eventHandlers && _typeof(this.props.eventHandlers) === 'object') {
        this.sessionHelper.session.on(this.props.eventHandlers);
      }
      if (this.sessionHelper && this.sessionHelper.session) {
        this.props.currentSession(this.sessionHelper.session);
      }
      var streams = this.sessionHelper.streams;

      this.setState({ streams: streams });
    }
  }, {
    key: 'destroySession',
    value: function destroySession() {
      if (this.sessionHelper) {
        if (this.props.eventHandlers && _typeof(this.props.eventHandlers) === 'object') {
          this.sessionHelper.session.off(this.props.eventHandlers);
        }
        this.sessionHelper.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return OTSession;
}(_react.Component);

exports.default = OTSession;


OTSession.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]).isRequired,
  apiKey: _propTypes2.default.string.isRequired,
  sessionId: _propTypes2.default.string.isRequired,
  token: _propTypes2.default.string.isRequired,
  eventHandlers: _propTypes2.default.objectOf(_propTypes2.default.func),
  onConnect: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  currentSession: _propTypes2.default.func,
  options: _propTypes2.default.object
};

OTSession.defaultProps = {
  eventHandlers: null,
  onConnect: null,
  onError: null,
  options: {}
};

OTSession.childContextTypes = {
  streams: _propTypes2.default.arrayOf(_propTypes2.default.object),
  session: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func,
    unsubscribe: _propTypes2.default.func
  })
};