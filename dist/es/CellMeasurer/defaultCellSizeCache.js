import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

/**
 * Default CellMeasurer `cellSizeCache` implementation.
 * Permanently caches all cell sizes (identified by column and row index) unless explicitly cleared.
 * Can be configured to handle uniform cell widths and/or heights as a way of optimizing certain use cases.
 */
var CellSizeCache = function () {
  function CellSizeCache() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$uniformRowHeight = _ref.uniformRowHeight;
    var uniformRowHeight = _ref$uniformRowHeight === undefined ? false : _ref$uniformRowHeight;
    var _ref$uniformColumnWid = _ref.uniformColumnWidth;
    var uniformColumnWidth = _ref$uniformColumnWid === undefined ? false : _ref$uniformColumnWid;

    _classCallCheck(this, CellSizeCache);

    this._uniformRowHeight = uniformRowHeight;
    this._uniformColumnWidth = uniformColumnWidth;

    this._cachedColumnWidth = undefined;
    this._cachedRowHeight = undefined;

    this._cachedColumnWidths = {};
    this._cachedRowHeights = {};
  }

  _createClass(CellSizeCache, [{
    key: "clearAllColumnWidths",
    value: function clearAllColumnWidths() {
      this._cachedColumnWidth = undefined;
      this._cachedColumnWidths = {};
    }
  }, {
    key: "clearAllRowHeights",
    value: function clearAllRowHeights() {
      this._cachedRowHeight = undefined;
      this._cachedRowHeights = {};
    }
  }, {
    key: "clearColumnWidth",
    value: function clearColumnWidth(index) {
      this._cachedColumnWidth = undefined;

      delete this._cachedColumnWidths[index];
    }
  }, {
    key: "clearRowHeight",
    value: function clearRowHeight(index) {
      this._cachedRowHeight = undefined;

      delete this._cachedRowHeights[index];
    }
  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(index) {
      return this._uniformColumnWidth ? this._cachedColumnWidth : this._cachedColumnWidths[index];
    }
  }, {
    key: "getRowHeight",
    value: function getRowHeight(index) {
      return this._uniformRowHeight ? this._cachedRowHeight : this._cachedRowHeights[index];
    }
  }, {
    key: "setColumnWidth",
    value: function setColumnWidth(index, width) {
      this._cachedColumnWidth = width;
      this._cachedColumnWidths[index] = width;
    }
  }, {
    key: "setRowHeight",
    value: function setRowHeight(index, height) {
      this._cachedRowHeight = height;
      this._cachedRowHeights[index] = height;
    }
  }]);

  return CellSizeCache;
}();

export default CellSizeCache;