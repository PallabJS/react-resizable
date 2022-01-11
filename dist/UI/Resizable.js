"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resizable = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _styles = require("@mui/styles");

var _colors = require("@mui/material/colors");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var handleMargin = 5;
var noImg = document.createElement("div");
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      position: "relative",
      margin: function margin(props) {
        return props.gap;
      },
      padding: 20,
      borderRadius: 4,
      border: "".concat(handleMargin / 4, "px solid #c5cae9"),
      boxShadow: "1px 2px 5px -2px grey",
      transition: "all 0.2s ease-out",
      opacity: 0.8,
      "& .resize-handle": {
        position: "absolute",
        transition: "all 0.3s ease-in-out",
        borderRadius: "1000000px",
        backgroundColor: _colors.red[400],
        "&:hover": {
          opacity: 0.5
        }
      },
      "& .hide": {
        opacity: 0.05
      }
    },
    topHandle: {
      width: "100%",
      height: handleMargin,
      top: 2,
      left: 0,
      "&:hover": {
        cursor: "row-resize"
      }
    },
    bottomHandle: {
      left: 0,
      width: "100%",
      height: handleMargin,
      bottom: 0,
      "&:hover": {
        cursor: "row-resize"
      }
    },
    leftHandle: {
      height: "100%",
      left: 0,
      width: handleMargin,
      top: 0,
      bottom: handleMargin,
      "&:hover": {
        cursor: "col-resize"
      }
    },
    rightHandle: {
      height: "100%",
      right: 0,
      width: handleMargin,
      top: 0,
      bottom: handleMargin,
      "&:hover": {
        cursor: "col-resize"
      }
    },
    content: {
      height: "100%",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: 8,
        backgroundColor: _colors.grey[100],
        cursor: "pointer !important"
      },
      "&::-webkit-scrollbar-button": {
        backgroundColor: _colors.grey[600],
        borderRadius: 2
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: _colors.blue[100]
      }
    }
  };
});

var Resizable = function Resizable(_ref) {
  var children = _ref.children,
      row = _ref.row,
      rowId = _ref.rowId,
      childId = _ref.childId,
      updateLayout = _ref.updateLayout,
      first = _ref.first,
      last = _ref.last,
      isFirstRow = _ref.isFirstRow,
      isLastRow = _ref.isLastRow,
      width = _ref.width,
      height = _ref.height,
      gap = _ref.gap,
      resizeStep = _ref.resizeStep,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth,
      minHeight = _ref.minHeight,
      maxHeight = _ref.maxHeight,
      reRender = _ref.reRender;
  var classes = useStyles({
    gap: gap
  });
  var root = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)({
    leftHandle: false,
    rightHandle: false,
    topHandle: false,
    bottomHandle: false
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      visibles = _useState2[0],
      setVisibles = _useState2[1];

  var setupDragStartEvent = function setupDragStartEvent(e) {
    e.dataTransfer.setDragImage(noImg, 10, 10);
  };

  var resizeHandler = function resizeHandler(e) {
    if (e.clientX <= 0) return;
    var parent = e.target.parentElement;
    var updatedParameter = null;
    var name = e.target.getAttribute("name");
    var newState = {
      width: width,
      height: height
    };

    if (name === "rightHandle") {
      newState.width = parent.clientWidth + e.clientX - (parent.clientWidth + parent.offsetLeft);
      newState.width = newState.width + newState.width * 0.065;
      updatedParameter = "width"; // if (newState.width < minWidth || newState.width > maxWidth) return;
    }

    if (name === "leftHandle") {
      newState.width = parent.clientWidth - (e.clientX - +parent.offsetLeft);
      updatedParameter = "width"; // if (newState.width < minWidth || newState.width > maxWidth) return;
    }

    if (name === "bottomHandle") {
      newState.height = e.clientY - parent.offsetTop;
      updatedParameter = "height"; // if (newState.height < minHeight || newState.height > maxHeight) return;
    }

    if (name === "topHandle") {
      newState.height = parent.clientHeight - (e.clientY - parent.offsetTop);
      updatedParameter = "height"; // if (newState.height < minHeight || newState.height > maxHeight) return;
    } // // Prevent Static fluctuation


    if (width !== newState.width && Math.abs(newState.width - width) < resizeStep) return;
    if (height !== newState.height && Math.abs(newState.height - height) < resizeStep) return;
    updateLayout(rowId, childId, updatedParameter, newState, minWidth, maxWidth, minHeight, maxHeight);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root,
    ref: root,
    style: {
      width: width,
      height: height
    }
  }, !isFirstRow && /*#__PURE__*/_react.default.createElement("div", {
    name: "topHandle",
    className: "resize-handle " + classes.topHandle + (visibles.topHandle ? "" : " hide"),
    draggable: true,
    onDragStart: setupDragStartEvent,
    onDrag: resizeHandler,
    onMouseDown: function onMouseDown() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        topHandle: true
      }));
    },
    onMouseUp: function onMouseUp() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        topHandle: false
      }));
    },
    onDragEnd: function onDragEnd() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        topHandle: false
      }));
    }
  }), !isLastRow && /*#__PURE__*/_react.default.createElement("div", {
    name: "bottomHandle",
    className: "resize-handle " + classes.bottomHandle + (visibles.bottomHandle ? "" : " hide"),
    onDragStart: setupDragStartEvent,
    draggable: true,
    onDrag: resizeHandler,
    onMouseDown: function onMouseDown() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        bottomHandle: true
      }));
    },
    onMouseUp: function onMouseUp() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        bottomHandle: false
      }));
    },
    onDragEnd: function onDragEnd() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        bottomHandle: false
      }));
    }
  }), !first && /*#__PURE__*/_react.default.createElement("div", {
    name: "leftHandle",
    className: "resize-handle " + classes.leftHandle + (visibles.leftHandle ? "" : " hide"),
    draggable: true,
    onDragStart: setupDragStartEvent,
    onDrag: resizeHandler,
    onMouseDown: function onMouseDown() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        leftHandle: true
      }));
    },
    onMouseUp: function onMouseUp() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        leftHandle: false
      }));
    },
    onDragEnd: function onDragEnd() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        leftHandle: false
      }));
    }
  }), !last && /*#__PURE__*/_react.default.createElement("div", {
    name: "rightHandle",
    className: "resize-handle " + classes.rightHandle + (visibles.rightHandle ? "" : " hide"),
    draggable: true,
    onDragStart: setupDragStartEvent,
    onDrag: resizeHandler,
    onMouseDown: function onMouseDown() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        rightHandle: true
      }));
    },
    onMouseUp: function onMouseUp() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        rightHandle: false
      }));
    },
    onDragEnd: function onDragEnd() {
      setVisibles(_objectSpread(_objectSpread({}, visibles), {}, {
        rightHandle: false
      }));
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.content
  }, children));
};

exports.Resizable = Resizable;