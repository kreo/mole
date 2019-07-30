"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _getOutputs = _interopRequireDefault(require("./get-outputs.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var outputs = (0, _getOutputs["default"])();

function getContentFromDirs(path, output) {
  var files = _glob["default"].sync(path + output.name + '/*');

  var strings = [];

  for (var i = 0; i < files.length; i++) {
    // console.log(fs.readFileSync(files[i], 'utf8'))
    strings.push(_fsExtra["default"].readFileSync(files[i], 'utf8'));
  } // TODO: needs to parse the string using template renderer with associated model


  return strings.join('\n');
} // New function


function parseTemplates(template, output) {
  if (Array.isArray(template)) {
    for (var i in template) {
      template = template[i];
      var DIRREG = /.+\/.?/im;
      var isFunction = typeof template === 'function';
      var isObject = _typeof(template) === 'object';
      var isDir = DIRREG.test(template);
      var isNamedTemplate = '';
      var isNamedOutput = output && output.name;

      if (isFunction) {
        console.log('template is function');
        return 'should be function';
      } else if (isObject) {
        console.log('template is object');
        return 'should be object';
      } else if (isDir && isNamedOutput) {
        console.log('template is directory');
        return {
          content: getContentFromDirs(template, output),
          file: output.file
        };
      } else if (isNamedTemplate) {
        console.log('template is named template');
        return 'should be named template';
      } else {
        return template;
      }
    }
  } else {
    return parseTemplates([template], output);
  }
}

function generateContents(outputs) {
  var files = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = outputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var output = _step.value;
      files.push(parseTemplates(output.template, output));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  console.log(files);
}

var _default = generateContents(outputs);

exports["default"] = _default;