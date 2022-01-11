"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizableContainer = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@mui/styles");

var _excluded = ["renderOnResize", "resizeStep", "gap"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      height: "calc(100% - 4px)",
      overflow: "hidden"
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  };
});

var ResizableContainer = function ResizableContainer(_ref) {
  var renderOnResize = _ref.renderOnResize,
      _ref$resizeStep = _ref.resizeStep,
      resizeStep = _ref$resizeStep === void 0 ? 10 : _ref$resizeStep,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 5 : _ref$gap,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      rows = _useState2[0],
      setRows = _useState2[1];

  var classes = useStyles();
  var container = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      sizes = _useState4[0],
      setSizes = _useState4[1]; // This sorts the items into separate rows using row property


  var fillRows = (0, _react.useCallback)(function () {
    var classifiedRows = [];
    var computedSizes = [];
    var allChild = props.children;
    if (!Array.isArray(props.children)) allChild = [allChild];
    allChild.forEach(function (child, key) {
      // *** Need to check how this is done
      // if (child.type.name != "Resizable") return;
      if (!classifiedRows[child.props.row]) {
        classifiedRows[child.props.row] = [];
        computedSizes[child.props.row] = [];
      }

      classifiedRows[child.props.row].push(child);
    }); // Initializing width and height

    classifiedRows.forEach(function (row, rowId) {
      var rowCount = row.length;
      row.forEach(function (item, itemId) {
        computedSizes[rowId].push({
          width: parseInt((container.current.clientWidth - 2 * gap * rowCount) / rowCount),
          height: parseInt((container.current.clientHeight - 2 * gap * rowCount) / classifiedRows.length)
        });
      });
    });
    setRows(classifiedRows);
    setSizes(computedSizes);
  }, [gap, props.children]);

  var updateSizesOnChildWidthChange = function updateSizesOnChildWidthChange(rowId, childId, param, newItemSize, minWidth, maxWidth, minHeight, maxHeight) {
    var updateFlag = true;
    var updatedSizes = (0, _toConsumableArray2.default)(sizes); // Reflects width changes

    if (param === "width") {
      var availableWidth = container.current.clientWidth - newItemSize.width;
      var previousAvailableWidth = 0;
      sizes[rowId].forEach(function (item, id) {
        if (id === childId) return;
        previousAvailableWidth += item.width;
      });
      updatedSizes[rowId] = sizes[rowId].map(function (item, itemId) {
        if (itemId === childId) {
          var acceptedWidth = newItemSize.width;
          acceptedWidth = acceptedWidth < minWidth ? minWidth : acceptedWidth;
          acceptedWidth = acceptedWidth > maxWidth ? maxWidth : acceptedWidth; // This stop the user to resize a box beyond maxWidth and below minWidth

          if (newItemSize.width > maxWidth) updateFlag = false;
          if (newItemSize.width < minWidth) updateFlag = false;
          return {
            width: acceptedWidth,
            height: newItemSize.height
          };
        } else {
          var newWidth = parseInt(item.width) / previousAvailableWidth * availableWidth; // This was used to stop resizing if any other box dissallows it
          // if (newWidth > maxWidth) updateFlag = false;
          // if (newWidth < minWidth) updateFlag = false;
          // This only prevents resizing that are constraints to maxWidth and minWidth

          newWidth = newWidth > maxWidth ? maxWidth : newWidth;
          newWidth = newWidth < minWidth ? minWidth : newWidth;
          return {
            width: newWidth,
            height: item.height
          };
        }
      });
    } // Reflects height chnages


    if (param === "height") {
      if (newItemSize.height > maxHeight) updateFlag = false;
      if (newItemSize.height < minHeight) updateFlag = false;
      var availableHeight = container.current.clientHeight - 2 * gap * sizes.length - newItemSize.height;
      var previousAvailableHeight = 0;
      sizes.forEach(function (row, id) {
        if (id === rowId) return;
        previousAvailableHeight += row[0].height;
      });
      updatedSizes = sizes.map(function (row, _rowId) {
        var newHeight = parseInt(row[0].height) / previousAvailableHeight * availableHeight;
        var newRow = row.map(function (item, itemId) {
          // let finalApplicableHeight = newHeight;
          // if (newHeight < minHeight) finalApplicableHeight = minHeight;
          // // This update is for the moving box
          // if (_rowId === rowId)
          //     return {
          //         width: item.width,
          //         height: newItemSize.height,
          //     };
          // // This update is for the other boxes
          // else {
          //     return {
          //         width: item.width,
          //         height: finalApplicableHeight,
          //     };
          // }
          if (_rowId === rowId) {
            // Calculation for the target box
            var acceptedHeight = newItemSize.height;
            acceptedHeight = acceptedHeight < minHeight ? minHeight : acceptedHeight;
            acceptedHeight = acceptedHeight > maxHeight ? maxHeight : acceptedHeight; // This stop the user to resize a box beyond maxWidth and below minWidth

            if (newItemSize.height > maxHeight) updateFlag = false;
            if (newItemSize.height < minHeight) updateFlag = false;
            return {
              width: newItemSize.width,
              height: acceptedHeight
            };
          } else {
            // This was used to stop resizing if any other box dissallows it
            // if (newWidth > maxWidth) updateFlag = false;
            // if (newWidth < minWidth) updateFlag = false;
            // This only prevents resizing that are constraints to maxWidth and minWidth
            newHeight = newHeight > maxHeight ? maxHeight : newHeight;
            newHeight = newHeight < minHeight ? minHeight : newHeight;
            return {
              width: item.width,
              height: newHeight
            };
          }
        });
        return newRow;
      });
    }

    if (updateFlag) setSizes(updatedSizes);
  };

  (0, _react.useEffect)(function () {
    fillRows();
  }, [props.children, fillRows]);
  (0, _react.useEffect)(function () {
    if (renderOnResize) {
      window.addEventListener("resize", fillRows);
    }

    return function () {
      window.removeEventListener("resize", fillRows);
    };
  }, [renderOnResize, props, fillRows]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root,
    ref: container
  }, rows.map(function (row, rowId) {
    var maxHeightRatio = -0.15 * rows.length + 1.15;
    var minHeightRatio = (1 - maxHeightRatio) / (rows.length - 1);
    var maxWidthRatio = -0.15 * row.length + 1.15;
    var minWidthRatio = (1 - maxWidthRatio) / (row.length - 1);
    return /*#__PURE__*/_react.default.createElement("div", {
      key: rowId,
      className: classes.flexRow
    }, row.map(function (child, key) {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        key: key,
        rowId: rowId,
        childId: key,
        first: key === 0,
        last: key === row.length - 1,
        isFirstRow: rowId === 0,
        isLastRow: rowId === rows.length - 1,
        width: sizes[rowId][key].width,
        height: sizes[rowId][key].height,
        gap: gap,
        resizeStep: resizeStep,
        minWidth: minWidthRatio * container.current.clientWidth,
        maxWidth: maxWidthRatio * container.current.clientWidth,
        minHeight: minHeightRatio * container.current.clientHeight,
        maxHeight: maxHeightRatio * (container.current.clientHeight - 40),
        updateLayout: updateSizesOnChildWidthChange,
        reRender: fillRows
      }, child.props.children);
    }));
  }));
};

exports.ResizableContainer = ResizableContainer;