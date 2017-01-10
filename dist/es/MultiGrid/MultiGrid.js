import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Grid from '../Grid';

/**
 * Renders 1, 2, or 4 Grids depending on configuration.
 * A main (body) Grid will always be rendered.
 * Optionally, 1-2 Grids for sticky header rows will also be rendered.
 * If no sticky columns, only 1 sticky header Grid will be rendered.
 * If sticky columns, 2 sticky header Grids will be rendered.
 */

var MultiGrid = function (_Component) {
  _inherits(MultiGrid, _Component);

  function MultiGrid(props, context) {
    _classCallCheck(this, MultiGrid);

    var _this = _possibleConstructorReturn(this, (MultiGrid.__proto__ || _Object$getPrototypeOf(MultiGrid)).call(this, props, context));

    _this.state = {
      scrollLeft: 0,
      scrollTop: 0
    };

    _this._bottomLeftGridRef = _this._bottomLeftGridRef.bind(_this);
    _this._bottomRightGridRef = _this._bottomRightGridRef.bind(_this);
    _this._cellRendererBottomLeftGrid = _this._cellRendererBottomLeftGrid.bind(_this);
    _this._cellRendererBottomRightGrid = _this._cellRendererBottomRightGrid.bind(_this);
    _this._cellRendererTopRightGrid = _this._cellRendererTopRightGrid.bind(_this);
    _this._columnWidthRightGrid = _this._columnWidthRightGrid.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._rowHeightBottomGrid = _this._rowHeightBottomGrid.bind(_this);
    _this._topLeftGridRef = _this._topLeftGridRef.bind(_this);
    _this._topRightGridRef = _this._topRightGridRef.bind(_this);
    return _this;
  }

  /** See Grid#measureAllCells */


  _createClass(MultiGrid, [{
    key: 'measureAllRows',
    value: function measureAllRows() {
      this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells();
      this._bottomRightGrid && this._bottomRightGrid.measureAllCells();
      this._topLeftGrid && this._topLeftGrid.measureAllCells();
      this._topRightGrid && this._topRightGrid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */

  }, {
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref$columnIndex = _ref.columnIndex;
      var columnIndex = _ref$columnIndex === undefined ? 0 : _ref$columnIndex;
      var _ref$rowIndex = _ref.rowIndex;
      var rowIndex = _ref$rowIndex === undefined ? 0 : _ref$rowIndex;
      var _props = this.props;
      var fixedColumnCount = _props.fixedColumnCount;
      var fixedRowCount = _props.fixedRowCount;


      this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells({
        columnIndex: columnIndex,
        rowIndex: rowIndex - fixedRowCount
      });
      this._bottomRightGrid && this._bottomRightGrid.measureAllCells({
        columnIndex: columnIndex - fixedColumnCount,
        rowIndex: rowIndex - fixedRowCount
      });
      this._topLeftGrid && this._topLeftGrid.measureAllCells({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      });
      this._topRightGrid && this._topRightGrid.measureAllCells({
        columnIndex: columnIndex - fixedColumnCount,
        rowIndex: rowIndex
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._maybeCalculateCachedStyles(null, this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props;
      var columnWidth = _props2.columnWidth;
      var fixedColumnCount = _props2.fixedColumnCount;
      var fixedRowCount = _props2.fixedRowCount;
      var rowHeight = _props2.rowHeight;


      if (columnWidth !== nextProps.columnWidth || fixedColumnCount !== nextProps.fixedColumnCount) {
        this._leftGridWidth = null;
      }

      if (fixedRowCount !== nextProps.fixedRowCount || rowHeight !== nextProps.rowHeight) {
        this._topGridHeight = null;
      }

      this._maybeCalculateCachedStyles(this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var onScroll = _props3.onScroll;
      var onSectionRendered = _props3.onSectionRendered;
      var scrollLeftProp = _props3.scrollLeft;
      var scrollToColumn = _props3.scrollToColumn;
      var scrollTopProp = _props3.scrollTop;
      var scrollToRow = _props3.scrollToRow;

      var rest = _objectWithoutProperties(_props3, ['onScroll', 'onSectionRendered', 'scrollLeft', 'scrollToColumn', 'scrollTop', 'scrollToRow']);

      // scrollTop and scrollToRow props are explicitly filtered out and ignored

      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;


      return React.createElement(
        'div',
        { style: this._containerOuterStyle },
        React.createElement(
          'div',
          { style: this._containerTopStyle },
          this._renderTopLeftGrid(rest),
          this._renderTopRightGrid(_extends({}, rest, {
            scrollLeft: scrollLeft
          }))
        ),
        React.createElement(
          'div',
          { style: this._containerBottomStyle },
          this._renderBottomLeftGrid(_extends({}, rest, {
            scrollTop: scrollTop
          })),
          this._renderBottomRightGrid(_extends({}, rest, {
            onScroll: onScroll,
            onSectionRendered: onSectionRendered,
            scrollLeft: scrollLeft,
            scrollToColumn: scrollToColumn,
            scrollToRow: scrollToRow,
            scrollTop: scrollTop
          }))
        )
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }, {
    key: '_bottomLeftGridRef',
    value: function _bottomLeftGridRef(ref) {
      this._bottomLeftGrid = ref;
    }
  }, {
    key: '_bottomRightGridRef',
    value: function _bottomRightGridRef(ref) {
      this._bottomRightGrid = ref;
    }
  }, {
    key: '_cellRendererBottomLeftGrid',
    value: function _cellRendererBottomLeftGrid(_ref2) {
      var rowIndex = _ref2.rowIndex;

      var rest = _objectWithoutProperties(_ref2, ['rowIndex']);

      var _props4 = this.props;
      var cellRenderer = _props4.cellRenderer;
      var fixedRowCount = _props4.fixedRowCount;


      return cellRenderer(_extends({}, rest, {
        rowIndex: rowIndex + fixedRowCount
      }));
    }
  }, {
    key: '_cellRendererBottomRightGrid',
    value: function _cellRendererBottomRightGrid(_ref3) {
      var columnIndex = _ref3.columnIndex;
      var rowIndex = _ref3.rowIndex;

      var rest = _objectWithoutProperties(_ref3, ['columnIndex', 'rowIndex']);

      var _props5 = this.props;
      var cellRenderer = _props5.cellRenderer;
      var fixedColumnCount = _props5.fixedColumnCount;
      var fixedRowCount = _props5.fixedRowCount;


      return cellRenderer(_extends({}, rest, {
        columnIndex: columnIndex + fixedColumnCount,
        rowIndex: rowIndex + fixedRowCount
      }));
    }
  }, {
    key: '_cellRendererTopRightGrid',
    value: function _cellRendererTopRightGrid(_ref4) {
      var columnIndex = _ref4.columnIndex;

      var rest = _objectWithoutProperties(_ref4, ['columnIndex']);

      var _props6 = this.props;
      var cellRenderer = _props6.cellRenderer;
      var fixedColumnCount = _props6.fixedColumnCount;


      return cellRenderer(_extends({}, rest, {
        columnIndex: columnIndex + fixedColumnCount
      }));
    }
  }, {
    key: '_columnWidthRightGrid',
    value: function _columnWidthRightGrid(_ref5) {
      var index = _ref5.index;
      var _props7 = this.props;
      var fixedColumnCount = _props7.fixedColumnCount;
      var columnWidth = _props7.columnWidth;


      return columnWidth instanceof Function ? columnWidth({ index: index + fixedColumnCount }) : columnWidth;
    }
  }, {
    key: '_getBottomGridHeight',
    value: function _getBottomGridHeight(props) {
      var height = props.height;


      var topGridHeight = this._getTopGridHeight(props);

      return height - topGridHeight;
    }
  }, {
    key: '_getLeftGridWidth',
    value: function _getLeftGridWidth(props) {
      var fixedColumnCount = props.fixedColumnCount;
      var columnWidth = props.columnWidth;


      if (this._leftGridWidth == null) {
        if (columnWidth instanceof Function) {
          var leftGridWidth = 0;

          for (var index = 0; index < fixedColumnCount; index++) {
            leftGridWidth += columnWidth({ index: index });
          }

          this._leftGridWidth = leftGridWidth;
        } else {
          this._leftGridWidth = columnWidth * fixedColumnCount;
        }
      }

      return this._leftGridWidth;
    }
  }, {
    key: '_getRightGridWidth',
    value: function _getRightGridWidth(props) {
      var width = props.width;


      var leftGridWidth = this._getLeftGridWidth(props);

      return width - leftGridWidth;
    }
  }, {
    key: '_getTopGridHeight',
    value: function _getTopGridHeight(props) {
      var fixedRowCount = props.fixedRowCount;
      var rowHeight = props.rowHeight;


      if (this._topGridHeight == null) {
        if (rowHeight instanceof Function) {
          var topGridHeight = 0;

          for (var index = 0; index < fixedRowCount; index++) {
            topGridHeight += rowHeight({ index: index });
          }

          this._topGridHeight = topGridHeight;
        } else {
          this._topGridHeight = rowHeight * fixedRowCount;
        }
      }

      return this._topGridHeight;
    }

    /**
     * Avoid recreating inline styles each render; this bypasses Grid's shallowCompare.
     * This method recalculates styles only when specific props change.
     */

  }, {
    key: '_maybeCalculateCachedStyles',
    value: function _maybeCalculateCachedStyles(prevProps, props) {
      var columnWidth = props.columnWidth;
      var height = props.height;
      var fixedColumnCount = props.fixedColumnCount;
      var fixedRowCount = props.fixedRowCount;
      var rowHeight = props.rowHeight;
      var style = props.style;
      var styleBottomLeftGrid = props.styleBottomLeftGrid;
      var styleBottomRightGrid = props.styleBottomRightGrid;
      var styleTopLeftGrid = props.styleTopLeftGrid;
      var styleTopRightGrid = props.styleTopRightGrid;
      var width = props.width;


      var firstRender = !prevProps;
      var sizeChange = firstRender || height !== prevProps.height || width !== prevProps.width;
      var leftSizeChange = firstRender || columnWidth !== prevProps.columnWidth || fixedColumnCount !== prevProps.fixedColumnCount;
      var topSizeChange = firstRender || fixedRowCount !== prevProps.fixedRowCount || rowHeight !== prevProps.rowHeight;

      if (firstRender || sizeChange || style !== prevProps.style) {
        this._containerOuterStyle = _extends({
          height: height,
          width: width
        }, style);
      }

      if (firstRender || sizeChange || topSizeChange) {
        this._containerTopStyle = {
          height: this._getTopGridHeight(props),
          position: 'relative',
          width: width
        };

        this._containerBottomStyle = {
          height: height - this._getTopGridHeight(props),
          overflow: 'hidden',
          position: 'relative',
          width: width
        };
      }

      if (firstRender || styleBottomLeftGrid !== prevProps.styleBottomLeftGrid) {
        this._bottomLeftGridStyle = _extends({
          left: 0,
          outline: 0,
          overflow: 'hidden',
          position: 'absolute'
        }, styleBottomLeftGrid);
      }

      if (firstRender || leftSizeChange || styleBottomRightGrid !== prevProps.styleBottomRightGrid) {
        this._bottomRightGridStyle = _extends({
          left: this._getLeftGridWidth(props),
          outline: 0,
          position: 'absolute'
        }, styleBottomRightGrid);
      }

      if (firstRender || styleTopLeftGrid !== prevProps.styleTopLeftGrid) {
        this._topLeftGridStyle = _extends({
          left: 0,
          outline: 0,
          overflow: 'hidden',
          position: 'absolute',
          top: 0
        }, styleTopLeftGrid);
      }

      if (firstRender || leftSizeChange || styleTopRightGrid !== prevProps.styleTopRightGrid) {
        this._topRightGridStyle = _extends({
          left: this._getLeftGridWidth(props),
          outline: 0,
          overflow: 'hidden',
          position: 'absolute',
          top: 0
        }, styleTopRightGrid);
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref6) {
      var scrollLeft = _ref6.scrollLeft;
      var scrollTop = _ref6.scrollTop;

      this.setState({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      });
    }
  }, {
    key: '_renderBottomLeftGrid',
    value: function _renderBottomLeftGrid(props) {
      var fixedColumnCount = props.fixedColumnCount;
      var fixedRowCount = props.fixedRowCount;
      var rowCount = props.rowCount;
      var scrollTop = props.scrollTop;


      if (!fixedColumnCount) {
        return null;
      }

      return React.createElement(Grid, _extends({}, props, {
        cellRenderer: this._cellRendererBottomLeftGrid,
        columnCount: fixedColumnCount,
        height: this._getBottomGridHeight(props),
        ref: this._bottomLeftGridRef,
        rowCount: rowCount - fixedRowCount,
        rowHeight: this._rowHeightBottomGrid,
        scrollTop: scrollTop,
        style: this._bottomLeftGridStyle,
        width: this._getLeftGridWidth(props)
      }));
    }
  }, {
    key: '_renderBottomRightGrid',
    value: function _renderBottomRightGrid(props) {
      var columnCount = props.columnCount;
      var fixedColumnCount = props.fixedColumnCount;
      var fixedRowCount = props.fixedRowCount;
      var rowCount = props.rowCount;
      var scrollToColumn = props.scrollToColumn;
      var scrollToRow = props.scrollToRow;


      return React.createElement(Grid, _extends({}, props, {
        cellRenderer: this._cellRendererBottomRightGrid,
        columnCount: columnCount - fixedColumnCount,
        columnWidth: this._columnWidthRightGrid,
        height: this._getBottomGridHeight(props),
        onScroll: this._onScroll,
        ref: this._bottomRightGridRef,
        rowCount: rowCount - fixedRowCount,
        rowHeight: this._rowHeightBottomGrid,
        scrollToColumn: scrollToColumn - fixedColumnCount,
        scrollToRow: scrollToRow - fixedRowCount,
        style: this._bottomRightGridStyle,
        width: this._getRightGridWidth(props)
      }));
    }
  }, {
    key: '_renderTopLeftGrid',
    value: function _renderTopLeftGrid(props) {
      var fixedColumnCount = props.fixedColumnCount;
      var fixedRowCount = props.fixedRowCount;


      if (!fixedColumnCount || !fixedRowCount) {
        return null;
      }

      return React.createElement(Grid, _extends({}, props, {
        columnCount: fixedColumnCount,
        height: this._getTopGridHeight(props),
        ref: this._topLeftGridRef,
        rowCount: fixedRowCount,
        style: this._topLeftGridStyle,
        width: this._getLeftGridWidth(props)
      }));
    }
  }, {
    key: '_renderTopRightGrid',
    value: function _renderTopRightGrid(props) {
      var columnCount = props.columnCount;
      var fixedColumnCount = props.fixedColumnCount;
      var fixedRowCount = props.fixedRowCount;
      var scrollLeft = props.scrollLeft;


      if (!fixedRowCount) {
        return null;
      }

      return React.createElement(Grid, _extends({}, props, {
        cellRenderer: this._cellRendererTopRightGrid,
        columnCount: columnCount - fixedColumnCount,
        columnWidth: this._columnWidthRightGrid,
        height: this._getTopGridHeight(props),
        ref: this._topRightGridRef,
        rowCount: fixedRowCount,
        scrollLeft: scrollLeft,
        style: this._topRightGridStyle,
        width: this._getRightGridWidth(props)
      }));
    }
  }, {
    key: '_rowHeightBottomGrid',
    value: function _rowHeightBottomGrid(_ref7) {
      var index = _ref7.index;
      var _props8 = this.props;
      var fixedRowCount = _props8.fixedRowCount;
      var rowHeight = _props8.rowHeight;


      return rowHeight instanceof Function ? rowHeight({ index: index + fixedRowCount }) : rowHeight;
    }
  }, {
    key: '_topLeftGridRef',
    value: function _topLeftGridRef(ref) {
      this._topLeftGrid = ref;
    }
  }, {
    key: '_topRightGridRef',
    value: function _topRightGridRef(ref) {
      this._topRightGrid = ref;
    }
  }]);

  return MultiGrid;
}(Component);

MultiGrid.defaultProps = {
  fixedColumnCount: 0,
  fixedRowCount: 0,
  style: {},
  styleBottomLeftGrid: {},
  styleBottomRightGrid: {},
  styleTopLeftGrid: {},
  styleTopRightGrid: {}
};
export default MultiGrid;
process.env.NODE_ENV !== "production" ? MultiGrid.propTypes = {
  fixedColumnCount: PropTypes.number.isRequired,
  fixedRowCount: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  styleBottomLeftGrid: PropTypes.object.isRequired,
  styleBottomRightGrid: PropTypes.object.isRequired,
  styleTopLeftGrid: PropTypes.object.isRequired,
  styleTopRightGrid: PropTypes.object.isRequired
} : void 0;