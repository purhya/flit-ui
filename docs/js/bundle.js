/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../ff/out/base/array.js":
/*!*******************************!*\
  !*** ../ff/out/base/array.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.maxIndex = exports.minIndex = exports.max = exports.min = exports.avg = exports.sum = exports.count = exports.aggregate = exports.groupBy = exports.indexBy = exports.orderBy = exports.Order = exports.binaryFindIndexToInsert = exports.binaryFindIndex = exports.binaryFind = exports.difference = exports.intersect = exports.union = exports.unique = exports.removeWhere = exports.removeFirst = exports.remove = exports.add = exports.repeatForTimes = void 0;
/**
 * Returns the array filled with `value` and repeated for `count` times.
 * It's just like `string.repeat(count).`
 * @param item The value to repeat.
 * @param count Count of times to repeat.
 */
function repeatForTimes(item, count) {
    let items = [];
    for (let i = 0; i < count; i++) {
        items.push(item);
    }
    return items;
}
exports.repeatForTimes = repeatForTimes;
/**
 * Add `items` to an `array`, but duplicate items will not be added.
 * This method uses `includes` to test if an item in array, so it doesn't fit for adding many items to a big array.
 * @param array The array to add items.
 * @param items The items to add to array.
 */
function add(array, ...items) {
    for (let item of items) {
        if (!array.includes(item)) {
            array.push(item);
        }
    }
    return array;
}
exports.add = add;
/**
 * Remove all the `items` from `array`, and returns the removed items.
 * Note that this method uses `splice` to remove items, and only removes each item for once.
 * So using `array.filter` to filter out multiple items would be better.
 * @param array The array to remove items.
 * @param items The items removed from array.
 */
function remove(array, ...items) {
    let removed = [];
    for (let item of items) {
        let index = array.indexOf(item);
        if (index > -1) {
            removed.push(...array.splice(index, 1));
        }
    }
    return removed;
}
exports.remove = remove;
/**
 * Removes the first item which match `fn` from `array`. Returns the removed items.
 * @param array The array to remove items.
 * @param fn The test function to determinae whether to remove item.
 */
function removeFirst(array, fn) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (fn(array[i], i)) {
            return array.splice(i, 1)[0];
        }
    }
    return undefined;
}
exports.removeFirst = removeFirst;
/**
 * Remove all the items in `array` that match test function `fn`.
 * Returns the removed items.
 * Note that this method uses `splice` to remove items, so using `array.filter` to filter out multiple items would be better.
 * @param array The array to remove items.
 * @param fn The test function to determinae whether to remove item.
 */
function removeWhere(array, fn) {
    let removed = [];
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], i)) {
            removed.push(array.splice(i--, 1)[0]);
        }
    }
    return removed;
}
exports.removeWhere = removeWhere;
/**
 * Returns a new array from picking unique items from `array` and removing duplicate items.
 * @param array The array to remove duplicate items.
 */
function unique(array) {
    let set = new Set(array);
    return [...set];
}
exports.unique = unique;
/**
 * Creates an array composed of all the unique values from given `arrays`.
 * @param arrays The arrays to get union from.
 */
function union(...arrays) {
    let set = new Set();
    for (let array of arrays) {
        for (let item of array) {
            set.add(item);
        }
    }
    return [...set];
}
exports.union = union;
/**
 * Creates an array from picking intersect values that are included in all given `arrays`.
 * @param arrays The arrays to get intersection from.
 */
function intersect(...arrays) {
    let interset = [];
    if (!arrays.length) {
        return interset;
    }
    let map = new Map();
    for (let item of arrays[0]) {
        map.set(item, 1);
    }
    for (let array of arrays.slice(1)) {
        for (let item of array) {
            if (map.has(item)) {
                map.set(item, map.get(item) + 1);
            }
        }
    }
    for (let [item, count] of map.entries()) {
        if (count === arrays.length) {
            interset.push(item);
        }
    }
    return interset;
}
exports.intersect = intersect;
/**
 * Creates a new array from picking items from `array` and excluding items in `excludeArrays`.
 * @param array The array to pick items.
 * @param excludeArrays The arrays to exclude items from.
 */
function difference(array, ...excludeArrays) {
    let set = new Set(array);
    for (let difArray of excludeArrays) {
        for (let item of difArray) {
            set.delete(item);
        }
    }
    return [...set];
}
exports.difference = difference;
/**
 * Using binary algorithm to find one item from a sorted array that matches test function `fn`.
 * @param array The sorted array to find items from.
 * @param fn The function to accept 2 items in array as parameters and returns negative value to move left, positive value to move right.
 */
function binaryFind(array, fn) {
    let index = binaryFindIndex(array, fn);
    return index === -1 ? undefined : array[index];
}
exports.binaryFind = binaryFind;
/**
 * Using binary algorithm to find index from a sorted array at where the item match `fn`.
 * @param array The sorted array.
 * @param fn The function to accept item in array as parameter and returns negative value to move left, positive value to move right.
 */
function binaryFindIndex(array, fn) {
    if (array.length === 0) {
        return -1;
    }
    let result = fn(array[0]);
    if (result === 0) {
        return 0;
    }
    if (result < 0) {
        return -1;
    }
    if (array.length === 1) {
        return -1;
    }
    result = fn(array[array.length - 1]);
    if (result === 0) {
        return array.length - 1;
    }
    if (result > 0) {
        return -1;
    }
    let start = 0;
    let end = array.length - 1;
    while (end - start > 1) {
        let center = Math.floor((end + start) / 2);
        let result = fn(array[center]);
        if (result === 0) {
            return center;
        }
        else if (result < 0) {
            end = center;
        }
        else {
            start = center;
        }
    }
    return -1;
}
exports.binaryFindIndex = binaryFindIndex;
/**
 * Using binary algorithm to find the closest index from a sorted array at where to insert new item and keep order.
 * Returned index betweens `0 ~ array.length`, and if `array[index]` exist, `fn(array[index]) >= 0`.
 * @param array The sorted array.
 * @param fn The function to accept item in array as parameter and returns nagative value to move left, positive value to move right.
 */
function binaryFindIndexToInsert(array, fn) {
    if (array.length === 0) {
        return 0;
    }
    let result = fn(array[0]);
    if (result === 0 || result < 0) {
        return 0;
    }
    if (array.length === 1) {
        return 1;
    }
    result = fn(array[array.length - 1]);
    if (result === 0) {
        return array.length - 1;
    }
    if (result > 0) {
        return array.length;
    }
    let start = 0;
    let end = array.length - 1;
    while (end - start > 1) {
        let center = Math.floor((end + start) / 2);
        let result = fn(array[center]);
        if (result === 0) {
            return center;
        }
        else if (result < 0) {
            end = center;
        }
        else {
            start = center;
        }
    }
    return end;
}
exports.binaryFindIndexToInsert = binaryFindIndexToInsert;
/** Class to do multiple columns object array ordering. */
class Order {
    /**
     * Create an order rule, used in `orderBy`, and can also be used to binary search from or binary insert into array with object type items
     * @param orders Rest parameters of type `key` or `OrderFunction` which will return a `key`, or [`key` / `OrderFunction`, `OrderDirection`].
     */
    constructor(...orders) {
        /** Order tuple for ordering one by one. */
        this.orders = [];
        for (let order of orders) {
            if (['string', 'number', 'function'].includes(typeof order)) {
                this.orders.push([order, 1]);
            }
            else if (Array.isArray(order) && ['string', 'number', 'function'].includes(typeof order[0])) {
                this.orders.push([order[0], order[1] === 'asc' ? 1 : order[1] === 'desc' ? -1 : order[1]]);
            }
            else {
                throw new TypeError(JSON.stringify(orders) + ' doesn\'t specify any valid key or order.');
            }
        }
    }
    /**
     * Sort `array` inside by current order.
     * @param array The array to sort.
     */
    sortArray(array, direction = 1) {
        let normalizedDirection = direction === 'asc' ? 1 : direction === 'desc' ? -1 : direction;
        array.sort((a, b) => {
            return this.compare(a, b) * normalizedDirection;
        });
    }
    /**
     * Compare two items.
     * When `order` is `1` or `asc`: returns `0` if they are same; returns `-1` if the first one less that the second one; else returns `1`.
     * When `order` is `-1` or `desc`: returns `0` if they are same; returns `1` if the first one less that the second one; else returns `-1`.
     * @param a First item.
     * @param b Second item.
     */
    compare(a, b) {
        for (let [keyOrFn, order] of this.orders) {
            let ai;
            let bi;
            if (typeof keyOrFn === 'function') {
                ai = keyOrFn(a);
                bi = keyOrFn(b);
            }
            else {
                ai = a[keyOrFn];
                bi = b[keyOrFn];
            }
            if (ai < bi) {
                return -order;
            }
            if (ai > bi) {
                return order;
            }
            if (ai !== bi) {
                return ai === null || ai === undefined ? -order : order;
            }
        }
        return 0;
    }
    /**
     * Binary find the index from `array` the value at where equals to `item`.
     * Returns `-1` if not found.
     * @param array The array to lookup.
     * @param item The item to search.
     */
    binaryFind(array, item) {
        return binaryFind(array, i => this.compare(item, i));
    }
    /**
     * Binary find an index from `array` to insert `item` and keep current order.
     * Returned value betweens `0 ~ array.length`.
     * @param array The array to lookup.
     * @param item The item to compare.
     */
    binaryFindIndex(array, item) {
        return binaryFindIndex(array, i => this.compare(item, i));
    }
    /**
     * Binary insert an `item` into `array` and keeps current order.
     * Note it uses `splice` to insert item, it's very slower since it reallocates memory frequently.
     * @param array The array to lookup.
     * @param item The item to insert.
     */
    binaryInsert(array, item) {
        let index = binaryFindIndexToInsert(array, i => this.compare(item, i));
        array.splice(index, 0, item);
        return array;
    }
}
exports.Order = Order;
function orderBy(array, order, ...orders) {
    order = order instanceof Order ? order : new Order(order, ...orders);
    order.sortArray(array);
    return array;
}
exports.orderBy = orderBy;
// Compare with `new Map(...)`, object has same performance, and is more convinent to use, but will lose number key type.
function indexBy(array, keyOrFn) {
    let map = new Map();
    if (typeof keyOrFn === 'function') {
        for (let item of array) {
            let [key, value] = keyOrFn(item);
            map.set(key, value);
        }
    }
    else {
        for (let item of array) {
            let key = item[keyOrFn];
            map.set(key, item);
        }
    }
    return map;
}
exports.indexBy = indexBy;
function groupBy(array, keyOrFn) {
    let map = new Map();
    for (let item of array) {
        let key;
        let value = item;
        if (typeof keyOrFn === 'function') {
            [key, value] = keyOrFn(item);
        }
        else {
            key = item[keyOrFn];
        }
        let group = map.get(key);
        if (!group) {
            group = [];
            map.set(key, group);
        }
        group.push(value);
    }
    return map;
}
exports.groupBy = groupBy;
function aggregate(array, keyOrFn, aggregateFn) {
    let groupMap;
    let aggregateMap = new Map();
    if (typeof keyOrFn === 'function') {
        groupMap = groupBy(array, item => [keyOrFn(item), item]);
    }
    else {
        groupMap = groupBy(array, keyOrFn);
    }
    for (let [key, values] of groupMap.entries()) {
        aggregateMap.set(key, aggregateFn(values, key));
    }
    return aggregateMap;
}
exports.aggregate = aggregate;
/**
 * Returns the length of the array. Just a util function for `ff.aggregate`.
 * @param array The array to count length.
 */
function count(array) {
    return array.length;
}
exports.count = count;
/**
 * Returns the sum of all the numberic values in `array`.
 * @param array The array of numberic values.
 */
function sum(array) {
    return array.reduce((v1, v2) => v1 + v2, 0);
}
exports.sum = sum;
/**
 * Returns the average value of the numberic values in `array`.
 * Returns `0` if no items in `array`.
 * @param array The array of numberic values.
 */
function avg(array) {
    if (array.length === 0) {
        return 0;
    }
    return sum(array) / array.length;
}
exports.avg = avg;
/**
 * Returns the minimal value of the numberic values in `array`.
 * Returns `Infinity` if no items in `array`.
 * @param array The array of numberic values.
 */
function min(array) {
    return Math.min(...array);
}
exports.min = min;
/**
 * Returns the maximun value of numberic values in `array`.
 * Returns `-Infinity` if no items in `array`.
 * @param array The array of numberic values.
 */
function max(array) {
    return Math.max(...array);
}
exports.max = max;
/**
 * Returns the index of the minimal value of the array items.
 * Returns `-1` if no items or all values are `Infinity`.
 * @param array The array of data items.
 * @param map The map function to map each item to a number.
 */
function minIndex(array, map) {
    let values;
    if (map) {
        values = array.map(map);
    }
    else {
        values = array;
    }
    let minIndex = -1;
    let minValue = Infinity;
    for (let i = 0; i < values.length; i++) {
        if (values[i] < minValue) {
            minIndex = i;
            minValue = values[i];
        }
    }
    return minIndex;
}
exports.minIndex = minIndex;
/**
 * Returns the index of the maximun value of the array items.R
 * Returns `-1` if no items or all values are `-Infinity`.
 * @param array The array of data items.
 * @param map The map function to map each item to a number.
 */
function maxIndex(array, map) {
    let values;
    if (map) {
        values = array.map(map);
    }
    else {
        values = array;
    }
    let maxIndex = -1;
    let maxValue = -Infinity;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > maxValue) {
            maxIndex = i;
            maxValue = values[i];
        }
    }
    return maxIndex;
}
exports.maxIndex = maxIndex;


/***/ }),

/***/ "../ff/out/base/date.js":
/*!******************************!*\
  !*** ../ff/out/base/date.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatToShortDate = exports.formatDate = exports.addDurationToDate = exports.cloneDate = exports.getDaysOfMonth = exports.getDaysOfYear = exports.isLeapYear = exports.isValidDate = exports.setDateByUnit = exports.getDateByUnit = void 0;
const duration_1 = __webpack_require__(/*! ./duration */ "../ff/out/base/duration.js");
/** All data units from year to seconds. */
const DateUnits = 'yMdhms';
/**
 * Get one of the date values from `date` according to specified `unit`.
 * @param date The date object to get value from.
 * @param unit The unit type, must be one of `'y', 'M', 'd', 'h', 'm', 's'`.
 */
function getDateByUnit(date, unit) {
    switch (unit) {
        case 'y':
            return date.getFullYear();
        case 'M':
            return date.getMonth();
        case 'd':
            return date.getDate();
        case 'h':
            return date.getHours();
        case 'm':
            return date.getMinutes();
        case 's':
            return date.getSeconds();
        default:
            throw new Error(`"${unit}" is not a valid date unit`);
    }
}
exports.getDateByUnit = getDateByUnit;
/**
 * Set one of the date values for `date` according to specified `unit`.
 * @param date The date object to set value.
 * @param value The date value to set.
 * @param unit The unit type, must be one of `'y', 'M', 'd', 'h', 'm', 's'`.
 */
function setDateByUnit(date, value, unit) {
    switch (unit) {
        case 'y':
            return date.setFullYear(value);
        case 'M':
            return date.setMonth(value);
        case 'd':
            return date.setDate(value);
        case 'h':
            return date.setHours(value);
        case 'm':
            return date.setMinutes(value);
        case 's':
            return date.setSeconds(value);
        default:
            throw new Error(`"${unit}" is not a valid date unit`);
    }
}
exports.setDateByUnit = setDateByUnit;
/**
 * Returns whether date values from year to second are associated with a real date.
 * @param y Year count.
 * @param M Month count.
 * @param d Date count.
 * @param h Hour count.
 * @param m Minute count.
 * @param s Second count.
 */
function isValidDate(y, M, d = 1, h = 0, m = 0, s = 0) {
    let date = new Date(y, M, d, h, m, s);
    return y === date.getFullYear() &&
        M === date.getMonth() &&
        d === date.getDate() &&
        h === date.getHours() &&
        m === date.getMinutes() &&
        s === date.getSeconds();
}
exports.isValidDate = isValidDate;
/**
 * Returns whether the year of `date` is a leap year, which contains 366 days.
 * @param date The date to test.
 */
function isLeapYear(date) {
    let year = date.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
exports.isLeapYear = isLeapYear;
/**
 * Returns the days in the year from `date`, which is `366` for leap year, and is `365` otherwise.
 * @param date The date to get days from.
 */
function getDaysOfYear(date) {
    return isLeapYear(date) ? 366 : 365;
}
exports.getDaysOfYear = getDaysOfYear;
/**
 * Returns the days in the month from a `date`, which betweens `28-31`.
 * @param date The date to get days from.
 */
function getDaysOfMonth(date) {
    let d = new Date(date.getTime());
    d.setDate(32);
    return 32 - d.getDate();
}
exports.getDaysOfMonth = getDaysOfMonth;
/**
 * Clones a date object.
 * Can specify `units` to partly clone, `units` not includeded parts will be set to minimal value.
 * @param date The date to clone, default value is current date.
 * @param units The units to partly clone, default value is `yMdhms`.
 */
function cloneDate(date = new Date(), units = DateUnits) {
    let dateValues = [...DateUnits].map(unit => {
        if (units.includes(unit)) {
            return getDateByUnit(date, unit);
        }
        else {
            return unit === 'd' ? 1 : 0;
        }
    });
    return new Date(dateValues[0], dateValues[1], dateValues[2], dateValues[3], dateValues[4], dateValues[5]);
}
exports.cloneDate = cloneDate;
/**
 * Add `duration` string as a time offset to a `date` and returns a new date.
 * @param date The date to add duration.
 * @param duration The duration string to add to date. like `1d1h`.
 */
function addDurationToDate(date, duration) {
    let isMinus = duration[0] === '-';
    if (isMinus) {
        duration = duration.slice(1);
    }
    let flag = isMinus ? -1 : 1;
    let o = duration_1.parseDurationToObject(duration);
    let newDate = new Date(date);
    for (let unit of Object.keys(o)) {
        let value = getDateByUnit(newDate, unit) + o[unit] * flag;
        setDateByUnit(newDate, value, unit);
    }
    return newDate;
}
exports.addDurationToDate = addDurationToDate;
/**
 * Returns a formatted date string from `date` and `format` type.
 * @param date The date to format.
 * @param format The date format type, default value is `'yyyy-MM-dd hh:mm:ss'`.
 */
function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
    return format.replace(/y+|M+|d+|h+|m+|s+/g, m0 => {
        let unit = m0[0];
        let value = getDateByUnit(date, unit[0]);
        if (unit === 'M') {
            value += 1;
        }
        return String(value).padStart(m0.length, '0');
    });
}
exports.formatDate = formatDate;
/**
 * Returns a short date string relative to current time.
 * @param date The date to format.
 * @param format The format object to use, default value is `{y: 'yyyy-MM-dd', M: 'MM-dd', h: 'hh:mm'}`.
 */
function formatToShortDate(date, format = { y: 'yyyy-MM-dd', M: 'MM-dd', h: 'hh:mm' }) {
    let now = new Date();
    let hasDifferentUnit = false;
    let matchFormat = Object.values(format)[0];
    for (let unit of DateUnits) {
        hasDifferentUnit = hasDifferentUnit || getDateByUnit(date, unit) !== getDateByUnit(now, unit);
        matchFormat = format[unit] || matchFormat;
        if (hasDifferentUnit) {
            break;
        }
    }
    return formatDate(date, matchFormat);
}
exports.formatToShortDate = formatToShortDate;


/***/ }),

/***/ "../ff/out/base/duration.js":
/*!**********************************!*\
  !*** ../ff/out/base/duration.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSecondsToTime = exports.formatSecondsToDuration = exports.parseSecondsToDateObject = exports.parseDurationToSeconds = exports.parseDurationToObject = void 0;
const string_1 = __webpack_require__(/*! ./string */ "../ff/out/base/string.js");
/** All data units from year to seconds. */
const DateUnits = 'yMdhms';
/** Date units and their mapped seconds. */
const DATE_UNIT_SECONDS = {
    y: 365 * 24 * 60 * 60,
    M: 30 * 24 * 60 * 60,
    w: 7 * 24 * 60 * 60,
    d: 24 * 60 * 60,
    h: 60 * 60,
    m: 60,
    s: 1,
};
/**
 * Parse `duration` string like `1h1m` or `01:01:00` to date object `{y, M, d, h, m, s}`.
 * @param duration string like `1h1m` or `01:01:00`.
 */
function parseDurationToObject(duration) {
    let o = {
        y: 0,
        M: 0,
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    };
    if (duration.includes(':')) {
        let [h, m, s] = string_1.subMatches(duration, /(?:(\d\d):)?(\d\d):(\d\d(?:\.\d+)?)/)[0].map(v => Number(v) || 0);
        o.h = h;
        o.m = m;
        o.s = s;
    }
    else {
        let matches = string_1.subMatches(duration, /(\d+(?:\.\d+)?) ?([yMwdhms])/g);
        for (let [count, unit] of matches) {
            o[unit] = Number(count);
        }
    }
    return o;
}
exports.parseDurationToObject = parseDurationToObject;
/**
 * Parse duration string like `1h1m` or `01:01:00` to second count.
 * @param duration string like `1h1m` or `01:01:00`.
 */
function parseDurationToSeconds(duration) {
    let o = parseDurationToObject(duration);
    let seconds = 0;
    for (let unit of Object.keys(o)) {
        let count = o[unit];
        seconds += count * DATE_UNIT_SECONDS[unit];
    }
    return seconds;
}
exports.parseDurationToSeconds = parseDurationToSeconds;
/**
 * Parse second count to date object `{y, M, d, h, m, s}`.
 * @param seconds The second count.
 * @param units The unit to use when parsing, default value is `yMdhms`.
 */
function parseSecondsToDateObject(seconds, units = DateUnits) {
    let o = {
        y: 0,
        M: 0,
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    };
    for (let unit of units) {
        let unitValue = DATE_UNIT_SECONDS[unit];
        let count = Math.floor(seconds / unitValue);
        if (count > 0) {
            o[unit] = count;
            seconds = seconds % unitValue;
        }
    }
    return o;
}
exports.parseSecondsToDateObject = parseSecondsToDateObject;
/**
 * Format second count to duration string like `1h1m`.
 * @param units Date unit types like `yMdhms`. Can only specify partial date units like `Md`.
 * @param maxOutputUnitCount Maximun unit count of the duration string. E.g., sepcify to `2` to output like `1y1M`, `1M1d`, `1d1h`, `1s`.
 */
function formatSecondsToDuration(seconds, units = DateUnits, maxOutputUnitCount = units.length) {
    let o = parseSecondsToDateObject(seconds, units);
    let duration = '';
    let outputUnitCount = 0;
    for (let unit of Object.keys(o)) {
        let count = o[unit];
        if (count > 0) {
            duration += count + unit;
            outputUnitCount++;
        }
        if (outputUnitCount >= maxOutputUnitCount) {
            break;
        }
    }
    return duration;
}
exports.formatSecondsToDuration = formatSecondsToDuration;
/**
 * Format second count to time string like `01:01:01`.
 * @param seconds The second count.
 */
function formatSecondsToTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60) || 0;
    let s = Math.floor(seconds % 60) || 0;
    return (h ? String(h).padStart(2, '0') + ':' : '')
        + String(m).padStart(2, '0') + ':'
        + String(s).padStart(2, '0');
}
exports.formatSecondsToTime = formatSecondsToTime;


/***/ }),

/***/ "../ff/out/base/emitter.js":
/*!*********************************!*\
  !*** ../ff/out/base/emitter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// At beginning, I implemented a good Emitter by inferring listener parameters and emitting parameters.
// But then I meet a big problem when extending the class, described by:
// https://stackoverflow.com/questions/55813041/problems-on-typescript-event-interface-extends
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
/**
 * Event emitter as super class to listen and emit custom events.
 * It's name is Emitter to avoid conflicts with node API.
 * @typeparam E Event interface in `{eventName: (...args) => void}` format.
 */
class Emitter {
    constructor() {
        /** Registered events. */
        this.__events = new Map();
    }
    /** Ensure event cache items to cache item. */
    __ensureEvents(name) {
        let events = this.__events.get(name);
        if (!events) {
            this.__events.set(name, events = []);
        }
        return events;
    }
    /**
     * Registers an event `listener` to listen event with specified `name`.
     * @param name The event name.
     * @param listener The event listener.
     * @param scope The scope will be binded to listener.
     */
    on(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: false,
        });
    }
    /**
     * Registers an event `listener` to listen event with specified `name`, triggers for only once.
     * @param name The event name.
     * @param listener The event listener.
     * @param scope The scope will be binded to listener.
     */
    once(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: true
        });
    }
    /**
     * Removes the `listener` that is listening specified event `name`.
     * @param name The event name.
     * @param listener The event listener, only matched listener will be removed.
     * @param scope The scope binded to listener. If provided, remove listener only when scope match.
     */
    off(name, listener, scope) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = events.length - 1; i >= 0; i--) {
                let event = events[i];
                if (event.listener === listener && (!scope || event.scope === scope)) {
                    events.splice(i, 1);
                }
            }
        }
    }
    /**
     * Check whether `listener` is in the list for listening specified event `name`.
     * @param name The event name.
     * @param listener The event listener to check.
     * @param scope The scope binded to listener. If provided, will additionally check whether the scope match.
     */
    hasListener(name, listener, scope) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = 0, len = events.length; i < len; i++) {
                let event = events[i];
                if (event.listener === listener && (!scope || event.scope === scope)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Check whether any `listener` is listening specified event `name`.
     * @param name The event name.
     */
    hasListeners(name) {
        let events = this.__events.get(name);
        return !!events && events.length > 0;
    }
    /**
     * Emit specified event with event `name` and parameters.
     * @param name The event name.
     * @param args The parameters that will be passed to event listeners.
     */
    emit(name, ...args) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                // The listener may call off, so must remove it before handling
                if (event.once === true) {
                    events.splice(i--, 1);
                }
                event.listener.apply(event.scope, args);
            }
        }
    }
    /** Removes all the event listeners. */
    removeAllListeners() {
        this.__events = new Map();
    }
}
exports.Emitter = Emitter;


/***/ }),

/***/ "../ff/out/base/es-polyfill.js":
/*!*************************************!*\
  !*** ../ff/out/base/es-polyfill.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* Polyfill for parts of ECMAScript 2017+, which is not widely supported by modern browsers. */
if (!String.prototype.padStart) {
    Object.defineProperty(String.prototype, 'padStart', {
        value: function (length, fillString) {
            let len = this.length;
            let lenPad = fillString.length;
            if (length < len || !lenPad) {
                return String(this);
            }
            else {
                let repeatCount = Math.floor((length - len) / lenPad);
                let additionStr = fillString.slice(0, length - len - repeatCount * lenPad);
                return fillString.repeat(repeatCount) + additionStr + this;
            }
        }
    });
}
if (!String.prototype.padEnd) {
    Object.defineProperty(String.prototype, 'padEnd', {
        value: function (length, fillString) {
            let len = this.length;
            let lenPad = fillString.length;
            if (length < len || !lenPad) {
                return String(this);
            }
            else {
                let repeatCount = Math.floor((length - len) / lenPad);
                let additionStr = fillString.slice(0, length - len - repeatCount * lenPad);
                return this + fillString.repeat(repeatCount) + additionStr;
            }
        }
    });
}
// Still a proposal, but I love it.
if (!RegExp.escape) {
    Object.defineProperty(RegExp, 'escape', {
        value: function (source) {
            return source.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        }
    });
}


/***/ }),

/***/ "../ff/out/base/function.js":
/*!**********************************!*\
  !*** ../ff/out/base/function.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.Debounce = exports.smoothThrottle = exports.SmoothThrottle = exports.throttle = exports.Throttle = exports.interval = exports.Interval = exports.timeout = exports.Timeout = void 0;
class TimingFunction {
    constructor(fn, ms) {
        this.id = null;
        /** Whether current timing function has been canceled. */
        this.canceled = false;
        this.fn = fn;
        this.ms = ms;
    }
}
class WrappedTimingFunction extends TimingFunction {
    constructor(fn, ms) {
        super(fn, ms);
        this.wrapped = this.wrap();
        // To track original handler so that we can unregister the wrapped function in event listener.
        this.wrapped.__original = fn;
    }
}
class Timeout extends TimingFunction {
    constructor(fn, ms) {
        super(fn, ms);
        this.reset();
    }
    /** Restart timeout, although it was called. */
    reset() {
        if (this.id) {
            clearTimeout(this.id);
        }
        this.id = setTimeout(this.onTimeout.bind(this), this.ms);
        return true;
    }
    onTimeout() {
        this.id = null;
        this.fn();
    }
    /**
     * Call deferred function immediately if it wasn't been called.
     * Returns `true` if not called yet.
     */
    flush() {
        if (!this.id) {
            return false;
        }
        clearTimeout(this.id);
        this.id = null;
        this.fn();
        return true;
    }
    /**
     * Cancel deferred function.
     * Returns `true` if it was not been canceled.
     */
    cancel() {
        if (!this.id) {
            return false;
        }
        clearTimeout(this.id);
        this.id = null;
        return true;
    }
}
exports.Timeout = Timeout;
/**
 * Just like `setTimeout`, call `fn` after `ms` millisecons.
 * @param fn The function to call later.
 * @param ms The timeout time in millisecons.
 * @returns A cancel function.
 */
function timeout(fn, ms = 0) {
    let t = new Timeout(fn, ms);
    return t.cancel.bind(t);
}
exports.timeout = timeout;
class Interval extends TimingFunction {
    constructor(fn, ms) {
        super(fn, ms);
        this.reset();
    }
    /** Restart interval, although it was canceled. */
    reset() {
        if (this.id) {
            clearInterval(this.id);
        }
        this.id = setInterval(this.onInterval.bind(this), this.ms);
        return true;
    }
    onInterval() {
        this.fn();
    }
    /** Call interval function immediately if it wasn't canceled. returns whether it was not benn canceled. */
    flush() {
        if (!this.id) {
            return false;
        }
        this.fn();
        this.reset();
        return true;
    }
    /**
     * Cancel interval function.
     * Returns `true` if it was not been canceled.
     */
    cancel() {
        if (!this.id) {
            return false;
        }
        clearInterval(this.id);
        this.id = null;
        return true;
    }
}
exports.Interval = Interval;
/**
 * Just like `setInterval`, call `fn` every `ms` millisecons.
 * @param fn The function to call.
 * @param ms The interval time in millisecons.
 * @returns A cancel function.
 */
function interval(fn, ms) {
    let i = new Interval(fn, ms);
    return i.cancel.bind(i);
}
exports.interval = interval;
class Throttle extends WrappedTimingFunction {
    wrap() {
        let me = this;
        return function (...args) {
            if (me.canceled) {
                me.fn.apply(this, args);
                return;
            }
            if (!me.id) {
                me.setThrottle();
                me.fn.apply(this, args);
            }
        };
    }
    setThrottle() {
        this.id = setTimeout(this.onTimeout.bind(this), this.ms);
    }
    onTimeout() {
        this.id = null;
    }
    /** Reset throttle timeout, Will restart throttle timeout when next time calling `fn` and calls `fn` immediately. */
    reset() {
        if (this.id) {
            this.clearThrottle();
        }
        this.canceled = false;
        return true;
    }
    clearThrottle() {
        clearTimeout(this.id);
        this.id = null;
    }
    /** Call `fn` immediately and reset throttle timeout. */
    flush() {
        this.reset();
        this.fn();
        return true;
    }
    /**
     * Cancel throttle, function will be called without limit.
     * Returns `true` if is not canceled before.
     */
    cancel() {
        if (this.canceled) {
            return false;
        }
        this.canceled = true;
        return true;
    }
}
exports.Throttle = Throttle;
/**
 * Throttle function calls, `fn` will not be called for twice in each `ms` millisecons
 * Note that it doesn't ensure the last calling.
 * @param fn The function to throttle.
 * @param ms The time period in which allows at most one calling.
 * @returns A wrapped function.
 */
function throttle(fn, ms = 0) {
    return new Throttle(fn, ms).wrapped;
}
exports.throttle = throttle;
class SmoothThrottle extends WrappedTimingFunction {
    constructor() {
        super(...arguments);
        this.lastArgs = null;
        this.lastThis = null;
    }
    wrap() {
        let me = this;
        return function (...args) {
            if (me.canceled) {
                me.fn.apply(this, args);
                return;
            }
            me.lastArgs = args;
            me.lastThis = this;
            if (!me.id) {
                me.setThrottle();
            }
        };
    }
    setThrottle() {
        this.id = setTimeout(this.onTimeout.bind(this), this.ms);
    }
    onTimeout() {
        if (this.lastArgs) {
            this.fn.apply(this.lastThis, this.lastArgs);
            this.lastArgs = null;
            this.lastThis = null;
            this.setThrottle();
        }
        else {
            this.id = null;
        }
    }
    /** Reset throttle timeout and discard deferred calling, will restart throttle if been canceled. */
    reset() {
        if (this.id) {
            this.clearThrottle();
        }
        this.lastArgs = null;
        this.lastThis = null;
        this.canceled = false;
        return true;
    }
    /** Call function immediately if there is a deferred calling, and restart throttle timeout. */
    flush() {
        if (this.lastArgs) {
            this.setThrottle();
            this.fn.apply(this.lastThis, this.lastArgs);
            this.lastArgs = null;
            this.lastThis = null;
            return true;
        }
        return false;
    }
    clearThrottle() {
        clearTimeout(this.id);
        this.id = null;
    }
    /**
     * Cancel throttle, function will be called without limit.
     * Returns `true` if is not canceled before.
     */
    cancel() {
        if (this.canceled) {
            return false;
        }
        this.canceled = true;
        return true;
    }
}
exports.SmoothThrottle = SmoothThrottle;
/**
 * Throttle function calls, `fn` will not be called for twice in each `ms` millisecons.
 * Different from `ff.throttle`, `fn` will be called lazily and smooth, and it ensures the last calling.
 * @param fn The function to throttle.
 * @param ms The time period which allows at most one calling.
 * @returns A wrapped function.
 */
function smoothThrottle(fn, ms) {
    return new SmoothThrottle(fn, ms).wrapped;
}
exports.smoothThrottle = smoothThrottle;
class Debounce extends WrappedTimingFunction {
    constructor() {
        super(...arguments);
        this.lastArgs = null;
        this.lastThis = null;
    }
    wrap() {
        let me = this;
        return function (...args) {
            if (me.canceled) {
                me.fn.apply(this, args);
                return;
            }
            if (me.id) {
                clearTimeout(me.id);
            }
            me.id = setTimeout(me.onTimeout.bind(me), me.ms);
            me.lastArgs = args;
            me.lastThis = this;
        };
    }
    onTimeout() {
        this.id = null;
        if (this.lastArgs) {
            this.fn.apply(this.lastThis, this.lastArgs);
            this.lastArgs = null;
            this.lastThis = null;
        }
    }
    /** Reset debounce timeout and discard deferred calling, will restart debounce if been canceled. */
    reset() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = null;
        }
        this.lastArgs = null;
        this.lastThis = null;
        return true;
    }
    /** Call function immediately if there is a deferred calling, and restart debounce timeout. */
    flush() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = 0;
        }
        if (this.lastArgs) {
            this.fn.apply(this.lastThis, this.lastArgs);
            this.lastArgs = null;
            this.lastThis = null;
            return true;
        }
        return false;
    }
    /**
     * Cancel debounce, function will be called without limit.
     * Returns `true` if is not canceled before.
     */
    cancel() {
        if (this.canceled) {
            return false;
        }
        this.canceled = true;
        return true;
    }
}
exports.Debounce = Debounce;
/**
 * Debounce function calls, calls returned function continuously in a short time will pause calling `fn`.
 * It can be used to only send search request after user stops inputting.
 * @param fn The function to debounce.
 * @param ms The timeout in milliseconds.
 */
function debounce(fn, ms) {
    return new Debounce(fn, ms).wrapped;
}
exports.debounce = debounce;


/***/ }),

/***/ "../ff/out/base/index.js":
/*!*******************************!*\
  !*** ../ff/out/base/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./es-polyfill */ "../ff/out/base/es-polyfill.js");
__exportStar(__webpack_require__(/*! ./object */ "../ff/out/base/object.js"), exports);
__exportStar(__webpack_require__(/*! ./array */ "../ff/out/base/array.js"), exports);
__exportStar(__webpack_require__(/*! ./string */ "../ff/out/base/string.js"), exports);
__exportStar(__webpack_require__(/*! ./number */ "../ff/out/base/number.js"), exports);
__exportStar(__webpack_require__(/*! ./function */ "../ff/out/base/function.js"), exports);
__exportStar(__webpack_require__(/*! ./duration */ "../ff/out/base/duration.js"), exports);
__exportStar(__webpack_require__(/*! ./date */ "../ff/out/base/date.js"), exports);
__exportStar(__webpack_require__(/*! ./time */ "../ff/out/base/time.js"), exports);
__exportStar(__webpack_require__(/*! ./emitter */ "../ff/out/base/emitter.js"), exports);
__exportStar(__webpack_require__(/*! ./queue */ "../ff/out/base/queue.js"), exports);


/***/ }),

/***/ "../ff/out/base/number.js":
/*!********************************!*\
  !*** ../ff/out/base/number.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.constrain = exports.mod = exports.toPrecision = exports.toPower = exports.toDecimal = void 0;
/**
 * Like `number.toFixed`, but alway return a number. e.g., `toPower(12.345, 2) = 12.34`.
 * @param number The number to fix.
 * @param decimalCount The decimal count that `number` will correct to, default value is `0`.
 */
function toDecimal(number, decimalCount = 0) {
    return toPower(number, -decimalCount);
}
exports.toDecimal = toDecimal;
/**
 * Like `number.toFixed`, but always returns a number. e.g., `toPower(1234, 2) = 1200`.
 * @param number The number to fix.
 * @param power The power that `number` will correct to, default value is `0`.
 */
function toPower(number, power = 0) {
    if (number < 0) {
        return -toPower(-number, power);
    }
    if (number === 0) {
        return 0;
    }
    if (power > 0) {
        let n = Math.pow(10, power);
        return Math.round(number / n) * n;
    }
    // This can avoid `0.1 + 0.2 !== 0.3`
    else {
        let n = Math.pow(10, -power);
        return Math.round(number * n) / n;
    }
}
exports.toPower = toPower;
/**
 * Nearly same with `number.toPrecision`, except it always return a number.
 * @param number The number to transfer to specified precision.
 * @param precision The precision value betweens `1-21`, default value is `1`.
 */
function toPrecision(number, precision = 1) {
    return Number(number.toPrecision(precision));
}
exports.toPrecision = toPrecision;
/**
 * Like `a % b`, but always returns positive number. e.g., `mod(-1, 2) = 1`.
 * @param number The number to calculate modulo.
 * @param modulo The modulo of number.
 */
function mod(number, modulo) {
    return (number % modulo + Math.abs(modulo)) % modulo;
}
exports.mod = mod;
/**
 * Returns a new number which is constrained in a minimal and maximum range.
 * @param number The number to constrain.
 * @param min The minimum number.
 * @param max The maximum number.
 */
function constrain(number, min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    if (number < min) {
        number = min;
    }
    else if (number > max) {
        number = max;
    }
    return number;
}
exports.constrain = constrain;


/***/ }),

/***/ "../ff/out/base/object.js":
/*!********************************!*\
  !*** ../ff/out/base/object.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = exports.deepClone = exports.assignIf = exports.assign = void 0;
/**
 * Assign object keys and values from `source` to `target`, will cover values of `target` with same keys.
 * will ignore `undefined` values and their keys in `source`.
 * @param target The target that the sources assigned to.
 * @param sources The sources that will assigned to target by order.
 * @param keys If specified, only values whose keys are included will be assigned.
 */
function assign(target, source, keys = Object.keys(source)) {
    for (let key of keys) {
        let value = source[key];
        if (value !== undefined) {
            target[key] = value;
        }
    }
    return target;
}
exports.assign = assign;
/**
 * Assign object keys and values from `source` to `target`, will not cover values of `target` with existing keys.
 * will ignore `undefined` values and their keys in `source`,  and `undefined` values in `target` will be treated as not exist.
 * @param target The target that the sources assigned to.
 * @param sources The sources that will assigned to target by order.
 * @param keys If specified, only values whose keys are included will be assigned.
 */
function assignIf(target, source, keys = Object.keys(source)) {
    for (let key of keys) {
        let value = source[key];
        if (value !== undefined && target[key] === undefined) {
            target[key] = value;
        }
    }
    return target;
}
exports.assignIf = assignIf;
/**
 * Deeply clone an object, array or any value.
 * 2x~3x faster than JSON stringify and parse methods
 * @param source The source to clone.
 * @param deep Max deep to clone, default value is 10.
 */
function deepClone(source, deep = 10) {
    if (typeof source !== 'object' || !source || deep === 0) {
        return source;
    }
    if (Array.isArray(source)) {
        return source.map(value => {
            if (typeof value !== 'object' || !value) {
                return value;
            }
            else {
                return deepClone(value, deep - 1);
            }
        });
    }
    else {
        let cloned = {};
        for (let key of Object.keys(source)) {
            let value = source[key];
            cloned[key] = deepClone(value, deep - 1);
        }
        return cloned;
    }
}
exports.deepClone = deepClone;
/**
 * Deeply compare two objects, arrays or any other values.
 * 1x faster than JSON stringify methods.
 * @param a Left value.
 * @param b Right value.
 * @param deep Max deep to compare, default value is 10.
 */
function deepEqual(a, b, deep = 10) {
    if (a === b) {
        return true;
    }
    if (deep === 0) {
        return false;
    }
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        return a.every((ai, index) => {
            return deepEqual(ai, b[index], deep - 1);
        });
    }
    else {
        let keysA = Object.keys(a);
        let keysB = Object.keys(b);
        if (keysA.length !== keysB.length) {
            return false;
        }
        for (let key of keysA) {
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            let valueA = a[key];
            let valueB = b[key];
            if (!deepEqual(valueA, valueB, deep - 1)) {
                return false;
            }
        }
        return true;
    }
}
exports.deepEqual = deepEqual;


/***/ }),

/***/ "../ff/out/base/queue.js":
/*!*******************************!*\
  !*** ../ff/out/base/queue.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.queueEvery = exports.queueSome = exports.queueMap = exports.queueEach = exports.Queue = exports.QueueState = void 0;
const object_1 = __webpack_require__(/*! ./object */ "../ff/out/base/object.js");
const emitter_1 = __webpack_require__(/*! ./emitter */ "../ff/out/base/emitter.js");
/** Running state of queue. */
var QueueState;
(function (QueueState) {
    /** Not started. */
    QueueState[QueueState["Pending"] = 0] = "Pending";
    /** Any task is running. */
    QueueState[QueueState["Running"] = 1] = "Running";
    /** Been paused. */
    QueueState[QueueState["Paused"] = 2] = "Paused";
    /** Queued tasks finshed, may still have failed tasks. */
    QueueState[QueueState["Finish"] = 3] = "Finish";
    /** Aborted because of error or by user. */
    QueueState[QueueState["Aborted"] = 4] = "Aborted";
})(QueueState = exports.QueueState || (exports.QueueState = {}));
/**
 * Class to queue tasks and transfer them to handler in specified concurrency.
 * @typeparam T: Type of task.
 * @typeparam V: Type of returned values from handler. This can be inferred from `handler` option normally.
 */
class Queue extends emitter_1.Emitter {
    constructor(options) {
        super();
        /** If provided, can avoid adding duplicate tasks with same keys. */
        this.key = null;
        /** Specifies how many tasks to run simultaneously, default value is `5`. */
        this.concurrency = 5;
        /** If true, will continue processing tasks after error occurred. */
        this.continueOnError = false;
        /**
         * Specifies how many times to retry before one task success.
         * If one task's retry times execeed, it will never retry automatically,
         * but you can still retry all failed tasks by calling `retry()` manually.
         * Setting this option to values `> 0` implies `continueOnError` is `true`.
         */
        this.maxRetryTimes = 0;
        /** The start task array which will be passed to `handler` in order. */
        this.tasks = [];
        /** Returns current working state. */
        this.state = QueueState.Pending;
        /** All keys found from tasks. */
        this.keysFound = null;
        /** To generate unique numeric id. */
        this.seed = 1;
        /** Count of processed tasks. */
        this.processedCount = 0;
        /** All running items. */
        this.runningItems = [];
        /** All failed items. */
        this.failedItems = [];
        /** Promise to be resolved after resume. */
        this.resumePromise = null;
        /** Resolve function for `resumePromise`. */
        this.resumeResolve = null;
        object_1.assign(this, options, Object.keys(options).filter(key => key !== 'tasks'));
        if (this.key) {
            this.keysFound = new Set();
        }
        if (options.tasks) {
            this.push(...options.tasks);
        }
    }
    /** Returns the tount of total tasks, included processed and unprocessed and failed. */
    getTotalCount() {
        return this.getProcessedCount() + this.getUnprocessedCount() + this.getFailedCount();
    }
    /** Returns the count of processed tasks. */
    getProcessedCount() {
        return this.processedCount;
    }
    /** Returns the count of unprocessed tasks, not include failed tasks. */
    getUnprocessedCount() {
        return this.tasks.length + this.getRunningCount();
    }
    /** Returns the count of running tasks. */
    getRunningCount() {
        return this.runningItems.length;
    }
    /** Returns the count of failed tasks. */
    getFailedCount() {
        return this.failedItems.length;
    }
    /** Returns the unprocessed tasks. */
    getUnprocessedTasks() {
        return [...this.getRunningTasks(), ...this.tasks];
    }
    /** Returns the running tasks. */
    getRunningTasks() {
        return this.runningItems.map(v => v.task);
    }
    /** Returns the failed tasks. */
    getFailedTasks() {
        return this.failedItems.map(v => v.task);
    }
    /**
     * Start processing tasks. Will emit `finish` event in next tick if no task to run.
     * Returns `true` if queue started.
     */
    start() {
        if (this.state === QueueState.Paused) {
            this.resume();
        }
        else if (this.tasks.length > 0) {
            this.state = QueueState.Running;
            this.tryHandleNextTask();
        }
        else {
            Promise.resolve().then(() => this.onFinish());
        }
        return this.state === QueueState.Running;
    }
    /** Returns a promise which will be resolved after all tasks finished. */
    untilFinish() {
        if (this.getUnprocessedCount() > 0) {
            return new Promise(resolve => {
                this.once('finish', () => resolve());
            });
        }
        else {
            return Promise.resolve();
        }
    }
    /** Returns a promise which will be resolved after all tasks finished, or be rejected if error happens. */
    untilEnd() {
        if (this.getUnprocessedCount() > 0) {
            return new Promise((resolve, reject) => {
                this.once('end', err => err ? reject(err) : resolve());
            });
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * Stop processing tasks, running tasks will not be aborted, but will be locked until `resume()`.
     * Returns `true` if paused from running state.
     */
    pause() {
        if (this.state !== QueueState.Running) {
            return false;
        }
        this.state = QueueState.Paused;
        this.resumePromise = new Promise(resolve => {
            this.resumeResolve = () => {
                this.resumeResolve = null;
                this.resumePromise = null;
                resolve();
            };
        });
        this.emit('pause');
        return true;
    }
    /**
     * Resume processing tasks.
     * Returns `true` if resumed from paused state.
     */
    resume() {
        if (this.state !== QueueState.Paused) {
            return false;
        }
        this.state = QueueState.Running;
        if (this.resumeResolve) {
            this.resumeResolve();
        }
        this.emit('resume');
        this.tryHandleNextTask();
        return true;
    }
    tryHandleNextTask() {
        // State may change after in event handler, so we need to test state here.
        if (this.state !== QueueState.Running) {
            return;
        }
        while (this.getRunningCount() < this.concurrency && this.tasks.length > 0) {
            let task = this.tasks.shift();
            this.handleEachItem({
                id: this.seed++,
                task,
                retriedTimes: 0,
                abort: null
            });
        }
        if (this.maxRetryTimes > 0 && this.getRunningCount() < this.concurrency && this.failedItems.length) {
            for (let i = 0; i < this.failedItems.length; i++) {
                let item = this.failedItems[i];
                if (item.retriedTimes < this.maxRetryTimes) {
                    item.retriedTimes++;
                    this.failedItems.splice(i--, 1);
                    this.handleEachItem(item);
                    if (this.getRunningCount() >= this.concurrency) {
                        break;
                    }
                }
            }
        }
        if (this.getRunningCount() === 0) {
            this.onFinish();
        }
    }
    handleEachItem(item) {
        let { task } = item;
        let onItemFinish = this.onItemFinish.bind(this, item);
        let onItemError = this.onItemError.bind(this, item);
        let value = this.handler(task);
        this.runningItems.push(item);
        if (this.isPromiseAbortObject(value)) {
            value.promise.then(onItemFinish, onItemError);
            item.abort = value.abort;
        }
        else if (value instanceof Promise) {
            value.then(onItemFinish, onItemError);
        }
        else {
            Promise.resolve().then(() => onItemFinish(value));
        }
    }
    isPromiseAbortObject(value) {
        return value
            && typeof value === 'object'
            && value.promise instanceof Promise
            && typeof value.abort === 'function';
    }
    async onItemFinish(item, value) {
        await this.prepareItem(item);
        if (!this.removeFromRunningItems(item)) {
            return;
        }
        this.processedCount++;
        if (this.state === QueueState.Running) {
            this.emit('taskfinish', item.task, value);
            this.tryHandleNextTask();
        }
    }
    async onItemError(item, err) {
        await this.prepareItem(item);
        if (!this.removeFromRunningItems(item)) {
            return;
        }
        this.failedItems.push(item);
        this.emit('error', item.task, err);
        if (!this.continueOnError && this.maxRetryTimes === 0) {
            this.onFatalError(err);
        }
        else {
            this.tryHandleNextTask();
        }
    }
    /** Prepare and ensure all loading for item is completed. */
    async prepareItem(item) {
        item.abort = null;
        if (this.resumePromise) {
            await this.resumePromise;
        }
    }
    removeFromRunningItems(item) {
        let index = this.runningItems.findIndex(v => v.id === item.id);
        if (index > -1) {
            this.runningItems.splice(index, 1);
            return true;
        }
        return false;
    }
    onFinish() {
        if (this.state === QueueState.Pending || this.state === QueueState.Running) {
            this.state = QueueState.Finish;
            this.emit('finish');
            this.emit('end', null);
        }
    }
    onFatalError(err) {
        this.abort(err);
    }
    /**
     * Retry all failed tasks immediately, ignore their retried times.
     * Returns `true` if has failed tasks and queued them.
     */
    retry() {
        let hasFailedTasks = this.getFailedCount() > 0;
        if (hasFailedTasks) {
            this.tasks.push(...this.getFailedTasks());
            this.failedItems = [];
        }
        let started = this.start();
        return started && hasFailedTasks;
    }
    /**
     * Abort current queue and all running tasks.
     * After aborted, queue can still be started manually by calling `start()`.
     * Returns `true` if queue was successfully aborted.
     */
    abort(err = 'Manually') {
        if (!(this.state === QueueState.Running || this.state === QueueState.Paused)) {
            return false;
        }
        this.state = QueueState.Aborted;
        this.failedItems.push(...this.runningItems);
        this.abortRunningItems();
        this.emit('abort', err);
        this.emit('end', err);
        return true;
    }
    abortRunningItems() {
        this.runningItems.map(item => this.abortItem(item));
        this.runningItems = [];
    }
    abortItem(item) {
        let { task, abort } = item;
        if (abort) {
            abort();
        }
        this.emit('taskabort', task);
    }
    /**
     * End and finish queue, abort all running tasks and clear all tasks and processing records.
     * Returns `true` if queue was cleared successfully.
     */
    clear() {
        if (this.state === QueueState.Aborted) {
            return false;
        }
        this.state = QueueState.Finish;
        this.tasks = [];
        this.failedItems = [];
        this.processedCount = 0;
        this.abortRunningItems();
        this.emit('finish');
        this.emit('end', null);
        if (this.resumeResolve) {
            this.resumeResolve();
        }
        return true;
    }
    /** Remove all not running tasks and keeps not running tasks and processing records. */
    clearNotRunning() {
        this.tasks = [];
        this.failedItems = [];
        this.processedCount = 0;
    }
    /** Push tasks to queue. */
    push(...tasks) {
        if (this.keysFound) {
            for (let task of tasks) {
                this.keysFound.add(task[this.key]);
            }
        }
        this.tasks.push(...tasks);
        this.tryHandleNextTask();
    }
    /** Unshift tasks to queue. */
    unshift(...tasks) {
        if (this.keysFound) {
            for (let task of tasks) {
                this.keysFound.add(task[this.key]);
            }
        }
        this.tasks.unshift(...tasks);
        this.tryHandleNextTask();
    }
    /**
     * Returns true if found same key task.
     * Only available when `key` specified.
     */
    has(task) {
        if (this.keysFound) {
            return this.keysFound.has(task[this.key]);
        }
        else {
            return false;
        }
    }
    /**
     * Push each task to queue, if not found duplicate task with same key.
     * Only available when `key` specified.
     */
    add(...tasks) {
        tasks = tasks.filter(t => !this.has(t));
        if (tasks.length > 0) {
            this.push(...tasks);
        }
    }
    /**
     * Unshift each task to queue, if not found duplicate task with same key.
     * Only available when `key` specified.
     */
    addToStart(...tasks) {
        tasks = tasks.filter(t => !this.has(t));
        if (tasks.length > 0) {
            this.unshift(...tasks);
        }
    }
    /**
     * Find first task match test function `fn`.
     * Processed tasks will not be found.
     */
    find(fn) {
        let item = this.runningItems.find(item => fn(item.task));
        if (item) {
            return item.task;
        }
        item = this.failedItems.find(item => fn(item.task));
        if (item) {
            return item.task;
        }
        let task = this.tasks.find(task => fn(task));
        if (task) {
            return task;
        }
        return undefined;
    }
    /**
     * Removes tasks included in `tasksToRemove` list.
     * Processed tasks will not be removed.
     * Returns the removed tasks.
     */
    remove(...tasksToRemove) {
        let taskSet = new Set(tasksToRemove);
        return this.removeWhere(task => taskSet.has(task));
    }
    /**
     * Removes all tasks that match test function `fn`.
     * Processed tasks will not be removed.
     * Returns the removed tasks.
     */
    removeWhere(fn) {
        let toRemove = [];
        this.runningItems = this.runningItems.filter(item => {
            if (fn(item.task)) {
                toRemove.push(item.task);
                return false;
            }
            else {
                return true;
            }
        });
        this.failedItems = this.failedItems.filter(item => {
            if (fn(item.task)) {
                toRemove.push(item.task);
                return false;
            }
            else {
                return true;
            }
        });
        this.tasks = this.tasks.filter(task => {
            if (fn(task)) {
                toRemove.push(task);
                return false;
            }
            else {
                return true;
            }
        });
        this.tryHandleNextTask();
        return toRemove;
    }
}
exports.Queue = Queue;
/**
 * Run eash task of `tasks` in a queue.
 * Returns a promise which will be resolved after queue finished.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task.
 * @param concurrency Specifies how many tasks to run simultaneously.
 */
function queueEach(tasks, handler, concurrency) {
    return new Promise((resolve, reject) => {
        let q = new Queue({
            concurrency,
            tasks,
            handler
        });
        q.on('finish', resolve);
        q.on('error', reject);
        q.start();
    });
}
exports.queueEach = queueEach;
/**
 * Run eash task of `tasks` in a queue.
 * Returns a promise which will be resolved with returned values from `handler` after queue finished.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a value.
 * @param concurrency Specifies how many tasks to run simultaneously.
 */
function queueMap(tasks, handler, concurrency) {
    return new Promise((resolve, reject) => {
        let values = [];
        let indexedTasks = tasks.map((task, index) => ({ task, index }));
        let q = new Queue({
            concurrency,
            tasks: indexedTasks,
            handler: async ({ task, index }) => {
                values[index] = await handler(task);
            }
        });
        q.on('finish', () => resolve(values));
        q.on('error', reject);
        q.start();
    });
}
exports.queueMap = queueMap;
/**
 * Run eash task of `tasks` in a queue.
 * Returns a promise which will be resolved if some tasks match `handler`.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a boolean value.
 * @param concurrency Specifies how many tasks to run simultaneously.
 */
function queueSome(tasks, handler, concurrency) {
    return new Promise((resolve, reject) => {
        let q = new Queue({
            concurrency,
            tasks,
            handler
        });
        q.on('taskfinish', (_task, value) => {
            if (value) {
                resolve(true);
                q.clear();
            }
        });
        q.on('finish', () => resolve(false));
        q.on('error', reject);
        q.start();
    });
}
exports.queueSome = queueSome;
/**
 * Run eash task of `tasks` in a queue.
 * Returns a promise which will be resolved if every tasks match `handler`.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a boolean value.
 * @param concurrency Specifies how many tasks to run simultaneously.
 */
function queueEvery(tasks, handler, concurrency) {
    return queueSome(tasks, async (task) => !(await handler(task)), concurrency).then(value => !value);
}
exports.queueEvery = queueEvery;


/***/ }),

/***/ "../ff/out/base/string.js":
/*!********************************!*\
  !*** ../ff/out/base/string.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.toUnderscoreCase = exports.toDashCase = exports.toCamerCase = exports.capitalize = exports.afterLast = exports.beforeLast = exports.after = exports.before = exports.format = exports.subMatches = exports.subMatchesAt = exports.firstMatches = exports.firstMatch = exports.subMatchAt = exports.selectAll = exports.select = void 0;
/** Replace `$0` to `matches[0]`, `$1` to `matches[1]`... */
function replaceMatchTags(template, match) {
    return template.replace(/\$(?:([$&\d])|<(\w+)>)/g, (_m0, m1, m2) => {
        if (m2) {
            return match.groups ? match.groups[m2] || '' : '';
        }
        else if (m1 === '$') {
            return '$';
        }
        else if (m1 === '&') {
            return match[0];
        }
        else {
            return typeof match[m1] === 'string' ? match[m1] : '';
        }
    });
}
/**
 * Select sub matches from `string` by matching `re`, then format with a `template` string.
 * Returns the format result.
 * @param string The string to select sub matches.
 * @param re The RegExp to execute on string.
 * @param template Replace `$i` or `$<name>` to corresponding match.
 */
function select(string, re, template) {
    let match = re.exec(string);
    return match ? replaceMatchTags(template, match) : '';
}
exports.select = select;
/**
 * Select all the sub matches from `string` by matching `re`, then format with a `template` string.
 * @param string The string to select sub matches.
 * @param re The RegExp to execute on string.
 * @param template Replace `$i` or `$<name>` to corresponding match.
 */
function selectAll(string, re, template) {
    if (re.global) {
        let match;
        let matches = [];
        while (match = re.exec(string)) {
            matches.push(replaceMatchTags(template, match));
        }
        return matches;
    }
    else {
        let match = string.match(re);
        if (match) {
            return [replaceMatchTags(template, match)];
        }
        else {
            return [];
        }
    }
}
exports.selectAll = selectAll;
/**
 * Returns the sub match in specified `index` from executing `re` on `string`.
 * @param string The string to select sub match.
 * @param re The RegExp to execute on string.
 * @param index Select the sub match in the index from match resul.
 */
function subMatchAt(string, re, index) {
    var _a;
    return ((_a = re.exec(string)) === null || _a === void 0 ? void 0 : _a[index]) || '';
}
exports.subMatchAt = subMatchAt;
/**
 * Returns the first sub match from executing `re` on `string`.
 * @param string The string to select sub match.
 * @param re The RegExp to execute on string.
 */
function firstMatch(string, re) {
    return subMatchAt(string, re, 1);
}
exports.firstMatch = firstMatch;
/**
 * Returns the array of first sub matches from executing `re` on `string`.
 * @param string The string to select sub match.
 * @param re The RegExp to execute on string.
 */
function firstMatches(string, re) {
    return subMatchesAt(string, re, 1);
}
exports.firstMatches = firstMatches;
/**
 * For each match result from executing `re` on `string`, picks specified `index` of sub matches.
 * Rreturns array of picked items.
 * @param string The string to select sub match.
 * @param re The RegExp to execute on string.
 * @param index Select the sub match in the index from each match result.
 */
function subMatchesAt(string, re, index) {
    if (re.global) {
        let match;
        let matches = [];
        while (match = re.exec(string)) {
            matches.push(match[index] || '');
        }
        return matches;
    }
    else {
        let match = string.match(re);
        if (match) {
            return [match[index] || ''];
        }
        else {
            return [];
        }
    }
}
exports.subMatchesAt = subMatchesAt;
/**
 * Returns array of all the sub matches from executing `re` on `string`.
 * @param string The string to select sub matches.
 * @param re The RegExp to execute on string.
 * @param sliceIndex Slice each match result from, specify to `0` to include whole match, `1` to only include sub matches, default value is `1`.
 */
function subMatches(string, re, sliceIndex = 1) {
    if (re.global) {
        let match;
        let matches = [];
        while (match = re.exec(string)) {
            matches.push([...match].slice(sliceIndex));
        }
        return matches;
    }
    else {
        let match = string.match(re);
        if (match) {
            return [[...match].slice(sliceIndex)];
        }
        else {
            return [];
        }
    }
}
exports.subMatches = subMatches;
/**
 * Format string to replace placeholders like `{key}` in `template` to `args[key]`.
 * Will keep the placeholder when no match found.
 * @param template String to format.
 * @param args The parameters to find and replace `{...}` with.
 */
function format(template, args) {
    return template.replace(/\{(\w+)\}/g, (m0, m1) => {
        let value = args[m1];
        if (value === undefined) {
            value = m0;
        }
        return value;
    });
}
exports.format = format;
/**
 * Get the left part of `string` before the first matched `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If `true`, when substring can't be found, returns the whole string.
 */
function before(string, substring, greedy = false) {
    let index = string.indexOf(substring);
    if (index < 0) {
        return greedy ? string : '';
    }
    else {
        return string.slice(0, index);
    }
}
exports.before = before;
/**
 * Get the right part of `string` before the first matched `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If `true`, when substring can't be found, returns the whole string.
 */
function after(string, substring, greedy = false) {
    let index = string.indexOf(substring);
    if (index < 0) {
        return greedy ? string : '';
    }
    else {
        return string.slice(index + substring.length);
    }
}
exports.after = after;
/**
 * Get the left part of `string` before the last matched `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If `true`, when substring can't be found, returns the whole string.
 */
function beforeLast(string, substring, greedy = false) {
    let index = string.lastIndexOf(substring);
    if (index < 0) {
        return greedy ? string : '';
    }
    else {
        return string.slice(0, index);
    }
}
exports.beforeLast = beforeLast;
/**
 * Get the right part of `string` before the last matched `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If `true`, when substring can't be found, returns the whole string.
 */
function afterLast(string, substring, greedy = false) {
    let index = string.lastIndexOf(substring);
    if (index < 0) {
        return greedy ? string : '';
    }
    else {
        return string.slice(index + 1);
    }
}
exports.afterLast = afterLast;
/**
 * Uppercase the first character of `string`.
 * @param string The string to be capitalized.
 */
function capitalize(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}
exports.capitalize = capitalize;
/**
 * Transform `string` to camer case type.
 * @param string The string to transform.
 */
function toCamerCase(string) {
    return string.replace(/[-_ ][a-z]/gi, m0 => m0[1].toUpperCase());
}
exports.toCamerCase = toCamerCase;
/**
 * Transform `string` to dash case type by joining words with `-`.
 * @param string The string to transform.
 */
function toDashCase(string) {
    return string.replace(/(^|.)([A-Z]+)/g, (m0, charBefore, upperChars) => {
        if (charBefore && /[a-z ]/i.test(charBefore)) {
            return charBefore + '-' + upperChars.toLowerCase();
        }
        else {
            return m0.toLowerCase();
        }
    })
        .replace(/_/g, '-');
}
exports.toDashCase = toDashCase;
/**
 * Transform `string` to dash case by joining words with `_`.
 * @param string The string to transform.
 */
function toUnderscoreCase(string) {
    return toDashCase(string).replace(/-/g, '_');
}
exports.toUnderscoreCase = toUnderscoreCase;


/***/ }),

/***/ "../ff/out/base/time.js":
/*!******************************!*\
  !*** ../ff/out/base/time.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
/**
 * Returns a promise which will be resolved after `ms` milliseconds.
 * @param ms The sleep time in milliseconds.
 */
function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;


/***/ }),

/***/ "../ff/out/dom/align.js":
/*!******************************!*\
  !*** ../ff/out/dom/align.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.alignToEvent = exports.getMainAlignDirection = exports.Aligner = exports.align = void 0;
const style_1 = __webpack_require__(/*! ./style */ "../ff/out/dom/style.js");
const element_1 = __webpack_require__(/*! ./element */ "../ff/out/dom/element.js");
/**
 * Align `el` to `target` element by specified position.
 * If no enough space, will adjust align position automatically.
 * Note that this mathod will always cause reflow.
 * @param el The element to align, it's position should be fixed or absolute.
 * @param target The target element to align to.
 * @param alignPosition Align Where of `el` to where of the `target`, e.g., `tl-br` means align top-left position of `el` to bottom-right of `target`.
 * @param options Additional options.
 */
function align(el, target, alignPosition, options = {}) {
    new Aligner(el, target, alignPosition, options).align();
}
exports.align = align;
class Aligner {
    constructor(el, target, position, options = {}) {
        var _a, _b, _c, _d;
        this.el = el;
        this.target = target;
        this.triangle = options.triangle || null;
        this.stickToEdges = (_a = options.stickToEdges) !== null && _a !== void 0 ? _a : true;
        this.canSwapPosition = (_b = options.canSwapPosition) !== null && _b !== void 0 ? _b : true;
        this.canShrinkInY = (_c = options.canShrinkInY) !== null && _c !== void 0 ? _c : false;
        this.fixTriangle = (_d = options.fixTriangle) !== null && _d !== void 0 ? _d : false;
        // Restore triangle transform.
        if (this.triangle) {
            this.triangle.style.transform = '';
        }
        // Still passed parameters although it's in current project,
        // So we can avoid calling order confuse us.
        this.alignPosition = parseAlignPosition(position);
        this.margins = this.parseMargin(options.margin || 0);
        // If target not affected by document scrolling, el should be same.
        // A potential problem here: once becomes fixed, can't be restored for reuseable popups.
        if (getClosestFixedElement(this.target)) {
            this.el.style.position = 'fixed';
            this.isElInFixedPosition = true;
        }
        else {
            this.isElInFixedPosition = getComputedStyle(this.el).position === 'fixed';
        }
    }
    /**
     * top [right] [bottom] [left] -> [t, r, b, l].
     * If align to a top position of target, unique number will be parsed as 0 in left and right position.
     */
    parseMargin(marginOption) {
        var _a, _b, _c;
        let margins = { top: 0, right: 0, bottom: 0, left: 0 };
        if (typeof marginOption === 'number') {
            margins.top = marginOption;
            margins.right = marginOption;
            margins.bottom = marginOption;
            margins.left = marginOption;
        }
        else {
            margins.top = marginOption[0];
            margins.right = (_a = marginOption[1]) !== null && _a !== void 0 ? _a : margins.top;
            margins.bottom = (_b = marginOption[2]) !== null && _b !== void 0 ? _b : margins.top;
            margins.left = (_c = marginOption[3]) !== null && _c !== void 0 ? _c : margins.right;
        }
        if (this.triangle) {
            margins.top += this.triangle.offsetHeight;
            margins.bottom += this.triangle.offsetHeight;
            margins.right += this.triangle.offsetWidth;
            margins.left += this.triangle.offsetWidth;
        }
        return margins;
    }
    /**
     * Align `el` to beside `target` element.
     * Returns whether does alignment.
     */
    align() {
        let directions = this.parseDirections();
        let targetRect = element_1.getRect(this.target);
        if (!isRectVisible(targetRect)) {
            return false;
        }
        this.clearLastAlignment();
        let rect = element_1.getRect(this.el);
        let triangleRect = this.triangle ? element_1.getRect(this.triangle) : null;
        let targetInViewport = isRectIntersectWithViewport(targetRect);
        let willAlign = targetInViewport || !this.stickToEdges;
        if (!willAlign) {
            return false;
        }
        // If can shrink in y axis, try remove the height limitation and extend to natural height.
        if (this.canShrinkInY) {
            rect.height = this.getNaturalHeight(rect, triangleRect);
        }
        // If overflow in x axis, rect may change after position adjusted.
        let isOverflowHerizontalEdges = rect.left <= 0 || rect.right >= document.documentElement.clientWidth;
        // Do el alignment.
        let position = this.doAlignment(directions, rect, targetRect, triangleRect);
        // Re-align el if element size changed.
        if (isOverflowHerizontalEdges) {
            let newRect = element_1.getRect(this.el);
            if (newRect.width !== rect.width || newRect.height !== rect.height) {
                // These two rects must be replaced both or neither.
                rect = newRect;
                triangleRect = this.triangle ? element_1.getRect(this.triangle) : null;
                position = this.doAlignment(directions, newRect, targetRect, triangleRect);
            }
        }
        // Handle triangle position.
        if (this.triangle) {
            this.alignTriangle(position, directions, rect, targetRect, triangleRect);
        }
        return true;
    }
    /** Clear last alignment properties. */
    clearLastAlignment() {
        // Must reset, or el may be shrink into a small corner.
        this.el.style.left = '0';
        this.el.style.top = '0';
        // `align` may be called for multiple times, so need to clear again.
        if (this.triangle) {
            this.triangle.style.transform = '';
        }
    }
    /** Parse align direction to indicate which direction will align to. */
    parseDirections() {
        let alignPosition = this.alignPosition;
        return {
            top: alignPosition[0].includes('b') && alignPosition[1].includes('t'),
            right: alignPosition[0].includes('l') && alignPosition[1].includes('r'),
            bottom: alignPosition[0].includes('t') && alignPosition[1].includes('b'),
            left: alignPosition[0].includes('r') && alignPosition[1].includes('l'),
        };
    }
    /**
     * When el can be scrolled, if we just expend it to test its natural height, it's scrolled position will lost.
     * So we get `scrollHeight - clientHeight` as a diff and add it to it's current height as it's natural height.
     * Note that the `triangle` will cause `scrollHeight` plus for it's height.
     * Otherwise may not el but child is scrolled.
     */
    getNaturalHeight(rect, triangleRect) {
        let h = rect.height;
        let diffHeight = this.el.scrollHeight - this.el.clientHeight;
        let maxAllowdDiffWhenNotScrolled = (triangleRect === null || triangleRect === void 0 ? void 0 : triangleRect.height) || 0;
        if (diffHeight <= maxAllowdDiffWhenNotScrolled) {
            diffHeight = Math.max(...[...this.el.children].map(child => child.scrollHeight - child.clientHeight));
        }
        if (diffHeight > 0) {
            h = h + diffHeight;
        }
        else {
            this.el.style.height = '';
            h = this.el.offsetHeight;
        }
        return h;
    }
    /** Do alignment from `el` to `target` for once. */
    doAlignment(directions, rect, targetRect, triangleRect) {
        let anchor1 = this.getElRelativeAnchor(directions, rect, triangleRect);
        let anchor2 = this.getTargetAbsoluteAnchor(targetRect);
        // Fixed position coordinate.
        let position = {
            x: anchor2[0] - anchor1[0],
            y: anchor2[1] - anchor1[1],
        };
        // Handle vertical alignment.
        let overflowYSet = this.alignVertical(position, directions, rect, targetRect, triangleRect);
        // Reset el height.
        if (overflowYSet) {
            rect = element_1.getRect(this.el);
            anchor1 = this.getElRelativeAnchor(directions, rect, triangleRect);
        }
        // Handle herizontal alignment.
        this.alignHerizontal(position, directions, rect, targetRect, triangleRect);
        // Position for fixed or absolute layout.
        let mayAbsolutePosition = { ...position };
        // If is not fixed, minus coordinates relative to offsetParent.
        if (!this.isElInFixedPosition && this.target !== document.body && this.target !== document.documentElement) {
            var offsetParent = this.el.offsetParent;
            // If we use body's top postion, it will cause a bug when body has a margin top (even from margin collapse).
            if (offsetParent) {
                var parentRect = offsetParent.getBoundingClientRect();
                mayAbsolutePosition.x -= parentRect.left;
                mayAbsolutePosition.y -= parentRect.top;
            }
        }
        this.el.style.left = mayAbsolutePosition.x + 'px';
        this.el.style.top = mayAbsolutePosition.y + 'px';
        return position;
    }
    /** Get relative anchor position of the axis of an element. */
    getElRelativeAnchor(directions, rect, triangleRect) {
        let anchor = this.alignPosition[0];
        let x = anchor.includes('l') ? 0 : anchor.includes('r') ? rect.width : rect.width / 2;
        let y = anchor.includes('t') ? 0 : anchor.includes('b') ? rect.height : rect.height / 2;
        // Anchor at triangle position.
        if (this.fixTriangle && triangleRect) {
            if ((directions.top || directions.bottom) && this.alignPosition[1][1] === 'c') {
                x = triangleRect.left + triangleRect.width / 2 - rect.left;
            }
            else if ((directions.left || directions.right) && this.alignPosition[1][0] === 'c') {
                y = triangleRect.top + triangleRect.height / 2 - rect.top;
            }
        }
        return [x, y];
    }
    /** Get absolute anchor position in scrolling page. */
    getTargetAbsoluteAnchor(targetRect) {
        let anchor = this.alignPosition[1];
        let x = anchor.includes('l')
            ? targetRect.left - this.margins.left
            : anchor.includes('r')
                ? targetRect.right + this.margins.right
                : targetRect.left + targetRect.width / 2;
        let y = anchor.includes('t')
            ? targetRect.top - this.margins.top
            : anchor.includes('b')
                ? targetRect.bottom + this.margins.bottom
                : targetRect.top + targetRect.height / 2;
        return [x, y];
    }
    /** Do vertical alignment. */
    alignVertical(position, directions, rect, targetRect, triangleRect) {
        let dh = document.documentElement.clientHeight;
        let spaceTop = targetRect.top - this.margins.top;
        let spaceBottom = dh - (targetRect.bottom + this.margins.bottom);
        let overflowYSet = false;
        let h = rect.height;
        let y = position.y;
        if (directions.top || directions.bottom) {
            // Not enough space in top position, may switch to bottom.
            if (directions.top && y < 0 && spaceTop < spaceBottom && this.canSwapPosition) {
                y = targetRect.bottom + this.margins.bottom;
                directions.top = false;
                directions.bottom = true;
            }
            // Not enough space in bottom position, may switch to bottom.
            else if (y + h > dh && spaceTop > spaceBottom && this.canSwapPosition) {
                y = targetRect.top - this.margins.top - h;
                directions.top = true;
                directions.bottom = false;
            }
        }
        else {
            // Can move up a little to become fully visible.
            if (y + h > dh && this.stickToEdges) {
                // Gives enough space for triangle.
                let minY = targetRect.top + (triangleRect ? triangleRect.height : 0) - h;
                y = Math.max(dh - h, minY);
            }
            // Can move down a little to become fully visible.
            if (y < 0 && this.stickToEdges) {
                // Gives enough space for triangle.
                let maxY = targetRect.bottom - (triangleRect ? triangleRect.height : 0);
                y = Math.min(0, maxY);
            }
        }
        if (this.canShrinkInY) {
            // Shrink element height if not enough space.
            if (directions.top && y < 0 && this.stickToEdges) {
                y = 0;
                this.el.style.height = spaceTop + 'px';
                overflowYSet = true;
            }
            else if (directions.bottom && y + h > dh && this.stickToEdges) {
                this.el.style.height = spaceBottom + 'px';
                overflowYSet = true;
            }
            else if (!directions.top && !directions.bottom && rect.height > dh) {
                y = 0;
                this.el.style.height = dh + 'px';
                overflowYSet = true;
            }
        }
        position.y = y;
        return overflowYSet;
    }
    /** Do herizontal alignment. */
    alignHerizontal(position, directions, rect, targetRect, triangleRect) {
        let dw = document.documentElement.clientWidth;
        let spaceLeft = targetRect.left - this.margins.left;
        let spaceRight = dw - (targetRect.right + this.margins.right);
        let w = rect.width;
        let x = position.x;
        if (directions.left || directions.right) {
            // Not enough space in left position.
            if (directions.left && x < 0 && spaceLeft < spaceRight && this.canSwapPosition) {
                x = targetRect.right + this.margins.right;
                directions.left = false;
                directions.right = true;
            }
            // Not enough space in right position.
            else if (directions.right && x > dw - w && spaceLeft > spaceRight && this.canSwapPosition) {
                x = targetRect.left - this.margins.left - w;
                directions.left = true;
                directions.right = false;
            }
        }
        else {
            // Can move left a little to become fully visible.
            if (x + w > dw && this.stickToEdges) {
                // Gives enough space for triangle.
                let minX = targetRect.left + (triangleRect ? triangleRect.width : 0) - w;
                x = Math.max(dw - w, minX);
            }
            // Can move right a little to become fully visible.
            if (x < 0 && this.stickToEdges) {
                // Gives enough space for triangle.
                let minX = targetRect.right - (triangleRect ? triangleRect.width : 0);
                x = Math.min(0, minX);
            }
        }
        position.x = x;
    }
    /** Align `triangle` relative to `el`. */
    alignTriangle(position, directions, rect, targetRect, triangleRect) {
        let triangle = this.triangle;
        let transforms = [];
        let w = rect.width;
        let h = rect.height;
        if (directions.top) {
            triangle.style.top = 'auto';
            triangle.style.bottom = -triangleRect.height + 'px';
            transforms.push('rotateX(180deg)');
        }
        else if (directions.bottom) {
            triangle.style.top = -triangleRect.height + 'px';
            triangle.style.bottom = '';
        }
        else if (directions.left) {
            triangle.style.left = 'auto';
            triangle.style.right = -triangleRect.width + 'px';
            transforms.push('rotateY(180deg)');
        }
        else if (directions.right) {
            triangle.style.left = -triangleRect.width + 'px';
            triangle.style.right = '';
        }
        if (directions.top || directions.bottom) {
            let halfTriangleWidth = triangleRect.width / 2;
            let x = 0;
            // Adjust triangle to the center of the target edge.
            if ((w >= targetRect.width || this.fixTriangle) && this.alignPosition[1][1] === 'c') {
                x = targetRect.left + targetRect.width / 2 - position.x - halfTriangleWidth;
            }
            // In fixed position.
            else if (this.fixTriangle) {
                x = triangleRect.left - rect.left;
            }
            // Adjust triangle to the center of the el edge.
            else {
                x = w / 2 - halfTriangleWidth;
            }
            x = Math.max(x, halfTriangleWidth);
            x = Math.min(x, rect.width - triangleRect.width - halfTriangleWidth);
            if (this.fixTriangle) {
                x -= triangleRect.left - rect.left;
                transforms.push(`translateX(${x}px)`);
            }
            else {
                triangle.style.left = x + 'px';
            }
            triangle.style.right = '';
        }
        if (directions.left || directions.right) {
            let halfTriangleHeight = triangleRect.height / 2;
            let y;
            if ((h >= targetRect.height || this.fixTriangle) && this.alignPosition[1][0] === 'c') {
                y = targetRect.top + targetRect.height / 2 - position.y - halfTriangleHeight;
            }
            else if (this.fixTriangle) {
                y = triangleRect.top - rect.top;
            }
            else {
                y = h / 2 - halfTriangleHeight;
            }
            y = Math.max(y, halfTriangleHeight);
            y = Math.min(y, rect.height - triangleRect.height - halfTriangleHeight);
            if (this.fixTriangle) {
                y -= triangleRect.top - rect.top;
                transforms.push(`translateY(${y}px)`);
            }
            else if (!this.fixTriangle) {
                triangle.style.top = y + 'px';
            }
            triangle.style.bottom = '';
        }
        triangle.style.transform = transforms.join(' ');
    }
}
exports.Aligner = Aligner;
/**
 * Full type is `[tbc][lrc]-[tbc][lrc]`, means `[Y of el][X of el]-[Y of target][X of target]`.
 * Shorter type should be `[Touch][Align]` or `[Touch]`.
 * E.g.: `t` is short for `tc` or `b-t` or `bc-tc`, which means align el to the top-center of target.
 * E.g.: `tl` is short for `bl-tl`, which means align el to the top-left of target.
 * E.g.: `lt` is short for `tr-tl`, which means align el to the left-top of target.
 */
function parseAlignPosition(position) {
    const ALIGN_POS_OPPOSITE = {
        t: 'b',
        b: 't',
        c: 'c',
        l: 'r',
        r: 'l',
    };
    if (!/^(?:[tbc][lrc]-[tbc][lrc]|[tbclr]-[tbclr]|[tbc][lrc]|[tbclr])/.test(position)) {
        throw `"${position}" is not a valid position`;
    }
    if (position.length === 1) {
        // t -> bc-tc
        if ('tb'.includes(position)) {
            position = ALIGN_POS_OPPOSITE[position] + 'c-' + position + 'c';
        }
        // l -> cr-cl
        // c -> cc-cc
        else {
            position = 'c' + ALIGN_POS_OPPOSITE[position] + '-c' + position;
        }
    }
    else if (position.length === 2) {
        // tl -> bl-tl
        if ('tb'.includes(position[0])) {
            position = ALIGN_POS_OPPOSITE[position[0]] + position[1] + '-' + position;
        }
        // lt -> tr-tl
        else {
            position = position[1] + ALIGN_POS_OPPOSITE[position[0]] + '-' + position[1] + position[0];
        }
    }
    let posArray = position.split('-');
    return [completeAlignPosition(posArray[0]), completeAlignPosition(posArray[1])];
}
/** Complete align position from one char to two, e.g., `t-b` -> `tc-bc`. */
function completeAlignPosition(pos) {
    if (pos.length === 1) {
        pos = 'tb'.includes(pos) ? pos + 'c' : 'c' + pos;
    }
    return pos;
}
/**
 * Get main align direction from align position string, can be used to set triangle styles.
 * @param pos Align position like `t`, `tc`, `bc-tc`.
 */
function getMainAlignDirection(pos) {
    let position = pos.length < 5 ? parseAlignPosition(pos) : pos;
    if (position[0].includes('b') && position[1].includes('t')) {
        return 't';
    }
    else if (position[0].includes('l') && position[1].includes('r')) {
        return 'r';
    }
    else if (position[0].includes('t') && position[1].includes('b')) {
        return 'b';
    }
    else if (position[0].includes('r') && position[1].includes('l')) {
        return 'l';
    }
    else if (position[0] === 'cc' && position[1] === 'cc') {
        return 'c';
    }
    else {
        return '';
    }
}
exports.getMainAlignDirection = getMainAlignDirection;
/** Check if rect box intersect with viewport. */
function isRectVisible(rect) {
    return rect.width > 0 && rect.height > 0;
}
/** Check if rect box intersect with viewport. */
function isRectIntersectWithViewport(rect) {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    return rect.left < w && rect.right > 0 && rect.top < h && rect.bottom > 0;
}
/** Get a closest ancest element which has fixed position. */
function getClosestFixedElement(el) {
    while (el && el !== document.documentElement) {
        if (getComputedStyle(el).position === 'fixed') {
            break;
        }
        el = el.parentElement;
    }
    return el === document.documentElement ? null : el;
}
/**
 * Align element to a mouse event.
 * @param el A fixed position element to align.
 * @param event A mouse event to align to.
 * @param offset `[x, y]` offset relative to current mouse position.
 */
function alignToEvent(el, event, offset = [0, 0]) {
    if (style_1.getStyleValue(el, 'position') !== 'fixed') {
        throw new Error(`Element to call "alignToEvent" must in fixed layout`);
    }
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let w = el.offsetWidth;
    let h = el.offsetHeight;
    let ex = event.clientX;
    let ey = event.clientY;
    let x = ex + offset[0];
    let y = ey + offset[1];
    if (x + w > dw) {
        x = dw - w;
    }
    if (y + h > dh) {
        y = dh - h;
    }
    el.style.left = Math.round(x) + 'px';
    el.style.top = Math.round(y) + 'px';
}
exports.alignToEvent = alignToEvent;


/***/ }),

/***/ "../ff/out/dom/animate.js":
/*!********************************!*\
  !*** ../ff/out/dom/animate.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlayingAnimation = exports.stopAnimation = exports.animateToNextFrame = exports.animateTo = exports.animateFrom = exports.animate = exports.animateStyleValueTo = exports.animateStyleValueFrom = exports.animateStyleValue = exports.animateInterpolatedValue = exports.getCSSEasingValue = exports.getEasingFunction = void 0;
const style_1 = __webpack_require__(/*! ./style */ "../ff/out/dom/style.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../ff/out/dom/utils.js");
/** Default animation duration, plays aniamtion for millseconds according to this property by default. */
const DefaultAnimationDuration = 200;
/** Default animation duration, plays aniamtion with easing according to this property by default. */
const DefaultAnimationEasing = 'ease-out-quad';
/** Cache element and their current playing animation. */
const ElementAnimationCache = new WeakMap();
/** Cache element and their current playing animation. */
const ElementAnimationStopper = new WeakMap();
/** Specifies easing name and their bezier parameters, copied from `Bourbon` source codes. */
const CUBIC_BEZIER_EASINGS = {
    // BASE
    'ease': [0.250, 0.100, 0.250, 1.000],
    'ease-in': [0.420, 0.000, 1.000, 1.000],
    'ease-out': [0.000, 0.000, 0.580, 1.000],
    'ease-in-out': [0.420, 0.000, 0.580, 1.000],
    // EASE IN
    'ease-in-quad': [0.550, 0.085, 0.680, 0.530],
    'ease-in-cubic': [0.550, 0.055, 0.675, 0.190],
    'ease-in-quart': [0.895, 0.030, 0.685, 0.220],
    'ease-in-quint': [0.755, 0.050, 0.855, 0.060],
    'ease-in-sine': [0.470, 0.000, 0.745, 0.715],
    'ease-in-expo': [0.950, 0.050, 0.795, 0.035],
    'ease-in-circ': [0.600, 0.040, 0.980, 0.335],
    'ease-in-back': [0.600, -0.280, 0.735, 0.045],
    // EASE OUT
    'ease-out-quad': [0.250, 0.460, 0.450, 0.940],
    'ease-out-cubic': [0.215, 0.610, 0.355, 1.000],
    'ease-out-quart': [0.165, 0.840, 0.440, 1.000],
    'ease-out-quint': [0.230, 1.000, 0.320, 1.000],
    'ease-out-sine': [0.390, 0.575, 0.565, 1.000],
    'ease-out-expo': [0.190, 1.000, 0.220, 1.000],
    'ease-out-circ': [0.075, 0.820, 0.165, 1.000],
    'ease-out-back': [0.175, 0.885, 0.320, 1.275],
    // EASE IN OUT
    'ease-in-out-quad': [0.455, 0.030, 0.515, 0.955],
    'ease-in-out-cubic': [0.645, 0.045, 0.355, 1.000],
    'ease-in-out-quart': [0.770, 0.000, 0.175, 1.000],
    'ease-in-out-quint': [0.860, 0.000, 0.070, 1.000],
    'ease-in-out-sine': [0.445, 0.050, 0.550, 0.950],
    'ease-in-out-expo': [1.000, 0.000, 0.000, 1.000],
    'ease-in-out-circ': [0.785, 0.135, 0.150, 0.860],
    'ease-in-out-back': [0.680, -0.550, 0.265, 1.550],
};
/** The default style of element, which is not `0` */
const DefaultNotNumericStyleProperties = {
    transform: 'none'
};
/** Cached compiled easing functions. */
const easingFns = {
    linear: function (x) {
        return x;
    }
};
/**
 * Get a `(x) => y` function from easing name.
 * @param easing The extended easing name.
 */
function getEasingFunction(name) {
    if (name === 'linear') {
        return easingFns[name];
    }
    else {
        return easingFns[name] = getCubicBezierEasingFunction(name);
    }
}
exports.getEasingFunction = getEasingFunction;
/**
 * Get `cubic-bezier(...)` as CSS easing from easing name.
 * @param easing The extended easing name.
 */
function getCSSEasingValue(easing) {
    return CUBIC_BEZIER_EASINGS.hasOwnProperty(easing)
        ? 'cubic-bezier(' + CUBIC_BEZIER_EASINGS[easing].join(', ') + ')'
        : easing;
}
exports.getCSSEasingValue = getCSSEasingValue;
/** Compile a easing function from extended easing name. */
function getCubicBezierEasingFunction(name) {
    //	F(t)  = (1-t)^3 * P0 + 3t(1-t)^2 * P1 + 3t^2(1-t)^2 * P2 + t^3 * P3, t in [0, 1]
    //
    //	Get the x axis projecting function, and knows x0 = 0, x3 = 1, got:
    //	Cx(t) = 3t(1-t)^2 * x1 + 3t^2(1-t) * x2 + t^3
    //		  = (3x1 - 3x2 + 1) * t^3 + (-6x1 + 3x2) * t^2 + 3x1 * t
    //	
    //	From Cx(t) = x, got t by binary iteration algorithm, then pass it to y axis projecting function:
    //	Cy(t) = (3y1 - 3y2 + 1) * t^3 + (-6y1 + 3y2) * t^2 + 3y1 * t
    let [x1, y1, x2, y2] = CUBIC_BEZIER_EASINGS[name];
    let a = 3 * x1 - 3 * x2 + 1;
    let b = -6 * x1 + 3 * x2;
    let c = 3 * x1;
    let ay = 3 * y1 - 3 * y2 + 1;
    let by = -6 * y1 + 3 * y2;
    let cy = 3 * y1;
    return function (x) {
        if (x === 0) {
            return 0;
        }
        else if (x === 1) {
            return 1;
        }
        let d = -x;
        let t1 = 0;
        let t2 = 1;
        let t = (t1 + t2) / 2;
        while (t2 - t1 > 0.0001) {
            let v = ((a * t + b) * t + c) * t + d;
            if (v < 0) {
                t1 = t;
            }
            else {
                t2 = t;
            }
            t = (t1 + t2) / 2;
        }
        return ((ay * t + by) * t + cy) * t;
    };
}
/** Play per frame animation when no standard animation available. */
function playPerFrameAnimation(duration, easing, onInterval, onEnd) {
    let startTimestamp = performance.now();
    let easingFn = getEasingFunction(easing);
    let frameId = 0;
    let runNextFrame = () => {
        frameId = requestAnimationFrame((timestamp) => {
            let timeDiff = timestamp - startTimestamp;
            let x = timeDiff / duration;
            if (x >= 1) {
                frameId = 0;
                onInterval(1);
                if (onEnd) {
                    onEnd(true);
                }
            }
            else {
                let y = easingFn(x);
                onInterval(y);
                runNextFrame();
            }
        });
    };
    runNextFrame();
    return () => {
        if (frameId) {
            cancelAnimationFrame(frameId);
            if (onEnd) {
                onEnd(false);
            }
        }
    };
}
/**
 * Animate by a value range, `fn` recives current value that interpolate from `startValue` to `endValue` as parameter.
 * Execute animation by setting values per frame in `requestAnimationFrame`.
 * @param fn The function which will got a current state number value as parameter.
 * @param startValue The start value.
 * @param endValue  The end value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateInterpolatedValue(fn, startValue, endValue, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let stop;
    let promise = new Promise((resolve) => {
        stop = playPerFrameAnimation(duration, easing, (y) => {
            fn(startValue + (endValue - startValue) * y);
        }, resolve);
    });
    return {
        promise,
        stop: stop,
    };
}
exports.animateInterpolatedValue = animateInterpolatedValue;
/**
 * Animate numberic style value even `scrollLeft` and `scrollTop` on `el`.
 * Execute animation per frames by setting values per frame in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param startValue The start value of `property`.
 * @param endValue  The end value of `property`.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateStyleValue(el, property, startValue, endValue, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let promise = new Promise((resolve) => {
        let stop = playPerFrameAnimation(duration, easing, (y) => {
            let value = startValue + (endValue - startValue) * y;
            if (property === 'scrollTop' || property === 'scrollLeft') {
                el[property] = value;
            }
            else {
                style_1.setStyleValue(el, property, value);
            }
        }, resolve);
        let stopper = () => {
            stop();
            ElementAnimationStopper.delete(el);
        };
        ElementAnimationStopper.set(el, stopper);
    });
    return promise;
}
exports.animateStyleValue = animateStyleValue;
/**
 * Animate numberic style value even `scrollLeft` and `scrollTop` on `el`.
 * Execute animation per frames by setting values per frame in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param startValue The start value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateStyleValueFrom(el, property, startValue, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let endValue;
    if (property === 'scrollTop' || property === 'scrollLeft') {
        endValue = el[property];
    }
    else {
        endValue = style_1.getStyleValueAsNumber(el, property);
    }
    return animateStyleValue(el, property, startValue, endValue, duration, easing);
}
exports.animateStyleValueFrom = animateStyleValueFrom;
/**
 * Animate numberic style value even `scrollLeft` and `scrollTop` on `el`.
 * Execute animation per frames by setting values per frame in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param endValue The end value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateStyleValueTo(el, property, endValue, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let startValue;
    if (property === 'scrollTop' || property === 'scrollLeft') {
        startValue = el[property];
    }
    else {
        startValue = style_1.getStyleValueAsNumber(el, property);
    }
    return animateStyleValue(el, property, startValue, endValue, duration, easing);
}
exports.animateStyleValueTo = animateStyleValueTo;
/**
 * Execute standard web animation on element.
 * After animation end, the state of element will go back to the start state.
 * @param el The element to execute web animation.
 * @param startFrame The start frame.
 * @param endFrame The end frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animate(el, startFrame, endFrame, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    if (!el.animate) {
        return Promise.resolve(false);
    }
    stopAnimation(el);
    startFrame = utils_1.normativeStyleObject(startFrame);
    endFrame = utils_1.normativeStyleObject(endFrame);
    let cubicEasing = getCSSEasingValue(easing);
    let animation = el.animate([startFrame, endFrame], {
        easing: cubicEasing,
        duration,
    });
    ElementAnimationCache.set(el, animation);
    return new Promise((resolve) => {
        animation.addEventListener('finish', () => {
            ElementAnimationCache.delete(el);
            resolve(true);
        }, false);
        animation.addEventListener('cancel', () => {
            ElementAnimationCache.delete(el);
            resolve(false);
        }, false);
    });
}
exports.animate = animate;
/**
 * Execute standard web animation on element with start frame specified.
 * The end frame will be set as zero or empty values.
 * @param el The element to execute web animation.
 * @param startFrame The start frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateFrom(el, startFrame, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let endFrame = {};
    let style = getComputedStyle(el);
    for (let property in startFrame) {
        endFrame[property] = style[property] || DefaultNotNumericStyleProperties[property] || '0';
    }
    return animate(el, startFrame, endFrame, duration, easing);
}
exports.animateFrom = animateFrom;
/**
 * Execute standard web animation on element with end frame specified.
 * The end frame will be specified as values of current state.
 * After animation executed, will apply end frame values to element.
 * @param el The element to execute web animation.
 * @param endFrame The end frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
async function animateTo(el, endFrame, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    let startFrame = {};
    let style = getComputedStyle(el);
    // Fix '' to `0` or `none`
    let standardEndFrame = Object.assign({}, endFrame);
    for (let property in standardEndFrame) {
        if (standardEndFrame[property] === '') {
            standardEndFrame[property] = DefaultNotNumericStyleProperties[property] || '0';
        }
    }
    for (let property in endFrame) {
        startFrame[property] = style[property] || DefaultNotNumericStyleProperties[property] || '0';
    }
    let finish = await animate(el, startFrame, standardEndFrame, duration, easing);
    if (finish) {
        style_1.setStyleValues(el, endFrame);
    }
    return finish;
}
exports.animateTo = animateTo;
/**
 * Execute standard web animation, captures current state as start frame, and captures a new state later as end frame.
 * @param el The element to execute web animation.
 * @param properties The style properties to capture.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateToNextFrame(el, properties, duration = DefaultAnimationDuration, easing = DefaultAnimationEasing) {
    if (!el.animate) {
        return Promise.resolve(false);
    }
    stopAnimation(el);
    if (typeof properties === 'string') {
        properties = [properties];
    }
    let startFrame = {};
    let style = getComputedStyle(el);
    for (let property of properties) {
        startFrame[property] = style[property];
    }
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            animateFrom(el, startFrame, duration, easing).then(resolve);
        });
    });
}
exports.animateToNextFrame = animateToNextFrame;
/**
 * Stop executing standard web animation on element.
 * Returns whether stopped animation.
 * @param el The element to stop animation at.
 */
function stopAnimation(el) {
    let animation = ElementAnimationCache.get(el);
    if (animation) {
        animation.cancel();
        ElementAnimationCache.delete(el);
        return true;
    }
    let stopper = ElementAnimationStopper.get(el);
    if (stopper) {
        stopper();
        return true;
    }
    return false;
}
exports.stopAnimation = stopAnimation;
/**
 * Test if element is playing an animation.
 * @param el The element to test animation at.
 */
function isPlayingAnimation(el) {
    let animation = ElementAnimationCache.get(el);
    if (animation) {
        return true;
    }
    let stopper = ElementAnimationStopper.get(el);
    if (stopper) {
        return true;
    }
    return false;
}
exports.isPlayingAnimation = isPlayingAnimation;


/***/ }),

/***/ "../ff/out/dom/element.js":
/*!********************************!*\
  !*** ../ff/out/dom/element.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.locateLastVisibleIndex = exports.locateFirstVisibleIndex = exports.isVisibleInViewport = exports.getRect = exports.getOuterHeight = exports.getOuterWidth = exports.getInnerHeight = exports.getInnerWidth = exports.getElementIndex = exports.getNodeIndex = void 0;
const array_1 = __webpack_require__(/*! ../base/array */ "../ff/out/base/array.js");
const style_1 = __webpack_require__(/*! ./style */ "../ff/out/dom/style.js");
/**
 * Get the index of node in it's node siblings.
 * @param node The node.
 */
function getNodeIndex(node) {
    if (node.parentNode) {
        let i = 0;
        for (let child of node.parentNode.childNodes) {
            if (child === node) {
                return i;
            }
            i++;
        }
    }
    return -1;
}
exports.getNodeIndex = getNodeIndex;
/**
 * Get the index of element in it's element siblings.
 * @param el The node.
 */
function getElementIndex(el) {
    if (el.parentNode) {
        let i = 0;
        for (let child of el.parentNode.children) {
            if (child === el) {
                return i;
            }
            i++;
        }
    }
    return -1;
}
exports.getElementIndex = getElementIndex;
/**
 * Get inner width of element, which equals `clientWidth - paddingWidths` or `width - paddingWidths - scrollbarWidth`.
 * Note that this method may cause page reflow.
 * @param el The element to get width.
 */
function getInnerWidth(el) {
    let w = el.clientWidth;
    if (w) {
        return el.clientWidth - style_1.getStyleValueAsNumber(el, 'paddingLeft') - style_1.getStyleValueAsNumber(el, 'paddingRight');
    }
    else {
        return 0;
    }
}
exports.getInnerWidth = getInnerWidth;
/**
 * Get inner height of element, which equals to `clientHeight - paddingHeights` or `height - paddingHeights - scrollbarHeight`.
 * Note that this method may cause page reflow.
 * @param el The element to get height.
 */
function getInnerHeight(el) {
    let h = el.clientHeight;
    if (h) {
        return h - style_1.getStyleValueAsNumber(el, 'paddingTop') - style_1.getStyleValueAsNumber(el, 'paddingBottom');
    }
    else {
        return 0;
    }
}
exports.getInnerHeight = getInnerHeight;
/**
 * Get outer width of element, which equals `offsetWidth + marginWidths`.
 * Note that this method may cause page reflow.
 * @param el The element to get width.
 */
function getOuterWidth(el) {
    let w = el.offsetWidth;
    if (w) {
        return w + style_1.getStyleValueAsNumber(el, 'marginLeft') + style_1.getStyleValueAsNumber(el, 'marginRight');
    }
    else {
        return 0;
    }
}
exports.getOuterWidth = getOuterWidth;
/**
 * Get inner height of element, which equals `offsetHeight + marginHeights`.
 * Note that this method may cause page reflow.
 * @param el The element to get height.
 */
function getOuterHeight(el) {
    let h = el.offsetHeight;
    if (h) {
        return h + style_1.getStyleValueAsNumber(el, 'marginTop') + style_1.getStyleValueAsNumber(el, 'marginBottom');
    }
    else {
        return 0;
    }
}
exports.getOuterHeight = getOuterHeight;
/**
 * Get an rect object just like `getBoundingClientRect`.
 * The didderence is it always returns the rect of visible part for `<html>`, and properties are writable.
 * Note that this method may cause page reflow.
 * @param el The element to get rect size.
 */
function getRect(el) {
    if (el === document.documentElement) {
        let dw = document.documentElement.clientWidth;
        let dh = document.documentElement.clientHeight;
        return {
            top: 0,
            right: dw,
            bottom: dh,
            left: 0,
            width: dw,
            height: dh,
        };
    }
    else {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };
    }
}
exports.getRect = getRect;
/**
 * Check if element is visible in current viewport, element must also be not fully covered.
 * Note that this method may cause page reflow.
 * @param el The element to check if is in view.
 * @param percentage Specify how much percentage of el size implies in view.
 * @param additionalElement Normally a popup element with `el` as it's trigger. it may cover `el` when page resizing.
 */
function isVisibleInViewport(el, percentage = 0.5, additionalElement) {
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let rect = getRect(el);
    let xIntersect = Math.min(dw, rect.right) - Math.max(0, rect.left);
    let yIntersect = Math.min(dh, rect.bottom) - Math.max(0, rect.top);
    let inRange = xIntersect / Math.min(rect.width, dw) > percentage
        && yIntersect / Math.min(rect.height, dh) > percentage;
    if (inRange) {
        if (el.disabled) {
            return true;
        }
        let elementInPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        let notBeCovered = el.contains(elementInPoint) || (additionalElement === null || additionalElement === void 0 ? void 0 : additionalElement.contains(elementInPoint));
        if (notBeCovered) {
            return true;
        }
    }
    return false;
}
exports.isVisibleInViewport = isVisibleInViewport;
/**
 * Locate the first element in els that is is visible inside container.
 * @container Container to check visible inside.
 * @param els Element list to check.
 * @param minimumVisibleRate If more than such rate of element in viewport, we consider it as visible.
 */
function locateFirstVisibleIndex(container, els, minimumVisibleRate = 0.5) {
    return locateVisibleIndex(container, els, minimumVisibleRate, false);
}
exports.locateFirstVisibleIndex = locateFirstVisibleIndex;
/**
 * Locate the last element in els that is is visible inside container.
 * @container Container to check visible inside.
 * @param els Element list to check.
 * @param minimumVisibleRate If more than such rate of element in viewport, we consider it as visible.
 */
function locateLastVisibleIndex(container, els, minimumVisibleRate = 0.5) {
    return locateVisibleIndex(container, els, minimumVisibleRate, true);
}
exports.locateLastVisibleIndex = locateLastVisibleIndex;
function locateVisibleIndex(container, els, minimumVisibleRate, locateLast) {
    let containerRect = container.getBoundingClientRect();
    let index = array_1.binaryFindIndexToInsert(els, (el) => {
        let rect = el.getBoundingClientRect();
        let yIntersect = Math.min(containerRect.bottom, rect.bottom) - Math.max(containerRect.top, rect.top);
        let intersectRate = yIntersect / Math.min(containerRect.height, rect.height);
        // Fully above.
        if (rect.bottom < containerRect.top) {
            return 1;
        }
        // Fully behind.
        else if (rect.top > containerRect.bottom) {
            return -1;
        }
        // Partly cross in top position.
        else if (rect.top < containerRect.top && intersectRate < minimumVisibleRate) {
            return 1;
        }
        // Partly cross in bottom position.
        else if (rect.bottom < containerRect.bottom && intersectRate < minimumVisibleRate) {
            return -1;
        }
        // Enough percentage that intersect with.
        // If `preferLast` is true, prefer moving to right.
        else {
            return locateLast ? 1 : -1;
        }
    });
    if (locateLast) {
        if (index > 0) {
            index -= 1;
        }
    }
    return index;
}


/***/ }),

/***/ "../ff/out/dom/file.js":
/*!*****************************!*\
  !*** ../ff/out/dom/file.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesFromTransfer = exports.selectMultipleFolders = exports.selectFolder = exports.selectMultipleFile = exports.selectFile = exports.downloadText = exports.downloadURL = void 0;
const base_1 = __webpack_require__(/*! ../base */ "../ff/out/base/index.js");
/**
 * Download url as a file with specified `fileName`.
 * Not that `fileName` may not work for crossed domain resources in some browsers.
 * @param url The URL to download.
 * @param fileName The file name.
 */
function downloadURL(url, fileName) {
    let a = document.createElement('a');
    a.hidden = true;
    a.href = url;
    if (fileName) {
        a.download = fileName;
    }
    document.body.appendChild(a);
    a.click();
    a.remove();
}
exports.downloadURL = downloadURL;
/**
 * Download string as a file with specified `fileName`.
 * Not that `fileName` may not work for crossed domain resources in some browsers.
 * @param fileName The file name.
 * @param text The text to download.
 * @param mime The MIME type of file.
 */
function downloadText(fileName, text, type = 'text/plain') {
    let blob = new Blob([text], { type });
    let fs = new FileReader;
    fs.onload = () => {
        fs.onload = null;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = fs.result;
        document.body.append(a);
        a.click();
        a.remove();
    };
    fs.readAsDataURL(blob);
}
exports.downloadText = downloadText;
/**
 * Select a single file that matches `MIME` type from clicking a `<input type="file">`.
 * @param The MIME type of files.
 */
function selectFile(mime) {
    return selectFileOrFolder(mime, false, false);
}
exports.selectFile = selectFile;
/**
 * Select multiple files match `MIME` type from clicking a `<input type="file" multiple>`.
 * @param The MIME type of files.
 */
function selectMultipleFile(mime) {
    return selectFileOrFolder(mime, false, true);
}
exports.selectMultipleFile = selectMultipleFile;
/** Select a single folder from clicking a `<input type="file" directory>`. */
function selectFolder() {
    return selectFileOrFolder("*", true, false);
}
exports.selectFolder = selectFolder;
/** Select multiple folders from clicking a `<input type="file" directory multiple>`. */
function selectMultipleFolders() {
    return selectFileOrFolder("*", true, true);
}
exports.selectMultipleFolders = selectMultipleFolders;
/** Select file or folder, multiple or not. */
function selectFileOrFolder(mime, isFolder, isMultiple) {
    return new Promise((resolve) => {
        let input = document.createElement('input');
        input.type = 'file';
        input.hidden = true;
        input.accept = mime;
        input.multiple = isMultiple;
        if (isFolder) {
            input.setAttribute('directory', '');
            input.setAttribute('webkitdirectory', '');
        }
        input.onchange = () => {
            if (input.files) {
                resolve(isMultiple ? [...input.files] : input.files[0] || null);
            }
            else {
                resolve(null);
            }
        };
        async function onDomFocus() {
            await base_1.sleep(1000);
            document.removeEventListener('focus', onDomFocus, false);
            input.onchange = null;
            input.remove();
        }
        document.addEventListener('focus', onDomFocus, false);
        document.body.appendChild(input);
        input.click();
    });
}
/**
 * Get files in `DataTransfer` object that captured from drop event.
 * Only work on Chrome.
 * @param transfer The ` DataTransfer` object from drop event.
 */
async function getFilesFromTransfer(transfer) {
    let transferFiles = [...transfer.files];
    let files = [];
    if (transfer.items && typeof DataTransferItem === 'function' && (DataTransferItem.prototype.hasOwnProperty('getAsEntry') || DataTransferItem.prototype.webkitGetAsEntry)) {
        let items = [...transfer.items].filter(item => item.kind === 'file');
        try {
            for (let item of items) {
                let entry = item.hasOwnProperty('getAsEntry') ? item.getAsEntry() : item.webkitGetAsEntry();
                files.push(...await readFilesFromEntry(entry));
            }
        }
        catch (err) {
            files = transferFiles;
        }
    }
    // Can only read files
    else {
        files = transferFiles;
    }
    return files;
}
exports.getFilesFromTransfer = getFilesFromTransfer;
/** Read files from a file entry. */
async function readFilesFromEntry(entry) {
    let files = [];
    return new Promise(async (resolve, reject) => {
        if (!entry) {
            resolve([]);
        }
        else if (entry.isFile) {
            entry.file((file) => {
                file.path = file.path || entry.fullPath;
                files.push(file);
                resolve(files);
            }, reject);
        }
        else if (entry.isDirectory) {
            let reader = entry.createReader();
            try {
                while (true) {
                    let filesInFolder = await readFilesFromDirectoryReader(reader);
                    files.push(...filesInFolder);
                    if (!filesInFolder.length) {
                        break;
                    }
                }
            }
            catch (err) {
                reject(err);
            }
            resolve(files);
        }
    });
}
/** Read files from a directory reader. */
function readFilesFromDirectoryReader(reader) {
    return new Promise((resolve, reject) => {
        let files = [];
        // readEntries API can only read at most 100 files each time, so if reader isn't completed, still read it.
        reader.readEntries(async (entries) => {
            if (entries && entries.length) {
                try {
                    for (let entry of entries) {
                        files.push(...await readFilesFromEntry(entry));
                    }
                }
                catch (err) {
                    reject(err);
                }
                resolve(files);
            }
            else {
                resolve(files);
            }
        }, reject);
    });
}


/***/ }),

/***/ "../ff/out/dom/html.js":
/*!*****************************!*\
  !*** ../ff/out/dom/html.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHTML = exports.encodeHTML = void 0;
/**
 * Encode `<>` to `&...` to makesure HTML codes are safely to be appended into document.
 * @param code Text to be encoded.
 */
function encodeHTML(code) {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
exports.encodeHTML = encodeHTML;
/**
 * Decode HTML codes which includes `&...` to be readable characters.
 * @param code Encoded HTML codes.
 */
function decodeHTML(code) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(`<!DOCTYPE html><body>${code}</body></html>`, 'text/html');
    return dom.body.textContent;
}
exports.decodeHTML = decodeHTML;


/***/ }),

/***/ "../ff/out/dom/index.js":
/*!******************************!*\
  !*** ../ff/out/dom/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./style */ "../ff/out/dom/style.js"), exports);
__exportStar(__webpack_require__(/*! ./element */ "../ff/out/dom/element.js"), exports);
__exportStar(__webpack_require__(/*! ./align */ "../ff/out/dom/align.js"), exports);
__exportStar(__webpack_require__(/*! ./scroll */ "../ff/out/dom/scroll.js"), exports);
__exportStar(__webpack_require__(/*! ./animate */ "../ff/out/dom/animate.js"), exports);
__exportStar(__webpack_require__(/*! ./mouse-leave */ "../ff/out/dom/mouse-leave.js"), exports);
__exportStar(__webpack_require__(/*! ./file */ "../ff/out/dom/file.js"), exports);
__exportStar(__webpack_require__(/*! ./query */ "../ff/out/dom/query.js"), exports);
__exportStar(__webpack_require__(/*! ./storage */ "../ff/out/dom/storage.js"), exports);
__exportStar(__webpack_require__(/*! ./watch-layout */ "../ff/out/dom/watch-layout.js"), exports);
__exportStar(__webpack_require__(/*! ./net */ "../ff/out/dom/net.js"), exports);
__exportStar(__webpack_require__(/*! ./html */ "../ff/out/dom/html.js"), exports);
__exportStar(__webpack_require__(/*! ./timing */ "../ff/out/dom/timing.js"), exports);


/***/ }),

/***/ "../ff/out/dom/mouse-leave.js":
/*!************************************!*\
  !*** ../ff/out/dom/mouse-leave.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseLeave = void 0;
/**
 * It's common that popup2 triggered from an existing popup1,
 * later when mouse moved to popup2, popup1 should disappear because mouse leaves.
 * This is not correct, so we implemented a mouse popup stack and keep parent visible when child still having mouse inside.
 *
 * Caution: never forget to unregister mouse leave binding before elements disconnected.
 */
var MouseLeave;
(function (MouseLeave) {
    /** Existed mouse leave controllers. */
    const Controllers = new Set();
    /** Add one controller. */
    function addControler(controller) {
        Controllers.add(controller);
    }
    MouseLeave.addControler = addControler;
    /** Delete one controller. */
    function deleteControler(controller) {
        Controllers.delete(controller);
    }
    MouseLeave.deleteControler = deleteControler;
    /**
     * Make sure `trigger` and all their ancestors can't call mouse leave callback and always visible.
     * Normally used for contextmenu to keep parent popup visible.
     * @param trigger Element to keep visible.
     * @param popup Popup element that lock trigger element for preview. You should always provide this except there is no popup element.
     */
    function lock(trigger, popup = null) {
        // 1. When popup2 generated, we check the trigger element if it was contained (not equal) in element of existing popups.
        // 2. If so, we lock the exist popup until popup2 disappeared.
        let controller = getControllerWhichPopupContains(trigger);
        if (controller) {
            controller.requestLock(trigger, popup);
        }
    }
    MouseLeave.lock = lock;
    /**
     * Release locking `trigger` element.
     * @param trigger Element don't want to keep anymore.
     * @param popup Popup element that lock trigger element for preview. You should always provide this except there is no popup element.
     */
    function unlock(trigger, popup = null) {
        let controller = getControllerWhichPopupContains(trigger);
        if (controller) {
            controller.releaseLock(trigger, popup);
        }
    }
    MouseLeave.unlock = unlock;
    /** Get Controller whose related elements contains and or equal one of specified elements. */
    function getControllerWhichPopupContains(trigger) {
        for (let controller of [...Controllers].reverse()) {
            if (controller.popup.contains(trigger)) {
                return controller;
            }
        }
        return null;
    }
    /**
     * Checks whether element or any of it's ancestors was kept to be visible.
     * If element is not locked, you can destroy or reuse it immediately.
     * @param el Element to check, normally a popup element.
     */
    function checkLocked(el) {
        for (let controller of [...Controllers].reverse()) {
            if (controller.popup.contains(el)) {
                return controller.beLocked();
            }
        }
        return false;
    }
    MouseLeave.checkLocked = checkLocked;
    /**
     * Call `callback` after mouse leaves all of the elements for `ms` milliseconds.
     * It's very usefull to handle mouse hover event in menu & submenu.
     * @param els Single element or element array to capture leaves at.
     * @param callback The callback to call after mouse leaves all the elements.
     * @param options Leave control options.
     */
    function on(trigger, popup, callback, options) {
        let controller = new MouseLeaveController(trigger, popup, false, callback, options);
        return () => controller.cancel();
    }
    MouseLeave.on = on;
    /**
     * Call `callback` after mouse leaves all of the elements for `ms` milliseconds, only trigger `callback` for once.
     * It's very usefull to handle mouse event in menu & submenu.
     * @param els els Single element or element array to capture leaves at.
     * @param callback The callback to call after mouse leaves all the elements.
     * @param options Leave control options.
     */
    function once(trigger, popup, callback, options) {
        let controller = new MouseLeaveController(trigger, popup, true, callback, options);
        return () => controller.cancel();
    }
    MouseLeave.once = once;
})(MouseLeave = exports.MouseLeave || (exports.MouseLeave = {}));
class MouseLeaveController {
    constructor(trigger, popup, isOnce, callback, options = {}) {
        var _a;
        /** Is mouse inside any of `els`. */
        this.mouseIn = false;
        /** Elements that locked current popup and make it to be visible. */
        this.locks = new Map();
        /** Is the controller canceld. */
        this.ended = false;
        /** Timeout to countdown time delay for calling `callback` */
        this.timeout = null;
        this.trigger = trigger;
        this.popup = popup;
        this.isOnce = isOnce;
        this.callback = callback;
        this.delay = (_a = options.delay) !== null && _a !== void 0 ? _a : 200;
        if (options.mouseIn) {
            this.onMouseEnter();
        }
        this.bindedOnMouseEnter = this.onMouseEnter.bind(this);
        this.bindedOnMouseLeave = this.onMouseLeave.bind(this);
        for (let el of [trigger, popup]) {
            el.addEventListener('mouseenter', this.bindedOnMouseEnter, false);
            el.addEventListener('mouseleave', this.bindedOnMouseLeave, false);
        }
        MouseLeave.addControler(this);
    }
    onMouseEnter() {
        this.mouseIn = true;
        MouseLeave.lock(this.trigger, this.popup);
        this.clearTimeout();
    }
    onMouseLeave() {
        this.mouseIn = false;
        MouseLeave.unlock(this.trigger, this.popup);
        if (!this.beLocked()) {
            this.startTimeout();
        }
    }
    startTimeout() {
        this.clearTimeout();
        this.timeout = setTimeout(() => this.onTimeout(), this.delay);
    }
    startTimeoutIfNot() {
        if (!this.timeout) {
            this.startTimeout();
        }
    }
    onTimeout() {
        this.timeout = null;
        if (!this.mouseIn) {
            this.flush();
        }
    }
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    flush() {
        if (this.ended) {
            return;
        }
        if (this.isOnce) {
            this.cancel();
        }
        else {
            this.releaseAllLocks();
        }
        this.callback();
    }
    cancel() {
        if (this.ended) {
            return;
        }
        this.clearTimeout();
        for (let el of [this.trigger, this.popup]) {
            el.removeEventListener('mouseenter', this.bindedOnMouseEnter, false);
            el.removeEventListener('mouseleave', this.bindedOnMouseLeave, false);
        }
        MouseLeave.unlock(this.trigger, this.popup);
        this.releaseAllLocks();
        this.ended = true;
        MouseLeave.deleteControler(this);
    }
    /** Whether was locked to keep visible. */
    beLocked() {
        return this.locks.size > 0;
    }
    /** Lock because want to keep `el` visible, request comes from `popup`. */
    requestLock(el, popup) {
        this.clearTimeout();
        let identifiers = this.locks.get(el);
        if (!identifiers) {
            identifiers = new Set();
            this.locks.set(el, identifiers);
        }
        identifiers.add(popup);
        // Mouse leave will cause unlock in sequence,
        // So after mouse in, must relock in sequence.
        MouseLeave.lock(this.trigger, popup);
    }
    /** Release a lock. */
    releaseLock(el, popup) {
        let identifiers = this.locks.get(el);
        if (identifiers) {
            identifiers.delete(popup);
            if (identifiers.size === 0) {
                this.locks.delete(el);
            }
        }
        MouseLeave.unlock(this.trigger, popup);
        // May already started timeout because of mouse leave.
        if (!this.beLocked() && !this.mouseIn) {
            MouseLeave.unlock(this.trigger, this.popup);
            this.startTimeoutIfNot();
        }
    }
    /**
     * Release all locks that from outside.
     * This method is not required if everything goes well.
     * But implement it will make it stronger.
     */
    releaseAllLocks() {
        for (let [el, popups] of this.locks) {
            for (let popup of popups) {
                MouseLeave.unlock(el, popup);
            }
        }
        this.locks = new Map();
    }
}


/***/ }),

/***/ "../ff/out/dom/net.js":
/*!****************************!*\
  !*** ../ff/out/dom/net.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = exports.ResourceLoader = void 0;
const base_1 = __webpack_require__(/*! ../base */ "../ff/out/base/index.js");
/**
 * Preload resources from their urls, and get total progress notifications.
 * Please beware of the CORS settings at the server.
 * If you want the progress working, please makesure the `content-length` response header is available.
 */
class ResourceLoader extends base_1.Emitter {
    constructor(options = {}) {
        var _a;
        super();
        /** URL base. */
        this.base = '';
        this.loaded = 0;
        this.loadedCount = 0;
        this.totalCount = 0;
        this.base = (_a = options.base) !== null && _a !== void 0 ? _a : '';
        this.on('finish', () => {
            this.loaded = 0;
            this.loadedCount = 0;
            this.totalCount = 0;
        });
    }
    /** Returns a promise which will be resolved after all loading resources loaded. */
    untilFinish() {
        return new Promise((resolve, reject) => {
            this.once('finish', resolve);
            this.once('error', reject);
        });
    }
    /** Load one resource. */
    async load(url, type) {
        this.totalCount++;
        let lastLoadedRate = 0;
        return new Promise(async (resolve, reject) => {
            try {
                let blob = await this.loadResourceBlob(url, (loaded, total) => {
                    let newLoadedRate = loaded / total || 0;
                    this.loaded += newLoadedRate - lastLoadedRate;
                    lastLoadedRate = newLoadedRate;
                    this.emit('progress', Math.min(this.loaded, this.totalCount), this.totalCount);
                });
                let response = blob ? await this.getFromBlob(blob, type || 'blob') : null;
                this.loadedCount++;
                this.emit('progress', this.loadedCount, this.totalCount);
                if (this.loadedCount === this.totalCount) {
                    this.emit('finish');
                }
                resolve(response);
            }
            catch (err) {
                reject(err);
                this.emit('error', err);
            }
        });
    }
    /** Load as text string. */
    async loadText(url) {
        return await this.load(url, 'text');
    }
    /** Load as json data. */
    async loadJSON(url) {
        return await this.load(url, 'json');
    }
    /** Load as blob. */
    async loadBlob(url) {
        return await this.load(url, 'blob');
    }
    /** Load as an array buffer. */
    async loadBuffer(url) {
        return await this.load(url, 'buffer');
    }
    /** Load css source and append into document. */
    async loadCSS(url) {
        return await this.load(url, 'css');
    }
    /** Load js source and append into document. */
    async loadJS(url) {
        return await this.load(url, 'js');
    }
    /** Load as an image element. */
    async loadImage(url) {
        return await this.load(url, 'image');
    }
    /** Load as an audio element. */
    async loadAudio(url) {
        return await this.load(url, 'audio');
    }
    /** Load as an video element. */
    async loadVideo(url) {
        return await this.load(url, 'video');
    }
    /** Convert relative URL to absolute type. */
    getAbsoluteURL(url) {
        if (/^(?:https?:|\/\/)/.test(url) || !this.base) {
            return url;
        }
        return this.base + url;
    }
    /** Load one resource. */
    async loadResourceBlob(url, onprogress) {
        let absloteURL = this.getAbsoluteURL(url);
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('GET', absloteURL);
            xhr.onprogress = (e) => {
                if (e.lengthComputable) {
                    onprogress(e.loaded, e.total);
                }
            };
            xhr.onloadend = () => {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr.response);
                }
                else {
                    reject();
                }
            };
            xhr.send();
        });
    }
    /** Handle resource returned blob data. */
    async getFromBlob(blob, type) {
        let response;
        if (type === 'blob') {
            response = blob;
        }
        else if (type === 'css') {
            response = await this.loadStyle(blob);
        }
        else if (type === 'js') {
            response = await this.loadScript(blob);
        }
        else if (type === 'text') {
            response = this.getAsText(blob);
        }
        else if (type === 'json') {
            response = this.getAsJSON(blob);
        }
        else if (type === 'buffer') {
            response = this.getAsBuffer(blob);
        }
        else if (type === 'image') {
            response = this.getAsImage(blob);
        }
        else if (type === 'audio') {
            response = this.getAsAudio(blob);
        }
        else if (type === 'video') {
            response = this.getAsVideo(blob);
        }
        return response;
    }
    /** Load style resource as a style tag. */
    loadStyle(blob) {
        return new Promise((resolve, reject) => {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = URL.createObjectURL(blob);
            document.head.append(link);
            link.addEventListener('load', () => resolve(link));
            link.addEventListener('error', () => reject());
        });
    }
    /** Load script resource as a script tag. */
    loadScript(blob) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.async = false;
            script.src = URL.createObjectURL(blob);
            document.head.append(script);
            script.addEventListener('load', () => resolve(script));
            script.addEventListener('error', () => reject());
        });
    }
    /** Get resource blob as text.*/
    getAsText(blob) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsText(blob);
        });
    }
    /** Get resource blob as JSON. */
    async getAsJSON(blob) {
        let text = await this.getAsText(blob);
        if (!text) {
            return null;
        }
        return JSON.parse(text);
    }
    /** Get resource blob as array buffer. */
    async getAsBuffer(blob) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = err => {
                reject(err);
            };
            reader.readAsArrayBuffer(blob);
        });
    }
    /**
     * Get resource as image.
     * Never forget to detach blob url of the image after not use it anymore.
     */
    async getAsImage(blob) {
        return new Promise((resolve, reject) => {
            let blobURL = URL.createObjectURL(blob);
            let img = new Image();
            img.src = blobURL;
            img.onload = () => resolve(img);
            img.onerror = err => reject(err);
        });
    }
    /**
     * Get resource blob as audio element.
     * Never forget to detach blob url of the image after not use it anymore.
     */
    async getAsAudio(blob) {
        return new Promise((resolve, reject) => {
            let blobURL = URL.createObjectURL(blob);
            let audio = document.createElement('audio');
            audio.preload = 'auto';
            audio.oncanplaythrough = () => {
                resolve(audio);
            };
            audio.onerror = err => {
                reject(err);
            };
            audio.src = blobURL;
        });
    }
    /**
     * Get resource blob as video element.
     * Never forget to detach blob url of the image after not use it anymore.
     */
    async getAsVideo(blob) {
        return new Promise((resolve, reject) => {
            let blobURL = URL.createObjectURL(blob);
            let video = document.createElement('video');
            video.preload = 'auto';
            video.oncanplaythrough = () => {
                resolve(video);
            };
            video.onerror = err => {
                reject(err);
            };
            video.src = blobURL;
        });
    }
}
exports.ResourceLoader = ResourceLoader;
/** Default loader to load miscellaneous resources. */
exports.loader = new ResourceLoader();


/***/ }),

/***/ "../ff/out/dom/query.js":
/*!******************************!*\
  !*** ../ff/out/dom/query.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = exports.parseQuery = void 0;
/**
 * Parse `url` search part to a query parameter object.
 * @param url The url to parse query parameters.
 */
function parseQuery(url) {
    let match = url.match(/\?(.+)/);
    let pieces = match ? match[1].split('&') : [];
    let query = {};
    for (let piece of pieces) {
        let [key, value] = piece.split('=');
        if (key) {
            value = decodeURIComponent(value || '');
            query[key] = value;
        }
    }
    return query;
}
exports.parseQuery = parseQuery;
/**
 * Combine base `url` and `query` parameters to a new URL.
 * @param url The base url.
 * @param query The query parameter object.
 */
function useQuery(url, query) {
    let hasQuery = url.includes('?');
    if (typeof query === 'string') {
        return url + (hasQuery ? '&' : '?') + query;
    }
    else if (query && typeof query === 'object') {
        for (let key in query) {
            let value = encodeURIComponent(query[key]);
            url += (hasQuery ? '&' : '?') + key + '=' + value;
            hasQuery = true;
        }
    }
    return url;
}
exports.useQuery = useQuery;


/***/ }),

/***/ "../ff/out/dom/scroll.js":
/*!*******************************!*\
  !*** ../ff/out/dom/scroll.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToTop = exports.getScrollOffset = exports.getScrollDirection = exports.scrollToView = exports.getClosestScrollWrapper = exports.getScrollbarWidth = exports.isContentOverflow = void 0;
const animate_1 = __webpack_require__(/*! ./animate */ "../ff/out/dom/animate.js");
/**
 * Returns if content of element overflow and element is scrollable.
 * May return `true` although element has no scroll bar.
 * Note that this method may cause reflow.
 * @param el The element to check overflow state.
 */
function isContentOverflow(el) {
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
exports.isContentOverflow = isContentOverflow;
/** Cached scroll bar width. */
let scrollBarWidth = null;
/**
 * Get scroll bar width.
 * After first time running, the returned value will keep unchanged.
 * Note that this method will cause reflow for the first time.
 */
function getScrollbarWidth() {
    if (scrollBarWidth !== null) {
        return scrollBarWidth;
    }
    let div = document.createElement('div');
    div.style.cssText = 'width:100px; height:100px; overflow:scroll; position:absolute; left:-100px; top:-100px;';
    document.body.append(div);
    scrollBarWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollBarWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
/**
 * Find the closest scroll wrapper, which has `overflow: auto / scroll` set.
 * Note that this method may cause reflow.
 * @param el The element to check scroll wrapper.
 */
function getClosestScrollWrapper(el) {
    while (el
        && el.scrollWidth <= el.clientWidth
        && el.scrollHeight <= el.clientHeight) {
        el = el.parentElement;
    }
    return el;
}
exports.getClosestScrollWrapper = getClosestScrollWrapper;
/**
 * Scroll scrollbars of closest scroll wrapper for minimal distance to make element be fully visible.
 * Returns `true` if scrolled.
 * @param el The element you want to see.
 * @param gap Keep a little distance from the element's edge to the viewport's edge.
 * @param duration If specified, will run an animation when scrolling.
 * @param easing The animation esing.
 */
function scrollToView(el, gap = 0, duration = 0, easing = 'ease-out') {
    let wrapper = getClosestScrollWrapper(el);
    if (!wrapper) {
        return false;
    }
    let direction = getScrollDirection(wrapper);
    if (!direction) {
        return false;
    }
    if (direction === 'y') {
        let oldScrollY = wrapper.scrollTop;
        let newScrollY = null;
        let offsetY = getScrollOffset(el, wrapper, direction);
        // Needs to scroll for pxs to top edges align
        let topOffset = offsetY - gap - oldScrollY;
        // Needs to scroll for pxs to bottom edges align
        let botOffset = offsetY + el.offsetHeight + gap - wrapper.clientHeight - oldScrollY;
        // Needs to scroll up
        if (topOffset < 0 && botOffset < 0) {
            newScrollY = Math.max(topOffset, botOffset) + oldScrollY;
        }
        // Needs to scroll down
        else if (botOffset > 0 && topOffset > 0) {
            newScrollY = Math.min(botOffset, topOffset) + oldScrollY;
        }
        if (newScrollY !== null && newScrollY !== oldScrollY) {
            if (duration) {
                animate_1.animateStyleValueTo(wrapper, 'scrollTop', newScrollY, duration, easing);
            }
            else {
                wrapper.scrollTop = newScrollY;
            }
            return true;
        }
        return false;
    }
    if (direction === 'x') {
        let offsetX = getScrollOffset(el, wrapper, direction);
        let scrollX = wrapper.scrollLeft;
        let newScrollX = 0;
        let startOffset = offsetX - gap - scrollX;
        let endOffset = offsetX + el.offsetWidth + gap - scrollX - wrapper.clientWidth;
        if (startOffset < 0 && endOffset < 0 || el.offsetWidth > wrapper.clientWidth) {
            newScrollX = Math.max(0, offsetX - gap);
        }
        else if (endOffset > 0 && startOffset > 0) {
            newScrollX = Math.min(wrapper.scrollWidth, offsetX + el.offsetWidth + gap) - wrapper.clientWidth;
        }
        if (newScrollX !== scrollX) {
            if (duration) {
                animate_1.animateStyleValueTo(wrapper, 'scrollLeft', newScrollX, duration, easing);
            }
            else {
                wrapper.scrollLeft = newScrollX;
            }
            return true;
        }
    }
    return false;
}
exports.scrollToView = scrollToView;
/**
 * Get the scroll direction of scroll wrapper, may be `'x' | 'y' | ''`.
 * @param wrapper The element to check scroll direction.
 */
function getScrollDirection(wrapper) {
    let direction = null;
    if (wrapper.scrollHeight > wrapper.clientHeight) {
        direction = 'y';
    }
    else if (wrapper.scrollWidth > wrapper.clientWidth) {
        direction = 'x';
    }
    return direction;
}
exports.getScrollDirection = getScrollDirection;
/**
 * Get element's top or left offset from it's scroll wrapper's scrollable start edges,
 * which also means the scroll wrapper's scrollTop property value when top edges match.
 * This value is not affected by current scroll position.
 * @param el The element to test offset.
 * @param wrapper The scroll wrapper.
 * @param direction The scroll direction, `'x' | 'y'`.
 */
function getScrollOffset(el, wrapper, direction) {
    let prop = direction === 'x' ? 'offsetLeft' : 'offsetTop';
    let parent = el.offsetParent;
    let y = el[prop];
    if (!parent || parent === wrapper) { }
    else if (parent.contains(wrapper)) {
        y -= wrapper[prop];
    }
    else {
        while (parent.offsetParent && parent.offsetParent !== wrapper) {
            parent = parent.offsetParent;
            y += parent[prop];
        }
    }
    return y;
}
exports.getScrollOffset = getScrollOffset;
/**
 * Scroll scrollbars to make element in the top of the viewport area.
 * Returns `true` if scrolled.
 * @param el The element you want to see.
 * @param gap Keep a little distance from the element's edge to the viewport's edge.
 * @param duration If specified, will run an animation when scrolling.
 * @param easing The animation esing.
 */
function scrollToTop(el, gap = 0, duration = 0, easing = 'ease-out') {
    let wrapper = getClosestScrollWrapper(el);
    if (!wrapper) {
        return false;
    }
    let offsetY = getScrollOffset(el, wrapper, 'y');
    let oldScrollY = wrapper.scrollTop;
    let newScrollY = Math.max(0, offsetY - gap);
    if (newScrollY !== oldScrollY) {
        if (duration) {
            animate_1.animateStyleValueTo(wrapper, 'scrollTop', newScrollY, duration, easing);
        }
        else {
            wrapper.scrollTop = newScrollY;
        }
        return true;
    }
    return false;
}
exports.scrollToTop = scrollToTop;


/***/ }),

/***/ "../ff/out/dom/storage.js":
/*!********************************!*\
  !*** ../ff/out/dom/storage.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.storage = void 0;
const emitter_1 = __webpack_require__(/*! ../base/emitter */ "../ff/out/base/emitter.js");
class JSONStorage {
    constructor(prefix) {
        /** Key prefix to identify self set local storage properties. */
        this.prefix = '';
        /** Expire suffix of properties to mark expire time. */
        this.expireSuffix = '_expires_';
        /** Supported state cache. */
        this.supported = null;
        this.prefix = prefix;
    }
    /**
     * Test whether local storage is supported.
     * Will return `false` in browser's private mode.
     */
    isSupported() {
        if (this.supported !== null) {
            return this.supported;
        }
        try {
            let key = this.prefix + 'test_supported';
            localStorage[key] = 1;
            delete localStorage[key];
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Test whether has set `key` in local storage.
     * @param key The key of the data item.
     */
    has(key) {
        if (!this.isSupported()) {
            return null;
        }
        key = this.prefix + key;
        return key in localStorage;
    }
    get(key, defaultValue = null) {
        if (!this.isSupported()) {
            return null;
        }
        key = this.prefix + key;
        let value = localStorage[key];
        if (value === undefined) {
            return defaultValue;
        }
        if (value && typeof value === 'string') {
            try {
                value = JSON.parse(value);
                let expires = localStorage[key + this.expireSuffix];
                if (expires && expires < Date.now()) {
                    delete localStorage[key];
                    delete localStorage[key + this.expireSuffix];
                    return defaultValue;
                }
                else {
                    return value;
                }
            }
            catch (err) {
                return defaultValue;
            }
        }
        else {
            return defaultValue;
        }
    }
    /**
     * Cache json data into local storage by `key`.
     * Returns `true` if cached.
     * @param key The key of the data item.
     * @param value The json data to cache.
     * @param expires An optional expire time in second.
     */
    set(key, value, expires) {
        if (!this.isSupported()) {
            return null;
        }
        key = this.prefix + key;
        localStorage[key] = JSON.stringify(value);
        if (expires && expires > 0) {
            localStorage[key + this.expireSuffix] = Date.now() + expires * 1000;
        }
        return true;
    }
    /**
     * Delete cached json data in localStorage by `key`.
     * Returns `true` if deleted.
     * @param key The key of the data item.
     */
    delete(key) {
        if (!this.isSupported()) {
            return null;
        }
        key = this.prefix + key;
        delete localStorage[key + this.expireSuffix];
        return delete localStorage[key];
    }
    /**
     * Returns a new storage to cache data using `namespace` as prefix.
     * @param namespace The prefix of keys.
     */
    group(namespace) {
        return new JSONStorage(this.prefix + '_' + namespace);
    }
}
/** Like `LocalStorage` very much, except here it read and write JSON datas. */
exports.storage = new JSONStorage('_ff_');
/** Used to caches settings, can restore them after reload page. */
class Settings extends emitter_1.Emitter {
    constructor(storageKey, defaultData) {
        super();
        this.willSave = false;
        this.storageKey = storageKey;
        this.defaultData = defaultData;
        this.initializeDate();
    }
    initializeDate() {
        let defaultKeys = Object.keys(this.defaultData);
        let storageData = this.getStorageData();
        // Key must exist in default data.
        if (storageData) {
            for (let key of Object.keys(storageData)) {
                if (!defaultKeys.includes(key)) {
                    delete (storageData[key]);
                }
            }
        }
        this.storageData = storageData || {};
    }
    /** Returns whether have set this property. */
    has(key) {
        return this.storageData.hasOwnProperty(key);
    }
    /** Get setting value by key. */
    get(key) {
        if (this.has(key)) {
            return this.storageData[key];
        }
        else {
            return this.defaultData[key];
        }
    }
    /** Set setting value by key. */
    set(key, value) {
        if (value !== this.storageData[key] || typeof value === 'object') {
            this.storageData[key] = value;
            this.saveStorageData();
            this.emit('change', key);
        }
    }
    /** Delete a storage value by it's key. */
    delete(key) {
        if (this.has(key)) {
            delete this.storageData[key];
            this.saveStorageData();
        }
    }
    /** Get raw data from local storage. */
    getStorageData() {
        return exports.storage.get(this.storageKey);
    }
    /** Save data to local storage, note it doesn't save immediately. */
    saveStorageData() {
        if (!this.willSave) {
            Promise.resolve().then(() => {
                this.saveStorageDataImmediately();
                this.willSave = false;
            });
            this.willSave = true;
        }
    }
    /** Save data to local storage, note it doesn't save immediately. */
    saveStorageDataImmediately() {
        exports.storage.set(this.storageKey, this.storageData);
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "../ff/out/dom/style.js":
/*!******************************!*\
  !*** ../ff/out/dom/style.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setStyleValues = exports.setStyleValue = exports.getStyleValue = exports.getStyleValueAsNumber = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "../ff/out/dom/utils.js");
/**
 * Get computed style value as number from element.
 * Note that this method may cause reflow.
 * @param el The element to get numeric value.
 * @param property The property name in camer case, `backgroundColor` as example.
 */
function getStyleValueAsNumber(el, property) {
    let value = getStyleValue(el, property);
    return value ? parseFloat(value) || 0 : 0;
}
exports.getStyleValueAsNumber = getStyleValueAsNumber;
/**
 * Get computed style value from element.
 * Note that this method may cause reflow.
 * @param el The element to get style value.
 * @param propertyName The property name in camer case, `backgroundColor` as example.
 */
function getStyleValue(el, propertyName) {
    return getComputedStyle(el)[propertyName];
}
exports.getStyleValue = getStyleValue;
/**
 * Set value of specified `property` for element.
 * @param el The element to set CSS value.
 * @param propertyName The property name in camel case. `backgroundColor` as example.
 * @param value The value in string or number type. E.g.: value `100` for `width` property wil be fixed to `100px`.
 */
function setStyleValue(el, propertyName, value) {
    el.style.setProperty(propertyName, utils_1.normativeStyleValue(propertyName, value));
}
exports.setStyleValue = setStyleValue;
/**
 * Assign styles whose properties and values specified by `propertyMap` to element.
 * @param el The element to set CSS values.
 * @param propertyMap The property name in camel case, `backgroundColor` as example.
 */
function setStyleValues(el, propertyMap) {
    for (let prop of Object.keys(propertyMap)) {
        setStyleValue(el, prop, propertyMap[prop]);
    }
}
exports.setStyleValues = setStyleValues;


/***/ }),

/***/ "../ff/out/dom/timing.js":
/*!*******************************!*\
  !*** ../ff/out/dom/timing.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDocumentComplete = exports.ensureWindowLoaded = void 0;
/**
 * Returns a promise which will be resolved after window loaded,
 * or resolved immediately if window is already loaded.
 */
function ensureWindowLoaded() {
    return new Promise(resolve => {
        let entrys = window.performance.getEntriesByType("navigation");
        if (entrys.length > 0 && entrys[0].loadEventEnd > 0) {
            resolve();
        }
        else {
            window.addEventListener('load', () => resolve());
        }
    });
}
exports.ensureWindowLoaded = ensureWindowLoaded;
/**
 * Returns a promise which will be resolved after document completed,
 * or resolved immediately if document is already completed.
 */
function ensureDocumentComplete() {
    return new Promise(resolve => {
        let entrys = window.performance.getEntriesByType("navigation");
        if (entrys.length > 0 && entrys[0].domContentLoadedEventEnd > 0) {
            resolve();
        }
        else {
            document.addEventListener('DOMContentLoaded', () => resolve(), false);
        }
    });
}
exports.ensureDocumentComplete = ensureDocumentComplete;


/***/ }),

/***/ "../ff/out/dom/utils.js":
/*!******************************!*\
  !*** ../ff/out/dom/utils.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.normativeStyleObject = exports.normativeStyleValue = void 0;
/** Format number type value to a standard style value. */
function normativeStyleValue(property, value) {
    if (typeof value === 'number' && /(?:width|height|left|right|top|bottom|size)$/i.test(property)) {
        value = value + 'px';
    }
    else {
        value = value.toString();
    }
    return value;
}
exports.normativeStyleValue = normativeStyleValue;
/** Format number type value of the object to a standard style value. */
function normativeStyleObject(styleObject) {
    for (let property of Object.keys(styleObject)) {
        styleObject[property] = normativeStyleValue(property, styleObject[property]);
    }
    return styleObject;
}
exports.normativeStyleObject = normativeStyleObject;


/***/ }),

/***/ "../ff/out/dom/watch-layout.js":
/*!*************************************!*\
  !*** ../ff/out/dom/watch-layout.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutWatcher = exports.watchLayoutUntil = exports.watchLayoutOnce = exports.watchLayout = void 0;
const base_1 = __webpack_require__(/*! ../base */ "../ff/out/base/index.js");
const element_1 = __webpack_require__(/*! ./element */ "../ff/out/dom/element.js");
const WatchStateFns = {
    show(el) {
        return el.offsetWidth > 0 || el.offsetHeight > 0;
    },
    hide(el) {
        return el.offsetWidth === 0 && el.offsetHeight === 0;
    },
    inview(el) {
        return element_1.isVisibleInViewport(el);
    },
    outview(el) {
        return !element_1.isVisibleInViewport(el);
    },
    size(el) {
        return {
            width: el.clientWidth,
            height: el.clientHeight,
        };
    },
    rect(el) {
        return element_1.getRect(el);
    },
};
/**
 * Watch specified layout state, trigger `callback` if state changed.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type Watch state type, can be `show | hide | inview | outview | size | rect`.
 * @param callback The callback to call when state changed.
 * @returns A cancel function.
 */
function watchLayout(el, type, callback) {
    let watcher = new LayoutWatcher(el, type, callback);
    watcher.watch();
    return watcher.unwatch.bind(watcher);
}
exports.watchLayout = watchLayout;
/**
 * Watch specified layout state, trigger `callback` if it changed for only once.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type Watch state type, can be `show | hide | inview | outview | size | rect`.
 * @param callback The callback to call when state changed.
 * @returns A cancel function.
 */
function watchLayoutOnce(el, type, callback) {
    let watcher = new LayoutWatcher(el, type, callback, { once: true });
    watcher.watch();
    return watcher.unwatch.bind(watcher);
}
exports.watchLayoutOnce = watchLayoutOnce;
/**
 * Watch specified layout state, trigger `callback` if the state becomes `true` and never trigger again.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type Watch state type, can be `show | hide | inview | outview`.
 * @param callback The callback to call when state becomes `true`.
 * @returns A cancel function.
 */
function watchLayoutUntil(el, type, callback) {
    let watcher = new LayoutWatcher(el, type, callback, { untilTrue: true });
    watcher.watch();
    return watcher.unwatch.bind(watcher);
}
exports.watchLayoutUntil = watchLayoutUntil;
class LayoutWatcher {
    constructor(el, type, callback, options = {}) {
        this.observer = null;
        this.frameId = null;
        this.interval = null;
        this.oldState = null;
        this.unwatchChange = null;
        this.el = el;
        this.type = type;
        this.callback = callback;
        this.options = options;
        this.getState = WatchStateFns[type];
    }
    /** Begin to watch. */
    watch() {
        this.resetState();
        if (this.type === 'size' && typeof window.ResizeObserver === 'function' && !this.options.intervalTime) {
            this.observer = new window.ResizeObserver(this.onResize.bind(this));
            this.observer.observe(this.el);
        }
        else if ((this.type === 'inview' || this.type === 'outview') && typeof IntersectionObserver === 'function' && !this.options.intervalTime) {
            this.observer = new IntersectionObserver(this.onInviewChange.bind(this));
            this.observer.observe(this.el);
        }
        else if (this.options.intervalTime) {
            this.interval = new base_1.Interval(this.checkStateInInterval.bind(this), this.options.intervalTime);
        }
        else if (this.options.checkInAnimationFrame) {
            this.frameId = requestAnimationFrame(this.checkStateInAnimationFrame.bind(this));
        }
        else {
            this.unwatchChange = watchDocumentChange(this.checkStateInInterval.bind(this));
        }
    }
    /** End watch. */
    unwatch() {
        var _a, _b;
        if (this.observer) {
            this.observer.disconnect();
        }
        else if (this.options.intervalTime) {
            (_a = this.interval) === null || _a === void 0 ? void 0 : _a.cancel();
        }
        else if (this.options.checkInAnimationFrame) {
            if (this.frameId) {
                cancelAnimationFrame(this.frameId);
            }
        }
        else {
            (_b = this.unwatchChange) === null || _b === void 0 ? void 0 : _b.call(this);
        }
    }
    onResize(entries) {
        for (let { contentRect } of entries) {
            this.onNewState({
                width: contentRect.width,
                height: contentRect.height
            });
        }
    }
    onInviewChange(entries) {
        for (let { intersectionRatio } of entries) {
            let newState = this.type === 'inview' ? intersectionRatio > 0 : intersectionRatio === 0;
            this.onNewState(newState);
        }
    }
    checkStateInAnimationFrame() {
        let newState = this.getState(this.el);
        this.onNewState(newState);
        this.frameId = requestAnimationFrame(this.checkStateInAnimationFrame.bind(this));
    }
    checkStateInInterval() {
        let newState = this.getState(this.el);
        this.onNewState(newState);
    }
    onNewState(newState) {
        if (!this.isValueOrObjectEqual(newState, this.oldState)) {
            this.oldState = newState;
            this.callback(newState);
            if (this.options.once || this.options.untilTrue && newState) {
                this.unwatch();
            }
        }
    }
    isValueOrObjectEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
            return false;
        }
        let keysA = Object.keys(a);
        let keysB = Object.keys(b);
        if (keysA.length !== keysB.length) {
            return false;
        }
        for (let key of keysA) {
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            let valueA = a[key];
            let valueB = b[key];
            if (valueA !== valueB) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check state manually.
     * Don't forget to call `resetState` before begin to check state.
     */
    checkState() {
        let newState = this.getState(this.el);
        if (!this.isValueOrObjectEqual(newState, this.oldState)) {
            this.oldState = newState;
            this.callback(newState);
        }
    }
    /** Reset current state. */
    resetState() {
        this.oldState = this.getState(this.el);
    }
}
exports.LayoutWatcher = LayoutWatcher;
let mutationObserver = null;
let mutationObserverCallbacks = [];
let willEmitDocumentChange = false;
function watchDocumentChange(callback) {
    if (!mutationObserver) {
        mutationObserver = new MutationObserver(emitDocumentChangeLater);
        mutationObserver.observe(document.documentElement, { subtree: true, childList: true, attributes: true });
    }
    if (mutationObserverCallbacks.length === 0) {
        window.addEventListener('resize', emitDocumentChangeLater);
        window.addEventListener('wheel', emitDocumentChangeLater);
    }
    mutationObserverCallbacks.push(callback);
    return () => {
        unwatchDocumentChange(callback);
    };
}
function unwatchDocumentChange(callback) {
    mutationObserverCallbacks = mutationObserverCallbacks.filter(v => v !== callback);
    if (mutationObserverCallbacks.length === 0 && mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
    }
    if (mutationObserverCallbacks.length === 0) {
        window.removeEventListener('resize', emitDocumentChangeLater);
        window.removeEventListener('wheel', emitDocumentChangeLater);
    }
}
function emitDocumentChangeLater() {
    if (!willEmitDocumentChange) {
        requestAnimationFrame(emitDocumentChange);
        willEmitDocumentChange = true;
    }
}
function emitDocumentChange() {
    for (let callback of mutationObserverCallbacks) {
        callback();
    }
    willEmitDocumentChange = false;
}


/***/ }),

/***/ "../ff/out/index.js":
/*!**************************!*\
  !*** ../ff/out/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./base */ "../ff/out/base/index.js"), exports);
__exportStar(__webpack_require__(/*! ./dom */ "../ff/out/dom/index.js"), exports);


/***/ }),

/***/ "../flit/out/bindings/class.js":
/*!*************************************!*\
  !*** ../flit/out/bindings/class.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassNameBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
const style_parser_1 = __webpack_require__(/*! ../internals/style-parser */ "../flit/out/internals/style-parser.js");
/**
 * `:class` binding will add class names to current element.
 *
 * `:class="class1 class2"` - Like class name strings.
 * `:class.class-name=${booleanValue}` - Add class name if booleanValue is `true`.
 * `:class=${[class1, class2]}` - Add multiply class names from array.
 * `:class=${{class1: value1, class2: value2}}` - Add multiply class names from their mapped boolean values.
 */
let ClassNameBinding = class ClassNameBinding {
    constructor(el, context, modifiers) {
        this.lastClassNames = [];
        if (modifiers) {
            if (modifiers.length > 1) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most one modifier as class name can be specified for ":class"!`);
            }
            if (!/^\$?[\w-]+$/.test(modifiers[0])) {
                throw new Error(`Modifier "${modifiers[0]}" is not a valid class name!`);
            }
        }
        this.el = el;
        this.modifiers = modifiers;
        this.scopeName = (context === null || context === void 0 ? void 0 : context.el.localName) || '';
        this.scopedClassNames = this.scopeName ? style_parser_1.getScopedClassNames(this.scopeName) : undefined;
    }
    update(value) {
        let newClassNames = [];
        if (value) {
            newClassNames = this.parseClass(value);
        }
        for (let name of this.lastClassNames) {
            if (!newClassNames.includes(name)) {
                this.el.classList.remove(name);
            }
        }
        for (let name of newClassNames) {
            if (!this.lastClassNames.includes(name)) {
                this.el.classList.add(name);
            }
        }
        this.lastClassNames = newClassNames;
    }
    parseClass(value) {
        let o = {};
        if (this.modifiers) {
            if (value) {
                o[this.modifiers[0]] = true;
            }
        }
        else if (Array.isArray(value)) {
            for (let name of value) {
                o[name] = true;
            }
        }
        else if (value && typeof value === 'object') {
            for (let key of Object.keys(value)) {
                o[key] = !!value[key];
            }
        }
        else if (typeof value === 'string') {
            for (let name of value.split(/\s+/)) {
                if (name) {
                    o[name] = true;
                }
            }
        }
        let names = [];
        for (let name in o) {
            if (o[name]) {
                if (this.scopedClassNames && this.scopedClassNames.has(name)) {
                    name = name + '__' + this.scopeName;
                }
                names.push(name);
            }
        }
        return names;
    }
    remove() {
        if (this.lastClassNames) {
            this.el.classList.remove(...this.lastClassNames);
        }
    }
};
ClassNameBinding = __decorate([
    define_1.defineBinding('class')
], ClassNameBinding);
exports.ClassNameBinding = ClassNameBinding;


/***/ }),

/***/ "../flit/out/bindings/define.js":
/*!**************************************!*\
  !*** ../flit/out/bindings/define.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.refBinding = exports.BindingReferences = exports.BindingResult = exports.defineBinding = void 0;
const references_1 = __webpack_require__(/*! ../helpers/references */ "../flit/out/helpers/references.js");
/** Cache all binding classes. */
const DefinedBindingMap = new Map();
function defineBinding(name, Binding) {
    if (DefinedBindingMap.has(name)) {
        console.warn(`You are trying to overwrite binding definition "${name}"`);
    }
    if (Binding) {
        DefinedBindingMap.set(name, Binding);
        return function (...args) {
            return new BindingResult(name, ...args);
        };
    }
    else {
        return (Binding) => {
            return defineBinding(name, Binding);
        };
    }
}
exports.defineBinding = defineBinding;
/**
 * Returned from calling defined bindings like `show(...)`, `hide(...)`.
 * Used to cache parameters and update template later.
 * @typeparam A parameters type.
 */
class BindingResult {
    constructor(name, ...args) {
        this.name = name;
        this.args = args;
    }
}
exports.BindingResult = BindingResult;
/** Class to help handle reference from binding result to it's binding class. */
class BindingReferencesClass extends references_1.ResultReferences {
    /** Calls reference callback when binging instance created. */
    createFromResult(el, context, result, modifiers) {
        let BindingConstructor = DefinedBindingMap.get(result.name);
        if (!BindingConstructor) {
            throw new Error(`":${result.name}" on "<${el.localName}>" is not a registered binding class!`);
        }
        let binding = new BindingConstructor(el, context, modifiers);
        this.createReference(result, binding);
        binding.update(...result.args);
        return binding;
    }
}
exports.BindingReferences = new BindingReferencesClass();
/**
 * Reference binding instance after it created and before updating.
 * Use it like:
 * ```ts
 * <tag refBinding(show(...))>
 * ```
 *
 * @param result The binding result like `show(...)`.
 * @param ref Callback after binding instance was just created and not update yet.
 * @param unref Callback after binding instance was removed directly, not calls when was contained in a removed template.
 * @return The `result` parameter.
 */
function refBinding(result, ref, unref) {
    exports.BindingReferences.addReference(result, ref);
    if (unref) {
        exports.BindingReferences.addUnReference(result, unref);
    }
    return result;
}
exports.refBinding = refBinding;


/***/ }),

/***/ "../flit/out/bindings/enable-disable.js":
/*!**********************************************!*\
  !*** ../flit/out/bindings/enable-disable.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisabledBinding = exports.EnableBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/**
 * `:enable` binding will set `disabled` state for element if it's binded value is `false`.
 *
 * `:enable=${booleanValue}`
 */
let EnableBinding = class EnableBinding {
    constructor(el) {
        this.el = el;
    }
    update(value) {
        if (value) {
            this.el.removeAttribute('disabled');
        }
        else {
            this.el.setAttribute('disabled', '');
        }
    }
    remove() {
        this.el.removeAttribute('disabled');
    }
};
EnableBinding = __decorate([
    define_1.defineBinding('enable')
], EnableBinding);
exports.EnableBinding = EnableBinding;
/**
 * `:disable` binding will set `disabled` state for element if it's binded value is `true`.
 *
 * `:disable=${booleanValue}`
 */
let DisabledBinding = class DisabledBinding {
    constructor(el) {
        this.el = el;
    }
    update(value) {
        if (value) {
            this.el.setAttribute('disabled', '');
        }
        else {
            this.el.removeAttribute('disabled');
        }
    }
    remove() {
        this.el.removeAttribute('disabled');
    }
};
DisabledBinding = __decorate([
    define_1.defineBinding('disable')
], DisabledBinding);
exports.DisabledBinding = DisabledBinding;


/***/ }),

/***/ "../flit/out/bindings/html.js":
/*!************************************!*\
  !*** ../flit/out/bindings/html.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/**
 * `:html` binding will update html content for element.
 *
 * `:html=${InnerHTMLCodes}`
 */
let HTMLBinding = class HTMLBinding {
    constructor(el) {
        this.el = el;
    }
    update(value) {
        this.el.innerHTML = value === null || value === undefined ? '' : String(value);
    }
    remove() {
        this.el.innerHTML = '';
    }
};
HTMLBinding = __decorate([
    define_1.defineBinding('html')
], HTMLBinding);
exports.HTMLBinding = HTMLBinding;


/***/ }),

/***/ "../flit/out/bindings/index.js":
/*!*************************************!*\
  !*** ../flit/out/bindings/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
Object.defineProperty(exports, "defineBinding", { enumerable: true, get: function () { return define_1.defineBinding; } });
Object.defineProperty(exports, "BindingResult", { enumerable: true, get: function () { return define_1.BindingResult; } });
Object.defineProperty(exports, "BindingReferences", { enumerable: true, get: function () { return define_1.BindingReferences; } });
Object.defineProperty(exports, "refBinding", { enumerable: true, get: function () { return define_1.refBinding; } });
__exportStar(__webpack_require__(/*! ./show-hide */ "../flit/out/bindings/show-hide.js"), exports);
__webpack_require__(/*! ./class */ "../flit/out/bindings/class.js");
__webpack_require__(/*! ./style */ "../flit/out/bindings/style.js");
__webpack_require__(/*! ./model */ "../flit/out/bindings/model.js");
__webpack_require__(/*! ./ref */ "../flit/out/bindings/ref.js");
__webpack_require__(/*! ./ref-component */ "../flit/out/bindings/ref-component.js");
__webpack_require__(/*! ./html */ "../flit/out/bindings/html.js");
__webpack_require__(/*! ./enable-disable */ "../flit/out/bindings/enable-disable.js");
__webpack_require__(/*! ./src */ "../flit/out/bindings/src.js");
__webpack_require__(/*! ./show-hide */ "../flit/out/bindings/show-hide.js");
__webpack_require__(/*! ./slot */ "../flit/out/bindings/slot.js");


/***/ }),

/***/ "../flit/out/bindings/model.js":
/*!*************************************!*\
  !*** ../flit/out/bindings/model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
const component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
const dom_event_1 = __webpack_require__(/*! ../internals/dom-event */ "../flit/out/internals/dom-event.js");
/** All modifiers for model binding. */
const AllowedModelModifiers = ['lazy', 'number'];
/**
 * `:model` binding will bind inputable element's value with specified property of current component.
 *
 * `:model="propertyName"` - Bind with property of current component.
 * `:model="objectProperty.propertyName"` - Bind with sub property of one object in current component.
 * `:model.lazy="propertyName"` - Uses `change` event to update component value, not `input`.
 * `:model.number="propertyName"` - Convert input value to number and then update component value.
 */
let ModelBinding = class ModelBinding {
    constructor(el, context, modifiers) {
        /** Is boolean value, `true` for checkbox or radio. */
        this.isBooleanValue = false;
        /** Is `<select multiple>`. */
        this.isMultiSelect = false;
        this.com = null;
        this.unwatch = null;
        if (!context) {
            throw new ReferenceError(`A context must be provided when using ":model=property"!`);
        }
        if (modifiers) {
            if (modifiers.length > 2) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most two modifiers can be specified for ":model"!`);
            }
            for (let modifier of modifiers) {
                if (!AllowedModelModifiers.includes(modifier)) {
                    throw new Error(`Modifier "${modifiers}" is not allowed, it must be one of ${AllowedModelModifiers.map(m => `"${m}"`).join(', ')}!`);
                }
            }
        }
        this.el = el;
        this.modifiers = modifiers;
        this.context = context;
        this.isComModel = el.localName.includes('-');
        if (this.isComModel) {
            this.property = 'value'; // will check `checked` property later.
            this.eventName = 'change'; // never be `input`.
        }
        else {
            let isFormField = ['input', 'select', 'textarea'].includes(el.localName);
            let isLazy = modifiers && modifiers[0] === 'lazy';
            this.isBooleanValue = el.localName === 'input' && (el.type === 'checkbox' || el.type === 'radio');
            this.isMultiSelect = el.localName === 'select' && el.multiple;
            if (this.isBooleanValue) {
                this.property = 'checked';
                this.eventName = 'change';
            }
            else if (isFormField) {
                this.property = 'value';
                this.eventName = isLazy ? 'change' : 'input';
            }
            // `div@contendeditable` cant trigger change and blur event but not input event
            else {
                this.property = 'innerHTML';
                this.eventName = isLazy ? 'blur' : 'input';
            }
        }
    }
    // Normally this method should only be called for once.
    update(modelName) {
        if (!modelName || typeof modelName !== 'string') {
            throw new Error(`"${modelName}" is not a valid model name!`);
        }
        this.modelName = modelName;
        if (this.isComModel) {
            if (this.com) {
                this.updateComModel();
            }
            else {
                component_1.getComponentEarly(this.el, com => {
                    this.bindComModel(com);
                    this.updateComModel();
                });
            }
        }
        else {
            this.updateElementModel();
            this.watchContextModelValue();
        }
    }
    bindComModel(com) {
        this.com = com;
    }
    updateComModel() {
        let com = this.com;
        // Some component use `checked` property as model value.
        if (com.hasOwnProperty('checked') && typeof com.checked === 'boolean') {
            this.property = 'checked';
        }
        com.on(this.eventName, this.assignModelValueToContext, this);
        this.watchContextModelValue();
    }
    watchContextModelValue() {
        if (this.unwatch) {
            this.unwatch();
        }
        // There is a problem here:
        // When the `:model` part was removed, it can't be unwatch after relatated element removed.
        // `:model` is convient but eval, isn't it?
        this.unwatch = this.context.watchImmediately(this.getModelValueFromContext.bind(this), this.setModelValueToTarget.bind(this));
    }
    getModelValueFromContext() {
        let properties = this.modelName.split('.');
        let value = this.context;
        for (let property of properties) {
            if (value && typeof value === 'object') {
                value = value[property];
            }
            else {
                value = undefined;
                break;
            }
        }
        return value;
    }
    assignModelValueToContext(value) {
        let properties = this.modelName.split('.');
        let object = this.context;
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            if (object && typeof object === 'object') {
                if (i < properties.length - 1) {
                    object = object[property];
                }
                else {
                    object[property] = value;
                }
            }
            else {
                break;
            }
        }
    }
    updateElementModel() {
        dom_event_1.on(this.el, this.eventName, this.onEventInputOrChange.bind(this));
    }
    onEventInputOrChange(_e) {
        let value;
        let isNumber = this.modifiers && this.modifiers.includes('number');
        if (this.isMultiSelect) {
            value = Array.from(this.el.options).filter(o => o.selected).map(o => o.value);
            if (isNumber) {
                value = value.map(Number);
            }
        }
        else {
            value = this.el[this.property];
            if (isNumber) {
                value = Number(value);
            }
        }
        this.assignModelValueToContext(value);
    }
    setModelValueToTarget(value) {
        if (this.isComModel) {
            let com = this.com;
            if (com[this.property] !== value) {
                com[this.property] = value;
            }
        }
        else {
            this.setInputValue(value);
        }
    }
    setInputValue(value) {
        if (this.isMultiSelect && !Array.isArray(value)) {
            throw new Error(`:model="${this.modelName}" of select[multiple] requires an array as value!`);
        }
        if (this.isMultiSelect) {
            for (let option of this.el.options) {
                option.selected = value.includes(option.value);
            }
        }
        else {
            let el = this.el;
            value = value === null || value === undefined ? '' : value;
            // Here need to avoid:
            //   input value changed ->
            //   write value to context ->
            //   trigger watcher ->
            //   write same value to input, which may cause cursor position lost.
            // So we must compare the value firstly.
            if (el[this.property] !== value) {
                el[this.property] = value;
            }
        }
    }
    remove() {
        this.setInputValue('');
    }
};
ModelBinding = __decorate([
    define_1.defineBinding('model')
], ModelBinding);
exports.ModelBinding = ModelBinding;


/***/ }),

/***/ "../flit/out/bindings/ref-component.js":
/*!*********************************************!*\
  !*** ../flit/out/bindings/ref-component.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefComponentBinding = void 0;
const component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/**
 * To reference current element as a `refs` property or captures component and passes to a handler as a parameter.
 * Note when references the component may not applied properties and triggers `created`.
 *
 * `:refComponent="name"`- Reference as a property in current component at `.refs.refName`, note it will be updated everytime after element changed.
 * `:refComponent=${this.onRef}` - Call reference function with the component as parameter, note it will be called everytime after element changed.
 */
let RefComponentBinding = class RefComponentBinding {
    constructor(el, context) {
        if (!context) {
            throw new ReferenceError(`A context must be provided when using ":ref" binding!`);
        }
        this.el = el;
        this.context = context;
    }
    update(value) {
        component_1.getComponentEarly(this.el, (com) => {
            if (com) {
                if (typeof value === 'string') {
                    this.context[value] = com;
                }
                else if (typeof value === 'function') {
                    value.call(this.context, com);
                }
            }
        });
    }
    remove() { }
};
RefComponentBinding = __decorate([
    define_1.defineBinding('refComponent')
], RefComponentBinding);
exports.RefComponentBinding = RefComponentBinding;


/***/ }),

/***/ "../flit/out/bindings/ref.js":
/*!***********************************!*\
  !*** ../flit/out/bindings/ref.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/**
 * To reference current element as a `refs` property or captures and passes to a handler.
 *
 * `:ref="name"` - Reference as a value in current component at `.refs.refName`, note it will be updated everytime after element changed.
 * `:ref=${this.onRef}` - Call reference function with current element as parameter, note it will be called everytime after element changed.
 */
let RefBinding = class RefBinding {
    constructor(el, context) {
        if (!context) {
            throw new ReferenceError(`A context must be provided when using ":ref" binding!`);
        }
        this.el = el;
        this.context = context;
    }
    update(value) {
        if (typeof value === 'string') {
            this.context.refs[value] = this.el;
        }
        else if (typeof value === 'function') {
            value.call(this.context, this.el);
        }
    }
    remove() { }
};
RefBinding = __decorate([
    define_1.defineBinding('ref')
], RefBinding);
exports.RefBinding = RefBinding;


/***/ }),

/***/ "../flit/out/bindings/show-hide.js":
/*!*****************************************!*\
  !*** ../flit/out/bindings/show-hide.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hide = exports.HideBinding = exports.show = exports.ShowBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
const contextual_transition_1 = __webpack_require__(/*! ../internals/contextual-transition */ "../flit/out/internals/contextual-transition.js");
/**
 * `:show` binding will keep element visible if it's binded value is `true`.
 *
 * `:show=${anyValue}`
 */
class ShowBinding {
    constructor(el, context) {
        this.value = undefined;
        this.el = el;
        this.transition = new contextual_transition_1.ContextualTransition(context);
    }
    update(value, options) {
        value = !!value;
        this.transition.updateOptions(options);
        if (value !== this.value) {
            if (value) {
                this.el.hidden = false;
                if (this.transition.shouldPlayEnter()) {
                    this.transition.playEnter(this.el);
                }
            }
            else {
                if (this.transition.shouldPlayLeave()) {
                    this.transition.playLeave(this.el).then(finish => {
                        if (finish) {
                            this.el.hidden = true;
                        }
                    });
                }
                else {
                    this.el.hidden = true;
                }
            }
            this.value = value;
        }
    }
    remove() {
        this.el.hidden = false;
    }
}
exports.ShowBinding = ShowBinding;
/**
 * `show(...)` binding will keep element visible if it's binded value is `true`.
 * You may also use `:show` if no need to specify transition.
 *
 * `show(visible: any, transition: TransitionOptions)`
 * `show(visible: any, options: {transition: TransitionOptions, enterAtStart, leaveAtStart, onend})`
 */
exports.show = define_1.defineBinding('show', ShowBinding);
/**
 * `:hide` binding will keep element hideen if it's binded value is `true`.
 *
 * `:hide=${anyValue}`
 */
class HideBinding extends ShowBinding {
    update(value, options) {
        super.update(!value, options);
    }
}
exports.HideBinding = HideBinding;
/**
 * `hide()` binding will keep element hideen if it's binded value is `true`.
 *
 * `hide(hidden: any, transition: TransitionOptions)`
 * `hide(hidden: any, options: {transition: TransitionOptions, enterAtStart, leaveAtStart, onend})`
 */
exports.hide = define_1.defineBinding('hide', HideBinding);


/***/ }),

/***/ "../flit/out/bindings/slot.js":
/*!************************************!*\
  !*** ../flit/out/bindings/slot.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotBinding = void 0;
const component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/**
 * Insert current element into closest component at mapped `<slot>` position,
 * and also reference current element as a `slots` property.
 *
 * `:slot="slotName"` - Insert into the position specified by `<slot name="slotName">`.
 */
let SlotBinding = class SlotBinding {
    constructor(el, context) {
        this.el = el;
        this.context = context;
    }
    update(slotName) {
        // Prepared `slots` properties before trigger `created` event.
        component_1.getClosestComponentEarly(this.el, com => {
            // When extend super component and provide `:slot`, use current context as slot context.
            com = com || this.context;
            if (com) {
                this.updateComSlot(slotName, com);
            }
        });
    }
    updateComSlot(slotName, com) {
        if (!com.slots[slotName]) {
            com.slots[slotName] = [];
        }
        com.slots[slotName].push(this.el);
    }
    remove() { }
};
SlotBinding = __decorate([
    define_1.defineBinding('slot')
], SlotBinding);
exports.SlotBinding = SlotBinding;


/***/ }),

/***/ "../flit/out/bindings/src.js":
/*!***********************************!*\
  !*** ../flit/out/bindings/src.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SrcBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/** Caches global loaded URLs. */
const SrcLoadedURLs = new Set();
/**
 * `:src` binding will update the src property of media element.
 *
 * `:src=${URL}`
 *
 * Note after reuse an image and reset it's src, it will keep old image until the new one loaded.
 */
let SrcBinding = class SrcBinding {
    constructor(el) {
        /** Current resource location. */
        this.src = '';
        if (el instanceof HTMLMediaElement) {
            throw new Error('":src" binding can only binded with HTMLMediaElement!');
        }
        this.el = el;
    }
    update(value) {
        this.src = value;
        if (SrcLoadedURLs.has(value)) {
            this.el.src = value;
        }
        else if (value) {
            this.el.src = '';
            let img = new Image();
            img.onload = () => {
                SrcLoadedURLs.add(value);
                // Must re validate it, or src will be wrongly updated.
                if (value === this.src) {
                    this.el.src = value;
                }
            };
            img.src = value;
        }
        else {
            this.el.src = '';
        }
    }
    remove() {
        this.el.src = '';
    }
};
SrcBinding = __decorate([
    define_1.defineBinding('src')
], SrcBinding);
exports.SrcBinding = SrcBinding;


/***/ }),

/***/ "../flit/out/bindings/style.js":
/*!*************************************!*\
  !*** ../flit/out/bindings/style.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleBinding = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/bindings/define.js");
/** All modifiers for style binding. */
const AllowedStyleModifiers = ['px', 'percent', 'url'];
/**
 * `:style` binding will update style values for current element.
 *
 * `:style="normalStyleProperties"` - Just like normal style properties.
 * `:style.style-name=${value}` - Set style value for specified style proeprty.
 * `:style.style-name.px=${numberValue}` - Convert numberValue to `?px` and set as style value.
 * `:style=${{styleName1: value1, styleName2: value2}}` - Add multiply styles from properties and mapped values.
 */
let StyleBinding = class StyleBinding {
    constructor(el, _context, modifiers) {
        this.lastStyle = {};
        if (modifiers) {
            if (modifiers.length > 2) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most two modifiers (as style name property value modifier) can be specified for ":style"!`);
            }
            if (modifiers.length === 2 && !AllowedStyleModifiers.includes(modifiers[1])) {
                throw new Error(`Modifier "${modifiers[1]}" is not allowed, it must be one of ${AllowedStyleModifiers.join(', ')}!`);
            }
            if (!/^[\w-]+$/.test(modifiers[0]) || AllowedStyleModifiers.includes(modifiers[0])) {
                throw new Error(`Modifier "${modifiers[0]}" is not a valid style property!`);
            }
        }
        this.el = el;
        this.modifiers = modifiers;
    }
    update(value) {
        let oldStyleNames = Object.keys(this.lastStyle);
        let newStyle = this.parseStyle(value);
        let newStyleNames = Object.keys(newStyle);
        for (let name of oldStyleNames) {
            if (!newStyleNames.includes(name)) {
                this.el.style[name] = '';
            }
        }
        for (let name of newStyleNames) {
            if (!oldStyleNames.includes(name) || this.lastStyle[name] !== newStyle[name]) {
                this.setStyle(name, newStyle[name]);
            }
        }
        this.lastStyle = newStyle;
    }
    setStyle(name, value) {
        var _a;
        let unit = ((_a = this.modifiers) === null || _a === void 0 ? void 0 : _a[1]) || '';
        if (value === null || value === undefined) {
            value = '';
        }
        else if (unit === 'px') {
            // More units like `s`, `deg` is very rare to use.
            value = value + 'px';
        }
        else if (unit === 'percent') {
            value = value + '%';
        }
        else if (unit === 'url') {
            value = 'url("' + value + '")';
        }
        if (typeof value === 'number') {
            value = value + 'px';
        }
        this.el.style[name] = value;
    }
    parseStyle(style) {
        let o = {};
        if (this.modifiers) {
            if (typeof style === 'string' && style !== '' || typeof style === 'number') {
                o[this.modifiers[0]] = style;
            }
        }
        else if (Array.isArray(style)) {
            for (let item of style.join(';').split(/\s*;\s*/)) {
                let [name, value] = item.split(/\s*:\s*/);
                if (name && value) {
                    o[name] = value;
                }
            }
        }
        else if (style && typeof style === 'object') {
            o = style;
        }
        else if (style && typeof style === 'string') {
            for (let item of style.split(/\s*;\s*/)) {
                let [name, value] = item.split(/\s*:\s*/);
                if (name && value) {
                    o[name] = value;
                }
            }
        }
        return o;
    }
    remove() {
        if (this.lastStyle) {
            for (let name of Object.keys(this.lastStyle)) {
                this.el.style[name] = '';
            }
        }
    }
};
StyleBinding = __decorate([
    define_1.defineBinding('style')
], StyleBinding);
exports.StyleBinding = StyleBinding;


/***/ }),

/***/ "../flit/out/component/component.js":
/*!******************************************!*\
  !*** ../flit/out/component/component.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const template_1 = __webpack_require__(/*! ../template */ "../flit/out/template/index.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
const observer_1 = __webpack_require__(/*! ../observer */ "../flit/out/observer/index.js");
const watchers_1 = __webpack_require__(/*! ../watchers */ "../flit/out/watchers/index.js");
const node_anchor_1 = __webpack_require__(/*! ../internals/node-anchor */ "../flit/out/internals/node-anchor.js");
const from_element_1 = __webpack_require__(/*! ./from-element */ "../flit/out/component/from-element.js");
const life_cycle_1 = __webpack_require__(/*! ./life-cycle */ "../flit/out/component/life-cycle.js");
const internal_event_emitter_1 = __webpack_require__(/*! ../internals/internal-event-emitter */ "../flit/out/internals/internal-event-emitter.js");
const style_parser_1 = __webpack_require__(/*! ../internals/style-parser */ "../flit/out/internals/style-parser.js");
const node_range_1 = __webpack_require__(/*! ../internals/node-range */ "../flit/out/internals/node-range.js");
const updatable_queue_1 = __webpack_require__(/*! ../queue/helpers/updatable-queue */ "../flit/out/queue/helpers/updatable-queue.js");
/**
 * Super class of all the components, create automacially when element appearance in the document.
 * @typeparam E Event interface in `{eventName: (...args) => void}` format.
 */
class Component extends internal_event_emitter_1.InternalEventEmitter {
    constructor(el) {
        super();
        /**
         * Caches referenced elements from `:ref="refName"`.
         * You should redefine the type as `{name: HTMLElement, ...}`.
         */
        this.refs = {};
        /**
         * Caches slot elements from `:slot="slotName"`.
         * You should redefine the type as `{name: HTMLElement[], ...}`.
         */
        this.slots = {};
        /* Whether current component connected with a document. */
        this.__connected = false;
        /** Whether have updated for at least once. */
        this.__updated = false;
        this.__rootPart = null;
        /** `WatcherGroup` instance to cache watchers binded with current component. */
        this.__watcherGroup = null;
        this.el = el;
        this.__restNodeRange = new node_range_1.ContainerRange(el);
        return observer_1.observeComTarget(this);
    }
    /** Called after component created and properties assigned. */
    __emitCreated() {
        // Not called from constructor function because properties of child classes are not prepared yet.
        from_element_1.setElementComponentMap(this.el, this);
        life_cycle_1.emitComponentCreationCallbacks(this.el, this);
        this.onCreated();
        this.emit('created');
    }
    /** Called after connected each time, also after `__emitCreated`. */
    __emitConnected(isFirstTimeConnected) {
        if (!isFirstTimeConnected) {
            if (this.__watcherGroup) {
                this.__watcherGroup.connect();
            }
        }
        this.__connected = true;
        // Why `update` but not `__updateImmediately`?
        // On component connected callbacks, may delete a child elements as element of other components.
        // In this scenorio using `update` will keep it not been updated.
        this.update();
        this.onConnected();
        this.emit('connected');
        life_cycle_1.onComponentConnected(this);
    }
    /** Called after disconnected each time. */
    __emitDisconnected() {
        observer_1.clearDependenciesOf(this);
        if (this.__watcherGroup) {
            this.__watcherGroup.disconnect();
        }
        this.__connected = false;
        this.onDisconnected();
        this.emit('disconnected');
        life_cycle_1.onComponentDisconnected(this);
    }
    /**
     * Called from a global queued stack to do updating.
     * Set `force` to `true` to force updating happens even in a document fragment.
     */
    __updateImmediately(force = false) {
        // Don't update after disconnected, or the watcher will be observed and do meaningless updating.
        if (!(this.__connected || force)) {
            return;
        }
        observer_1.startUpdating(this);
        try {
            let result = this.render();
            observer_1.endUpdating(this);
            if (this.__rootPart) {
                this.__rootPart.update(result);
            }
            else if (result !== null) {
                this.__rootPart = new template_1.NodePart(new node_anchor_1.NodeAnchor(this.el, node_anchor_1.NodeAnchorType.Container), this);
                this.__rootPart.update(result);
            }
        }
        catch (err) {
            observer_1.endUpdating(this);
            console.warn(err);
        }
        if (!this.__updated) {
            this.__updated = true;
            this.onReady();
            this.emit('ready');
        }
        this.onUpdated();
        this.emit('updated');
        queue_1.onRenderComplete(() => {
            this.onRendered();
            this.emit('rendered');
        });
    }
    /**
     * Defines what current component should render.
     * Child class should overwrite this method, normally returns html`...` or string.
     * You can choose to not overwrite `render()` to keep it returns `null`,
     * when you just need one element and don't want to render any child nodes.
     */
    render() {
        return null;
    }
    /**
     * Call this to partially or fully update inner contents asynchronously.
     * Never overwrite this method until you know what you are doing.
     */
    update() {
        queue_1.enqueueUpdatableInOrder(this, this, updatable_queue_1.UpdatableUpdateOrder.Component);
    }
    /**
     * Called when component instance was just created and all properties assigned.
     * All the child nodes that belongs to parent context but contained in current component are prepared.
     * But self child nodes, `slots`, `refs`, events are not prepared until `onReady`.
     * You may change some data or visit parent nodes, or register events when `onCreated`.
     */
    onCreated() { }
    /**
     * Called after all the data, child nodes are prepared, but child components are not prepared.
     * Later it will keep updating other components, so don't check computed styles on child nodes.
     * If need so, uses `onRenderComplete` or `untilRenderComplete`.
     * You may visit or adjust child nodes or register more events when `onReady`.
     */
    onReady() { }
    /**
     * Called after every time all the data and child nodes updated.
     * Seam with `onReady`, child components may not been updated yet,
     * so don't check computed styles on child nodes.
     * If need so, uses `onRenderComplete` or `untilRenderComplete`.
     * You may reset some properties or capture some nodes dynamically here,
     * but normally you don't need to.
     */
    onUpdated() { }
    /**
     * Called after all the data and child nodes, components updated.
     * You can visit computed styles of elemenets event component elemenet now.
     */
    onRendered() { }
    /**
     * Called when root element was inserted into document.
     * This will be called for each time you insert the element into document.
     * If you need to register global listeners like `resize` when element in document, restore them here.
     */
    onConnected() { }
    /**
     * Called when root element removed from document.
     * This will be called for each time you removed the element into document.
     * If you register global listeners like `resize`, don't forget to unregister them here.
     */
    onDisconnected() { }
    /** Returns promise which will be resolved after component is ready. */
    async untilReady() {
        if (this.__updated) {
            return;
        }
        else {
            return new Promise(resolve => {
                this.once('ready', resolve);
            });
        }
    }
    /**
     * Watchs returned value of `fn` and calls `callback` with this value as parameter after the value changed.
     * Will set callback scope as current component.
     */
    watch(fn, callback) {
        return this.__getWatcherGroup().watch(fn, callback.bind(this));
    }
    /**
     * Watchs returned value of `fn` and calls `callback` with this value as parameter after the value changed.
     * Will call `callback` immediately.
     * Will set callback scope as current component.
     */
    watchImmediately(fn, callback) {
        return this.__getWatcherGroup().watchImmediately(fn, callback.bind(this));
    }
    /**
     * Watchs returned value of `fn` and calls `callback` with this value as parameter after the value changed.
     * Calls `callback` for only once.
     * Will set callback scope as current component.
     */
    watchOnce(fn, callback) {
        return this.__getWatcherGroup().watchOnce(fn, callback.bind(this));
    }
    /**
     * Watchs returned value of `fn` and calls `callback` with this value as parameter after the value becomes true like.
     * Will set callback scope as current component.
     */
    watchUntil(fn, callback) {
        return this.__getWatcherGroup().watchUntil(fn, callback.bind(this));
    }
    /** Ensure `__watcherGroup` to be initialized. */
    __getWatcherGroup() {
        if (!this.__watcherGroup) {
            this.__watcherGroup = new watchers_1.WatcherGroup(this);
        }
        return this.__watcherGroup;
    }
    /** Update all watchers binded with current component. */
    __updateWatcherGroup() {
        // Why didn't update watcher group just in `com.__updateImmediately()`:
        // Component collect dependencies and trigger updating when required,
        // while watcher group do the similar things and runs indenpent.
        // They should not affect each other.
        if (this.__watcherGroup) {
            this.__watcherGroup.update();
        }
    }
    /** returns scoped class name E `.name -> .name__com-name` */
    scopeClassName(className) {
        let startsWithDot = className[0] === '.';
        let classNameWithoutDot = startsWithDot ? className.slice(1) : className;
        let scopedClassNameSet = style_parser_1.getScopedClassNames(this.el.localName);
        if (scopedClassNameSet && scopedClassNameSet.has(classNameWithoutDot)) {
            return className + '__' + this.el.localName;
        }
        else {
            return className;
        }
    }
}
exports.Component = Component;
/**
 * This static property contains style text used as styles for current component.
 * Class names will be scoped as `.className__componentName`.
 * Tag selector will be nested as: `p` -> `com-name p`.
 *
 * You can nest css codes just like in SCSS, and use `$` to reference parent selector.
 */
Component.style = null;


/***/ }),

/***/ "../flit/out/component/custom-element.js":
/*!***********************************************!*\
  !*** ../flit/out/component/custom-element.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defineCustomElement = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/component/define.js");
const from_element_1 = __webpack_require__(/*! ./from-element */ "../flit/out/component/from-element.js");
// When `connectedCallback` called on a element, it's child nodes are not ready yet.
// So we can't leave an element into document firstly, and wait it to be connected,
// but must render all the html codes with javascript, and insert into document in bundle.
// Otherwise If we include bundled js behind all other custom element tags in a document, or with `defer` property,
// since elements were prepared already, then they will be connected in component registration order, not in element order.
// We fix this by connect connect elements later, and sort them before connect each.
// Both `connectedCallback` and `disconnectedCallback` may triggered multiple times when element moving or removing.
// So we must delay the component connect and disconnect operation by a queue.
/** Using queue to delay the connect and disconnect operations for elements. */
let toConnectSoonCache = new Set();
let toDisconnectSoonCache = new Set();
/** Whether having things in queue to update. */
let needsUpdate = false;
/** Defines custom element to connect and create component automatically. */
function defineCustomElement(name) {
    customElements.define(name, class FlitElement extends HTMLElement {
        // Although spec says connect callback will not be called when inserting element to a document fragment,
        // but I still find it may be triggrred in a rate.
        connectedCallback() {
            if (!(this.ownerDocument instanceof DocumentFragment)) {
                enqueueConnect(this);
            }
        }
        // Moving or removing element will trigger disconnected callback each time.
        disconnectedCallback() {
            enqueueDisconnect(this);
        }
    });
}
exports.defineCustomElement = defineCustomElement;
/** Enqueue connection for an element. */
function enqueueConnect(el) {
    // Can avoid appending elements triggers disconnect and connect soon.
    if (toDisconnectSoonCache.has(el)) {
        toDisconnectSoonCache.delete(el);
    }
    else {
        toConnectSoonCache.add(el);
        if (!needsUpdate) {
            enqueueUpdate();
        }
    }
}
/** Enqueue disconnection for an element. */
function enqueueDisconnect(el) {
    // Can avoid inserting elements into a fragment and then removed triggers connect.
    if (toConnectSoonCache.has(el)) {
        toConnectSoonCache.delete(el);
    }
    else {
        toDisconnectSoonCache.add(el);
        if (!needsUpdate) {
            enqueueUpdate();
        }
    }
}
/** Enqueue a updating task if no task yet. */
function enqueueUpdate() {
    Promise.resolve().then(update);
    needsUpdate = true;
}
/** Update, handle all connect and disconnect requests. */
function update() {
    if (toConnectSoonCache.size > 0) {
        updateConnectRequests();
    }
    // Disconnect elements later may avoid it slows followed rendering.
    if (toDisconnectSoonCache.size > 0) {
        updateDisconnectRequests();
    }
    needsUpdate = false;
}
/** Handle all connect requests. */
function updateConnectRequests() {
    let toConnectImmediately = [...toConnectSoonCache];
    // Connect element in natural element order.
    // Important: elements were sorted as connect order, just like element order.
    // So wouln't cost time to sort.
    toConnectImmediately.sort((a, b) => {
        return a.compareDocumentPosition(b) & a.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    // More connect requests will come, must delay them.
    toConnectSoonCache = new Set();
    for (let el of toConnectImmediately) {
        // `el` may not in document,
        // e.g., inserted into a fragment.
        // No need to worry about forgetting to instantiate it,
        // it will trigger `connectedCallback` again after insert into document.
        // Here also have a small rate document not contains el.
        connectElement(el);
    }
}
/** Handle all disconnect requests. */
function updateDisconnectRequests() {
    // More connect requests will be added, must delay them.
    let toDisconnectImmediately = toDisconnectSoonCache;
    toDisconnectSoonCache = new Set();
    // Element order of disconnect is not important.
    for (let el of toDisconnectImmediately.keys()) {
        disconnectElement(el);
    }
}
/** Connect element and create component. */
function connectElement(el) {
    let com = from_element_1.getComponent(el);
    let isFirstTimeCreated = false;
    if (!com) {
        com = define_1.createComponent(el);
        isFirstTimeCreated = true;
    }
    com.__emitConnected(isFirstTimeCreated);
}
/** Disconnect element and emit disconnect event for component. */
function disconnectElement(el) {
    let com = from_element_1.getComponent(el);
    if (com) {
        com.__emitDisconnected();
    }
}


/***/ }),

/***/ "../flit/out/component/define.js":
/*!***************************************!*\
  !*** ../flit/out/component/define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.define = void 0;
const custom_element_1 = __webpack_require__(/*! ./custom-element */ "../flit/out/component/custom-element.js");
const style_1 = __webpack_require__(/*! ./style */ "../flit/out/component/style.js");
function define(name, Com) {
    if (!name.includes('-')) {
        throw new Error(`"${name}" can't be defined as custom element, a custom element name must contain "-"!`);
    }
    // Used for `@define(name)` decorator.
    if (!Com) {
        return function (Com) {
            define(name, Com);
        };
    }
    // `define(name, Com)`
    else {
        defineComponentConstructor(name, Com);
        custom_element_1.defineCustomElement(name);
        return undefined;
    }
}
exports.define = define;
/** To cache `name -> component constructor` */
const ComponentConstructorMap = new Map();
/**
 * Defines a component with specified name and class, from `define(name, Com)`.
 * @param name The component name, same with `define()`.
 * @param Com The component class constructor.
 */
function defineComponentConstructor(name, Com) {
    if (ComponentConstructorMap.has(name)) {
        console.warn(`You are trying to overwrite component definition "${name}"!`);
    }
    ComponentConstructorMap.set(name, Com);
}
/**
 * Get component constructor from name, used to instantiate specified component from it's defined name.
 * @param name The component name, same with the name in `define(name, ...)`.
 */
function getComponentConstructor(name) {
    return ComponentConstructorMap.get(name);
}
/** Create a component manually, when we exactly know this is a custom element. */
function createComponent(el) {
    let Com = getComponentConstructor(el.localName);
    style_1.ensureComponentStyle(Com, el.localName);
    let com = new Com(el);
    com.__emitCreated();
    return com;
}
exports.createComponent = createComponent;


/***/ }),

/***/ "../flit/out/component/from-element.js":
/*!*********************************************!*\
  !*** ../flit/out/component/from-element.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestComponentEarly = exports.getComponentEarly = exports.getClosestComponentOfType = exports.getComponentAsync = exports.getComponent = exports.setElementComponentMap = void 0;
const life_cycle_1 = __webpack_require__(/*! ./life-cycle */ "../flit/out/component/life-cycle.js");
/** To cache `el -> com` map and find component from element. */
const elementComponentMap = new WeakMap();
/** Set element -> component instance map. */
function setElementComponentMap(el, com) {
    elementComponentMap.set(el, com);
}
exports.setElementComponentMap = setElementComponentMap;
/**
 * Get component instance from custom element.
 * @param el The element to get component instance at.
 * @return The found component or `null` if no component registered on the element.
 */
function getComponent(el) {
    return elementComponentMap.get(el) || null;
}
exports.getComponent = getComponent;
/**
 * Get component instance from root element asynchronously.
 * Returns a promise which will be resolved after component created and triggers `created` event.
 * @param el The element to get component instance at.
 * @return The found component or `null` if is not a custom element.
 */
function getComponentAsync(el) {
    if (el.localName.includes('-')) {
        let com = elementComponentMap.get(el);
        if (com) {
            return Promise.resolve(com);
        }
        else {
            return new Promise(resolve => {
                life_cycle_1.onComponentCreatedAt(el, resolve);
            });
        }
    }
    else {
        return Promise.resolve(null);
    }
}
exports.getComponentAsync = getComponentAsync;
/**
 * Get closest component matches constructor from the closest ancestor custom element.
 * It's very common that you extend a component and define a new custom element,
 * So you will can't find the parent component from the tag name.
 * But you can still match super class by this method.
 * @param el The element to search from it and it's ancestors for component instance.
 * @param Com The component constructor to search.
 * @returns The found component or `null` if no component found.
 */
function getClosestComponentOfType(el, Com) {
    let parent = el;
    while (parent && parent instanceof HTMLElement) {
        if (parent.localName.includes('-')) {
            let com = getComponent(parent);
            if (com instanceof Com) {
                return com;
            }
        }
        parent = parent.parentElement;
    }
    return null;
}
exports.getClosestComponentOfType = getClosestComponentOfType;
/**
 * Get component instance from root element as soon as component created,
 * Before properties applied and before trigging `created` event.
 * Or immediately when component already been created.
 * Only for inner use.
 * @param el The element to get component instance at.
 */
function getComponentEarly(el, callback) {
    if (el.localName.includes('-')) {
        let com = elementComponentMap.get(el);
        if (com) {
            callback(com);
        }
        else {
            life_cycle_1.onComponentCreatedAt(el, callback);
        }
    }
    else {
        callback(null);
    }
}
exports.getComponentEarly = getComponentEarly;
/**
 * Get closest component from the closest ancestor custom element.
 * Only for inner use.
 * @param el The element to search from it and it's ancestors.
 */
function getClosestComponentEarly(el, callback) {
    let parent = el;
    while (parent && parent instanceof HTMLElement) {
        if (parent.localName.includes('-')) {
            getComponentEarly(parent, callback);
            return;
        }
        parent = parent.parentElement;
    }
    callback(null);
}
exports.getClosestComponentEarly = getClosestComponentEarly;


/***/ }),

/***/ "../flit/out/component/index.js":
/*!**************************************!*\
  !*** ../flit/out/component/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(/*! ./component */ "../flit/out/component/component.js");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.Component; } });
var from_element_1 = __webpack_require__(/*! ./from-element */ "../flit/out/component/from-element.js");
Object.defineProperty(exports, "getComponent", { enumerable: true, get: function () { return from_element_1.getComponent; } });
Object.defineProperty(exports, "getComponentAsync", { enumerable: true, get: function () { return from_element_1.getComponentAsync; } });
Object.defineProperty(exports, "getClosestComponentOfType", { enumerable: true, get: function () { return from_element_1.getClosestComponentOfType; } });
Object.defineProperty(exports, "getComponentEarly", { enumerable: true, get: function () { return from_element_1.getComponentEarly; } });
Object.defineProperty(exports, "getClosestComponentEarly", { enumerable: true, get: function () { return from_element_1.getClosestComponentEarly; } });
var life_cycle_1 = __webpack_require__(/*! ./life-cycle */ "../flit/out/component/life-cycle.js");
Object.defineProperty(exports, "updateAllComponents", { enumerable: true, get: function () { return life_cycle_1.updateAllComponents; } });
var style_1 = __webpack_require__(/*! ./style */ "../flit/out/component/style.js");
Object.defineProperty(exports, "addGlobalStyle", { enumerable: true, get: function () { return style_1.addGlobalStyle; } });
Object.defineProperty(exports, "updateAllStyles", { enumerable: true, get: function () { return style_1.updateAllStyles; } });
var define_1 = __webpack_require__(/*! ./define */ "../flit/out/component/define.js");
Object.defineProperty(exports, "define", { enumerable: true, get: function () { return define_1.define; } });
Object.defineProperty(exports, "createComponent", { enumerable: true, get: function () { return define_1.createComponent; } });


/***/ }),

/***/ "../flit/out/component/life-cycle.js":
/*!*******************************************!*\
  !*** ../flit/out/component/life-cycle.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllComponents = exports.onComponentDisconnected = exports.onComponentConnected = exports.emitComponentCreationCallbacks = exports.onComponentCreatedAt = void 0;
/** To cache callbacks after component initialized */
const ComponentCreationCallbackCache = new WeakMap();
/** To cache all the connected components that element connected. */
const ConnectedComponents = new Set();
/** Call callbacks after component instance created, and before triggering `created` event. */
function onComponentCreatedAt(el, callback) {
    let callbacks = ComponentCreationCallbackCache.get(el);
    if (!callbacks) {
        ComponentCreationCallbackCache.set(el, (callbacks = []));
    }
    callbacks.push(callback);
}
exports.onComponentCreatedAt = onComponentCreatedAt;
/**
 * Call after component created.
 * Used to assign properties from `.props`, or bind component events by `@com-event`.
 */
function emitComponentCreationCallbacks(el, com) {
    let callbacks = ComponentCreationCallbackCache.get(el);
    if (callbacks) {
        for (let callback of callbacks) {
            callback(com);
        }
        ComponentCreationCallbackCache.delete(el);
    }
}
exports.emitComponentCreationCallbacks = emitComponentCreationCallbacks;
/** On component element connected into document or fragment. */
function onComponentConnected(com) {
    ConnectedComponents.add(com);
}
exports.onComponentConnected = onComponentConnected;
/** On component element disconnected into document or fragment. */
function onComponentDisconnected(com) {
    ConnectedComponents.delete(com);
}
exports.onComponentDisconnected = onComponentDisconnected;
/**
 * Updates all the components that elements are connected nto document, and their watchers.
 * e.g., you may call this after language changes and not automatically detected.
 */
function updateAllComponents() {
    for (let com of ConnectedComponents) {
        com.update();
        com.__updateWatcherGroup();
    }
}
exports.updateAllComponents = updateAllComponents;


/***/ }),

/***/ "../flit/out/component/style.js":
/*!**************************************!*\
  !*** ../flit/out/component/style.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllStyles = exports.addGlobalStyle = exports.ensureComponentStyle = void 0;
const style_parser_1 = __webpack_require__(/*! ../internals/style-parser */ "../flit/out/internals/style-parser.js");
/** Caches `Component -> style element`. */
const ComponentStyleAndTagMap = new Map();
/** Caches global style element and their source. */
const GlobalStyleAndTags = [];
/** Calls after any one instance of component constructor connected, to ensure it's relied styles appended into document. */
function ensureComponentStyle(Com, name) {
    if (Com.style && !ComponentStyleAndTagMap.has(Com)) {
        let styleTag = createStyleElement(Com.style, name);
        ComponentStyleAndTagMap.set(Com, styleTag);
    }
}
exports.ensureComponentStyle = ensureComponentStyle;
/**
 * Create <style> tag and insert it into body.
 * `name` should be `global` for global style.
 */
function createStyleElement(style, scopeName) {
    let styleTag = document.createElement('style');
    styleTag.setAttribute('name', scopeName);
    styleTag.textContent = getStyleContent(style, scopeName);
    document.head.append(styleTag);
    return styleTag;
}
/** Get style text from static style property. */
function getStyleContent(style, scopeName) {
    if (typeof style === 'function') {
        style = style();
    }
    return style_parser_1.parseStyleCodes(String(style), scopeName === 'global' ? '' : scopeName);
}
/**
 * Add a global style. compare to normal style codes, it can use variables and can be updated dinamically.
 * @param style A string, css`...`, or a function return those.
 * @returns A newly created style tag element.
 */
function addGlobalStyle(style) {
    let scopeName = 'global';
    let styleTag = createStyleElement(style, scopeName);
    GlobalStyleAndTags.push({ style, tag: styleTag });
    return styleTag;
}
exports.addGlobalStyle = addGlobalStyle;
/** Updates all style codes for all the components, you may call this after theme changed. */
function updateAllStyles() {
    // `updateStyles` should always been called along with `updateAllComponents`,
    // So we should makesure `updateStyles` in the same micro task with `updateAllComponents`.
    for (let [Com, tag] of ComponentStyleAndTagMap.entries()) {
        if (Com.style) {
            let newContent = getStyleContent(Com.style, tag.getAttribute('name'));
            if (newContent !== tag.textContent) {
                tag.textContent = newContent;
            }
        }
    }
    for (let { style, tag } of GlobalStyleAndTags) {
        if (typeof style === 'function') {
            let newContent = getStyleContent(style, tag.getAttribute('name'));
            if (newContent !== tag.textContent) {
                tag.textContent = newContent;
            }
        }
    }
}
exports.updateAllStyles = updateAllStyles;


/***/ }),

/***/ "../flit/out/directives/cache.js":
/*!***************************************!*\
  !*** ../flit/out/directives/cache.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.CacheDirective = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
const template_1 = __webpack_require__(/*! ../template */ "../flit/out/template/index.js");
const contextual_transition_1 = __webpack_require__(/*! ../internals/contextual-transition */ "../flit/out/internals/contextual-transition.js");
class CacheDirective {
    constructor(anchor, context) {
        this.templates = [];
        this.currentTemplate = null;
        this.anchor = anchor;
        this.context = context;
        this.transition = new contextual_transition_1.ContextualTransition(context);
    }
    canMergeWith() {
        return true;
    }
    merge(result, options) {
        this.transition.updateOptions(options);
        if (result) {
            // Matches, merge them. will not play transition.
            if (this.currentTemplate && this.currentTemplate.canMergeWith(result)) {
                this.currentTemplate.merge(result);
            }
            else {
                // Moves out current.
                if (this.currentTemplate) {
                    this.movesOutCurrentTemplate();
                }
                // Find one that can be reused.
                let template = this.templates.find(t => t.canMergeWith(result));
                if (template) {
                    template.merge(result);
                    this.anchor.insert(template.extractToFragment());
                    this.tryPlayEnterTransition(template);
                    this.currentTemplate = template;
                }
                // Create new.
                else {
                    this.makeNewTemplate(result);
                }
            }
        }
        else {
            // Moves out current.
            if (this.currentTemplate) {
                this.movesOutCurrentTemplate();
            }
        }
    }
    async movesOutCurrentTemplate() {
        let template = this.currentTemplate;
        let playing = false;
        if (this.transition.shouldPlayLeave()) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                this.transition.playLeave(firstElement).then((finish) => {
                    if (finish) {
                        template.movesOut();
                    }
                });
                playing = true;
            }
        }
        if (!playing) {
            template.movesOut();
        }
        this.currentTemplate = null;
    }
    makeNewTemplate(result) {
        let template = new template_1.Template(result, this.context);
        this.anchor.insert(template.extractToFragment());
        this.tryPlayEnterTransition(template);
        this.currentTemplate = template;
        this.templates.push(template);
    }
    async tryPlayEnterTransition(template) {
        if (this.transition.shouldPlayEnter()) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                await this.transition.playEnter(firstElement);
            }
        }
    }
    remove() {
        if (this.currentTemplate) {
            this.currentTemplate.remove();
        }
    }
}
exports.CacheDirective = CacheDirective;
/**
 * `cache(changableContent, ?options)` will toggle rendering content, and also cache old content to restore it quickly.
 * Note that when old rendering result restored, the scroll positions in it will fall back to start position.
 *
 * @param result The html`...` result, can be `null` or an empty string.
 * @param options Options for transition.
 */
exports.cache = define_1.defineDirective(CacheDirective);


/***/ }),

/***/ "../flit/out/directives/define.js":
/*!****************************************!*\
  !*** ../flit/out/directives/define.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.refDirective = exports.DirectiveReferences = exports.DirectiveResult = exports.defineDirective = void 0;
const references_1 = __webpack_require__(/*! ../helpers/references */ "../flit/out/helpers/references.js");
/**
 * Defines a directive from a class which implements `Directive`.
 * Returns a function call which will generate a `DirectiveResult`.
 *
 * A `Directive` works like Binding, but it used to generate HTML code pieces,
 * not like `Binding` to modify properties of an element.
 *
 * It's hard to define a custom directive, please read source codes before doing this.
 */
function defineDirective(Dir) {
    return function (...args) {
        return new DirectiveResult(Dir, ...args);
    };
}
exports.defineDirective = defineDirective;
/**
 * Returned from calling directive functions like `repeat`.
 * Used to cache parameters and update template later.
 */
class DirectiveResult {
    constructor(Dir, ...args) {
        /** Reference function when uses `refDirective(...)`. */
        this.ref = null;
        this.directiveConstructor = Dir;
        this.args = args;
    }
}
exports.DirectiveResult = DirectiveResult;
/** Class to help handle reference from directive result to it's directive class. */
class DirectiveReferencesClass extends references_1.ResultReferences {
    /** Calls reference callback when binging instance created. */
    createFromResult(anchor, context, result) {
        let Dir = result.directiveConstructor;
        let directive = new Dir(anchor, context);
        this.createReference(result, directive);
        directive.merge(...result.args);
        return directive;
    }
}
exports.DirectiveReferences = new DirectiveReferencesClass();
/**
 * Reference to directive instance after it created and before merge.
 *  * Use it like:
 * ```ts
 * >refDirective(repeat(...))<
 * ```
 *
 * @param result The directive result like `repeat(...)`.
 * @param ref Callback with the directive object as parameter.
 * @param unref Callback after directive instance was removed directly, not calls when was contained in a removed template.
 * @return The `result` parameter.
 */
function refDirective(result, ref, unref) {
    exports.DirectiveReferences.addReference(result, ref);
    if (unref) {
        exports.DirectiveReferences.addUnReference(result, unref);
    }
    return result;
}
exports.refDirective = refDirective;


/***/ }),

/***/ "../flit/out/directives/helpers/offset-children.js":
/*!*********************************************************!*\
  !*** ../flit/out/directives/helpers/offset-children.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetChildren = void 0;
class OffsetChildren {
    constructor(parent, offset) {
        this.parent = parent;
        this.offset = offset;
    }
    getChildren() {
        return [...this.parent.children].slice(this.offset);
    }
    childAt(index) {
        return this.parent.children[this.offset + index];
    }
}
exports.OffsetChildren = OffsetChildren;


/***/ }),

/***/ "../flit/out/directives/helpers/page-data-getter.js":
/*!**********************************************************!*\
  !*** ../flit/out/directives/helpers/page-data-getter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageDataGetter = void 0;
const utils_1 = __webpack_require__(/*! ../../helpers/utils */ "../flit/out/helpers/utils.js");
class PageDataGetter {
    constructor(asyncDataGetter, immediateDataGetter = null) {
        this.cache = null;
        this.version = 0;
        this.asyncDataGetter = asyncDataGetter;
        this.immediateDataGetter = immediateDataGetter;
    }
    /** Get data items immediately. */
    getImmediateData(startIndex, endIndex) {
        let items;
        if (this.immediateDataGetter) {
            items = this.immediateDataGetter(startIndex, endIndex);
        }
        else {
            items = this.getSharedData(startIndex, endIndex);
        }
        return items;
    }
    /** Get shared part with previously loaded data. */
    getSharedData(startIndex, endIndex) {
        let items = [];
        let count = endIndex - startIndex;
        if (this.cache) {
            if (startIndex < this.cache.startIndex) {
                items.push(...utils_1.repeatForTimes(null, Math.min(this.cache.startIndex - startIndex, count)));
            }
            // Shared part.
            items.push(...this.cache.items.slice(Math.max(this.cache.startIndex, startIndex), Math.min(this.cache.endIndex, endIndex)));
            if (endIndex > this.cache.endIndex) {
                items.push(...utils_1.repeatForTimes(null, Math.max(endIndex - this.cache.endIndex, count)));
            }
        }
        else {
            items.push(...utils_1.repeatForTimes(null, count));
        }
        return items;
    }
    /** Get fresh data items. */
    async getFreshData(startIndex, endIndex) {
        let version = ++this.version;
        let items = await this.asyncDataGetter(startIndex, endIndex);
        if (this.version === version) {
            this.cache = {
                startIndex,
                endIndex,
                items,
            };
        }
        return items;
    }
}
exports.PageDataGetter = PageDataGetter;


/***/ }),

/***/ "../flit/out/directives/helpers/partial-rendering-processor.js":
/*!*********************************************************************!*\
  !*** ../flit/out/directives/helpers/partial-rendering-processor.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialRenderingProcessor = void 0;
const utils_1 = __webpack_require__(/*! ../../helpers/utils */ "../flit/out/helpers/utils.js");
const queue_1 = __webpack_require__(/*! ../../queue */ "../flit/out/queue/index.js");
class PartialRenderingProcessor {
    constructor(scroller, slider, sliderChildren) {
        /** Size of each time render count. */
        this.renderCount = 50;
        /** Render count of groups, increase if not enough. */
        this.renderGroupCount = 1;
        /** Border tio and bottom width. */
        this.scrollerBorderTopWidth = 0;
        this.scrollerBorderBottomWidth = 0;
        /** The start index of first item in the whole data. */
        this.startIndex = 0;
        /** The end index of next position of last item in the whole data. */
        this.endIndex = 0;
        /** The start index of first item and should be applied when next time rendering. */
        this.startIndexToApply = 0;
        /** Current total data count. */
        this.totalDataCount = 0;
        /** Data changed or data count changed and need to be applied. */
        this.needToApplyDataCountChange = false;
        /**
         * Average item height in pixels, it is used to calculate the position of the `slider`.
         * It will be detected automatically from the first rendering if was not initialized.
         */
        this.averageItemHeight = 0;
        /** The item count, will not update placeholder height when scrolling up. */
        this.itemCountWhenUpdatePlaceholderHeight = 0;
        /** If is not `null`, means updating is not completed yet. */
        this.untilUpdatingCompletePromise = null;
        this.scroller = scroller;
        this.slider = slider;
        this.sliderChildren = sliderChildren;
        this.palceholder = document.createElement('div');
        this.palceholder.style.cssText = 'position: absolute; left: 0; top: 0; width: 1px; visibility: hidden;';
        this.scroller.prepend(this.palceholder);
        queue_1.onRenderComplete(() => {
            this.onFirstTimeRenderCompleted();
        });
    }
    /** Update `renderCount` property. */
    updateRenderCount(renderCount) {
        this.renderCount = renderCount;
    }
    /** Get how many groups need to render. */
    getRenderGroupCount() {
        return this.renderGroupCount;
    }
    /** Begin to validate css properties after elements rendered. */
    onFirstTimeRenderCompleted() {
        let computedStyle = getComputedStyle(this.scroller);
        if (!['scroll', 'auto'].includes(computedStyle.overflowY)) {
            throw 'The  style value "overflow-y" of scroller element out of "liveRepeat" directive must be "scroll" or "auto"!';
        }
        if (computedStyle.position === 'static') {
            throw 'The style value "position" of scroller element out of "liveRepeat" directive must not be "static"!';
        }
        if (getComputedStyle(this.slider).position !== 'absolute') {
            throw 'The style value "position" of slider element out of "liveRepeat" directive must not be "absolute"!';
        }
        this.scrollerBorderTopWidth = Number(getComputedStyle(this.scroller).borderTopWidth.replace('px', '')) || 0;
        this.scrollerBorderBottomWidth = Number(getComputedStyle(this.scroller).borderBottomWidth.replace('px', '')) || 0;
    }
    /** Will locate to index when next time rendering. */
    setStartIndex(index) {
        this.startIndexToApply = index;
    }
    /** Whether specifies a start index. */
    isStartIndexSpecified() {
        return this.startIndexToApply !== null;
    }
    /** Update total data count after reload data. */
    updateDataCount(dataCount) {
        if (dataCount !== this.totalDataCount) {
            this.totalDataCount = dataCount;
            this.needToApplyDataCountChange = true;
            this.itemCountWhenUpdatePlaceholderHeight = 0;
        }
    }
    /**
     * Update from applied start index or current scroll position.
     * Note it must call `doDataUpdating` synchronously since it's already in a updating queue.
     */
    updateRendering(doDataUpdating) {
        let willApplyStartIndex = this.startIndexToApply !== null;
        // Scroll to specified index.
        if (willApplyStartIndex) {
            this.updateWhenStartIndexWillApply(doDataUpdating);
        }
        // Data should changed or partly changed, reset from current scroll position.
        else if (this.needToApplyDataCountChange) {
            this.updateFromCurrentScrollOffset(doDataUpdating);
            this.needToApplyDataCountChange = false;
        }
        // Just keep indices and update data.
        else {
            doDataUpdating(this.startIndex, this.endIndex, null);
        }
        this.lockUpdatingByPromise(queue_1.untilRenderComplete().then(() => {
            this.updatePlaceholderHeightProgressive();
            // Re-calcuate position and scroll offset.
            if (willApplyStartIndex) {
                this.resetSliderPosition();
                this.updateScrollOffset();
            }
        }));
    }
    /**
     * Update only when current rendering can't cover scroller, and will keep continuous scroll position.
     * Note it must call `doDataUpdating` synchronously since it may be in a updating queue.
     * Returns whether updated.
     */
    updateRenderingSmoothlyIfNeeded(doDataUpdating) {
        // Last updating is not completed.
        if (this.untilUpdatingCompletePromise) {
            return false;
        }
        // Reach start or end edge.
        if (this.startIndex === 0 && this.endIndex === this.totalDataCount) {
            return false;
        }
        let updatePromise = this.updateFromCoverage(doDataUpdating);
        if (updatePromise) {
            this.lockUpdatingByPromise(updatePromise.then(() => {
                this.updatePlaceholderHeightProgressive();
            }));
            return true;
        }
        else {
            return false;
        }
    }
    /** Prevent updating before promise been completed. */
    async lockUpdatingByPromise(promise) {
        this.untilUpdatingCompletePromise = promise;
        await promise;
        this.untilUpdatingCompletePromise = null;
    }
    /** Update when start index specified. */
    updateWhenStartIndexWillApply(doDataUpdating) {
        this.updateIndices(this.startIndexToApply);
        this.startIndexToApply = null;
        this.resetSliderPosition();
        doDataUpdating(this.startIndex, this.endIndex, null);
    }
    /** Update start and end index before rendering. */
    updateIndices(startIndex) {
        let renderCount = this.renderCount * this.renderGroupCount;
        startIndex = Math.min(startIndex, this.totalDataCount - renderCount);
        startIndex = Math.max(0, startIndex);
        let endIndex = startIndex + renderCount;
        endIndex = Math.min(endIndex, this.totalDataCount);
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
    /**
     * Update height of placeholder progressive, form current item count and their height.
     * Must wait for render completed.
     */
    updatePlaceholderHeightProgressive() {
        if (this.endIndex > 0 && this.endIndex >= this.itemCountWhenUpdatePlaceholderHeight || this.endIndex === this.totalDataCount) {
            let scrollerRect = this.getScrollerClientRect();
            let sliderRect = this.slider.getBoundingClientRect();
            let scrollHeight = this.scroller.scrollTop + sliderRect.bottom - scrollerRect.top;
            this.averageItemHeight = scrollHeight / this.endIndex;
            this.palceholder.style.height = this.averageItemHeight * this.totalDataCount + 'px';
            this.itemCountWhenUpdatePlaceholderHeight = this.endIndex;
        }
    }
    /** Get a fixed client rect of scroller. */
    getScrollerClientRect() {
        let scrollerRect = utils_1.getRect(this.scroller);
        scrollerRect.top += this.scrollerBorderTopWidth;
        scrollerRect.bottom -= this.scrollerBorderBottomWidth;
        scrollerRect.height -= this.scrollerBorderTopWidth + this.scrollerBorderBottomWidth;
        return scrollerRect;
    }
    /** Update position of `slider` after set new indices. */
    updateSliderPosition(direction, position) {
        if (direction === 'top') {
            this.slider.style.top = position + 'px';
            this.slider.style.bottom = 'auto';
        }
        else {
            this.slider.style.bottom = position + 'px';
            this.slider.style.top = 'auto';
        }
    }
    /** Update position of `slider` after set new index. */
    resetSliderPosition() {
        // May `averageItemHeight` be `0`, will update later in this scenario.
        let countBeforeStart = this.startIndex;
        let newTop = this.averageItemHeight * countBeforeStart;
        this.updateSliderPosition('top', newTop);
    }
    /** Update scroll offset of `scroller` after set new `startIndex`. */
    updateScrollOffset() {
        let countBeforeStart = this.startIndex;
        this.scroller.scrollTop = this.averageItemHeight * countBeforeStart;
    }
    /**
     * Validate if slider fully covers scroller and update indices if not.
     * Returns whether updated indices.
     */
    updateFromCoverage(doDataUpdating) {
        let scrollerRect = this.getScrollerClientRect();
        let sliderRect = this.slider.getBoundingClientRect();
        let renderCount = this.renderCount * this.renderGroupCount;
        let unexpectedScrollEnd = this.scroller.scrollTop + this.scroller.clientHeight === this.scroller.scrollHeight && this.endIndex < this.totalDataCount;
        let unexpectedScrollStart = this.scroller.scrollTop === 0 && this.startIndex > 0;
        let promise = null;
        // No intersection, reset slider position from current slider scroll offset.
        let hasNoIntersection = sliderRect.bottom < scrollerRect.top || sliderRect.top > scrollerRect.bottom;
        if (hasNoIntersection) {
            this.updateFromCurrentScrollOffset(doDataUpdating);
            promise = queue_1.untilRenderComplete();
        }
        // Scroll down and can't cover at bottom direction.
        // Otherwise will still load more when touch bottom scrolling edge and still more data exist.
        else if (sliderRect.bottom < scrollerRect.bottom || unexpectedScrollEnd) {
            let roughFirstVisibleIndex = utils_1.locateFirstVisibleIndex(this.scroller, this.sliderChildren.getChildren(), 0);
            let oldStartIndex = this.startIndex;
            let newStartIndex = this.startIndex + roughFirstVisibleIndex;
            this.updateIndices(newStartIndex);
            promise = this.updateWithSliderPositionStable('down', oldStartIndex, scrollerRect, doDataUpdating);
        }
        // Scroll up and can't cover at top direction.
        // Keeps last visible index as endIndex.
        // Otherwise will still load more when touch top scrolling edge and still more data exist.
        else if (sliderRect.top > scrollerRect.top || unexpectedScrollStart) {
            let roughLastVisibleIndex = utils_1.locateLastVisibleIndex(this.scroller, this.sliderChildren.getChildren(), 0);
            let oldStartIndex = this.startIndex;
            let newEndIndex = this.startIndex + roughLastVisibleIndex + 1;
            let newStartIndex = newEndIndex - renderCount;
            this.updateIndices(newStartIndex);
            promise = this.updateWithSliderPositionStable('up', oldStartIndex, scrollerRect, doDataUpdating);
        }
        // Not updated otherwise.
        return promise;
    }
    /** Re-generate indices from current scroll offset. */
    updateFromCurrentScrollOffset(doDataUpdating) {
        this.resetIndices();
        this.resetSliderPosition();
        doDataUpdating(this.startIndex, this.endIndex, null);
    }
    /** Reset indices from current scroll offset. */
    resetIndices() {
        let newStartIndex = this.averageItemHeight > 0 ? Math.floor(this.scroller.scrollTop / this.averageItemHeight) : 0;
        this.updateIndices(newStartIndex);
    }
    /** Update slider position to keep it in a stable position after updating data items. */
    async updateWithSliderPositionStable(scrollDirection, oldStartIndex, scrollerRect, doDataUpdating) {
        let visibleIndex = scrollDirection === 'down' ? this.startIndex - oldStartIndex : this.endIndex - 1 - oldStartIndex;
        let visibleElement = this.sliderChildren.childAt(visibleIndex);
        let updateData = () => { doDataUpdating(this.startIndex, this.endIndex, scrollDirection); };
        if (!visibleElement) {
            throw new Error(`Wrongly rendered: can\'t found expected element in specified index!`);
        }
        // When reach start index but may not reach scroll start.
        if (this.startIndex === 0) {
            await this.updateWhenReachStartIndex(visibleElement, updateData);
        }
        // When reach end index but may not reach scroll end.
        else if (this.endIndex === this.totalDataCount) {
            await this.updateWhenReachEndIndex(visibleElement, updateData);
        }
        // When reach start index but not scroll index.
        else if (this.startIndex > 0 && this.scroller.scrollTop === 0) {
            await this.updateWhenReachScrollStart(visibleElement, scrollerRect, updateData);
        }
        // When reach scroll end but not end index.
        else if (this.endIndex < this.totalDataCount && this.scroller.scrollTop + this.scroller.clientHeight === this.scroller.scrollHeight) {
            await this.updateWhenReachScrollEnd(visibleElement, scrollerRect, updateData);
        }
        // Keeps visible element in the same scroll position.
        else if (scrollDirection === 'down') {
            await this.updateNormallyWhenScrollingDown(visibleElement, scrollerRect, updateData);
        }
        // Keeps visible element in the same scroll position.
        else {
            await this.updateNormallyWhenScrollingUp(visibleElement, scrollerRect, updateData);
        }
    }
    /** When reach start index but may not reach scroll start, reset scroll top. */
    async updateWhenReachStartIndex(lastVisibleElement, updateData) {
        let visibleIndex = this.endIndex - 1 - this.startIndex;
        let oldTop = lastVisibleElement.getBoundingClientRect().top;
        this.updateSliderPosition('top', 0);
        // Render to locate first item.
        updateData();
        await queue_1.untilRenderComplete();
        // Should keep the visible element stable.
        let newVisibleElement = this.sliderChildren.childAt(visibleIndex);
        let newTop = newVisibleElement.getBoundingClientRect().top;
        let translate = newTop - oldTop;
        // Set scroll top to restore it's translate, `scrollTop` property is opposite with translation, so here it's `+`.
        this.scroller.scrollTop = this.scroller.scrollTop + translate;
    }
    /** When reach end index but may not reach scroll end, reset scroll top. */
    async updateWhenReachEndIndex(firstVisibleElement, updateData) {
        let visibleIndex = 0;
        let oldBottom = firstVisibleElement.getBoundingClientRect().bottom;
        // Render to locate last item.
        updateData();
        await queue_1.untilRenderComplete();
        // Get element translated.
        let newVisibleElement = this.sliderChildren.childAt(visibleIndex);
        let newBottom = newVisibleElement.getBoundingClientRect().bottom;
        let translate = newBottom - oldBottom;
        // Get new position.
        let scrollerRect = this.getScrollerClientRect();
        let sliderRect = this.slider.getBoundingClientRect();
        // should minus translate normally, but bottom property is opposite with translation, so here it's `+`.
        let position = scrollerRect.bottom - sliderRect.bottom + translate;
        position -= this.scroller.scrollTop;
        this.updateSliderPosition('bottom', position);
    }
    /** When reach scroll start but not reach start index, provide more scroll space. */
    async updateWhenReachScrollStart(lastVisibleElement, scrollerRect, updateData) {
        // Provide more spaces at start.
        let extendedScrollSpace = this.averageItemHeight * this.startIndex;
        // Translate position from the spaces.
        let position = scrollerRect.bottom - lastVisibleElement.getBoundingClientRect().bottom;
        position -= extendedScrollSpace;
        this.updateSliderPosition('bottom', position);
        updateData();
        this.scroller.scrollTop = extendedScrollSpace;
        await queue_1.untilRenderComplete();
    }
    /** When reach scroll end but not reach end index, provide more scroll space. */
    async updateWhenReachScrollEnd(firstVisibleElement, scrollerRect, updateData) {
        // Update normally.
        let position = firstVisibleElement.getBoundingClientRect().top - scrollerRect.top;
        position += this.scroller.scrollTop;
        this.updateSliderPosition('top', position);
        updateData();
        await queue_1.untilRenderComplete();
    }
    /** Render more items when scrolling down, not reset scroll position. */
    async updateNormallyWhenScrollingDown(firstVisibleElement, scrollerRect, updateData) {
        let position = firstVisibleElement.getBoundingClientRect().top - scrollerRect.top;
        position += this.scroller.scrollTop;
        this.updateSliderPosition('top', position);
        updateData();
        await queue_1.untilRenderComplete();
    }
    /** Render more items when scrolling up, not reset scroll position. */
    async updateNormallyWhenScrollingUp(lastVisibleElement, scrollerRect, updateData) {
        let position = scrollerRect.bottom - lastVisibleElement.getBoundingClientRect().bottom;
        position -= this.scroller.scrollTop;
        this.updateSliderPosition('bottom', position);
        updateData();
        await queue_1.untilRenderComplete();
    }
}
exports.PartialRenderingProcessor = PartialRenderingProcessor;


/***/ }),

/***/ "../flit/out/directives/helpers/repetitive-template.js":
/*!*************************************************************!*\
  !*** ../flit/out/directives/helpers/repetitive-template.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RepetitiveTemplate = void 0;
const template_1 = __webpack_require__(/*! ../../template */ "../flit/out/template/index.js");
const watchers_1 = __webpack_require__(/*! ../../watchers */ "../flit/out/watchers/index.js");
/**
 * A `repeat` directive can only watches top level data changes,
 * can't watch property changes of each `item`.
 * So this class is used to watch and update template result that generated from `templateFn` and one `item`.
 */
class RepetitiveTemplate {
    constructor(source, item, index) {
        this.source = source;
        this.item = item;
        this.index = index;
        let context = source.getContext();
        // Update after components and top level watchers update completed,
        // and also after directive updated, or it will cause useless updating.
        this.watcher = new watchers_1.LazyWatcher(this.getTemplateResult.bind(this), this.onUpdateTemplateResult.bind(this), context);
        this.template = new template_1.Template(this.watcher.value, context);
        this.getWatcherGroup().add(this.watcher);
    }
    /** Get watcher group to add or delete watcher. */
    getWatcherGroup() {
        let context = this.source.getContext();
        return (context === null || context === void 0 ? void 0 : context.__getWatcherGroup()) || watchers_1.GlobalWatcherGroup;
    }
    /** To get current template result for watching. */
    getTemplateResult() {
        let templateFn = this.source.getTemplateFn();
        return templateFn(this.item, this.index);
    }
    /** After template result changed. */
    onUpdateTemplateResult(result) {
        if (this.template.canMergeWith(result)) {
            this.template.merge(result);
        }
        else {
            let context = this.source.getContext();
            let newTemplate = new template_1.Template(result, context);
            this.template.replaceWith(newTemplate);
            this.template = newTemplate;
        }
    }
    /** Update item and indices. */
    update(item, index) {
        this.item = item;
        this.index = index;
        this.watcher.update();
    }
    /** Remove elements and disconnect. Can connect again later. */
    remove() {
        this.disconnect();
        this.template.remove();
    }
    /** Just disconnect. */
    disconnect() {
        this.getWatcherGroup().delete(this.watcher);
    }
    /** Connect after disconnected. */
    connect() {
        this.getWatcherGroup().add(this.watcher);
    }
}
exports.RepetitiveTemplate = RepetitiveTemplate;


/***/ }),

/***/ "../flit/out/directives/index.js":
/*!***************************************!*\
  !*** ../flit/out/directives/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
Object.defineProperty(exports, "defineDirective", { enumerable: true, get: function () { return define_1.defineDirective; } });
Object.defineProperty(exports, "refDirective", { enumerable: true, get: function () { return define_1.refDirective; } });
Object.defineProperty(exports, "DirectiveResult", { enumerable: true, get: function () { return define_1.DirectiveResult; } });
Object.defineProperty(exports, "DirectiveReferences", { enumerable: true, get: function () { return define_1.DirectiveReferences; } });
var cache_1 = __webpack_require__(/*! ./cache */ "../flit/out/directives/cache.js");
Object.defineProperty(exports, "cache", { enumerable: true, get: function () { return cache_1.cache; } });
Object.defineProperty(exports, "CacheDirective", { enumerable: true, get: function () { return cache_1.CacheDirective; } });
var toggle_1 = __webpack_require__(/*! ./toggle */ "../flit/out/directives/toggle.js");
Object.defineProperty(exports, "toggle", { enumerable: true, get: function () { return toggle_1.toggle; } });
Object.defineProperty(exports, "ToggleDirective", { enumerable: true, get: function () { return toggle_1.ToggleDirective; } });
var repeat_1 = __webpack_require__(/*! ./repeat */ "../flit/out/directives/repeat.js");
Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
Object.defineProperty(exports, "RepeatDirective", { enumerable: true, get: function () { return repeat_1.RepeatDirective; } });
var live_repeat_1 = __webpack_require__(/*! ./live-repeat */ "../flit/out/directives/live-repeat.js");
Object.defineProperty(exports, "liveRepeat", { enumerable: true, get: function () { return live_repeat_1.liveRepeat; } });
Object.defineProperty(exports, "LiveRepeatDirective", { enumerable: true, get: function () { return live_repeat_1.LiveRepeatDirective; } });
var live_async_repeat_1 = __webpack_require__(/*! ./live-async-repeat */ "../flit/out/directives/live-async-repeat.js");
Object.defineProperty(exports, "liveAsyncRepeat", { enumerable: true, get: function () { return live_async_repeat_1.liveAsyncRepeat; } });
Object.defineProperty(exports, "LiveAsyncRepeatDirective", { enumerable: true, get: function () { return live_async_repeat_1.LiveAsyncRepeatDirective; } });


/***/ }),

/***/ "../flit/out/directives/live-async-repeat.js":
/*!***************************************************!*\
  !*** ../flit/out/directives/live-async-repeat.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.liveAsyncRepeat = exports.LiveAsyncRepeatDirective = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
const live_repeat_1 = __webpack_require__(/*! ./live-repeat */ "../flit/out/directives/live-repeat.js");
const observer_1 = __webpack_require__(/*! ../observer */ "../flit/out/observer/index.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
const page_data_getter_1 = __webpack_require__(/*! ./helpers/page-data-getter */ "../flit/out/directives/helpers/page-data-getter.js");
// One issue that is not solved:
// If data changed in backend and cause data duplicating or missing, it's hard to handle handle it.
// Right now we can trigger totally or partially updating from API, if we can detected it.
// Otherwise it's possible to detect data duplicating in frontend by a configuration `key`.
// So we don't show duplicate items for current rendering result.
// What we may do in future?
// When we detected duplicated items, we use them to update old items with same keys, and remove them from current page.
// This will cause we may can't cover current page and need to load more data, but should not frequently.
// And it also cause cached paged data doesn't have fixed size,
// such that we must count size of cached data of each page to fetch the data from `startIndex` to `endIndex`.
class LiveAsyncRepeatDirective extends live_repeat_1.LiveRepeatDirective {
    constructor() {
        super(...arguments);
        /** If specified, we can avoid duplicate items with same key shown in same time. */
        this.key = null;
        /** Need to call `updateSliderPosition` after got `knownDataCount`. */
        this.needToUpdateSliderPositionAfterDataCountKnown = false;
        /** Whether will update later. */
        this.willUpdateLater = false;
        /** Whether will update data count later. */
        this.willUpdateDataCountLater = false;
        /** Update version. */
        this.version = 0;
    }
    merge(dataOptions, templateFn, liveRepeatOptions, transitionOptions) {
        this.dataCount = dataOptions.dataCount;
        this.templateFn = templateFn;
        this.options.update(liveRepeatOptions);
        this.transition.updateOptions(transitionOptions);
        this.updatePreRendered();
        if (liveRepeatOptions === null || liveRepeatOptions === void 0 ? void 0 : liveRepeatOptions.renderCount) {
            this.processor.updateRenderCount(liveRepeatOptions.renderCount);
        }
        let firstTimeUpdate = !this.dataGetter;
        if (firstTimeUpdate) {
            this.dataGetter = new page_data_getter_1.PageDataGetter(dataOptions.asyncDataGetter, dataOptions.immediateDataGetter);
            this.getDataCountThenUpdate();
        }
        else if (!this.willUpdateLater) {
            this.update();
        }
    }
    __updateImmediately() {
        if (!this.willUpdateLater) {
            this.processor.updateRendering(this.updateFromIndices.bind(this));
        }
    }
    checkCoverage() {
        if (!this.willUpdateLater) {
            super.checkCoverage();
        }
    }
    async getDataCountThenUpdate() {
        let dataCountConfig = this.dataCount;
        if (!dataCountConfig) {
            return;
        }
        if (this.willUpdateDataCountLater) {
            return;
        }
        this.willUpdateDataCountLater = true;
        this.willUpdateLater = true;
        // Wait a little while to see if more update data count requests come.
        await Promise.resolve();
        // If more requests comes when updating it, accept new.
        this.willUpdateDataCountLater = false;
        let version = ++this.version;
        let dataCount;
        let knownDataCount = 0;
        if (typeof dataCountConfig === 'function') {
            dataCount = dataCountConfig();
        }
        else {
            dataCount = dataCountConfig;
        }
        if (dataCount instanceof Promise) {
            knownDataCount = await dataCount;
        }
        else {
            knownDataCount = dataCount;
        }
        if (version === this.version) {
            this.processor.updateDataCount(knownDataCount);
            this.update();
            this.willUpdateLater = false;
        }
    }
    updateFromIndices(startIndex, endIndex, scrollDirection) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        let items = this.dataGetter.getImmediateData(startIndex, endIndex);
        let fresh = !items.some(item => item === null || item === undefined);
        this.updateLiveData(items, scrollDirection);
        this.triggerLiveAsyncDataEvents(scrollDirection, fresh);
        if (!fresh) {
            let updateVersion = ++this.updateVersion;
            this.dataGetter.getFreshData(startIndex, endIndex).then((data) => {
                if (updateVersion === this.updateVersion) {
                    this.updateLiveData(data, scrollDirection);
                    this.triggerLiveAsyncDataEvents(scrollDirection, true);
                }
            });
        }
    }
    updateLiveData(data, scrollDirection) {
        if (this.key) {
            data = this.uniqueDataByKey(data);
        }
        data = data.map(observer_1.observe);
        super.updateLiveData(data, scrollDirection);
    }
    uniqueDataByKey(data) {
        let set = new Set();
        return data.filter(item => {
            if (item) {
                let id = item[this.key];
                if (set.has(id)) {
                    return false;
                }
                else {
                    set.add(id);
                }
            }
            return true;
        });
    }
    triggerLiveAsyncDataEvents(scrollDirection, fresh) {
        this.emit('liveDataUpdated', this.liveData, this.startIndex, scrollDirection, fresh);
        queue_1.onRenderComplete(() => {
            this.emit('liveDataRendered', this.liveData, this.startIndex, scrollDirection, fresh);
        });
    }
    /**
     * Reload data count and refresh to get all needed data.
     * Call this when data order column changed and you want to keep scroll position, e.g., after sorting. */
    reload() {
        this.getDataCountThenUpdate();
    }
    /** Resolved until `liveDataUpdated` triggered. */
    untilUpdated() {
        return new Promise(resolve => {
            this.once('liveDataUpdated', () => resolve());
        });
    }
    /** Resolved until `liveDataUpdated` triggered with fresh data. */
    untilFreshUpdated() {
        return new Promise(resolve => {
            let listener = (_liveData, _startIndex, _scrollDirection, fresh) => {
                if (fresh) {
                    this.off('liveDataUpdated', listener);
                    resolve();
                }
            };
            this.once('liveDataUpdated', listener);
        });
    }
    /** Resolved until `liveDataRendered` triggered. */
    untilRendered() {
        return new Promise(resolve => {
            this.once('liveDataRendered', () => resolve());
        });
    }
    /** Resolved until `liveDataRendered` triggered with fresh data. */
    untilFreshRendered() {
        return new Promise(resolve => {
            let listener = (_liveData, _startIndex, _scrollDirection, fresh) => {
                if (fresh) {
                    this.off('liveDataRendered', listener);
                    resolve();
                }
            };
            this.once('liveDataRendered', listener);
        });
    }
}
exports.LiveAsyncRepeatDirective = LiveAsyncRepeatDirective;
/**
 * Gerenate live repeat elements, reuse elements as much as possible when data changed.
 * Compare to `repeat` directive, it will only show partial elements in viewport when you scroll it.
 * @param options Options for live rendering.
 * @param templateFn The fucntion which will return a template from one iterable data and index position.
 * @param transitionOptions The transition options, it can be a transition name, property or properties, or {transition, enterAtStart}.
 */
exports.liveAsyncRepeat = define_1.defineDirective(LiveAsyncRepeatDirective);


/***/ }),

/***/ "../flit/out/directives/live-repeat.js":
/*!*********************************************!*\
  !*** ../flit/out/directives/live-repeat.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.liveRepeat = exports.LiveRepeatDirective = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
const contextual_transition_1 = __webpack_require__(/*! ../internals/contextual-transition */ "../flit/out/internals/contextual-transition.js");
const repetitive_template_1 = __webpack_require__(/*! ./helpers/repetitive-template */ "../flit/out/directives/helpers/repetitive-template.js");
const dom_event_1 = __webpack_require__(/*! ../internals/dom-event */ "../flit/out/internals/dom-event.js");
const updatable_options_1 = __webpack_require__(/*! ../internals/updatable-options */ "../flit/out/internals/updatable-options.js");
const partial_rendering_processor_1 = __webpack_require__(/*! ./helpers/partial-rendering-processor */ "../flit/out/directives/helpers/partial-rendering-processor.js");
const internal_event_emitter_1 = __webpack_require__(/*! ../internals/internal-event-emitter */ "../flit/out/internals/internal-event-emitter.js");
const watchers_1 = __webpack_require__(/*! ../watchers */ "../flit/out/watchers/index.js");
const edit_1 = __webpack_require__(/*! ../helpers/edit */ "../flit/out/helpers/edit.js");
const utils_1 = __webpack_require__(/*! ../helpers/utils */ "../flit/out/helpers/utils.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
const offset_children_1 = __webpack_require__(/*! ./helpers/offset-children */ "../flit/out/directives/helpers/offset-children.js");
const updatable_queue_1 = __webpack_require__(/*! ../queue/helpers/updatable-queue */ "../flit/out/queue/helpers/updatable-queue.js");
/** Default `liveRepeat` options. */
const DefaultLiveRepeatOptions = {
    renderCount: 50,
    preRendering: false,
};
class LiveRepeatDirective extends internal_event_emitter_1.InternalEventEmitter {
    constructor(anchor, context) {
        super();
        this.options = new updatable_options_1.UpdatableOptions(DefaultLiveRepeatOptions);
        /** Cached last data that comes from outside, before been processed. */
        this.rawData = null;
        /** Full data. */
        this.fullData = [];
        /** Current rendered part of data. */
        this.liveData = [];
        /** Current rendered templates, maps with `lastData` one by one. */
        this.repTems = [];
        /** Watcher to watch data changes. */
        this.lastWatcher = null;
        /** The start index of first item in the whole data. */
        this.startIndex = 0;
        /** The end index of next position of last item in the whole data. */
        this.endIndex = 0;
        /** All current items and pre-prendered items. */
        this.preRendered = null;
        /** Indicates current updating. */
        this.updateVersion = 0;
        this.anchor = anchor;
        this.context = context;
        let slider = this.anchor.el.parentElement;
        let scroller = slider.parentElement;
        if (!slider || !scroller || scroller.children.length !== 1) {
            throw new Error(`"liveRepeat" must be contained in the HTML struct like \`
				<div title="as a scroll parent" style="overflow: auto | scroll; position: relative;">
					<div title="as a scroll slider" style="position: absolute;">
						\${liveRepeat(...)}
					</div>
				</div>
			\`!`);
        }
        this.transition = new contextual_transition_1.ContextualTransition(context);
        this.sliderChildren = new offset_children_1.OffsetChildren(slider, utils_1.getElementCountBefore(anchor.el));
        this.processor = new partial_rendering_processor_1.PartialRenderingProcessor(scroller, slider, this.sliderChildren);
        this.scroller = scroller;
        this.slider = slider;
        dom_event_1.on(scroller, 'scroll.passive', this.checkCoverage, this);
        let ResizeObserver = window.ResizeObserver;
        if (ResizeObserver) {
            this.observer = new ResizeObserver(this.checkCoverage.bind(this));
            this.observer.observe(this.scroller);
        }
        else {
            dom_event_1.on(window, 'resize', this.checkCoverage, this);
        }
    }
    canMergeWith(_data, templateFn) {
        return templateFn === this.templateFn || templateFn.toString() === this.templateFn.toString();
    }
    merge(data, templateFn, liveRepeatOptions, transitionOptions) {
        this.templateFn = templateFn;
        this.options.update(liveRepeatOptions);
        this.transition.updateOptions(transitionOptions);
        this.updatePreRendered();
        if (liveRepeatOptions === null || liveRepeatOptions === void 0 ? void 0 : liveRepeatOptions.renderCount) {
            this.processor.updateRenderCount(liveRepeatOptions.renderCount);
        }
        if (data !== this.rawData) {
            this.watchAndUpdateData(data);
            this.rawData = data;
        }
        else if (this.lastWatcher) {
            this.update();
        }
    }
    updatePreRendered() {
        if (this.options.get('preRendering') && !this.preRendered) {
            this.preRendered = new Map();
        }
        else if (!this.options.get('preRendering') && this.preRendered) {
            this.preRendered = null;
        }
    }
    watchAndUpdateData(data) {
        this.tryDeleteLastWatcher();
        if (!data) {
            this.fullData = [];
            return;
        }
        let watchFn = () => {
            return [...data];
        };
        let onUpdate = (data) => {
            this.fullData = data;
            this.update();
        };
        this.lastWatcher = new watchers_1.LazyWatcher(watchFn, onUpdate, this.context);
        this.getWatcherGroup().add(this.lastWatcher);
        onUpdate(this.lastWatcher.value);
    }
    /** Get watcher group to add or delete watcher. */
    getWatcherGroup() {
        var _a;
        return ((_a = this.context) === null || _a === void 0 ? void 0 : _a.__getWatcherGroup()) || watchers_1.GlobalWatcherGroup;
    }
    /** If have, delete last registered watcher. */
    tryDeleteLastWatcher() {
        if (this.lastWatcher) {
            this.getWatcherGroup().delete(this.lastWatcher);
            this.lastWatcher = null;
        }
    }
    /** Serveral update entry: normal update; from `setStartIndex`, from `reload`. */
    update() {
        // Update after watchers and components.
        queue_1.enqueueUpdatableInOrder(this, this.context, updatable_queue_1.UpdatableUpdateOrder.Directive);
    }
    __updateImmediately() {
        this.processor.updateDataCount(this.fullData.length);
        this.processor.updateRendering(this.updateFromIndices.bind(this));
    }
    /** Returns a promise which will be resolved after data updated and renderer. */
    untilDataUpdatedAndRendered() {
        return new Promise(resolve => {
            this.once('liveDataRendered', resolve);
        });
    }
    checkCoverage() {
        this.processor.updateRenderingSmoothlyIfNeeded(this.updateFromIndices.bind(this));
    }
    updateFromIndices(startIndex, endIndex, scrollDirection) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.updateLiveData(this.fullData.slice(startIndex, endIndex), scrollDirection);
        this.triggerLiveDataEvents(scrollDirection);
    }
    updateLiveData(newData, scrollDirection) {
        this.updateVersion++;
        let shouldPaly = this.transition.canPlay();
        let shouldReuse = !shouldPaly && !this.options.get('preRendering');
        let oldData = this.liveData;
        let oldRepTems = this.repTems;
        let editRecord = edit_1.getEditRecord(oldData, newData, shouldReuse);
        this.liveData = newData;
        this.repTems = [];
        for (let record of editRecord) {
            let { type, fromIndex, toIndex, moveFromIndex } = record;
            let oldRepTem = fromIndex < oldRepTems.length && fromIndex !== -1 ? oldRepTems[fromIndex] : null;
            if (type === edit_1.EditType.Delete) {
                this.removeRepTemAndMayPlayLeave(oldRepTem, shouldPaly);
            }
            else {
                let newItem = newData[toIndex];
                if (type === edit_1.EditType.Leave) {
                    this.useMatchedRepTem(oldRepTem, newItem, toIndex);
                }
                else if (type === edit_1.EditType.Move) {
                    this.moveRepTemBefore(oldRepTems[moveFromIndex], oldRepTem);
                    this.useMatchedRepTem(oldRepTems[moveFromIndex], newItem, toIndex);
                }
                else if (type === edit_1.EditType.MoveModify) {
                    this.moveRepTemBefore(oldRepTems[moveFromIndex], oldRepTem);
                    this.reuseRepTem(oldRepTems[moveFromIndex], newItem, toIndex);
                }
                else if (type === edit_1.EditType.Insert) {
                    let newRepTem = this.createRepTem(newItem, toIndex);
                    this.moveRepTemBefore(newRepTem, oldRepTem);
                    if (shouldPaly) {
                        this.mayPlayEnter(newRepTem);
                    }
                }
            }
        }
        if (this.options.get('preRendering')) {
            utils_1.untilIdle().then(() => {
                this.doPreRendering(scrollDirection);
            });
        }
    }
    triggerLiveDataEvents(scrollDirection) {
        this.emit('liveDataUpdated', this.liveData, this.startIndex, scrollDirection);
        queue_1.untilRenderComplete().then(async () => {
            // Wait for another micro task, so can be called after even scrollTop updated.
            await Promise.resolve();
            this.emit('liveDataRendered', this.liveData, this.startIndex, scrollDirection);
        });
    }
    moveRepTemBefore(repTem, nextOldRepTem) {
        if (nextOldRepTem) {
            nextOldRepTem.template.before(repTem.template);
        }
        else {
            this.anchor.insert(repTem.template.extractToFragment());
        }
    }
    useMatchedRepTem(repTem, item, index) {
        repTem.update(item, this.startIndex + index);
        this.repTems.push(repTem);
    }
    reuseRepTem(repTem, item, index) {
        var _a, _b;
        (_a = this.preRendered) === null || _a === void 0 ? void 0 : _a.delete(repTem.item);
        (_b = this.preRendered) === null || _b === void 0 ? void 0 : _b.set(item, repTem);
        repTem.update(item, this.startIndex + index);
        this.repTems.push(repTem);
    }
    createRepTem(item, index) {
        var _a, _b;
        if ((_a = this.preRendered) === null || _a === void 0 ? void 0 : _a.has(item)) {
            let repTem = this.preRendered.get(item);
            repTem.connect();
            repTem.update(item, index);
            this.repTems.push(repTem);
            return repTem;
        }
        else {
            let repTem = new repetitive_template_1.RepetitiveTemplate(this, item, this.startIndex + index);
            this.repTems.push(repTem);
            (_b = this.preRendered) === null || _b === void 0 ? void 0 : _b.set(item, repTem);
            return repTem;
        }
    }
    mayPlayEnter(repTem) {
        let template = repTem.template;
        let firstElement = template.getFirstElement();
        if (firstElement) {
            this.transition.playEnter(firstElement);
        }
    }
    removeRepTemAndMayPlayLeave(repTem, shouldPaly) {
        let template = repTem.template;
        if (shouldPaly) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                this.transition.playLeave(firstElement).then((finish) => {
                    if (finish) {
                        this.removeRepTem(repTem);
                    }
                });
            }
            else {
                this.removeRepTem(repTem);
            }
        }
        else {
            this.removeRepTem(repTem);
        }
    }
    removeRepTem(repTem) {
        repTem.remove();
    }
    /** Get `startIndex` for the start index of current rendered items. */
    getStartIndex() {
        return this.startIndex;
    }
    /**
     * Set `startIndex`, and the item in this index will be at the top start position of the viewport.
     * If needs to update, will update firstly and then set index.
     */
    setStartIndex(index) {
        this.processor.setStartIndex(index);
        this.update();
    }
    /** Whether specifies a start index. */
    isStartIndexSpecified() {
        return this.processor.isStartIndexSpecified();
    }
    /**
     * Get `endIndex` for the end index of current rendered items.
     * The returned value equals index of last index of rendered item +1.
     */
    getEndIndex() {
        return this.startIndex;
    }
    /**
     * Get the index of the first visible element, which can be used to restore scrolling position by `setFirstVisibleIndex`.
     * May cause page reflow.
     */
    getFirstVisibleIndex() {
        return Math.max(0, utils_1.locateFirstVisibleIndex(this.scroller, this.sliderChildren.getChildren())) + this.startIndex;
    }
    /**
     * Get the index of the last visible element.
     * May cause page reflow.
     */
    getLastVisibleIndex() {
        return Math.max(0, utils_1.locateLastVisibleIndex(this.scroller, this.sliderChildren.getChildren()));
    }
    /**
     * Make item in the specified index becomes visible by scrolling minimum pixels.
     * Try to adjust immediately, so you will need to ensure elements rendered.
     * Will re-render if the element in specified index is not rendered.
     */
    async makeIndexVisible(index) {
        if (this.isIndexRendered(index)) {
            return this.scrollToViewRenderedIndex(index);
        }
        else {
            this.setStartIndex(index);
            await this.untilDataUpdatedAndRendered();
            return this.scrollToViewRenderedIndex(index);
        }
    }
    /** Get if item with specified index is rendered. */
    isIndexRendered(index) {
        return index >= this.startIndex && index < this.startIndex + this.liveData.length;
    }
    /** After item in index rendered, make it visible. */
    scrollToViewRenderedIndex(index) {
        let el = this.sliderChildren.childAt(index - this.startIndex);
        if (!el) {
            return false;
        }
        let scrollerRect = this.scroller.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        // Below it, need to scroll up.
        if (elRect.bottom > scrollerRect.bottom) {
            this.scroller.scrollTop = this.scroller.scrollTop + (elRect.bottom - scrollerRect.bottom);
        }
        // Above it, need to scroll down.
        else if (elRect.top < scrollerRect.top) {
            this.scroller.scrollTop = this.scroller.scrollTop + (scrollerRect.top - elRect.top);
        }
        return true;
    }
    /**
     * Make item in the specified index visible at the top edge of scroller.
     * Try to adjust immediately, so you will need to ensure elements rendered.
     * Will re-render if the element in specified index is not rendered.
     */
    async makeIndexVisibleAtTop(index) {
        if (this.isIndexRendered(index)) {
            return this.scrollToMakeRenderedIndexAtTop(index);
        }
        else {
            this.setStartIndex(index);
            await this.untilDataUpdatedAndRendered();
            return this.scrollToMakeRenderedIndexAtTop(index);
        }
    }
    /**
     * Make item in the specified index becomes visible at the top scroll position.
     * If needs to update, will update firstly and then set index.
     */
    async setFirstVisibleIndex(index) {
        this.setStartIndex(index);
        await this.untilDataUpdatedAndRendered();
        return this.scrollToMakeRenderedIndexAtTop(index);
    }
    /** After item in index rendered, make it becomes visible at the top scroll position. */
    scrollToMakeRenderedIndexAtTop(index) {
        let el = this.sliderChildren.childAt(index - this.startIndex);
        if (!el) {
            return false;
        }
        let scrollerRect = this.scroller.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        this.scroller.scrollTop = this.scroller.scrollTop + (elRect.top - scrollerRect.top);
        return true;
    }
    /** Handle pre-rendering */
    async doPreRendering(scrollDirection) {
        let version = this.updateVersion;
        let preRendered = this.preRendered;
        // Determine the maximum range that need to pre-render, must include current range.
        let renderCount = this.options.get('renderCount') * this.processor.getRenderGroupCount();
        let startIndex = Math.max(0, this.startIndex - renderCount);
        let endIndex = Math.min(this.fullData.length, this.endIndex + renderCount);
        // The data and global indices that should be pre-rendered.
        let data = this.fullData.slice(startIndex, endIndex);
        let dataSet = new Set(data);
        let indices = [];
        let restRepTems = [];
        // Rlease items out of maximun range.
        for (let item of preRendered.keys()) {
            if (!dataSet.has(item)) {
                let repTem = preRendered.get(item);
                repTem.disconnect();
                restRepTems.push(repTem);
                preRendered.delete(item);
            }
        }
        // If scrolling down, only pre-render items below.
        if (scrollDirection === 'down' || scrollDirection === null) {
            for (let i = this.endIndex; i < endIndex; i++) {
                indices.push(i);
            }
        }
        else {
            for (let i = startIndex; i < this.startIndex; i++) {
                indices.push(i);
            }
        }
        let createCount = 0;
        for (let index of indices) {
            let item = this.fullData[index];
            if (preRendered.has(item)) {
                continue;
            }
            if (restRepTems.length > 0) {
                let repTem = restRepTems.pop();
                repTem.update(item, index);
                preRendered.set(item, repTem);
            }
            else {
                // Keep it disconnect, so it will not affect rendering performance and still have a rough render results.
                let repTem = new repetitive_template_1.RepetitiveTemplate(this, item, index);
                repTem.disconnect();
                repTem.template.preRender();
                preRendered.set(item, repTem);
                createCount++;
            }
            if (createCount % 15 === 0) {
                await utils_1.untilIdle();
                if (this.updateVersion !== version) {
                    break;
                }
            }
        }
    }
    getContext() {
        return this.context;
    }
    getTemplateFn() {
        return this.templateFn;
    }
    remove() {
        this.tryDeleteLastWatcher();
        dom_event_1.off(this.scroller, 'scroll.passive', this.checkCoverage, this);
        if (this.observer) {
            this.observer.disconnect();
        }
        else {
            dom_event_1.off(window, 'resize', this.checkCoverage, this);
        }
        // Pre-rendering items are not connected, no need to remove them.
        for (let repTem of this.repTems) {
            repTem.remove();
        }
    }
}
exports.LiveRepeatDirective = LiveRepeatDirective;
/**
 * `liveRepeat(items, () => html`...`, ?liveRepeatOptions, ?transitionOptions)` gerenates partial elements only in current viewport,
 * and keeps re-rendering to cover current viewport after you scrolled.
 *
 * Note the `liveRepeat` directive must be contained in the html struct like `
 *	 <div title="as a scroll parent" style="overflow: auto | scroll; position: relative;">
 *	    <div title="as a scroll slider" style="position: absolute;">
 *		  ${liveRepeat(...)}
 *	    </div>
 *   </div>`
 *
 * @param items The iterable data, each item in it will pass to `templateFn`.
 * @param templateFn The fucntion which will return a template result from data item and index position. Rendered nodes must be contained in a container element.
 * @param liveRepeatOptions Options for live rendering.
 * @param transitionOptions The transition options, it can be a transition name, property or properties, or {transition, enterAtStart}.
 */
exports.liveRepeat = define_1.defineDirective(LiveRepeatDirective);


/***/ }),

/***/ "../flit/out/directives/repeat.js":
/*!****************************************!*\
  !*** ../flit/out/directives/repeat.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = exports.RepeatDirective = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
const contextual_transition_1 = __webpack_require__(/*! ../internals/contextual-transition */ "../flit/out/internals/contextual-transition.js");
const repetitive_template_1 = __webpack_require__(/*! ./helpers/repetitive-template */ "../flit/out/directives/helpers/repetitive-template.js");
const watchers_1 = __webpack_require__(/*! ../watchers */ "../flit/out/watchers/index.js");
const edit_1 = __webpack_require__(/*! ../helpers/edit */ "../flit/out/helpers/edit.js");
const utils_1 = __webpack_require__(/*! ../helpers/utils */ "../flit/out/helpers/utils.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
/**
 * `repeat` directive doesn't watches the dependencies when updating a component,
 * instead, it watches dependencies when updating each item,
 * and update each item indenpent after it's dependencies changed.
 */
class RepeatDirective {
    constructor(anchor, context) {
        /** Cached last data that comes from outside, before been processed. */
        this.rawData = null;
        /** Current rendered data. */
        this.data = [];
        /** Current rendered templates, maps with `lastData` one by one. */
        this.repTems = [];
        /** Watcher to watch data changes. */
        this.lastWatcher = null;
        this.anchor = anchor;
        this.context = context;
        this.transition = new contextual_transition_1.ContextualTransition(context);
    }
    canMergeWith(_data, templateFn) {
        // Compare string of two functions should be fast:
        // string  of function represent as a fixed sring,
        // and strings will compare by hash, not per character.
        return templateFn === this.templateFn || templateFn.toString() === this.templateFn.toString();
    }
    merge(data, templateFn, options) {
        this.templateFn = templateFn;
        this.transition.updateOptions(options);
        // Outer components update frequently,
        // Data has a high rate that not been updated.
        // So here we don't rerender except really found data changes from a inner watcher.
        if (data !== this.rawData) {
            this.watchAndUpdateData(data);
            this.rawData = data;
        }
        else if (this.lastWatcher) {
            this.updateData(this.data);
        }
    }
    watchAndUpdateData(data) {
        this.tryDeleteLastWatcher();
        if (!data) {
            this.updateData([]);
            return;
        }
        // Here read each item of the `Iterable<T>` so we can observe changes like `a[i] = xxx`.
        // Other, here will observe each item of data.
        let watchFn = () => {
            return [...data];
        };
        // Uses lazy watcher to watch each item of data changes,
        // So each item can be updated indepent,
        // and can also avoid unnecessary updating after total directive data updated.
        this.lastWatcher = new watchers_1.LazyWatcher(watchFn, this.updateData.bind(this), this.context);
        this.getWatcherGroup().add(this.lastWatcher);
        this.updateData(this.lastWatcher.value);
    }
    /** Get watcher group to add watcher. */
    getWatcherGroup() {
        var _a;
        return ((_a = this.context) === null || _a === void 0 ? void 0 : _a.__getWatcherGroup()) || watchers_1.GlobalWatcherGroup;
    }
    /** If have, delete last registered watcher. */
    tryDeleteLastWatcher() {
        if (this.lastWatcher) {
            this.getWatcherGroup().delete(this.lastWatcher);
            this.lastWatcher = null;
        }
    }
    updateData(newData) {
        let shouldPaly = this.transition.canPlay();
        let shouldReuse = !shouldPaly;
        let oldData = this.data;
        let oldRepTems = this.repTems;
        let editRecord = edit_1.getEditRecord(oldData, newData, shouldReuse);
        this.data = newData;
        this.repTems = [];
        for (let record of editRecord) {
            let { type, fromIndex, toIndex, moveFromIndex } = record;
            let oldRepTem = fromIndex < oldRepTems.length && fromIndex !== -1 ? oldRepTems[fromIndex] : null;
            let newItem = newData[toIndex];
            if (type === edit_1.EditType.Leave) {
                this.useMatchedRepTem(oldRepTem, newItem, toIndex);
            }
            else if (type === edit_1.EditType.Move) {
                this.moveRepTemBefore(oldRepTems[moveFromIndex], oldRepTem);
                this.useMatchedRepTem(oldRepTems[moveFromIndex], newItem, toIndex);
            }
            else if (type === edit_1.EditType.MoveModify) {
                this.moveRepTemBefore(oldRepTems[moveFromIndex], oldRepTem);
                this.reuseRepTem(oldRepTems[moveFromIndex], newItem, toIndex);
            }
            else if (type === edit_1.EditType.Insert) {
                let newRepTem = this.createRepTem(newItem, toIndex);
                this.moveRepTemBefore(newRepTem, oldRepTem);
                if (shouldPaly) {
                    this.mayPlayEnter(newRepTem);
                }
            }
            else if (type === edit_1.EditType.Delete) {
                this.removeRepTemAndMayPlayLeave(oldRepTem, shouldPaly);
            }
        }
    }
    moveRepTemBefore(repTem, nextOldRepTem) {
        if (nextOldRepTem) {
            nextOldRepTem.template.before(repTem.template);
        }
        else {
            this.anchor.insert(repTem.template.extractToFragment());
        }
    }
    useMatchedRepTem(repTem, item, index) {
        // Must update even reuse matched item,
        // Because scoped variables may changed.
        repTem.update(item, index);
        this.repTems.push(repTem);
    }
    reuseRepTem(repTem, item, index) {
        repTem.update(item, index);
        this.repTems.push(repTem);
    }
    createRepTem(item, index) {
        let repTem = new repetitive_template_1.RepetitiveTemplate(this, item, index);
        this.repTems.push(repTem);
        return repTem;
    }
    mayPlayEnter(repTem) {
        let template = repTem.template;
        let firstElement = template.getFirstElement();
        if (firstElement) {
            this.transition.playEnter(firstElement);
        }
    }
    removeRepTemAndMayPlayLeave(repTem, shouldPaly) {
        let template = repTem.template;
        if (shouldPaly) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                this.transition.playLeave(firstElement).then((finish) => {
                    if (finish) {
                        this.removeRepTem(repTem);
                    }
                });
            }
            else {
                this.removeRepTem(repTem);
            }
        }
        else {
            this.removeRepTem(repTem);
        }
    }
    removeRepTem(repTem) {
        repTem.remove();
    }
    /**
     * Make item in the specified index becomes visible by scrolling minimum pixels in Y direction.
     * Try to adjust immediately, so you will need to ensure elements rendered.
     */
    makeIndexVisible(index) {
        var _a;
        let el = (_a = this.repTems[index]) === null || _a === void 0 ? void 0 : _a.template.getFirstElement();
        if (!el) {
            return false;
        }
        let scroller = utils_1.getClosestScrollWrapper(el);
        if (!scroller) {
            return false;
        }
        let scrollerRect = scroller.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        // Below it, need to scroll up.
        if (elRect.bottom > scrollerRect.bottom) {
            scroller.scrollTop = scroller.scrollTop + (elRect.bottom - scrollerRect.bottom);
        }
        // Above it, need to scroll down.
        else if (elRect.top < scrollerRect.top) {
            scroller.scrollTop = scroller.scrollTop + (scrollerRect.top - elRect.top);
        }
        return true;
    }
    /**
     * Make item in the specified index visible at the top edge of scroller.
     * Try to adjust immediately, so you will need to ensure elements rendered.
     */
    makeIndexVisibleAtTop(index) {
        var _a;
        let el = (_a = this.repTems[index]) === null || _a === void 0 ? void 0 : _a.template.getFirstElement();
        if (!el) {
            return false;
        }
        let scroller = utils_1.getClosestScrollWrapper(el);
        if (!scroller) {
            return false;
        }
        let scrollerRect = scroller.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        scroller.scrollTop = scroller.scrollTop + (elRect.top - scrollerRect.top);
        return true;
    }
    /**
     * Make item in the specified index becomes visible at the top scroll position.
     * If needs to update, will update firstly and then set index.
     */
    async setFirstVisibleIndex(index) {
        var _a;
        await queue_1.untilRenderComplete();
        let el = (_a = this.repTems[index]) === null || _a === void 0 ? void 0 : _a.template.getFirstElement();
        if (!el) {
            return false;
        }
        let scroller = utils_1.getClosestScrollWrapper(el);
        if (!scroller) {
            return false;
        }
        let scrollerRect = scroller.getBoundingClientRect();
        let elRect = el.getBoundingClientRect();
        scroller.scrollTop = scroller.scrollTop + (elRect.top - scrollerRect.top);
        return true;
    }
    getContext() {
        return this.context;
    }
    getTemplateFn() {
        return this.templateFn;
    }
    remove() {
        this.tryDeleteLastWatcher();
        for (let repTem of this.repTems) {
            repTem.remove();
        }
    }
}
exports.RepeatDirective = RepeatDirective;
/**
 * `repeat(items, () => html`...`, ?options)` gerenates repeated elements,
 * and will reuse elements as much as possible when data changed.
 * Currently the repeat directive reuses rendered elements by data objects, no `key` can be specified.
 * If you do need to reuse elements by a `key`, try repeat the `key` values.
 *
 * @param items The iterable data, each item in it will pass to `templateFn`.
 * @param templateFn The fucntion which will return a template from one iterable data item and index position.
 * @param options The transition options, it can be a transition name, property or properties, or {transition, enterAtStart}.
 */
exports.repeat = define_1.defineDirective(RepeatDirective);


/***/ }),

/***/ "../flit/out/directives/toggle.js":
/*!****************************************!*\
  !*** ../flit/out/directives/toggle.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.toggle = exports.ToggleDirective = void 0;
const define_1 = __webpack_require__(/*! ./define */ "../flit/out/directives/define.js");
const template_1 = __webpack_require__(/*! ../template */ "../flit/out/template/index.js");
const contextual_transition_1 = __webpack_require__(/*! ../internals/contextual-transition */ "../flit/out/internals/contextual-transition.js");
/**
 * Compare to `cache`, if we just want to toggle and play enter and leave transition,
 * and don't want to cache elements, we will need this directive.
 */
class ToggleDirective {
    constructor(anchor, context) {
        this.currentTemplate = null;
        this.anchor = anchor;
        this.context = context;
        this.transition = new contextual_transition_1.ContextualTransition(context);
    }
    canMergeWith() {
        return true;
    }
    merge(result, options) {
        this.transition.updateOptions(options);
        if (result) {
            // Matches, merge them. will not play transition.
            if (this.currentTemplate && this.currentTemplate.canMergeWith(result)) {
                this.currentTemplate.merge(result);
            }
            else {
                // Moves out current.
                if (this.currentTemplate) {
                    this.movesOutCurrentTemplate();
                }
                this.makeNewTemplate(result);
            }
        }
        else {
            // Moves out current.
            if (this.currentTemplate) {
                this.movesOutCurrentTemplate();
            }
        }
    }
    async playEnterTransition(template) {
        let firstElement = template.getFirstElement();
        if (firstElement) {
            await this.transition.playEnter(firstElement);
        }
    }
    async movesOutCurrentTemplate() {
        let template = this.currentTemplate;
        let playing = false;
        if (this.transition.shouldPlayLeave()) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                let finish = await this.transition.playLeave(firstElement);
                if (finish) {
                    template.remove();
                }
            }
            playing = true;
        }
        if (!playing) {
            template.movesOut();
        }
        this.currentTemplate = null;
    }
    makeNewTemplate(result) {
        let template = new template_1.Template(result, this.context);
        this.anchor.insert(template.extractToFragment());
        this.tryPlayEnterTransition(template);
        this.currentTemplate = template;
    }
    async tryPlayEnterTransition(template) {
        if (this.transition.shouldPlayEnter()) {
            let firstElement = template.getFirstElement();
            if (firstElement) {
                await this.transition.playEnter(firstElement);
            }
        }
    }
    remove() {
        if (this.currentTemplate) {
            this.currentTemplate.remove();
        }
    }
}
exports.ToggleDirective = ToggleDirective;
/**
 * `toggle(changableContent, ?options)` toggles rendering content and can play enter or leave transition easily.
 *
 * @param result The html`...` result, can be `null` or empty string.
 * @param options Options for transition.
 */
exports.toggle = define_1.defineDirective(ToggleDirective);


/***/ }),

/***/ "../flit/out/globals/render.js":
/*!*************************************!*\
  !*** ../flit/out/globals/render.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenderedAsComponent = exports.renderUpdatable = exports.render = void 0;
const template_1 = __webpack_require__(/*! ../template */ "../flit/out/template/index.js");
const component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
const directives_1 = __webpack_require__(/*! ../directives */ "../flit/out/directives/index.js");
const watchers_1 = __webpack_require__(/*! ../watchers */ "../flit/out/watchers/index.js");
/**
 * Render html codes or a template result like html`...` within a `context`.
 * Returns the rendered template, you may append it to another element,
 * or extract to a fragment and insert into any place.
 * Otherwise you can also patch it with another template result.
 *
 * @param codes The html code piece or html`...` template result, or a directive result.
 * @param context The context to use when rendering.
 * @return A `Template` instance.
 */
function render(codes, context = null) {
    if (codes instanceof directives_1.DirectiveResult) {
        codes = template_1.html `${codes}`;
    }
    let template = new template_1.Template(codes, context);
    return template;
}
exports.render = render;
/**
 * Render template result like html`...` that returned from `renderFn`.
 * Returns the rendered template, you may append it to another element,
 * or extract to a fragment and insert into any place.
 * Otherwise returns a `unwatch` function, call which will stop watching `renderFn`.
 *
 * Will watch `renderFn`, If it's dependent datas changed, will automaticaly updated and call `onUpdate`.
 *
 * @param renderFn Returns template like html`...`
 * @param context The context you used when rendering.
 * @param onUpdate Called when update after referenced data changed. if new result can't merge with old, will pass a new fragment as parameter.
 * @return A `{template, unwatch}` object, calls `unwatch` will stop watching `renderFn`. If `context` specifed, will unwatch automatically after context revoked.
 */
function renderUpdatable(renderFn, context = null, onUpdate) {
    let template;
    let unwatch = (context || watchers_1.GlobalWatcherGroup).watchImmediately(renderFn, (result) => {
        if (result instanceof directives_1.DirectiveResult) {
            result = template_1.html `${result}`;
        }
        if (template) {
            template.merge(result);
            if (onUpdate) {
                onUpdate();
            }
        }
        else {
            template = new template_1.Template(result, context);
        }
    });
    return {
        template: template,
        unwatch,
    };
}
exports.renderUpdatable = renderUpdatable;
/**
 * Get a component immediately from a just rendered template.
 * @param template The just rendered template from `render` or `renderUpdatable`.
 * @returns A component if first element has a component registered, otherwise be `null`.
 */
function getRenderedAsComponent(template) {
    let firstElement = template.getFirstElement();
    if (firstElement && firstElement.localName.includes('-')) {
        return component_1.createComponent(firstElement);
    }
    return null;
}
exports.getRenderedAsComponent = getRenderedAsComponent;


/***/ }),

/***/ "../flit/out/globals/update.js":
/*!*************************************!*\
  !*** ../flit/out/globals/update.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
Object.defineProperty(exports, "updateAllComponents", { enumerable: true, get: function () { return component_1.updateAllComponents; } });
Object.defineProperty(exports, "updateAllStyles", { enumerable: true, get: function () { return component_1.updateAllStyles; } });
var watchers_1 = __webpack_require__(/*! ../watchers */ "../flit/out/watchers/index.js");
Object.defineProperty(exports, "updateAllGlobalWatchers", { enumerable: true, get: function () { return watchers_1.updateAllGlobalWatchers; } });


/***/ }),

/***/ "../flit/out/helpers/edit.js":
/*!***********************************!*\
  !*** ../flit/out/helpers/edit.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditRecord = exports.EditType = void 0;
const two_way_map_1 = __webpack_require__(/*! ./two-way-map */ "../flit/out/helpers/two-way-map.js");
var EditType;
(function (EditType) {
    /**
     * Ignores, will be used later as a matched item or reuse it.
     * Used internal, no need to handle it in your code.
     */
    EditType[EditType["Skip"] = 0] = "Skip";
    /** Leaves because of match. */
    EditType[EditType["Leave"] = 1] = "Leave";
    /** Moves same item from it's old index to current index. */
    EditType[EditType["Move"] = 2] = "Move";
    // /** Modify item and not move it, not supported because we don't validate position of reuseable element. */
    // Modify,
    /** Move + Modify. */
    EditType[EditType["MoveModify"] = 3] = "MoveModify";
    /** Insert a new one. */
    EditType[EditType["Insert"] = 4] = "Insert";
    /** Delete. */
    EditType[EditType["Delete"] = 5] = "Delete";
})(EditType = exports.EditType || (exports.EditType = {}));
/** Get a edit record from an old indices graph to a new one. */
function getEditRecord(oldItems, newItems, willReuse) {
    if (newItems.length === 0) {
        return oldItems.map((_item, index) => {
            return {
                type: EditType.Delete,
                fromIndex: index,
                toIndex: -1,
                moveFromIndex: -1,
            };
        });
    }
    else if (oldItems.length === 0) {
        return newItems.map((_item, index) => {
            return {
                type: EditType.Insert,
                fromIndex: 0,
                toIndex: index,
                moveFromIndex: -1,
            };
        });
    }
    else {
        return getNormalEditRecord(oldItems, newItems, willReuse);
    }
}
exports.getEditRecord = getEditRecord;
/**
 * When `oldItems` and `newItems` are both not empty.
 * When `willReuse` is `false`, will never reuse items.
 */
function getNormalEditRecord(oldItems, newItems, willReuse) {
    // indexMap: old index <-> new index.
    let { indexMap, restOldIndices } = makeTwoWayIndexMap(oldItems, newItems);
    // All the new index that have an old index map, and order by their order in the `oldItems`.
    let indicesInNew = [];
    for (let oldIndex of indexMap.getAllLeft()) {
        let indexInNew = indexMap.getFromLeft(oldIndex);
        indicesInNew.push(indexInNew);
    }
    // Get a increased sequence from new indices that have an old index map, so no need move this part.
    let stableNewIndexStack = new ReadonlyStack(findLongestIncreasedSequence(indicesInNew));
    // Count of items that will be reused.
    let restOldIndicesStack = new ReadonlyStack(restOldIndices);
    // Another optimization:
    // After get stable items, some reuseable items between two stable items can be reused without moving.
    // This is good when data is absolutely random, but not help much for normal data.
    let edit = [];
    let oldIndex = 0;
    let newIndex = 0;
    let nextStableNewIndex = stableNewIndexStack.getNext();
    let nextStableOldIndex = indexMap.getFromRight(nextStableNewIndex);
    while (oldIndex < oldItems.length || newIndex < newItems.length) {
        let type;
        let moveFromIndex = -1;
        let fromIndex = oldIndex;
        let toIndex = newIndex;
        // New ended, delete old.
        if (newIndex === newItems.length) {
            type = EditType.Skip;
            oldIndex++;
        }
        // Old not matches, leaves old to be reused or deletes it.
        else if (oldIndex !== nextStableOldIndex && oldIndex < oldItems.length) {
            type = EditType.Skip;
            oldIndex++;
        }
        // Old and new matches, skip them all.
        else if (newIndex === nextStableNewIndex) {
            type = EditType.Leave;
            oldIndex++;
            newIndex++;
            nextStableNewIndex = stableNewIndexStack.isEnded() ? -1 : stableNewIndexStack.getNext();
            nextStableOldIndex = nextStableNewIndex === -1 ? -1 : indexMap.getFromRight(nextStableNewIndex);
        }
        // Moves old to new position.
        else if (indexMap.hasRight(newIndex)) {
            type = EditType.Move;
            moveFromIndex = indexMap.getFromRight(newIndex);
            newIndex++;
        }
        // Reuses old.
        else if (willReuse && !restOldIndicesStack.isEnded()) {
            type = EditType.MoveModify;
            moveFromIndex = restOldIndicesStack.getNext();
            newIndex++;
        }
        // Creates new.
        else {
            type = EditType.Insert;
            moveFromIndex = -1;
            newIndex++;
        }
        if (type !== EditType.Skip) {
            edit.push({
                type,
                fromIndex,
                toIndex,
                moveFromIndex,
            });
        }
    }
    // Removes not used items.
    while (!restOldIndicesStack.isEnded()) {
        let fromIndex = restOldIndicesStack.getNext();
        edit.push({
            type: EditType.Delete,
            fromIndex,
            toIndex: -1,
            moveFromIndex: -1,
        });
    }
    return edit;
}
/** Create a 2 way index map: old index <-> new index, just like a sql inner join. */
function makeTwoWayIndexMap(oldItems, newItems) {
    // Have a little problem, will find last match when repeated items exist.
    let newItemIndexMap = new Map(newItems.map((item, index) => [item, index]));
    // old index <-> new index.
    let indexMap = new two_way_map_1.TwoWayMap();
    let restOldIndices = [];
    for (let i = 0; i < oldItems.length; i++) {
        let oldItem = oldItems[i];
        if (newItemIndexMap.has(oldItem)) {
            indexMap.add(i, newItemIndexMap.get(oldItem));
            // Must delete, or will cause error when same item exist.
            newItemIndexMap.delete(oldItem);
        }
        else {
            restOldIndices.push(i);
        }
    }
    return { indexMap, restOldIndices };
}
/**
 * A simple stack can get next one from start.
 * Can avoid shift or pop operation from an array.
 */
class ReadonlyStack {
    constructor(items) {
        this.offset = 0;
        this.items = items;
    }
    isEnded() {
        return this.offset >= this.items.length;
    }
    getNext() {
        return this.items[this.offset++];
    }
}
/** 237456 -> 23456 */
function findLongestIncreasedSequence(items) {
    // In the first loop, we try to find each increased sequence.
    // 237456 -> [23, 7, 456]
    let startIndex = 0;
    let increasedSequenceIndices = [];
    for (let i = 1; i < items.length; i++) {
        if (items[i] < items[i - 1]) {
            increasedSequenceIndices.push([startIndex, i]);
            startIndex = i;
        }
    }
    if (startIndex < items.length) {
        increasedSequenceIndices.push([startIndex, items.length]);
    }
    // In the second loop, we try to find the longest discreate increased sequence.
    // [23, 7, 456]
    // 23 -> 7 excluded -> 456
    // [2, 78, 456]
    // 2 -> 78 replaced -> 456 replaced
    let longest = [];
    let currentValue = -1;
    for (let i = 0; i < increasedSequenceIndices.length; i++) {
        let [start, end] = increasedSequenceIndices[i];
        if (items[start] > currentValue) {
            longest = [...longest, ...items.slice(start, end)];
            currentValue = longest[longest.length - 1];
        }
        else if (end - start > longest.length) {
            longest = items.slice(start, end);
            currentValue = longest[longest.length - 1];
        }
    }
    return longest;
}


/***/ }),

/***/ "../flit/out/helpers/mini-heap.js":
/*!****************************************!*\
  !*** ../flit/out/helpers/mini-heap.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Reference to: Book <<Algorithms Design Techniques and Analysis>> - M.H.Alsuwaiyel, Chapter 4.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniHeap = void 0;
/**
 * Minimum heap construct, can easily add or remove new items, and get minimum item.
 * Otherwise, it allocates very few memory when each time adding or removing.
 */
class MiniHeap {
    constructor(comparer) {
        /** Data array, caches the complete binary tree. */
        this.array = [];
        this.comparer = comparer;
    }
    /** Whether heap is empty. */
    isEmpty() {
        return this.array.length === 0;
    }
    /** Add new `value` to heap. */
    add(value) {
        this.array.push(value);
        this.shiftUp(this.array.length - 1);
    }
    /** Removes minimum value, returns it. */
    removeHead() {
        if (this.array.length === 0) {
            return undefined;
        }
        if (this.array.length === 1) {
            return this.array.pop();
        }
        let firstValue = this.array[0];
        this.array[0] = this.array.pop();
        this.shiftDown(0);
        return firstValue;
    }
    /** Swap value with parent if needed. */
    shiftUp(index) {
        if (index === 0) {
            return;
        }
        // If index is 1-based, this value is `index >> 1`.
        let parentIndex = ((index + 1) >> 1) - 1;
        // value in index is smaller, should moves up.
        if (this.comparer(this.array[index], this.array[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            // May still need to swap if here it swapped.
            this.shiftUp(parentIndex);
        }
    }
    /** Swap value with one child if needed. */
    shiftDown(index) {
        // If index is 1-based, `leftIndex` is `index << 1`.
        let rightIndex = (index + 1) << 1;
        let leftIndex = rightIndex - 1;
        let childIndex = leftIndex;
        // If right value is smaller, moves it up.
        if (rightIndex < this.array.length && this.comparer(this.array[leftIndex], this.array[rightIndex]) > 0) {
            childIndex = rightIndex;
        }
        if (childIndex >= this.array.length) {
            return;
        }
        // value in child index is smaller, should moves up.
        if (this.comparer(this.array[childIndex], this.array[index]) < 0) {
            this.swap(childIndex, index);
            // May still need to swap if here it swapped.
            this.shiftDown(childIndex);
        }
    }
    /** Swap values of two indices. */
    swap(i, j) {
        let vi = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = vi;
    }
    /** Clear all heap data. */
    clear() {
        this.array = [];
    }
}
exports.MiniHeap = MiniHeap;


/***/ }),

/***/ "../flit/out/helpers/references.js":
/*!*****************************************!*\
  !*** ../flit/out/helpers/references.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultReferences = void 0;
class ResultReferences {
    constructor() {
        /** Caches reference binding callback. */
        this.referenceMap = new WeakMap();
        /** Caches un-reference callback. */
        this.unReferenceMap = new WeakMap();
        /** Caches un-reference callback. */
        this.bindingUnReferenceMap = new WeakMap();
    }
    /** Add a reference which will be called after instance created. */
    addReference(result, ref) {
        this.referenceMap.set(result, ref);
    }
    /** Add a reference which will be called after instance removed. */
    addUnReference(result, unRef) {
        this.unReferenceMap.set(result, unRef);
    }
    /** Create a reference after instance created. */
    createReference(result, binding) {
        if (this.referenceMap.has(result)) {
            this.referenceMap.get(result)(binding);
        }
        if (this.unReferenceMap.has(result)) {
            let unRef = this.unReferenceMap.get(result);
            this.bindingUnReferenceMap.set(binding, unRef);
        }
    }
    /** Calls after instance removed. */
    removeReference(binding) {
        if (this.bindingUnReferenceMap.has(binding)) {
            this.bindingUnReferenceMap.get(binding)(binding);
        }
    }
}
exports.ResultReferences = ResultReferences;


/***/ }),

/***/ "../flit/out/helpers/two-way-map.js":
/*!******************************************!*\
  !*** ../flit/out/helpers/two-way-map.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoWayMap = void 0;
/**
 * L -> R
 * R -> L
 */
class TwoWayMap {
    constructor() {
        this.lm = new Map();
        this.rm = new Map();
    }
    getSize() {
        return this.lm.size;
    }
    /**
     * Both `l` and `r` must not been added before.
     * You may need to calls `deleteFromLeft` and `deleteFromRight` if you can't ensure this.
     */
    add(l, r) {
        this.lm.set(l, r);
        this.rm.set(r, l);
    }
    hasLeft(l) {
        return this.lm.has(l);
    }
    hasRight(r) {
        return this.rm.has(r);
    }
    getFromLeft(l) {
        return this.lm.get(l);
    }
    getFromRight(r) {
        return this.rm.get(r);
    }
    deleteFromLeft(l) {
        if (this.hasLeft(l)) {
            this.rm.delete(this.lm.get(l));
            this.lm.delete(l);
            return true;
        }
        return false;
    }
    deleteFromRight(r) {
        if (this.hasRight(r)) {
            this.lm.delete(this.rm.get(r));
            this.rm.delete(r);
            return true;
        }
        return false;
    }
    getAllLeft() {
        return this.lm.keys();
    }
    getAllRight() {
        return this.rm.keys();
    }
}
exports.TwoWayMap = TwoWayMap;


/***/ }),

/***/ "../flit/out/helpers/utils.js":
/*!************************************!*\
  !*** ../flit/out/helpers/utils.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestScrollWrapper = exports.getRect = exports.getElementCountBefore = exports.locateLastVisibleIndex = exports.locateFirstVisibleIndex = exports.untilIdle = exports.untilNextFrame = exports.repeatForTimes = exports.binaryFindIndexToInsert = exports.trim = void 0;
/** Trim text by removing `\r\n\t`. */
function trim(text) {
    return text.replace(/^[\r\n\t]+|[\r\n\t]+$/g, '');
}
exports.trim = trim;
/**
 * Find the closest index in a sorted array in where to insert new item.
 * Returned index betweens `0 - array.length`, and if `array[index]` exist, `fn(array[index]) >= 0`.
 * @param array The sorted array.
 * @param fn The function to accept item in array as argument and returns `-1` to move left, `1` to move right.
 */
function binaryFindIndexToInsert(array, fn) {
    if (array.length === 0) {
        return 0;
    }
    let result = fn(array[0]);
    if (result === 0 || result === -1) {
        return 0;
    }
    if (array.length === 1) {
        return 1;
    }
    result = fn(array[array.length - 1]);
    if (result === 0) {
        return array.length - 1;
    }
    if (result === 1) {
        return array.length;
    }
    let start = 0;
    let end = array.length - 1;
    while (end - start > 1) {
        let center = Math.floor((end + start) / 2);
        let result = fn(array[center]);
        if (result === 0) {
            return center;
        }
        else if (result === -1) {
            end = center;
        }
        else {
            start = center;
        }
    }
    return end;
}
exports.binaryFindIndexToInsert = binaryFindIndexToInsert;
/** Repeat value for count times. */
function repeatForTimes(value, count) {
    let values = [];
    for (let i = 0; i < count; i++) {
        values.push(value);
    }
    return values;
}
exports.repeatForTimes = repeatForTimes;
/** Resolves until next frame. */
function untilNextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    });
}
exports.untilNextFrame = untilNextFrame;
/** Resolves until CPU is idle or next frame. */
function untilIdle() {
    return new Promise(resolve => {
        if (requestIdleCallback) {
            requestIdleCallback(resolve);
        }
        else {
            setTimeout(resolve, 0);
        }
    });
}
exports.untilIdle = untilIdle;
/**
 * Locate the first element in els that is is visible inside container.
 * @container Container to check visible inside.
 * @param els Element list to check.
 */
function locateFirstVisibleIndex(container, els, minimumVisibleRate = 0.5) {
    return locateVisibleIndex(container, els, minimumVisibleRate, false);
}
exports.locateFirstVisibleIndex = locateFirstVisibleIndex;
/**
 * Locate the last element in els that is is visible inside container.
 * @container Container to check visible inside.
 * @param els Element list to check.
 */
function locateLastVisibleIndex(container, els, minimumVisibleRate = 0.5) {
    return locateVisibleIndex(container, els, minimumVisibleRate, true);
}
exports.locateLastVisibleIndex = locateLastVisibleIndex;
function locateVisibleIndex(container, els, minimumVisibleRate, locateLast) {
    let containerRect = container.getBoundingClientRect();
    let index = binaryFindIndexToInsert(els, (el) => {
        let rect = el.getBoundingClientRect();
        let yIntersect = Math.min(containerRect.bottom, rect.bottom) - Math.max(containerRect.top, rect.top);
        let intersectRate = yIntersect / Math.min(containerRect.height, rect.height);
        // Fully above.
        if (rect.bottom < containerRect.top) {
            return 1;
        }
        // Fully behind.
        else if (rect.top > containerRect.bottom) {
            return -1;
        }
        // Partly cross in top position.
        else if (rect.top < containerRect.top && intersectRate < minimumVisibleRate) {
            return 1;
        }
        // Partly cross in bottom position.
        else if (rect.bottom < containerRect.bottom && intersectRate < minimumVisibleRate) {
            return -1;
        }
        // Enough percentage that intersect with.
        // If `preferLast` is true, prefer moving to right.
        else {
            return locateLast ? 1 : -1;
        }
    });
    if (locateLast) {
        if (index > 0) {
            index -= 1;
        }
    }
    return index;
}
/** Get count of elements before current node. */
function getElementCountBefore(node) {
    let offset = 0;
    while (node.previousElementSibling) {
        node = node.previousElementSibling;
        offset += 1;
    }
    return offset;
}
exports.getElementCountBefore = getElementCountBefore;
/** Get an rect object just like `getBoundingClientRect`, but writtable. */
function getRect(el) {
    let rect = el.getBoundingClientRect();
    return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
    };
}
exports.getRect = getRect;
/**
 * Find the closest scroll wrapper, which has `overflow: auto / scroll` set.
 * Note that this method may cause reflow.
 */
function getClosestScrollWrapper(el) {
    while (el
        && el.scrollWidth <= el.clientWidth
        && el.scrollHeight <= el.clientHeight) {
        el = el.parentElement;
    }
    return el;
}
exports.getClosestScrollWrapper = getClosestScrollWrapper;


/***/ }),

/***/ "../flit/out/helpers/weak-2way-map.js":
/*!********************************************!*\
  !*** ../flit/out/helpers/weak-2way-map.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Weak2WayMap = void 0;
/**
 * Implement data constructor for two way map:
 * L -> R[]
 * R -> L[]
 */
class Weak2WayMap {
    constructor() {
        /** L -> R[] */
        this.lm = new WeakMap();
        /** R -> L[] */
        this.rm = new WeakMap();
    }
    /** Update `L -> R[]` and `R[] -> L` maps. */
    updateFromLeft(l, rs) {
        let oldRs = this.lm.get(l);
        if (!oldRs) {
            for (let r of rs) {
                this.addRightLeftMap(r, l);
            }
        }
        else {
            // Very high rate no need to add or delete.
            // So we test if should add or delete firstly.
            for (let r of rs) {
                if (!oldRs.has(r)) {
                    this.addRightLeftMap(r, l);
                }
            }
            for (let r of oldRs) {
                if (!rs.has(r)) {
                    this.deleteRightLeftMap(r, l);
                }
            }
        }
        this.lm.set(l, rs);
    }
    /** Add one `R -> L` map. */
    addRightLeftMap(r, l) {
        let ls = this.rm.get(r);
        if (!ls) {
            ls = new Set();
            this.rm.set(r, ls);
        }
        ls.add(l);
    }
    /** Deletes one `R -> L` map. */
    deleteRightLeftMap(r, l) {
        let ls = this.rm.get(r);
        if (ls) {
            ls.delete(l);
        }
    }
    /** Deletes one `L -> R` map. */
    deleteLeftRightMap(l, r) {
        let rs = this.lm.get(l);
        if (rs) {
            rs.delete(r);
        }
    }
    /** Get all `L[]` from `R` maps. */
    getFromRight(r) {
        return this.rm.get(r);
    }
    /** Clears all `R[] -> L` and `L -> R[]`. */
    clearFromLeft(l) {
        let rs = this.lm.get(l);
        if (rs) {
            for (let r of rs) {
                this.deleteRightLeftMap(r, l);
                this.deleteLeftRightMap(l, r);
            }
            // No need to delete WeakMap key.
            // this.lm.delete(l)
        }
    }
}
exports.Weak2WayMap = Weak2WayMap;


/***/ }),

/***/ "../flit/out/helpers/weak-2way-prop-map.js":
/*!*************************************************!*\
  !*** ../flit/out/helpers/weak-2way-prop-map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Weak2WayPropMap = void 0;
/**
 * Implement data constructor for two way property map:
 * L -> {R: [prop]}
 * R -> {prop: [L]}
 */
class Weak2WayPropMap {
    constructor() {
        /** L -> {R: [prop]} */
        this.lm = new WeakMap();
        /** R -> {prop: [L]} */
        this.rm = new WeakMap();
    }
    /** Update `L -> R[] -> props[]` and `R[] -> prop[] -> L` maps. */
    updateFromLeft(l, rps) {
        let oldRps = this.lm.get(l);
        if (!oldRps) {
            for (let [r, props] of rps) {
                this.addRightLeftMap(r, props, l);
            }
        }
        else {
            for (let [r, props] of rps) {
                if (oldRps.has(r)) {
                    this.updateRightLeftMap(r, oldRps.get(r), props, l);
                }
                else {
                    this.addRightLeftMap(r, props, l);
                }
            }
            for (let [r, props] of oldRps) {
                if (!rps.has(r)) {
                    this.deleteRightLeftMap(r, props, l);
                }
            }
        }
        this.lm.set(l, rps);
    }
    /** Add `L -> R -> prop[]` and `R -> prop[] -> L` map. */
    addRightLeftMap(r, props, l) {
        let pls = this.rm.get(r);
        if (!pls) {
            pls = new Map();
            this.rm.set(r, pls);
        }
        for (let prop of props) {
            let ls = pls.get(prop);
            if (!ls) {
                ls = new Set();
                pls.set(prop, ls);
            }
            ls.add(l);
        }
    }
    /** Update `R -> prop[] -> L` map. */
    updateRightLeftMap(r, oldProps, newProps, l) {
        let pls = this.rm.get(r);
        if (pls) {
            for (let prop of newProps) {
                if (!oldProps.has(prop)) {
                    let ls = pls.get(prop);
                    if (!ls) {
                        ls = new Set();
                        pls.set(prop, ls);
                    }
                    ls.add(l);
                }
            }
            for (let prop of oldProps) {
                if (!newProps.has(prop)) {
                    let ls = pls.get(prop);
                    if (ls) {
                        ls.delete(l);
                    }
                }
            }
        }
    }
    /** Deletes `R -> L -> prop[]` map. */
    deleteRightLeftMap(r, props, l) {
        let pls = this.rm.get(r);
        if (pls) {
            for (let prop of props) {
                let ls = pls.get(prop);
                if (ls) {
                    ls.delete(l);
                }
            }
        }
    }
    /** Deletes `L -> R -> prop[]` map. */
    deleteLeftRightMap(l, r) {
        let rps = this.lm.get(l);
        if (rps) {
            rps.delete(r);
        }
    }
    /** Get `L[]` from `R -> prop`. */
    getFromRight(r, prop) {
        let pls = this.rm.get(r);
        if (pls) {
            return pls.get(prop);
        }
        return undefined;
    }
    /** Clear all `L -> R[] -> prop[]` and `R[] -> prop[] -> L` maps. */
    clearFromLeft(l) {
        let rps = this.lm.get(l);
        if (rps) {
            for (let [r, props] of rps) {
                this.deleteRightLeftMap(r, props, l);
                this.deleteLeftRightMap(l, r);
            }
            // No need to delete WeakMap key.
            // this.lm.delete(l)
        }
    }
}
exports.Weak2WayPropMap = Weak2WayPropMap;


/***/ }),

/***/ "../flit/out/index.js":
/*!****************************!*\
  !*** ../flit/out/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __webpack_require__(/*! ./template */ "../flit/out/template/index.js");
Object.defineProperty(exports, "html", { enumerable: true, get: function () { return template_1.html; } });
Object.defineProperty(exports, "css", { enumerable: true, get: function () { return template_1.css; } });
Object.defineProperty(exports, "svg", { enumerable: true, get: function () { return template_1.svg; } });
Object.defineProperty(exports, "TemplateResult", { enumerable: true, get: function () { return template_1.TemplateResult; } });
Object.defineProperty(exports, "Template", { enumerable: true, get: function () { return template_1.Template; } });
var component_1 = __webpack_require__(/*! ./component */ "../flit/out/component/index.js");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.Component; } });
Object.defineProperty(exports, "define", { enumerable: true, get: function () { return component_1.define; } });
Object.defineProperty(exports, "addGlobalStyle", { enumerable: true, get: function () { return component_1.addGlobalStyle; } });
Object.defineProperty(exports, "getComponent", { enumerable: true, get: function () { return component_1.getComponent; } });
Object.defineProperty(exports, "getComponentAsync", { enumerable: true, get: function () { return component_1.getComponentAsync; } });
Object.defineProperty(exports, "getClosestComponentOfType", { enumerable: true, get: function () { return component_1.getClosestComponentOfType; } });
var bindings_1 = __webpack_require__(/*! ./bindings */ "../flit/out/bindings/index.js");
Object.defineProperty(exports, "defineBinding", { enumerable: true, get: function () { return bindings_1.defineBinding; } });
Object.defineProperty(exports, "refBinding", { enumerable: true, get: function () { return bindings_1.refBinding; } });
Object.defineProperty(exports, "BindingResult", { enumerable: true, get: function () { return bindings_1.BindingResult; } });
Object.defineProperty(exports, "show", { enumerable: true, get: function () { return bindings_1.show; } });
Object.defineProperty(exports, "hide", { enumerable: true, get: function () { return bindings_1.hide; } });
var directives_1 = __webpack_require__(/*! ./directives */ "../flit/out/directives/index.js");
Object.defineProperty(exports, "defineDirective", { enumerable: true, get: function () { return directives_1.defineDirective; } });
Object.defineProperty(exports, "refDirective", { enumerable: true, get: function () { return directives_1.refDirective; } });
Object.defineProperty(exports, "RepeatDirective", { enumerable: true, get: function () { return directives_1.RepeatDirective; } });
Object.defineProperty(exports, "ToggleDirective", { enumerable: true, get: function () { return directives_1.ToggleDirective; } });
Object.defineProperty(exports, "CacheDirective", { enumerable: true, get: function () { return directives_1.CacheDirective; } });
Object.defineProperty(exports, "DirectiveResult", { enumerable: true, get: function () { return directives_1.DirectiveResult; } });
Object.defineProperty(exports, "cache", { enumerable: true, get: function () { return directives_1.cache; } });
Object.defineProperty(exports, "toggle", { enumerable: true, get: function () { return directives_1.toggle; } });
Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return directives_1.repeat; } });
Object.defineProperty(exports, "liveRepeat", { enumerable: true, get: function () { return directives_1.liveRepeat; } });
Object.defineProperty(exports, "LiveRepeatDirective", { enumerable: true, get: function () { return directives_1.LiveRepeatDirective; } });
Object.defineProperty(exports, "liveAsyncRepeat", { enumerable: true, get: function () { return directives_1.liveAsyncRepeat; } });
Object.defineProperty(exports, "LiveAsyncRepeatDirective", { enumerable: true, get: function () { return directives_1.LiveAsyncRepeatDirective; } });
var dom_event_1 = __webpack_require__(/*! ./internals/dom-event */ "../flit/out/internals/dom-event.js");
Object.defineProperty(exports, "on", { enumerable: true, get: function () { return dom_event_1.on; } });
Object.defineProperty(exports, "once", { enumerable: true, get: function () { return dom_event_1.once; } });
Object.defineProperty(exports, "off", { enumerable: true, get: function () { return dom_event_1.off; } });
var transition_1 = __webpack_require__(/*! ./internals/transition */ "../flit/out/internals/transition.js");
Object.defineProperty(exports, "defineTransion", { enumerable: true, get: function () { return transition_1.defineTransion; } });
Object.defineProperty(exports, "getCSSEasingValue", { enumerable: true, get: function () { return transition_1.getCSSEasingValue; } });
Object.defineProperty(exports, "Transition", { enumerable: true, get: function () { return transition_1.Transition; } });
Object.defineProperty(exports, "isPlayingTransition", { enumerable: true, get: function () { return transition_1.isPlayingTransition; } });
Object.defineProperty(exports, "clearTransition", { enumerable: true, get: function () { return transition_1.clearTransition; } });
var updatable_options_1 = __webpack_require__(/*! ./internals/updatable-options */ "../flit/out/internals/updatable-options.js");
Object.defineProperty(exports, "UpdatableOptions", { enumerable: true, get: function () { return updatable_options_1.UpdatableOptions; } });
var observer_1 = __webpack_require__(/*! ./observer */ "../flit/out/observer/index.js");
Object.defineProperty(exports, "observe", { enumerable: true, get: function () { return observer_1.observe; } });
Object.defineProperty(exports, "observeGetting", { enumerable: true, get: function () { return observer_1.observeGetting; } });
var watchers_1 = __webpack_require__(/*! ./watchers */ "../flit/out/watchers/index.js");
Object.defineProperty(exports, "watch", { enumerable: true, get: function () { return watchers_1.watch; } });
Object.defineProperty(exports, "watchOnce", { enumerable: true, get: function () { return watchers_1.watchOnce; } });
Object.defineProperty(exports, "watchUntil", { enumerable: true, get: function () { return watchers_1.watchUntil; } });
Object.defineProperty(exports, "watchImmediately", { enumerable: true, get: function () { return watchers_1.watchImmediately; } });
var queue_1 = __webpack_require__(/*! ./queue */ "../flit/out/queue/index.js");
Object.defineProperty(exports, "onRenderComplete", { enumerable: true, get: function () { return queue_1.onRenderComplete; } });
Object.defineProperty(exports, "untilRenderComplete", { enumerable: true, get: function () { return queue_1.untilRenderComplete; } });
Object.defineProperty(exports, "enqueueUpdatableInOrder", { enumerable: true, get: function () { return queue_1.enqueueUpdatableInOrder; } });
Object.defineProperty(exports, "UpdatableUpdateOrder", { enumerable: true, get: function () { return queue_1.UpdatableUpdateOrder; } });
var update_1 = __webpack_require__(/*! ./globals/update */ "../flit/out/globals/update.js");
Object.defineProperty(exports, "updateAllComponents", { enumerable: true, get: function () { return update_1.updateAllComponents; } });
Object.defineProperty(exports, "updateAllGlobalWatchers", { enumerable: true, get: function () { return update_1.updateAllGlobalWatchers; } });
Object.defineProperty(exports, "updateAllStyles", { enumerable: true, get: function () { return update_1.updateAllStyles; } });
var render_1 = __webpack_require__(/*! ./globals/render */ "../flit/out/globals/render.js");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return render_1.render; } });
Object.defineProperty(exports, "renderUpdatable", { enumerable: true, get: function () { return render_1.renderUpdatable; } });
Object.defineProperty(exports, "getRenderedAsComponent", { enumerable: true, get: function () { return render_1.getRenderedAsComponent; } });


/***/ }),

/***/ "../flit/out/internals/contextual-transition.js":
/*!******************************************************!*\
  !*** ../flit/out/internals/contextual-transition.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextualTransition = void 0;
const transition_1 = __webpack_require__(/*! ./transition */ "../flit/out/internals/transition.js");
const updatable_options_1 = __webpack_require__(/*! ./updatable-options */ "../flit/out/internals/updatable-options.js");
/** Class to manage transition options, expecially to know should play transition when at start. */
class ContextualTransition {
    constructor(context) {
        this.options = new updatable_options_1.UpdatableOptions({});
        /** Be `true` only after firstly updated. */
        this.firstTimeUpdated = null;
        this.context = context;
    }
    /** Sometimes you may just leaves `name` and `properties` to be `undefined` if you want to control playing dynamically. */
    canPlay() {
        return this.options.has('name') || this.options.has('properties');
    }
    /** Update options data. */
    updateOptions(options) {
        this.options.update(options);
        this.firstTimeUpdated = this.firstTimeUpdated === null ? true : false;
    }
    /** Whether should play enter transition. */
    shouldPlayEnter() {
        if (!this.canPlay() || this.firstTimeUpdated && !this.options.get('enterAtStart')) {
            return false;
        }
        return true;
    }
    /** Whether should play leave transition. */
    shouldPlayLeave() {
        if (!this.canPlay() || this.firstTimeUpdated && !this.options.get('leaveAtStart')) {
            return false;
        }
        return true;
    }
    /** Plays enter transition, must validate `shouldPlayEnter` before. */
    async playEnter(el) {
        let onend = this.options.get('onend');
        let finish = await new transition_1.Transition(el, this.options.getOptions()).enter();
        if (onend) {
            onend.call(this.context, 'enter', finish);
        }
        return finish;
    }
    /** Plays leave transition, must validate `shouldPlayLeave` before. */
    async playLeave(el) {
        let onend = this.options.get('onend');
        let finish = await new transition_1.Transition(el, this.options.getOptions()).leave();
        if (onend) {
            onend.call(this.context, 'leave', finish);
        }
        return finish;
    }
}
exports.ContextualTransition = ContextualTransition;


/***/ }),

/***/ "../flit/out/internals/dom-event.js":
/*!******************************************!*\
  !*** ../flit/out/internals/dom-event.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.off = exports.once = exports.on = void 0;
/** Modefiers to limit event triggering or do some actions. */
const GlobalEventModifiers = ['capture', 'self', 'once', 'prevent', 'stop', 'passive'];
const ControlKeyModefiers = ['ctrl', 'shift', 'alt'];
const ChangeEventModifiers = ['check', 'uncheck'];
const WheelEventModifiers = ['up', 'down'];
const ButtonNameModifiers = {
    left: 0,
    middle: 1,
    right: 2,
    main: 0,
    auxiliary: 1,
    secondary: 2
};
/** Event filters to limit event triggering. */
const EventFilters = {
    keydown: keyEventFilter,
    keyup: keyEventFilter,
    keypress: keyEventFilter,
    mousedown: mouseEventFilter,
    mousemove: mouseEventFilter,
    mouseup: mouseEventFilter,
    click: mouseEventFilter,
    dblclick: mouseEventFilter,
    change: changeEventFilter,
    wheel: wheelEventFilter,
};
/** To cache all event listeners for element. */
const ElementEventListenerCache = new WeakMap();
/** Limit key event triggering. */
function keyEventFilter(e, modifiers) {
    // Full key list: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    // Capture key at: https://keycode.info/
    let codeModifiers = [];
    // Control keys must match.
    for (let modifier of modifiers) {
        if (ControlKeyModefiers.includes(modifier)) {
            if (!isControlKeyMatchModifier(e, modifier)) {
                return false;
            }
            continue;
        }
        codeModifiers.push(modifier);
    }
    return codeModifiers.length === 0
        || codeModifiers.includes(e.code.toLowerCase());
}
/** Limit mouse event triggering. */
function mouseEventFilter(e, modifiers) {
    let buttonModifiers = [];
    // Control keys must match.
    for (let modifier of modifiers) {
        if (ControlKeyModefiers.includes(modifier)) {
            if (!isControlKeyMatchModifier(e, modifier)) {
                return false;
            }
            continue;
        }
        buttonModifiers.push(modifier);
    }
    if (buttonModifiers.length === 0) {
        return true;
    }
    if (buttonModifiers.find(f => ButtonNameModifiers[f] === e.button)) {
        return true;
    }
    return false;
}
/** Limit key event triggering from control keys. */
function isControlKeyMatchModifier(e, modifier) {
    if (modifier === 'ctrl' && !e.ctrlKey
        || modifier === 'shift' && !e.shiftKey
        || modifier === 'alt' && !e.altKey) {
        return false;
    }
    return true;
}
/** Limit change event triggering. */
function changeEventFilter(e, [modifier]) {
    let checked = e.target.checked;
    return checked && modifier === 'check'
        || checked && modifier === 'uncheck';
}
/** Limit wheel event triggering. */
function wheelEventFilter(e, [modifier]) {
    return (e.deltaY < 0) && modifier === 'up'
        || (e.deltaY > 0) && modifier === 'down';
}
/** Valdiate event modifiers. */
function validateModifiers(propertyName, name, modifiers) {
    // Exclude global modifiers.
    modifiers = modifiers.filter(m => !GlobalEventModifiers.includes(m));
    if (modifiers.length === 0) {
        return true;
    }
    if (name === 'change') {
        if (modifiers.length > 1 || !ChangeEventModifiers.includes(modifiers[0])) {
            throw new Error(`"${propertyName}" is valid, change event modifier must be only one of "${ChangeEventModifiers.join(',')}"!`);
        }
    }
    else if (name === 'wheel') {
        if (modifiers.length > 1 || !WheelEventModifiers.includes(modifiers[0])) {
            throw new Error(`"${propertyName}" is valid, wheel event modifier must be only one of "${WheelEventModifiers.join(',')}"!`);
        }
    }
    else if (name === 'mousedown' || name === 'mousemove' || name === 'mouseup' || name === 'click') {
        modifiers = modifiers.filter(m => !ControlKeyModefiers.includes(m));
        if (!ButtonNameModifiers.hasOwnProperty(modifiers[0])) {
            throw new Error(`"${propertyName}" is valid, button filter for mouse event must be one of "${Object.keys(ButtonNameModifiers).join(',')}"!`);
        }
    }
    return true;
}
/**
 * Register an event listener on element.
 * @param el The element to register listener on.
 * @param name The event name, it can be `click:left` or `keydown:enter`.
 * @param handler The event handler.
 * @param scope The event context used to call handler. You can remove it easily by specify the same scope.
 */
function on(el, name, handler, scope) {
    bindEvent(false, el, name, handler, scope);
}
exports.on = on;
/**
 * Register an event listener on element, and will be triggered only for once.
 * @param el The element to register listener on.
 * @param name The event name, it can be `click:left` or `keydown:enter`.
 * @param handler The event handler.
 * @param scope The event context used to call handler. You can remove it easily by specify the same scope.
 */
function once(el, name, handler, scope) {
    bindEvent(true, el, name, handler, scope);
}
exports.once = once;
function bindEvent(once, el, rawName, handler, scope) {
    let name = rawName;
    let modifiers = null;
    if (rawName.includes('.')) {
        [name, ...modifiers] = rawName.split('.');
        validateModifiers(rawName, name, modifiers);
    }
    let wrappedHandler = wrapHandler(once, modifiers, el, name, handler, scope);
    let capture = !!modifiers && modifiers.includes('capture');
    let passive = !!modifiers && modifiers.includes('passive');
    // Wheel event use passive mode by default and can't be prevented.
    let options = passive || name === 'wheel' ? { capture, passive } : capture;
    let eventMap = ElementEventListenerCache.get(el);
    if (!eventMap) {
        eventMap = {};
        ElementEventListenerCache.set(el, eventMap);
    }
    let events = eventMap[name] || (eventMap[name] = []);
    events.push({
        name: rawName,
        handler,
        wrappedHandler,
        scope,
        capture
    });
    el.addEventListener(name, wrappedHandler, options);
}
/**
 * Unregister an event listener on element.
 * @param el The element to unregister listener on.
 * @param name The event name with or without modifiers.
 * @param handler The event handler.
 * @param scope The event context used to call handler. If specified, it must be match too.
 */
function off(el, name, handler, scope) {
    let eventMap = ElementEventListenerCache.get(el);
    if (!eventMap) {
        return;
    }
    name = name.replace(/\..+/, '');
    let events = eventMap[name];
    if (!events) {
        return;
    }
    for (let i = events.length - 1; i >= 0; i--) {
        let event = events[i];
        let isHandlerMatch = !handler
            || event.handler === handler
            || event.handler.hasOwnProperty('__original') && event.handler.__original === handler;
        if (isHandlerMatch && (!scope || event.scope === scope)) {
            el.removeEventListener(name, event.wrappedHandler, event.capture);
            events.splice(i, 1);
        }
    }
}
exports.off = off;
/** Wrap handler according to global modifiers. */
function wrapHandler(once, modifiers, el, name, handler, scope) {
    let filterModifiers = modifiers === null || modifiers === void 0 ? void 0 : modifiers.filter(m => !GlobalEventModifiers.includes(m));
    return function wrappedHandler(e) {
        if (filterModifiers && filterModifiers.length > 0) {
            let filterFn = EventFilters[name];
            if (!filterFn(e, filterModifiers)) {
                return;
            }
        }
        if (modifiers && modifiers.includes('self') && e.target !== el) {
            return;
        }
        if (modifiers && modifiers.includes('prevent')) {
            e.preventDefault();
        }
        if (modifiers && modifiers.includes('stop')) {
            e.stopPropagation();
        }
        if (once || modifiers && modifiers.includes('once')) {
            off(el, name, handler, scope);
        }
        if (scope) {
            handler.call(scope, e);
        }
        else {
            handler(e);
        }
    };
}


/***/ }),

/***/ "../flit/out/internals/html-attributes-parser.js":
/*!*******************************************************!*\
  !*** ../flit/out/internals/html-attributes-parser.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.joinHTMLAttributes = void 0;
/**
 * Join two attribute strings into one.
 * `class="..."` will be merged.
 * normal `attr="..."` will be replaced.
 * bindings like `:class="..."` will kept both.
 */
function joinHTMLAttributes(superAttributes, assignAttributes) {
    let superAttributeList = parseToHTMLAttributes(superAttributes);
    let assignAttributeList = parseToHTMLAttributes(assignAttributes);
    let joind = joinParsedHTMLAttributes(superAttributeList, assignAttributeList);
    return joind.map(attr => outputParsedAttribute(attr)).join('');
}
exports.joinHTMLAttributes = joinHTMLAttributes;
/** Parse a html attributes to a attribute list. */
function parseToHTMLAttributes(attributes) {
    const attrRE = /([.:?@\w-]+)\s*=(\s*(?:".*?"|'.*?'|\S+)?)|\S+/g;
    let results = [];
    let match;
    while (match = attrRE.exec(attributes)) {
        // Name is only available for normal standardlize html attributes.
        let name = /[\w-]/.test(match[1]) ? match[1] : null;
        let value = name && match[2] ? match[2] : null;
        results.push({
            text: match[0],
            name,
            value,
        });
    }
    return results;
}
/** Parse a html attributes to a list. */
function joinParsedHTMLAttributes(superAttributeList, assignAttributeList) {
    for (let item of assignAttributeList) {
        if (item.name === 'class' || item.name === 'style') {
            let exist = superAttributeList.find(superAttr => superAttr.name === item.name);
            if (exist) {
                exist.value = joinAttributeValues(exist.value, item.value);
            }
            else {
                superAttributeList.push(item);
            }
        }
        else if (item.name) {
            let exist = superAttributeList.find(superAttr => superAttr.name === item.name);
            if (exist) {
                exist.value = item.value;
            }
            else {
                superAttributeList.push(item);
            }
        }
        else {
            superAttributeList.push(item);
        }
    }
    return superAttributeList;
}
/** Join two attribute values. */
function joinAttributeValues(superValue, assignValue) {
    if (!assignValue) {
        return '';
    }
    if (!superValue) {
        superValue = '';
    }
    if (!/['"]$/.test(superValue)) {
        superValue = '"' + superValue + '"';
    }
    assignValue = assignValue.replace(/^['"]|['"]$/g, '');
    return superValue.slice(0, -1) + ' ' + assignValue + superValue.slice(-1);
}
/** Output one parsed attribute to an attribute string. */
function outputParsedAttribute(attr) {
    if (attr.name) {
        if (attr.value) {
            return ' ' + attr.name + '=' + attr.value;
        }
        else {
            return ' ' + attr.name;
        }
    }
    else {
        return ' ' + attr.text;
    }
}


/***/ }),

/***/ "../flit/out/internals/html-token-parser.js":
/*!**************************************************!*\
  !*** ../flit/out/internals/html-token-parser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.joinHTMLTokens = exports.parseToHTMLTokens = exports.HTMLTokenType = void 0;
const utils_1 = __webpack_require__(/*! ../helpers/utils */ "../flit/out/helpers/utils.js");
/** HTML token type. */
var HTMLTokenType;
(function (HTMLTokenType) {
    HTMLTokenType[HTMLTokenType["StartTag"] = 0] = "StartTag";
    HTMLTokenType[HTMLTokenType["EndTag"] = 1] = "EndTag";
    HTMLTokenType[HTMLTokenType["Text"] = 2] = "Text";
})(HTMLTokenType = exports.HTMLTokenType || (exports.HTMLTokenType = {}));
/** Tags that self closed. */
const SelfClosedTags = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];
/**
 * Parse html codes to tokens.
 * After parsing, all comment was removed, and `\r\n\t` in text nodes was removed too.
 * Automatically fix `<tag />` to `<tag></tag>` for not self close tags.
 * attributes are not been trimmed.
 */
function parseToHTMLTokens(string) {
    const tagRE = /<!--[\s\S]*?-->|<([\w-]+)([\s\S]*?)\/?>|<\/[\w-]+>/g;
    let lastIndex = 0;
    let tokens = [];
    let match;
    while (match = tagRE.exec(string)) {
        let piece = match[0];
        if (match.index > lastIndex) {
            let text = utils_1.trim(string.slice(lastIndex, match.index));
            if (text) {
                tokens.push({
                    type: HTMLTokenType.Text,
                    text,
                });
            }
        }
        lastIndex = tagRE.lastIndex;
        if (piece[1] === '!') {
            continue;
        }
        else if (piece[1] === '/') {
            let tagName = piece.slice(2, -1);
            if (!SelfClosedTags.includes(tagName)) {
                tokens.push({
                    type: HTMLTokenType.EndTag,
                    tagName,
                });
            }
        }
        else {
            let tagName = match[1];
            let attributes = match[2];
            let selfClose = SelfClosedTags.includes(tagName);
            tokens.push({
                type: HTMLTokenType.StartTag,
                tagName,
                attributes,
                selfClose,
            });
            //`<tag />` -> `<tag></tag>`
            if (piece[piece.length - 2] === '/' && !selfClose) {
                tokens.push({
                    type: HTMLTokenType.EndTag,
                    tagName,
                });
            }
        }
    }
    if (lastIndex < string.length) {
        let text = utils_1.trim(string.slice(lastIndex));
        if (text) {
            tokens.push({
                type: HTMLTokenType.Text,
                text: string.slice(lastIndex),
            });
        }
    }
    return tokens;
}
exports.parseToHTMLTokens = parseToHTMLTokens;
/** Join tokens parsed from `parseToHTMLTokens` to HTML codes. */
function joinHTMLTokens(tokens) {
    let codes = '';
    for (let token of tokens) {
        switch (token.type) {
            case HTMLTokenType.StartTag:
                let tagName = token.tagName;
                let attributes = token.attributes;
                codes += '<' + tagName + attributes + '>';
                break;
            case HTMLTokenType.EndTag:
                codes += `</${token.tagName}>`;
                break;
            case HTMLTokenType.Text:
                codes += token.text;
                break;
        }
    }
    return codes;
}
exports.joinHTMLTokens = joinHTMLTokens;


/***/ }),

/***/ "../flit/out/internals/internal-event-emitter.js":
/*!*******************************************************!*\
  !*** ../flit/out/internals/internal-event-emitter.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// At beginning, I implemented a good Emitter by inferring listener parameters and emitting parameters.
// But then I meet a big problem when extending the class, described by:
// https://stackoverflow.com/questions/55813041/problems-on-typescript-event-interface-extends
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalEventEmitter = void 0;
/**
 * Event emitter as super class to listen and emit custom events.
 * Rename as `InternalEventEmitter` to make it doesn't conflict with `EventEmitter` in `ff` framework.
 * @typeparam E Event interface in `{eventName: (...args) => void}` format.
 */
class InternalEventEmitter {
    constructor() {
        /** Registered events. */
        this.__events = new Map();
    }
    /** Ensure event cache items to cache item. */
    __ensureEvents(name) {
        let events = this.__events.get(name);
        if (!events) {
            this.__events.set(name, events = []);
        }
        return events;
    }
    /**
     * Registers an event `listener` to listen event with specified `name`.
     * @param name The event name.
     * @param listener The event listener.
     * @param scope The scope will be binded to listener.
     */
    on(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: false,
        });
    }
    /**
     * Registers an event `listener` to listen event with specified `name`, triggers for only once.
     * @param name The event name.
     * @param listener The event listener.
     * @param scope The scope will be binded to listener.
     */
    once(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: true
        });
    }
    /**
     * Removes the `listener` that is listening specified event `name`.
     * @param name The event name.
     * @param listener The event listener, only matched listener will be removed.
     * @param scope The scope binded to listener. If provided, remove listener only when scope match.
     */
    off(name, listener, scope) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = events.length - 1; i >= 0; i--) {
                let event = events[i];
                if (event.listener === listener && (!scope || event.scope === scope)) {
                    events.splice(i, 1);
                }
            }
        }
    }
    /**
     * Check whether `listener` is in the list for listening specified event `name`.
     * @param name The event name.
     * @param listener The event listener to check.
     * @param scope The scope binded to listener. If provided, will additionally check whether the scope match.
     */
    hasListener(name, listener, scope) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = 0, len = events.length; i < len; i++) {
                let event = events[i];
                if (event.listener === listener && (!scope || event.scope === scope)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Check whether any `listener` is listening specified event `name`.
     * @param name The event name.
     */
    hasListeners(name) {
        let events = this.__events.get(name);
        return !!events && events.length > 0;
    }
    /**
     * Emit specified event with event `name` and parameters.
     * @param name The event name.
     * @param args The parameters that will be passed to event listeners.
     */
    emit(name, ...args) {
        let events = this.__events.get(name);
        if (events) {
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                // The listener may call off, so must remove it before handling
                if (event.once === true) {
                    events.splice(i--, 1);
                }
                event.listener.apply(event.scope, args);
            }
        }
    }
    /** Removes all the event listeners. */
    removeAllListeners() {
        this.__events = new Map();
    }
}
exports.InternalEventEmitter = InternalEventEmitter;


/***/ }),

/***/ "../flit/out/internals/node-anchor.js":
/*!********************************************!*\
  !*** ../flit/out/internals/node-anchor.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAnchor = exports.NodeAnchorType = void 0;
/** Anchor type to indicate where to put the anchor at. */
var NodeAnchorType;
(function (NodeAnchorType) {
    /** Anchor node is next to inserted node. */
    NodeAnchorType[NodeAnchorType["Next"] = 0] = "Next";
    /** Anchor node is a container element and will insert new node as it's last child. */
    NodeAnchorType[NodeAnchorType["Container"] = 1] = "Container";
})(NodeAnchorType = exports.NodeAnchorType || (exports.NodeAnchorType = {}));
/**
 * To mark position to insert nodes.
 * Please never move the anchor node, the whole document may be removed.
 */
class NodeAnchor {
    constructor(el, type) {
        this.el = el;
        this.type = type;
    }
    /** Insert element to the anchor position. */
    insert(node) {
        if (this.type === NodeAnchorType.Next) {
            this.el.before(node);
        }
        else {
            this.el.append(node);
        }
    }
}
exports.NodeAnchor = NodeAnchor;


/***/ }),

/***/ "../flit/out/internals/node-range.js":
/*!*******************************************!*\
  !*** ../flit/out/internals/node-range.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerRange = exports.NodeRange = void 0;
/**
 * A node range represents a range of nodes from it's start and end position,
 * Such that we can extract nodes in the whole range and make a fragment any time,
 * no matter nodes inside was moved or removed, or insert more.
 */
class NodeRange {
    constructor(fragment) {
        /** Parent to contains all the nodes. */
        this.fragment = null;
        this.fragment = fragment;
        // Fragment hould include at least one node, so it's position can be tracked.
        // Because startNode should always before any other nodes inside the template or as rest slot lement,
        // So if starts with a hole - comment node, which will insert nodes before it,
        // we need to prepend a comment node as `startNode`.
        let startNode = fragment.firstChild;
        if (!startNode || startNode.nodeType === 8) {
            startNode = document.createComment('');
            fragment.prepend(startNode);
        }
        this.startNode = startNode;
        // No need to worry about the last node, it's a fixed element, even for a hole - it's a comment node.
        // Because we always follows the rule in NodeAnchor: Insert more nodes before or in append postion.
        this.endNode = fragment.lastChild;
    }
    /** Get current container, may return `null`. */
    getCurrentFragment() {
        return this.fragment;
    }
    /**
     * Extract all nodes into a fragment.
     * You must insert the extracted fragment into a container soon.
     * Used to get just parsed fragment, or reuse template nodes.
     */
    extractToFragment() {
        let fragment;
        if (this.fragment instanceof DocumentFragment) {
            fragment = this.fragment;
        }
        else {
            fragment = document.createDocumentFragment();
            fragment.append(...this.getNodes());
        }
        // Breaks the fragment-child relationship.
        this.fragment = null;
        return fragment;
    }
    /**
     * Moves all nodes out from parent container,
     * and cache into a new fragment in order to use them later.
     */
    movesOut() {
        this.fragment = this.extractToFragment();
    }
    /** Get all the nodes in the range. */
    getNodes() {
        let nodes = [];
        let node = this.startNode;
        while (node) {
            nodes.push(node);
            if (node === this.endNode) {
                break;
            }
            node = node.nextSibling;
        }
        return nodes;
    }
    /** Get first element in range. */
    getFirstElement() {
        let node = this.startNode;
        while (node) {
            if (node.nodeType === 1) {
                return node;
            }
            if (node === this.endNode) {
                break;
            }
            node = node.nextSibling;
        }
        return null;
    }
    /** Insert all the nodes of specified range before start node of current range. */
    before(range) {
        this.startNode.before(range.extractToFragment());
    }
    /** Replace all the nodes in the range with the nodes of specified range. */
    replaceWith(range) {
        this.startNode.before(range.extractToFragment());
        this.remove();
    }
    /**
     * Remove all the nodes in range from parent container.
     * Call this means you will never reuse nodes in the range.
     */
    remove() {
        this.getNodes().forEach(node => node.remove());
    }
}
exports.NodeRange = NodeRange;
/** Compare to `NodeRange`, it only marks end node. */
class ContainerRange {
    constructor(container) {
        this.container = container;
        this.endNode = container.lastChild;
    }
    /**
     * Extract all nodes into a fragment.
     * You must insert the extracted fragment into a container soon.
     * Used to get just parsed fragment, or reuse template nodes.
     */
    extractToFragment() {
        let fragment = document.createDocumentFragment();
        fragment.append(...this.getNodes());
        return fragment;
    }
    /** Get all the nodes in the range. */
    getNodes() {
        let nodes = [];
        let node = this.container.firstChild;
        while (node) {
            nodes.push(node);
            if (node === this.endNode) {
                break;
            }
            node = node.nextSibling;
        }
        return nodes;
    }
    /**
     * Remove all the nodes in range from parent container.
     * Call this means you will never reuse nodes in the range.
     */
    remove() {
        this.getNodes().forEach(node => node.remove());
    }
}
exports.ContainerRange = ContainerRange;


/***/ }),

/***/ "../flit/out/internals/style-parser.js":
/*!*********************************************!*\
  !*** ../flit/out/internals/style-parser.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStyleCodes = exports.getScopedClassNames = void 0;
/** Caches `componentName` -> className[]` map. */
const scopedClassNamesMap = new Map();
/** Get set of all scoped class names from defined component name. */
function getScopedClassNames(scopeName) {
    return scopedClassNamesMap.get(scopeName);
}
exports.getScopedClassNames = getScopedClassNames;
/**
 * Parse result returned from `Component.style()` result to standard style codes.
 * And also remembers all class names inside.
 */
function parseStyleCodes(text, scopeName) {
    let re = /(\s*)(?:\/\/.*|\/\*[\s\S]*?\*\/|((?:\(.*?\)|".*?"|'.*?'|[\s\S])*?)([;{}]))/g;
    /*
        \s* - match white spaces in left
        (?:
            \/\/.* - match comment line
            |
            \/\*[\s\S]*?\*\/ - match comment seagment
            |
            (?:
                \(.*?\) - (...), sass code may include @include fn(${name})
                ".*?" - double quote string
                |
                '.*?' - double quote string
                |
                [\s\S] - others
            )*? - declaration or selector
            ([;{}])
        )
    */
    let match;
    let stack = [];
    let current;
    let codes = '';
    let classNameSet = getClassNameSet(scopeName);
    let keyframesDeep = 0;
    while (match = re.exec(text)) {
        let spaces = match[1];
        let chars = match[2];
        let endChar = match[3];
        if (endChar === '{' && chars) {
            // Commands likes `@media` must in the out most level.
            if (chars[0] === '@' || keyframesDeep > 0) {
                codes += match[0];
                if (chars.startsWith('@keyframes')) {
                    keyframesDeep = 1;
                }
                else if (keyframesDeep > 0) {
                    keyframesDeep++;
                }
            }
            else {
                if (current) {
                    stack.push(current);
                    codes += '}';
                }
                let names = current = splitNamesAndCombineNesting(chars, current, scopeName);
                if (scopeName) {
                    names = current.map(name => scopeClassName(name, scopeName, classNameSet));
                }
                codes += spaces + names.join(', ') + '{';
            }
        }
        // May also be end paren `@media{...}`, but it's can't be included in any selectors.
        else if (endChar === '}') {
            if (keyframesDeep > 0) {
                keyframesDeep--;
            }
            current = stack.pop();
            // Not add `}` for sass like nesting.
            if (!current) {
                codes += match[0];
            }
        }
        else {
            // Skip `/*...*/` and `//...`
            let startChar = match[0][spaces.length];
            if (startChar !== '/') {
                codes += match[0];
            }
        }
    }
    return codes;
}
exports.parseStyleCodes = parseStyleCodes;
/** Get or create a set caches class names for `scopeName`. */
function getClassNameSet(scopeName) {
    if (!scopeName) {
        return null;
    }
    // May add more scoped class name when using `render` or `renderAndUpdate`.
    let classNameSet = scopedClassNamesMap.get(scopeName);
    if (!classNameSet) {
        classNameSet = new Set();
        scopedClassNamesMap.set(scopeName, classNameSet);
    }
    return classNameSet;
}
/** `a, b` -> `[parent a, parent b]` */
function splitNamesAndCombineNesting(selector, current, comName) {
    let re = /((?:\[.*?\]|\(.*?\)|[\s\S])+?)(?:,|$)/g;
    /*
        (?:
            \[.*?\] - match [...]
            |
            \(.*?\) - match (...)
            |
            . - match other characters
        )
        +?
        (?:,|$) - if match ',' or '$', end
    */
    let match;
    let names = [];
    while (match = re.exec(selector)) {
        let name = match[1].trim();
        if (name) {
            if (!current) {
                name = scopeTagSelector(name, comName);
            }
            names.push(name);
        }
    }
    if (current) {
        names = combineNestingNames(names, current);
    }
    return names;
}
/**
 * `a{b{...}}` -> `a b{...}`
 * `a{&-b{...}}` -> a-b{...}`
 */
function combineNestingNames(oldNames, parentNames) {
    // Has sass reference `&` if match
    let re = /(^|[\s+>~])&/g; // `/(?<=^|[\s+>~])&/g` should be better, but Firefox not support it.
    let names = [];
    for (let oldName of oldNames) {
        if (re.test(oldName)) {
            for (let parentName of parentNames) {
                names.push(oldName.replace(re, '$1' + parentName));
            }
        }
        else {
            for (let parentName of parentNames) {
                names.push(parentName + ' ' + oldName);
            }
        }
    }
    return names;
}
/** `.name` -> `.name__com-name` */
function scopeClassName(name, comName, classNameSet) {
    return name.replace(/\.([\w-]+)/g, (m0, name) => {
        if (m0.includes('__')) {
            return m0;
        }
        else {
            classNameSet.add(name);
            return m0 + '__' + comName;
        }
    });
}
/**
 * `p` -> `com-name p`.
 * `:host` -> `com-name`.
 * May be parsed to different style codes in different component.
 */
function scopeTagSelector(name, comName) {
    return name.replace(/^(?=\w)/g, comName + ' ')
        .replace(/:host/g, comName);
}


/***/ }),

/***/ "../flit/out/internals/transition.js":
/*!*******************************************!*\
  !*** ../flit/out/internals/transition.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTransition = exports.isPlayingTransition = exports.Transition = exports.defineTransion = exports.getCSSEasingValue = void 0;
const dom_event_1 = __webpack_require__(/*! ./dom-event */ "../flit/out/internals/dom-event.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
/** Default animation duration, plays transition for millseconds according to this property by default. */
const DefaultTransitionDuration = 200;
/** Default transition duration, plays transition with easing according to this property by default. */
const DefaultTransitionEasing = 'ease-out-quad';
/** Cache element and their current playing Transition. */
const ElementTransitionCache = new WeakMap();
/** Cache all defined JS Transitions. */
const DefinedJSTransitions = new Map();
/** Specifies easing name and their bezier parameters, copied from `Bourbon` source codes. */
const CUBIC_BEZIER_EASINGS = {
    // BASE
    'ease': [0.250, 0.100, 0.250, 1.000],
    'ease-in': [0.420, 0.000, 1.000, 1.000],
    'ease-out': [0.000, 0.000, 0.580, 1.000],
    'ease-in-out': [0.420, 0.000, 0.580, 1.000],
    // EASE IN
    'ease-in-quad': [0.550, 0.085, 0.680, 0.530],
    'ease-in-cubic': [0.550, 0.055, 0.675, 0.190],
    'ease-in-quart': [0.895, 0.030, 0.685, 0.220],
    'ease-in-quint': [0.755, 0.050, 0.855, 0.060],
    'ease-in-sine': [0.470, 0.000, 0.745, 0.715],
    'ease-in-expo': [0.950, 0.050, 0.795, 0.035],
    'ease-in-circ': [0.600, 0.040, 0.980, 0.335],
    'ease-in-back': [0.600, -0.280, 0.735, 0.045],
    // EASE OUT
    'ease-out-quad': [0.250, 0.460, 0.450, 0.940],
    'ease-out-cubic': [0.215, 0.610, 0.355, 1.000],
    'ease-out-quart': [0.165, 0.840, 0.440, 1.000],
    'ease-out-quint': [0.230, 1.000, 0.320, 1.000],
    'ease-out-sine': [0.390, 0.575, 0.565, 1.000],
    'ease-out-expo': [0.190, 1.000, 0.220, 1.000],
    'ease-out-circ': [0.075, 0.820, 0.165, 1.000],
    'ease-out-back': [0.175, 0.885, 0.320, 1.275],
    // EASE IN OUT
    'ease-in-out-quad': [0.455, 0.030, 0.515, 0.955],
    'ease-in-out-cubic': [0.645, 0.045, 0.355, 1.000],
    'ease-in-out-quart': [0.770, 0.000, 0.175, 1.000],
    'ease-in-out-quint': [0.860, 0.000, 0.070, 1.000],
    'ease-in-out-sine': [0.445, 0.050, 0.550, 0.950],
    'ease-in-out-expo': [1.000, 0.000, 0.000, 1.000],
    'ease-in-out-circ': [0.785, 0.135, 0.150, 0.860],
    'ease-in-out-back': [0.680, -0.550, 0.265, 1.550],
};
/** All CSS properties that can play transition. */
const CSS_PROPERTIES = {
    width: true,
    height: true,
    opacity: true,
    margin: true,
    marginLeft: true,
    marginRght: true,
    marginTop: true,
    marginBottom: true,
    padding: true,
    paddingLeft: true,
    paddingRght: true,
    paddingTop: true,
    paddingBottom: true,
    borderWidth: true,
    borderLeftWidth: true,
    borderRightWidth: true,
    borderTopWidth: true,
    borderBottomWidth: true,
    transform: true
};
/**
 * Get `cubic-bezier(...)` as CSS easing from easing name.
 * @param easing The extended easing name.
 * @returns CSS easing codes like `line` or `cubic-bezier(...)`.
 */
function getCSSEasingValue(easing) {
    return CUBIC_BEZIER_EASINGS.hasOwnProperty(easing)
        ? 'cubic-bezier(' + CUBIC_BEZIER_EASINGS[easing].join(', ') + ')'
        : 'linear';
}
exports.getCSSEasingValue = getCSSEasingValue;
/**
 * Define a JS transiton and process all transition details internally.
 * @param name Transition name, must be unique.
 * @param TransitionConstructor A `Transition` class.
 */
function defineTransion(name, TransitionConstructor) {
    if (DefinedJSTransitions.has(name)) {
        console.warn(`You are trying to overwrite transition definition "${name}"`);
    }
    if (CSS_PROPERTIES.hasOwnProperty(name)) {
        console.warn(`"${name}" is an available CSS property, you may confuse them when using short transition`);
    }
    DefinedJSTransitions.set(name, TransitionConstructor);
}
exports.defineTransion = defineTransion;
/**
 * Class used to play specified transition on an element.
 * Transition types includes class name, css properties, and registered js transition.
 */
class Transition {
    constructor(el, options) {
        this.cleaner = null;
        this.el = el;
        this.options = options;
        clearTransition(this.el);
        ElementTransitionCache.set(this.el, this);
    }
    /** Plays enter animation. */
    enter() {
        return new Promise(resolve => {
            this.clean();
            let direction = this.options.direction;
            let willPlay = direction === 'enter' || direction === 'both' || direction === undefined;
            if (!willPlay) {
                resolve(true);
                return;
            }
            let onEntered = (finish) => {
                ElementTransitionCache.delete(this.el);
                resolve(finish);
            };
            if (this.options.properties) {
                this.cssEnter(onEntered);
            }
            else if (this.options.name && DefinedJSTransitions.has(this.options.name)) {
                this.jsEnter(onEntered);
            }
            else {
                this.classEnterOrLeave('enter', onEntered);
            }
        });
    }
    /** Plays leave animation. */
    leave() {
        return new Promise(resolve => {
            this.clean();
            let el = this.el;
            let direction = this.options.direction;
            let willPlay = direction === 'leave' || direction === 'both' || direction === undefined;
            if (!willPlay) {
                resolve(true);
                return;
            }
            // If mouse hover trigger element, it's related popup becomes visible.
            el.style.pointerEvents = 'none';
            let onLeaved = (finish) => {
                ElementTransitionCache.delete(this.el);
                el.style.pointerEvents = '';
                resolve(finish);
            };
            if (this.options.properties) {
                this.cssLeave(onLeaved);
            }
            else if (this.options.name && DefinedJSTransitions.has(this.options.name)) {
                this.jsLeave(onLeaved);
            }
            else {
                this.classEnterOrLeave('leave', onLeaved);
            }
        });
    }
    cssEnter(onEntered) {
        let startFrame = {};
        for (let property of this.options.properties) {
            startFrame[property] = property === 'transform' ? 'none' : '0';
        }
        let { promise, cancel } = webAnimateFrom(this.el, startFrame, this.options.duration || DefaultTransitionDuration, this.options.easing || DefaultTransitionEasing);
        promise.then(onEntered);
        this.cleaner = cancel;
    }
    cssLeave(onLeaved) {
        let endFrame = {};
        for (let property of this.options.properties) {
            endFrame[property] = property === 'transform' ? 'none' : '0';
        }
        let { promise, cancel } = webAnimateTo(this.el, endFrame, this.options.duration || DefaultTransitionDuration, this.options.easing || DefaultTransitionEasing);
        promise.then(onLeaved);
        this.cleaner = cancel;
    }
    jsEnter(onEntered) {
        let jsTransition = this.getJSTransitionInstance();
        if (jsTransition.enter) {
            jsTransition.enter.then(onEntered);
            this.cleaner = jsTransition.clean.bind(jsTransition);
        }
        else {
            onEntered(true);
        }
    }
    jsLeave(onLeaved) {
        let jsTransition = this.getJSTransitionInstance();
        if (jsTransition.leave) {
            jsTransition.leave.then(onLeaved);
            this.cleaner = jsTransition.clean.bind(jsTransition);
        }
        else {
            onLeaved(true);
        }
    }
    getJSTransitionInstance() {
        let JsTransition = DefinedJSTransitions.get(this.options.name);
        return new JsTransition(this.el, {
            duration: this.options.duration || DefaultTransitionDuration,
            easing: this.options.easing || (DefaultTransitionEasing)
        });
    }
    async classEnterOrLeave(type, callback) {
        let className = this.options.name + '-' + type;
        let duration = this.options.duration;
        let easing = this.options.easing;
        let canceled = false;
        let el = this.el;
        if (duration) {
            el.style.transitionDuration = String(duration / 1000) + 's';
        }
        if (easing) {
            el.style.transitionTimingFunction = getCSSEasingValue(easing);
        }
        el.style.transition = 'none';
        el.classList.add(className, className + '-from');
        this.cleaner = () => {
            canceled = true;
        };
        // Here to makesure rendering complete for current frame,
        // Then the next `requestAnimationFrame` will be called for a new frame.
        // Then we can play transition betweens these 2 frames.
        queue_1.onRenderComplete(() => {
            requestAnimationFrame(() => {
                if (canceled) {
                    el.classList.remove(className, className + '-from');
                    return;
                }
                if (duration) {
                    el.style.transitionDuration = '';
                }
                if (easing) {
                    el.style.transitionTimingFunction = '';
                }
                el.style.transition = '';
                el.classList.remove(className + '-from');
                el.classList.add(className + '-to');
                this.onceTransitionEnd((finish) => {
                    el.classList.remove(className, className + '-to');
                    callback(finish);
                });
            });
        });
    }
    onceTransitionEnd(onEnd) {
        let el = this.el;
        let computedStyle = getComputedStyle(el);
        let transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        let animationDuration = parseFloat(computedStyle.animationDuration) || 0;
        let eventName = transitionDuration > 0 ? 'transitionend' : 'animationend';
        let duration = (transitionDuration || animationDuration) * 1000;
        let onTransitionEnd = () => {
            clearTimeout(timeoutId);
            onEnd(true);
        };
        let onTimeout = () => {
            dom_event_1.off(el, eventName, onTransitionEnd);
            onEnd(true);
        };
        let timeoutId = setTimeout(onTimeout, duration + 50);
        dom_event_1.once(el, eventName, onTransitionEnd);
        this.cleaner = () => {
            clearTimeout(timeoutId);
            dom_event_1.off(el, eventName, onTransitionEnd);
            onEnd(false);
        };
    }
    clean() {
        if (this.cleaner) {
            this.cleaner();
            this.cleaner = null;
        }
    }
}
exports.Transition = Transition;
/**
 * Checks whether `el` is playing a transition.
 * @param el The element at which to check whether playing transition.
 */
function isPlayingTransition(el) {
    return ElementTransitionCache.has(el);
}
exports.isPlayingTransition = isPlayingTransition;
/**
 * Clear the transition that is running in the element.
 * @param el The element at which to clear transition.
 */
function clearTransition(el) {
    if (ElementTransitionCache.has(el)) {
        ElementTransitionCache.get(el).clean();
    }
}
exports.clearTransition = clearTransition;
/** The default style of element, which is not `0` */
const DefaultNotNumericStyleProperties = {
    transform: 'none'
};
/**
 * Execute standard web animation on element.
 * After animation end, the state of element will go back to the start state.
 */
function webAnimate(el, startFrame, endFrame, duration, easing) {
    if (!el.animate) {
        return {
            promise: Promise.resolve(false),
            cancel: () => { }
        };
    }
    let cubicEasing = getCSSEasingValue(easing);
    let animation = el.animate([startFrame, endFrame], {
        easing: cubicEasing,
        duration,
    });
    let promise = new Promise((resolve) => {
        animation.addEventListener('finish', () => {
            resolve(true);
        }, false);
        animation.addEventListener('cancel', () => {
            resolve(false);
        }, false);
    });
    function cancel() {
        animation.cancel();
    }
    return {
        promise,
        cancel,
    };
}
/**
 * Execute standard web animation on element with start frame specified.
 * The end frame will be set as zero or empty values.
 */
function webAnimateFrom(el, startFrame, duration, easing) {
    let endFrame = {};
    let style = getComputedStyle(el);
    for (let property in startFrame) {
        endFrame[property] = style[property] || DefaultNotNumericStyleProperties[property] || '0';
    }
    return webAnimate(el, startFrame, endFrame, duration, easing);
}
/**
 * Execute standard web animation on element with end frame specified.
 * The end frame will be specified as values of current state.
 * After animation executed, will not apply end frame values to element.
 */
function webAnimateTo(el, endFrame, duration, easing) {
    let startFrame = {};
    let style = getComputedStyle(el);
    for (let property in endFrame) {
        startFrame[property] = style[property] || DefaultNotNumericStyleProperties[property] || '0';
    }
    return webAnimate(el, startFrame, endFrame, duration, easing);
}


/***/ }),

/***/ "../flit/out/internals/updatable-options.js":
/*!**************************************************!*\
  !*** ../flit/out/internals/updatable-options.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatableOptions = void 0;
/** Used to mange updatable options and can also quickly assign default values. */
class UpdatableOptions {
    constructor(defaultOptions) {
        this.updated = false;
        this.options = null;
        this.defaultOptions = defaultOptions;
    }
    /** Whether not been updated. */
    isNotUpdated() {
        return !this.updated;
    }
    /** Update options, assign `options` to current option object. */
    update(options) {
        this.options = options || null;
        this.updated = true;
    }
    /**
     * Get specified option value from it's key.
     * May get a default value if not set.
     */
    get(key) {
        if (this.options) {
            let value = this.options[key];
            return value === undefined ? this.defaultOptions[key] : value;
        }
        else {
            return this.defaultOptions[key];
        }
    }
    /**
     * Check if have set specified option value from it's key.
     * Ignores default values.
     */
    has(key) {
        if (this.options) {
            return this.options[key] !== undefined;
        }
        else {
            return false;
        }
    }
    /** Get all options. */
    getOptions() {
        return this.options || this.defaultOptions;
    }
}
exports.UpdatableOptions = UpdatableOptions;


/***/ }),

/***/ "../flit/out/observer/dependency.js":
/*!******************************************!*\
  !*** ../flit/out/observer/dependency.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyComPropertySet = exports.addComDependency = exports.notifyObjectSet = exports.addDependency = exports.isUpdating = exports.endUpdating = exports.startUpdating = exports.clearDependenciesOf = void 0;
const weak_2way_map_1 = __webpack_require__(/*! ../helpers/weak-2way-map */ "../flit/out/helpers/weak-2way-map.js");
const weak_2way_prop_map_1 = __webpack_require__(/*! ../helpers/weak-2way-prop-map */ "../flit/out/helpers/weak-2way-prop-map.js");
/**
 * `UpdatableProxied <-> Dependency` map.
 *
 * To know when rendering a component or update a watcher, all the dependent objects it used.
 * So after any of those object changed, we know which components or watchers should be updated.
 *
 * If the dependent objects were removed, the component or watchers should be updated,
 * and it will clear useless dependencies before.
 * So cached the objects will not prevent GC.
 */
const DepMap = new weak_2way_map_1.Weak2WayMap();
/**
 * `UpdatableProxied <-> Dependency -> Property` map.
 *
 * To know when rendering a component or update a watcher, all dependent components and what's the properties it used.
 * So after any of those properties changed, we know which components or watchers should be updated.
 *
 * Why we don't observe properties for all the objects but only components?
 * In fact I do so at beginning, until one day I found 1M dependencies in my app.
 * There is no memory leak, my app just may load more than 10K data records.
 *
 * Otherwise, our implementation for updating is not 100% precise,
 * and update whole component part at once, not update each properties, bindings, directives.
 * So no need to observe all the details.
 */
const ComPropMap = new weak_2way_prop_map_1.Weak2WayPropMap();
/** The updating component or watcher. */
let updating = null;
/** May one updating is not completed and start a new one, so a stack is required. */
const updatingStack = [];
/**
 * Called when a component or a watcher disconnected,
 * No need to trigger updating on the component or watcher any more.
 */
function clearDependenciesOf(updating) {
    DepMap.clearFromLeft(updating);
    ComPropMap.clearFromLeft(updating);
}
exports.clearDependenciesOf = clearDependenciesOf;
/** Called when start rendering a component or running a watcher function. */
function startUpdating(source) {
    if (updating) {
        updatingStack.push(updating);
    }
    updating = {
        source,
        deps: new Set(),
        depProps: new Map(),
    };
}
exports.startUpdating = startUpdating;
/** Called when complete rendering component or complete running watch functions. */
function endUpdating(_source) {
    // We split updating dependencies to two steps:
    //   1. Collect dependencies, cache them.
    //   2. Merge them into dependency tree.
    // 
    // It's common to use one object dependency for moren than 100 times in one updating,
    // no need to update dependency tree each time.
    if (updating) {
        DepMap.updateFromLeft(updating.source, updating.deps);
        ComPropMap.updateFromLeft(updating.source, updating.depProps);
        updating = updatingStack.pop() || null;
    }
}
exports.endUpdating = endUpdating;
/** Whether is updating recently. */
function isUpdating() {
    return !!updating;
}
exports.isUpdating = isUpdating;
/** Called when uses an object or array. */
function addDependency(dep) {
    if (!updating) {
        return;
    }
    updating.deps.add(dep);
}
exports.addDependency = addDependency;
/** Called when changing an array or object. */
function notifyObjectSet(obj) {
    let upts = DepMap.getFromRight(obj);
    if (upts) {
        for (let upt of upts) {
            upt.update();
        }
    }
}
exports.notifyObjectSet = notifyObjectSet;
/** Called when uses one property of component. */
function addComDependency(com, prop) {
    if (!updating) {
        return;
    }
    let propertySet = updating.depProps.get(com);
    if (!propertySet) {
        propertySet = new Set();
        updating.depProps.set(com, propertySet);
    }
    propertySet.add(prop);
}
exports.addComDependency = addComDependency;
/** Called when setting one property of component. */
function notifyComPropertySet(com, prop) {
    let upts = ComPropMap.getFromRight(com, prop);
    if (upts) {
        for (let upt of upts) {
            upt.update();
        }
    }
}
exports.notifyComPropertySet = notifyComPropertySet;


/***/ }),

/***/ "../flit/out/observer/index.js":
/*!*************************************!*\
  !*** ../flit/out/observer/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Proxy object getting and setting are 50x-100x slower than plain object.
// Proxy can't apply any compile optimizing, it equals always call a dynamic function.
Object.defineProperty(exports, "__esModule", { value: true });
var observe_1 = __webpack_require__(/*! ./observe */ "../flit/out/observer/observe.js");
Object.defineProperty(exports, "observe", { enumerable: true, get: function () { return observe_1.observe; } });
var observe_com_1 = __webpack_require__(/*! ./observe-com */ "../flit/out/observer/observe-com.js");
Object.defineProperty(exports, "observeComTarget", { enumerable: true, get: function () { return observe_com_1.observeComTarget; } });
var dependency_1 = __webpack_require__(/*! ./dependency */ "../flit/out/observer/dependency.js");
Object.defineProperty(exports, "startUpdating", { enumerable: true, get: function () { return dependency_1.startUpdating; } });
Object.defineProperty(exports, "endUpdating", { enumerable: true, get: function () { return dependency_1.endUpdating; } });
Object.defineProperty(exports, "clearDependenciesOf", { enumerable: true, get: function () { return dependency_1.clearDependenciesOf; } });
var observe_getter_1 = __webpack_require__(/*! ./observe-getter */ "../flit/out/observer/observe-getter.js");
Object.defineProperty(exports, "observeGetting", { enumerable: true, get: function () { return observe_getter_1.observeGetting; } });


/***/ }),

/***/ "../flit/out/observer/observe-array.js":
/*!*********************************************!*\
  !*** ../flit/out/observer/observe-array.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observeArrayTarget = void 0;
const dependency_1 = __webpack_require__(/*! ./dependency */ "../flit/out/observer/dependency.js");
const observe_1 = __webpack_require__(/*! ./observe */ "../flit/out/observer/observe.js");
const target_proxy_1 = __webpack_require__(/*! ./target-proxy */ "../flit/out/observer/target-proxy.js");
const WillObserveArrayMethods = ['push', 'pop', 'unshift', 'splice', 'shift', 'sort'];
function observeArrayTarget(array) {
    let proxy = new Proxy(array, proxyHandler);
    target_proxy_1.addTargetAndProxy(array, proxy);
    return proxy;
}
exports.observeArrayTarget = observeArrayTarget;
const proxyHandler = {
    get(array, prop) {
        let value = array[prop];
        let type = typeof value;
        if (array.hasOwnProperty(prop)) {
            dependency_1.addDependency(array);
            if (value && type === 'object') {
                let observed = target_proxy_1.getObservedOf(value);
                if (observed) {
                    return observed;
                }
                else if (dependency_1.isUpdating()) {
                    return observe_1.observeTarget(value);
                }
            }
        }
        else if (type === 'function') {
            dependency_1.addDependency(array);
            if (WillObserveArrayMethods.includes(prop)) {
                dependency_1.notifyObjectSet(array);
            }
        }
        return value;
    },
    set(array, prop, value) {
        array[prop] = value;
        dependency_1.notifyObjectSet(array);
        return true;
    },
    has(arr, prop) {
        dependency_1.addDependency(arr);
        return prop in arr;
    },
    deleteProperty(arr, prop) {
        if (arr.hasOwnProperty(prop)) {
            dependency_1.addDependency(arr);
            return delete arr[prop];
        }
        else {
            return true;
        }
    }
};


/***/ }),

/***/ "../flit/out/observer/observe-com.js":
/*!*******************************************!*\
  !*** ../flit/out/observer/observe-com.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observeComTarget = void 0;
const dependency_1 = __webpack_require__(/*! ./dependency */ "../flit/out/observer/dependency.js");
const observe_1 = __webpack_require__(/*! ./observe */ "../flit/out/observer/observe.js");
const target_proxy_1 = __webpack_require__(/*! ./target-proxy */ "../flit/out/observer/target-proxy.js");
function observeComTarget(com) {
    let proxy = new Proxy(com, proxyHandler);
    target_proxy_1.addTargetAndProxy(com, proxy);
    return proxy;
}
exports.observeComTarget = observeComTarget;
const proxyHandler = {
    get(com, prop) {
        let value = com[prop];
        // Not check whether own property exist here.
        // It's common that to declare `property!: Type` in Typescript,
        // Which has no initialize value but still need to be observed.
        dependency_1.addComDependency(com, prop);
        if (value && typeof value === 'object') {
            let observed = target_proxy_1.getObservedOf(value);
            if (observed) {
                return observed;
            }
            // Only observe more properties when updating.
            // If we choose to always observe every value, too many proxies will be generated.
            else if (dependency_1.isUpdating()) {
                return observe_1.observeTarget(value);
            }
        }
        return value;
    },
    set(com, prop, value) {
        com[prop] = value;
        dependency_1.notifyComPropertySet(com, prop);
        return true;
    },
    has(com, prop) {
        dependency_1.addComDependency(com, prop);
        return prop in com;
    },
    deleteProperty(com, prop) {
        if (com.hasOwnProperty(prop)) {
            dependency_1.addComDependency(com, prop);
            return delete com[prop];
        }
        else {
            return true;
        }
    }
};


/***/ }),

/***/ "../flit/out/observer/observe-getter.js":
/*!**********************************************!*\
  !*** ../flit/out/observer/observe-getter.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observeGetting = void 0;
/**
 * After consider much about getter, we decided to drop supports for observing getters automatically.
 * The main reason is after we observed getter calls in a proxy,
 * We can't determine this is a getter calls,
 * and we must follow prototype chains to find the descriptor,
 * then we can know it's a getter or normal property.
 * This will slow the whole observing system.
 *
 * You can still observe a getter manually according to this method:
 *
 * `o = {get p(){...}}`
 * Uses `observeGetting(o, 'p')` instead of `o.p`.
 *
 * @param object The source object to get property at.
 * @param key The property key in object.
 * @returns Value of `object[key]`.
 */
function observeGetting(object, key) {
    let descriptor = getPropertyDescriptor(object, key);
    if (descriptor && descriptor.get) {
        return descriptor.get.call(object);
    }
    else {
        return object[key];
    }
}
exports.observeGetting = observeGetting;
function getPropertyDescriptor(object, property) {
    let proto = object;
    do {
        let descriptor = Object.getOwnPropertyDescriptor(proto, property);
        if (descriptor) {
            return descriptor;
        }
        else {
            proto = Object.getPrototypeOf(proto);
        }
    } while (proto);
    return null;
}


/***/ }),

/***/ "../flit/out/observer/observe-object.js":
/*!**********************************************!*\
  !*** ../flit/out/observer/observe-object.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observePlainObjectTarget = void 0;
const dependency_1 = __webpack_require__(/*! ./dependency */ "../flit/out/observer/dependency.js");
const observe_1 = __webpack_require__(/*! ./observe */ "../flit/out/observer/observe.js");
const target_proxy_1 = __webpack_require__(/*! ./target-proxy */ "../flit/out/observer/target-proxy.js");
function observePlainObjectTarget(object) {
    let proxy = new Proxy(object, proxyHandler);
    target_proxy_1.addTargetAndProxy(object, proxy);
    return proxy;
}
exports.observePlainObjectTarget = observePlainObjectTarget;
const proxyHandler = {
    get(object, prop) {
        let value = object[prop];
        dependency_1.addDependency(object);
        if (value && typeof value === 'object') {
            let observed = target_proxy_1.getObservedOf(value);
            if (observed) {
                return observed;
            }
            else if (dependency_1.isUpdating()) {
                return observe_1.observeTarget(value);
            }
        }
        return value;
    },
    set(obj, prop, value) {
        obj[prop] = value;
        dependency_1.notifyObjectSet(obj);
        return true;
    },
    has(obj, prop) {
        dependency_1.addDependency(obj);
        return prop in obj;
    },
    deleteProperty(obj, prop) {
        if (obj.hasOwnProperty(prop)) {
            dependency_1.addDependency(obj);
            return delete obj[prop];
        }
        else {
            return true;
        }
    }
};


/***/ }),

/***/ "../flit/out/observer/observe-set-or-map.js":
/*!**************************************************!*\
  !*** ../flit/out/observer/observe-set-or-map.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observeMapOrSetTarget = void 0;
const dependency_1 = __webpack_require__(/*! ./dependency */ "../flit/out/observer/dependency.js");
const target_proxy_1 = __webpack_require__(/*! ./target-proxy */ "../flit/out/observer/target-proxy.js");
/** Methods that will be observed. */
const WillObserveMapSetMethods = ['add', 'set', 'delete', 'clear'];
/** Observe a map or a set. */
function observeMapOrSetTarget(ms) {
    let proxy = new Proxy(ms, proxyHandler);
    target_proxy_1.addTargetAndProxy(ms, proxy);
    return proxy;
}
exports.observeMapOrSetTarget = observeMapOrSetTarget;
// A potential issue in observing map and set:
// We may add an target item to a set, and then test if it's mapped proxy in set,
// not exist so add proxy of item, this cause duplicate values exist in a set.
// We will fix this when we indeed meet.
const proxyHandler = {
    get(ms, prop) {
        let value = ms[prop];
        let type = typeof value;
        if (!ms.hasOwnProperty(prop) && type === 'function') {
            // `bind` is required, directly passs a proxy as this to native Set or Map methods will cause an error.
            value = value.bind(ms);
            dependency_1.addDependency(ms);
            if (WillObserveMapSetMethods.includes(prop)) {
                dependency_1.notifyObjectSet(ms);
            }
        }
        return value;
    }
};


/***/ }),

/***/ "../flit/out/observer/observe.js":
/*!***************************************!*\
  !*** ../flit/out/observer/observe.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observeTarget = exports.observe = void 0;
const observe_object_1 = __webpack_require__(/*! ./observe-object */ "../flit/out/observer/observe-object.js");
const observe_array_1 = __webpack_require__(/*! ./observe-array */ "../flit/out/observer/observe-array.js");
const observe_set_or_map_1 = __webpack_require__(/*! ./observe-set-or-map */ "../flit/out/observer/observe-set-or-map.js");
const target_proxy_1 = __webpack_require__(/*! ./target-proxy */ "../flit/out/observer/target-proxy.js");
/** Original `toString` method of object. */
const originalToString = Object.prototype.toString;
/**
 * Begin to track property changes of `value`, if use `value` during a updating of a component or watcher,
 * Then the property changes of returned observed object will trigger the component or watcher to be updated.
 *
 * Note that it returns a proxy, it can be used just like original object,
 * but it's not absolutly equals with original value, and comparing with `===` will return `false`.
 * So it may cause some issues if you cached the original object and compare it with observed one.
 *
 * Normally you don't need to call this method, properties of components will be observed automatically.
 * But once an object was observed, it can't be revoked.
 *
 * @param value The object to be observed, it can also an observed object, will not observe it for twice.
 * @returns The observed object, it's properties changes will be watched.
 */
function observe(value) {
    if (value && typeof value === 'object') {
        let proxy = target_proxy_1.getObservedOf(value);
        if (proxy) {
            return proxy;
        }
        return observeTarget(value);
    }
    else {
        return value;
    }
}
exports.observe = observe;
/** Observe an unobserved target object. */
function observeTarget(obj) {
    let str = originalToString.call(obj);
    if (str === '[object Array]') {
        return observe_array_1.observeArrayTarget(obj);
    }
    if (str === '[object Object]') {
        return observe_object_1.observePlainObjectTarget(obj);
    }
    if (str === '[object Set]' || str === '[object Map]') {
        return observe_set_or_map_1.observeMapOrSetTarget(obj);
    }
    return obj;
}
exports.observeTarget = observeTarget;


/***/ }),

/***/ "../flit/out/observer/target-proxy.js":
/*!********************************************!*\
  !*** ../flit/out/observer/target-proxy.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addTargetAndProxy = exports.getObservedOf = exports.ToProxyMap = void 0;
/** Caches `target -> proxy` and `proxy -> proxy` */
exports.ToProxyMap = new WeakMap();
/** Returns observed object from target, or returns itself if is an observed object already. */
function getObservedOf(target) {
    return exports.ToProxyMap.get(target);
}
exports.getObservedOf = getObservedOf;
/** Add one target-proxy map. */
function addTargetAndProxy(target, proxy) {
    exports.ToProxyMap.set(target, proxy);
    exports.ToProxyMap.set(proxy, proxy);
}
exports.addTargetAndProxy = addTargetAndProxy;


/***/ }),

/***/ "../flit/out/queue/helpers/updatable-queue.js":
/*!****************************************************!*\
  !*** ../flit/out/queue/helpers/updatable-queue.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatableQueue = exports.UpdatableUpdateOrder = void 0;
const mini_heap_1 = __webpack_require__(/*! ../../helpers/mini-heap */ "../flit/out/helpers/mini-heap.js");
var UpdatableUpdateOrder;
(function (UpdatableUpdateOrder) {
    /** Update firstly. */
    UpdatableUpdateOrder[UpdatableUpdateOrder["Watcher"] = 0] = "Watcher";
    /** Update in second order. */
    UpdatableUpdateOrder[UpdatableUpdateOrder["Component"] = 1] = "Component";
    /** Update directive like `repeat` or `liveRepeat`. */
    UpdatableUpdateOrder[UpdatableUpdateOrder["Directive"] = 2] = "Directive";
    /** Update at last. */
    UpdatableUpdateOrder[UpdatableUpdateOrder["Otherwise"] = 3] = "Otherwise";
})(UpdatableUpdateOrder = exports.UpdatableUpdateOrder || (exports.UpdatableUpdateOrder = {}));
/** Caches updatable items, get then in the order of `context, order`. */
class UpdatableQueue {
    constructor() {
        this.set = new Set();
        this.heap = new mini_heap_1.MiniHeap((a, b) => {
            if (!a.context) {
                return -1;
            }
            else if (!b.context) {
                return 1;
            }
            else if (a.context !== b.context) {
                return a.context.el.compareDocumentPosition(b.context.el) & a.context.el.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
            }
            else {
                return a.order - b.order;
            }
        });
    }
    isEmpty() {
        return this.heap.isEmpty();
    }
    has(upt) {
        return this.set.has(upt);
    }
    add(updatable, context, order) {
        this.heap.add({
            updatable,
            context,
            order,
        });
        this.set.add(updatable);
    }
    shift() {
        let o = this.heap.removeHead();
        let upt = o.updatable;
        this.set.delete(upt);
        return o === null || o === void 0 ? void 0 : o.updatable;
    }
    clear() {
        this.set = new Set();
        this.heap.clear();
    }
}
exports.UpdatableQueue = UpdatableQueue;


/***/ }),

/***/ "../flit/out/queue/helpers/updatable-validator.js":
/*!********************************************************!*\
  !*** ../flit/out/queue/helpers/updatable-validator.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatableValidator = void 0;
const component_1 = __webpack_require__(/*! ../../component */ "../flit/out/component/index.js");
const watcher_1 = __webpack_require__(/*! ../../watchers/watcher */ "../flit/out/watchers/watcher.js");
/** Validate update times for updatable. */
class UpdatableValidator {
    constructor() {
        /** Cache the updated time of watchers and components. */
        this.map = new Map();
    }
    /** Warn if component updated for many times. */
    validate(upt) {
        // We currently just check the count of updating times, if exceed 3 then warn.
        // 
        // A better way should be analysising dependency tree:
        //     Get current watcher referenced objects,
        //     then get their referenced watchers,
        //     then check if current watcher in it.
        let updatedTimes = this.map.get(upt) || 0;
        this.map.set(upt, updatedTimes + 1);
        if (updatedTimes > 3) {
            if (upt instanceof component_1.Component) {
                console.warn(upt, `may change values in the render function and cause infinite updating!`);
            }
            else if (upt instanceof watcher_1.Watcher) {
                console.warn(upt, `may change values in the watcher callback and cause infinite updating!`);
            }
            else {
                console.warn(upt, `may change values in callback and cause infinite updating!`);
            }
            return false;
        }
        return true;
    }
    clear() {
        this.map = new Map();
    }
}
exports.UpdatableValidator = UpdatableValidator;


/***/ }),

/***/ "../flit/out/queue/index.js":
/*!**********************************!*\
  !*** ../flit/out/queue/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var queue_1 = __webpack_require__(/*! ./queue */ "../flit/out/queue/queue.js");
Object.defineProperty(exports, "enqueueUpdatableInOrder", { enumerable: true, get: function () { return queue_1.enqueueUpdatableInOrder; } });
Object.defineProperty(exports, "onRenderComplete", { enumerable: true, get: function () { return queue_1.onRenderComplete; } });
Object.defineProperty(exports, "untilRenderComplete", { enumerable: true, get: function () { return queue_1.untilRenderComplete; } });
var updatable_queue_1 = __webpack_require__(/*! ./helpers/updatable-queue */ "../flit/out/queue/helpers/updatable-queue.js");
Object.defineProperty(exports, "UpdatableUpdateOrder", { enumerable: true, get: function () { return updatable_queue_1.UpdatableUpdateOrder; } });


/***/ }),

/***/ "../flit/out/queue/queue.js":
/*!**********************************!*\
  !*** ../flit/out/queue/queue.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.untilRenderComplete = exports.onRenderComplete = exports.enqueueUpdatableInOrder = void 0;
const updatable_queue_1 = __webpack_require__(/*! ./helpers/updatable-queue */ "../flit/out/queue/helpers/updatable-queue.js");
const updatable_validator_1 = __webpack_require__(/*! ./helpers/updatable-validator */ "../flit/out/queue/helpers/updatable-validator.js");
/*
There is a hard problem must be considered in advance:
Whether we should update watchers or components firstly?

We may found update parent component,
will cause child watchers get changes, and get update.

So the best way is:
  Update parent watchers.
  Update parent components.
  Update parent miscs, like directives inner watchers.
  Update child watchers.
  Update child components.
  ...
*/
/**
 * Indicates what we are updating.
 * Updating at a stage may cause new items added into following stages.
 */
var UpdatingStage;
(function (UpdatingStage) {
    /** No updata tasks. */
    UpdatingStage[UpdatingStage["NotStarted"] = 0] = "NotStarted";
    /** Will update in next animation frame. */
    UpdatingStage[UpdatingStage["Prepended"] = 1] = "Prepended";
    /** Are updating. */
    UpdatingStage[UpdatingStage["Updating"] = 2] = "Updating";
})(UpdatingStage || (UpdatingStage = {}));
/** Caches any updatable. */
const queue = new updatable_queue_1.UpdatableQueue();
/** To validate updatable. */
const validator = new updatable_validator_1.UpdatableValidator();
/** Callbacks wait to be called after all the things update. */
let renderCompleteCallbacks = [];
/** What's updating right now. */
let updatingStage = UpdatingStage.NotStarted;
/**
 * When a component, a watcher, or any other updatable things should enqueue to update.
 * Updatable wil be sort by `context, order`, and then called `__updateImmediately` one by one.
 */
function enqueueUpdatableInOrder(upt, context, order) {
    if (queue.has(upt)) {
        return;
    }
    if (!validator.validate(upt)) {
        return;
    }
    queue.add(upt, context, order);
    enqueueUpdateIfNot();
}
exports.enqueueUpdatableInOrder = enqueueUpdatableInOrder;
/**
 * Calls `callback` after all the components and watchers updated and rendered in next animation frame.
 * Called before `untilRenderComplete` but normally there is no difference.
 * Compare to `untilRenderComplete`, `onRenderComplete` is normally used in internal implementations.
 * @param callback callback to be called after render completed.
 */
function onRenderComplete(callback) {
    renderCompleteCallbacks.push(callback);
    enqueueUpdateIfNot();
}
exports.onRenderComplete = onRenderComplete;
/**
 * Returns a promise which will be resolved after all the components and watchers updated and rendered in next animation frame.
 * Called after `onRenderComplete` but normally there is no difference.
 * Compare to `onRenderComplete`, `untilRenderComplete` is normally used in app implementations.
 * @return A promise to be resolved after render completed.
 */
function untilRenderComplete() {
    return new Promise(resolve => {
        onRenderComplete(resolve);
    });
}
exports.untilRenderComplete = untilRenderComplete;
/** Enqueue a update task if not have. */
function enqueueUpdateIfNot() {
    // Why doesn't use `Promise.resolve().then` to start a micro stask normally:
    // When initialize a component from `connectedCallback`,
    // it's child nodes especially elements of child components are not ready,
    // even in the following micro task queue.
    // Wait for `requestAnimationFrame` will make child nodes prepared.
    // Otherwise it's very frequently to trigger updating since data are always in changing,
    // Uses `requestAnimationFrame` can handle less data channing and callbaks.
    // But sill need to wait for a micro tick,
    // because more components will be connected in next micro task.
    if (updatingStage === UpdatingStage.NotStarted) {
        requestAnimationFrame(update);
        updatingStage = UpdatingStage.Prepended;
    }
}
/** Do updating. */
async function update() {
    updatingStage = UpdatingStage.Updating;
    while (!queue.isEmpty() || renderCompleteCallbacks.length > 0) {
        // Update watchers, components and other updatable, may cause more components or watchers to be enqueued.
        while (!queue.isEmpty()) {
            do {
                let upt = queue.shift();
                try {
                    upt.__updateImmediately();
                }
                catch (err) {
                    console.error(err);
                }
                // Wait for more components connect.
                // Otherwise it wait for removed elements got disconnected.
                await Promise.resolve();
            } while (!queue.isEmpty());
        }
        let callbackList = renderCompleteCallbacks;
        renderCompleteCallbacks = [];
        // Calls callbacks, all components and watchers become stable now.
        for (let callback of callbackList) {
            try {
                callback();
            }
            catch (err) {
                console.error(err);
            }
        }
        await Promise.resolve();
    }
    // Back to start stage.
    validator.clear();
    updatingStage = UpdatingStage.NotStarted;
}


/***/ }),

/***/ "../flit/out/template/index.js":
/*!*************************************!*\
  !*** ../flit/out/template/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var node_part_1 = __webpack_require__(/*! ./parts/node-part */ "../flit/out/template/parts/node-part.js");
Object.defineProperty(exports, "NodePart", { enumerable: true, get: function () { return node_part_1.NodePart; } });
var template_1 = __webpack_require__(/*! ./template */ "../flit/out/template/template.js");
Object.defineProperty(exports, "Template", { enumerable: true, get: function () { return template_1.Template; } });
var template_result_1 = __webpack_require__(/*! ./template-result */ "../flit/out/template/template-result.js");
Object.defineProperty(exports, "TemplateResult", { enumerable: true, get: function () { return template_result_1.TemplateResult; } });
Object.defineProperty(exports, "html", { enumerable: true, get: function () { return template_result_1.html; } });
Object.defineProperty(exports, "css", { enumerable: true, get: function () { return template_result_1.css; } });
Object.defineProperty(exports, "svg", { enumerable: true, get: function () { return template_result_1.svg; } });


/***/ }),

/***/ "../flit/out/template/parts/attr-part.js":
/*!***********************************************!*\
  !*** ../flit/out/template/parts/attr-part.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AttrPart = void 0;
/**
 * To set attribute value.
 * `attr=${...}`
 */
class AttrPart {
    constructor(el, name) {
        this.el = el;
        this.name = name;
    }
    update(value) {
        this.setValue(value);
    }
    setValue(value) {
        value = value === null || value === undefined ? '' : String(value);
        this.el.setAttribute(this.name, value);
    }
}
exports.AttrPart = AttrPart;


/***/ }),

/***/ "../flit/out/template/parts/binding-part.js":
/*!**************************************************!*\
  !*** ../flit/out/template/parts/binding-part.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicBindingPart = exports.FixedBindingPart = void 0;
const bindings_1 = __webpack_require__(/*! ../../bindings */ "../flit/out/bindings/index.js");
/**
 * Passes value to a specified named Binding class:
 *
 * `:class=${...}`
 * `:style=${...}`
 * `:ref="..."`
 */
class FixedBindingPart {
    constructor(el, name, context) {
        this.binding = null;
        this.el = el;
        this.context = context;
        let dotIndex = name.indexOf('.');
        this.bindingName = dotIndex > -1 ? name.slice(0, dotIndex) : name;
        this.bindingModifiers = dotIndex > -1 ? name.slice(dotIndex + 1).split('.') : undefined;
    }
    update(value) {
        if (!this.binding) {
            let result = new bindings_1.BindingResult(this.bindingName, value);
            this.binding = bindings_1.BindingReferences.createFromResult(this.el, this.context, result, this.bindingModifiers);
        }
        else {
            this.binding.update(value);
        }
    }
    remove() { }
}
exports.FixedBindingPart = FixedBindingPart;
/**
 * Passes a binding result to a binding module, used in:
 * `<tag show(...)>`, `<tag hide(...)>`, `<tag cache(...)>`.
 */
class DynamicBindingPart {
    constructor(el, context) {
        this.name = null;
        this.binding = null;
        this.el = el;
        this.context = context;
    }
    update(value) {
        if (value instanceof bindings_1.BindingResult) {
            if (value.name === this.name) {
                this.binding.update(...value.args);
            }
            else {
                if (this.binding) {
                    this.removeCurrentBinding();
                }
                this.name = value.name;
                this.binding = bindings_1.BindingReferences.createFromResult(this.el, this.context, value);
            }
        }
        else {
            this.removeCurrentBinding();
        }
    }
    removeCurrentBinding() {
        if (this.binding) {
            this.name = null;
            this.binding.remove();
            bindings_1.BindingReferences.removeReference(this.binding);
            this.binding = null;
        }
    }
}
exports.DynamicBindingPart = DynamicBindingPart;


/***/ }),

/***/ "../flit/out/template/parts/event-part.js":
/*!************************************************!*\
  !*** ../flit/out/template/parts/event-part.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPart = void 0;
const component_1 = __webpack_require__(/*! ../../component */ "../flit/out/component/index.js");
const dom_event_1 = __webpack_require__(/*! ../../internals/dom-event */ "../flit/out/internals/dom-event.js");
/**
 * Registers a document or component event.
 *
 * `<div @click=${...}>` to register an element event.
 * `<com @@event=${...}>` to register a component event.
 */
class EventPart {
    constructor(el, name, context) {
        this.el = el;
        this.name = name[0] === '@' ? name.slice(1) : name;
        this.context = context;
        this.isComEvent = el.localName.includes('-') && name[0] === '@';
        this.bindListener();
    }
    bindListener() {
        if (this.isComEvent) {
            component_1.getComponentEarly(this.el, com => {
                com.on(this.name, this.triggerHandler, this);
            });
        }
        else {
            dom_event_1.on(this.el, this.name, this.triggerHandler, this);
        }
    }
    update(handler) {
        // Must be a function handler, can't set as `null` to disable event.
        if (typeof handler !== 'function') {
            throw new Error(`Failed to register listener at "<${this.el.localName} @${this.name}='${handler}'">, listener is not a function!`);
        }
        // Doesn't update registered handler dynamically because here it may be updated frequently.
        this.handler = handler;
    }
    triggerHandler(...args) {
        // Event will be triggered with current context as scope.
        this.handler.call(this.context, ...args);
    }
}
exports.EventPart = EventPart;


/***/ }),

/***/ "../flit/out/template/parts/may-attr-part.js":
/*!***************************************************!*\
  !*** ../flit/out/template/parts/may-attr-part.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MayAttrPart = void 0;
/**
 *  Keeps the attribute if expression returns `true`, otherwise removes the attribute.
 *
 * `?checked=${...}`
 * `?disabled=${...}`
 */
class MayAttrPart {
    constructor(el, name) {
        this.el = el;
        this.name = name;
    }
    update(value) {
        this.setValue(value);
    }
    setValue(value) {
        if (value) {
            this.el.setAttribute(this.name, '');
        }
        else {
            this.el.removeAttribute(this.name);
        }
    }
}
exports.MayAttrPart = MayAttrPart;


/***/ }),

/***/ "../flit/out/template/parts/node-part.js":
/*!***********************************************!*\
  !*** ../flit/out/template/parts/node-part.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePart = void 0;
const template_result_1 = __webpack_require__(/*! ../template-result */ "../flit/out/template/template-result.js");
const template_1 = __webpack_require__(/*! ../template */ "../flit/out/template/template.js");
const directives_1 = __webpack_require__(/*! ../../directives */ "../flit/out/directives/index.js");
const utils_1 = __webpack_require__(/*! ../../helpers/utils */ "../flit/out/helpers/utils.js");
/** Contents that can be included in a `<tag>${...}<.tag>`. */
var ContentType;
(function (ContentType) {
    ContentType[ContentType["Template"] = 0] = "Template";
    ContentType[ContentType["TemplateArray"] = 1] = "TemplateArray";
    ContentType[ContentType["Directive"] = 2] = "Directive";
    ContentType[ContentType["Text"] = 3] = "Text";
})(ContentType || (ContentType = {}));
/**
 * Associated with the contents betweens `<tag>${...}</tag>`.
 * May be a template result, text, template result array, or a directive.
 */
class NodePart {
    constructor(anchor, context) {
        this.contentType = null;
        this.content = null;
        this.anchor = anchor;
        this.context = context;
    }
    update(value) {
        let newContentType = this.getNewContentType(value);
        if (newContentType !== this.contentType && this.contentType !== null) {
            this.clearOldContent();
        }
        this.contentType = newContentType;
        switch (newContentType) {
            case ContentType.Template:
                this.updateTemplate(value);
                break;
            case ContentType.Directive:
                this.updateDirective(value);
                break;
            case ContentType.TemplateArray:
                this.updateTemplateArray(value);
                break;
            case ContentType.Text:
                this.updateText(value);
        }
    }
    getNewContentType(value) {
        if (value instanceof template_result_1.TemplateResult) {
            return ContentType.Template;
        }
        else if (value instanceof directives_1.DirectiveResult) {
            return ContentType.Directive;
        }
        else if (Array.isArray(value)) {
            return ContentType.TemplateArray;
        }
        else {
            return ContentType.Text;
        }
    }
    clearOldContent() {
        let contentType = this.contentType;
        if (contentType === ContentType.Template) {
            this.content.remove();
        }
        else if (contentType === ContentType.Directive) {
            this.content.remove();
            directives_1.DirectiveReferences.removeReference(this.content);
        }
        else if (contentType === ContentType.TemplateArray) {
            for (let template of this.content) {
                template.remove();
            }
        }
        else if (contentType === ContentType.Text) {
            if (this.content) {
                this.content.remove();
            }
        }
        this.content = null;
    }
    updateTemplate(result) {
        // One issue when reusing old template - image will keep old appearance until the new image loaded.
        // We can partly fix this by implementing a binding API `:src`.
        let oldTemplate = this.content;
        if (oldTemplate && oldTemplate.canMergeWith(result)) {
            oldTemplate.merge(result);
        }
        else {
            if (oldTemplate) {
                oldTemplate.remove();
            }
            let newTemplate = new template_1.Template(result, this.context);
            this.anchor.insert(newTemplate.extractToFragment());
            this.content = newTemplate;
        }
    }
    updateDirective(result) {
        let oldDirective = this.content;
        if (oldDirective && oldDirective.canMergeWith(...result.args)) {
            oldDirective.merge(...result.args);
        }
        else {
            if (oldDirective) {
                oldDirective.remove();
            }
            this.content = directives_1.DirectiveReferences.createFromResult(this.anchor, this.context, result);
        }
    }
    updateTemplateArray(results) {
        let templates = this.content;
        if (!templates) {
            templates = this.content = [];
        }
        results = results.filter(result => result instanceof template_result_1.TemplateResult);
        // Updates shared part.
        for (let i = 0; i < Math.min(templates.length, results.length); i++) {
            let oldTemplate = templates[i];
            let result = results[i];
            if (oldTemplate.canMergeWith(result)) {
                oldTemplate.merge(result);
            }
            else {
                let newTemplate = new template_1.Template(result, this.context);
                oldTemplate.replaceWith(newTemplate);
                templates[i] = newTemplate;
            }
        }
        // Removes rest.
        if (results.length < templates.length) {
            for (let i = templates.length - 1; i >= results.length; i--) {
                templates.pop().remove();
            }
        }
        // Creates more.
        else {
            for (let i = templates.length; i < results.length; i++) {
                let result = results[i];
                let template = new template_1.Template(result, this.context);
                this.anchor.insert(template.extractToFragment());
                templates.push(template);
            }
        }
    }
    updateText(value) {
        let textNode = this.content;
        let text = value === null || value === undefined ? '' : utils_1.trim(String(value));
        if (text) {
            if (textNode) {
                textNode.textContent = text;
            }
            else {
                textNode = document.createTextNode(text);
                this.anchor.insert(textNode);
                this.content = textNode;
            }
        }
        else {
            if (textNode) {
                textNode.textContent = '';
            }
        }
    }
}
exports.NodePart = NodePart;


/***/ }),

/***/ "../flit/out/template/parts/property-part.js":
/*!***************************************************!*\
  !*** ../flit/out/template/parts/property-part.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyPart = void 0;
const component_1 = __webpack_require__(/*! ../../component */ "../flit/out/component/index.js");
/**
 * Assigns property directly to current component or element.
 *
 * `<tag .property=${...}>` will assign value to normal element according to `element.property = value`.
 * `<custom-tag .property=${...}>` will assign value to component according to `com.property = value`.
 * `<custom-tag ..property=${...}>` will always assign value to element.
 *
 * But still don't suggest to assign properties to normal element using `.`, you should use element attributes.
*/
class PropertyPart {
    constructor(el, name, fixed) {
        this.com = null;
        this.el = el;
        this.name = name[0] === '.' ? name.slice(1) : name;
        this.isComProperty = el.localName.includes('-') && name[0] !== '.';
        this.fixed = fixed;
    }
    update(value) {
        if (this.isComProperty) {
            if (this.com) {
                this.updateComProperty(value);
            }
            else {
                component_1.getComponentEarly(this.el, com => {
                    this.bindCom(com);
                    this.updateComProperty(value);
                });
            }
        }
        else {
            this.updateElementProperty(value);
        }
    }
    bindCom(com) {
        this.com = com;
    }
    updateComProperty(value) {
        if (this.fixed) {
            this.updateFixedComProperty(value);
        }
        else {
            this.com[this.name] = value;
        }
    }
    updateFixedComProperty(value) {
        let com = this.com;
        let type = typeof com[this.name];
        if (type === 'object' && !/^\s*(?:\{.+?\}|\[.+?\])\s*$/.test(value)) {
            type = 'string';
        }
        switch (type) {
            case 'boolean':
                com[this.name] = value === 'false' ? false : true;
                break;
            case 'number':
                com[this.name] = Number(value);
                break;
            case 'object':
                com[this.name] = JSON.parse(value);
                break;
            default:
                if (type !== 'undefined') {
                    com[this.name] = value;
                }
                else {
                    console.warn(`Please makesure value of property "${this.name}" exist on "<${com.el.localName} />" when assigning fixed property!`);
                }
        }
    }
    updateElementProperty(value) {
        // Required, set same value for `<input type="text">` may cause cursor position reset.
        if (this.el[this.name] !== value) {
            this.el[this.name] = value;
        }
    }
}
exports.PropertyPart = PropertyPart;


/***/ }),

/***/ "../flit/out/template/parts/slot-part.js":
/*!***********************************************!*\
  !*** ../flit/out/template/parts/slot-part.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotPart = void 0;
/**
 * To fill slot tag with slot contents.
 * `<slot>`
 * `<slot name="...">`
 */
class SlotPart {
    constructor(el, name, context) {
        if (!context) {
            throw new ReferenceError(`A context must be provided when using "<slot>"!`);
        }
        this.el = el;
        this.name = name;
        this.context = context;
    }
    update() {
        if (this.name) {
            if (this.context.slots.hasOwnProperty(this.name)) {
                this.el.append(...this.context.slots[this.name]);
            }
        }
        else {
            // Why not just append child nodes?
            // Because the `<slot>` may be created dynamically:
            //   booleanValue ? html`<div class="class1"><slot /></div>` : html`<div class="class2"><slot /></div>`
            this.el.append(this.context.__restNodeRange.extractToFragment());
        }
    }
}
exports.SlotPart = SlotPart;


/***/ }),

/***/ "../flit/out/template/template-extends.js":
/*!************************************************!*\
  !*** ../flit/out/template/template-extends.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.extendsTemplateResult = void 0;
const html_attributes_parser_1 = __webpack_require__(/*! ../internals/html-attributes-parser */ "../flit/out/internals/html-attributes-parser.js");
const html_token_parser_1 = __webpack_require__(/*! ../internals/html-token-parser */ "../flit/out/internals/html-token-parser.js");
const template_result_1 = __webpack_require__(/*! ./template-result */ "../flit/out/template/template-result.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../flit/out/template/utils.js");
/**
 * Caches template extends result.
 * Next time extending of two same shaped template will capture a cached result.
 */
const TemplateExtendsCache = new Map();
/**
 * Merge root attributes and slot elements from current result to super one.
 * This is used for `currentResult.extends(superResult)`.
 *
 * What happens when multiple slot element `<slot name="...">` with same name exists:
 * 	 The outside most slot elements will exist, others will be removed.
 *
 * What happens when multiple rest slot anchor elements `<slot />` exists in different template:
 *   The outside most rest slot elements will exist too, others will be removed.
 */
function extendsTemplateResult(result, superResult) {
    let totalValues = [...result.values, ...superResult.values];
    let string = utils_1.joinWithOrderMarkers(result.strings);
    let superString = utils_1.joinWithOrderMarkers(superResult.strings, result.values.length);
    let stringsAndValueIndices;
    let cacheForSuper = TemplateExtendsCache.get(string);
    if (cacheForSuper) {
        stringsAndValueIndices = cacheForSuper.get(superString);
    }
    if (!stringsAndValueIndices) {
        stringsAndValueIndices = parseTemplateResultForExtending(string, superString);
    }
    let { strings, valueIndices } = stringsAndValueIndices;
    let reOrderedValues = valueIndices.map(index => totalValues[index]);
    return new template_result_1.TemplateResult(result.type, strings, reOrderedValues);
}
exports.extendsTemplateResult = extendsTemplateResult;
/** Parse a template result to strings and value indices. */
function parseTemplateResultForExtending(string, superString) {
    let tokens = html_token_parser_1.parseToHTMLTokens(string);
    let { attributes, slots, restTokens } = parseToRootAttributesAndSlots(tokens);
    let superTokens = wrapWithTemplateTokens(superString);
    assignRootAttributes(superTokens, attributes);
    assignRootSlots(superTokens, slots, restTokens);
    let stringsAndValueIndices = utils_1.splitByOrderMarkers(html_token_parser_1.joinHTMLTokens(superTokens));
    let cacheForSuper = TemplateExtendsCache.get(string);
    if (!cacheForSuper) {
        cacheForSuper = new Map();
        TemplateExtendsCache.set(string, cacheForSuper);
    }
    cacheForSuper.set(superString, stringsAndValueIndices);
    return stringsAndValueIndices;
}
/** Parse html token list to get attributes from root element, and get all slots. */
function parseToRootAttributesAndSlots(tokens) {
    let firstTagStartIndex = tokens.findIndex(token => token.type === html_token_parser_1.HTMLTokenType.StartTag);
    let firstTagEndIndex = tokens.length - 1;
    let tabCount = 0;
    let firstTag = tokens[firstTagStartIndex];
    let attributes = firstTag.attributes;
    let slots = {};
    // Text nodes already been trimmed when parsing as tokens, no need to worry rest slot contains empty text.
    let restTokens = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case html_token_parser_1.HTMLTokenType.StartTag:
                if (/slot\s*=\s*['"](\w+)/.test(token.attributes)) {
                    let name = token.attributes.match(/slot\s*=\s*['"](\w+)/)[1];
                    let wholeTokensBelows = outOuterNestingTokens(tokens, i);
                    slots[name] = slots[name] || [];
                    slots[name].push(...wholeTokensBelows);
                    i--;
                }
                else if (!token.selfClose) {
                    tabCount++;
                }
                break;
            case html_token_parser_1.HTMLTokenType.EndTag:
                tabCount--;
                if (tabCount === 0) {
                    firstTagEndIndex = i + 1;
                }
                break;
        }
    }
    if (firstTagEndIndex - firstTagStartIndex > 2) {
        restTokens = tokens.slice(firstTagStartIndex + 1, firstTagEndIndex - 1);
    }
    return { attributes, slots, restTokens };
}
/** Add a `<template> to wrap current content if don't have. */
function wrapWithTemplateTokens(string) {
    let tokens = html_token_parser_1.parseToHTMLTokens(string);
    let firstToken = tokens[0];
    if (!firstToken || firstToken.type !== html_token_parser_1.HTMLTokenType.StartTag || firstToken.tagName !== 'template') {
        tokens.unshift({
            type: html_token_parser_1.HTMLTokenType.StartTag,
            tagName: 'template',
            attributes: '',
        });
        tokens.push({
            type: html_token_parser_1.HTMLTokenType.EndTag,
            tagName: 'template',
        });
    }
    return tokens;
}
/** Assign attributes of root element to super tokens */
function assignRootAttributes(superTokens, assignAttributes) {
    superTokens[0].attributes = html_attributes_parser_1.joinHTMLAttributes(superTokens[0].attributes, assignAttributes);
}
/** Assign attributes of root element and all slots to a html token list. */
function assignRootSlots(tokens, slots, restTokens) {
    if (Object.keys(slots).length > 0 || restTokens.length > 0) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            switch (token.type) {
                case html_token_parser_1.HTMLTokenType.StartTag:
                    if (token.tagName === 'slot') {
                        let nameMatch = token.attributes.match(/name\s*=\s*['"](\w+)/);
                        let name = nameMatch ? nameMatch[1] : null;
                        if (name) {
                            if (slots[name]) {
                                let tokenPieces = slots[name];
                                // Keep `<slot name="">` so it may be overwrited by outers.
                                outInnerNestingTokens(tokens, i);
                                tokens.splice(i + 1, 0, ...tokenPieces);
                                i += tokenPieces.length;
                            }
                        }
                        else {
                            // Removes `<slot />` so different levels of rest contents will be merged.
                            if (restTokens.length) {
                                outOuterNestingTokens(tokens, i);
                                tokens.splice(i, 0, ...restTokens);
                                i += restTokens.length;
                            }
                        }
                    }
                    break;
            }
        }
    }
}
/** Removes all inner tokens and current token in nesting pair. */
function outOuterNestingTokens(tokens, startTagIndex) {
    return tokens.splice(startTagIndex, findEndTagIndex(tokens, startTagIndex) + 1 - startTagIndex);
}
/** Removes all inner tokens in nesting pair. */
function outInnerNestingTokens(tokens, startTagIndex) {
    return tokens.splice(startTagIndex + 1, findEndTagIndex(tokens, startTagIndex) - 1 - startTagIndex);
}
/** Find the index of end tag that as end of current tag. */
function findEndTagIndex(tokens, startTagIndex) {
    let tabCount = 1;
    for (let i = startTagIndex + 1; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case html_token_parser_1.HTMLTokenType.StartTag:
                if (!token.selfClose) {
                    tabCount++;
                }
                break;
            case html_token_parser_1.HTMLTokenType.EndTag:
                tabCount--;
                if (tabCount === 0) {
                    return i;
                }
                break;
        }
    }
    return tokens.length - 1;
}


/***/ }),

/***/ "../flit/out/template/template-parser.js":
/*!***********************************************!*\
  !*** ../flit/out/template/template-parser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplate = exports.SlotType = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "../flit/out/template/utils.js");
const utils_2 = __webpack_require__(/*! ../helpers/utils */ "../flit/out/helpers/utils.js");
const html_token_parser_1 = __webpack_require__(/*! ../internals/html-token-parser */ "../flit/out/internals/html-token-parser.js");
const style_parser_1 = __webpack_require__(/*! ../internals/style-parser */ "../flit/out/internals/style-parser.js");
/** Type of each slot, respresent the type of `????=${...}`. */
var SlotType;
(function (SlotType) {
    /** `>${...}<` */
    SlotType[SlotType["Node"] = 0] = "Node";
    /** `<slot>` */
    SlotType[SlotType["SlotTag"] = 1] = "SlotTag";
    /** `<tag attr=...>` */
    SlotType[SlotType["Attr"] = 2] = "Attr";
    /** `<tag ?attr=...>` */
    SlotType[SlotType["MayAttr"] = 3] = "MayAttr";
    /** `<tag .property=...>` */
    SlotType[SlotType["Property"] = 4] = "Property";
    /** `<tag @event=...>` */
    SlotType[SlotType["Event"] = 5] = "Event";
    /** `<tag :class=...>` */
    SlotType[SlotType["FixedBinging"] = 6] = "FixedBinging";
    /** `<tag ...>` */
    SlotType[SlotType["DynamicBinding"] = 7] = "DynamicBinding";
})(SlotType = exports.SlotType || (exports.SlotType = {}));
/** Caches map of `scope name -> template string -> parsed result`. */
const ParsedResultCache = new Map();
/** Caches map of `scope name -> parser`. */
const ParserCache = new Map();
/**
 * Parses template strings to a document fragment and marks all slots and their associated nodes.
 * Will always prepend a comment in the front to mark current template start position.
 */
function parseTemplate(type, strings, el) {
    let scopeName = (el === null || el === void 0 ? void 0 : el.localName) || 'global';
    // Parse it.
    if (type === 'html' || type === 'svg') {
        let string = utils_1.joinWithOrderMarkers(strings);
        let sharedResultMap = ParsedResultCache.get(scopeName);
        let sharedResult = sharedResultMap === null || sharedResultMap === void 0 ? void 0 : sharedResultMap.get(string);
        if (!sharedResult) {
            if (!sharedResultMap) {
                sharedResultMap = new Map();
                ParsedResultCache.set(scopeName, sharedResultMap);
            }
            let parser = ParserCache.get(scopeName);
            if (!parser) {
                parser = new HTMLAndSVGTemplateParser(scopeName);
                ParserCache.set(scopeName, parser);
            }
            sharedResult = parser.parse(type, string);
            sharedResultMap.set(string, sharedResult);
        }
        return cloneParsedResult(sharedResult, el);
    }
    // No slots, just create.
    else if (type === 'css') {
        let html = `<style>${strings[0]}</style>`;
        let fragment = createTemplateFromHTML(html).content;
        return {
            fragment,
            nodes: [],
            slots: [],
        };
    }
    // No slots too.
    else {
        let text = strings[0];
        let fragment = document.createDocumentFragment();
        fragment.append(document.createTextNode(text));
        return {
            fragment,
            nodes: [],
            slots: [],
        };
    }
}
exports.parseTemplate = parseTemplate;
/** Create a template element with `html` as content. */
function createTemplateFromHTML(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
class HTMLAndSVGTemplateParser {
    constructor(scopeName) {
        this.nodeIndexs = [];
        this.slots = [];
        this.currentNodeIndex = 0;
        this.scopeName = scopeName;
        this.scopedClassNameSet = style_parser_1.getScopedClassNames(this.scopeName);
    }
    parse(type, string) {
        let tokens = html_token_parser_1.parseToHTMLTokens(string);
        let codes = '';
        for (let token of tokens) {
            switch (token.type) {
                case html_token_parser_1.HTMLTokenType.StartTag:
                    let tagName = token.tagName;
                    let attributes = token.attributes;
                    if (tagName === 'slot') {
                        this.parseSlotTag(attributes);
                    }
                    // At least contains ` {flit:0}`.
                    if (attributes.length >= 9) {
                        attributes = this.parseAttribute(attributes);
                    }
                    codes += '<' + tagName + attributes + '>';
                    this.currentNodeIndex++;
                    break;
                case html_token_parser_1.HTMLTokenType.EndTag:
                    codes += `</${token.tagName}>`;
                    break;
                case html_token_parser_1.HTMLTokenType.Text:
                    codes += this.parseText(token.text);
                    break;
            }
        }
        let firstTag = tokens.find(token => token.type === html_token_parser_1.HTMLTokenType.StartTag);
        let svgWrapped = false;
        if (firstTag) {
            if (type === 'svg' && firstTag.tagName !== 'svg') {
                codes = '<svg>' + codes + '</svg>';
                svgWrapped = true;
            }
        }
        let template = createTemplateFromHTML(codes);
        let attributes = null;
        if (svgWrapped) {
            let svg = template.content.firstElementChild;
            template.content.append(...svg.childNodes);
            svg.remove();
        }
        // We can define some classes or styles on the top element if renders `<template class="...">`.
        if (firstTag && firstTag.tagName === 'template') {
            template = template.content.firstElementChild;
            attributes = [...template.attributes].map(({ name, value }) => ({ name, value }));
        }
        let result = {
            template,
            slots: this.slots,
            rootAttributes: attributes,
        };
        this.clean();
        return result;
    }
    parseSlotTag(attr) {
        var _a;
        let name = ((_a = attr.match(/name=['"](.+?)['"]/)) === null || _a === void 0 ? void 0 : _a[1]) || null;
        this.slots.push({
            type: SlotType.SlotTag,
            name,
            strings: null,
            valueIndices: null,
            nodeIndex: this.currentNodeIndex,
        });
    }
    /** Parses `???=${...}`. */
    parseAttribute(attr) {
        const attrRE = /([.:?@\w-]+)\s*(?:=\s*(".*?"|'.*?'|\{flit:\d+\})\s*)?|\{flit:(\d+)\}\s*/g;
        return attr.replace(attrRE, (m0, name, value = '', markerId) => {
            if (markerId) {
                this.slots.push({
                    type: SlotType.DynamicBinding,
                    name: null,
                    strings: null,
                    valueIndices: [Number(markerId)],
                    nodeIndex: this.currentNodeIndex,
                });
                this.nodeIndexs.push(this.currentNodeIndex);
                return '';
            }
            let type;
            let hasMarker = utils_1.containsOrderMarker(value);
            switch (name[0]) {
                case '.':
                    type = SlotType.Property;
                    break;
                case ':':
                    type = SlotType.FixedBinging;
                    break;
                case '?':
                    type = SlotType.MayAttr;
                    break;
                case '@':
                    type = SlotType.Event;
                    break;
            }
            if (type !== undefined) {
                name = name.slice(1);
            }
            if (type === undefined && hasMarker) {
                // `class=${...}` -> `:class=${...}`, so the class value can be scoped.
                if (name === 'class') {
                    type = SlotType.FixedBinging;
                }
                else {
                    type = SlotType.Attr;
                }
            }
            if (type !== undefined) {
                if (value[0] === '\'' || value[0] === '"') {
                    value = value.slice(1, -1);
                }
                if (hasMarker) {
                    let { strings, valueIndices } = utils_1.parseOrderMarkers(value);
                    this.slots.push({
                        type,
                        name,
                        strings,
                        valueIndices,
                        nodeIndex: this.currentNodeIndex,
                    });
                }
                else {
                    this.slots.push({
                        type,
                        name,
                        strings: [value],
                        valueIndices: null,
                        nodeIndex: this.currentNodeIndex,
                    });
                }
                this.nodeIndexs.push(this.currentNodeIndex);
                if (type === SlotType.Attr) {
                    return name + '="" ';
                }
                else {
                    return '';
                }
            }
            else if (name === 'class' && this.scopedClassNameSet) {
                value = value.replace(/[\w-]+/g, (m0) => {
                    if (this.scopedClassNameSet.has(m0)) {
                        return m0 + '__' + this.scopeName;
                    }
                    else {
                        return m0;
                    }
                });
                return name + '=' + value;
            }
            return m0;
        });
    }
    /** Parses `<tag>${...}</tag>`. */
    parseText(text) {
        // `text` has already been trimmed here when parsing as tokens.
        if (!text) {
            return text;
        }
        if (utils_1.containsOrderMarker(text)) {
            let { strings, valueIndices } = utils_1.splitByOrderMarkers(text);
            // Each hole may be a string, or a `TemplateResult`, so must unique them, but can't join them to a string.
            for (let i = 1; i < strings.length; i++) {
                this.slots.push({
                    type: SlotType.Node,
                    name: null,
                    strings: null,
                    valueIndices: valueIndices.slice(i - 1, i),
                    nodeIndex: this.currentNodeIndex,
                });
                this.nodeIndexs.push(this.currentNodeIndex);
                this.currentNodeIndex += 1;
            }
            text = strings.map(utils_2.trim).join('<!--->');
        }
        return text;
    }
    /** Clean properties for next time parsing. */
    clean() {
        this.slots = [];
        this.nodeIndexs = [];
        this.currentNodeIndex = 0;
    }
}
/** Clone parsed result fragment and link it with node indices from the parsed result. */
function cloneParsedResult(sharedResult, el) {
    let { template, slots, rootAttributes } = sharedResult;
    let fragment = template.content.cloneNode(true);
    let nodes = [];
    if (rootAttributes) {
        if (!el) {
            throw new Error('A context must be provided when rendering `<template>...`!');
        }
        utils_1.extendsAttributes(el, rootAttributes);
    }
    if (slots.length > 0) {
        let nodeIndex = 0;
        let slotIndex = 0;
        let walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, null);
        let node;
        let end = false;
        if (rootAttributes) {
            while (slotIndex < slots.length && slots[slotIndex].nodeIndex === 0) {
                nodes.push(el);
                slotIndex++;
            }
            nodeIndex = 1;
        }
        if (slotIndex < slots.length) {
            while (node = walker.nextNode()) {
                while (slots[slotIndex].nodeIndex === nodeIndex) {
                    nodes.push(node);
                    slotIndex++;
                    if (slotIndex === slots.length) {
                        end = true;
                        break;
                    }
                }
                if (end) {
                    break;
                }
                nodeIndex++;
            }
        }
    }
    return {
        fragment,
        slots,
        nodes,
    };
}


/***/ }),

/***/ "../flit/out/template/template-result.js":
/*!***********************************************!*\
  !*** ../flit/out/template/template-result.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateResult = exports.css = exports.svg = exports.html = void 0;
const template_extends_1 = __webpack_require__(/*! ./template-extends */ "../flit/out/template/template-extends.js");
/**
 * Returns a HTML template literal, can be used to render or update a component.
 * Use it like:
 * ```ts
 * html`...`
 * ```
 */
function html(strings, ...values) {
    return new TemplateResult('html', strings, values);
}
exports.html = html;
/**
 * Returns a SVG template literal, can be used to render or update a component.
 * Use it like:
 * ```ts
 * svg`...`
 * ```
 */
function svg(strings, ...values) {
    return new TemplateResult('svg', strings, values);
}
exports.svg = svg;
/**
 * Returns a CSS template literal, can be used as component's static style property.
 * Use it like:
 * ```ts
 * css`...`
 * ```
 */
function css(strings, ...values) {
    return new TemplateResult('css', strings, values);
}
exports.css = css;
/**
 * Created from each html`...` or svg`...`.
 * Every time call `component.update` will generate a new template result,
 * then we will use this result to merge or replaced old one.
 */
class TemplateResult {
    constructor(type, strings, values) {
        this.type = type;
        this.strings = strings;
        this.values = values;
    }
    /**
     * Join strings and values to string.
     * Just for debugging.
     */
    toString() {
        let text = this.strings[0];
        for (let i = 0; i < this.strings.length - 1; i++) {
            let value = this.values[i];
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    text += value.join('');
                }
                else {
                    text += String(value);
                }
            }
            text += this.strings[i + 1];
        }
        return text;
    }
    /** Clone current template result and returns a new one. */
    clone() {
        return new TemplateResult(this.type, [...this.strings], [...this.values]);
    }
    /** Concat with another template result, and returns a new one. */
    concat(result) {
        let strings = [...this.strings];
        strings[strings.length - 1] += result.strings[0];
        strings.push(...result.strings.slice(1));
        let values = [...this.values];
        return new TemplateResult(this.type, strings, values);
    }
    /**
     * A template result can extend another:
     * "css`...`.extends(...)" will join them.
     * "html`...`.extends(...)" is different, see the comments below.
     *
     * For `html` or `svg` template the extends will merge root attributes and slot elements into super,
     * so you can reuse super rendering result and add some classes or styles and set same slots,
     */
    extends(superResult) {
        if (this.type === 'html' || this.type === 'svg') {
            return template_extends_1.extendsTemplateResult(this, superResult);
        }
        else {
            return new TemplateResult(this.type, [...superResult.strings, ...this.strings], [...superResult.values, '', ...this.values]);
        }
    }
}
exports.TemplateResult = TemplateResult;


/***/ }),

/***/ "../flit/out/template/template.js":
/*!****************************************!*\
  !*** ../flit/out/template/template.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const node_range_1 = __webpack_require__(/*! ../internals/node-range */ "../flit/out/internals/node-range.js");
const node_anchor_1 = __webpack_require__(/*! ../internals/node-anchor */ "../flit/out/internals/node-anchor.js");
const template_parser_1 = __webpack_require__(/*! ./template-parser */ "../flit/out/template/template-parser.js");
const node_part_1 = __webpack_require__(/*! ./parts/node-part */ "../flit/out/template/parts/node-part.js");
const may_attr_part_1 = __webpack_require__(/*! ./parts/may-attr-part */ "../flit/out/template/parts/may-attr-part.js");
const event_part_1 = __webpack_require__(/*! ./parts/event-part */ "../flit/out/template/parts/event-part.js");
const attr_part_1 = __webpack_require__(/*! ./parts/attr-part */ "../flit/out/template/parts/attr-part.js");
const binding_part_1 = __webpack_require__(/*! ./parts/binding-part */ "../flit/out/template/parts/binding-part.js");
const property_part_1 = __webpack_require__(/*! ./parts/property-part */ "../flit/out/template/parts/property-part.js");
const component_1 = __webpack_require__(/*! ../component */ "../flit/out/component/index.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../flit/out/template/utils.js");
const slot_part_1 = __webpack_require__(/*! ./parts/slot-part */ "../flit/out/template/parts/slot-part.js");
/**
 * Class to parse a template result returned from html`...`,
 * and attach everything
 * And can do some patches on it according to newly rendered template result.
 */
class Template {
    /**
     * Create an template from html`...` like template result and context
     * @param result The template result like html`...`.
     * @param context The context passed to event handlers.
     */
    constructor(result, context) {
        var _a;
        this.parts = [];
        this.currentResult = result;
        this.context = context;
        let { fragment, nodes, slots } = template_parser_1.parseTemplate(result.type, result.strings, ((_a = this.context) === null || _a === void 0 ? void 0 : _a.el) || null);
        this.range = new node_range_1.NodeRange(fragment);
        this.parseParts(nodes, slots);
    }
    /** Parse template result and returns a fragment. */
    parseParts(nodes, slots) {
        let resultValues = this.currentResult.values;
        if (nodes && slots) {
            for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
                let node = nodes[nodeIndex];
                let slot = slots[nodeIndex];
                let part;
                switch (slot.type) {
                    case template_parser_1.SlotType.SlotTag:
                        part = new slot_part_1.SlotPart(node, slot.name, this.context);
                        break;
                    case template_parser_1.SlotType.Node:
                        part = new node_part_1.NodePart(new node_anchor_1.NodeAnchor(node, node_anchor_1.NodeAnchorType.Next), this.context);
                        break;
                    case template_parser_1.SlotType.MayAttr:
                        part = new may_attr_part_1.MayAttrPart(node, slot.name);
                        break;
                    case template_parser_1.SlotType.Event:
                        part = new event_part_1.EventPart(node, slot.name, this.context);
                        break;
                    case template_parser_1.SlotType.Attr:
                        part = new attr_part_1.AttrPart(node, slot.name);
                        break;
                    case template_parser_1.SlotType.Property:
                        part = new property_part_1.PropertyPart(node, slot.name, !slot.valueIndices);
                        break;
                    case template_parser_1.SlotType.FixedBinging:
                        part = new binding_part_1.FixedBindingPart(node, slot.name, this.context);
                        break;
                    case template_parser_1.SlotType.DynamicBinding:
                        part = new binding_part_1.DynamicBindingPart(node, this.context);
                        break;
                }
                if (slot.type === template_parser_1.SlotType.SlotTag) {
                    part.update();
                }
                else {
                    let { strings, valueIndices } = slot;
                    let values = (valueIndices === null || valueIndices === void 0 ? void 0 : valueIndices.map(index => resultValues[index])) || null;
                    let value = utils_1.joinStringsAndValues(strings, values);
                    part.update(value);
                    // Only when `valueIndices` exist then value is dynamic so this part is updatable.
                    if (valueIndices) {
                        this.parts.push({
                            part,
                            strings,
                            valueIndices,
                        });
                    }
                }
            }
        }
    }
    /** Compare if current template result can merge with `result`. */
    canMergeWith(result) {
        if (this.currentResult.type !== result.type) {
            return false;
        }
        if (this.currentResult.strings.length !== result.strings.length) {
            return false;
        }
        for (let i = 0; i < this.currentResult.strings.length; i++) {
            if (this.currentResult.strings[i] !== result.strings[i]) {
                return false;
            }
        }
        return true;
    }
    /** Merge current result with `result`. */
    merge(result) {
        for (let { part, strings, valueIndices } of this.parts) {
            let changed = valueIndices.some(index => this.currentResult.values[index] !== result.values[index]);
            if (changed) {
                let values = valueIndices.map(index => result.values[index]);
                let value = utils_1.joinStringsAndValues(strings, values);
                part.update(value);
            }
        }
        this.currentResult = result;
    }
    /**
     * Initialize components inside a template and update it immediately.
     * Elements are not connected but will be pre rendered.
     */
    preRender() {
        let fragment = this.range.getCurrentFragment();
        if (!fragment || !(fragment instanceof DocumentFragment)) {
            throw new Error(`Can only prerender contents in a fragment!`);
        }
        let walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
        let el;
        while (el = walker.nextNode()) {
            if (el instanceof HTMLElement && el.localName.includes('-')) {
                let com = component_1.createComponent(el);
                // Here it doesn't emit connected or created, just to pre render all the inner nodes.
                // May add more inner components and pre rendering them later.
                com.__updateImmediately(true);
            }
        }
    }
    /**
     * Append all nodes into target element or selector.
     * @param fragment The fragment to append.
     * @param target The target element where will append to.
     */
    appendTo(target) {
        let fragment = this.extractToFragment();
        if (typeof target === 'string') {
            let targetEl = document.querySelector(target);
            if (targetEl) {
                targetEl.append(fragment);
            }
        }
        else if (target) {
            target.append(fragment);
        }
    }
    /**
     * Extract all nodes into a fragment.
     * You must insert the extracted fragment into a container soon.
     * Used to get just parsed fragment, or reuse template nodes.
     */
    extractToFragment() {
        return this.range.extractToFragment();
    }
    /**
     * Moves all nodes out from parent container,
     * and cache into a new fragment in order to use them later.
     */
    movesOut() {
        this.range.movesOut();
    }
    /** Get all the nodes in the template. */
    getNodes() {
        return this.range.getNodes();
    }
    /** Get first element in template. */
    getFirstElement() {
        return this.range.getFirstElement();
    }
    /** Insert all the nodes in specified template before start node of current template. */
    before(template) {
        this.range.before(template.range);
    }
    /** Replace all the nodes in current template with the nodes of specified template. */
    replaceWith(template) {
        this.range.replaceWith(template.range);
    }
    /**
     * Removes all the nodes in the template.
     * Note the child template will not call `remove`.
     */
    remove() {
        this.range.remove();
    }
}
exports.Template = Template;


/***/ }),

/***/ "../flit/out/template/utils.js":
/*!*************************************!*\
  !*** ../flit/out/template/utils.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.joinStringsAndValues = exports.extendsAttributes = exports.splitByOrderMarkers = exports.parseOrderMarkers = exports.beOrderMarker = exports.containsOrderMarker = exports.joinWithOrderMarkers = void 0;
/** Join template strings with `${flit:id}`, the id is the increased index of values. */
function joinWithOrderMarkers(strings, startIndex = 0) {
    let text = strings[0];
    for (let i = 0; i < strings.length - 1; i++) {
        text += `{flit:${i + startIndex}}`;
        text += strings[i + 1];
    }
    return text;
}
exports.joinWithOrderMarkers = joinWithOrderMarkers;
/** Test if string contains `${flit:id}`. */
function containsOrderMarker(string) {
    return /\{flit:\d+\}/.test(string);
}
exports.containsOrderMarker = containsOrderMarker;
/** Test if string is exactly a `${flit:id}`. */
function beOrderMarker(string) {
    return /^\{flit:\d+\}$/.test(string);
}
exports.beOrderMarker = beOrderMarker;
/**
 * Split string contains `${flit:id}` into strings and valueIndices.
 * Returned property `strings` will be `null` if whole string is exactly a marker.
 */
function parseOrderMarkers(string) {
    if (beOrderMarker(string)) {
        return {
            strings: null,
            valueIndices: [Number(string.match(/^\{flit:(\d+)\}$/)[1])]
        };
    }
    else {
        return splitByOrderMarkers(string);
    }
}
exports.parseOrderMarkers = parseOrderMarkers;
/** Split string contains `${flit:id}` into strings and valueIndices. */
function splitByOrderMarkers(string) {
    let re = /\{flit:(\d+)\}/g;
    let match;
    let strings = [];
    let valueIndices = [];
    let lastIndex = 0;
    while (match = re.exec(string)) {
        strings.push(string.slice(lastIndex, match.index));
        valueIndices.push(Number(match[1]));
        lastIndex = re.lastIndex;
    }
    strings.push(string.slice(lastIndex));
    return {
        strings,
        valueIndices,
    };
}
exports.splitByOrderMarkers = splitByOrderMarkers;
/** Extends attributes by merging class and style attributes, and setting normal attributes.  */
function extendsAttributes(el, attributes) {
    for (let { name, value } of attributes) {
        if ((name === 'class' || name === 'style') && el.hasAttribute(name)) {
            if (name === 'style') {
                value = el.getAttribute(name) + '; ' + value;
            }
            else if (name === 'class') {
                value = el.getAttribute(name) + ' ' + value;
            }
        }
        el.setAttribute(name, value);
    }
}
exports.extendsAttributes = extendsAttributes;
/** Join strings and values to a string, returns `values[0]` if `strings` is null. */
function joinStringsAndValues(strings, values) {
    if (!strings) {
        return values[0];
    }
    let text = strings[0];
    for (let i = 0; i < strings.length - 1; i++) {
        let value = values[i];
        text += value === null || value === undefined ? '' : String(value);
        text += strings[i + 1];
    }
    return text;
}
exports.joinStringsAndValues = joinStringsAndValues;


/***/ }),

/***/ "../flit/out/watchers/globals.js":
/*!***************************************!*\
  !*** ../flit/out/watchers/globals.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAllGlobalWatchers = exports.watchUntil = exports.watchOnce = exports.watchImmediately = exports.watch = exports.GlobalWatcherGroup = void 0;
const watcher_group_1 = __webpack_require__(/*! ./watcher-group */ "../flit/out/watchers/watcher-group.js");
/** Global watcher group to watch scattered things that not belongs to a component. */
exports.GlobalWatcherGroup = new watcher_group_1.WatcherGroup(null);
/**
 * Watchs returned value of `fn` and calls `callback` with this value as parameter if the value changed.
 * @param fn The watched function.
 * @param callback Get called after returned value of `fn` may changed.
 */
function watch(fn, callback) {
    return exports.GlobalWatcherGroup.watch(fn, callback);
}
exports.watch = watch;
/**
 * Watchs returned value of `fn` and calls `callback` with this value as parameter if the value changed.
 * Will call `callback` immediately.
 * @param fn The watched function.
 * @param callback Get called after returned value of `fn` may changed.
 */
function watchImmediately(fn, callback) {
    return exports.GlobalWatcherGroup.watchImmediately(fn, callback);
}
exports.watchImmediately = watchImmediately;
/**
 * Watchs returned value of `fn` and calls `callback` with this value as parameter if the value changed.
 * Only calls `callback` for once.
 * @param fn The watched function.
 * @param callback Get called after returned value of `fn` may changed.
 */
function watchOnce(fn, callback) {
    return exports.GlobalWatcherGroup.watchOnce(fn, callback);
}
exports.watchOnce = watchOnce;
/**
 * Watchs returneded values of `fn` and calls `callback` if this value becomes true like.
 * @param fn The watched function.
 * @param callback Get called after returned value of `fn` may changed.
 */
function watchUntil(fn, callback) {
    return exports.GlobalWatcherGroup.watchUntil(fn, callback);
}
exports.watchUntil = watchUntil;
/**
 * Updates all the global watchers registered from `watch...()`.
 * e.g., you may call this after language changes and not automatically detected.
 */
function updateAllGlobalWatchers() {
    exports.GlobalWatcherGroup.update();
}
exports.updateAllGlobalWatchers = updateAllGlobalWatchers;


/***/ }),

/***/ "../flit/out/watchers/index.js":
/*!*************************************!*\
  !*** ../flit/out/watchers/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var watcher_1 = __webpack_require__(/*! ./watcher */ "../flit/out/watchers/watcher.js");
Object.defineProperty(exports, "Watcher", { enumerable: true, get: function () { return watcher_1.Watcher; } });
Object.defineProperty(exports, "LazyWatcher", { enumerable: true, get: function () { return watcher_1.LazyWatcher; } });
var watcher_group_1 = __webpack_require__(/*! ./watcher-group */ "../flit/out/watchers/watcher-group.js");
Object.defineProperty(exports, "WatcherGroup", { enumerable: true, get: function () { return watcher_group_1.WatcherGroup; } });
__exportStar(__webpack_require__(/*! ./globals */ "../flit/out/watchers/globals.js"), exports);


/***/ }),

/***/ "../flit/out/watchers/watcher-group.js":
/*!*********************************************!*\
  !*** ../flit/out/watchers/watcher-group.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherGroup = void 0;
const watcher_1 = __webpack_require__(/*! ./watcher */ "../flit/out/watchers/watcher.js");
/**
 * Used to manage several watchers that binded to a context or as global watchers.
 * From this class, you can easily connect, disconnect, update all the watchers in group.
 */
class WatcherGroup {
    constructor(context) {
        /** All watchers. */
        this.watchers = new Set();
        /** Whether connected. */
        this.connected = true;
        this.context = context;
    }
    /** Add a watcher to current group, and keeps it's connected state same with current group. */
    add(watcher) {
        if (this.connected) {
            watcher.connect();
        }
        else {
            watcher.disconnect();
        }
        this.watchers.add(watcher);
    }
    /** Deleted watcher from current group, will always disconnect the watcher. */
    delete(watcher) {
        if (this.connected) {
            watcher.disconnect();
        }
        this.watchers.delete(watcher);
    }
    /** Connect all the watchers in current group. */
    connect() {
        if (!this.connected) {
            for (let watcher of this.watchers) {
                watcher.connect();
            }
            this.connected = true;
        }
    }
    /** Disonnect all the watchers in current group. */
    disconnect() {
        if (this.connected) {
            for (let watcher of this.watchers) {
                watcher.disconnect();
            }
            this.connected = false;
        }
    }
    /** Update all the watchers in current group. */
    update() {
        if (this.watchers) {
            for (let watcher of this.watchers) {
                watcher.update();
            }
        }
    }
    /** Create a new watcher and add to current group. */
    watch(fn, callback) {
        let watcher = new watcher_1.Watcher(fn, callback, this.context);
        this.add(watcher);
        return () => {
            this.delete(watcher);
        };
    }
    /** Create a new watcher and add to current group, calls `callback` immediately. */
    watchImmediately(fn, callback) {
        let watcher = new watcher_1.Watcher(fn, callback, this.context);
        callback.call(this, watcher.value, undefined);
        this.add(watcher);
        return () => {
            this.delete(watcher);
        };
    }
    /** Create a new watcher and add to current group, only calls `callback` for once. */
    watchOnce(fn, callback) {
        let wrappedCallback = (newValue, oldValue) => {
            callback(newValue, oldValue);
            unwatch();
        };
        let watcher = new watcher_1.Watcher(fn, wrappedCallback, this.context);
        this.add(watcher);
        let unwatch = () => {
            this.delete(watcher);
        };
        return unwatch;
    }
    /** Create a new watcher and add to current group, calls `callback` only when returned value of `fn` be true like. */
    watchUntil(fn, callback) {
        let wrappedCallback = (newValue) => {
            if (newValue) {
                callback(newValue);
                unwatch();
            }
        };
        let unwatch;
        let watcher = new watcher_1.Watcher(fn, wrappedCallback, this.context);
        if (watcher.value) {
            watcher.disconnect();
            callback.call(this, watcher.value);
            unwatch = () => { };
        }
        else {
            this.add(watcher);
            unwatch = () => {
                this.delete(watcher);
            };
        }
        return unwatch;
    }
}
exports.WatcherGroup = WatcherGroup;


/***/ }),

/***/ "../flit/out/watchers/watcher.js":
/*!***************************************!*\
  !*** ../flit/out/watchers/watcher.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyWatcher = exports.Watcher = void 0;
const observer_1 = __webpack_require__(/*! ../observer */ "../flit/out/observer/index.js");
const queue_1 = __webpack_require__(/*! ../queue */ "../flit/out/queue/index.js");
const updatable_queue_1 = __webpack_require__(/*! ../queue/helpers/updatable-queue */ "../flit/out/queue/helpers/updatable-queue.js");
/**
 * A watcher watchs a function returned value and trigger callback if the value is changed.
 * You need to know that when callback was called, it doesn't ensure the watched datas are truly changed,
 * especially the returned value is an object, so you may validate it again if needed.
 * You can create watcher from `context.watch...` or `globalWatcherGroup.watch...`.
 */
class Watcher {
    constructor(fn, callback, context) {
        /** Whether the watcher connected. */
        this.connected = true;
        this.fn = fn;
        this.callback = callback;
        this.context = context;
        this.value = this.getNewValue();
    }
    /** Get a new value from `fn`. */
    getNewValue() {
        observer_1.startUpdating(this);
        let newValue = this.fn.call(null);
        observer_1.endUpdating(this);
        return newValue;
    }
    /** When detected dependencies changed, enqueue to update later. */
    update() {
        if (!this.connected) {
            return;
        }
        queue_1.enqueueUpdatableInOrder(this, this.context, updatable_queue_1.UpdatableUpdateOrder.Watcher);
    }
    /** Update current value immediately, also keeps consitant with the same method in `Component`. */
    __updateImmediately() {
        // Don't update after disconnected, or the watcher will be observed and do meaningless updating.
        if (!this.connected) {
            return;
        }
        let newValue = this.getNewValue();
        // Data may change, doesn't validate object.
        if (newValue !== this.value || typeof newValue === 'object') {
            let oldValue = this.value;
            this.callback.call(null, this.value = newValue, oldValue);
        }
    }
    /** Gives a readable info about the watcher. */
    toString() {
        return this.fn.toString();
    }
    /** Connect and update to collect new dependencies. */
    connect() {
        if (!this.connected) {
            this.connected = true;
            this.update();
        }
    }
    /** Disconnect current watcher with it's denpendencies. */
    disconnect() {
        if (this.connected) {
            this.connected = false;
            observer_1.clearDependenciesOf(this);
        }
    }
}
exports.Watcher = Watcher;
/**
 * Lazy watchers update later than normal watchers and components.
 * So data and nodes are stabled now.
 */
class LazyWatcher extends Watcher {
    update() {
        if (!this.connected) {
            return;
        }
        queue_1.enqueueUpdatableInOrder(this, this.context, updatable_queue_1.UpdatableUpdateOrder.Otherwise);
    }
}
exports.LazyWatcher = LazyWatcher;


/***/ }),

/***/ "./docs/index.ts":
/*!***********************!*\
  !*** ./docs/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ff = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const flit = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const flitUI = __webpack_require__(/*! ../src/index */ "./src/index.ts");
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const index_1 = __webpack_require__(/*! ../src/index */ "./src/index.ts");
window.ff = ff;
window.flit = flit;
window.flitUI = flitUI;
flit_1.define('flit-preview', class extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.checkboxValue = ['2'];
        this.checkboxInterminated = true;
        this.switch1On = true;
        this.switch2On = false;
        this.tagClosed = false;
        this.leftData = flit_1.observe([1, 2, 3]);
        this.rightData = flit_1.observe([4, 5, 6]);
    }
    render() {
        let { lineHeight } = index_1.theme;
        return flit_1.html `
		<div class="wrapper">
			<section class="theme">
				<h2>Theme</h2>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Mode</f-col>
					<f-col .span="20">
						<f-radiogroup .value="light" @@change=${(name) => index_1.theme.assignTheme(name)}>
							<f-radio .value="light" style="margin-right: 20px;">Light</f-radio>
							<f-radio .value="dark" style="margin-right: 20px;">Dark</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Size</f-col>
					<f-col .span="20">
						<f-radiogroup .value="medium" @@change=${(name) => index_1.theme.assignTheme(name)}>
							<f-radio .value="small" style="margin-right: 20px;">Small</f-radio>
							<f-radio .value="medium" style="margin-right: 20px;">Medium</f-radio>
							<f-radio .value="large" style="margin-right: 20px;">Large</f-radio>
							<f-radio .value="touch" style="margin-right: 20px;">Touch</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Main color</f-col>
					<f-col .span="20">
						<f-main-color-select style="width: ${lineHeight * 5}px;" />
					</f-col>
				</f-row>
			</section>


			<h2>Basic Elements</h2>

			<section class="basic">
				<h3>Buttons</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Primary</header>
						<button style="margin: 8px 0;" primary>Button Text</button><br>
						<button style="margin: 8px 0;" primary><f-icon .type="love" /><span>Button Text</span></button><br>
						<button style="margin: 8px 0;" primary><f-icon .type="love" /></button><br>
					</f-col>
					<f-col .span="4">
						<header>Normal</header>
						<button style="margin: 8px 0;">Button Text</button><br>
						<button style="margin: 8px 0;"><span>Button Text</span><f-icon .type="right" /></button><br>
						<button style="margin: 8px 0;"><f-icon .type="love" /></button><br>
					</f-col>
					<f-col .span="4">
						<header>Flat</header>
						<button style="margin: 8px 0;" flat>Button Text</button><br>
						<button style="margin: 8px 0;" flat><f-icon .type="love" /><span>Button Text</span></button><br>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Links</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Primary</header>
						<a href="javascript:void" primary>Link Text</a>
					</f-col>
					<f-col .span="4">
						<header>Normal</header>
						<a href="javascript:void">Link Text</a>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Labels</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Normal</header>
						<label>First Name</label>
					</f-col>
					<f-col .span="4">
						<header>Required</header>
						<label required>Email</label>
					</f-col>
					<f-col .span="4">
						<header>With Info</header>
						<label>
							Last Name
							<f-icon .type="tips" :tooltip="Tips to show guide" />
						</label>
					</f-col>
				</f-row>
			</section>


			<h2>Components</h2>

			<section>
				<h3>Button Group</h3>

				<f-buttongroup style="margin: 8px 0;">
					<button primary>One</button>
					<button>Two</button>
					<button>Three</button>
				</f-buttongroup><br>

				<f-buttongroup style="margin: 8px 0;">
					<button primary><f-icon .type="love" /></button>
					<button><f-icon .type="love" /></button>
					<button><f-icon .type="love" /></button>
				</f-buttongroup><br>
			</section>


			<section>
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<h3>Checkboxes</h3>
						<f-checkboxgroup .value=${this.checkboxValue}>
							<f-checkbox .value="1">${this.checkboxValue.includes('1') ? 'Checked' : 'Unchecked'}</f-checkbox><br>
							<f-checkbox .value="2">${this.checkboxValue.includes('2') ? 'Checked' : 'Unchecked'}</f-checkbox><br>
							<f-checkbox .value="3" .indeterminate=${this.checkboxInterminated} @@change=${() => this.checkboxInterminated = false}>${this.checkboxInterminated ? 'Indeterminate' : this.checkboxValue.includes('3') ? 'Checked' : 'Unchecked'}</f-checkbox><br>
						</f-checkboxgroup>
					</f-col>

					<f-col .span="6">
						<h3>Radios</h3>
						<f-radiogroup .value="1">
							<f-radio .value="1">Radio 1</f-radio><br>
							<f-radio .value="2">Radio 2</f-radio><br>
						</f-radiogroup>
					</f-col>

					<f-col .span="6">
						<h3>Switchs</h3>
						<f-switch style="margin-right: 8px;" :model="switch1On" />Switch 1 ${this.switch1On ? 'On' : 'Off'}<br>
						<f-switch style="margin-right: 8px;" :model="switch2On" />Switch 2 ${this.switch2On ? 'On' : 'Off'}<br>
					</f-col>

					<f-col .span="6">
						<h3>Tags</h3>
						<f-tag>Normal Tag</f-tag><br>
						<f-tag .closable :hide=${this.tagClosed} @@close=${() => this.tagClosed = true}>Closable Tag</f-tag><br>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Inputs</h3>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>Text Input</label><br>
						<f-input .type="text" style="width: 100%;" />
					</f-col>
					<f-col .span="6">
						<label>With Placeholder</label><br>
						<f-input .type="text" style="width: 100%;" .placeholder="With Placeholder" />
					</f-col>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>Valid Input</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${true} .placeholder="Valid Input" />
					</f-col>
					<f-col .span="6">
						<label>Invalid Input</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
					<f-col .span="6">
						<label>Error message in tooltip</label><br>
						<f-input .type="text" style="width: 100%;" .errorInTooltip .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Form</h3>

				<f-form :ref="form">
					<f-row style="margin: 8px 0 24px 0;" .gutter="24">
						<f-col .span="12">
							<label required>Name</label><br>
							<f-input style="width: 100%;" .validator=${(value) => {
            if (value.length === 0) {
                return `The name field is required!`;
            }
            else if (value.length < 10) {
                return `The name field should have at least 10 characters!`;
            }
        }} />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="6">
							<label>Country</label><br>
							<f-select style="width: 100%;" .searchable .data=${[{ value: '1', text: 'Country 1' }, { value: '2', text: 'Country 2' }]} />
						</f-col>

						<f-col .span="6">
							<label>City</label><br>
							<f-select style="width: 100%;" .searchable .data=${[{ value: '1', text: 'City 1' }, { value: '2', text: 'City 2' }]} />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label>Address</label><br>
							<f-input style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label>About</label><br>
							<f-textarea style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 16px 0 10px;" .gutter="24">
						<f-col .span="12" style="text-align: right;">
							<button primary @click=${() => flit_1.getComponent(this.refs.form).validate()}>Save</button>
						</f-col>
					</f-row>
				</f-form>
			</section>


			<section>
				<h3>Selects</h3>
				
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<header>Single Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .data=${range(1, 11).map(value => ({ value, text: 'Option ' + value }))} .value=${1}  />
					</f-col>

					<f-col .span="6">
						<header>Multiple Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .multipleSelect .data=${range(1, 11).map(value => ({ value, text: 'Option ' + value }))} .value=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header>Searchable Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .searchable .data=${range(1, 11).map(value => ({ value, text: 'Option ' + value }))} .value=${1} />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Search Field</h3>
				
				<f-row style="margin: 16px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<f-search style="width: 100%; margin-bottom: 8px;" />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Progress Bars</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-progress style="width: 100%;" .value="0" />
						<f-progress style="width: 100%;" .value="0.5" />
						<f-progress style="width: 100%;" .value="1" />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Sliders</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-slider style="width: 100%;" .value="0" />
						<f-slider style="height: 100px; margin-top: 20px;" .value="50" .vertical />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Loaders</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="4">
						<header style="margin-bottom: 8px;">Small</header>
						<f-loader .size="small" .speed="0.7" />
					</f-col>

					<f-col .span="4">
						<header style="margin-bottom: 8px;">Medium</header>
						<f-loader .size="medium" .speed="0.6" />
					</f-col>

					<f-col .span="4">
						<header style="margin-bottom: 8px;">Large</header>
						<f-loader .size="large" .speed="0.5" />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Lists</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Selection type</header>
						<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Single Selection</header>
						<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} .selectable .selected=${[2]} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Multiple Selection</header>
						<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} .selectable .multipleSelect .selected=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Navigation Type</header>
						<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} .type="navigation" .active=${1} />
					</f-col>
				</f-row>

				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Icon</header>
						<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value, icon: 'love' }))} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Subsection</header>
						<f-list .type="navigation" .data=${[
            { value: 1, text: 'User A', children: [
                    { value: 11, text: 'Folder 1', children: [
                            { value: 111, text: 'Item 1' },
                            { value: 112, text: 'Item 2' },
                        ] },
                    { value: 12, text: 'Folder 2', children: [
                            { value: 121, text: 'Item 1' },
                            { value: 122, text: 'Item 2' },
                        ] }
                ]
            },
            { value: 2, text: 'User B', opened: true, children: [
                    { value: 21, text: 'Folder 1', children: [
                            { value: 211, text: 'Item 1' },
                            { value: 212, text: 'Item 2' },
                        ] },
                    { value: 22, text: 'Folder 2', children: [
                            { value: 221, text: 'Item 1' },
                            { value: 222, text: 'Item 2' },
                        ] }
                ]
            },
        ]} />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Navigations</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-navigation
							.active=${111}
							.title="Navigation Menu"
							.data=${[
            { value: 1, text: 'User A', children: [
                    { value: 11, text: 'Folder 1', children: [
                            { value: 111, text: 'Item 1' },
                            { value: 112, text: 'Item 2' },
                        ] },
                    { value: 12, text: 'Folder 2', children: [
                            { value: 121, text: 'Item 1' },
                            { value: 122, text: 'Item 2' },
                        ] }
                ]
            },
            { value: 2, text: 'User B', opened: true, children: [
                    { value: 21, text: 'Folder 1', children: [
                            { value: 211, text: 'Item 1' },
                            { value: 212, text: 'Item 2' },
                        ] },
                    { value: 22, text: 'Folder 2', children: [
                            { value: 221, text: 'Item 1' },
                            { value: 222, text: 'Item 2' },
                        ] }
                ]
            },
        ]}
						/>
					</f-col>

				</f-row>

			</section>


			<section>
				<h3>Popovers</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button ${index_1.popup(() => flit_1.html `
								<f-popover .title="Popover title">
									This is Popover content.
								</f-popover>
								`, { trigger: 'click' })}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Close Button</header>
						<button ${index_1.popup(() => flit_1.html `
								<f-popover .title="Popover title" .closable>
									This is Popover content.
								</f-popover>
								`, { trigger: 'click' })}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">No Title</header>
						<button ${index_1.popup(() => flit_1.html `
								<f-popover>
									This is Popover content.
								</f-popover>
								`, { trigger: 'click' })}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With actions</header>
						<button ${index_1.popup(() => flit_1.html `
								<f-popover
									:ref="popupWithActions"
									.title="Popover title" 
								>
									This is Popover content.
									<button :slot="action" @click=${() => flit_1.getComponent(this.refs.popupWithActions).close()}>Cancel</button>
									<button :slot="action" primary @click=${() => flit_1.getComponent(this.refs.popupWithActions).close()}>Save</button>
								</f-popover>
								`, { trigger: 'click' })}>Click to Open Popover</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Menus</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<button ${index_1.popup(() => flit_1.html `
								<f-menu>
									<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} />
								</f-menu>
								`, { trigger: 'click' })}>
							<span>Click to Open Menu</span>
							<f-icon .type="down" />
						</button>
					</f-col>

					<f-col .span="6">
						<button ${index_1.popup(() => flit_1.html `
								<f-menu .title="Menu title">
									<f-list .data=${range(1, 6).map(value => ({ value, text: 'Option ' + value }))} .selectable .selected=${[1]} />
								</f-menu>
								`, { trigger: 'click' })}>
							<span>Menu with Title</span>
							<f-icon .type="down" />
						</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Tooltips</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button ${index_1.tooltip('Tooltip text', { type: 'default' })}>Hover for Tooltip</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Prompt</header>
						<button ${index_1.tooltip('Add some items to your list by clicking this button.', { type: 'prompt' })}>Add Items</button>
					</f-col>
				</f-row>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Error</header>
						<button primary disabled ${index_1.tooltip('You can\'t submit, try resolve all mistakes then this tooltip will disappear.', { type: 'error' })}>Submit</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Notifications</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Info</header>
						<button @click=${() => index_1.notification.info('Info notification content', { title: 'Info Notification' })}>
							Show Info Notification
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Warn</header>
						<button @click=${() => index_1.notification.warn('Warning notification content', { title: 'Warning Notification' })}>
							Show Warn Notification
						</button>
					</f-col>
					
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Error</header>
						<button @click=${() => index_1.notification.error('Error notification content', { title: 'Error Notification' })}>
							Show Error Notification
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Success</header>
						<button @click=${() => index_1.notification.success('Success notification content', { title: 'Success Notification' })}>
							Show Success Notification
						</button>
					</f-col>
				</f-row>

				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Without Title</header>
						<button @click=${() => index_1.notification.success('Success notification content', {
            title: 'Success Notification',
        })}>
							Show Notification with title
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With List</header>
						<button @click=${() => index_1.notification.warn('Warning notification content', {
            title: 'Warning Notification',
            list: ['List Item 1', 'List Item 2']
        })}>
							Show Notification with List
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Actions</header>
						<button @click=${() => index_1.notification.error('Error notification content', {
            title: 'Error Notification',
            actions: [{ text: 'Try Again' }]
        })}>
							Show Notification with Actions
						</button>
					</f-col>

				</f-row>
			</section>


			<section>
				<h3>Dialogs</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button @click=${() => index_1.dialog.show('This is dialog message.')}>
							Open Default Dialog
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Title</header>
						<button @click=${() => index_1.dialog.show('This is dialog message.', { title: 'Dialog Title' })}>
							Open Dialog with Title
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Confirm</header>
						<button @click=${() => index_1.dialog.confirm('Are you sure you want to delete these items?', { title: 'Dialog Title' })}>
							Open Confirm Dialog
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Prompt</header>
						<button @click=${() => index_1.dialog.prompt('Please input the name of your account:', {
            title: 'Dialog Title',
            placeholder: 'Name of your account',
            validator: (value) => { if (!value) {
                return 'Name is required';
            }
            else {
                return null;
            } }
        })}>
							Open Prompt Dialog
						</button>
					</f-col>
				</f-row>
				
				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Third action</header>
						<button @click=${() => index_1.dialog.confirm('You have unsaved data, are you sure you want to save your changes?', {
            title: 'Dialog Title',
            actions: [
                { text: 'Don\'t Save', third: true },
                { text: 'Cancel' },
                { text: 'Save', primary: true },
            ]
        })}>
							Open Dialog with Third Action
						</button>
					</f-col>
					
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Customize</header>
						<button @click=${() => {
            let input;
            index_1.dialog.show(flit_1.html `
										Please input the name of your account:
										<f-input style="margin-top: 8px; width: 100%;"
											.placeholder="Name of your account"
											.validator=${(v) => v ? '' : 'Name field is required'}
											.errorInTooltip
											:ref=${async (el) => input = await flit_1.getComponentAsync(el)}
										/>
										<f-checkbox .checked style="margin-top: 8px;">Remember Me</f-checkbox>
									`, {
                title: 'Dialog Title',
                interruptAction: () => !input.valid
            });
        }}>
							Open Custom Dialog
						</button>
					</f-col>
				</f-row>

			</section>


			<section>
				<h3>Modals</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>

						<button @click="${() => {
            let modal = flit_1.getRenderedAsComponent(flit_1.render(flit_1.html `
								<f-modal style="width: ${index_1.theme.adjust(360)}px;" .title="Modal Title">
									This is modal content
								</f-modal>
							`));
            modal.show();
        }}">
							Open Modal
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Actions</header>

						<button @click="${() => {
            let modal = flit_1.getRenderedAsComponent(flit_1.render(flit_1.html `
								<f-modal style="width: ${index_1.theme.adjust(360)}px;" .title="Modal Title">
									This is modal content
									<button :slot="action" @click=${() => modal.hide()}>Cancel</button>
									<button :slot="action" primary @click=${() => modal.hide()}>Save</button>
								</f-modal>
							`));
            modal.show();
        }}">
							Open Modal with Actions
						</button>
					</f-col>
				</f-row>

			</section>


			<section>
				<h3>Table</h3>

				<f-table
					.resizable
					.store=${new index_1.Store({
            data: range(1, 101).map(n => ({ id: n, value: Math.round(Math.random() * 100) })),
            key: 'id',
        })}
					.columns=${[
            {
                title: 'Index',
                render: (_item, index) => {
                    return index;
                },
            },
            {
                title: 'ID',
                orderBy: 'id',
                render: (item) => item.id,
            },
            {
                title: 'Name',
                render: (item) => `Name ${item.id}`,
            },
            {
                title: 'Random Value',
                orderBy: 'value',
                render: (item) => item.value,
                align: 'right',
            }
        ]}
				/>
			</section>

			
			<section>
				<h3>Table in Live Rendering Mode</h3>

				<f-table
					style="height: 204px;"
					.resizable
					.live
					.renderCount="20"
					.store=${new index_1.Store({
            data: range(1, 1001).map(n => ({ id: n, value: Math.round(Math.random() * 100) })),
            key: 'id',
        })}
					.columns=${[
            {
                title: 'Index',
                render: (_item, index) => {
                    return index;
                },
            },
            {
                title: 'ID',
                orderBy: 'id',
                render: (item) => item.id,
            },
            {
                title: 'Name',
                render: (item) => `Name ${item.id}`,
            },
            {
                title: 'Random Value',
                orderBy: 'value',
                render: (item) => item.value,
                align: 'right',
            }
        ]}
				/>
			</section>

			
			<section>
				<h3>Table with Remote Data</h3>

				<f-table
					.resizable
					.renderCount="20"
					.store=${new ExampleRemoteStore()}
					.columns=${[
            {
                title: 'Index',
                render: (_item, index) => {
                    return index;
                },
            },
            {
                title: 'ID',
                orderBy: 'id',
                render: (item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.id) !== null && _a !== void 0 ? _a : '--'; },
            },
            {
                title: 'Name',
                render: (item) => item ? `Name ${item.id}` : '--',
            },
            {
                title: 'Random Value',
                orderBy: 'value',
                render: (item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.value) !== null && _a !== void 0 ? _a : '--'; },
                align: 'right',
            }
        ]}
				/>
			</section>


			<section>
				<h3>Drag & Drop</h3>

				<div style="display: inline-flex; padding: 4px; background: ${index_1.theme.backgroundColor.toMiddle(5)}; line-height: 100px; font-size: 60px; text-align: center; height: 116px;"
					${index_1.droppable((value, index) => {
            ff.remove(this.leftData, value);
            ff.remove(this.rightData, value);
            if (index === -1) {
                this.leftData.push(value);
            }
            else {
                this.leftData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(this.leftData, (data, index) => flit_1.html `
						<div style="width: 100px; margin: 4px;"
							:style.background=${index_1.theme.backgroundColor.toMiddle(15).toString()}
							${index_1.draggable(data, index)}
						>${data}</div>
					`)}
				</div>
				<br>

				<div style="display: inline-flex; padding: 4px; margin-top: -8px; background: ${index_1.theme.backgroundColor.toMiddle(5)}; line-height: 100px; font-size: 60px; text-align: center; height: 116px;"
					${index_1.droppable((value, index) => {
            ff.remove(this.leftData, value);
            ff.remove(this.rightData, value);
            if (index === -1) {
                this.rightData.push(value);
            }
            else {
                this.rightData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(this.rightData, (data, index) => flit_1.html `
						<div style="width: 100px; margin: 4px;"
							:style.background=${index_1.theme.backgroundColor.toMiddle(15).toString()}
							${index_1.draggable(data, index)}
						>${data}</div>
					`)}
				</div>
			</section>


			<section>
				<h3>Resizer</h3>

				<div style="position: relative; display: inline-flex; justify-content: center; line-height: 100px; font-size: 14px; text-align: center; width: 200px; height: 100px;"
					:style.background=${index_1.theme.backgroundColor.toMiddle(5).toString()}
				>
					Resizer on the Right
					<f-resizer .position="right" .min=${200} .max=${600} style="background: ${index_1.theme.backgroundColor.toMiddle(15)}"></f-resizer>
				</div>
				<br>
			</section>

		</div>
	`;
    }
});
flit_1.define('f-main-color-select', class extends index_1.Select {
    constructor() {
        super(...arguments);
        this.value = '#3a6cf6';
        this.data = [
            { value: '#3a6cf6', text: flit_1.html `<div style="color: #3a6cf6;">Blue</div>` },
            { value: '#48c7c7', text: flit_1.html `<div style="color: #48c7c7;">Cyan</div>` },
            { value: '#0077cf', text: flit_1.html `<div style="color: #0077cf;">Darkblue</div>` },
            { value: '#4eb2ea', text: flit_1.html `<div style="color: #4eb2ea;">Skyblue</div>` },
            { value: '#be66cc', text: flit_1.html `<div style="color: #be66cc;">Purple</div>` },
            { value: '#ff6666', text: flit_1.html `<div style="color: #ff6666;">Red</div>` },
            { value: '#ff8095', text: flit_1.html `<div style="color: #ff8095;">Pink</div>` },
            { value: '#d65c5c', text: flit_1.html `<div style="color: #d65c5c;">Brown</div>` },
            { value: '#f67d51', text: flit_1.html `<div style="color: #f67d51;">Orange</div>` },
            { value: '#15af78', text: flit_1.html `<div style="color: #15af78;">Green</div>` },
            { value: '#888888', text: flit_1.html `<div style="color: #888888;">Grey</div>` },
            { value: '#000000', text: flit_1.html `<div style="color: #000000;">Black</div>` },
        ];
    }
    onReady() {
        super.onReady();
        this.on('change', (value) => {
            index_1.theme.set('mainColor', value);
        });
    }
});
function range(start, end) {
    let data = [];
    for (let i = start; i < end; i++) {
        data.push(i);
    }
    return data;
}
class ExampleRemoteStore extends index_1.RemoteStore {
    constructor() {
        super({
            pageSize: 20,
            preloadPageCount: 0,
        });
        this.key = 'id';
    }
    dataCount() {
        return 1000;
    }
    async dataGetter(start, end) {
        await ff.sleep(500);
        return range(start, end).map(v => ({ id: v + 1, value: Math.round(Math.random() * 100) }));
    }
}


/***/ }),

/***/ "./src/bindings/contextmenu.ts":
/*!*************************************!*\
  !*** ./src/bindings/contextmenu.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.contextmenu = exports.ContextMenuBinding = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
/**
 * `:contextmenu` binding pops-up a contextmenu when right click binded element.
 *
 * `:contextmenu=${() => contextmenuComponent}`
 */
class ContextMenuBinding {
    constructor(el, context) {
        this.popup = null;
        this.unwatchRect = null;
        this.unlockEl = null;
        this.el = el;
        this.context = context;
        flit_1.on(this.el, 'contextmenu.prevent', this.showContextMenu, this);
    }
    update(renderFn) {
        this.renderFn = renderFn;
    }
    async showContextMenu(e) {
        this.renderPopup();
        let popup = this.popup;
        await flit_1.untilRenderComplete();
        // Align and get focus.
        ff_1.alignToEvent(popup.el, e);
        popup.el.focus();
        // Makesure mouse enter to submenu doesn't cause current contextmenu hidden.
        ff_1.MouseLeave.lock(this.el, popup.el);
        // Play enter transition.
        new flit_1.Transition(popup.el, { name: 'fade' }).enter();
        // Register events to show or hide.
        flit_1.on(document, 'mousedown', this.onDocMouseDown, this);
        flit_1.once(popup.el, 'click', this.hideContextMenu, this);
        // Watch layout and re-render if layout changed.
        this.unwatchRect = ff_1.watchLayout(this.el, 'rect', this.onElRectChanged.bind(this));
    }
    renderPopup() {
        if (!this.popup) {
            this.popup = flit_1.getRenderedAsComponent(flit_1.renderUpdatable(this.renderFn, this.context).template);
        }
        this.popup.applyAppendTo();
    }
    onDocMouseDown(e) {
        let target = e.target;
        // If mouse down at document but not popup.
        if (this.popup && !this.popup.el.contains(target)) {
            this.hideContextMenu();
        }
    }
    hideContextMenu() {
        if (this.popup) {
            ff_1.MouseLeave.unlock(this.el, this.popup.el);
            flit_1.off(document, 'mousedown', this.onDocMouseDown, this);
            flit_1.off(this.popup.el, 'click', this.hideContextMenu, this);
            new flit_1.Transition(this.popup.el, { name: 'fade' }).leave().then((finish) => {
                if (finish) {
                    this.onLeaveTransitionEnd();
                }
            });
        }
        // Not keep visible, may hide immediately.
        if (this.unlockEl) {
            this.unlockEl();
            this.unlockEl = null;
        }
        if (this.unwatchRect) {
            this.unwatchRect();
            this.unwatchRect = null;
        }
    }
    onLeaveTransitionEnd() {
        if (this.popup) {
            this.popup.el.remove();
            this.popup = null;
        }
    }
    onElRectChanged() {
        this.hideContextMenu();
    }
    remove() {
        flit_1.off(this.el, 'contextmenu', this.showContextMenu, this);
    }
}
exports.ContextMenuBinding = ContextMenuBinding;
/**
 * Pops-up a contextmenu when right click binded element.
 * @param renderFn Should return a `<f-contextmenu />` type template result.
 */
exports.contextmenu = flit_1.defineBinding('contextmenu', ContextMenuBinding);


/***/ }),

/***/ "./src/bindings/drag-drop.ts":
/*!***********************************!*\
  !*** ./src/bindings/drag-drop.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.droppable = exports.DroppableBinding = exports.draggable = exports.DraggableBinding = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
class DraggableBinding {
    constructor(el) {
        /** Can drop to droppable only when name match. */
        this.name = '';
        /** Data can be passed to droppable. */
        this.data = null;
        /** Data index. */
        this.index = -1;
        this.el = el;
        // To avoid image dragging handled be HTML5 drag & drop
        this.el.setAttribute('draggable', 'false');
        this.el.style.cursor = 'grab';
        flit_1.on(this.el, 'mousedown', this.onMouseDown, this);
        flit_1.on(this.el, 'mouseenter', this.onMouseEnter, this);
    }
    update(data, index, options = {}) {
        this.data = data;
        this.index = index;
        this.name = options.name || '';
    }
    onMouseDown(e) {
        e.preventDefault();
        let isDragging = false;
        let startX = e.clientX;
        let startY = e.clientY;
        let onMouseMove = (e) => {
            if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
                manager.startDragging(this);
                isDragging = true;
            }
            if (isDragging) {
                let moveX = e.clientX - startX;
                let moveY = e.clientY - startY;
                manager.translateDraggingElement(moveX, moveY);
            }
        };
        let onMouseUp = async () => {
            flit_1.off(document, 'mousemove', onMouseMove);
            if (isDragging) {
                manager.endDragging();
            }
        };
        flit_1.on(document, 'mousemove', onMouseMove);
        flit_1.once(document, 'mouseup', onMouseUp);
    }
    onMouseEnter() {
        manager.enterDraggable(this);
    }
    remove() {
        flit_1.off(this.el, 'mousedown', this.onMouseDown, this);
        flit_1.off(this.el, 'mouseenter', this.onMouseEnter, this);
    }
}
exports.DraggableBinding = DraggableBinding;
/**
 * Make current element draggable.
 * @param data Data can be passed to same name droppable.
 * @param index Data index.
 * @param options Draggable options.
 */
exports.draggable = flit_1.defineBinding('draggable', DraggableBinding);
class DroppableBinding {
    constructor(el) {
        /** Allows draggable drop only when name match. */
        this.name = '';
        this.onenter = null;
        this.onleave = null;
        this.el = el;
        flit_1.on(this.el, 'mouseenter', this.onMouseEnter, this);
    }
    update(ondrop, options = {}) {
        this.ondrop = ondrop;
        this.name = options.name || '';
        this.onenter = options.onenter || null;
        this.onleave = options.onleave || null;
    }
    onMouseEnter() {
        manager.enterDroppable(this);
        flit_1.once(this.el, 'mouseleave', this.onMouseLeave, this);
    }
    /** Triggers dragging element enter current droppable. */
    emitEnter(dragging) {
        if (this.onenter) {
            this.onenter(dragging.data, dragging.index);
        }
    }
    onMouseLeave() {
        manager.leaveDroppable(this);
    }
    /** Triggers dragging element leave current droppable. */
    emitLeave(dragging) {
        if (this.onleave) {
            this.onleave(dragging.data, dragging.index);
        }
    }
    /** Triggers dragging element drop to current droppable. */
    emitDrop(dragging, index) {
        if (this.ondrop) {
            this.ondrop(dragging.data, index);
        }
    }
    remove() {
        flit_1.off(this.el, 'mouseenter', this.onMouseEnter, this);
    }
}
exports.DroppableBinding = DroppableBinding;
/**
 * Make current element droppable.
 * @param data Data can be passed to same name droppable.
 * @param index Data index.
 * @param options Droppable options.
 */
exports.droppable = flit_1.defineBinding('droppable', DroppableBinding);
/**
 * Global manager to relate current dragging and it's droppable.
 *   When start dragging, check it's related drop area.
 *   When dragging element enters another draggable element, relate them and adjust position using `mover`.
 *   When dragging element enters one drop area, give additional space for it.
 *   When dragging element leaves one drop area, remove space that belongs to it.
 */
class DragDropRelationshipManager {
    constructor() {
        this.dragging = null;
        this.mover = null;
        /**
         * May mouse enter in several drop areas, and start dragging,
         * then we need to check which drop area should trigger enter.
         */
        this.enterDrops = new Set();
        /** Current drop area. */
        this.activeDropArea = null;
    }
    /** When start dragging a draggable. */
    startDragging(dragging) {
        this.dragging = dragging;
        let activeDropArea;
        for (let drop of [...this.enterDrops]) {
            // May element was removed.
            if (!document.contains(drop.el)) {
                this.enterDrops.delete(drop);
            }
            else if (drop.name === dragging.name) {
                activeDropArea = drop;
                break;
            }
        }
        if (!activeDropArea) {
            throw new Error(`Element with ':draggable' must be contained in a ':droppable' elemenet`);
        }
        activeDropArea.emitEnter(this.dragging);
        this.activeDropArea = activeDropArea;
        this.mover = new Mover(this.dragging, activeDropArea);
    }
    /** Translate dragging element to keep follows with mouse. */
    translateDraggingElement(x, y) {
        if (this.mover) {
            this.mover.translateDraggingElement(x, y);
        }
    }
    /** When dragging and enter a draggable. */
    enterDraggable(drag) {
        if (this.canSwapWith(drag) && this.mover) {
            this.mover.onEnterDraggable(drag);
        }
    }
    /** Whether dragging can swap with draggable. */
    canSwapWith(drag) {
        return this.dragging && this.dragging.name === drag.name && this.dragging !== drag;
    }
    /** When dragging and enter a droppable. */
    enterDroppable(drop) {
        this.enterDrops.add(drop);
        if (this.canDropTo(drop)) {
            drop.emitEnter(this.dragging);
            this.activeDropArea = drop;
            this.mover.onEnterDroppable(drop);
        }
    }
    /** Whether dragging can drop to a droppable. */
    canDropTo(droppable) {
        return this.dragging && this.dragging.name === droppable.name;
    }
    /** When dragging and leave a droppable. */
    leaveDroppable(drop) {
        this.enterDrops.delete(drop);
        if (this.activeDropArea === drop) {
            drop.emitLeave(this.dragging);
            this.activeDropArea = null;
            this.mover.onLeaveDroppable(drop);
        }
    }
    /** When release dragging. */
    endDragging() {
        let mover = this.mover;
        let dragging = this.dragging;
        let lastActiveDroppable = this.activeDropArea;
        mover.playEndDraggingAnimation().then(() => {
            if (mover.willSwapElements()) {
                lastActiveDroppable.emitDrop(dragging, mover.getSwapIndex());
            }
        });
        this.dragging = null;
        this.mover = null;
        this.activeDropArea = null;
    }
}
const manager = new DragDropRelationshipManager();
/**
 * To handle dragging movements, includes:
 *   When moved out of the droppable it's inside: All elements below moved up
 *   When moved in a new droppable: Add a padding as space to contain
 *   When moved between silbings: Moving items betweens them up or down, include the mouse enter sibling.
 *   When moved into a already moved sibling: Fallback movements that not betweens them, include the mouse enter sibling.
 */
class Mover {
    constructor(drag, drop) {
        /** Dragging element translate. */
        this.translate = [0, 0];
        /** Keeps orignal style text for dragging element and restore it after end dragging. */
        this.startStyleText = '';
        /** Elements that moves to right (never moves to left) in visually, compare to their auto layout position. */
        this.movedElements = new Set();
        /** Elements that were actually translated, different with `movedElements` depends on `autoLayout`. */
        this.translatedElements = new Set();
        /** Dragging element siblings align direction. */
        this.direction = 'y';
        /** Currently mouse entered draggable. */
        this.dragTo = null;
        /** Rect of `dragTo`. */
        this.dragToRect = null;
        /** Indicates the index of where to insert dragging element in the current drop area if drop right now. */
        this.dragToIndex = -1;
        /**
         * Currently mouse entered drop area.
         * Term `droppable` is a little hard to understand, so use `drop area` instead.
         */
        this.activeDropArea = null;
        this.dragging = drag;
        this.el = drag.el;
        this.startDropArea = this.activeDropArea = drop;
        this.rect = ff_1.getRect(this.el);
        this.autoLayout = ff_1.getStyleValue(this.el, 'position') !== 'absolute';
        // Didn't consider about margin collapse.
        this.outerWidth = ff_1.getOuterWidth(this.el);
        this.outerHeight = ff_1.getOuterHeight(this.el);
        this.initializeDirection();
        this.initializePlaceholder();
        this.insertPlaceholder(drop, false);
        this.startStyleText = this.el.style.cssText;
        this.setStartDraggingStyle();
    }
    initializeDirection() {
        if (this.el.nextElementSibling || this.el.previousElementSibling) {
            let nextRect = ff_1.getRect(this.el.nextElementSibling || this.el.previousElementSibling);
            if (Math.abs(nextRect.left - this.rect.left) > Math.abs(nextRect.top - this.rect.top)) {
                this.direction = 'x';
            }
            else {
                this.direction = 'y';
            }
        }
    }
    /** Set dragging style for dragging element. */
    setStartDraggingStyle() {
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        this.el.style.position = 'fixed';
        this.el.style.zIndex = '9999';
        this.el.style.width = this.rect.width + 'px';
        this.el.style.height = this.rect.height + 'px';
        this.el.style.left = this.rect.left + 'px';
        this.el.style.top = this.rect.top + 'px';
        this.el.style.boxShadow = `0 0 ${theme_1.theme.popupShadowBlurRadius}px #888`;
        this.el.style.pointerEvents = 'none';
        this.el.style.opacity = '1';
        this.el.style.willChange = 'transform';
    }
    /** Create a placeholder having same size with dragging element and insert into drop element. */
    initializePlaceholder() {
        this.placeholder = this.dragging.el.cloneNode();
        this.placeholder.style.visibility = 'hidden';
        if (this.direction === 'x') {
            this.placeholder.style.width = this.rect.width + 'px';
        }
        else {
            this.placeholder.style.height = this.rect.height + 'px';
        }
    }
    insertPlaceholder(drop, playAnimation) {
        let isDraggingInStartArea = this.startDropArea === drop;
        if (isDraggingInStartArea) {
            for (let el of this.getSiblingsAfter(this.el)) {
                this.moveElement(el, 1, playAnimation);
            }
        }
        drop.el.append(this.placeholder);
    }
    /** Get sibling elements after `fromEl`. */
    getSiblingsAfter(fromEl) {
        let els = [];
        for (let el = fromEl.nextElementSibling; el; el = el.nextElementSibling) {
            els.push(el);
        }
        return els;
    }
    /**
     * Moves one element based on a move direction to giver space for dragging item.
     * @param moveDirection `1` to move right, `0` to keep still.
     */
    moveElement(el, moveDirection, playAnimation) {
        if (el === this.el) {
            return;
        }
        let movePx = this.direction === 'x' ? this.outerWidth : this.outerHeight;
        let translateDirection = moveDirection;
        // in not in `autoLayout` mode, element will not affect the position of it's followed sibling elements,
        // So we make `moveDirection` -= 1 to keep balance.
        //   0: No translate needed.
        //  -1: Translate to left to fix empty after dragging element removed.
        if (!this.autoLayout && this.el.compareDocumentPosition(el) === el.DOCUMENT_POSITION_FOLLOWING) {
            translateDirection -= 1;
        }
        let transform = translateDirection !== 0
            ? `translate${this.direction.toUpperCase()}(${translateDirection * movePx}px)`
            : '';
        if (playAnimation) {
            ff_1.animateTo(el, { transform });
        }
        else {
            el.style.transform = transform;
        }
        if (moveDirection) {
            this.movedElements.add(el);
        }
        else {
            this.movedElements.delete(el);
        }
        if (translateDirection) {
            this.translatedElements.add(el);
        }
        else {
            this.translatedElements.delete(el);
        }
    }
    /** When mouse enter droppable. */
    onEnterDroppable(drop) {
        this.insertPlaceholder(drop, true);
        this.activeDropArea = drop;
    }
    /** When mouse enter draggable. */
    onEnterDraggable(dragTo) {
        if (!this.activeDropArea) {
            return;
        }
        // May cause enter or leave events triggered acciedently if is playing animation.
        if (ff_1.isPlayingAnimation(dragTo.el)) {
            return;
        }
        let willMoveElements = new Set([dragTo.el, ...this.getSiblingsAfter(dragTo.el)]);
        willMoveElements.delete(this.el);
        // When the dragged into element has been moved, dragged into it again means that it's movement will be restored.
        if (this.movedElements.has(dragTo.el)) {
            willMoveElements.delete(dragTo.el);
        }
        // Keeps position.
        for (let el of this.movedElements) {
            if (!willMoveElements.has(el)) {
                this.moveElement(el, 0, true);
            }
        }
        // Moves right.
        for (let el of willMoveElements) {
            if (!this.movedElements.has(el)) {
                this.moveElement(el, 1, true);
            }
        }
        this.dragTo = dragTo;
        this.dragToRect = ff_1.getRect(dragTo.el);
        this.dragToIndex = this.generateDraggedToIndex(dragTo, willMoveElements.has(dragTo.el));
    }
    generateDraggedToIndex(drag, beenMoved) {
        let isInSameDropArea = this.startDropArea === this.activeDropArea;
        let index = drag.index;
        // Assume we have:
        //	 group 1: 1 2 3
        //   group 2: 4 5 6
        if (isInSameDropArea) {
            // Drag 1 into 3
            if (index > this.dragging.index) {
                if (beenMoved) {
                    // 2 [1] 3, returns index 3 - 1
                    return index - 1;
                }
                else {
                    // 2 3 [1], returns index 3
                    return index;
                }
            }
            // Drag 3 into 1
            else {
                if (beenMoved) {
                    // [3] 1 2, returns index 1
                    return index;
                }
                else {
                    // 1 [3] 2, returns index 1 + 1
                    return index + 1;
                }
            }
        }
        // Drag 1 into 4
        else {
            if (beenMoved) {
                return index; // [1] 4 5 6, returns index of 4
            }
            else {
                return index + 1; // 4 [1] 5 6, returns index of 4 + 1
            }
        }
    }
    /** Translate dragging element. */
    translateDraggingElement(x, y) {
        this.translate[0] = x;
        this.translate[1] = y;
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }
    /** Whether drag & drop completed and will swap elements. */
    willSwapElements() {
        return !!(this.dragTo || this.activeDropArea && this.startDropArea !== this.activeDropArea);
    }
    /** Returns the index of inserting index into drop area. */
    getSwapIndex() {
        return this.dragToIndex;
    }
    /** When mouse leaves drop area. */
    onLeaveDroppable(drop) {
        if (drop !== this.activeDropArea) {
            return;
        }
        for (let el of this.movedElements) {
            this.moveElement(el, 0, true);
        }
        this.activeDropArea = null;
        this.dragTo = null;
        this.dragToRect = null;
        this.dragToIndex = -1;
    }
    /** Play drag end end transition. */
    async playEndDraggingAnimation() {
        // Animate dragging elemenet to drop area.
        if (this.willSwapElements()) {
            await this.animateDraggingElementToDropArea();
            this.el.style.transform = '';
        }
        // Animate dragging elemenet to it's original position.
        else {
            // When moves dragging element outside.
            if (this.activeDropArea !== this.startDropArea) {
                this.moveSiblingsToGiveSpace(true);
            }
            await ff_1.animateTo(this.el, { transform: '' });
        }
        this.restoreMovedElements(false);
        this.clearDraggingStyle();
    }
    /** Animate dragging elemenet to where it dropped. */
    async animateDraggingElementToDropArea() {
        let fromRect = ff_1.getRect(this.el);
        let toRect = this.dragToRect || ff_1.getRect(this.placeholder);
        let x = toRect.left - fromRect.left + this.translate[0];
        let y = toRect.top - fromRect.top + this.translate[1];
        if (this.direction === 'x') {
            // Move from left to right, align at right.
            if (this.dragging.index < this.dragToIndex) {
                x = toRect.right - fromRect.right + this.translate[0];
            }
        }
        else {
            // Move from top to bottom, align at bottom.
            if (this.dragging.index < this.dragToIndex) {
                y = toRect.bottom - fromRect.bottom + this.translate[1];
            }
        }
        let transform = `translate(${x}px, ${y}px)`;
        await ff_1.animateTo(this.el, { transform });
    }
    /** Move next silbling elements to give space for dragging elemenet. */
    moveSiblingsToGiveSpace(playAnimation) {
        for (let el of this.getSiblingsAfter(this.el)) {
            this.moveElement(el, 1, playAnimation);
        }
    }
    /** Restore all moved and also translated elements. */
    restoreMovedElements(playAnimation) {
        for (let el of this.translatedElements) {
            if (playAnimation) {
                ff_1.animateTo(el, { transform: '' });
            }
            else {
                ff_1.stopAnimation(el);
                el.style.transform = '';
            }
        }
        // Set a new set would be faster, but it's not performance sensitive here.
        this.movedElements.clear();
        this.translatedElements.clear();
        this.placeholder.remove();
    }
    /** Clear dragging style for dragging element. */
    clearDraggingStyle() {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        this.el.style.cssText = this.startStyleText;
    }
}


/***/ }),

/***/ "./src/bindings/goto.ts":
/*!******************************!*\
  !*** ./src/bindings/goto.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestRouter = exports.recirectTo = exports.RedirectToBinding = exports.goTo = exports.GotoBinding = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const popup_1 = __webpack_require__(/*! ../components/popup */ "./src/components/popup.ts");
const router_1 = __webpack_require__(/*! ../components/router */ "./src/components/router.ts");
/**
 * A `:goto` binding will goto a target location path after clicking binded element.
 *
 * `:goto="relativeURL"`
 * `:goto=${relativeURL}`
 */
class GotoBinding {
    constructor(el) {
        this.router = null;
        this.value = '';
        this.asPopupPath = false;
        this.el = el;
        flit_1.on(this.el, 'click', this.onClick, this);
    }
    update(value, options = {}) {
        var _a, _b;
        this.value = value;
        this.asPopupPath = (_a = options.asPopupPath) !== null && _a !== void 0 ? _a : false;
        this.router = (_b = options.router) !== null && _b !== void 0 ? _b : null;
    }
    onClick() {
        this.ensureRouter();
        this.router.goto(this.value, this.asPopupPath);
    }
    ensureRouter() {
        if (!this.router) {
            this.router = getClosestRouter(this.el.parentElement);
            if (!this.router) {
                throw new Error(`":goto" must be contained in a extended component of "Router"`);
            }
        }
    }
    remove() { }
}
exports.GotoBinding = GotoBinding;
/**
 * A `goto` binding will goto a target location path after clicking binded element.
 *
 * `goto(path)`
 * `goto(path, asPopupPath)`
 */
exports.goTo = flit_1.defineBinding('goto', GotoBinding);
class RedirectToBinding extends GotoBinding {
    onClick() {
        this.ensureRouter();
        this.router.redirectTo(this.value, this.asPopupPath);
    }
}
exports.RedirectToBinding = RedirectToBinding;
/**
 * A `recirectTo` binding will redirect a target location path after clicking binded element.
 *
 * `recirectTo(path)`
 * `recirectTo(path, asPopupPath)`
 */
exports.recirectTo = flit_1.defineBinding('redirectTo', GotoBinding);
/** Get closest router by walking ancestor element. */
function getClosestRouter(el) {
    let parent = el;
    while (parent && parent instanceof HTMLElement) {
        if (parent.localName.includes('-')) {
            let com = flit_1.getComponent(parent);
            if (com instanceof router_1.Router) {
                return com;
            }
            else if (com instanceof popup_1.Popup) {
                parent = com.getTriggerElement();
            }
            else {
                parent = parent.parentElement;
            }
        }
        else {
            parent = parent.parentElement;
        }
    }
    return null;
}
exports.getClosestRouter = getClosestRouter;


/***/ }),

/***/ "./src/bindings/loading.ts":
/*!*********************************!*\
  !*** ./src/bindings/loading.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loading = exports.LoadingBinging = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const DefaultLoadingOptions = {
    size: 'medium',
    transition: { name: 'fade' },
};
/**
 * A `:loading` binding will show a loader and cover current element.
 *
 * `:loading=${isLoading}`
 */
class LoadingBinging {
    constructor(el) {
        this.options = new flit_1.UpdatableOptions(DefaultLoadingOptions);
        this.value = false;
        this.cover = null;
        this.el = el;
    }
    update(value, options) {
        this.value = value;
        this.options.update(options);
        let transition = this.options.get('transition');
        if (this.value) {
            if (this.cover) {
                if (transition) {
                    new flit_1.Transition(this.cover, transition).leave().then(finish => {
                        if (finish) {
                            this.cover.remove();
                            this.cover = null;
                        }
                    });
                }
                else {
                    this.cover.remove();
                    this.cover = null;
                }
            }
        }
        else {
            if (!this.cover) {
                this.cover = flit_1.render(flit_1.html `<f-loader .size=${this.options.get('size')} .asCover />`).getFirstElement();
                this.el.append(this.cover);
            }
            if (transition) {
                new flit_1.Transition(this.cover, transition).enter();
            }
        }
    }
    remove() {
        if (this.cover) {
            this.cover.remove();
        }
    }
}
exports.LoadingBinging = LoadingBinging;
/**
 * Shows a loader and cover current element.
 * @param value Whether shows loader.
 * @param options Options, `{size: small | medium | large, transition: {...}}`.
 */
exports.loading = flit_1.defineBinding('loading', LoadingBinging);


/***/ }),

/***/ "./src/bindings/popup.ts":
/*!*******************************!*\
  !*** ./src/bindings/popup.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.popup = exports.PopupBinding = exports.DefaultPopupOptions = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
/** Default popup options. */
exports.DefaultPopupOptions = {
    trigger: 'hover',
    alignPosition: 'b',
    alignMargin: 4,
    showDelay: 100,
    hideDelay: 100,
    triangle: true,
    fixTriangle: false,
    transition: { name: 'fade' },
    showImmediately: false,
    autoFocus: false,
};
/** Cache stacked popup components with specified `key` option. */
const SharedPopupCache = new Map();
/** Cache last created popup component usage with specified `key` option. */
const SharedPopupsThatsInUse = new Map();
/** Get a shared popup component by key. */
function getSharedPopupCache(key) {
    let caches = SharedPopupCache.get(key);
    if (caches) {
        for (let i = caches.length - 1; i >= 0; i--) {
            let cache = caches[i];
            let popup = cache.popup;
            // If current popup is in use, not reuse it.
            if (ff_1.MouseLeave.checkLocked(popup.el)) {
                return null;
            }
            return cache;
        }
    }
    return null;
}
/** Get a shared popup component by key. */
function addSharedPopupCache(key, cache) {
    let caches = SharedPopupCache.get(key);
    if (!caches) {
        caches = [];
        SharedPopupCache.set(key, caches);
    }
    caches.push(cache);
}
/** Delete a shared popup component after it hide. */
function deleteSharedPopupCache(key, popup) {
    let caches = SharedPopupCache.get(key);
    if (caches) {
        caches = caches.filter(cache => cache.popup !== popup);
        SharedPopupCache.set(key, caches);
    }
}
/** Get a shared popup component by key. */
function isSharedPopupKeyInUse(key) {
    let cache = getSharedPopupCache(key);
    return cache ? SharedPopupsThatsInUse.has(cache.popup) : false;
}
/**
 * A `:popup` binding can bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 *
 * `:popup=${() => popupComponent}`
 */
class PopupBinding extends ff_1.Emitter {
    constructor(el, context) {
        super();
        /** When decided to open or opened. */
        this.willOpen = false;
        /** Be `true` after opened popup. */
        this.opened = false;
        /** Be a `Timeout` after decided to open popup but not yet. */
        this.showTimeout = null;
        /** Be a `Timeout` after decided to close popup but not yet. */
        this.hideTimeout = null;
        /** Used to watch rect change after popup opened. */
        this.unwatchRect = null;
        /** Used to watch mouse leaves trigger or popup element after popup opened. */
        this.unwatchLeave = null;
        /** Current popup. */
        this.popup = null;
        /** Controls current popup. */
        this.popupTemplate = null;
        /** Align to current popup. */
        this.aligner = null;
        this.el = el;
        this.context = context;
        // Don't assign default values.
        this.options = new flit_1.UpdatableOptions({});
    }
    getOption(key) {
        let value = this.options.get(key);
        // `popupOptions` in popup component have a higher priority that default options.
        if (value === undefined && this.popup && this.popup.defaultPopupOptions) {
            value = this.popup.defaultPopupOptions[key];
        }
        if (value === undefined) {
            value = exports.DefaultPopupOptions[key];
        }
        return value;
    }
    /** Get the trigger element. */
    getTriggerElement() {
        return this.el;
    }
    /** `renderFn` should never change. */
    update(renderFn, options) {
        let firstTimeUpdate = this.options.isNotUpdated();
        this.renderFn = renderFn;
        this.options.update(options);
        if (firstTimeUpdate) {
            // Must knows trigger type firstly, then can bind trigger.
            this.bindTrigger();
        }
        else if (this.opened) {
            flit_1.enqueueUpdatableInOrder(this, this.context, flit_1.UpdatableUpdateOrder.Directive);
        }
    }
    bindTrigger() {
        let trigger = this.getOption('trigger');
        if (trigger === 'click') {
            flit_1.on(this.el, 'click', this.togglePopupOpened, this);
        }
        else if (trigger === 'hover') {
            flit_1.on(this.el, 'mouseenter', this.showPopupLater, this);
        }
        else if (trigger === 'focus') {
            flit_1.on(this.el, 'focus', this.showPopupLater, this);
            if (this.el.contains(document.activeElement)) {
                this.showPopupLater();
            }
        }
        if (this.getOption('showImmediately')) {
            this.showPopupLater();
        }
    }
    unbindTrigger() {
        let trigger = this.getOption('trigger');
        if (trigger === 'click') {
            flit_1.off(this.el, 'click', this.togglePopupOpened, this);
        }
        else if (trigger === 'hover') {
            flit_1.off(this.el, 'mouseenter', this.showPopupLater, this);
        }
        else if (trigger === 'focus') {
            flit_1.off(this.el, 'focus', this.showPopupLater, this);
        }
    }
    /** Toggle opened state and show or hide popup component immediately. */
    togglePopupOpened() {
        if (this.opened) {
            this.willOpen = false;
            this.hidePopup();
        }
        else {
            this.willOpen = true;
            this.showPopup();
        }
    }
    /** Show popup component after a short time out. */
    showPopupLater() {
        if (this.willOpen) {
            return;
        }
        let trigger = this.getOption('trigger');
        let showDelay = this.getOption('showDelay');
        let key = this.getOption('key');
        // If can reuse exist, show without delay.
        if (isSharedPopupKeyInUse(key)) {
            showDelay = 0;
        }
        // If give a delay for `click` type trigger, it will feel like a stuck or slow responsive.
        if (trigger === 'click' || trigger === 'focus') {
            showDelay = 0;
        }
        this.willOpen = true;
        if (showDelay > 0) {
            this.showTimeout = new ff_1.Timeout(() => {
                this.showTimeout = null;
                if (this.willOpen) {
                    this.showPopup();
                }
            }, showDelay);
        }
        else {
            this.showPopup();
        }
        this.bindLeavingTriggerEvents();
    }
    /** Clear timeout for showing popup component. */
    clearShowTimeout() {
        if (this.showTimeout) {
            this.showTimeout.cancel();
            this.showTimeout = null;
        }
    }
    /** Clear timeout for hiding popup component. */
    clearHideTimeout() {
        if (this.hideTimeout) {
            this.hideTimeout.cancel();
            this.hideTimeout = null;
        }
    }
    /** Bind events to handle leaving trigger element before popup component showing. */
    bindLeavingTriggerEvents() {
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            flit_1.on(this.el, 'mouseleave', this.cancelShowingPopup, this);
        }
        else if (trigger === 'focus') {
            flit_1.on(this.el, 'blur', this.cancelShowingPopup, this);
        }
    }
    /** Unbind events to handle leaving trigger element before popup component showing. */
    unbindLeavingTriggerEvents() {
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            flit_1.off(this.el, 'mouseleave', this.cancelShowingPopup, this);
        }
        else if (trigger === 'focus') {
            flit_1.off(this.el, 'blur', this.cancelShowingPopup, this);
        }
    }
    /** Cancel showing popup. */
    cancelShowingPopup() {
        this.willOpen = false;
        this.unbindLeavingTriggerEvents();
        this.clearShowTimeout();
    }
    /** Show popup component. */
    showPopup() {
        flit_1.enqueueUpdatableInOrder(this, this.context, flit_1.UpdatableUpdateOrder.Directive);
    }
    __updateImmediately() {
        // Why must enqueue updating?
        // There are 2 entries: trigger here, and update from parent component.
        // We should merge them into one.
        if (!this.willOpen) {
            return;
        }
        if (this.popup) {
            this.updatePopup();
        }
        else {
            let isOldInUse = this.ensurePopup();
            this.popup.el.style.visibility = 'hidden';
            this.unbindLeavingTriggerEvents();
            this.bindLeaveEvents();
            this.setOpened(true);
            // May do something in handlers of `openedStateChange` event.
            flit_1.onRenderComplete(() => {
                if (!this.willOpen || !this.popup) {
                    return;
                }
                this.alignPopup();
                this.popup.el.style.visibility = '';
                this.mayGetFocus();
                if (!isOldInUse) {
                    new flit_1.Transition(this.popup.el, this.getOption('transition')).enter();
                }
                this.unwatchRect = ff_1.watchLayout(this.el, 'rect', this.onTriggerRectChanged.bind(this));
            });
        }
    }
    /**
     * Get a cached popup component, or create a new one.
     * Returns whether old popup is in use.
     */
    ensurePopup() {
        let result = this.renderFn();
        let key = this.getOption('key');
        let popup = null;
        let template = null;
        let canShareWithOld = true;
        let isOldInUse = false;
        if (!(result instanceof flit_1.TemplateResult)) {
            result = flit_1.html `${result}`;
        }
        if (key) {
            let cache = getSharedPopupCache(key);
            if (cache) {
                ({ popup, template } = cache);
                let currentTriggerInsideCachedPopup = popup.el.contains(this.el);
                // Reuse and merge.
                if (!currentTriggerInsideCachedPopup && template.canMergeWith(result)) {
                    template.merge(result);
                }
                // Can't reuse since trigger element inside it.
                else if (currentTriggerInsideCachedPopup) {
                    popup = null;
                }
                // Destroy same name old one immediately.
                else {
                    canShareWithOld = false;
                }
            }
        }
        if (popup) {
            // Whether use by other popup binding, such that no need to play transition.
            let inUseBinding = SharedPopupsThatsInUse.get(popup);
            if (inUseBinding && inUseBinding !== this) {
                inUseBinding.losePopupControl();
            }
            isOldInUse = !!inUseBinding;
            if (!canShareWithOld) {
                popup.el.remove();
                popup = null;
            }
        }
        if (!popup) {
            // No need to watch the renderFn, it will be watched from outer component render function.
            template = flit_1.render(result, this.context);
            popup = flit_1.getRenderedAsComponent(template);
            if (key) {
                addSharedPopupCache(key, { popup, template });
            }
        }
        if (key) {
            SharedPopupsThatsInUse.set(popup, this);
        }
        this.popup = popup;
        this.popupTemplate = template;
        popup.setBinding(this);
        popup.applyAppendTo();
        return isOldInUse;
    }
    losePopupControl() {
        this.clean();
    }
    /** Clean all popup properties. */
    clean() {
        if (this.opened) {
            this.unbindLeaveEvents();
            if (this.unwatchRect) {
                this.unwatchRect();
                this.unwatchRect = null;
            }
            this.willOpen = false;
            this.setOpened(false);
            this.popup = null;
            this.popupTemplate = null;
            this.aligner = null;
        }
    }
    /** Update popup component, calls when updating an outer component. */
    updatePopup() {
        let result = this.renderFn();
        let key = this.getOption('key');
        let popup = this.popup;
        let template = this.popupTemplate;
        if (!(result instanceof flit_1.TemplateResult)) {
            result = flit_1.html `${result}`;
        }
        if (template.canMergeWith(result)) {
            template.merge(result);
        }
        else {
            popup.el.remove();
            let template = this.popupTemplate = flit_1.render(result, this.context);
            popup = flit_1.getRenderedAsComponent(template);
            if (key) {
                addSharedPopupCache(key, { popup, template });
            }
        }
        flit_1.onRenderComplete(() => {
            if (this.popup) {
                this.alignPopup();
            }
        });
    }
    /** Set opened state and triggers event. */
    setOpened(opened) {
        this.opened = opened;
        this.emit('openedStateChange', opened);
    }
    /** Align popup component. */
    alignPopup() {
        let popup = this.popup;
        let alignToFn = this.getOption('alignTo');
        let alignTo = alignToFn ? alignToFn(this.el) : this.el;
        this.emit('willAlign');
        // Create a aligner since align too much times for a tooltip.
        if (!this.aligner) {
            this.aligner = new ff_1.Aligner(popup.el, alignTo, this.getOption('alignPosition'), this.getAlignOptions());
        }
        this.aligner.align();
    }
    /** Get align options. */
    getAlignOptions() {
        let triangle = this.popup.refs.triangle;
        return {
            margin: this.getOption('alignMargin'),
            canShrinkInY: true,
            triangle,
            fixTriangle: this.getOption('fixTriangle'),
        };
    }
    /** Make element of popup component get focus if possible. */
    mayGetFocus() {
        let trigger = this.getOption('trigger');
        if (this.getOption('autoFocus') && (trigger !== 'hover' && trigger !== 'focus') && this.popup && this.popup.el.tabIndex >= 0) {
            this.popup.el.focus();
        }
    }
    /** Bind hiding popup component events. */
    bindLeaveEvents() {
        var _a;
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            // Should not use `MouseLeave.once`, because `hidePopupLater` may be canceled, it needs trigger again.
            this.unwatchLeave = ff_1.MouseLeave.on(this.el, this.popup.el, this.hidePopup.bind(this), {
                delay: this.getOption('hideDelay'),
                mouseIn: true,
            });
        }
        else if (trigger === 'click' || trigger === 'contextmenu') {
            flit_1.on(document, 'mousedown', this.onDocMouseDown, this);
            ff_1.MouseLeave.lock(this.el, (_a = this.popup) === null || _a === void 0 ? void 0 : _a.el);
        }
        else if (trigger === 'focus') {
            flit_1.on(this.el, 'blur', this.hidePopupLater, this);
        }
    }
    /** Unbind hiding popup component events. */
    unbindLeaveEvents() {
        var _a;
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            if (this.unwatchLeave) {
                this.unwatchLeave();
                this.unwatchLeave = null;
            }
        }
        else if (trigger === 'click' || trigger === 'contextmenu') {
            flit_1.off(document, 'mousedown', this.onDocMouseDown, this);
            ff_1.MouseLeave.unlock(this.el, (_a = this.popup) === null || _a === void 0 ? void 0 : _a.el);
        }
        else if (trigger === 'focus') {
            flit_1.off(this.el, 'blur', this.hidePopupLater, this);
        }
    }
    /** Hide popup component after a short time out. */
    hidePopupLater() {
        if (!this.opened) {
            return;
        }
        let hideDelay = this.getOption('hideDelay');
        this.hideTimeout = new ff_1.Timeout(() => {
            this.hideTimeout = null;
            if (this.opened) {
                this.hidePopup();
            }
        }, hideDelay);
        this.willOpen = false;
    }
    /** Hide popup component. */
    hidePopup() {
        let key = this.getOption('key');
        let popup = this.popup;
        let popupEl = popup.el;
        if (key) {
            deleteSharedPopupCache(key, popup);
            SharedPopupsThatsInUse.delete(popup);
        }
        new flit_1.Transition(popupEl, this.getOption('transition')).leave().then(finish => {
            if (finish) {
                popupEl.remove();
            }
        });
        this.clean();
    }
    /** Trigger when mouse down on document. */
    onDocMouseDown(e) {
        let target = e.target;
        if (!this.el.contains(target) && (!this.popup || !this.popup.el.contains(target))) {
            this.hidePopupLater();
        }
    }
    /** After trigger element position changed. */
    onTriggerRectChanged() {
        if (ff_1.isVisibleInViewport(this.el, 0.1, this.popup.el)) {
            if (this.popup) {
                this.alignPopup();
            }
        }
        else {
            this.hidePopupLater();
        }
    }
    remove() {
        flit_1.off(this.el, 'mouseenter', this.showPopupLater, this);
        if (this.opened) {
            this.hidePopup();
        }
        else {
            this.clean();
        }
        this.unbindTrigger();
    }
}
exports.PopupBinding = PopupBinding;
/**
 * Bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 * @param renderFn Should return a `<f-popup />` type template result.
 * @param options Popup options, `{trigger, alignTo, alignPosition, ...}`.
 */
exports.popup = flit_1.defineBinding('popup', PopupBinding);


/***/ }),

/***/ "./src/bindings/tooltip.ts":
/*!*********************************!*\
  !*** ./src/bindings/tooltip.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltip = exports.TooltipBinding = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const popup_1 = __webpack_require__(/*! ./popup */ "./src/bindings/popup.ts");
const defaultTooltipOptions = {
    alignPosition: 'r',
    alignMargin: 3,
    showDelay: 0,
    hideDelay: 200,
    triangle: true,
    fixTriangle: false,
    type: 'default',
};
/**
 * A `:tooltip` binding can help to show a short text message beside it's trigger element.
 *
 * `:tooltip="message"`
 * `:tooltip=${message}`
 */
class TooltipBinding extends popup_1.PopupBinding {
    constructor() {
        super(...arguments);
        this.title = '';
    }
    update(title, options = {}) {
        this.title = title;
        super.update(this.getRenderFn.bind(this), this.getPopupOptions(options));
    }
    getRenderFn() {
        return flit_1.html `
			<f-tooltip
				.herizontal=${this.isHerizontal()}
				.type=${this.getOption('type')}
			>
				${this.title}
			</f-tooltip>
		`;
    }
    getPopupOptions(options = {}) {
        var _a;
        let optionType = (_a = options.type) !== null && _a !== void 0 ? _a : defaultTooltipOptions.type;
        return {
            ...defaultTooltipOptions,
            // Default key is `tooltip` for default type.
            key: optionType === 'default' ? 'tooltip' : '',
            ...options,
        };
    }
    isHerizontal() {
        let direction = ff_1.getMainAlignDirection(this.options.get('alignPosition'));
        return direction === 'l' || direction === 'r';
    }
    showPopupLater() {
        // Not popup if no `title` specified.
        if (!this.title) {
            return;
        }
        super.showPopupLater();
    }
    bindTrigger() {
        if (this.shouldAlwaysKeepVisible()) {
            // If not wait window loaded, page scrolling position may be not determinated yet.
            // So element may be aligned to a wrong position.
            ff_1.ensureWindowLoaded().then(() => {
                this.showPopupLater();
            });
        }
        else {
            super.bindTrigger();
        }
    }
    /** Whether the tooltip should always visible. */
    shouldAlwaysKeepVisible() {
        return ['prompt', 'error'].includes(this.getOption('type'));
    }
    bindLeaveEvents() {
        if (!this.shouldAlwaysKeepVisible()) {
            super.bindLeaveEvents();
        }
    }
    /** After trigger element position changed. */
    onTriggerRectChanged() {
        if (this.shouldAlwaysKeepVisible() || ff_1.isVisibleInViewport(this.el, 0.1, this.popup.el)) {
            if (this.popup) {
                this.alignPopup();
            }
        }
        else {
            this.hidePopupLater();
        }
    }
    getAlignOptions() {
        let triangle = this.popup.refs.triangle;
        return {
            margin: this.getOption('alignMargin'),
            stickToEdges: false,
            canShrinkInY: true,
            triangle,
            fixTriangle: this.getOption('fixTriangle'),
        };
    }
}
exports.TooltipBinding = TooltipBinding;
/**
 * tooltip binding can help to show a short text message.
 *
 * `tooltip(title, {alignPosition, alignMargin, ...})`
 */
exports.tooltip = flit_1.defineBinding('tooltip', TooltipBinding);


/***/ }),

/***/ "./src/components/buttongroup.ts":
/*!***************************************!*\
  !*** ./src/components/buttongroup.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroup = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
/** `<f-buttongroup>` can contains several `<button>` elements as a button group. */
let ButtonGroup = class ButtonGroup extends flit_1.Component {
    static style() {
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
		}

		button{
			&:nth-child(n+2){
				margin-left: -1px;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
	
			&:nth-last-child(n+2){
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
	
			&[primary]{
				position: relative;
				z-index: 1;
			}

			&:hover{
				position: relative;
				z-index: 1;
			}
		}
		`;
    }
};
ButtonGroup = __decorate([
    flit_1.define('f-buttongroup')
], ButtonGroup);
exports.ButtonGroup = ButtonGroup;


/***/ }),

/***/ "./src/components/checkbox.ts":
/*!************************************!*\
  !*** ./src/components/checkbox.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = exports.CheckboxGroup = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
/** `<f-checkboxgroup>` can contains several `<f-checkbox>` as child. */
let CheckboxGroup = class CheckboxGroup extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** All child `<f-checkbox>`. */
        this.checkboxs = [];
        /** All values of checked child checkboxs. */
        this.value = [];
    }
    /** Retister a child checkbox. */
    register(checkbox) {
        this.checkboxs.push(checkbox);
        checkbox.on('change', this.onCheckboxChange.bind(this, checkbox));
    }
    onCheckboxChange(checkbox) {
        if (checkbox.checked) {
            ff_1.add(this.value, checkbox.value);
        }
        else {
            ff_1.removeWhere(this.value, value => value == checkbox.value);
        }
        this.emit('change', this.value);
    }
};
CheckboxGroup = __decorate([
    flit_1.define('f-checkboxgroup')
], CheckboxGroup);
exports.CheckboxGroup = CheckboxGroup;
/** `<f-checkbox>` just like `<input type=checkbox>`, you can click to check or uncheck one checkbox in a checkbox group. */
let Checkbox = class Checkbox extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.checkboxGroup = null;
        /** Whether the checkbox was checked. */
        this.checked = false;
        /** Whether the checkbox in indeterminate state, than means, not determined checked or unchecked. */
        this.indeterminate = false;
        /** If having a parent `<f-checkboxgroup>`, the `value` property will be assign to it after current checkbox checked. */
        this.value = null;
    }
    static style() {
        let { mainColor, focusBlurRadius, adjust } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			align-items: center;
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&:focus{
				color: ${mainColor};

				.icon{
					box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
				}
			}
		}

		.icon{
			position: relative;
			top: -2px;
			margin-right: ${adjust(7)}px;
			border-radius: 4px;
		}

		.indeterminate, .checked{
			color: ${mainColor};
		}

		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`;
    }
    onCreated() {
        let group = flit_1.getClosestComponentOfType(this.el, CheckboxGroup);
        if (group) {
            this.checkboxGroup = group;
            this.checked = this.checkboxGroup.value.includes(this.value);
            this.checkboxGroup.register(this);
        }
    }
    render() {
        let iconType = this.checked ? 'checkbox-checked' : this.indeterminate ? 'checkbox-indeterminate' : 'checkbox-unchecked';
        return flit_1.html `
			<template
				tabindex="0"
				:class.checked=${this.checked}
				:class.indeterminate=${this.indeterminate}
				@click=${this.onClick}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<f-icon class="icon" .type=${iconType} />
				<div class="label">
					<slot />
				</div>
			</template>
		`;
    }
    onClick() {
        this.toggleChecked();
    }
    toggleChecked() {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.emit('change', this.checked);
    }
    onFocus() {
        flit_1.on(document, 'keydown.enter', this.onEnter, this);
    }
    onEnter(e) {
        e.preventDefault();
        this.toggleChecked();
    }
    onBlur() {
        flit_1.off(document, 'keydown', this.onEnter, this);
    }
};
Checkbox = __decorate([
    flit_1.define('f-checkbox')
], Checkbox);
exports.Checkbox = Checkbox;


/***/ }),

/***/ "./src/components/contextmenu.ts":
/*!***************************************!*\
  !*** ./src/components/contextmenu.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const popup_1 = __webpack_require__(/*! ../components/popup */ "./src/components/popup.ts");
/** `<f-contextmenu>` is used for render a context menu after right clicking. */
let ContextMenu = class ContextMenu extends popup_1.Popup {
    constructor() {
        super(...arguments);
        this.triangle = false;
    }
    static style() {
        let { adjust } = theme_1.theme;
        return flit_1.css `
		${super.style()}
		:host{
			position: fixed;
			border-radius: 0;
			
			.option__f-list{
				padding: ${adjust(2)}px ${adjust(8)}px;
			}

			f-list{
				border-bottom: none;
			}
		}
		`.extends(super.style());
    }
};
ContextMenu = __decorate([
    flit_1.define('f-contextmenu')
], ContextMenu);
exports.ContextMenu = ContextMenu;


/***/ }),

/***/ "./src/components/dialog.ts":
/*!**********************************!*\
  !*** ./src/components/dialog.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialog = exports.QuickDialog = exports.Dialog = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const element_1 = __webpack_require__(/*! ../utils/element */ "./src/utils/element.ts");
const translations_1 = __webpack_require__(/*! ../translations/translations */ "./src/translations/translations.ts");
/** `<f-dialog>` shows critical content and in a overlay modal, you must interact with it before continue. */
let Dialog = class Dialog extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Options for current dialog. */
        this.currentOptions = null;
        /** Also as a marker to know if current options are expired. */
        this.resolve = null;
        /** Dialog stack, will show one by one. */
        this.stack = [];
        /** Whether any dialog opened. */
        this.opened = true;
        /** Where to append current dialog. */
        this.appendTo = 'body';
    }
    static style() {
        let { textColor, adjust, adjustFontSize, popupBorderRadius, popupShadowBlurRadius, popupShadowColor, popupBackgroundColor } = theme_1.theme;
        return flit_1.css `
		:host{
			z-index: 1000;
			width: ${adjust(360)}px;
			position: fixed;
			border-radius: ${popupBorderRadius}px;
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			background: ${popupBackgroundColor};
			max-width: 96%;
			max-height: 96%;
			padding: ${adjust(8)}px ${adjust(16)}px ${adjust(16)}px;
		}

		.mask{
			position: fixed;
			z-index: 1000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}

		.header{
			display: flex;
			line-height: ${adjust(22)}px;
			height: ${adjust(28) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${adjust(16)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			display: flex;
			margin-top: ${adjust(8)}px;
		}

		.icon{
			padding-right: ${adjust(12)}px;
		}

		.message{
			flex: 1;
			min-width: 0;
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px 0;
		}

		.list{
			margin: ${adjust(8)}px 0;
			line-height: ${adjust(20)}px;
			list-style-type: square;
			padding-left: ${adjust(28)}px;
		}

		.actions{
			display: flex;
			justify-content: flex-end;
			margin-top: ${adjust(16)}px;

			button{
				margin-left: ${adjust(8)}px;
			}

			.third{
				margin-left: 0;
				margin-right: auto;
			}
		}

		.input{
			margin-top: ${adjust(8)}px;
			margin-bottom: ${adjust(22)}px;
			width: 100%;
		}
		`;
    }
    render() {
        let options = this.currentOptions;
        if (!options) {
            return '';
        }
        return flit_1.html `
			<template
				tabindex="0"
				${flit_1.show(this.opened, { name: 'fade', enterAtStart: true, onend: this.onTransitionEnd })}
			>
				<div class="mask"
					:ref="mask"
					${flit_1.show(this.opened, { name: 'fade', enterAtStart: true })}
				/>

				${options.title ? flit_1.html `
					<div class="header">
						<div class="title">
							${options.title}
						</div>
					</div>
				` : ''}

				<div class="content">

					${options.icon ? flit_1.html `<div class="icon">
						<f-icon .type="${options.icon}" />
					</div>` : ''}

					<div class="message">
						${options.message}
					</div>

					${options.list && options.list.length > 0 ? flit_1.html `
						<ul class="list">
							${options.list.map(text => flit_1.html `<li>${text}</li>`)}
						</ul>
					` : ''}
				</div>

				${this.renderActions(options.actions)}
			</template>
		`;
    }
    renderActions(actions) {
        if (actions && actions.length > 0) {
            let results = actions.map(action => flit_1.html `
				<button class="action"
					?primary=${action.primary}
					:class.third=${action.third}
					@click=${() => this.onClickActionButton(action)}>
					${action.text}
				</button>
			`);
            return flit_1.html `<div class="actions">${results}</div>`;
        }
        return '';
    }
    onClickActionButton(action) {
        var _a, _b, _c;
        // Interrupted.
        if ((_b = (_a = this.currentOptions) === null || _a === void 0 ? void 0 : _a.interruptAction) === null || _b === void 0 ? void 0 : _b.call(_a, (_c = action.value) !== null && _c !== void 0 ? _c : '')) {
            return;
        }
        if (this.resolve) {
            this.resolve(action.value);
            this.resolve = null;
        }
        if (this.stack.length > 0) {
            let item = this.stack.shift();
            this.applyOptions(item.options, item.resolve);
        }
        else {
            this.hide();
        }
    }
    onTransitionEnd(type, finish) {
        if (type === 'leave' && finish) {
            if (this.refs.mask) {
                this.refs.mask.remove();
            }
            this.el.remove();
        }
        else if (type === 'enter') {
            let input = this.el.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    }
    async onConnected() {
        await flit_1.untilRenderComplete();
        if (this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
            this.el.before(this.refs.mask);
        }
        this.toCenter();
        if (this.el.tabIndex === 0) {
            this.el.focus();
        }
        flit_1.on(window, 'resize', this.onWindowResize, this);
    }
    onDisconnected() {
        flit_1.off(window, 'resize', this.onWindowResize, this);
    }
    onWindowResize() {
        if (this.opened) {
            this.toCenter();
        }
    }
    toCenter() {
        ff_1.align(this.el, document.documentElement, 'c');
    }
    /** Apply options as current options. */
    applyOptions(options, resolve) {
        this.currentOptions = options;
        this.resolve = resolve;
    }
    /** Add an option to stack. */
    async addOptions(options) {
        let resolve;
        let promise = new Promise(scopedResolve => {
            resolve = scopedResolve;
        });
        if (this.resolve) {
            this.stack.push({
                options,
                resolve: resolve,
            });
        }
        else {
            this.applyOptions(options, resolve);
            this.show();
        }
        return promise;
    }
    /** Show current dialog. */
    show() {
        this.opened = true;
        if (this.appendTo) {
            element_1.appendTo(this.el, this.appendTo);
        }
    }
    /** Hide current dialog. */
    hide() {
        this.opened = false;
    }
    /** Trigger specified action manually. */
    triggerAction(value) {
        if (!this.currentOptions || !this.currentOptions.actions) {
            return;
        }
        let action = this.currentOptions.actions.find(action => action.value === value);
        if (action) {
            this.onClickActionButton(action);
        }
    }
};
Dialog = __decorate([
    flit_1.define('f-dialog')
], Dialog);
exports.Dialog = Dialog;
class QuickDialog {
    constructor() {
        this.dialogComponent = null;
    }
    addOptions(options) {
        if (!this.dialogComponent) {
            this.dialogComponent = flit_1.getRenderedAsComponent(flit_1.render(flit_1.html `<f-dialog />`));
        }
        return this.dialogComponent.addOptions(options);
    }
    /** Show default type dialog or add it to dialog stack. */
    show(message, options = {}) {
        return this.addOptions({
            message,
            actions: [{ value: 'ok', text: translations_1.translations.get('ok') }],
            ...options,
        });
    }
    /** Show confirm type dialog or add it to dialog stack. */
    confirm(message, options = {}) {
        return this.addOptions({
            icon: 'confirm',
            message,
            actions: [
                { value: 'cancel', text: translations_1.translations.get('cancel') },
                { value: 'ok', text: translations_1.translations.get('ok'), primary: true },
            ],
            ...options,
        });
    }
    /** Show prompt type dialog or add it to dialog stack. */
    async prompt(message, options = {}) {
        let value = options.defaultValue ? String(options.defaultValue) : '';
        let input;
        let originalInterruptAction = options.interruptAction;
        let messageWithInput = flit_1.html `
			${message}
			<f-input class="input" 
				.placeholder=${options.placeholder}
				.validator=${options.validator}
				.type=${options.inputType || 'text'}
				.value=${value}
				:ref=${async (i) => input = await flit_1.getComponentAsync(i)}
				@@input=${(v) => value = v}
				@keydown.enter=${() => this.dialogComponent.triggerAction('ok')}
			/>
		`;
        let btn = await this.addOptions({
            message: messageWithInput,
            actions: [
                { value: 'cancel', text: translations_1.translations.get('cancel') },
                { value: 'ok', text: translations_1.translations.get('ok'), primary: true },
            ],
            ...options,
            interruptAction: (button) => {
                return (originalInterruptAction === null || originalInterruptAction === void 0 ? void 0 : originalInterruptAction(button)) || button === 'ok' && input.valid === false;
            },
        });
        if (btn === 'ok') {
            return value;
        }
        return undefined;
    }
}
exports.QuickDialog = QuickDialog;
/** A quick global API to show dialogs. */
exports.dialog = new QuickDialog();


/***/ }),

/***/ "./src/components/dropdown.ts":
/*!************************************!*\
  !*** ./src/components/dropdown.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const popup_1 = __webpack_require__(/*! ../bindings/popup */ "./src/bindings/popup.ts");
/**
 * `Dropdown` is abstract class for any component having popup content to show.
 * You should extend it to implement some dropdown type components, like `Select`.
  */
class Dropdown extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.popupBinding = null;
        /** Whether dropdown content is opened. */
        this.opened = false;
        /** Trigger event type. Default value is `click`. */
        this.trigger = 'click';
        /** Whether shows triangle. Default value is `true`. */
        this.triangle = true;
        /**
         * Align position with trigger element.
         * Default value is 'b', means bottom position.
         */
        this.alignPosition = 'b';
        /**
         * Align margin betweens trigger element and popup content.
         * Default value is '3' in pixels.
         */
        this.alignMargin = 3;
        /**
         * Transition to play when begin to show or hide popup content.
         * Default value is fade css transition.
         */
        this.transition = { name: 'fade' };
        /**
         * Delay in milliseconds before showing popup content.
         * Default value is `100`.
         */
        this.showDelay = 100;
        /**
         * Delay in milliseconds before hiding popup content.
         * Default value is `100`.
         */
        this.hideDelay = 100;
    }
    static style() {
        let { mainColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
		}

		.opened{
			color: ${mainColor};
		}

		.down-icon{
			margin-right: 6px;
		}

		.popup{
			padding: 5px 0;
		}

		.list{
			overflow-y: auto;
			max-height: 100%;
		}
		`;
    }
    render() {
        let { trigger, triangle, alignPosition, alignMargin, transition, showDelay, hideDelay } = this;
        let toPopup = flit_1.refBinding(popup_1.popup(this.renderPopup.bind(this), { trigger, triangle, alignPosition, alignMargin, transition, showDelay, hideDelay }), this.refBinding.bind(this));
        return flit_1.html `
			<template :class.opened=${this.opened} ${toPopup}>
				<slot />
				<f-icon class="down-icon" .type="down" />
			</template>
		`;
    }
    renderPopup() {
        return flit_1.html `
			<f-popup
				class="popup"
				.triangle=${this.triangle}
			/>
		`;
    }
    refBinding(binding) {
        this.popupBinding = binding;
        this.popupBinding.on('openedStateChange', this.setOpened, this);
        this.popupBinding.on('willAlign', this.onWillAlign, this);
    }
    setOpened(opened) {
        this.opened = opened;
        if (opened) {
            this.onPopupOpened();
        }
    }
    onPopupOpened() { }
    onWillAlign() { }
    showPopup() {
        if (this.popupBinding) {
            this.popupBinding.showPopupLater();
        }
    }
    hidePopup() {
        if (this.popupBinding) {
            this.popupBinding.hidePopupLater();
        }
    }
}
exports.Dropdown = Dropdown;


/***/ }),

/***/ "./src/components/form.ts":
/*!********************************!*\
  !*** ./src/components/form.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
/** `<f-form>` can contain `<f-input>` or `<f-textarea>` and check their valid state in bundle. */
let Form = class Form extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** All child `<f-input>` or `<f-textarea>`. */
        this.inputs = [];
        /** Whether all input or textare are valid. */
        this.valid = true;
    }
    static style() {
        return flit_1.css `
		:host{
			display: block;
		}
		`;
    }
    /** Register a child `<f-input>` or `<f-textarea>`. */
    register(input) {
        this.inputs.push(input);
        this.valid = this.valid && input.valid !== false;
        input.on('change', this.onInputChange, this);
    }
    onInputChange(_value, valid) {
        if (valid !== this.valid) {
            if (valid) {
                this.valid = this.inputs.every(input => input.valid);
            }
            else {
                this.valid = false;
            }
        }
    }
    /** Validate all child inputs or textareas. */
    validate() {
        for (let input of this.inputs) {
            input.setTouched(true);
        }
    }
    /** Reset valid state for all child inputs or textareas. */
    reset() {
        for (let input of this.inputs) {
            input.setTouched(false);
        }
    }
};
Form = __decorate([
    flit_1.define('f-form')
], Form);
exports.Form = Form;


/***/ }),

/***/ "./src/components/grid-layout.ts":
/*!***************************************!*\
  !*** ./src/components/grid-layout.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColLayout = exports.RowLayout = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
/**
 * `<f-row>` used to do grid layout, can contain several `<f-col>`.
 * If available width changes, count of `<f-col>` in one line may be adjusted.
 */
let RowLayout = class RowLayout extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.cols = [];
        /** Column count in one line. */
        this.columnCount = 24;
        /** Gutter betweens columns in pixels. */
        this.gutter = 0;
        /** Column alignment starts from. */
        this.justify = 'start';
    }
    static style() {
        return flit_1.css `
		:host{
			display: flex;
			flex-wrap: wrap;
		}
		`;
    }
    onReady() {
        this.watchImmediately(() => this.justify, (justify) => {
            this.el.style.justifyContent = justify === 'start' ? '' : justify === 'end' ? 'flex-end' : justify;
        });
    }
    /** Register child `<f-col>`. */
    register(col) {
        this.cols.push(col);
    }
    /** Returns whether `col` is the first column. */
    isFirstCol(col) {
        return col === this.cols[0];
    }
    /** Get column count in left. */
    getLeftColumnCount(col) {
        let { columnCount } = this;
        let count = 0;
        for (let c of this.cols) {
            if (c === col) {
                break;
            }
            let span = Math.min(c.span, columnCount);
            let offset = c.offset % columnCount;
            count += span + offset;
        }
        return count;
    }
};
RowLayout = __decorate([
    flit_1.define('f-row')
], RowLayout);
exports.RowLayout = RowLayout;
/** `<f-col>` will be contained inside a `<f-row>` to do grid layout. */
let ColLayout = class ColLayout extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Column span, default value is  */
        this.span = 1;
        this.offset = 0;
    }
    onCreated() {
        let row = flit_1.getComponent(this.el.parentElement);
        if (!(row instanceof RowLayout)) {
            throw new Error(`"<f-col>" must be included in a "<f-row>"`);
        }
        row.register(this);
        this.row = row;
    }
    onUpdated() {
        this.el.style.marginLeft = this.getMarginLeft();
        this.el.style.width = this.getWidth();
    }
    getMarginLeft() {
        let leftColCount = this.row.getLeftColumnCount(this);
        let { columnCount, gutter } = this.row;
        let offset = this.offset % columnCount;
        let isFirstCol = (leftColCount + offset) % columnCount === 0;
        if (offset > 0) {
            return (offset / gutter) * 100 + '%';
        }
        else {
            return isFirstCol ? '0' : gutter + 'px';
        }
    }
    getWidth() {
        let { gutter, columnCount } = this.row;
        let span = Math.min(this.span, columnCount);
        let percent = span / columnCount;
        let gutterPXs = gutter * (span - 1 - (columnCount - 1) * percent);
        return `calc(${percent * 100}% - ${-gutterPXs}px)`;
    }
};
ColLayout = __decorate([
    flit_1.define('f-col')
], ColLayout);
exports.ColLayout = ColLayout;


/***/ }),

/***/ "./src/components/helpers/column-width-resizer.ts":
/*!********************************************************!*\
  !*** ./src/components/helpers/column-width-resizer.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnWidthResizer = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
/** For `<f-table>` to resize column widths. */
class ColumnWidthResizer {
    constructor(head, columnContainer, colgroup, columns, minColumnWidth, resizingMaskClassName) {
        /** Column widths array. */
        this.columnWidths = null;
        /** Column widths array when resizeing. */
        this.resizingColumnWidths = null;
        /** Whether column resized. */
        this.columnResized = false;
        /** Cached head client width. */
        this.cachedHeadClientWidth = 0;
        this.head = head;
        this.columnContainer = columnContainer;
        this.colgroup = colgroup;
        this.columns = columns;
        this.minColumnWidth = minColumnWidth;
        this.resizingMaskClassName = resizingMaskClassName;
    }
    /** Update column configuration. */
    setColumns(columns) {
        this.columns = columns;
    }
    /** Update column configuration. */
    setMinColumnWidth(minColumnWidth) {
        this.minColumnWidth = minColumnWidth;
    }
    /**
     * Update column widths from column configuration.
     * Will check available column width and may cause page reflow.
     */
    updatColumnWidthsPrecisely() {
        let headClientWidth = this.head.clientWidth - ff_1.getStyleValueAsNumber(this.head, 'paddingLeft') - ff_1.getStyleValueAsNumber(this.head, 'paddingRight');
        this.cachedHeadClientWidth = headClientWidth;
        this.updatColumnWidthsByAvailableWidth(headClientWidth);
    }
    /** A quick method to update column widths when knows head width is not adjusted. */
    updatColumnWidthsRoughly() {
        this.updatColumnWidthsByAvailableWidth(this.cachedHeadClientWidth);
    }
    /** Update column widths after knows available head width. */
    updatColumnWidthsByAvailableWidth(availableWidth) {
        let widthAndFlexArray = this.columns.map(({ flex, width }, index) => {
            var _a, _b;
            let baseWidthInColumnConfig = Math.max(width || 0, this.minColumnWidth);
            // If column resized, we use the column width percentage to calculate new column width.
            let baseWidth = this.columnResized ? this.columnWidths[index] : baseWidthInColumnConfig;
            let extendFlex = 0;
            let shrinkFlex = 0;
            if (Array.isArray(flex)) {
                extendFlex = (_a = flex[0]) !== null && _a !== void 0 ? _a : 0;
                shrinkFlex = (_b = flex[1]) !== null && _b !== void 0 ? _b : extendFlex;
            }
            else {
                extendFlex = shrinkFlex = flex !== null && flex !== void 0 ? flex : 0;
            }
            return [baseWidth, extendFlex, shrinkFlex];
        });
        let widths = this.calcColumnWidths(widthAndFlexArray, availableWidth, this.minColumnWidth);
        this.columnWidths = widths;
        this.setColumnWidths(widths);
    }
    /**
     * Calculate column widths from `[baseWidth, extendFlex, shrinkFlex]` values in column config.
     * The algorithm is nearly same with the flex layout,
     * except that the total column widths will always equal the available client width,
     * and no column width should less than `minColumnWidth`.
     */
    calcColumnWidths(widthAndFlexArray, clientWidth, minColumnWidth) {
        // Not enough space for even `minColumnWidth`, then average `clientWidth` to each column.
        if (clientWidth < minColumnWidth * widthAndFlexArray.length) {
            return ff_1.repeatForTimes(clientWidth / widthAndFlexArray.length, widthAndFlexArray.length);
        }
        let totalBaseWidth = 0;
        let totalExtendFlex = 0;
        let totalShrinkFlex = 0;
        let widths = ff_1.repeatForTimes(minColumnWidth, widthAndFlexArray.length);
        let excludedIndexSet = new Set();
        for (let [baseWidth, extendFlex, shrinkFlex] of widthAndFlexArray) {
            totalBaseWidth += baseWidth;
            totalExtendFlex += extendFlex;
            totalShrinkFlex += shrinkFlex;
        }
        // If no `flex` set for any column, set `flex` to `1` for all the columns.
        if (totalExtendFlex === 0) {
            totalExtendFlex = widthAndFlexArray.length;
            widthAndFlexArray.forEach(a => a[1] = 1);
        }
        if (totalShrinkFlex === 0) {
            totalShrinkFlex = widthAndFlexArray.length;
            widthAndFlexArray.forEach(a => a[2] = 1);
        }
        while (true) {
            let totalFlex = clientWidth >= totalBaseWidth ? totalExtendFlex : totalShrinkFlex;
            let widthPerFlex = (clientWidth - totalBaseWidth) / totalFlex;
            let moreColumnExcluded = false;
            for (let index = 0; index < widthAndFlexArray.length; index++) {
                if (excludedIndexSet.has(index)) {
                    continue;
                }
                let [baseWidth, extendFlex, shrinkFlex] = widthAndFlexArray[index];
                let flex = widthPerFlex >= 0 ? extendFlex : shrinkFlex;
                let width = flex * widthPerFlex + baseWidth;
                if (width < minColumnWidth) {
                    clientWidth -= minColumnWidth;
                    totalBaseWidth -= minColumnWidth;
                    totalExtendFlex -= flex;
                    excludedIndexSet.add(index);
                    moreColumnExcluded = true;
                }
                else {
                    widths[index] = width;
                }
            }
            if (!moreColumnExcluded) {
                break;
            }
        }
        return widths;
    }
    setColumnWidths(widths) {
        let totalWidth = ff_1.sum(widths);
        for (let index = 0; index < widths.length; index++) {
            let isLastColumn = index === widths.length - 1;
            let percent = widths[index] / totalWidth;
            let col = this.colgroup.children[index];
            col.style.width = percent * 100 + '%';
            if (!isLastColumn) {
                let col = this.columnContainer.children[index];
                col.style.width = percent * 100 + '%';
            }
        }
    }
    /** Called after mouse down at column resizer. */
    onStartResize(e, index) {
        let startX = e.clientX;
        let onMouseMove = (e) => {
            e.preventDefault();
            this.resizeColumnByMovementX(e.clientX - startX, index);
        };
        let onMouseUp = () => {
            if (this.resizingColumnWidths) {
                this.columnWidths = this.resizingColumnWidths;
                this.resizingColumnWidths = null;
            }
            flit_1.off(document, 'mousemove', onMouseMove);
            cursorMask.remove();
            this.columnResized = true;
        };
        let cursorMask = flit_1.render(flit_1.html `<div class="${this.resizingMaskClassName}" />`).getFirstElement();
        document.body.append(cursorMask);
        flit_1.on(document, 'mousemove', onMouseMove);
        flit_1.once(document, 'mouseup', onMouseUp);
    }
    resizeColumnByMovementX(movementX, index) {
        let widths = [...this.columnWidths];
        let needShrink = Math.abs(movementX);
        let moveLeft = movementX < 0;
        let expandIndex = moveLeft ? index + 1 : index;
        let firstShrinkIndex = moveLeft ? index : index + 1;
        // When move to left, we reduce the width of current and previous columns until the `minWidth`,
        // then we add the reduced width to next column.
        // When move to right, we reduce the width of next columns until the `minWidth`,
        // then we add the reduced width to current column.
        for (let i = firstShrinkIndex; (moveLeft ? i >= 0 : i < this.columns.length) && needShrink > 0; moveLeft ? i-- : i++) {
            let width = widths[i];
            let shrink = needShrink;
            if (width - shrink < this.minColumnWidth) {
                shrink = width - this.minColumnWidth;
            }
            widths[i] -= shrink;
            widths[expandIndex] += shrink; // index <= column count - 2
            needShrink -= shrink;
        }
        this.resizingColumnWidths = widths;
        this.setColumnWidths(widths);
    }
}
exports.ColumnWidthResizer = ColumnWidthResizer;


/***/ }),

/***/ "./src/components/helpers/table-state.ts":
/*!***********************************************!*\
  !*** ./src/components/helpers/table-state.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TableStateCacher = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const remote_store_1 = __webpack_require__(/*! ../../store/remote-store */ "./src/store/remote-store.ts");
const DefaultTableStateOptions = {
    filter: false,
    order: false,
    visibleIndex: false,
    data: false,
    store: false,
    customized: {},
};
class TableStateCacher {
    constructor(table) {
        this.storagePrefix = 'table_state_';
        this.cacheMap = new Map();
        this.table = table;
    }
    /** Checks whether caches table state in specified name. */
    has(name) {
        return this.cacheMap.has(name) || ff_1.storage.get(this.storagePrefix + name);
    }
    /** Cache current table state. */
    cache(name, options) {
        let state = this.getState(options);
        if (options.toStorage) {
            try {
                ff_1.storage.set(this.storagePrefix + name, state);
            }
            catch (err) {
                console.error(`Can't serialize table cache data!`, state, err);
            }
        }
        this.cacheMap.set(name, state);
    }
    getState(options) {
        let table = this.table;
        let store = this.table.store;
        let state = {};
        options = { ...DefaultTableStateOptions, ...options };
        if (options.filter) {
            state.storeFilter = store.getFilter();
        }
        if (options.order) {
            state.orderName = table.getOrderName();
            state.orderDirection = table.getOrderDirection();
        }
        if (options.visibleIndex) {
            state.visibleIndex = table.getFirstVisibleIndex();
        }
        if (options.data) {
            state.data = store instanceof remote_store_1.RemoteStore ? store.getCache() : store.getFullData();
        }
        if (options.store) {
            state.store = store;
        }
        state.customized = options.customized;
        return state;
    }
    /**
     * Restore table state by it's cached name.
     * Returns customized data with `{}` as default value if restored successfully,
     * Returns `undefined` if have no cache to restore.
     * Will clear the cache after restored.
     */
    restore(name) {
        let table = this.table;
        let store = this.table.store;
        let state = this.cacheMap.get(name);
        if (!state) {
            state = ff_1.storage.get(this.storagePrefix + name);
            if (!state) {
                return undefined;
            }
        }
        if (state.storeFilter !== undefined) {
            store.setFilter(state.storeFilter);
        }
        if (state.orderName !== undefined && state.orderDirection !== undefined) {
            table.setOrder(state.orderName, state.orderDirection);
        }
        if (state.visibleIndex !== undefined) {
            table.setFirstVisibleIndex(state.visibleIndex);
        }
        if (state.data !== undefined) {
            if (store instanceof remote_store_1.RemoteStore) {
                store.setCache(state.data);
            }
            else {
                store.setFullData(state.data);
            }
        }
        if (state.store) {
            table.store = store;
        }
        store.sync();
        this.clear(name);
        return state.customized;
    }
    /** Clear cache with specified name. */
    clear(name) {
        this.cacheMap.delete(name);
        ff_1.storage.delete(this.storagePrefix + name);
    }
}
exports.TableStateCacher = TableStateCacher;


/***/ }),

/***/ "./src/components/helpers/tree-data-navigator.ts":
/*!*******************************************************!*\
  !*** ./src/components/helpers/tree-data-navigator.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeDataNavigator = void 0;
var TreeDataNavigator;
(function (TreeDataNavigator) {
    function moveArrowUp(data, indices) {
        if (data.length === 0) {
            return [];
        }
        if (indices.length === 0) {
            indices = [0];
        }
        if (correctIndices(data, indices)) {
            return indices;
        }
        // Moves to parent node.
        if (indices[indices.length - 1] <= 0) {
            indices.pop();
            // Move to bottom most if reaches top edge
            if (indices.length === 0) {
                while (true) {
                    let childData = getChildDataByIndices(data, indices);
                    if (childData && childData.length > 0) {
                        indices.push(childData.length - 1);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        // Moves to last available position deep inside previous node.
        else {
            indices[indices.length - 1]--;
            while (true) {
                let childData = getChildDataByIndices(data, indices);
                if (childData && childData.length > 0) {
                    indices.push(childData.length - 1);
                }
                else {
                    break;
                }
            }
        }
        return indices;
    }
    TreeDataNavigator.moveArrowUp = moveArrowUp;
    function moveArrowDown(data, indices) {
        var _a;
        if (data.length === 0) {
            return [];
        }
        if (indices.length === 0) {
            return [0];
        }
        if (correctIndices(data, indices)) {
            return indices;
        }
        // Moves to first child node.
        if ((((_a = getChildDataByIndices(data, indices)) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0) {
            indices.push(0);
        }
        // Moves to next siblings and may be next sibling of parent node.
        else {
            while (indices.length > 0) {
                if (indices[indices.length - 1] < getSiblingsByIndices(data, indices).length - 1) {
                    indices[indices.length - 1]++;
                    break;
                }
                else {
                    indices.pop();
                }
            }
            //Have at least one node in top level, or it will be handled inside `correctIndices`.
            if (indices.length === 0) {
                indices = [0];
            }
        }
        return indices;
    }
    TreeDataNavigator.moveArrowDown = moveArrowDown;
    function moveArrowLeft(data, indices) {
        if (data.length === 0 || indices.length === 0) {
            return [];
        }
        if (indices.length > 0) {
            indices.pop();
        }
        correctIndices(data, indices);
        return indices;
    }
    TreeDataNavigator.moveArrowLeft = moveArrowLeft;
    function moveArrowRight(data, indices) {
        if (data.length === 0 || indices.length === 0) {
            return [];
        }
        indices.push(0);
        correctIndices(data, indices);
        return indices;
    }
    TreeDataNavigator.moveArrowRight = moveArrowRight;
    /** Returns whether corrected it. */
    function correctIndices(data, indices) {
        let corrected = false;
        // No siblings, move to previous in parent siblings.
        // Happens after data changed much.
        while (indices.length > 0) {
            let siblings = getSiblingsByIndices(data, indices);
            if (siblings) {
                let lastIndex = indices[indices.length - 1];
                if (lastIndex >= siblings.length) {
                    indices[indices.length - 1] = siblings.length - 1;
                    corrected = true;
                }
                break;
            }
            else {
                indices.pop();
                corrected = true;
            }
        }
        return corrected;
    }
    TreeDataNavigator.correctIndices = correctIndices;
    function getItemByIndices(data, indices) {
        if (!indices) {
            return undefined;
        }
        let value = undefined;
        let childData = data;
        for (let index of indices) {
            if (!childData) {
                value = undefined;
                break;
            }
            if (index >= 0 && index < childData.length) {
                value = childData[index];
                childData = value.opened ? value.children || null : null;
            }
        }
        return value;
    }
    TreeDataNavigator.getItemByIndices = getItemByIndices;
    function getSiblingsByIndices(data, indices) {
        if (indices.length === 1) {
            return data;
        }
        let value = getItemByIndices(data, indices.slice(0, -1));
        if ((value === null || value === void 0 ? void 0 : value.opened) && (value === null || value === void 0 ? void 0 : value.children)) {
            return value === null || value === void 0 ? void 0 : value.children;
        }
        return null;
    }
    function getChildDataByIndices(data, indices) {
        if (indices.length === 0) {
            return data;
        }
        let value = getItemByIndices(data, indices);
        if (value === null || value === void 0 ? void 0 : value.opened) {
            return value === null || value === void 0 ? void 0 : value.children;
        }
        return null;
    }
})(TreeDataNavigator = exports.TreeDataNavigator || (exports.TreeDataNavigator = {}));


/***/ }),

/***/ "./src/components/icon.ts":
/*!********************************!*\
  !*** ./src/components/icon.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconLoading = exports.Icon = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const icons_1 = __webpack_require__(/*! ../icons/icons */ "./src/icons/icons.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-icon type>` will show a specified type svg icon. */
let Icon = class Icon extends flit_1.Component {
    constructor() {
        super(...arguments);
        /**
         * Icon type.
         * You may extend icons by `icons.add(...)`.
         */
        this.type = '';
    }
    render() {
        let code = icons_1.icons.get(this.type);
        if (!code) {
            return '';
        }
        let [viewBox, inner] = ff_1.subMatches(code, /<svg viewBox="(.+?)">([\s\S]+?)<\/svg>/)[0];
        let [, , w, h] = viewBox.split(' ');
        let width = theme_1.theme.adjust(Number(w));
        let height = theme_1.theme.adjust(Number(h));
        return flit_1.html `
			<template>
				<svg
					viewBox=${viewBox}
					width=${width}
					height=${height}
					:html=${inner}
				></svg>
			</template>
		`;
    }
};
Icon.style = flit_1.css `
	:host{
		display: inline-flex;
		stroke: currentColor;
		fill: none;
		margin: auto 0;
		vertical-align: middle;

		svg{
			margin: auto;
		}
	}
	`;
Icon = __decorate([
    flit_1.define('f-icon')
], Icon);
exports.Icon = Icon;
/**
 * `<f-icon-loading>` will show a specified type svg icon,
 * and make it keep ratate when it's `loading` state is `true`.
 */
let IconLoading = class IconLoading extends Icon {
    constructor() {
        super(...arguments);
        /** Loading icon type. Default value is `loading`. */
        this.type = 'refresh';
        /** Whether in loading state. */
        this.loading = false;
        /**
         * Whether is playing animation.
         * May keep playing for a little while after stop loading.
         */
        this.playing = false;
    }
    onCreated() {
        this.watchImmediately(() => this.loading, (value) => {
            if (value && !this.playing) {
                this.play();
                this.playing = true;
            }
        });
    }
    play() {
        let fn = (value) => {
            this.el.style.transform = `rotate(${value}deg)`;
        };
        // Playing web animation will cause svg icon becomes fuzzy.
        ff_1.animateInterpolatedValue(fn, 0, 360, 1000, 'linear').promise.then(() => {
            if (this.loading) {
                this.play();
            }
            else {
                this.playing = false;
            }
        });
    }
};
IconLoading.style = flit_1.css `
	:host{
		display: inline-flex;
		stroke: currentColor;
		fill: none;
		margin: auto 0;
		vertical-align: top;
		position: relative;
	}`;
IconLoading = __decorate([
    flit_1.define('f-icon-loading')
], IconLoading);
exports.IconLoading = IconLoading;


/***/ }),

/***/ "./src/components/input.ts":
/*!*********************************!*\
  !*** ./src/components/input.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = exports.Input = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const tooltip_1 = __webpack_require__(/*! ../bindings/tooltip */ "./src/bindings/tooltip.ts");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const form_1 = __webpack_require__(/*! ./form */ "./src/components/form.ts");
/**
 * `<f-input>` works just like a `<input type="text">`,
 * you can also set validator to validate it's value, or set customized error message.
 */
let Input = class Input extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** When in composition inputting. */
        this.inCompositionInputting = false;
        /** Input type, same with `<input type=...>`. */
        this.type = 'text';
        /** Whether input was touched, error messages only appear after touched. */
        this.touched = false;
        /** Whether current input is valid, be `null` if not validated yet. */
        this.valid = null;
        /** Placeholder when input is empty. */
        this.placeholder = '';
        /** Current value. */
        this.value = '';
        /** To validate current value, returns an error message or `null` if passes. */
        this.validator = null;
        /** Custom error message. */
        this.error = '';
        /** Whether show error on a tooltip, so it doesn't need to leave a space for error message. */
        this.errorInTooltip = false;
    }
    static style() {
        let { adjust, adjustFontSize, errorColor, borderColor, backgroundColor, mainColor, successColor, focusBlurRadius } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
			background: ${backgroundColor.toMiddle(5)};
			box-shadow: inset 0 -1px 0 0 ${borderColor};
		}

		input, textarea{
			width: 100%;
			height: 100%;
			border: none;
			background: none;
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		input{
			height: 100%;
			padding: 0 0 0 ${adjust(8)}px;
		}

		textarea{
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px ${adjust(8)}px;
		}

		.valid{
			box-shadow: inset 0 -1px 0 0 ${successColor};

			input, textarea{
				padding-right: ${adjust(28)}px;

				&:focus{
					box-shadow: 0 0 ${focusBlurRadius}px ${successColor.alpha(0.5)};
				}
			}
		}

		.invalid{
			box-shadow: inset 0 -1px 0 0 ${errorColor};

			input, textarea{
				padding-right: ${adjust(28)}px;

				&:focus{
					box-shadow: 0 0 ${focusBlurRadius}px ${errorColor.alpha(0.5)};
				}
			}
		}

		.valid-icon{
			position: absolute;
			top: 0;
			bottom: 0;
			right: 6px;
			color: ${successColor};
		}

		.error{
			position: absolute;
			left: 0;
			top: 100%;
			font-size: ${adjustFontSize(13)}px;
			line-height: ${adjust(22)}px;
			color: ${errorColor};
		}
		`;
    }
    onCreated() {
        this.validate();
        let form = flit_1.getClosestComponentOfType(this.el, form_1.Form);
        if (form) {
            form.register(this);
        }
    }
    render() {
        let errorTip = this.errorInTooltip && this.error && this.touched
            ? tooltip_1.tooltip(this.error, { type: 'error' })
            : null;
        return flit_1.html `
			<template
				:class.valid=${this.touched && this.valid}
				:class.invalid=${this.touched && this.valid === false}
			>
				<input type=${this.type}
					.placeholder=${this.placeholder || ''}
					.value=${this.value}
					:ref="input"
					${errorTip}
					@blur=${this.onBlur}
					@compositionstart=${this.onCompositionStart}
					@compositionend=${this.onCompositionEnd}
					@input=${this.onInput}
					@change=${this.onChange}
				/>
				${this.touched && this.valid ? flit_1.html `<f-icon class="valid-icon" .type="checked" />` : ''}
				${this.touched && this.error && !this.errorInTooltip ? flit_1.html `<div class="error">${this.error}</div>` : ''}
			</template>
		`;
    }
    onBlur() {
        this.touched = true;
        // Validate after change event is not enough.
        // We clear error message after input,
        // So may still not valid even though not changed.
        this.validate();
    }
    onCompositionStart() {
        this.inCompositionInputting = true;
    }
    onCompositionEnd() {
        this.inCompositionInputting = false;
        this.onInput();
    }
    onInput() {
        if (this.inCompositionInputting) {
            return;
        }
        let value = this.refs.input.value;
        if (this.validator) {
            this.valid = null;
            this.error = '';
        }
        this.emit('input', value);
    }
    onChange() {
        let input = this.refs.input;
        let value = this.value = input.value;
        this.validate();
        this.emit('change', value, this.valid);
    }
    validate() {
        if (this.validator) {
            this.error = this.validator(this.value);
            this.valid = !this.error;
        }
    }
    /** Set `touched` property. */
    setTouched(touched) {
        this.touched = touched;
    }
};
Input = __decorate([
    flit_1.define('f-input')
], Input);
exports.Input = Input;
/**
 * `<f-textarea>` works just like a `<textarea>`,
 * you can also set validator to validate it's value, or set customized error message.
 */
let Textarea = class Textarea extends Input {
    static style() {
        return flit_1.css `
		:host{
			height: auto;
		}
		`.extends(super.style());
    }
    render() {
        return flit_1.html `
			<textarea
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				:class.valid=${this.touched && this.valid === true}
				:class.invalid=${this.touched && this.valid === false}
				@focus=${this.onBlur}
				@input=${this.onInput}
				@change=${this.onChange}
			/>
		`;
    }
};
Textarea = __decorate([
    flit_1.define('f-textarea')
], Textarea);
exports.Textarea = Textarea;


/***/ }),

/***/ "./src/components/list.ts":
/*!********************************!*\
  !*** ./src/components/list.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const tooltip_1 = __webpack_require__(/*! ../bindings/tooltip */ "./src/bindings/tooltip.ts");
const tree_data_navigator_1 = __webpack_require__(/*! ./helpers/tree-data-navigator */ "./src/components/helpers/tree-data-navigator.ts");
/**
 * `<f-list>` will render data items to a list,
 * and provide single or multiple selection.
 * It shouldn't include too many levels, since it doesn't have overflow setting like `f-tree`.
 */
let List = class List extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Selected indices by keyboard navigation. */
        this.treeNavigationIndices = [];
        /** Whether watching keyboard navigation events. */
        this.watchingKeyBoardNavigation = false;
        /** List type:
         * `selection`: provide single item or multiple items selection with a checkbox icon.
         * `navigation`: provide single item navigation with a vertical line icon.
         * Default value is `selection`.
         */
        this.type = 'selection';
        /**
         * Whether each items selectable, only for type `selection`.
         * Default value is `false`.
         */
        this.selectable = false;
        /**
         * Whether can select multiple items, only for type `selection`.
         * Default value is `false`.
         */
        this.multipleSelect = false;
        /** Input data list. */
        this.data = [];
        /** Indicates current select values. */
        this.selected = [];
        /**
         * Unique active value for `navigation` type.
         * If this value set when initializing, will make the associated item visible.
         * Otherwise you can call `ensureActiveItemVisible()` to do same thing.
         */
        this.active = null;
        /** If specified, when the element get focus, you can use keyboard arrow keys to navigate inside current list. */
        this.navigateFrom = null;
    }
    static style() {
        let { mainColor, adjust, borderColor, adjustFontSize } = theme_1.theme;
        return flit_1.css `
		:host{
			display: block;
			border-bottom: 1px solid ${borderColor.alpha(0.4)};
		}
		
		.option{
			position: relative;
			display: flex;
			padding-top: ${adjust(2)}px;
			padding-bottom: ${adjust(2)}px;
			cursor: pointer;
			border-top: 1px solid ${borderColor.alpha(0.4)};

			&:first-child{
				border-top: none;
			}

			&:hover{
				color: ${mainColor};
			}

			&.selected{
				color: ${mainColor};
			}

			&.active{
				color: ${mainColor};

				&::after{
					content: '';
					position: absolute;
					top: ${adjust(3)}px;
					bottom: ${adjust(3)}px;
					right: 0;
					width: 2px;
					background: ${mainColor.alpha(0.8)};
				}
			}

			&.arrow-selected{
				background-color: ${mainColor.alpha(0.1)};
			}
		}

		.toggle{
			display: flex;
			width: ${adjust(22)}px;
			opacity: 0.7;
		}

		.icon{
			display: flex;
			width: ${adjust(22)}px;
		}

		.text{
			flex: 1;
			min-width: 0;
			padding-right: 4px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.selected-icon{
			margin: 0 ${adjust(6)}px;
		}

		.subsection{
			padding-left: ${adjust(22)}px;
			padding-bottom: ${adjust(4)}px;
			overflow: hidden;
			font-size: ${adjustFontSize(13)}px;

			.option{
				padding-top: 0;
				padding-bottom: 0;
				border-top: none;
				line-height: ${adjust(26)}px;
			}

			.subsection{
				padding-top: 0;
			}

			.subsection:not(:last-child){
				padding-bottom: ${adjust(3)}px;
				margin-bottom: ${adjust(3)}px;
				border-bottom: 1px solid ${borderColor.alpha(0.4)};
			}

			.subsection:last-child{
				padding-bottom: 0;
				margin-bottom: 0;
			}
		}
		`;
    }
    render() {
        return flit_1.html `${this.renderOptions(this.data, this.treeNavigationIndices)}`;
    }
    renderOptions(items, indices) {
        let siblingsHaveIcon = items.some(item => item.icon);
        let siblingsHaveChildren = items.some(item => item.children);
        let options = flit_1.repeat(items, (item, index) => {
            let childIndices = (indices === null || indices === void 0 ? void 0 : indices[0]) === index ? indices.slice(1) : null;
            return this.renderOption(item, siblingsHaveIcon, siblingsHaveChildren, childIndices);
        });
        return options;
    }
    renderOption(item, siblingsHaveIcon, siblingsHaveChildren, indices) {
        let subsection = item.children && item.opened ? flit_1.html `
			<div class="subsection">${this.renderOptions(item.children, indices)}</div>
		` : null;
        let tip = item.tip ? tooltip_1.tooltip(item.tip) : null;
        return flit_1.html `
			<div
				class="option"
				:class=${this.renderClassName(item)}
				:class.arrow-selected=${(indices === null || indices === void 0 ? void 0 : indices.length) === 0}
				@click.prevent=${() => this.onClickOption(item)}
				${tip}

			>
				${item.children ? flit_1.html `
					<div class='toggle' @click.stop=${() => this.toggleOpened(item)}>
						<f-icon .type=${item.opened ? 'triangle-down' : 'triangle-right'} />
					</div>
				` : siblingsHaveChildren ? flit_1.html `
					<div class='toggle' />
				` : ''}

				${siblingsHaveIcon ? flit_1.html `
					<div class='icon'>
						<f-icon .type=${item.icon} />
					</div>
				` : ''}
		
				<div class="text">
					${item.text}
				</div>

				${this.isSelected(item) ? flit_1.html `<f-icon class="selected-icon" .type="checked" />` : ''}
			</div>

			${flit_1.toggle(subsection, { properties: ['height', 'marginBottom', 'paddingBottom', 'opacity'] })}
		`;
    }
    onCreated() {
        if (this.active) {
            this.ensureActiveItemVisible();
        }
    }
    onReady() {
        if (this.navigateFrom) {
            let lastElement = null;
            this.watchImmediately(() => {
                if (typeof this.navigateFrom === 'function') {
                    return this.navigateFrom();
                }
                else {
                    return this.navigateFrom;
                }
            }, navigateFrom => {
                if (navigateFrom) {
                    flit_1.on(navigateFrom, 'keydown', this.moveArrowSelectedByEvent, this);
                    flit_1.on(navigateFrom, 'blur', this.onNavigateFromElementBlur, this);
                }
                else if (lastElement) {
                    flit_1.off(lastElement, 'keydown', this.moveArrowSelectedByEvent, this);
                    flit_1.on(lastElement, 'blur', this.onNavigateFromElementBlur, this);
                }
                lastElement = navigateFrom;
            });
        }
    }
    /** Moves arrow selected by a keyboard event. */
    moveArrowSelectedByEvent(event) {
        if (event.key === 'ArrowUp') {
            this.watchingKeyBoardNavigation = true;
            this.treeNavigationIndices = tree_data_navigator_1.TreeDataNavigator.moveArrowUp(this.data, this.treeNavigationIndices);
        }
        else if (event.key === 'ArrowDown') {
            this.watchingKeyBoardNavigation = true;
            this.treeNavigationIndices = tree_data_navigator_1.TreeDataNavigator.moveArrowDown(this.data, this.treeNavigationIndices);
        }
        else if (event.key === 'ArrowLeft') {
            if (this.watchingKeyBoardNavigation) {
                this.treeNavigationIndices = tree_data_navigator_1.TreeDataNavigator.moveArrowLeft(this.data, this.treeNavigationIndices);
            }
        }
        else if (event.key === 'ArrowRight') {
            if (this.watchingKeyBoardNavigation && this.treeNavigationIndices) {
                let item = tree_data_navigator_1.TreeDataNavigator.getItemByIndices(this.data, this.treeNavigationIndices);
                if (item && !item.opened && item.children) {
                    this.toggleOpened(item);
                    this.treeNavigationIndices = tree_data_navigator_1.TreeDataNavigator.moveArrowRight(this.data, this.treeNavigationIndices);
                }
            }
        }
        else if (event.key === 'Enter') {
            if (this.watchingKeyBoardNavigation && this.treeNavigationIndices) {
                let item = tree_data_navigator_1.TreeDataNavigator.getItemByIndices(this.data, this.treeNavigationIndices);
                if (item) {
                    this.onClickOption(item);
                }
            }
        }
        else {
            this.watchingKeyBoardNavigation = false;
            this.treeNavigationIndices = [];
        }
    }
    onNavigateFromElementBlur() {
        this.watchingKeyBoardNavigation = false;
        this.treeNavigationIndices = [];
    }
    renderClassName(item) {
        if (this.type === 'navigation') {
            if (this.active === item.value) {
                return 'active';
            }
        }
        else {
            if (this.isSelected(item)) {
                return 'selected';
            }
        }
        return '';
    }
    isSelected(item) {
        return this.selected.includes(item.value);
    }
    onClickOption(item) {
        if (this.type === 'navigation') {
            this.active = item.value;
            this.emit('navigate', item.value);
        }
        else if (this.selectable) {
            if (this.multipleSelect) {
                if (this.selected.includes(item.value)) {
                    ff_1.remove(this.selected, item.value);
                }
                else {
                    ff_1.add(this.selected, item.value);
                }
            }
            else {
                this.selected = [item.value];
            }
            this.emit('select', this.selected);
        }
        else {
            this.emit('click', item.value);
        }
    }
    toggleOpened(item) {
        if (item.children) {
            item.opened = !item.opened;
        }
    }
    /** Open sub list recursively to make sure active item becomes visible. */
    ensureActiveItemVisible() {
        if (this.active) {
            this.ensureActiveItemVisibleRecursively(this.data);
        }
    }
    ensureActiveItemVisibleRecursively(items) {
        return items.some(item => {
            if (item.value === this.active) {
                return true;
            }
            if (item.children) {
                let hasActiveChildItem = this.ensureActiveItemVisibleRecursively(item.children);
                if (hasActiveChildItem) {
                    item.opened = true;
                }
            }
            return item.opened;
        });
    }
};
List = __decorate([
    flit_1.define('f-list')
], List);
exports.List = List;


/***/ }),

/***/ "./src/components/loader.ts":
/*!**********************************!*\
  !*** ./src/components/loader.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Loader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-loader>` shows an loading animation to indicate resource is loading. */
let Loader = Loader_1 = class Loader extends flit_1.Component {
    constructor() {
        super(...arguments);
        /**
         * Size of loader, one of `small | medium | large`.
         * Default value is `medium`.
         */
        this.size = 'medium';
        /**
         * Whether work as a cover to cover whole parent.
         * Default value is `false`.
         */
        this.asCover = false;
        /** How many round per second. */
        this.speed = 0.6;
    }
    static style() {
        let { mainColor, backgroundColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			color: ${mainColor};
		}

		.as-cover{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			background: ${backgroundColor.alpha(0.9)};
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		svg{
			margin: auto;
		}

		path{
			stroke: currentColor;
			fill: none;
			stroke-linecap: square;
		}

		.bg{
			stroke-opacity: 0.3;
		}
		`;
    }
    render() {
        let strokeWidth = this.getStrokeWidth();
        let halfWidth = strokeWidth / 2;
        let size = Loader_1.sizes[this.size];
        let d = `M${halfWidth} ${halfWidth} H${size - halfWidth} V${size - halfWidth} H${halfWidth}Z`;
        let dashArray = `${size - strokeWidth} ${(size - strokeWidth) * 3}`;
        return flit_1.html `
			<template
				:class="size-${this.size}"
				:class.as-cover=${this.asCover}
				:style.width.px=${size}
				:style.height.px=${size}
				:style.animation="loader-snake-${this.size} 2s linear infinite"
			>
				<svg viewBox="0 0 ${size} ${size}" width=${size} height=${size}>
					<path class="bg" d=${d} style="stroke-width: ${strokeWidth}" />
					<path :ref="snake" d=${d} style="stroke-width: ${strokeWidth}; stroke-dasharray: ${dashArray};" />
				</svg>
			</template>
		`;
    }
    getStrokeWidth() {
        return Loader_1.strokeWidths[this.size];
    }
    onReady() {
        let strokeWidth = this.getStrokeWidth();
        let size = Loader_1.sizes[this.size];
        this.refs.snake.animate([
            {
                strokeDashoffset: 0,
            },
            {
                strokeDashoffset: -(size - strokeWidth) * 4,
            }
        ], {
            duration: 1000 / this.speed,
            iterations: Infinity
        });
    }
};
Loader.sizes = {
    small: 18,
    medium: 28,
    large: 48,
};
Loader.strokeWidths = {
    small: 3,
    medium: 4,
    large: 5,
};
Loader = Loader_1 = __decorate([
    flit_1.define('f-loader')
], Loader);
exports.Loader = Loader;


/***/ }),

/***/ "./src/components/menu.ts":
/*!********************************!*\
  !*** ./src/components/menu.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const popup_1 = __webpack_require__(/*! ./popup */ "./src/components/popup.ts");
/** `<f-menu>` shows a menu with a list beside it's trigger element. */
let Menu = class Menu extends popup_1.Popup {
    constructor() {
        super(...arguments);
        /** Menu title. */
        this.title = '';
        this.defaultPopupOptions = {
            // `trigger` not work here because when need to handle trigger, current component is not created.
            alignPosition: 'bc',
            fixTriangle: true,
        };
    }
    static style() {
        let { adjust, adjustFontSize, textColor } = theme_1.theme;
        return flit_1.css `
		:host{
			min-width: ${adjust(180)}px;
			max-width: ${adjust(320)}px;
			padding: ${adjust(8)}px ${adjust(16)}px;

			f-list{
				border-bottom: none;
				max-height: 100%;
				overflow-y: auto;
			}
		}

		.triangle{
			left: ${adjust(15)}px;
		}

		.header{
			display: flex;
			line-height: ${adjust(22)}px;
			height: ${adjust(28) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${adjust(16)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		`.extends(super.style());
    }
    render() {
        return flit_1.html `
			<f-popup>	
				${this.renderHead()}
				<slot />
			</f-popup>
		`.extends(super.render());
    }
    renderHead() {
        if (this.title) {
            return flit_1.html `
			<div class="header">
				<div class="title">${this.title}</div>
			</div>
			`;
        }
        return '';
    }
};
Menu = __decorate([
    flit_1.define('f-menu')
], Menu);
exports.Menu = Menu;


/***/ }),

/***/ "./src/components/modal.ts":
/*!*********************************!*\
  !*** ./src/components/modal.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const element_1 = __webpack_require__(/*! ../utils/element */ "./src/utils/element.ts");
/**
 * `<f-modal>` shows content and help to complete a child task in a popup modal.
 *
 * `:slot="action"` - Add action buttons and show them at head.
 */
let Modal = class Modal extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Modal title. */
        this.title = '';
        /** Whether modal opened. */
        this.opened = true;
        /** Where to append current dialog. */
        this.appendTo = 'body';
    }
    static style() {
        let { adjustFontSize, textColor, popupBorderRadius, popupShadowBlurRadius, popupBackgroundColor, popupShadowColor, adjust } = theme_1.theme;
        return flit_1.css `
		:host{
			position: fixed;
			display: flex;
			flex-direction: column;
			z-index: 1000;	// Same with popup
			border-radius: ${popupBorderRadius}px;
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			background: ${popupBackgroundColor};
			max-width: 100%;
			max-height: 100%;
			padding: ${adjust(8)}px ${adjust(16)}px;
			overflow: hidden;
		}

		.mask{
			position: fixed;
			z-index: 1000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}

		.header{
			display: flex;
			flex: none;
			height: ${adjust(34) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
			margin-bottom: ${adjust(8)}px;
		}

		.title{
			flex: 1;
			min-width: 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			margin-top: -${adjust(-6)}px;
			margin-right: ${adjust(-9)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		.actions{
			margin-left: ${adjust(16)}px;

			button{
				margin-left: ${adjust(8)}px;
			}
		}

		.content{
			flex: 1;
			min-height: 0;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			margin-right: ${adjust(-16)}px;
			padding-right: ${adjust(16)}px;
		}
	`;
    }
    render() {
        let shouldRenderClose = !this.slots.action;
        return flit_1.html `
			<template
				tabindex="0"
				${flit_1.show(this.opened, { name: 'fade', enterAtStart: true, onend: this.onTransitionEnd })}
			>
				<div class="mask"
					:ref="mask"
					${flit_1.show(this.opened, { name: 'fade', enterAtStart: true })}
				/>

				<div class="header">
					<div class="title">${this.title}</div>

					<div class="actions" :show=${this.slots.action}>
						<slot name="action" />
					</div>

					${shouldRenderClose ? flit_1.html `
						<div class="close" @click=${this.hide}>
							<f-icon .type="close" />
						</div>
					` : ''}
				</div>

				<div class="content">
					<slot />
				</div>
			</template>
		`;
    }
    onTransitionEnd(type, finish) {
        if (type === 'leave' && finish) {
            this.el.remove();
            this.onTransitionLeaveEnd();
        }
    }
    onTransitionLeaveEnd() { }
    onConnected() {
        flit_1.untilRenderComplete().then(() => {
            if (this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
                this.el.before(this.refs.mask);
            }
            this.align();
            flit_1.on(window, 'resize', this.onWindowResize, this);
            let unwatch = ff_1.watchLayout(this.el, 'size', () => this.align());
            this.once('disconnected', unwatch);
        });
    }
    onDisconnected() {
        if (this.refs.mask) {
            this.refs.mask.remove();
        }
        flit_1.off(window, 'resize', this.onWindowResize, this);
    }
    onWindowResize() {
        if (this.opened) {
            this.align();
        }
    }
    align() {
        ff_1.align(this.el, document.documentElement, 'c');
    }
    /**
     * To show the modal, you may `renderComponent` and then call `show()` or append to `body`.
     * If you want render modal as a child element  and append into document automatically,
     * just call `show` in `onConnected`.
     */
    show() {
        this.opened = true;
        if (this.appendTo) {
            element_1.appendTo(this.el, this.appendTo);
        }
    }
    hide() {
        this.opened = false;
    }
};
Modal = __decorate([
    flit_1.define('f-modal')
], Modal);
exports.Modal = Modal;


/***/ }),

/***/ "./src/components/navigation.ts":
/*!**************************************!*\
  !*** ./src/components/navigation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const list_1 = __webpack_require__(/*! ./list */ "./src/components/list.ts");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-navigation>` can navigate to different pages within a navigation tree. */
let Navigation = class Navigation extends list_1.List {
    constructor() {
        super(...arguments);
        /** Type, always be `navigation`. */
        this.type = 'navigation';
        /** Navigation title. */
        this.title = '';
    }
    static style() {
        let { backgroundColor, adjust, adjustFontSize } = theme_1.theme;
        return flit_1.css `
		:host{
			padding: ${adjust(8)}px ${adjust(16)}px;
			border-bottom: none;
			background: ${backgroundColor.toMiddle(9)};
			overflow-y: auto;
		}

		.title{
			font-size: ${adjustFontSize(18)}px;
			font-weight: 300;
			margin-top: ${adjust(4)}px;
			margin-bottom: ${adjust(8)}px;
		}

		`.extends(super.style());
    }
    render() {
        return flit_1.html `
			<tempalte>
				${this.title ? flit_1.html `
				<div class="title">
					${this.title}
				</div>` : ''}

				${this.renderOptions(this.data, this.treeNavigationIndices)}
			</tempalte>
		`;
    }
};
Navigation = __decorate([
    flit_1.define('f-navigation')
], Navigation);
exports.Navigation = Navigation;


/***/ }),

/***/ "./src/components/notification.ts":
/*!****************************************!*\
  !*** ./src/components/notification.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = exports.UniqueNotification = exports.QuickNotification = exports.Notification = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const element_1 = __webpack_require__(/*! ../utils/element */ "./src/utils/element.ts");
/** `<f-notification>` helps to show a notification list to notify some info. */
let Notification = class Notification extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.seed = 1;
        this.items = [];
        /** Where to append notification list. */
        this.appendTo = 'body';
    }
    static style() {
        let { infoColor, adjust, successColor, errorColor, warningColor, popupBorderRadius, popupShadowBlurRadius, adjustFontSize, backgroundColor, textColor, popupShadowColor } = theme_1.theme;
        let types = [
            ['info', infoColor],
            ['warning', warningColor],
            ['error', errorColor],
            ['success', successColor]
        ];
        return flit_1.css `
		:host{
			position: fixed;
			right: ${adjust(12)}px;
			bottom: ${adjust(12)}px;
			min-width: ${adjust(280)}px;
			max-width: ${adjust(480)}px;
			z-index: 1100;	// Higher than tooltip, dialog, ...
			font-size: ${adjustFontSize(13)}px;
		}

		.item{
			position: relative;
			display: flex;
			margin-top: ${adjust(12)}px;
			background: ${backgroundColor};
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			cursor: pointer;
			overflow: hidden;
			border-radius: ${popupBorderRadius}px;
		}

		.stripe{
			width: 4px;
		}

		.left{
			padding: ${adjust(16)}px ${adjust(14)}px ${adjust(16)}px ${adjust(16)}px;
		}

		.type-icon{
			display: block;
			width: ${adjust(20)}px;
			height: ${adjust(20)}px;

			svg{
				width: ${adjust(20)}px;
				height: ${adjust(20)}px;
			}
		}

		.content{
			flex: 1;
			min-width: 0;
			padding: ${adjust(16)}px ${adjust(16)}px ${adjust(8)}px 0;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			color: ${textColor};

			f-icon{
				margin: auto;
			}

			&:hover{
				color: ${textColor.toMiddle(10)};
			}

			&:active{
				transform: translateY(1px);
			}
		}

		.title{
			font-weight: bold;
			line-height: ${adjust(20)}px;
			margin-bottom: ${adjust(4)}px;
		}

		.message{
			flex: 1;
			min-width: 0;
			line-height: ${adjust(20)}px;
			margin-bottom: ${adjust(4)}px;
			text-align: left;
			word-wrap: break-word;

			a{
				font-weight: bold;
			}
		}

		.list{
			margin: ${adjust(8)}px 0;
			line-height: ${adjust(20)}px;
			list-style-type: square;
			padding-left: ${adjust(28)}px;
		}

		.actions{
			margin-top: ${adjust(8)}px;
		}

		.action{
			margin-right: ${adjust(6)}px;
			height: ${adjust(22)}px;
			line-height: ${20}px;
			padding: 0 ${adjust(8)}px;
		}

		${types.map(([type, color]) => flit_1.css `
			.type-${type}{
				&:hover{
					background: ${color.mix(backgroundColor, 95)};
				}

				.stripe{
					background: ${color};
				}
			}
		`)}
		`;
    }
    render() {
        return flit_1.repeat(this.items, (item) => flit_1.html `<div class="item"
				:class="type-${item.type}"
				@mouseenter=${() => this.onMouseEnter(item)}
				@mouseleave=${() => this.onMouseLeave(item)}
			>
				<div class="stripe" />

				<div class="left">
					<f-icon class="type-icon" .type=${item.type} />
				</div>

				<div class="content">
					${item.title ? flit_1.html `<div class="title">${item.title}</div>` : ''}

					<div class="message">${item.message}</div>
					
					${item.list && item.list.length > 0 ? flit_1.html `
						<ul class="list">
							${item.list.map(text => flit_1.html `<li>${text}</li>`)}
						</ul>
					` : ''}

					${this.renderActions(item)}
				</div>

				<div class="close" @click=${() => this.onClickClose(item)}>
					<f-icon .type="close" />
				</div>
			</div>`, { name: 'fade', enterAtStart: true, onend: this.onTransitionEnd });
    }
    renderActions(item) {
        let actions = item.actions;
        if (actions && actions.length > 0) {
            let results = actions.map(action => flit_1.html `
				<button class="action"
					?primary=${action.primary}
					@click=${() => this.onClickActionButton(action, item)}>
					${action.text}
				</button>
			`);
            return flit_1.html `<div class="actions">${results}</div>`;
        }
        return '';
    }
    onClickActionButton(action, item) {
        if (action.handler) {
            action.handler();
        }
        this.hide(item.id);
    }
    onMouseEnter(item) {
        item.hover = true;
    }
    onMouseLeave(item) {
        item.hover = false;
        if (!item.timeout) {
            this.hideLater(item);
        }
    }
    onClickClose(item) {
        this.hide(item.id);
    }
    onTransitionEnd(type) {
        if (type === 'leave' && this.items.length === 0) {
            this.el.remove();
        }
    }
    /** Shows a notification and returns it's list. */
    show(options) {
        if (options.id) {
            let item = this.items.find(v => v.id === options.id);
            if (item) {
                Object.assign(item, options);
                this.hideLater(item);
                return options.id;
            }
        }
        let item = {
            id: this.seed++,
            ...options,
            hover: false,
            timeout: null,
        };
        this.items.unshift(item);
        this.hideLater(item);
        if (this.items.length === 1 && this.appendTo) {
            element_1.appendTo(this.el, this.appendTo);
        }
        return item.id;
    }
    hideLater(item) {
        if (item.timeout) {
            item.timeout.cancel();
        }
        item.timeout = new ff_1.Timeout(() => {
            item.timeout = null;
            if (!item.hover) {
                this.hide(item.id);
            }
        }, item.hideDelay || 5000);
    }
    /** Hide notification by it's id. */
    hide(id) {
        let item = this.items.find(v => v.id === id);
        if (item) {
            ff_1.remove(this.items, item);
            return true;
        }
        else {
            return false;
        }
    }
    /** Hide all notifications. */
    hideAll() {
        this.items = [];
        if (this.items.length === 0) {
            this.el.remove();
        }
    }
};
Notification = __decorate([
    flit_1.define('f-notification')
], Notification);
exports.Notification = Notification;
/** Class to manage a notification list. */
class QuickNotification {
    constructor() {
        this.noti = null;
    }
    /** Returns a unique notification instance, all notification calls will share a unique notification item. */
    unique() {
        return new UniqueNotification(this);
    }
    showNotification(options) {
        if (!this.noti) {
            this.noti = flit_1.getRenderedAsComponent(flit_1.render(flit_1.html `<f-notification />`));
        }
        return this.noti.show(options);
    }
    /** Shows info type notification, returns it's id. */
    info(message, options = {}) {
        options.type = 'info';
        options.message = message;
        return this.showNotification(options);
    }
    /** Shows warn type notification, returns it's id. */
    warn(message, options = {}) {
        options.type = 'warning';
        options.message = message;
        return this.showNotification(options);
    }
    /** Shows error type notification, returns it's id. */
    error(message, options = {}) {
        options.type = 'error';
        options.message = message;
        return this.showNotification(options);
    }
    /** Shows success type notification, returns it's id. */
    success(message, options = {}) {
        options.type = 'success';
        options.message = message;
        return this.showNotification(options);
    }
    /** Hide notification by it's id. */
    hide(id) {
        return this.noti.hide(id);
    }
    /** Hide all notifications. */
    hideAll() {
        this.noti.hideAll();
    }
}
exports.QuickNotification = QuickNotification;
/** All notification calls will share a unique notification item. */
class UniqueNotification {
    constructor(raw) {
        this.id = null;
        this.raw = raw;
    }
    overwriteNotificationId(options) {
        if (this.id) {
            options.id = this.id;
        }
    }
    /** Shows info type notification, returns it's id. */
    info(message, options = {}) {
        this.overwriteNotificationId(options);
        return this.id = this.raw.info(message, options);
    }
    /** Shows warn type notification, returns it's id. */
    warn(message, options = {}) {
        this.overwriteNotificationId(options);
        return this.id = this.raw.warn(message, options);
    }
    /** Shows error type notification, returns it's id. */
    error(message, options = {}) {
        this.overwriteNotificationId(options);
        return this.id = this.raw.error(message, options);
    }
    /** Shows success type notification, returns it's id. */
    success(message, options = {}) {
        this.overwriteNotificationId(options);
        return this.id = this.raw.success(message, options);
    }
    /** Hide current notification. */
    hide() {
        if (this.id) {
            return this.raw.hide(this.id);
        }
        else {
            return false;
        }
    }
}
exports.UniqueNotification = UniqueNotification;
/** A quick global API to show notifications. */
exports.notification = new QuickNotification();


/***/ }),

/***/ "./src/components/popover.ts":
/*!***********************************!*\
  !*** ./src/components/popover.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const popup_1 = __webpack_require__(/*! ./popup */ "./src/components/popup.ts");
/**
 * `<f-popover>` shows content message in a popup beside it's trigger element.
 *
 * `:slot=action` - Add action buttons and show them at head.
 */
let Popover = class Popover extends popup_1.Popup {
    constructor() {
        super(...arguments);
        /** Popover title. */
        this.title = '';
        /** Whether shows a close icon to quickly close current popover. */
        this.closable = false;
        this.defaultPopupOptions = {
            // `trigger` not work here because when need to handle trigger, current component is not created.
            alignPosition: 'bc',
            fixTriangle: true,
        };
    }
    static style() {
        let { adjust, adjustFontSize, textColor } = theme_1.theme;
        return flit_1.css `
		:host{
			padding: ${adjust(8)}px ${adjust(16)}px;
			min-width: ${adjust(240)}px;
			max-width: ${adjust(400)}px;
		}

		.triangle{
			left: ${adjust(12)}px;
		}

		.header{
			display: flex;
			line-height: ${adjust(22)}px;
			height: ${adjust(28) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
			margin-bottom: ${adjust(8)}px;
		}

		.title{
			flex: 1;
			min-width: 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			margin-top: ${adjust(-6)}px;
			margin-right: ${adjust(-9)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		.actions{
			margin-left: ${adjust(15)}px;

			button{
				margin-left: ${adjust(6)}px;
				height: ${adjust(22)}px;
				line-height: ${20}px;
				padding: 0 ${adjust(8)}px;
			}
		}

		.content{
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px 0;
		}
		`.extends(super.style());
    }
    render() {
        return flit_1.html `
			<template>	
				${this.renderHead()}
				<div class="content"><slot /></div>
			</template>
		`.extends(super.render());
    }
    renderHead() {
        if (this.title) {
            let shouldRenderClose = this.closable && !this.slots.action;
            return flit_1.html `
			<div class="header">
				<div class="title">${this.title}</div>

				<div class="actions" :show=${this.slots.action}>
					<slot name="action" />
				</div>

				${shouldRenderClose ? flit_1.html `
					<div class="close" @click=${this.close}>
						<f-icon .type="close" />
					</div>
				` : ''}
			</div>
			`;
        }
        return '';
    }
};
Popover = __decorate([
    flit_1.define('f-popover')
], Popover);
exports.Popover = Popover;


/***/ }),

/***/ "./src/components/popup.ts":
/*!*********************************!*\
  !*** ./src/components/popup.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const element_1 = __webpack_require__(/*! ../utils/element */ "./src/utils/element.ts");
/** `<f-popup>` is the container for popup content. */
let Popup = class Popup extends flit_1.Component {
    constructor() {
        super(...arguments);
        /**
         * Options to overwrite default popup binding to control default alignment.
         * Will be overwritten by options passed to `popup(...)`.
         */
        this.defaultPopupOptions = null;
        this.binding = null;
        /** Show triangle element in herizontal order - left or right position. */
        this.herizontal = false;
        /** Whether shows triangle element. */
        this.triangle = true;
        /** Where to append current popup. */
        this.appendTo = 'body';
    }
    static style() {
        let { popupBorderRadius, popupBackgroundColor, popupShadowBlurRadius, popupShadowColor, adjust } = theme_1.theme;
        let w = adjust(10);
        let h = adjust(7);
        let x = adjust(11);
        return flit_1.css `
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: ${popupBackgroundColor};
			border-radius: ${popupBorderRadius}px;
			filter: drop-shadow(0 0 ${popupShadowBlurRadius / 2}px ${popupShadowColor});	// 3px nearly equals 6px in box-shadow.
		}

		.triangle{
			// Must be the styles in top position
			position: absolute;
			border-left: ${w / 2}px solid transparent;
			border-right: ${w / 2}px solid transparent;
			border-bottom: ${h}px solid ${popupBackgroundColor};
			top: -${h}px;
			left: ${x}px;	// 11 + 5 = 16

			&-herizontal{
				border-top: ${w / 2}px solid transparent;
				border-bottom: ${w / 2}px solid transparent;
				border-right: ${h}px solid ${popupBackgroundColor};
				border-left: 0;
				top: ${x}px;
				left: -${h}px;
			}
		}
		`;
    }
    render() {
        return flit_1.html `
			<template tabindex="0">
				${this.triangle ? flit_1.html `
					<div class="triangle" :ref="triangle" :class.triangle-herizontal=${this.herizontal} />
				` : ''}
				<slot />
			</template>
		`;
    }
    // Call `update` every time after restored from `cache(...)`.
    onConnected() {
        // Why render `<popup>` to body?
        // It's very common that the `el` is covered or clipped,
        // which will cause the `<popup>` is not fully visible.
        // You can still render the `<popup>` in the same scroller with `<popup>`.
        // Why inserted into body every time?
        // Most popups share same `z-index`, append newly opened `<popup>` will makesure it covers others.
        // Note that:
        // The template `content` can't pass into `<popup>` as an argument,
        // it will cause the template was parsed in `<popup>` context.
        // The `<popup>` will be cached in `<popup>`, and element will be removed when not in use.
        // After restored from `cache`, it will be inserted back into `<popup>`.
        // So here we need to move it to `body` after every time rendered.
        // If there are serval nodes which belong to an template you need to append into another element,
        // Don't forget to move the anchor nodes, or the whole template nodes into the target element,
        // or they will can't be removed because they are outside of the template node ranges.
        // In the future, we may implement a flit directive `renderTo(..., ...)`, 
        // to render elements and it's anchor node to another element.
        this.applyAppendTo();
    }
    /** Insert popup element into target specified by `appendTo`. */
    applyAppendTo() {
        if (this.appendTo) {
            element_1.appendTo(this.el, this.appendTo);
        }
    }
    /** Set related popup binding. */
    setBinding(binding) {
        this.binding = binding;
    }
    /** Close popup content, may play leave transition. */
    close() {
        if (this.binding) {
            this.binding.hidePopupLater();
        }
        else {
            this.el.remove();
        }
    }
    /** Get the trigger element. */
    getTriggerElement() {
        var _a;
        return ((_a = this.binding) === null || _a === void 0 ? void 0 : _a.getTriggerElement()) || null;
    }
};
Popup = __decorate([
    flit_1.define('f-popup')
], Popup);
exports.Popup = Popup;


/***/ }),

/***/ "./src/components/progress.ts":
/*!************************************!*\
  !*** ./src/components/progress.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const tooltip_1 = __webpack_require__(/*! ../bindings/tooltip */ "./src/bindings/tooltip.ts");
/** `<f-progress>` gives a progress notification in percentage, just like `<input type=progress>`. */
let Progress = class Progress extends flit_1.Component {
    constructor() {
        super(...arguments);
        /**
         * Progress value betweens 0~1.
         * Defult value is `0`.
         */
        this.value = 0;
        /**
         * Fixed decimal count of progress text.
         * Defult value is `null`.
         */
        this.decimalCount = null;
    }
    static style() {
        let { mainColor, adjust, adjustFontSize } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
		}

		.groove{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			height: 1px;
			margin: auto 0;
			background: ${mainColor.alpha(0.2)};
		}

		.progress{
			height: 100%;
			background: ${mainColor};
		}

		.tooltip{
			font-family: consolas;
			font-size: ${adjustFontSize(14)}px;
		}
		`;
    }
    render() {
        let tip = tooltip_1.tooltip(this.renderTooltipValue(), {
            alignTo: () => this.refs.progress,
            alignPosition: 'bc-tr',
            alignMargin: [8, 0],
        });
        return flit_1.html `
			<template ${tip}>
				<div class="groove">
					<div class="progress" :ref="progress" :style.width.percent=${Math.min(this.value, 1) * 100}></div>
				</div>
			</template>
		`;
    }
    renderTooltipValue() {
        let tipValue = (Math.min(this.value, 1) * 100);
        let tipText = tipValue.toString();
        if (this.decimalCount !== null) {
            tipText = tipValue.toFixed(this.decimalCount);
        }
        tipText += '%';
        return flit_1.html `<span class="${this.scopeClassName('tooltip')}">${tipText}</span>`;
    }
};
Progress = __decorate([
    flit_1.define('f-progress')
], Progress);
exports.Progress = Progress;


/***/ }),

/***/ "./src/components/radio.ts":
/*!*********************************!*\
  !*** ./src/components/radio.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = exports.RadioGroup = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-radiogroup>` can contain several `<f-radio>` elements as it's child radios. */
let RadioGroup = class RadioGroup extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** All child `<f-checkbox>`. */
        this.radios = [];
        /** Current value, child radio which have same value will be checked. */
        this.value = null;
    }
    /** Retister a child radio. */
    register(radio) {
        this.radios.push(radio);
        radio.on('change', this.onRadioChange.bind(this, radio));
    }
    onRadioChange(changedRadio) {
        for (let radio of this.radios) {
            if (radio !== changedRadio) {
                radio.checked = false;
            }
        }
        this.value = changedRadio.value;
        this.emit('change', this.value);
    }
};
RadioGroup = __decorate([
    flit_1.define('f-radiogroup')
], RadioGroup);
exports.RadioGroup = RadioGroup;
/** `<f-radio>` just like `<input type=radio>`, you can click to check one radio in a radio group. */
let Radio = class Radio extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.radioGroup = null;
        /** Whether the radio was checked. */
        this.checked = false;
        /** If having a parent `<f-radiogroup>`, the `value` property will be assign to it after current ratio checked. */
        this.value = null;
    }
    static style() {
        let { mainColor, adjust, focusBlurRadius } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			align-items: center;
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&:focus{
				color: ${mainColor};

				.icon{
					box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
				}
			}
		}

		.icon{
			position: relative;
			top: -2px;
			border-radius: 50%;
			margin-right: ${adjust(6)}px;
		}

		.checked{
			color: ${mainColor};
		}
	
		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`;
    }
    onCreated() {
        let group = flit_1.getClosestComponentOfType(this.el, RadioGroup);
        if (group) {
            this.radioGroup = group;
            this.checked = this.radioGroup.value == this.value;
            this.radioGroup.register(this);
        }
    }
    render() {
        return flit_1.html `
			<template
				tabindex="0"
				:class.checked=${this.checked}
				@click=${this.onClick}
				@focus=${this.onFocus}
			>
				<f-icon class="icon" .type=${this.checked ? 'radio-checked' : 'radio-unchecked'} />
				<div class="label">
					<slot />
				</div>
			</template>
		`;
    }
    onClick() {
        if (!this.checked) {
            this.checked = true;
            this.emit('change', true);
        }
    }
    onFocus() {
        if (!this.checked) {
            flit_1.once(this.el, 'blur', this.onBlur, this);
            flit_1.once(document, 'keydown.enter', this.onEnter, this);
        }
    }
    onBlur() {
        flit_1.off(document, 'keydown', this.onEnter, this);
    }
    onEnter() {
        this.onClick();
    }
};
Radio = __decorate([
    flit_1.define('f-radio')
], Radio);
exports.Radio = Radio;


/***/ }),

/***/ "./src/components/resizer.ts":
/*!***********************************!*\
  !*** ./src/components/resizer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resizer = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
/** `<f-resizer>` should an absolute type resizer bar, drag it will */
let Resizer = class Resizer extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Which position should align resizer relative to parent. */
        this.position = 'right';
        /** Resizing speed rate, set it to `2` if element aligns to center, and moves 1px will cause 2px increases. */
        this.rate = 1;
        /** Minimum size of parent. */
        this.min = 0;
        /** Maximum size of parent. */
        this.max = Infinity;
        /** Current size of parent. */
        this.size = -1;
    }
    static style() {
        return flit_1.css `
		:host{
			position: absolute;
			z-index: 100;
		}

		.top{
			width: 100%;
			height: 10px;
			top: -5px;
			left: 0;
			cursor: ns-resize;
		}

		.bottom{
			width: 100%;
			height: 10px;
			bottom: -5px;
			left: 0;
			cursor: ns-resize;
		}

		.left{
			width: 10px;
			height: 100%;
			top: 0;
			left: -5px;
			cursor: ew-resize;
		}

		.right{
			width: 10px;
			height: 100%;
			top: 0;
			right: -5px;
			cursor: ew-resize;
		}

		.resizing-mask{
			position: fixed;
			z-index: 9999;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			&.herizontal{
				cursor: ew-resize;
			}

			&.vertical{
				cursor: ns-resize;
			}
		}
		`;
    }
    render() {
        return flit_1.html `
			<template
				:class=${this.position}
				@mousedown=${this.onStartResize}
			></template>
		`;
    }
    onReady() {
        if (ff_1.getStyleValue(this.el.parentElement, 'position') === 'static') {
            throw new Error('Parent of "<f-resizer>" must can\'t have an "static" position');
        }
    }
    onStartResize(e) {
        let startX = e.clientX;
        let startY = e.clientY;
        let startParentWidth = this.el.parentElement.offsetWidth;
        let startParentHeight = this.el.parentElement.offsetHeight;
        let onMouseMove = (e) => {
            e.preventDefault();
            this.resize(startParentWidth, startParentHeight, e.clientX - startX, e.clientY - startY);
        };
        let onMouseUp = () => {
            flit_1.off(document, 'mousemove', onMouseMove);
            cursorMask.remove();
            this.emit('change', this.size);
        };
        let cursorMask = flit_1.render(flit_1.html `
			<div class="resizing-mask" class="${this.position === 'left' || this.position === 'right' ? 'herizontal' : 'vertical'}" />
		`, this).getFirstElement();
        document.body.append(cursorMask);
        flit_1.on(document, 'mousemove', onMouseMove);
        flit_1.once(document, 'mouseup', onMouseUp);
    }
    resize(startParentWidth, startParentHeight, movementX, movementY) {
        let value;
        if (this.position === 'top' || this.position === 'bottom') {
            let flag = this.position === 'bottom' ? 1 : -1;
            value = startParentHeight + flag * movementY * this.rate;
            value = ff_1.constrain(value, this.min, this.max);
            this.el.parentElement.style.height = value + 'px';
        }
        else {
            let flag = this.position === 'right' ? 1 : -1;
            value = startParentWidth + flag * movementX * this.rate;
            value = ff_1.constrain(value, this.min, this.max);
            this.el.parentElement.style.width = value + 'px';
        }
        this.size = value;
        this.emit('change', this.size);
    }
};
Resizer = __decorate([
    flit_1.define('f-resizer')
], Resizer);
exports.Resizer = Resizer;


/***/ }),

/***/ "./src/components/router.ts":
/*!**********************************!*\
  !*** ./src/components/router.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
/**
 * `<f-router>` can be used as a top container to contains everything that should be routed,
 * Which means choose to be rendered depends on whether current path match.
 * You will need initialize start path by `this.goto(this.getUnPrefixedPath(location.pathname))`.
 *
 * ```ts
 * render() {
 *     this.route('/user:id', ({id}) => {
 *         return html`User Id: ${id}`
 *     })
 * }
 * ```
 */
let Router = class Router extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** A prefix will be added to current location, but will be removed from router path. */
        this.prefix = '';
        /** Current path, no matter normal path or popup path. */
        this.path = '';
        /** Normal not popup type path. */
        this.normalPath = '';
        /** Popup path come from `goto(..., true)`. */
        this.popupPath = null;
        /** Stacked popup count. */
        this.stackedPopupCount = 0;
    }
    onCreated() {
        flit_1.on(window, 'popstate', this.onWindowStateChange, this);
    }
    /** Get relative path for router from a uri. */
    getPathFromUri(uri) {
        let path = new URL(uri).pathname;
        return this.getUnPrefixedPath(path);
    }
    /** Get relative path for router from a uri. */
    getUnPrefixedPath(path) {
        if (this.prefix && path.startsWith(this.prefix)) {
            path = path.slice(this.prefix.length);
        }
        if (!path) {
            path = '/';
        }
        return path;
    }
    onDisconnected() {
        flit_1.off(window, 'popstate', this.onWindowStateChange, this);
    }
    onWindowStateChange(e) {
        if (e.state) {
            this.redirectTo(e.state.path, e.state.asPopupPath);
        }
    }
    route(routePath, renderFn, options = {}) {
        if (this.isMatch(routePath)) {
            if (options.title) {
                document.title = options.title;
            }
            let result = this.matchPath(routePath);
            if (routePath instanceof RegExp) {
                return renderFn(result === null || result === void 0 ? void 0 : result.captures);
            }
            else {
                return renderFn(result === null || result === void 0 ? void 0 : result.params);
            }
        }
        else {
            return '';
        }
    }
    /** Returns whether current path matches router path. */
    isMatch(routePath) {
        return PathParser.isMatch(this.normalPath, routePath)
            || !!(this.popupPath && PathParser.isMatch(this.popupPath, routePath));
    }
    /** Match current path with router path, returns match parameters and captures. */
    matchPath(routePath) {
        if (PathParser.isMatch(this.normalPath, routePath)) {
            return PathParser.matchPath(this.normalPath, routePath);
        }
        else if (this.popupPath && PathParser.isMatch(this.popupPath, routePath)) {
            return PathParser.matchPath(this.popupPath, routePath);
        }
        else {
            return null;
        }
    }
    /**
     * Goto a new path and update render result, add a history state.
     * If `asPopupPath` is `true`, can update current path and also keep last rendering.
     */
    goto(path, asPopupPath = false) {
        if (asPopupPath && path === this.popupPath) {
            return;
        }
        if (!asPopupPath && path === this.normalPath) {
            return;
        }
        if (asPopupPath) {
            this.popupPath = path;
            this.stackedPopupCount++;
        }
        else {
            this.clearPopupStack();
            this.normalPath = path;
        }
        this.path = path;
        let uri = this.getURIFromPath(path);
        history.pushState({ path, asPopupPath }, '', uri);
        this.emit('goto', path, asPopupPath);
    }
    /**
     * Redirect to a new path and update render result, replace current history state.
     * If `asPopupPath` is `true`, can update current path and also keep last rendering.
     */
    redirectTo(path, asPopupPath = false) {
        if (asPopupPath && path === this.popupPath) {
            return;
        }
        if (!asPopupPath && path === this.normalPath) {
            return;
        }
        if (asPopupPath) {
            this.popupPath = path;
            this.stackedPopupCount++;
        }
        else {
            this.clearPopupStack();
            this.normalPath = path;
        }
        this.path = path;
        let uri = this.getURIFromPath(path);
        history.replaceState({ path, asPopupPath }, '', uri);
        this.emit('redirectTo', path, asPopupPath);
    }
    /**
     * Clear all popup states and pop last non-popup state.
     * Must call before set current path.
     */
    clearPopupStack() {
        if (this.popupPath) {
            history.go(-this.stackedPopupCount);
            this.stackedPopupCount = 0;
            this.popupPath = null;
        }
    }
    /** Get whole url. */
    getURIFromPath(path) {
        if (!path) {
            path = '/';
        }
        if (this.prefix) {
            path = this.prefix + path;
        }
        return path;
    }
};
Router = __decorate([
    flit_1.define('f-router')
], Router);
exports.Router = Router;
var PathParser;
(function (PathParser) {
    const pathParsedResultMap = new Map();
    function isMatch(path, routePath) {
        let re;
        if (typeof routePath === 'string') {
            re = ensureParsedResult(routePath).re;
        }
        else {
            re = routePath;
        }
        return re.test(path);
    }
    PathParser.isMatch = isMatch;
    function ensureParsedResult(routePath) {
        if (pathParsedResultMap.has(routePath)) {
            return pathParsedResultMap.get(routePath);
        }
        else {
            return parsePath(routePath);
        }
    }
    function matchPath(path, routePath) {
        let params = {};
        let captures = [];
        if (typeof routePath === 'string') {
            let { re, keys } = ensureParsedResult(routePath);
            let m = path.match(re);
            if (!m) {
                return null;
            }
            if (keys) {
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    params[key] = m[i + 1];
                }
            }
        }
        else {
            let m = path.match(routePath);
            if (!m) {
                return null;
            }
            captures = [...m];
        }
        return {
            params,
            captures,
        };
    }
    PathParser.matchPath = matchPath;
    function parsePath(routePath) {
        let keys = [];
        let re = new RegExp(routePath
            .replace(/\./g, '\\.')
            .replace(/\*/g, '.*?')
            .replace(/(\/):(\w+)/g, function (_m0, slash, property) {
            if (property) {
                keys.push(property);
            }
            return slash + '([\\w-]+)';
        })
            .replace(/^/, '^')
            .replace(/$/, '$'), 'i');
        let parsed = { re, keys };
        pathParsedResultMap.set(routePath, parsed);
        return parsed;
    }
})(PathParser || (PathParser = {}));


/***/ }),

/***/ "./src/components/search.ts":
/*!**********************************!*\
  !*** ./src/components/search.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/**
 * `<f-search>` can be inputted text to do searching.
 * Now only a input, will extend to list suggestted local or remote data in future.
 */
let Search = class Search extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Whether search input get focus. */
        this.focused = false;
        /** When in composition inputting. */
        this.inCompositionInputting = false;
        /**
         * Whether update value after change event.
         * If is `false`, update value after input event.
         */
        this.lazy = true;
        /** Search input placeholder. */
        this.placeholder = '';
        /** Current inputted value. */
        this.value = '';
    }
    static style() {
        let { adjust, borderColor, borderRadius, mainColor, focusBlurRadius, lineHeight } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
		}

		input{
			width: 100%;
			border: none;
			background: none;
			height: ${adjust(28)}px;
			padding: 0 ${adjust(lineHeight - 2)}px 0 ${adjust(lineHeight - 2)}px;
			line-height: ${lineHeight - 2}px;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			
			&:focus{
				border-color: ${mainColor};
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		.search-icon{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 8px;
			color: ${borderColor.toMiddle(10)};
		}

		.clear{
			display: flex;
			position: absolute;
			width: ${adjust(28)}px;
			top: 0;
			bottom: 0;
			right: 0px;
			color: ${borderColor.toMiddle(10)};
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&:active{
				transform: translateY(1px);
			}
		}

		.close-icon{
			margin: auto;
		}
		`;
    }
    render() {
        return flit_1.html `
			<f-icon class="search-icon" .type="search" />

			<input type="text"
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				@focus=${this.onFocus}
			/>

			${this.value
            ? flit_1.html `
					<div class="clear" @click.stop=${this.clear}>
						<f-icon class="close-icon" .type="close" />
					</div>`
            : ''}
		`;
    }
    onReady() {
        if (this.lazy) {
            flit_1.on(this.refs.input, 'change', this.onChange, this);
        }
        else {
            flit_1.on(this.refs.input, 'compositionstart', this.onCompositionStart, this);
            flit_1.on(this.refs.input, 'compositionend', this.onCompositionEnd, this);
            flit_1.on(this.refs.input, 'input', this.onInput, this);
        }
    }
    onFocus() {
        this.focused = true;
        flit_1.once(this.refs.input, 'blur', () => this.focused = false);
    }
    onChange() {
        this.updateValue();
    }
    onCompositionStart() {
        this.inCompositionInputting = true;
    }
    onCompositionEnd() {
        this.inCompositionInputting = false;
        this.onInput();
    }
    onInput() {
        this.updateValue();
    }
    updateValue() {
        if (this.inCompositionInputting) {
            return;
        }
        this.value = this.refs.input.value;
        this.emit('change', this.value);
    }
    clear() {
        this.value = '';
        this.emit('change', '');
    }
};
Search = __decorate([
    flit_1.define('f-search')
], Search);
exports.Search = Search;


/***/ }),

/***/ "./src/components/select.ts":
/*!**********************************!*\
  !*** ./src/components/select.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const dropdown_1 = __webpack_require__(/*! ./dropdown */ "./src/components/dropdown.ts");
/** `<f-select>` works just like `<select>`, you can select one or multiple option from it. */
let Select = class Select extends dropdown_1.Dropdown {
    constructor() {
        super(...arguments);
        /** Inputted text for filtering list items. */
        this.inputted = '';
        /** Is in editing mode, in which you can input text to filter list items. */
        this.editing = false;
        /** Trigger event type. Default value is `click`. */
        this.trigger = 'click';
        /** Whether shows triangle. Default value is `false`. */
        this.triangle = false;
        /**
         * Align margin betweens trigger element and popup content.
         * Default value is '0' in pixels.
         */
        this.alignMargin = 0;
        /**
         * Whether can select multiple items, only for type `selection`.
         * Default value is `false`.
         */
        this.multipleSelect = false;
        /** Whether can input to search from all option text. */
        this.searchable = false;
        /** Placeholder for search input. */
        this.placeholder = '';
        /** Input data list. */
        this.data = [];
        /** Current selected value or multiple values when `multipleSelect` is `true`. */
        this.value = null;
    }
    static style() {
        let { mainColor, adjust, borderColor, popupShadowBlurRadius, backgroundColor, popupShadowColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
			background: ${backgroundColor.toMiddle(5)};
			line-height: ${adjust(28)}px;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;
			box-shadow: inset 0 -1px 0 0 ${borderColor};

			&:hover, &.opened{
				box-shadow: inset 0 -1px 0 0 ${mainColor};

				.icon{
					color: ${mainColor};
				}
			}

			&.not-inputable input{
				cursor: pointer;
			}
		}

		.down-icon{
			margin-left: auto;
			margin-right: 4px;
		}
	
		.display, .input{
			flex: 1;
			min-width: 0;
			padding: 0 0 0 ${adjust(8)}px;
			height: 100%;
			border: none;
			background: transparent;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			box-shadow: none;

			&:focus{
				box-shadow: none;
			}
		}

		.placeholder{
			opacity: 0.5;
		}
	
		.popup{
			padding: 0;
			border-radius: 0;
			filter: none;
			box-shadow: 0 1px ${popupShadowBlurRadius}px ${popupShadowColor};
		}

		.list{
			border-bottom: none;

			.option__f-list{
				padding-left: ${adjust(8)}px;
				border-top: none;
			}
		}

		.selected-icon{
			margin-right: -4px;
		}
		`.extends(super.style());
    }
    onCreated() {
        this.initializeStartValue();
    }
    initializeStartValue() {
        if (this.multipleSelect && !Array.isArray(this.value)) {
            this.value = [];
        }
    }
    setOpened(opened) {
        super.setOpened(opened);
        if (this.searchable && !opened && this.editing) {
            this.endEditing();
        }
    }
    render() {
        return flit_1.html `
			<template :class.not-inputable=${!this.searchable}>
				${this.renderDisplayOrInput()}
			</template>
		`.extends(super.render());
    }
    renderDisplayOrInput() {
        if (this.editing) {
            return flit_1.html `
				<input type="text"
					class="input"
					:ref="input"
					.value=${this.inputted}
					.placeholder=${this.placeholder}
					?readonly=${!this.editing}
					@click=${this.onClick}
					@input=${this.onInput}
				>
			`;
        }
        else {
            let text = this.renderCurrentDisplay();
            return flit_1.html `
				<div
					class="input"
					:class.placeholder=${!text}
					@click=${this.onClick}
				>
					${text || this.placeholder}
				</div>
			`;
        }
    }
    renderPopup() {
        let data = this.getDisplayData();
        return flit_1.html `
			<f-popup
				class="popup"
				:ref="popup"
				.triangle="false"
			>
				<f-list class="list"
					:ref="list"
					.type="selection"
					.selectable
					.data=${data}
					.multipleSelect=${this.multipleSelect}
					.selected=${this.multipleSelect ? this.value : [this.value]}
					.navigateFrom=${() => this.refs.input}
					@@select=${this.onSelected}
				/>
			</f-popup>
		`;
    }
    renderCurrentDisplay() {
        if (this.multipleSelect) {
            let displays = [];
            for (let { value, text } of this.data) {
                if (this.value.includes(value)) {
                    displays.push(text.toString());
                }
            }
            return displays.join('; ');
        }
        else {
            for (let { value, text } of this.data) {
                if (this.value === value) {
                    return text;
                }
            }
            return '';
        }
    }
    getDisplayData() {
        var _a;
        if (this.searchable && this.inputted) {
            let lowerSearchWord = this.inputted.toLowerCase();
            let filteredData = [];
            for (let item of this.data) {
                let searchText = (_a = item.searchText) !== null && _a !== void 0 ? _a : String(item.text).toLowerCase();
                if (searchText.includes(lowerSearchWord)) {
                    filteredData.push(item);
                }
            }
            return filteredData;
        }
        else {
            return this.data;
        }
    }
    onClick() {
        if (this.searchable && !this.editing) {
            this.startEditing();
        }
    }
    onSelected(values) {
        if (this.multipleSelect) {
            this.value = values;
        }
        else {
            this.value = values[0];
            this.hidePopup();
        }
        this.emit('change', this.value);
    }
    async startEditing() {
        this.editing = true;
        await flit_1.untilRenderComplete();
        this.refs.input.focus();
    }
    endEditing() {
        this.editing = false;
        this.inputted = '';
    }
    onPopupOpened() {
        flit_1.onRenderComplete(() => {
            this.mayFocusInput();
            this.scrollToViewSelectedOption();
        });
    }
    mayFocusInput() {
        if (this.editing && this.refs.input) {
            this.refs.input.focus();
        }
    }
    onWillAlign() {
        this.syncPopupWidth();
    }
    syncPopupWidth() {
        if (this.refs.popup) {
            this.refs.popup.style.minWidth = String(this.el.offsetWidth) + 'px';
        }
    }
    scrollToViewSelectedOption() {
        if (this.refs.list) {
            let selectedOption = this.refs.list.querySelector('[class*=selected]');
            if (selectedOption && ff_1.getScrollDirection(this.refs.list) === 'y') {
                ff_1.scrollToTop(selectedOption);
            }
        }
    }
    onInput() {
        this.inputted = this.refs.input.value;
        this.showPopup();
    }
};
Select = __decorate([
    flit_1.define('f-select')
], Select);
exports.Select = Select;


/***/ }),

/***/ "./src/components/slider.ts":
/*!**********************************!*\
  !*** ./src/components/slider.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const tooltip_1 = __webpack_require__(/*! ../bindings/tooltip */ "./src/bindings/tooltip.ts");
/** `<f-slider>` provides a range selector, you may pick one value by sliding in the bar. */
let Slider = class Slider extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Whether in vertical mode. Defult value is `false` */
        this.vertical = false;
        /** Minimum value. Defult value is `0`. */
        this.min = 0;
        /** Maximum value. Defult value is `100`. */
        this.max = 100;
        /** Value step when increasing or decreasing. Defult value is `1`. */
        this.step = 1;
        /** Current value. Defult value is `0`. */
        this.value = 0;
        /** Fixed decimal count of progress text. Default value is `null`. */
        this.decimalCount = null;
        this.draging = false;
    }
    static style() {
        let { mainColor, borderColor, adjust, adjustFontSize, focusBlurRadius, backgroundColor } = theme_1.theme;
        let grooveSize = 1;
        let ballSize = Math.ceil(adjust(7)) * 2 + grooveSize;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			flex-direction: column;
			justify-content: center;
			position: relative;
			width: ${adjust(150)}px;
			height: ${adjust(28)}px;
			font-size: ${adjustFontSize(13)}px;
			cursor: pointer;

			&:focus .ball{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
				border-color: ${mainColor};
			}
		}

		.groove{
			position: relative;
			height: ${grooveSize}px;
		}

		.groove-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: ${borderColor};
		}
	
		.progress{
			position: relative;
			background: ${mainColor};
			height: 100%;
		}
	
		.ball{
			position: absolute;
			top: -${(ballSize - grooveSize) / 2}px;
			margin-left: -${Math.round(ballSize / 2)}px;
			will-change: top, left;
			border-radius: 50%;
			border: 1px solid ${borderColor};
			background: ${backgroundColor};
			float: right;
			width: ${ballSize}px;
			height: ${ballSize}px;

			&:hover{
				border-color: ${mainColor};
			}
		}

		.dragging{
			.ball{
				border-color: ${mainColor.darken(10)};
				background: ${mainColor.darken(10)};
			}
		}

		.vertical{
			width: ${adjust(30)}px;
			height: ${adjust(150)}px;
			flex-direction: row;

			.groove{
				width: ${grooveSize}px;
				height: 100%;
			}

			.progress{
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 0;
			}

			.ball{
				margin: -${Math.round(ballSize / 2)}px -${(ballSize - grooveSize) / 2}px;
			}
		}

		.tooltip{
			font-family: consolas;
			font-size: ${adjustFontSize(14)}px;
		}
		`;
    }
    render() {
        let tip = tooltip_1.tooltip(this.renderTooltipContent(), {
            alignTo: () => this.refs.ball,
            alignPosition: this.vertical ? 'r' : 't',
        });
        let sizeStyle = {};
        if (this.vertical) {
            sizeStyle.height = this.getPercent() + '%';
        }
        else {
            sizeStyle.width = this.getPercent() + '%';
        }
        let positionStyle = {};
        if (this.vertical) {
            positionStyle.top = (100 - this.getPercent()) + '%';
        }
        else {
            positionStyle.left = this.getPercent() + '%';
        }
        return flit_1.html `
			<template
				tabindex="0"
				:class.vertical=${this.vertical}
				:class.dragging=${this.draging}
				${tip}
				@mousedown=${this.onMouseDown}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<div class="groove" :ref="groove">
					<div class="groove-bg" />
					<div class="progress" :style=${sizeStyle} />
					<div class="ball" :ref="ball" :style=${positionStyle} />
				</div>
				
			</template>
		`;
    }
    renderTooltipContent() {
        let decimalCount = this.decimalCount;
        if (decimalCount === null) {
            decimalCount = String(this.step).replace(/^\d+\.?/, '').length;
        }
        let tipText = this.value.toFixed(decimalCount);
        return flit_1.html `<span class="${this.scopeClassName('tooltip')}">${tipText}</span>`;
    }
    getPercent() {
        if (this.value === this.min) {
            return 0;
        }
        let percentage = (this.value - this.min) / (this.max - this.min) * 100;
        return ff_1.constrain(percentage, 0, 100);
    }
    onMouseDown(e) {
        let rect = ff_1.getRect(this.refs.groove);
        // Avoid mouse leave to cause it hide.
        ff_1.MouseLeave.lock(this.el);
        this.draging = true;
        // If clicked the ball, not move; only move when clicked the groove.
        if (!e.target.matches(this.scopeClassName('.ball'))) {
            this.changeValueByEvent(e, rect);
        }
        let onMouseMove = (e) => {
            // Disable selecting text unexpectedly, and makesure ball not lose focus.
            e.preventDefault();
            this.changeValueByEvent(e, rect);
        };
        flit_1.on(document, 'mousemove', onMouseMove);
        flit_1.once(document, 'mouseup', () => {
            ff_1.MouseLeave.unlock(this.el);
            flit_1.off(document, 'mousemove', onMouseMove);
            this.draging = false;
            this.emit('dragend');
        });
        this.emit('dragstart');
    }
    changeValueByEvent(e, rect) {
        let rate;
        if (this.vertical) {
            rate = ff_1.constrain(1 - (e.clientY - rect.top) / rect.height, 0, 1);
        }
        else {
            rate = ff_1.constrain((e.clientX - rect.left) / rect.width, 0, 1);
        }
        let diff = (this.max - this.min) * rate;
        if (this.step) {
            diff = Math.round(diff / this.step) * this.step;
        }
        let oldValue = this.value;
        let newValue = ff_1.toDecimal(this.min + diff, 4);
        if (newValue !== oldValue) {
            this.emit('change', this.value = newValue);
        }
    }
    onWheel(e) {
        if (!this.step || document.activeElement !== this.el) {
            return;
        }
        let newValue;
        // deltaY < 0 when wheel up
        if (e.deltaY < 0 && this.vertical || e.deltaY > 0 && !this.vertical) {
            newValue = ff_1.toDecimal(Math.min(this.value + this.step, this.max), 4);
        }
        else {
            newValue = ff_1.toDecimal(Math.max(this.value - this.step, this.min), 4);
        }
        if (newValue !== this.value) {
            this.emit('change', this.value = newValue);
        }
    }
    onFocus() {
        this.onBlur();
        flit_1.on(document, 'keydown', this.onKeyDown, this);
        flit_1.on(document, 'wheel.prevent', this.onWheel, this);
    }
    onKeyDown(e) {
        let newValue;
        if (this.vertical) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                newValue = Math.min(this.value + this.step, this.max);
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                newValue = Math.max(this.value - this.step, this.min);
            }
        }
        else {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newValue = Math.max(this.value - this.step, this.min);
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                newValue = Math.min(this.value + this.step, this.max);
            }
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this.el.blur();
        }
        if (newValue !== undefined && newValue !== this.value) {
            this.emit('change', this.value = newValue);
        }
    }
    onBlur() {
        flit_1.off(document, 'keydown', this.onKeyDown, this);
        flit_1.off(document, 'wheel', this.onWheel, this);
    }
};
Slider = __decorate([
    flit_1.define('f-slider')
], Slider);
exports.Slider = Slider;


/***/ }),

/***/ "./src/components/switch.ts":
/*!**********************************!*\
  !*** ./src/components/switch.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-switch>` work just like `<f-checkbox>` but easier to interact with. */
let Switch = class Switch extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Whether the switch is in on state. */
        this.value = false;
    }
    static style() {
        let { mainColor, adjust, focusBlurRadius, backgroundColor } = theme_1.theme;
        let h = adjust(18);
        let w = h * 2 - 8;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${w}px;
			height: ${h}px;
			background: ${backgroundColor.toMiddle(23.3)};
			border-radius: ${h / 2}px;
			padding: 1px;
			margin: ${(adjust(28) - h) / 2}px 0;
			transition: background-color 0.2s ${flit_1.getCSSEasingValue('ease-out-cubic')};
			cursor: pointer;

			&:hover{
				background: ${backgroundColor.toMiddle(33)};
			}
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
			}
		}
	
		.ball{
			width: ${h - 2}px;
			height: ${h - 2}px;
			background: ${backgroundColor};
			border-radius: 50%;
			transition: margin 0.2s ${flit_1.getCSSEasingValue('ease-out-cubic')};
		}
	
		.on{		
			background: ${mainColor};

			.ball{
				border-color: ${backgroundColor};
				margin-left: calc(100% - ${h - 2}px);
			}

			&:hover{
				background: ${mainColor.darken(10)};
			}
		}
		`;
    }
    render() {
        return flit_1.html `
			<template
				tabindex="0"
				:class.on=${this.value}
				@click=${this.onClick}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<div class="ball"></div>
			</template>
		`;
    }
    onClick() {
        this.toggleState();
    }
    toggleState() {
        this.value = !this.value;
        this.emit('change', this.value);
    }
    onFocus() {
        flit_1.on(document, 'keydown', this.onKeyDown, this);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.toggleState();
        }
        else if (e.key === 'ArrowLeft') {
            if (this.value) {
                e.preventDefault();
                this.toggleState();
            }
        }
        else if (e.key === 'ArrowRight') {
            if (!this.value) {
                e.preventDefault();
                this.toggleState();
            }
        }
    }
    onBlur() {
        flit_1.off(document, 'keydown', this.onKeyDown, this);
    }
};
Switch = __decorate([
    flit_1.define('f-switch')
], Switch);
exports.Switch = Switch;


/***/ }),

/***/ "./src/components/table.ts":
/*!*********************************!*\
  !*** ./src/components/table.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const column_width_resizer_1 = __webpack_require__(/*! ./helpers/column-width-resizer */ "./src/components/helpers/column-width-resizer.ts");
const remote_store_1 = __webpack_require__(/*! ../store/remote-store */ "./src/store/remote-store.ts");
const table_state_1 = __webpack_require__(/*! ./helpers/table-state */ "./src/components/helpers/table-state.ts");
/**
 * `<f-table>` works just like a `<table>`, it provides data view and per row or per column operation.
 * `store` provides data service and also data filtering and data ordering.
 * `columns` can config data column mode for table view.
 */
let Table = class Table extends flit_1.Component {
    constructor(el) {
        super(el);
        /**
         * If `true`, will only render the rows that in viewport.
         * Default value is `false`.
         * Implies to be `true` when uses `RemoteStore`.
         */
        this.live = false;
        /**
         * Item count in one page that should be rendered each time.
         * Works only when `live` is `true`.
         * Default value is `50`, set it smaller if don't need to render so much.
         * Suggested to be large enough to cover table height, but not covers more than 2x of table height.
         * Otherwise it should provide more than 120px scrolling buffer height more than table height.
         */
        this.renderCount = 50;
        /** If what you are rendering is very complex and can't complete in one animation frame, set this to `true`. */
        this.preRendering = false;
        /**
         * Whether each column is resizeable.
         * Default value is `false`.
         */
        this.resizable = false;
        /** Minimum column width in pixels. */
        this.minColumnWidth = 64;
        /** Transition for each row after created or removed. */
        this.transition = undefined;
        /** Column name to indicate which column is in order. */
        this.orderName = null;
        /** Current column order direction. */
        this.orderDirection = '';
        /** Resize column widths when `resizable` is `true`. */
        this.resizer = null;
        this.stateCacher = new table_state_1.TableStateCacher(this);
    }
    static style() {
        let { adjustFontSize, adjust, mainColor, textColor, backgroundColor } = theme_1.theme;
        let scrollbarWidth = ff_1.getScrollbarWidth();
        return flit_1.css `
		:host{
			display: flex;
			flex-direction: column;
			height: 200px;
		}

		.head{
			padding-right: ${scrollbarWidth}px;	// Same with defined scrollbar width.
			color: ${textColor.toMiddle(20)};
			font-size: ${adjustFontSize(13)}px;
			font-weight: bold;
			user-select: none;
		}

		.columns{
			display: flex;
		}

		.column{
			position: relative;
			display: flex;
			align-items: stretch;
			padding: 0 ${adjust(8)}px;
			border-bottom: 1px solid ${backgroundColor.toMiddle(20)};

			&:last-child{
				flex: 1;
				min-width: 0;
				padding-right: ${scrollbarWidth}px;
				margin-right: -${scrollbarWidth}px;
			}
		}

		.column-left{
			display: flex;
			flex: 1;
			max-width: 100%;

			&:hover .order{
				visibility: visible;
			}
		}

		.column-title{
			flex: 0 1 auto;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.column-ordered{
			border-bottom-color: #888;
		}

		.resizable .column-title{
			flex: 1;
		}

		.order{
			width: ${adjust(16)}px;
			display: flex;
			flex: none;
			margin-right: ${adjust(-8)}px;	// Gives 16 - 8 = 8px as cell padding-right.
			visibility: hidden;

			f-icon{
				margin: auto;
			}

			&.current{
				visibility: visible;
			}
		}

		.resizer{
			position: relative;
			z-index: 1;
			width: 17px;
			margin-left: auto;
			margin-right: ${adjust(-17)}px;
			cursor: e-resize;

			&::before{
				content: '';
				position: absolute;
				left: 8px;
				top: 6px;
				bottom: 6px;
				width: 1px;
				background: ${backgroundColor.toMiddle(20)};
			}
		}

		.scroller{
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
		}

		.body{
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			position: relative;
			border-bottom: 1px solid ${backgroundColor.toMiddle(13)};
		}

		.table{
			table-layout: fixed;
			position: absolute;
			width: 100%;
		}

		tr{
			&:hover{
				background: ${mainColor.alpha(0.05)};
			}

			&.selected{
				background: ${mainColor.alpha(0.1)};
			}

			&:last-child td{
				border-bottom-color: transparent;
			}
		}

		td{
			vertical-align: middle;
			padding: ${adjust(3)}px ${adjust(8)}px;
			border-bottom: 1px solid ${backgroundColor.toMiddle(13)};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: default;
		}

		f-checkbox{
			max-width: 100%;
			height: 100%;

			f-icon{
				margin-right: ${adjust(10)}px;
			}
		}

		.resizing-mask{
			position: fixed;
			z-index: 9999;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			cursor: ew-resize;
		}
		`;
    }
    /** If specified, it's returned result will be used to overwrite `column`. */
    getColumns() {
        return null;
    }
    onCreated() {
        this.store.on('dataChange', this.onStoreDataChange, this);
        this.watchImmediately(() => this.getColumns(), columns => {
            if (columns) {
                this.columns = columns;
            }
        });
    }
    onStoreDataChange() {
        if (this.repeatDir instanceof flit_1.LiveAsyncRepeatDirective) {
            this.repeatDir.reload();
        }
    }
    render() {
        return flit_1.html `
			<div class="head" :ref="head">
				<div class="columns" :ref="columnContainer">
					${this.renderColumns()}
				</div>
			</div>

			<div class="body">
				<table class="table" :ref="table">
					<colgroup :ref="colgroup">
						${this.columns.map(column => flit_1.html `
							<col :style.text-align=${column.align || ''} />
						`)}
					</colgroup>
					${this.renderRows()}
				</table>
			</div>
		`;
    }
    renderColumns() {
        return this.columns.map((column, index) => {
            let orderName = column.name;
            let isOrdered = this.orderName === orderName;
            let flexAlign = column.align === 'right' ? 'flex-end' : column.align === 'center' ? 'center' : '';
            return flit_1.html `
			<div class="column"
				:class.column-ordered=${isOrdered}
				@click=${(e) => this.doOrdering(e, index)}
			>
				<div class="column-left" :style.justify-content=${flexAlign}>
					<div class="column-title">${column.title}</div>
					${column.orderBy ? flit_1.html `
						<div class="order" :class.current=${isOrdered && this.orderDirection !== ''}>
							<f-icon .type=${this.getOrderDirectionIcon(orderName)} />
						</div>`
                : ''}
				</div>

				${this.resizable && index < this.columns.length - 1 ? flit_1.html `
					<div class="resizer" @mousedown=${(e) => { var _a; return (_a = this.resizer) === null || _a === void 0 ? void 0 : _a.onStartResize(e, index); }} />`
                : ''}
			</div>`;
        });
    }
    renderRows() {
        if (this.store instanceof remote_store_1.RemoteStore) {
            return flit_1.refDirective(flit_1.liveAsyncRepeat(this.store.getLiveAsyncRepeatDirectiveOptions(), this.renderRow.bind(this), {
                renderCount: this.renderCount,
                preRendering: this.preRendering,
            }, this.transition), this.refDirective.bind(this));
        }
        else if (this.live) {
            return flit_1.refDirective(flit_1.liveRepeat(this.store.getCurrentData(), this.renderRow.bind(this), {
                renderCount: this.renderCount,
                preRendering: this.preRendering,
            }, this.transition), this.refDirective.bind(this));
        }
        else {
            return flit_1.refDirective(flit_1.repeat(this.store.getCurrentData(), this.renderRow.bind(this), this.transition), this.refDirective.bind(this));
        }
    }
    /**
     * How to render each row.
     * You should define a new component and overwrite this method if want to do more customized rendering.
     */
    renderRow(item, index) {
        let tds = this.columns.map((column) => {
            let result = item && column.render ? column.render.call(this, item, index) : '\xa0';
            return flit_1.html `<td :style.text-align=${column.align || ''}>${result}</td>`;
        });
        return flit_1.html `<tr>${tds}</tr>`;
    }
    /** Reference repeat directive, only for once. */
    refDirective(dir) {
        this.repeatDir = dir;
        if ((this.repeatDir instanceof flit_1.LiveRepeatDirective) || (this.repeatDir instanceof flit_1.LiveAsyncRepeatDirective)) {
            this.repeatDir.on('liveDataUpdated', this.onLiveDataUpdated, this);
            this.repeatDir.on('liveDataRendered', this.onLiveDataRendered, this);
        }
    }
    /** Triggers `liveDataUpdated` event. */
    onLiveDataUpdated(data, index, scrollDirection) {
        this.emit('liveDataUpdated', data, index, scrollDirection);
    }
    /** Triggers `liveDataRendered` event. */
    onLiveDataRendered(data, index, scrollDirection) {
        this.emit('liveDataRendered', data, index, scrollDirection);
    }
    /** Get order icon to indicate order direction. */
    getOrderDirectionIcon(orderName) {
        if (orderName === this.orderName) {
            if (this.orderDirection === 'asc') {
                return 'order-asc';
            }
            else if (this.orderDirection === 'desc') {
                return 'order-desc';
            }
        }
        return 'order-default';
    }
    /** Do column ordering for column with specified index. */
    doOrdering(e, index) {
        // Clicked column resizer.
        if (e.target.closest(this.scopeClassName('.resizer'))) {
            return;
        }
        let columns = this.columns;
        let column = columns[index];
        // Column is not orderable.
        let canOrder = !!column.orderBy;
        if (!canOrder) {
            return;
        }
        let direction = '';
        let descFirst = column.descFirst;
        let columnName = column.name;
        if (columnName === this.orderName) {
            if (descFirst) {
                direction = this.orderDirection === '' ? 'desc' : this.orderDirection === 'desc' ? 'asc' : '';
            }
            else {
                direction = this.orderDirection === '' ? 'asc' : this.orderDirection === 'asc' ? 'desc' : '';
            }
        }
        else {
            direction = descFirst ? 'desc' : 'asc';
        }
        this.setOrder(columnName, direction);
    }
    onReady() {
        this.resizer = new column_width_resizer_1.ColumnWidthResizer(this.refs.head, this.refs.columnContainer, this.refs.colgroup, this.columns, this.minColumnWidth, this.scopeClassName('resizing-mask'));
        this.watch(() => flit_1.observeGetting(this, 'columns'), async (columns) => {
            var _a, _b;
            (_a = this.resizer) === null || _a === void 0 ? void 0 : _a.setColumns(columns);
            // Here we need it render new `<col>`s.
            await flit_1.untilRenderComplete();
            (_b = this.resizer) === null || _b === void 0 ? void 0 : _b.updatColumnWidthsPrecisely();
        });
        flit_1.onRenderComplete(() => {
            var _a;
            (_a = this.resizer) === null || _a === void 0 ? void 0 : _a.updatColumnWidthsPrecisely();
        });
    }
    onConnected() {
        flit_1.onRenderComplete(() => {
            let unwatchSize = ff_1.watchLayout(this.el, 'size', () => { var _a; return (_a = this.resizer) === null || _a === void 0 ? void 0 : _a.updatColumnWidthsPrecisely(); });
            this.once('disconnected', unwatchSize);
        });
    }
    /** Order specified column by column name. */
    setOrder(columnName, direction = '') {
        var _a;
        this.orderName = columnName;
        this.orderDirection = direction;
        let column = (_a = this.columns) === null || _a === void 0 ? void 0 : _a.find(col => col.name === columnName);
        if (column) {
            this.applyOrder(column, direction);
        }
        else {
            this.watchOnce(() => this.columns, columns => {
                let column = columns.find(col => col.name === columnName);
                if (column) {
                    this.applyOrder(column, direction);
                }
            });
        }
    }
    /** Clear column order. */
    clearOrder() {
        this.orderName = null;
        this.orderDirection = '';
        this.store.setOrder(null);
        this.store.sync();
    }
    /** Order specified column with specified direction by column name. */
    applyOrder(column, direction = '') {
        if (direction === '') {
            this.store.setOrder(null);
        }
        else {
            this.store.setOrder(column.orderBy, direction);
        }
        this.store.sync();
        this.emit('orderChange', this.orderName, direction);
    }
    /** Column name to indicate which column is in order. */
    getOrderName() {
        return this.orderName;
    }
    /** Current column order direction. */
    getOrderDirection() {
        return this.orderDirection;
    }
    /** Get start index of live data in live mode, otherwise returns `0`. */
    getStartIndex() {
        var _a, _b;
        if (this.repeatDir instanceof flit_1.RepeatDirective) {
            return 0;
        }
        else {
            return (_b = (_a = this.repeatDir) === null || _a === void 0 ? void 0 : _a.getStartIndex()) !== null && _b !== void 0 ? _b : 0;
        }
    }
    /** Get end index of live data in live mode, otherwise returns data length. */
    getEndIndex() {
        var _a;
        if (this.repeatDir instanceof flit_1.RepeatDirective) {
            return this.store.getCurrentData().length;
        }
        else {
            return (_a = this.repeatDir.getEndIndex()) !== null && _a !== void 0 ? _a : this.store.getFullData().length;
        }
    }
    /**
     * Set start index property, and scroll to appropriate position.
     * You can safely call this before any thing rendered.
     * Note the final `startIndex` property may be different,
     * and you can't ensure the element is this index is visible.
     */
    async setStartIndex(index) {
        await this.untilReady();
        if (this.repeatDir instanceof flit_1.LiveRepeatDirective || this.repeatDir instanceof flit_1.LiveAsyncRepeatDirective) {
            this.repeatDir.setStartIndex(index);
        }
        else {
            this.repeatDir.setFirstVisibleIndex(index);
        }
    }
    /** Whether specifies a start index. */
    isStartIndexSpecified() {
        if (this.repeatDir instanceof flit_1.LiveRepeatDirective || this.repeatDir instanceof flit_1.LiveAsyncRepeatDirective) {
            return this.repeatDir.isStartIndexSpecified();
        }
        else {
            return false;
        }
    }
    /**
     * Adjust `startIndex` and scroll position to make item in the specified index becomes visible if it's not.
     * Returns whether find the element in specified index.
     */
    async makeIndexVisible(index) {
        await this.untilReady();
        return this.repeatDir.makeIndexVisible(index);
    }
    /**
     * Make item in the specified index becomes visible at the top scroll position.
     * Returns whether find the element in specified index.
     * You can safely call this before any thing rendered.
     */
    async setFirstVisibleIndex(index) {
        await this.untilReady();
        return this.repeatDir.setFirstVisibleIndex(index);
    }
    /**
     * Get the index of the first visible element.
     * Must after first time rendered.
     */
    getFirstVisibleIndex() {
        if (this.repeatDir instanceof flit_1.LiveRepeatDirective || this.repeatDir instanceof flit_1.LiveAsyncRepeatDirective) {
            return this.repeatDir.getFirstVisibleIndex();
        }
        else {
            return ff_1.locateFirstVisibleIndex(this.refs.table, this.refs.table.rows);
        }
    }
    /**
     * Get currently rendered data item at specified index.
     * Returns null if it's not rendered yet.
     */
    getRenderedItem(index) {
        let isRendered = index >= this.getStartIndex() && index < this.getEndIndex();
        if (isRendered) {
            if (this.store instanceof remote_store_1.RemoteStore) {
                return this.store.getImmediateData(index, index + 1)[0];
            }
            else {
                return this.store.getCurrentData()[index];
            }
        }
        else {
            return null;
        }
    }
    /**
     * Get rendered row at specified index.
     * Please makesure rendering is completed.
     */
    getRenderedRow(index) {
        return this.refs.table.rows[index - this.getStartIndex()] || null;
    }
    /** Checks whether have state cached in a specified name. */
    hasState(name) {
        return this.stateCacher.has(name);
    }
    /**
     * Caches a state includes order, filter, startIndex...
     * Remember the `name` must be unique for each table instance.
     */
    cacheState(name, options = {}) {
        this.stateCacher.cache(name, options);
    }
    /**
     * Restore table state by it's cached name.
     * Returns customized data with `{}` as default value if restored successfully,
     * Returns `undefined` if have no cache to restore.
     * Will clear the cache after restored.
     */
    restoreState(name) {
        return this.stateCacher.restore(name);
    }
    /** Clear cached state with specified name. */
    clearState(name) {
        this.stateCacher.clear(name);
    }
};
Table = __decorate([
    flit_1.define('f-table')
], Table);
exports.Table = Table;


/***/ }),

/***/ "./src/components/tag.ts":
/*!*******************************!*\
  !*** ./src/components/tag.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
/** `<f-tag>` used to give a label to an item. */
let Tag = class Tag extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Unique value to identify current tag. */
        this.value = null;
        /**
         * Whether current tag closeable.
         * Not tag element were not removed automatically,
         * you must capture close event and update rendered result.
         */
        this.closable = false;
    }
    static style() {
        let { borderColor, borderRadius, adjust, adjustFontSize } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			font-size: ${adjustFontSize(13)}px;
			line-height: ${adjust(18)}px;
			height: ${adjust(20)}px;
			padding: 0 ${adjust(6)}px 0 ${adjust(6)}px;
			cursor: pointer;

			&:hover{
				opacity: 0.9;
			}

			&:active{
				opacity: 0.8;
			}
		}
	
		.icon{
			position: relative;
			top: -1px;
			margin-left: ${adjust(4)}px;
			margin-right: ${adjust(-4)}px;
			display: inline-flex;

			f-icon{
				margin: auto;
			}
		}
		`;
    }
    render() {
        return flit_1.html `
			<slot />
			${this.closable ? flit_1.html `<div class="icon" @click=${this.close}><f-icon .type="close" /></div>` : ''}
		`;
    }
    close() {
        this.emit('close', this.value);
    }
};
Tag = __decorate([
    flit_1.define('f-tag')
], Tag);
exports.Tag = Tag;


/***/ }),

/***/ "./src/components/tooltip.ts":
/*!***********************************!*\
  !*** ./src/components/tooltip.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ../style/theme */ "./src/style/theme.ts");
const popup_1 = __webpack_require__(/*! ../components/popup */ "./src/components/popup.ts");
/** `<f-tooltip>` shows a short text message beside it's trigger element. */
let Tooltip = class Tooltip extends popup_1.Popup {
    constructor() {
        super(...arguments);
        /**
         * Tooltip type:
         *
         * `default`: when mouse hover to trigger.
         * `prompt`: shows be default and can be closed.
         * `error`: always show if having error.
         */
        this.type = 'default';
    }
    static style() {
        let { adjust, adjustFontSize, backgroundColor, textColor, errorColor } = theme_1.theme;
        let types = [
            ['default', backgroundColor.toMiddle(5)],
            ['prompt', textColor.toMiddle(30)],
            ['error', errorColor.toMiddle(5)]
        ];
        return flit_1.css `
		:host{
			display: flex;
			font-size: ${adjustFontSize(13)}px;
			max-width: ${adjust(220)}px;
			padding: ${adjust(4)}px ${adjust(8)}px;
			line-height: ${adjust(20)}px;
			pointer-events: none;
		}

		.text{
			flex: 1;
			min-width: 0;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			margin-top: ${adjust(-4)}px;
			margin-bottom: ${adjust(-4)}px;
			margin-right: ${adjust(-8)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		${types.map(([type, color]) => {
            let textColor = color.getLightness() > 0.5 ? '#000' : '#fff';
            return flit_1.css `
			.type-${type}{
				background: ${color};
				color: ${textColor};

				.triangle{
					border-bottom-color: ${color};

					&-herizontal{
						border-right-color: ${color};
						border-bottom-color: transparent;
					}
				}
			}
			`;
        })}

		.type-prompt{
			pointer-events: auto;
		}

		`.extends(super.style());
    }
    render() {
        return flit_1.html `
			<template class="type-${this.type}">
				<div class="text">
					<slot />
				</div>

				${this.type === 'prompt' ? flit_1.html `
					<div class="close" @click=${this.close}>
						<f-icon .type="close" />
					</div>
				` : ''}
			</template>
		`.extends(super.render());
    }
};
Tooltip = __decorate([
    flit_1.define('f-tooltip')
], Tooltip);
exports.Tooltip = Tooltip;


/***/ }),

/***/ "./src/icons/icons.ts":
/*!****************************!*\
  !*** ./src/icons/icons.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

///<reference types="@pucelle/webpack-svg-loader" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.icons = void 0;
const checkbox_checked_svg_1 = __webpack_require__(/*! ./icons/checkbox-checked.svg */ "./src/icons/icons/checkbox-checked.svg");
const checkbox_indeterminate_svg_1 = __webpack_require__(/*! ./icons/checkbox-indeterminate.svg */ "./src/icons/icons/checkbox-indeterminate.svg");
const checkbox_unchecked_svg_1 = __webpack_require__(/*! ./icons/checkbox-unchecked.svg */ "./src/icons/icons/checkbox-unchecked.svg");
const checked_svg_1 = __webpack_require__(/*! ./icons/checked.svg */ "./src/icons/icons/checked.svg");
const close_svg_1 = __webpack_require__(/*! ./icons/close.svg */ "./src/icons/icons/close.svg");
const confirm_svg_1 = __webpack_require__(/*! ./icons/confirm.svg */ "./src/icons/icons/confirm.svg");
const down_svg_1 = __webpack_require__(/*! ./icons/down.svg */ "./src/icons/icons/down.svg");
const error_svg_1 = __webpack_require__(/*! ./icons/error.svg */ "./src/icons/icons/error.svg");
const info_svg_1 = __webpack_require__(/*! ./icons/info.svg */ "./src/icons/icons/info.svg");
const love_svg_1 = __webpack_require__(/*! ./icons/love.svg */ "./src/icons/icons/love.svg");
const order_asc_svg_1 = __webpack_require__(/*! ./icons/order-asc.svg */ "./src/icons/icons/order-asc.svg");
const order_default_svg_1 = __webpack_require__(/*! ./icons/order-default.svg */ "./src/icons/icons/order-default.svg");
const order_desc_svg_1 = __webpack_require__(/*! ./icons/order-desc.svg */ "./src/icons/icons/order-desc.svg");
const radio_checked_svg_1 = __webpack_require__(/*! ./icons/radio-checked.svg */ "./src/icons/icons/radio-checked.svg");
const radio_unchecked_svg_1 = __webpack_require__(/*! ./icons/radio-unchecked.svg */ "./src/icons/icons/radio-unchecked.svg");
const right_svg_1 = __webpack_require__(/*! ./icons/right.svg */ "./src/icons/icons/right.svg");
const search_svg_1 = __webpack_require__(/*! ./icons/search.svg */ "./src/icons/icons/search.svg");
const success_svg_1 = __webpack_require__(/*! ./icons/success.svg */ "./src/icons/icons/success.svg");
const tips_svg_1 = __webpack_require__(/*! ./icons/tips.svg */ "./src/icons/icons/tips.svg");
const triangle_down_svg_1 = __webpack_require__(/*! ./icons/triangle-down.svg */ "./src/icons/icons/triangle-down.svg");
const triangle_right_svg_1 = __webpack_require__(/*! ./icons/triangle-right.svg */ "./src/icons/icons/triangle-right.svg");
const warning_svg_1 = __webpack_require__(/*! ./icons/warning.svg */ "./src/icons/icons/warning.svg");
const refresh_svg_1 = __webpack_require__(/*! ./icons/refresh.svg */ "./src/icons/icons/refresh.svg");
class SVGIcons {
    constructor() {
        /** Map of `id -> code`. */
        this.map = new Map();
    }
    /** Get all icon ids. */
    getAllIds() {
        return this.map.keys();
    }
    /** Add imported icon items. */
    add(...items) {
        for (let { id, code } of items) {
            this.map.set(id, code);
        }
    }
    /** Get svg icon code by id. */
    get(id) {
        return this.map.get(id);
    }
    /** Delete svg icon by id. */
    delete(id) {
        return this.map.delete(id);
    }
}
/**
 * Global icon cache object to provide types for `<f-icon />`.
 * You may append more icons from `icons.add(...)`.
 */
exports.icons = new SVGIcons();
exports.icons.add(checkbox_checked_svg_1.default, checkbox_indeterminate_svg_1.default, checkbox_unchecked_svg_1.default, checked_svg_1.default, close_svg_1.default, confirm_svg_1.default, down_svg_1.default, error_svg_1.default, info_svg_1.default, love_svg_1.default, order_asc_svg_1.default, order_default_svg_1.default, order_desc_svg_1.default, radio_checked_svg_1.default, radio_unchecked_svg_1.default, right_svg_1.default, search_svg_1.default, success_svg_1.default, tips_svg_1.default, triangle_down_svg_1.default, triangle_right_svg_1.default, warning_svg_1.default, refresh_svg_1.default);


/***/ }),

/***/ "./src/icons/icons/checkbox-checked.svg":
/*!**********************************************!*\
  !*** ./src/icons/icons/checkbox-checked.svg ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"checkbox-checked","code":"<svg viewBox=\"0 0 17 17\"><path style=\"fill:currentColor; stroke:none;\" d=\"M3.6,0h9.8c2,0,3.6,1.6,3.6,3.6v9.8c0,2-1.6,3.6-3.6,3.6H3.6c-2,0-3.6-1.6-3.6-3.6V3.6C0,1.6,1.6,0,3.6,0z\"/><polyline style=\"fill:none;stroke:#FFFFFF;\" points=\"13.3,4.8 6.8,12.2 3.7,8.7\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/checkbox-indeterminate.svg":
/*!****************************************************!*\
  !*** ./src/icons/icons/checkbox-indeterminate.svg ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"checkbox-indeterminate","code":"<svg viewBox=\"0 0 17 17\"><path style=\"fill:currentColor; stroke:none;\" d=\"M3.6,0h9.8c2,0,3.6,1.6,3.6,3.6v9.8c0,2-1.6,3.6-3.6,3.6H3.6c-2,0-3.6-1.6-3.6-3.6V3.6C0,1.6,1.6,0,3.6,0z\"/><path style=\"fill:none;stroke:#FFFFFF;stroke-linecap:square;\" d=\"M4.4,8.5h8.1\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/checkbox-unchecked.svg":
/*!************************************************!*\
  !*** ./src/icons/icons/checkbox-unchecked.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"checkbox-unchecked","code":"<svg viewBox=\"0 0 17 17\"><path style=\"fill:none;stroke:currentColor;\" d=\"M4.1,0.5H13c2,0,3.6,1.6,3.6,3.6V13c0,2-1.6,3.6-3.6,3.6H4.1c-2,0-3.6-1.6-3.6-3.6V4.1C0.5,2.1,2.1,0.5,4.1,0.5z\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/checked.svg":
/*!*************************************!*\
  !*** ./src/icons/icons/checked.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"checked","code":"<svg viewBox=\"0 0 15 15\"><polyline style=\"fill:none;stroke:currentColor;\" points=\"12.5,3.4 5.7,11.6 2.5,7.8\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/close.svg":
/*!***********************************!*\
  !*** ./src/icons/icons/close.svg ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"close","code":"<svg viewBox=\"0 0 15 15\"><path style=\"fill:currentColor; stroke:none;\" d=\"M28.1,12.5c-0.2,0-0.4-0.2-0.4-0.4c0-0.1,0-0.2,0.1-0.3L37,1.7c0.2-0.2,0.4-0.2,0.6,0c0.2,0.2,0.2,0.4,0,0.7l-9.2,10C28.4,12.5,28.2,12.5,28.1,12.5z\"/><path style=\"fill:currentColor; stroke:none;\" d=\"M37.3,12.5c-0.1,0-0.2,0-0.3-0.1L27.9,2.3c-0.1-0.2-0.1-0.4,0-0.6c0.2-0.2,0.4-0.2,0.6,0l9.2,10.1c0.2,0.2,0.2,0.4,0,0.7C37.5,12.4,37.5,12.5,37.3,12.5L37.3,12.5z\"/><line style=\"fill:none;stroke:currentColor;stroke-width:1.0526;\" x1=\"12.5\" y1=\"2.5\" x2=\"2.5\" y2=\"12.5\"/><line style=\"fill:none;stroke:currentColor;stroke-width:1.0526;\" x1=\"12.5\" y1=\"12.5\" x2=\"2.5\" y2=\"2.5\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/confirm.svg":
/*!*************************************!*\
  !*** ./src/icons/icons/confirm.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"confirm","code":"<svg viewBox=\"0 0 21 21\"><rect style=\"fill:currentColor; stroke:none;\" x=\"9.5\" y=\"14.5\" width=\"2\" height=\"2\"/><path style=\"fill:currentColor; stroke:none;\" d=\"M13.6,6.4c-0.1-0.4-0.3-0.7-0.6-1c-0.3-0.3-0.6-0.5-1-0.7c-0.5-0.2-1-0.3-1.5-0.3c-0.5,0-0.9,0.1-1.3,0.3C8.8,4.9,8.5,5.2,8.2,5.5C7.9,5.8,7.6,6.2,7.5,6.7C7.3,7.2,7.2,7.7,7.2,8.3h1.7c0-0.3,0.1-0.7,0.2-1C9.1,7,9.3,6.8,9.4,6.5c0.1-0.2,0.3-0.4,0.5-0.5c0.2-0.1,0.4-0.2,0.6-0.2c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.2,0.5,0.3c0.1,0.1,0.2,0.3,0.3,0.5C12,7,12,7.3,12,7.5C12,7.7,12,8,11.9,8.2c-0.1,0.2-0.3,0.4-0.5,0.6c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.3,0.5-0.5,0.7c-0.1,0.3-0.2,0.6-0.2,0.9V12l0,0v1h2v-0.6l0,0v-0.7c0-0.3,0.1-0.5,0.2-0.8c0.1-0.2,0.3-0.4,0.4-0.6c0.2-0.2,0.3-0.4,0.6-0.6c0.2-0.2,0.4-0.4,0.6-0.6c0.2-0.2,0.3-0.5,0.4-0.7c0.1-0.3,0.2-0.6,0.2-0.9C13.8,7.1,13.7,6.7,13.6,6.4z\"/><circle style=\"fill:none;stroke:currentColor;\" cx=\"10.5\" cy=\"10.5\" r=\"10\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/down.svg":
/*!**********************************!*\
  !*** ./src/icons/icons/down.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"down","code":"<svg viewBox=\"0 0 15 15\"><polygon style=\"fill:currentColor; stroke:none;\" points=\"7.5,11 3.5,4.4 4.2,4 7.5,9.4 10.8,4 11.5,4.4\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/error.svg":
/*!***********************************!*\
  !*** ./src/icons/icons/error.svg ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"error","code":"<svg viewBox=\"0 0 21 21\"><circle style=\"fill:none;stroke:currentColor;\" cx=\"10.5\" cy=\"10.5\" r=\"10\"/><line style=\"fill:none;stroke:currentColor;\" x1=\"14.4\" y1=\"6.6\" x2=\"6.6\" y2=\"14.4\"/><line style=\"fill:none;stroke:currentColor;\" x1=\"14.4\" y1=\"14.4\" x2=\"6.6\" y2=\"6.6\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/info.svg":
/*!**********************************!*\
  !*** ./src/icons/icons/info.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"info","code":"<svg viewBox=\"0 0 21 21\"><rect style=\"fill:currentColor; stroke:none;\" x=\"9.5\" y=\"4\" width=\"2\" height=\"2\"/><polygon style=\"fill:currentColor; stroke:none;\" points=\"11.5,9 11.5,8 9.5,8 8.5,8 8.5,9 9.5,9 9.5,16 8.5,16 8.5,17 9.5,17 11.5,17 12.5,17 12.5,16 11.5,16\"/><circle style=\"fill:none;stroke:currentColor;\" cx=\"10.5\" cy=\"10.5\" r=\"10\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/love.svg":
/*!**********************************!*\
  !*** ./src/icons/icons/love.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"love","code":"<svg viewBox=\"0 0 15 15\"><path style=\"fill:none;stroke:currentColor;\" d=\"M12.7,3.4c-1.1-1.1-2.8-1.1-3.8,0L7.5,4.7L6.1,3.4c-1.1-1.1-2.8-1.1-3.8,0c-1.1,1.1-1.1,2.8,0,3.8l1.4,1.4l3.8,3.8l3.8-3.8l1.4-1.4C13.8,6.2,13.8,4.4,12.7,3.4z\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/order-asc.svg":
/*!***************************************!*\
  !*** ./src/icons/icons/order-asc.svg ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"order-asc","code":"<svg viewBox=\"0 0 7 14\"><polygon style=\"fill:currentColor;stroke:none;fill-opacity:0.4;\" points=\"5.7,8 3.5,11.8 1.3,8 0.2,8 0.1,8 3.5,13.8 6.9,8 6.8,8\"/><polygon style=\"fill:currentColor;stroke:none;\" points=\"3.5,0.3 0.1,6 0.2,6 1.3,6 3.5,2.2 5.7,6 6.8,6 6.9,6\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/order-default.svg":
/*!*******************************************!*\
  !*** ./src/icons/icons/order-default.svg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"order-default","code":"<svg viewBox=\"0 0 7 14\"><polygon style=\"fill:currentColor;stroke:none;fill-opacity:0.4;\" points=\"5.7,8 3.5,11.8 1.3,8 0.2,8 0.1,8 3.5,13.8 6.9,8 6.8,8\"/><polygon style=\"fill:currentColor;stroke:none;fill-opacity:0.4;\" points=\"3.5,0.3 0.1,6 0.2,6 1.3,6 3.5,2.2 5.7,6 6.8,6 6.9,6\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/order-desc.svg":
/*!****************************************!*\
  !*** ./src/icons/icons/order-desc.svg ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"order-desc","code":"<svg viewBox=\"0 0 7 14\"><polygon style=\"fill:currentColor;stroke:none;\" points=\"5.7,8 3.5,11.8 1.3,8 0.2,8 0.1,8 3.5,13.8 6.9,8 6.8,8\"/><polygon style=\"fill:currentColor;stroke:none;fill-opacity:0.4;\" points=\"3.5,0.3 0.1,6 0.2,6 1.3,6 3.5,2.2 5.7,6 6.8,6 6.9,6\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/radio-checked.svg":
/*!*******************************************!*\
  !*** ./src/icons/icons/radio-checked.svg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"radio-checked","code":"<svg viewBox=\"0 0 17 17\"><circle style=\"fill:none;stroke:currentColor;\" cx=\"8.5\" cy=\"8.5\" r=\"8\"/><circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:currentColor; stroke:none;\" cx=\"8.5\" cy=\"8.5\" r=\"3.5\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/radio-unchecked.svg":
/*!*********************************************!*\
  !*** ./src/icons/icons/radio-unchecked.svg ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"radio-unchecked","code":"<svg viewBox=\"0 0 17 17\"><circle style=\"fill:none;stroke:currentColor;\" cx=\"8.5\" cy=\"8.5\" r=\"8\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/refresh.svg":
/*!*************************************!*\
  !*** ./src/icons/icons/refresh.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"refresh","code":"<svg viewBox=\"0 0 20 20\"><path style=\"fill:none;stroke:#333333;stroke-linejoin:round;\" d=\"M13.8,15.7c-3.2,2.7-7.9,2.3-10.6-0.9S1,6.9,4.2,4.3S12.1,2,14.7,5.2c1.1,1.3,1.8,3.1,1.8,4.8\"/><path style=\"fill:none;stroke:#333333;\" d=\"M18.5,6.5l-2,3.5l-3-2.5\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/right.svg":
/*!***********************************!*\
  !*** ./src/icons/icons/right.svg ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"right","code":"<svg viewBox=\"0 0 15 15\"><polygon style=\"fill:currentColor; stroke:none;\" points=\"4.4,11.5 4,10.8 9.4,7.5 4,4.2 4.4,3.5 11,7.5\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/search.svg":
/*!************************************!*\
  !*** ./src/icons/icons/search.svg ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"search","code":"<svg viewBox=\"0 0 15 15\"><line style=\"fill:none;stroke:currentColor;stroke-linecap:round;\" x1=\"10\" y1=\"10\" x2=\"14.3\" y2=\"14.3\"/><ellipse style=\"fill:none;stroke:currentColor;stroke-width:1;stroke-miterlimit:9.9999;\" cx=\"6.5\" cy=\"6.5\" rx=\"5\" ry=\"5\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/success.svg":
/*!*************************************!*\
  !*** ./src/icons/icons/success.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"success","code":"<svg viewBox=\"0 0 21 21\"><circle style=\"fill:none;stroke:currentColor;\" cx=\"10.5\" cy=\"10.5\" r=\"10\"/><polyline style=\"fill:none;stroke:currentColor;\" points=\"16.2,6.4 9.3,14.6 6.1,10.8\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/tips.svg":
/*!**********************************!*\
  !*** ./src/icons/icons/tips.svg ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"tips","code":"<svg viewBox=\"0 0 15 15\"><path style=\"fill:currentColor; stroke:none;\" d=\"M7,1c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S3.7,1,7,1 M7,0C3.1,0,0,3.1,0,7s3.1,7,7,7s7-3.1,7-7S10.9,0,7,0z\"/><rect style=\"fill:currentColor; stroke:none;\" x=\"6\" y=\"3\" width=\"2\" height=\"2\"/><polygon style=\"fill:currentColor; stroke:none;\" points=\"8,10 8,7 8,6 6,6 5,6 5,7 6,7 6,10 5,10 5,11 6,11 8,11 9,11 9,10\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/triangle-down.svg":
/*!*******************************************!*\
  !*** ./src/icons/icons/triangle-down.svg ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"triangle-down","code":"<svg viewBox=\"0 0 15 15\"><polygon style=\"fill:currentColor; stroke:none;\" points=\"7,11 11,3 3,3\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/triangle-right.svg":
/*!********************************************!*\
  !*** ./src/icons/icons/triangle-right.svg ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"triangle-right","code":"<svg viewBox=\"0 0 15 15\"><polygon style=\"fill:currentColor; stroke:none;\" points=\"11,7 3,3 3,11\"/></svg>"});

/***/ }),

/***/ "./src/icons/icons/warning.svg":
/*!*************************************!*\
  !*** ./src/icons/icons/warning.svg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"id":"warning","code":"<svg viewBox=\"0 0 21 21\"><line style=\"fill:none;stroke:currentColor;stroke-width:2;\" x1=\"10.5\" y1=\"7.5\" x2=\"10.5\" y2=\"12.5\"/><rect style=\"fill:currentColor; stroke:none;\" x=\"9.5\" y=\"14\" width=\"2\" height=\"2\"/><path style=\"fill:currentColor; stroke:none;\" d=\"M10.5,3l8.8,15H1.7L10.5,3 M10.5,1L0,19h21L10.5,1L10.5,1z\"/></svg>"});

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./icons/icons */ "./src/icons/icons.ts"), exports);
__webpack_require__(/*! ./style/global-style */ "./src/style/global-style.ts");
__exportStar(__webpack_require__(/*! ./style/theme */ "./src/style/theme.ts"), exports);
__exportStar(__webpack_require__(/*! ./style/color */ "./src/style/color.ts"), exports);
__exportStar(__webpack_require__(/*! ./store/store */ "./src/store/store.ts"), exports);
__exportStar(__webpack_require__(/*! ./store/remote-store */ "./src/store/remote-store.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/buttongroup */ "./src/components/buttongroup.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/icon */ "./src/components/icon.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/radio */ "./src/components/radio.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/checkbox */ "./src/components/checkbox.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/switch */ "./src/components/switch.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/slider */ "./src/components/slider.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/form */ "./src/components/form.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/input */ "./src/components/input.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/tag */ "./src/components/tag.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/search */ "./src/components/search.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/progress */ "./src/components/progress.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/popup */ "./src/components/popup.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/tooltip */ "./src/components/tooltip.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/popover */ "./src/components/popover.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/dropdown */ "./src/components/dropdown.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/list */ "./src/components/list.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/navigation */ "./src/components/navigation.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/select */ "./src/components/select.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/menu */ "./src/components/menu.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/contextmenu */ "./src/components/contextmenu.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/notification */ "./src/components/notification.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/dialog */ "./src/components/dialog.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/modal */ "./src/components/modal.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/table */ "./src/components/table.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/resizer */ "./src/components/resizer.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/grid-layout */ "./src/components/grid-layout.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/loader */ "./src/components/loader.ts"), exports);
__exportStar(__webpack_require__(/*! ./components/router */ "./src/components/router.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/tooltip */ "./src/bindings/tooltip.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/contextmenu */ "./src/bindings/contextmenu.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/popup */ "./src/bindings/popup.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/loading */ "./src/bindings/loading.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/goto */ "./src/bindings/goto.ts"), exports);
__exportStar(__webpack_require__(/*! ./bindings/drag-drop */ "./src/bindings/drag-drop.ts"), exports);
__exportStar(__webpack_require__(/*! ./translations/translations */ "./src/translations/translations.ts"), exports);


/***/ }),

/***/ "./src/store/helpers/key-map.ts":
/*!**************************************!*\
  !*** ./src/store/helpers/key-map.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyMap = void 0;
/** Used to merge items with same keys for `Store`. */
class KeyMap {
    constructor(key) {
        if (!key) {
            throw new Error('"key" parameter must be provided when initializing "KeyMap"!');
        }
        this.key = key;
        this.map = new Map();
    }
    has(item) {
        return this.map.has(item[this.key]);
    }
    get(item) {
        return this.map.get(item[this.key]);
    }
    add(item) {
        this.map.set(item[this.key], item);
    }
    delete(item) {
        this.map.delete(item[this.key]);
    }
    clear() {
        this.map = new Map();
    }
}
exports.KeyMap = KeyMap;


/***/ }),

/***/ "./src/store/helpers/page-data-cacher.ts":
/*!***********************************************!*\
  !*** ./src/store/helpers/page-data-cacher.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageDataCacher = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
class PageDataCacher {
    constructor(pageSize, dataCount, dataGetter, preloadPageCount = 0) {
        this.cacheMap = new Map();
        this.requests = new Map();
        this.totalDataCount = null;
        this.pageSize = pageSize;
        this.dataCount = dataCount;
        this.dataGetter = dataGetter;
        this.preloadPageCount = preloadPageCount;
    }
    /** Get cache map. */
    getCache() {
        return this.cacheMap;
    }
    /** Restore cache map. */
    setCache(cacheMap) {
        this.cacheMap = cacheMap;
    }
    /** Get data count and also caches it. */
    async getDataCount() {
        if (this.totalDataCount !== null) {
            return this.totalDataCount;
        }
        let dataCountConfig = this.dataCount;
        let dataCount;
        let knownDataCount = 0;
        if (typeof dataCountConfig === 'function') {
            dataCount = dataCountConfig();
        }
        else {
            dataCount = dataCountConfig;
        }
        if (dataCount instanceof Promise) {
            knownDataCount = await dataCount;
        }
        else {
            knownDataCount = dataCount;
        }
        this.totalDataCount = knownDataCount;
        return knownDataCount;
    }
    /** Get data items immediately. */
    getImmediateData(startIndex, endIndex) {
        let startPageIndex = Math.floor(startIndex / this.pageSize); // 49 -> 0, 50 -> 1
        let endPageIndex = Math.floor((endIndex - 1) / this.pageSize); // 50 -> 0, 51 -> 1
        let items = [];
        for (let i = startPageIndex; i <= endPageIndex; i++) {
            let cacheItems = this.cacheMap.get(i);
            let pageItems = cacheItems;
            if (!pageItems) {
                pageItems = ff_1.repeatForTimes(null, this.pageSize);
            }
            if (i === startPageIndex && i === endPageIndex) {
                items.push(...pageItems.slice(startIndex - startPageIndex * this.pageSize, endIndex - endPageIndex * this.pageSize));
            }
            else if (i === startPageIndex) {
                items.push(...pageItems.slice(startIndex - startPageIndex * this.pageSize));
            }
            else if (i === endPageIndex) {
                items.push(...pageItems.slice(0, endIndex - endPageIndex * this.pageSize));
            }
            else {
                items.push(...pageItems);
            }
        }
        this.preloadDataIfNeeded(endPageIndex + 1);
        return items;
    }
    /** Get fresh data items. */
    async getFreshData(startIndex, endIndex) {
        let startPageIndex = Math.floor(startIndex / this.pageSize); // 49 -> 0, 50 -> 1
        let endPageIndex = Math.floor((endIndex - 1) / this.pageSize); // 50 -> 0, 51 -> 1
        let promises = [];
        for (let i = startPageIndex; i <= endPageIndex; i++) {
            promises.push(this.ensurePageData(i));
        }
        this.preloadDataIfNeeded(endPageIndex + 1);
        await Promise.all(promises);
        return this.getImmediateData(startIndex, endIndex);
    }
    /** Preload more pages of data. */
    async preloadDataIfNeeded(startPageIndex) {
        if (this.totalDataCount !== null && this.preloadPageCount > 0) {
            let endPageIndex = Math.floor((this.totalDataCount - 1) / this.pageSize); // 50 -> 0, 51 -> 1
            for (let i = startPageIndex; i <= endPageIndex && i < startPageIndex + this.preloadPageCount; i++) {
                await this.ensurePageData(i);
            }
        }
    }
    /** Load page data if needed. */
    async ensurePageData(pageIndex) {
        if (!this.cacheMap.has(pageIndex)) {
            await this.loadPageData(pageIndex);
        }
    }
    /** Load  page data in specified index. */
    loadPageData(pageIndex) {
        // It's very often that you load one page of data, and then still load this page after scrolled.
        // So we need to cache requests for pages before it returned.
        if (this.requests.has(pageIndex)) {
            return this.requests.get(pageIndex);
        }
        let startIndex = pageIndex * this.pageSize;
        let endIndex = (pageIndex + 1) * this.pageSize;
        if (this.totalDataCount !== null) {
            endIndex = Math.min(endIndex, this.totalDataCount);
        }
        let requestPromise = this.dataGetter(startIndex, endIndex);
        if (requestPromise instanceof Promise) {
            let promise = requestPromise.then(items => {
                let fresh = this.requests.has(pageIndex);
                if (fresh) {
                    this.cacheMap.set(pageIndex, [...items]);
                    this.requests.delete(pageIndex);
                }
            });
            this.requests.set(pageIndex, promise);
            return promise;
        }
        else {
            this.cacheMap.set(pageIndex, [...requestPromise]);
            return Promise.resolve();
        }
    }
    /** Moves data after insert or delete at specified index. */
    moveData(index, moveCount) {
        if (moveCount === 0) {
            return;
        }
        let startPageIndex = Math.floor(index / this.pageSize);
        let endPageIndex = Math.floor((index + moveCount) / this.pageSize);
        if (startPageIndex > endPageIndex) {
            [startPageIndex, endPageIndex] = [endPageIndex, startPageIndex];
        }
        let maxPageIndex = Math.max(...this.cacheMap.keys());
        let maxIndex = this.cacheMap.get(maxPageIndex).length + maxPageIndex * this.pageSize;
        let maxNewIndex = maxIndex + moveCount;
        let maxNewPageIndex = Math.ceil(maxNewIndex / this.pageSize);
        // Moves right, get each from a left position.
        if (moveCount > 0) {
            for (let pageIndex = maxNewPageIndex; pageIndex > endPageIndex; pageIndex--) {
                let startIndex = pageIndex * this.pageSize;
                let endIndex = pageIndex * this.pageSize + this.pageSize;
                startIndex -= moveCount;
                endIndex -= moveCount;
                this.makeNewCacheItem(pageIndex, startIndex, endIndex);
            }
        }
        // Moves left, get each from a right position.
        else {
            for (let pageIndex = endPageIndex + 1; pageIndex <= maxNewPageIndex; pageIndex++) {
                let startIndex = pageIndex * this.pageSize;
                let endIndex = pageIndex * this.pageSize + this.pageSize;
                startIndex -= moveCount;
                endIndex -= moveCount;
                this.makeNewCacheItem(pageIndex, startIndex, endIndex);
            }
        }
        // Removes the affected pages.
        for (let pageIndex = startPageIndex; pageIndex <= endPageIndex; pageIndex++) {
            this.cacheMap.delete(pageIndex);
        }
        // Removes the rest pages.
        for (let pageIndex = maxNewPageIndex + 1; pageIndex <= maxPageIndex; pageIndex++) {
            this.cacheMap.delete(pageIndex);
        }
        // Removes the requests that affected.
        for (let pageIndex of [...this.requests.keys()]) {
            if (pageIndex >= startPageIndex) {
                this.requests.delete(pageIndex);
            }
        }
        if (this.totalDataCount !== null) {
            this.totalDataCount += moveCount;
        }
    }
    /** Create new cache item from start and end indices. */
    makeNewCacheItem(pageIndex, startIndex, endIndex) {
        let items = this.getImmediateData(startIndex, endIndex);
        let hasAnyItem = items.some(item => item !== null);
        if (hasAnyItem) {
            this.cacheMap.set(pageIndex, items);
            return true;
        }
        return false;
    }
    /** Clear all data cache. */
    clear() {
        this.cacheMap = new Map();
        this.requests = new Map();
        this.totalDataCount = null;
    }
}
exports.PageDataCacher = PageDataCacher;


/***/ }),

/***/ "./src/store/remote-store.ts":
/*!***********************************!*\
  !*** ./src/store/remote-store.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteStore = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const page_data_cacher_1 = __webpack_require__(/*! ./helpers/page-data-cacher */ "./src/store/helpers/page-data-cacher.ts");
/**
 * Compare to `Store`, `RemoteStore` loads data for one page each time.
 * And every time after data changed, it refreshs to reload data from server.
 *
 * You should extends this class and overwrite abstract methods,
 * and should support like column ordering and filtering or searching in backend.
 */
class RemoteStore extends ff_1.Emitter {
    constructor(options = {}) {
        var _a, _b;
        super();
        /** Main key property. */
        this.key = null;
        /** Current ordered key. */
        this.orderKey = null;
        /** Current ordered direction. */
        this.orderDirection = '';
        /** Word to filter results. */
        this.filterWord = null;
        /** Whether will reload. */
        this.willReload = false;
        let pageSize = (_a = options.pageSize) !== null && _a !== void 0 ? _a : 50;
        let preloadPageCount = (_b = options.preloadPageCount) !== null && _b !== void 0 ? _b : 0;
        this.cacher = new page_data_cacher_1.PageDataCacher(pageSize, this.dataCount.bind(this), this.dataGetter.bind(this), preloadPageCount);
    }
    /** Set ordering key and apply it to backend. */
    setOrder(key, direction = '') {
        this.orderKey = key;
        this.orderDirection = direction;
        this.reloadLater();
    }
    /** Get order rule. */
    getOrder() {
        return {
            order: this.orderKey,
            orderDirection: this.orderDirection,
        };
    }
    /** Set filter word to filter data items and apply it to backend. */
    setFilter(filterWord) {
        this.filterWord = filterWord;
        this.reloadLater();
    }
    /** Get current filter word. */
    getFilter() {
        return this.filterWord;
    }
    /** Get cache map. */
    getCache() {
        return this.cacher.getCache();
    }
    /** Set cache map. */
    setCache(cacheMap) {
        this.cacher.setCache(cacheMap);
    }
    /** Clear cache data later. */
    reloadLater() {
        if (!this.willReload) {
            Promise.resolve().then(() => {
                this.sync();
            });
            this.willReload = true;
        }
    }
    /** Clear cache data immediately. */
    reloadImmediately() {
        this.cacher.clear();
    }
    /**
     * Normally when calls `reload`, setting filter or order will cause update current data in next micro task.
     * If you can ensure everything is ready, you may sync to load new data immediately.
     */
    sync() {
        if (this.willReload) {
            this.reloadImmediately();
            this.emit('dataChange');
            this.willReload = false;
        }
    }
    /** Reload all data. */
    reload() {
        this.reloadLater();
    }
    /** Get data items immediately. */
    async getDataCount() {
        return await this.cacher.getDataCount();
    }
    /** Get data items immediately. */
    getImmediateData(startIndex, endIndex) {
        return this.cacher.getImmediateData(startIndex, endIndex);
    }
    /** Get fresh data items. */
    async getFreshData(startIndex, endIndex) {
        return this.cacher.getFreshData(startIndex, endIndex);
    }
    /** Get options for `liveAsyncRepeatDirective`. */
    getLiveAsyncRepeatDirectiveOptions() {
        return {
            key: this.key || undefined,
            dataCount: this.getDataCount.bind(this),
            immediateDataGetter: this.getImmediateData.bind(this),
            asyncDataGetter: this.getFreshData.bind(this),
        };
    }
}
exports.RemoteStore = RemoteStore;


/***/ }),

/***/ "./src/store/store.ts":
/*!****************************!*\
  !*** ./src/store/store.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const key_map_1 = __webpack_require__(/*! ./helpers/key-map */ "./src/store/helpers/key-map.ts");
/* Used to cache object type data and support selection, ordering and filtering. */
class Store extends ff_1.Emitter {
    constructor(options = {}) {
        super();
        /** If `key` specified, when different but same key items added, it covers the old one. */
        this.key = null;
        /** All data keys and mapped data items. */
        this.dataMap = null;
        /** All selected data keys and mapped data items. */
        this.selectedMap = null;
        /** Last clicked item, used to select range items start from it by clicking `shift + click`. */
        this.lastTouchedItem = null;
        /** A filter function to filter data items. */
        this.filter = null;
        /** Order instance, can include several column keys and direction. */
        this.order = null;
        /** Current order direction. */
        this.orderDirection = '';
        /** Full data before filtering or ordering. */
        this.fullData = [];
        /** Current data after been filtered and sorted. */
        this.currentData = [];
        /** All selected data items. */
        this.selected = [];
        /** Whether will update current data. */
        this.willUpdateCurrentData = false;
        if (options.key) {
            this.key = options.key;
            this.dataMap = new key_map_1.KeyMap(options.key);
            this.selectedMap = new key_map_1.KeyMap(options.key);
        }
        this.filter = options.filter || null;
        this.order = options.order || null;
        if (options.data) {
            this.addItems(options.data);
        }
    }
    addItems(items, toStart = false) {
        if (items.length > 0) {
            if (this.dataMap) {
                for (let item of items) {
                    this.dataMap.add(item);
                }
            }
            if (toStart) {
                this.fullData.unshift(...items);
            }
            else {
                this.fullData.push(...items);
            }
            let filteredItems = this.filter ? items.filter(this.filter) : items;
            this.addItemsToCurrentData(filteredItems, toStart);
        }
    }
    addItemsToCurrentData(items, toStart = false) {
        if (this.order) {
            if (items.length > 1) {
                let newData = [...this.currentData, ...items];
                this.order.sortArray(newData);
                this.currentData = newData;
            }
            else {
                for (let item of items) {
                    this.order.binaryInsert(this.currentData, item);
                }
            }
        }
        else {
            if (toStart) {
                this.currentData.unshift(...items);
            }
            else {
                this.currentData.push(...items);
            }
        }
    }
    /** Get all the data. */
    getFullData() {
        return this.fullData;
    }
    /**
     * Set all the data.
     * will update `currentData` later, except you call `syncCurrentData`.
     */
    setFullData(data) {
        this.fullData = data;
        if (this.dataMap) {
            this.dataMap.clear();
            for (let item of data) {
                this.dataMap.add(item);
            }
        }
        this.updateCurrentDataLater();
    }
    /** Get current data. */
    getCurrentData() {
        return this.currentData;
    }
    /**
     * Set ordering rule.
     * will update `currentData` later, except you call `syncCurrentData`.
     */
    setOrder(by, direction = '') {
        this.order = by instanceof ff_1.Order ? by : by === null ? null : new ff_1.Order(by);
        this.orderDirection = direction;
        this.updateCurrentDataLater();
    }
    /** Get current ordering rule. */
    getOrder() {
        return {
            order: this.order,
            orderDirection: this.orderDirection,
        };
    }
    /**
     * Set filter to filter data items.
     * will update `currentData` later, except you call `syncCurrentData`.
     */
    setFilter(filter) {
        this.filter = filter;
        this.deselectAll();
        this.updateCurrentDataLater();
    }
    /** Get current filter. */
    getFilter() {
        return this.filter;
    }
    /** Update current data later after filter or order changed. */
    updateCurrentDataLater() {
        if (!this.willUpdateCurrentData) {
            this.willUpdateCurrentData = true;
            Promise.resolve().then(() => {
                this.sync();
            });
        }
    }
    /** Update current data immediately after filter or order changed. */
    updateCurrentDataImmediately() {
        let currentData = this.filter ? this.fullData.filter(this.filter) : [...this.fullData];
        if (this.order && this.orderDirection) {
            this.order.sortArray(currentData, this.orderDirection);
        }
        this.currentData = currentData;
    }
    /**
     * Normally when update `fullData`, setting filter or order will cause update current data in next micro task.
     * If you can ensure everything is ready, you may sync to update current data immediately.
     */
    sync() {
        if (this.willUpdateCurrentData) {
            this.updateCurrentDataImmediately();
            this.emit('dataChange');
            this.willUpdateCurrentData = false;
        }
    }
    /** Add data items to the end position, removes repeative items firstly. */
    add(...items) {
        this.remove(...items);
        this.addItems(items);
        this.emit('dataChange');
    }
    /** Add data items to the start position, removes repeative items firstly. */
    addToStart(...items) {
        this.remove(...items);
        this.addItems(items, true);
        this.emit('dataChange');
    }
    /** Push data items to the end position. */
    push(...items) {
        this.addItems(items);
        this.emit('dataChange');
    }
    /** Unshift data items to the start position. */
    unshift(...items) {
        this.addItems(items, true);
        this.emit('dataChange');
    }
    /** Insert data items to specified position. */
    insert(index, ...items) {
        if (items.length > 0) {
            this.fullData.splice(index, 0, ...items);
            if (this.dataMap) {
                for (let item of items) {
                    this.dataMap.add(item);
                }
            }
            if (this.order) {
                this.addItemsToCurrentData(this.filter ? items.filter(this.filter) : items);
            }
            else {
                this.updateCurrentDataImmediately();
            }
        }
        this.emit('dataChange');
    }
    /** Chech whether having specified item in full data. */
    has(item) {
        if (this.dataMap) {
            return this.dataMap.has(item);
        }
        else {
            return this.fullData.includes(item);
        }
    }
    /** Chech whether having specified item in current data. */
    hasCurrent(item) {
        if (!this.has(item)) {
            return false;
        }
        if (this.filter && !this.filter(item)) {
            return false;
        }
        return true;
    }
    /** Get a cached item from the not pricise item that having same key. */
    get(item) {
        if (this.dataMap) {
            return this.dataMap.get(item);
        }
        else {
            return item;
        }
    }
    /** Removes items. */
    remove(...items) {
        let toRemove = new Set();
        if (this.dataMap) {
            for (let item of items) {
                if (this.dataMap.has(item)) {
                    toRemove.add(this.dataMap.get(item));
                    this.dataMap.delete(item);
                }
            }
        }
        else {
            for (let item of items) {
                if (this.fullData.includes(item)) {
                    toRemove.add(item);
                }
            }
        }
        if (toRemove.size > 0) {
            this.fullData = this.fullData.filter(item => !toRemove.has(item));
            if (this.dataMap) {
                this.currentData = this.currentData.filter(item => this.dataMap.has(item));
            }
            else {
                this.currentData = this.currentData.filter(item => !toRemove.has(item));
            }
            this.deselect(...toRemove);
            this.emit('dataChange');
        }
        return [...toRemove];
    }
    /** Get selected data. */
    getSelected() {
        return this.selected;
    }
    /** Get selected data. */
    setSelected(items) {
        this.selected = items;
    }
    /** Returns whether an item is selected. */
    isSelected(item) {
        if (this.selectedMap) {
            return this.selectedMap.has(item);
        }
        else {
            return this.selected.includes(item);
        }
    }
    /** Whether selected at least one, but not all. */
    isPartlySelected() {
        let selectedCount = this.selected.length;
        return selectedCount > 0 && selectedCount < this.currentData.length;
    }
    /** Whether selected all items. */
    isSelectedAll() {
        let selectedCount = this.selected.length;
        return selectedCount > 0 && selectedCount === this.currentData.length;
    }
    /** Get selected count. */
    getSelectedCount() {
        return this.selected.length;
    }
    /** Selected items. */
    select(...items) {
        if (this.selectedMap) {
            for (let item of items) {
                if (!this.selectedMap.has(item)) {
                    this.selected.push(item);
                    this.selectedMap.add(item);
                }
            }
        }
        else {
            for (let item of items) {
                if (!this.selected.includes(item)) {
                    this.selected.push(item);
                }
            }
        }
        this.lastTouchedItem = items[0];
    }
    /** Deselect items. */
    deselect(...items) {
        if (items === this.selected) {
            this.deselectAll();
        }
        else {
            let toRemove = new Set();
            if (this.selectedMap) {
                for (let item of items) {
                    if (this.selectedMap.has(item)) {
                        toRemove.add(this.selectedMap.get(item));
                        this.selectedMap.delete(item);
                    }
                }
            }
            else {
                for (let item of items) {
                    if (this.selected.includes(item)) {
                        toRemove.add(item);
                    }
                }
            }
            if (toRemove.size > 0) {
                this.selected = this.selected.filter(item => !toRemove.has(item));
            }
        }
        this.lastTouchedItem = items[0];
    }
    /** Toggle select state of item. */
    toggleSelect(item) {
        if (this.isSelected(item)) {
            this.deselect(item);
        }
        else {
            this.select(item);
        }
        this.lastTouchedItem = item;
    }
    /** Select or deselect a range if pressed shify key, otherwise select or deselect one. */
    selectByKeyEvent(item, event) {
        if (event.shiftKey) {
            this.shiftSelect(item);
        }
        else {
            this.toggleSelect(item);
        }
    }
    /** Select or deselect a range, from last touched item to current item. */
    shiftSelect(item) {
        let startIndex = Math.max(this.lastTouchedItem ? this.getFullIndexOf(this.lastTouchedItem) : 0, 0);
        let endIndex = this.getFullIndexOf(item);
        if (endIndex >= 0) {
            if (startIndex > endIndex) {
                [startIndex, endIndex] = [endIndex, startIndex];
            }
            endIndex += 1;
            if (this.isSelected(item)) {
                this.deselect(...this.currentData.slice(startIndex, endIndex));
            }
            else {
                this.select(...this.currentData.slice(startIndex, endIndex));
            }
        }
    }
    /** Get item index in full data. */
    getFullIndexOf(item) {
        if (this.dataMap && !this.dataMap.has(item)) {
            return -1;
        }
        if (this.key) {
            let valueAtKey = item[this.key];
            return this.fullData.findIndex(i => i[this.key] === valueAtKey);
        }
        else {
            return this.fullData.indexOf(this.get(item));
        }
    }
    /** Get item index in current data. */
    getCurrentIndexOf(item) {
        if (this.dataMap && !this.dataMap.has(item)) {
            return -1;
        }
        if (this.key) {
            let valueAtKey = item[this.key];
            return this.currentData.findIndex(i => i[this.key] === valueAtKey);
        }
        else {
            return this.currentData.indexOf(this.get(item));
        }
    }
    /** Select all items. */
    selectAll() {
        this.select(...this.currentData);
    }
    /** Deselect all items. */
    deselectAll() {
        this.selected = [];
        if (this.selectedMap) {
            this.selectedMap.clear();
        }
    }
    /** Select all items if not, otherwise deselect all. */
    toggleSelectAll() {
        if (this.isSelectedAll()) {
            this.deselectAll();
        }
        else {
            this.selectAll();
        }
    }
    /** Clears all data. */
    clear() {
        this.fullData = [];
        this.currentData = [];
        this.deselectAll();
        if (this.dataMap) {
            this.dataMap.clear();
        }
        this.emit('dataChange');
    }
}
exports.Store = Store;


/***/ }),

/***/ "./src/style/color.ts":
/*!****************************!*\
  !*** ./src/style/color.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
/** Class to process colors. */
class Color {
    /** `value` is a css color values. */
    constructor(value) {
        this.value = value.trim();
    }
    /** Color from rgba values. */
    static fromRGBA(r, g, b, a) {
        r = Math.max(Math.min(r, 1), 0);
        g = Math.max(Math.min(g, 1), 0);
        b = Math.max(Math.min(b, 1), 0);
        a = Math.max(Math.min(a, 1), 0);
        if (a === 1) {
            return new Color('#'
                + (Math.round(255 * r)).toString(16).padStart(2, '0')
                + (Math.round(255 * g)).toString(16).padStart(2, '0')
                + (Math.round(255 * b)).toString(16).padStart(2, '0'));
        }
        else {
            return new Color('rgba('
                + (Math.round(255 * r)).toString() + ', '
                + (Math.round(255 * g)).toString() + ', '
                + (Math.round(255 * b)).toString() + ', '
                + ff_1.toPower(a, -2) + ')');
        }
    }
    /** Color from rgb values. */
    static fromRGB(r, g, b) {
        return Color.fromRGBA(r, g, b, 1);
    }
    toString() {
        return this.value;
    }
    /** Get [r, g, b, a] values, all betweens 0 ~ 1. */
    getRGBA() {
        if (/^#[0-9a-fA-F]{3,6}$/.test(this.value)) {
            return [...this.parseNormalColor(this.value), 1];
        }
        let match = this.value.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
        if (match) {
            return [
                Number(match[1]) / 255,
                Number(match[2]) / 255,
                Number(match[3]) / 255,
                1
            ];
        }
        match = this.value.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/);
        if (match) {
            return [
                Number(match[1]) / 255,
                Number(match[2]) / 255,
                Number(match[3]) / 255,
                Number(match[4]),
            ];
        }
        match = this.value.match(/^rgba\(\s*(#[0-9a-fA-F]{3,6})\s*,\s*([\d.]+)\s*\)$/);
        if (match) {
            return [...this.parseNormalColor(match[1]), Number(match[2])];
        }
        throw new Error(`"${this.value}" is not a valid RGB color`);
    }
    /** Get [r, g, b] values, all betweens 0 ~ 1. */
    getRGB() {
        return this.getRGBA().slice(0, 3);
    }
    parseNormalColor(color) {
        if (color.length === 4) {
            return [
                parseInt(color[1], 16) * 17 / 255,
                parseInt(color[2], 16) * 17 / 255,
                parseInt(color[3], 16) * 17 / 255
            ];
        }
        else {
            return [
                parseInt(color.slice(1, 3), 16) / 255,
                parseInt(color.slice(3, 5), 16) / 255,
                parseInt(color.slice(5, 7), 16) / 255
            ];
        }
    }
    /** Darken current color with percentage value betweens 0-100. */
    darken(percentage) {
        return this.lighten(-percentage);
    }
    /** Lighten current color with percentage value betweens 0-100. */
    lighten(percentage) {
        let [r, g, b, a] = this.getRGBA();
        let p = percentage / 100;
        r += p;
        g += p;
        b += p;
        return Color.fromRGBA(r, g, b, a);
    }
    /** Move color to middle color, darken if is a light color, otherwise lighten. */
    toMiddle(percentage) {
        if (this.getLightness() < 0.5) {
            return this.lighten(percentage);
        }
        else {
            return this.darken(percentage);
        }
    }
    /** Returns lightness value of current color, betweens 0 ~ 1. */
    getLightness() {
        let [r, g, b] = this.getRGBA();
        return r * 0.299 + g * 0.587 + b * 0.114;
    }
    /** Returns average rgb value of current color, betweens 0 ~ 1. */
    getAverage() {
        let [r, g, b] = this.getRGBA();
        return (r + g + b) / 3;
    }
    /**
     * Change alpha channel of current color and returns a new color.
     * alpha value `a` is betweens 0-1.
     */
    alpha(a) {
        let [r, g, b] = this.getRGBA();
        return Color.fromRGBA(r, g, b, a);
    }
    /** Mix with another color in percentage value betweens 0-100. */
    mix(color, percentage) {
        let [r, g, b, a] = this.getRGBA();
        if (typeof color === 'string') {
            color = new Color(color);
        }
        let [r2, g2, b2, a2] = color.getRGBA();
        let p = percentage / 100;
        r = r * (1 - p) + r2 * p;
        g = g * (1 - p) + g2 * p;
        b = b * (1 - p) + b2 * p;
        a = a * (1 - p) + a2 * p;
        return Color.fromRGBA(r, g, b, a);
    }
}
exports.Color = Color;


/***/ }),

/***/ "./src/style/global-style.ts":
/*!***********************************!*\
  !*** ./src/style/global-style.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/style/theme.ts");
flit_1.addGlobalStyle(() => {
    let { mainColor, textColor, borderColor, errorColor, fontSize, borderRadius, focusBlurRadius, adjust, adjustFontSize, backgroundColor } = theme_1.theme;
    return flit_1.css `
	html{
		color: ${textColor};
		font-size: ${fontSize}px;
		line-height: ${adjust(28)}px;
		background-color: ${backgroundColor};
	}

	h1{
		font-size: ${adjustFontSize(68)}px;
		line-height: 1.2;
		font-weight: 700;
	}

	h2{
		font-size: ${adjustFontSize(36)}px;
		line-height: 1.2;
		font-weight: 100;
	}

	h3{
		font-size: ${adjustFontSize(26)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h4{
		font-size: ${adjustFontSize(22)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h5{
		font-size: ${adjustFontSize(18)}px;
		line-height: 1.2;
	}

	h6{
		font-size: ${adjustFontSize(14)}px;
		line-height: 1.2;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${adjust(28)}px;
		line-height: ${adjust(28) - 2}px;
		border: 1px solid ${borderColor};
		color: ${textColor};
		border-radius: ${borderRadius}px;
		padding: 0 ${adjust(12)}px;
		background: ${backgroundColor};
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
		&:hover, &:focus{
			border-color: #666;
			background-color: #666;
			color: #fff;
		}

		&:active{
			background: ${textColor};
			border-color: ${textColor};
			color: ${backgroundColor};
		}

		&:focus{
			box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
		}

		f-icon, f-icon-loading{
			position: relative;
			top: -1px;

			&:first-child{
				margin-right: ${adjust(6)}px;
			}

			&:last-child{
				margin-left: ${adjust(6)}px;
			}

			&:only-child{
				margin-left: 0;
				margin-right: 0;
			}
		}

		&[primary]{
			background: ${mainColor};
			border-color: ${mainColor};
			color: #fff;

			&:hover, &:focus{
				background: ${mainColor.darken(15)};
				border-color: ${mainColor.darken(15)};
			}
		
			&:active{
				background: ${mainColor.darken(30)};
				border-color: ${mainColor.darken(30)};
			}
		}

		&[flat]{
			border: none;
			padding-left: 0;
			padding-right: 0;
			line-height: ${adjust(28)}px;

			&:hover, &:focus{
				background: none;
				color: ${textColor};
			}

			&:active{
				background: none;
			}

			&:focus{
				box-shadow: none;
			}
		}
	}

	a[primary]{
		color: ${mainColor};
	}

	label{
		font-weight: bold;
		font-size: ${adjustFontSize(13)}px;

		&[required]{
			&::after{
				position: relative;
				content: '*';
				color: ${errorColor};
				margin-left: 2px;
				top: ${adjust(-5)}px;
			}
		}

		f-icon{
			margin-left: 4px;
			color: ${textColor.toMiddle(20)};
		}
	}


	.fade-enter, .fade-leave{
		transition: opacity 0.2s ease-out;
	}
	
	.fade-enter-from, .fade-leave-to{
		opacity: 0;
	}
	
	.fade-enter-to, .fade-leave-from{
		opacity: 1;
	}


	::-webkit-scrollbar{
		height: 10px;
		width: 10px;
		background: ${backgroundColor.toMiddle(10)};
	}

	::-webkit-scrollbar-thumb{
		background: ${backgroundColor.toMiddle(30)};

		&:hover{
			background: ${backgroundColor.toMiddle(40)};
		}

		&:active{
			background: ${backgroundColor.toMiddle(50)};
		}
	}
`;
});


/***/ }),

/***/ "./src/style/theme.ts":
/*!****************************!*\
  !*** ./src/style/theme.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = exports.Theme = void 0;
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const color_1 = __webpack_require__(/*! ./color */ "./src/style/color.ts");
class Theme {
    constructor() {
        this.themeMap = new Map();
        this.willUpdate = false;
        this.mode = 'light';
        this.options = { ...defaultLightThemeOptions, ...defaultMediumThemeOptions };
    }
    /** Define a new theme from overwritten options. */
    defineTheme(name, options) {
        this.themeMap.set(name, options);
    }
    getThemeDrakOrLightMode(options) {
        if (options.backgroundColor) {
            let [r, g, b] = new color_1.Color(options.backgroundColor).getRGBA();
            if (ff_1.avg([r, g, b]) < 0.5) {
                return 'dark';
            }
        }
        else if (options.textColor) {
            let [r, g, b] = new color_1.Color(options.textColor).getRGBA();
            if (ff_1.avg([r, g, b]) > 0.5) {
                return 'dark';
            }
        }
        return 'light';
    }
    /**
     * Assigns more theme options to current options, so it may keep options of last theme.
     * Default themes includes: dark, light, small, medium, large, touch.
     */
    assignTheme(...names) {
        for (let name of names) {
            if (!this.themeMap.has(name)) {
                throw new Error(`"${name}" is not a defined theme`);
            }
            Object.assign(this.options, this.themeMap.get(name));
        }
        this.mode = this.getThemeDrakOrLightMode(this.options);
        this.update();
    }
    /** Set single options. */
    set(key, value) {
        this.options[key] = value;
        this.update();
    }
    async update() {
        if (!this.willUpdate) {
            this.willUpdate = true;
            await Promise.resolve();
            flit_1.updateAllComponents();
            flit_1.updateAllStyles();
            this.willUpdate = false;
        }
    }
    getOption(property) {
        return this.options[property];
    }
    /**
     * Convert `font-size` on default theme settings, to the size in current theme settings.
     * Returns value will be at least 11.
     */
    get adjustFontSize() {
        return (size) => {
            return Math.max(Math.round(size * this.fontSize / defaultMediumThemeOptions.fontSize), 11);
        };
    }
    /** Convert `line-height` on default theme settings, to the line height in current theme settings. */
    get adjust() {
        return (size) => {
            return Math.round(size * this.lineHeight / defaultMediumThemeOptions.lineHeight);
        };
    }
    /** Main hightlight color. */
    get mainColor() {
        return new color_1.Color(this.getOption('mainColor'));
    }
    /** Background color. */
    get backgroundColor() {
        return new color_1.Color(this.getOption('backgroundColor'));
    }
    /** Text color. */
    get textColor() {
        return new color_1.Color(this.getOption('textColor'));
    }
    /** Color for success message. */
    get successColor() {
        return new color_1.Color(this.getOption('successColor'));
    }
    /** Color for error message. */
    get errorColor() {
        return new color_1.Color(this.getOption('errorColor'));
    }
    /** Color for warning message. */
    get warningColor() {
        return new color_1.Color(this.getOption('warningColor'));
    }
    /** Color for info message. */
    get infoColor() {
        return new color_1.Color(this.getOption('infoColor'));
    }
    /** Border color. */
    get borderColor() {
        return new color_1.Color(this.getOption('borderColor'));
    }
    /** Border radius in pixels. */
    get borderRadius() {
        return this.getOption('borderRadius');
    }
    /** Color of popup backgound. */
    get popupBackgroundColor() {
        return new color_1.Color(this.getOption('popupBackgroundColor'));
    }
    /** Popup border radius in pixels. */
    get popupBorderRadius() {
        return this.getOption('popupBorderRadius');
    }
    /** Popup shadow blur radius in pixels. */
    get popupShadowBlurRadius() {
        return this.getOption('popupShadowBlurRadius');
    }
    /** Color of popup shadow. */
    get popupShadowColor() {
        return new color_1.Color(this.getOption('popupShadowColor'));
    }
    /** Blur radius in pixels for focus elements. */
    get focusBlurRadius() {
        return this.getOption('focusBlurRadius');
    }
    /** Font size. */
    get fontSize() {
        return this.getOption('fontSize');
    }
    /** Height of normal one line components, not the `lineHeight` of multiple lines. */
    get lineHeight() {
        return this.getOption('lineHeight');
    }
}
exports.Theme = Theme;
const defaultLightThemeOptions = {
    mainColor: '#3a6cf6',
    backgroundColor: '#fff',
    textColor: '#000',
    infoColor: '#3369fa',
    successColor: '#29bc04',
    errorColor: '#e10000',
    warningColor: '#f3b907',
    borderColor: '#9b9b9b',
    popupBackgroundColor: '#fff',
    popupShadowColor: 'rgba(0, 0, 0, 0.4)',
};
const defaultMediumThemeOptions = {
    borderRadius: 4,
    popupBorderRadius: 4,
    popupShadowBlurRadius: 6,
    focusBlurRadius: 6,
    fontSize: 14,
    lineHeight: 28,
};
exports.theme = new Theme();
exports.theme.defineTheme('light', defaultLightThemeOptions);
exports.theme.defineTheme('dark', {
    mainColor: '#3a6cf6',
    backgroundColor: '#333',
    textColor: '#eee',
    borderColor: '#888',
    popupBackgroundColor: '#333',
    popupShadowColor: 'rgba(0, 0, 0, 0.6)',
});
exports.theme.defineTheme('small', {
    fontSize: 13,
    lineHeight: 24,
});
exports.theme.defineTheme('medium', defaultMediumThemeOptions);
exports.theme.defineTheme('large', {
    fontSize: 16,
    lineHeight: 32,
});
exports.theme.defineTheme('touch', {
    fontSize: 18,
    lineHeight: 46,
});


/***/ }),

/***/ "./src/translations/translations.ts":
/*!******************************************!*\
  !*** ./src/translations/translations.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.translations = exports.Translations = void 0;
const ff_1 = __webpack_require__(/*! @pucelle/ff */ "../ff/out/index.js");
const flit_1 = __webpack_require__(/*! @pucelle/flit */ "../flit/out/index.js");
class Translations {
    constructor() {
        this.language = 'en-us';
        this.data = new Map([['en-us', {}]]);
    }
    /** Get current language. */
    getLanguage() {
        return this.language;
    }
    /**
     * Set current language and update all components.
     * @language Language to set, like `en-us`, `zh-cn`.
     */
    setLanguage(language) {
        this.language = language;
        flit_1.updateAllComponents();
    }
    /**
     * Add a translation pieces in `{key: value}` format.
     * @language Language to add translation pieces to.
     * @pieces Translation pieces, in `{key: translation, ...}` format.
     */
    add(language, pieces) {
        let data = this.data.get(language);
        if (!data) {
            this.data.set(language, data = {});
        }
        Object.assign(data, pieces);
    }
    /**
     * Get translation value from key and may format with arguments.
     * @param key Translation key.
     * @param args Parameters format translation value.
     */
    get(key, ...args) {
        let data = this.data.get(this.language);
        if (!data) {
            data = this.data.get('en-us');
        }
        let value = data[key];
        if (args.length) {
            value = ff_1.format(value, args);
        }
        return value;
    }
    /**
     * Translate string like `DefaultValue@@key`.
     * @param key Translation key.
     * @param args Parameters format translation value.
     */
    translate(key, ...args) {
        let [defaultValue, id] = key.split('@@');
        let data = this.data.get(this.language);
        let value = '';
        if (!data) {
            data = this.data.get('en-us');
        }
        if (id) {
            value = data[id] || defaultValue;
        }
        if (args.length) {
            value = ff_1.format(value, args);
        }
        return value;
    }
    /**
     * Translate `"xxx"` to `<b>xxx</b>`.
     * @param key Translation key.
     * @param args Parameters format translation value.
     */
    translateQuoteToBold(key, ...args) {
        let value = this.translate(key, ...args.map(arg => ff_1.encodeHTML(String(arg))));
        return value.replace(/"(.+?)"/g, '<b>$1</b>');
    }
}
exports.Translations = Translations;
/** Global transition API. */
exports.translations = new Translations();
/** Transitions for `<f-dialog>`. */
exports.translations.add('en-us', {
    ok: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
});


/***/ }),

/***/ "./src/utils/element.ts":
/*!******************************!*\
  !*** ./src/utils/element.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.appendTo = void 0;
/**
 * Append a fragment or element into target element or selector.
 * Returns the first element in the fragment.
 * It's a helper function to use like `appendTo(render(...), document.body)`.
 * @param el The fragment to append.
 * @param target The target element to append to.
 */
function appendTo(el, target) {
    let firstElement = el.firstElementChild;
    if (typeof target === 'string') {
        let targetEl = document.querySelector(target);
        if (targetEl && targetEl.lastElementChild !== el) {
            targetEl.append(el);
        }
    }
    else if (target && target.lastElementChild !== el) {
        target.append(el);
    }
    return firstElement;
}
exports.appendTo = appendTo;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map