"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"data",{enumerable:!0,get:function get(){return _Data["default"]}}),exports["default"]=void 0;var _fs=_interopRequireDefault(require("fs")),_jsonnet=_interopRequireDefault(require("@unboundedsystems/jsonnet")),_glob=_interopRequireDefault(require("glob")),_is=_interopRequireDefault(require("../util/is")),_Data=_interopRequireDefault(require("./Data"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var RE_JS=/([a-zA-Z0-9\s_\\.\-\(\):])+(.js)$/im,RE_JSONNET=/([a-zA-Z0-9\s_\\.\-\(\):])+(.jsonnet)$/im,Theme=/*#__PURE__*/function(){function a(){return _classCallCheck(this,a),this}return _createClass(a,[{key:"set",value:function set(a,b){// Parses the theme
var c;if("path"===_is["default"].what(a)||"file"===_is["default"].what(a)||"dir"===_is["default"].what(a)){b.theme||(b.theme=a);var f=getThemePath(b);if(RE_JS.test(f)&&(c=require(file)),RE_JSONNET.test(f)){var d=_fs["default"].readFileSync(f).toString(),e=new _jsonnet["default"].Jsonnet;c=e.eval(d),e.destroy()}}else c="object"===_is["default"].what(a)?a:{};// If theme already set then merge with new settings
theme.result&&(c=Object.assign(theme.result,c)),Object.assign(this,c),_Data["default"].clone(theme)}}]),a}();function getThemePath(a){var b,c="";return"dir"===_is["default"].what(a.theme)&&(b=_glob["default"].sync(a.root+a.theme+"**/*")),"file"===_is["default"].what(a.theme)&&(b=_glob["default"].sync(a.root+a.theme)),b.map(function(a){(RE_JS.test(a)||RE_JSONNET.test(a))&&(c=a)}),c}var theme=new Theme,_default=theme;exports["default"]=_default;