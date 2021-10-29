"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var match = function match(occupancy) {
  return !(occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi) == null) || !(occupancy.match(/^[0-9]{1,2}(-[0-9]{1,2}?(,[0-9]{1,2})*)?$/ig) == null);
};

var parse = function parse(occupancy) {
  if (occupancy.match(/^[0-9]{1,2}(-[0-9]{1,2}?(,[0-9]{1,2})*)?$/ig)) {
    var _occupancy$split = occupancy.split('-'),
        _occupancy$split2 = _slicedToArray(_occupancy$split, 2),
        adults = _occupancy$split2[0],
        ages = _occupancy$split2[1];

    var children = 0;
    var childrenAges = [];

    if (ages) {
      childrenAges = ages.split(',').map(function (x) {
        return Number(x);
      });
      children = childrenAges.length;
    }

    return {
      adults: Number(adults),
      children: Number(children),
      infants: 0,
      childrenAges: childrenAges
    };
  } else {
    var _occupancy$split3 = occupancy.split('-'),
        _occupancy$split4 = _slicedToArray(_occupancy$split3, 3),
        _adults = _occupancy$split4[0],
        _children = _occupancy$split4[1],
        infants = _occupancy$split4[2];

    return {
      adults: Number(_adults),
      children: Number(_children),
      infants: Number(infants),
      childrenAges: []
    };
  }
};

var toString = function toString(occupancy) {
  if (occupancy.childrenAges && occupancy.childrenAges.length) {
    return "".concat(occupancy.adults, "-").concat(occupancy.childrenAges.join(','));
  } else {
    return "".concat(occupancy.adults, "-").concat(occupancy.children, "-").concat(occupancy.infants);
  }
};

var get = function get(occupancy) {
  var occupancies = [];

  if (typeof occupancy === 'string') {
    if (occupancy.split(',').every(function (occupancy) {
      return !!occupancy.match(/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}?$/gi);
    })) {
      occupancies = occupancy.split(',').map(parse);
    } else {
      occupancies = [occupancy].map(parse);
    }
  } else {
    occupancies = occupancy.map(parse);
  }

  return occupancies;
};

module.exports = {
  parse: parse,
  get: get,
  match: match,
  toString: toString
};