'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _onScroll = require('./utils/onScroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WindowScroller = function (_Component) {
  _inherits(WindowScroller, _Component);

  function WindowScroller(props) {
    _classCallCheck(this, WindowScroller);

    var _this = _possibleConstructorReturn(this, (WindowScroller.__proto__ || Object.getPrototypeOf(WindowScroller)).call(this, props));

    var height = typeof window !== 'undefined' ? window.innerHeight : 0;

    _this.state = {
      isScrolling: false,
      height: height,
      scrollTop: 0
    };

    _this._onScrollWindow = _this._onScrollWindow.bind(_this);
    _this._onResizeWindow = _this._onResizeWindow.bind(_this);
    _this._enablePointerEventsAfterDelayCallback = _this._enablePointerEventsAfterDelayCallback.bind(_this);
    return _this;
  }

  _createClass(WindowScroller, [{
    key: 'updatePosition',
    value: function updatePosition() {
      // Subtract documentElement top to handle edge-case where a user is navigating back (history) from an already-scrolled bage.
      // In this case the body's top position will be a negative number and this element's top will be increased (by that amount).
      this._positionFromTop = _reactDom2.default.findDOMNode(this).getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = this.state.height;


      this.updatePosition();

      if (height !== window.innerHeight) {
        this.setState({
          height: window.innerHeight
        });
      }

      (0, _onScroll.registerScrollListener)(this);

      window.addEventListener('resize', this._onResizeWindow, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _onScroll.unregisterScrollListener)(this);

      window.removeEventListener('resize', this._onResizeWindow, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state,
          isScrolling = _state.isScrolling,
          scrollTop = _state.scrollTop,
          height = _state.height;


      return children({
        height: height,
        isScrolling: isScrolling,
        scrollTop: scrollTop
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_enablePointerEventsAfterDelayCallback',
    value: function _enablePointerEventsAfterDelayCallback() {
      this.setState({
        isScrolling: false
      });
    }
  }, {
    key: '_onResizeWindow',
    value: function _onResizeWindow(event) {
      var onResize = this.props.onResize;


      this.updatePosition();

      var height = window.innerHeight || 0;

      this.setState({ height: height });

      onResize({ height: height });
    }
  }, {
    key: '_onScrollWindow',
    value: function _onScrollWindow(event) {
      var onScroll = this.props.onScroll;

      // In IE10+ scrollY is undefined, so we replace that with the latter

      var scrollY = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop;

      var scrollTop = Math.max(0, scrollY - this._positionFromTop);

      this.setState({
        isScrolling: true,
        scrollTop: scrollTop
      });

      onScroll({ scrollTop: scrollTop });
    }
  }]);

  return WindowScroller;
}(_react.Component);

WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
exports.default = WindowScroller;
process.env.NODE_ENV !== "production" ? WindowScroller.propTypes = {
  /**
   * Function responsible for rendering children.
   * This function should implement the following signature:
   * ({ height, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: _react.PropTypes.func.isRequired
} : void 0;