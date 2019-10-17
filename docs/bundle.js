(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the array of `value` repeat for `count` times.
 * @param item The value to repeat.
 * @param count Count of times to repeat.
 */
function repeatTimes(item, count) {
    let items = [];
    for (let i = 0; i < count; i++) {
        items.push(item);
    }
    return items;
}
exports.repeatTimes = repeatTimes;
/**
 * Add items to `array`, duplicate items will not be added.
 * This method use `includes` to test if an item in array, so it doesn't fit for adding many items to a big array.
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
 * Remove items from `array`. Returns the removed items.
 * Note that this method uses `splice` to remove items, so using `array.filter` to filter out multiple items would be better.
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
 * Remove the first item which match `fn` from `array`. Returns the removed items.
 * @param array The array to remove items.
 * @param fn The function which returns boolean values to determinae whether to remove item.
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
 * Remove all the items match `fn` from `array`. Returns the removed items.
 * Note that this method uses `splice` to remove items, so using `array.filter` to filter out multiple items would be better.
 * @param array The array to remove items.
 * @param fn The function which returns boolean values to determinae whether to remove item.
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
 * Returns a new array from `array` but removes duplicate items.
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
 * Creates an array of unique values that are included in all given arrays.
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
 * Creates a new array from given `array` but exclude items in `excludeArrays`.
 * @param array The array to include items.
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
 * Using binary algorithm to find one item from a sorted array which match `fn`.
 * @param array The sorted array.
 * @param fn The function to accept item in array as argument and returns `-1` to move left, `1` to move right.
 */
function binaryFind(array, fn) {
    let index = binaryFindIndex(array, fn);
    return index === -1 ? undefined : array[index];
}
exports.binaryFind = binaryFind;
/**
 * Using binary algorithm to find index from a sorted array at where the item match `fn`.
 * @param array The sorted array.
 * @param fn The function to accept item in array as argument and returns `-1` to move left, `1` to move right.
 */
function binaryFindIndex(array, fn) {
    if (array.length === 0) {
        return -1;
    }
    let result = fn(array[0]);
    if (result === 0) {
        return 0;
    }
    if (result === -1) {
        return -1;
    }
    if (array.length === 1) {
        return -1;
    }
    result = fn(array[array.length - 1]);
    if (result === 0) {
        return array.length - 1;
    }
    if (result === 1) {
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
        else if (result === -1) {
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
 * Using binary algorithm to find the closest index from a sorted array in where to insert new item and keep order.
 * Returned index betweens `0 ~ array.length`, and if `array[index]` exist, `fn(array[index]) >= 0`.
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
class Order {
    /**
     * Create an order rule, used in `orderBy`, and can also be used to binary search from or binary insert into array with object type items
     * @param orders Rest arguments of type `key` or `OrderFunction` which will return a `key`, or [`key` / `OrderFunction`, `OrderDirection`].
     */
    constructor(firstOrder, ...orders) {
        this.orders = [];
        for (let order of [firstOrder, ...orders]) {
            if (['string', 'number', 'function'].includes(typeof order)) {
                this.orders.push([order, 1]);
            }
            else if (Array.isArray(order) && ['string', 'number', 'function'].includes(typeof order[0])) {
                this.orders.push([order[0], order[1] === -1 || order[1] === 'desc' ? -1 : 1]);
            }
            else {
                throw new Error(JSON.stringify(orders) + ' doesn\'t specify any valid key or order.');
            }
        }
    }
    /**
     * Sort `array` inside by the order specified by current object.
     * @param array The array to sort.
     */
    sortArray(array) {
        array.sort((a, b) => this.compare(a, b));
    }
    /**
     * Compare two items.
     * When `order` is `1`: returns `0` if they are same; returns `-1` if the first one less that the second one; else returns `1`.
     * When `order` is `-1`: returns `0` if they are same; returns `1` if the first one less that the second one; else returns `-1`.
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
     * Binary find the index of `array` the value at where equals to `item`.
     * Returns `-1` if not found.
     * @param array The array to lookup.
     * @param item The item to search.
     */
    binaryFind(array, item) {
        return binaryFind(array, i => this.compare(item, i));
    }
    /**
     * Binary find an index of `array` to insert `item` and keep current order.
     * Returned value betweens `0 ~ array.length`.
     * @param array The array to lookup.
     * @param item The item to compare.
     */
    binaryFindIndex(array, item) {
        return binaryFindIndex(array, i => this.compare(item, i));
    }
    /**
     * Binary insert an `item` into `array` and keep current order.
     * @param array The array to lookup.
     * @param item The item to insert.
     */
    // `splice` is very slower since it reallocate memory frequently.
    // See https://jsperf.com/splice-vs-filter
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
// Compar to map, object has same performance, and is more convinent to use, but will lose number key type.
function indexBy(array, keyOrFn) {
    let index = {};
    if (typeof keyOrFn === 'function') {
        for (let i = 0, len = array.length; i < len; i++) {
            let item = array[i];
            let [key, value] = keyOrFn(item, i);
            index[key] = value;
        }
    }
    else {
        for (let item of array) {
            let key = item[keyOrFn];
            index[key] = item;
        }
    }
    return index;
}
exports.indexBy = indexBy;
/**
 * Creates a map object composed of keys as running `keyOrFn` on each item, and values as item array share the same key.
 * @param array The array to group by.
 * @param keyOrFn The key attribute name of each item whose related value will be used as key. or the function which accepts each item as argument and returns a key.
 */
function groupBy(array, keyOrFn) {
    let index = {};
    for (let item of array) {
        let key;
        if (typeof keyOrFn === 'function') {
            key = keyOrFn(item);
        }
        else {
            key = item[keyOrFn];
        }
        let group = index[key] || (index[key] = []);
        group.push(item);
    }
    return index;
}
exports.groupBy = groupBy;
/**
 * Group and aggregate items in array by group function and aggregate function.
 * @param array The array to aggregate.
 * @param keyOrFn The key attribute name of each item whose related value will be used as key. or the function which accepts each item as argument and returns a key.
 * @param aggregateFn The aggregate function which accepts grouped items and key as arguments, and returns aggregate value.
 */
function aggregate(array, keyOrFn, aggregateFn) {
    let index = groupBy(array, keyOrFn);
    return indexBy(Object.keys(index), (key) => {
        return [key, aggregateFn(index[key], key)];
    });
}
exports.aggregate = aggregate;
/**
 * Returns the length of the array.
 * @param array The array to count length.
 */
// Can't use `array: unknown` here, or it will cause `T` in `aggregate` was inferred as `unknown` and make `CanSortKeys<T>` not working.
function count(array) {
    return array.length;
}
exports.count = count;
/**
 * Returns the sum of all the numbers in `array`.
 * @param array The array of numbers.
 */
function sum(array) {
    return array.reduce((v1, v2) => v1 + v2, 0);
}
exports.sum = sum;
/**
 * Returns the average value of the numbers in `array`. Returns 0 if no items in `array`.
 * @param array The array of numbers.
 */
function avg(array) {
    if (array.length === 0) {
        return 0;
    }
    return sum(array) / array.length;
}
exports.avg = avg;
/**
 * Returns the minimal value of the numbers in `array`. Returns `Infinity` if no items in `array`.
 * @param array The array of numbers.
 */
function min(array) {
    return Math.min(...array);
}
exports.min = min;
/**
 * Returns the maximun value of numbers in `array`. Returns `-Infinity` if no items in `array`.
 * @param array The array of numbers.
 */
function max(array) {
    return Math.max(...array);
}
exports.max = max;
/**
 * Returns the index of the minimal value of the array items. Returns `-1` if no items or all values are `Infinity`.
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
 * Returns the index of the maximun value of the array items. returns `-1` if no items or all values are `-Infinity`.
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duration_1 = require("./duration");
const DateUnits = 'yMdhms';
/**
 * Get one of the date values according to specified `unit`.
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
 * Set one of the date values according to specified `unit`.
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
 * Returns if date values from year to seconds are associated with a real date.
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
 * Returns if the year of `date` is a leap year, which contains 366 days.
 * @param date The date to test.
 */
function isLeapYear(date) {
    let year = date.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
exports.isLeapYear = isLeapYear;
/**
 * Returns the days in the year from `date`, which is 366 for leap year, 365 otherwise.
 * @param date The date to get days from.
 */
function getDaysOfYear(date) {
    return isLeapYear(date) ? 366 : 365;
}
exports.getDaysOfYear = getDaysOfYear;
/**
 * Returns the days in the month from a `date`, which betweens 28-31.
 * @param date The date to get days from.
 */
function getDaysOfMonth(date) {
    let d = new Date(date.getTime());
    d.setDate(32);
    return 32 - d.getDate();
}
exports.getDaysOfMonth = getDaysOfMonth;
/**
 * Clone a date.
 * Can specify `units` to partly clone, values whose unit is included in `units` will be set to minimal value.
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
 * Add `duration` string to a `date` and returns the new date.
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
 * @param format The format object to use, default value is `{y: 'yyyy-MM-dd hh:mm', M: 'MM-dd hh:mm', h: 'hh:mm'}`.
 */
function formatToShortDate(date, format = { y: 'yyyy-MM-dd hh:mm', M: 'MM-dd hh:mm', h: 'hh:mm' }) {
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

},{"./duration":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("./string");
const DateUnits = 'yMdhms';
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
 * Parse `duration` string like `1h1m` or `01:01:00` to object `{y, M, d, h, m, s}`.
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
 * Parse second count to duration object `{y, M, d, h, m, s}`.
 * @param seconds The second count.
 * @param units The unit to use when parsing, default value is `yMdhms`.
 */
function parseSecondsToDurationObject(seconds, units = DateUnits) {
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
exports.parseSecondsToDurationObject = parseSecondsToDurationObject;
/**
 * Format second count to duration string like `1h1m`.
 * @param units Date unit types like `yMdhms`. Can only specify partial date units like `Md`.
 * @param maxOutputUnitCount Maximun unit count of the duration string. E.g., sepcify to `2` to output like `1y1M`, `1M1d`, `1d1h`, `1s`.
 */
function formatSecondsToDuration(seconds, units = DateUnits, maxOutputUnitCount = units.length) {
    let o = parseSecondsToDurationObject(seconds, units);
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

},{"./string":11}],4:[function(require,module,exports){
"use strict";
// At beginning, we implement a good Emitter by inferring listener arguments and emitting arguments.
// But then we meet a big problem when extending the class, described by:
// https://stackoverflow.com/questions/55813041/problems-on-typescript-event-interface-extends
// We are trying to merge event listener interfaces but failed,
// Guess the main reason is when one of the the event listener interface is generic argument,
// we can't merge two event listener interfaces and infer types of listener arguments for one listener,
// The type of listener becomes `resolved Listener A & unresolved Listener B`, arguments of it can't be inferred.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An event emitter as super class to listen and emit events.
 * @typeparam E Event interface in `{eventName: (...args) => void}` format.
 */
class Emitter {
    constructor() {
        this.__events = new Map();
    }
    __ensureEvents(name) {
        let events = this.__events.get(name);
        if (!events) {
            this.__events.set(name, events = []);
        }
        return events;
    }
    /**
     * Registers an event `listener` to listen specified event `name`.
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
     * Registers an event `listener` to listen specified event `name`, trigger for only once.
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
     * Remove `listener` from listening specified event `name`.
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
     * Check if `listener` is the list of listening specified event `name`.
     * @param name The event name.
     * @param listener The event listener. If provided, will also check if the listener match.
     * @param scope The scope binded to listener. If provided, will additionally check if the scope match.
     */
    hasListener(name, listener, scope) {
        let events = this.__events.get(name);
        if (!listener) {
            return !!events && events.length > 0;
        }
        else if (events && listener) {
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
     * Emit specified event `name`, trigger all the listeners related with followed arguments.
     * @param name The event name.
     * @param args The arguments that will be passed to event listeners.
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

},{}],5:[function(require,module,exports){
"use strict";
/* Polyfill for parts of ECMAScript 2017+, which is not widely supported by modern browsers */
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimingFunction {
    constructor(fn, ms) {
        this.id = null;
        /** Returns if current timing function has been canceled. */
        this.canceled = false;
        this.fn = fn;
        this.ms = ms;
    }
}
class WrappedTimingFunction extends TimingFunction {
    constructor(fn, ms) {
        super(fn, ms);
        this.wrapped = this.wrap();
        this.wrapped.__original = fn;
    }
}
class Timeout extends TimingFunction {
    /**
     * Just like setTimeout, call `fn` after `ms` millisecons.
     * @param fn The function to call later.
     * @param ms The timeout time in millisecons.
     */
    constructor(fn, ms) {
        super(fn, ms);
        this.reset();
    }
    /** Restart timeout, although it was been called. always returns true. */
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
    /** Call deferred function immediately if it wasn't been called and returns true. otherwise returns false. */
    flush() {
        if (!this.id) {
            return false;
        }
        clearTimeout(this.id);
        this.id = null;
        this.fn();
        return true;
    }
    /** Cancel deferred function, returns if it was canceled before been called. */
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
 */
function timeout(fn, ms = 0) {
    return new Timeout(fn, ms);
}
exports.timeout = timeout;
class Interval extends TimingFunction {
    /**
     * Just like setInterval, call `fn` every `ms` millisecons.
     * @param fn The function to call.
     * @param ms The interval time in millisecons.
     */
    constructor(fn, ms) {
        super(fn, ms);
        this.reset();
    }
    /** Restart interval, although it was been canceled. always returns true. */
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
    /** Call interval function immediately if it wasn't been canceled and returns true. otherwise returns false. */
    flush() {
        if (!this.id) {
            return false;
        }
        this.fn();
        this.reset();
        return true;
    }
    /** Cancel interval function, returns if it was canceled before been called. */
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
 */
function interval(fn, ms) {
    return new Interval(fn, ms);
}
exports.interval = interval;
class Throttle extends WrappedTimingFunction {
    /**
     * Throttle function calls, call returned function twice in `ms` millisecons will only call `fn` for once. Returns a new function.
     * @param fn The function to throttle.
     * @param ms The time period in which only at most one call allowed. If omitted, using `requestAnimationFrame` to throttle.
     */
    constructor(fn, ms = 0) {
        super(fn, ms);
    }
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
        if (this.ms) {
            this.id = setTimeout(this.onTimeout.bind(this), this.ms);
        }
        else {
            this.id = requestAnimationFrame(this.onTimeout.bind(this));
        }
    }
    onTimeout() {
        this.id = null;
    }
    /** Reset throttle timeout, function will be called immediately next time. Will restart throttle if been canceled. */
    reset() {
        if (this.id) {
            this.clearThrottle();
        }
        this.canceled = false;
        return true;
    }
    clearThrottle() {
        if (this.ms) {
            clearTimeout(this.id);
        }
        else {
            cancelAnimationFrame(this.id);
        }
        this.id = null;
    }
    /** Do nothing, always return false. */
    flush() {
        return false;
    }
    /** Cancel throttle, function will be called without limit. Returns true if is not canceled before. */
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
 * Throttle function calls, call returned function for twice in `ms` milliseconds will only call `fn` for once.
 * Returns a new function.
 * @param fn The function to throttle.
 * @param ms The time period in which only at most one call allowed.
 */
function throttle(fn, ms = 0) {
    return new Throttle(fn, ms);
}
exports.throttle = throttle;
class SmoothThrottle extends WrappedTimingFunction {
    /**
     * Throttle function calls like `throttle`, but will calls `fn` lazily and smooth. Returns a new function.
     * @param fn The function to throttle.
     * @param ms The time period in which only at most one call allowed.
     */
    constructor(fn, ms) {
        super(fn, ms);
        this.lastArgs = null;
        this.lastThis = null;
        this.wrapped = this.wrap();
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
        if (this.ms) {
            this.id = setTimeout(this.onTimeout.bind(this), this.ms);
        }
        else {
            this.id = requestAnimationFrame(this.onTimeout.bind(this));
        }
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
    /** Reset throttle timeout and discard deferred call, Will restart throttle if been canceled. */
    reset() {
        if (this.id) {
            this.clearThrottle();
        }
        this.lastArgs = null;
        this.lastThis = null;
        this.canceled = false;
        return true;
    }
    /** Call function immediately if there is a deferred call, and restart throttle timeout. */
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
        if (this.ms) {
            clearTimeout(this.id);
        }
        else {
            cancelAnimationFrame(this.id);
        }
        this.id = null;
    }
    /** Cancel throttle, function will be called without limit. Returns true if is not canceled before. */
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
 * Throttle function calls like `throttle`, but will call `fn` lazily and smooth.
 * Returns a new function.
 * @param fn The function to throttle.
 * @param ms The time period in which only at most one call allowed.
 */
function smoothThrottle(fn, ms) {
    return new SmoothThrottle(fn, ms);
}
exports.smoothThrottle = smoothThrottle;
class Debounce extends WrappedTimingFunction {
    /**
     * Debounce function calls, call returned function will start a timeout to call `fn`,
     * But call returned function for the second time in `ms` milliseconds will reset timeout.
     * Returns a new function.
     * @param fn The function to debounce.
     * @param ms The timeout in milliseconds.
     */
    constructor(fn, ms) {
        super(fn, ms);
        this.lastArgs = null;
        this.lastThis = null;
        this.wrapped = this.wrap();
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
    /** Reset debounce timeout and discard deferred call. Will restart debounce if been canceled. */
    reset() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = null;
        }
        this.lastArgs = null;
        this.lastThis = null;
        return true;
    }
    /** Call function immediately there is a deferred call, and restart debounce timeout. */
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
    /** Cancel debounce, function will be called without limit. Returns true if is not canceled before. */
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
 * Debounce function calls, call returned function will start a timeout to call `fn`,
 * But call returned function for the second time in `ms` milliseconds will reset timeout.
 * Returns a new function.
 * @param fn The function to debounce.
 * @param ms The timeout in milliseconds.
 */
function debounce(fn, ms) {
    return new Debounce(fn, ms);
}
exports.debounce = debounce;

},{}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./es-polyfill");
var object_1 = require("./object");
exports.assign = object_1.assign;
exports.assignIf = object_1.assignIf;
exports.deepClone = object_1.deepClone;
exports.deepEqual = object_1.deepEqual;
__export(require("./array"));
__export(require("./string"));
__export(require("./number"));
__export(require("./function"));
__export(require("./time"));
__export(require("./duration"));
__export(require("./date"));
__export(require("./emitter"));
__export(require("./queue"));

},{"./array":1,"./date":2,"./duration":3,"./emitter":4,"./es-polyfill":5,"./function":6,"./number":8,"./object":9,"./queue":10,"./string":11,"./time":12}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Like `number.toFixed`, but alway returns a number.
 * @param number The number to fix.
 * @param decimalCount The decimal count that `number` will correct to, default value is 0.
 */
function toDecimal(number, decimalCount = 0) {
    return toPower(number, -decimalCount);
}
exports.toDecimal = toDecimal;
/**
 * Like the opposite of `number.toFixed`, but always returns a number. e.g., `toPower(1234, 2) = 1200`.
 * @param number The number to fix.
 * @param power The power that `number` will correct to, default value is 0.
 */
function toPower(number, power = 0) {
    if (number < 0) {
        return -toPower(-number);
    }
    if (number === 0) {
        return 0;
    }
    let maxPower = Math.floor(Math.log(number) / Math.log(10));
    power = Math.min(maxPower, power);
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
 * Nearly same with `number.toPrecision`, except here always returns a number.
 * @param number The number to transfer to specified precision.
 * @param precision The precision value betweens 1-21, default value is 1.
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Assign object keys and values from `source` to `target`, will cover values of `target` with same keys.
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
// 2x~3x faster than JSON methods, see https://jsperf.com/deep-clone-vs-json-clone
/**
 * Deeply clone an object, array or any value which can also be called with `JSON.stringify`.
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
// 1x faster than JSON methods, see https://jsperf.com/deep-equal-vs-json-compare
/**
 * Deeply compare two objects, arraies or any values.
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
exports.deepEqual = deepEqual;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./object");
const emitter_1 = require("./emitter");
var QueueState;
(function (QueueState) {
    /** Not started. */
    QueueState[QueueState["Pending"] = 0] = "Pending";
    /** Any task is running. */
    QueueState[QueueState["Running"] = 1] = "Running";
    /** Been paused. */
    QueueState[QueueState["Paused"] = 2] = "Paused";
    /** All tasks finshed. */
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
        /** Specify how many tasks to run simultaneously, default value is `5`. */
        this.concurrency = 5;
        /** If true, will continue handling tasks after error occurred. */
        this.continueOnError = false;
        /**
         * Specifies how many times to retry before one task success.
         * If one task's retry times execeed, it will never retry automatically,
         * but you can still retry all failed tasks by calling `retry()` manually.
         * Setting this option to values `> 0` implies `continueOnError` is true.
         */
        this.maxRetryTimes = 0;
        /** The start task array which will be passed to `handler` in order. */
        this.tasks = [];
        /** Returns current working state. */
        this.state = QueueState.Pending;
        this.keysFound = null;
        this.seed = 1;
        this.handledCount = 0;
        this.runningItems = [];
        this.failedItems = [];
        this.resumePromise = null;
        this.resumeResolve = null;
        object_1.assign(this, options, Object.keys(options).filter(key => key !== 'tasks'));
        if (this.key) {
            this.keysFound = new Set();
        }
        if (options.tasks) {
            this.push(...options.tasks);
        }
    }
    /** Returns the tount of total tasks, included handled and unhandled and failed. */
    getTotalCount() {
        return this.getHandledCount() + this.getUnhandledCount() + this.getFailedCount();
    }
    /** Returns the count of handled tasks. */
    getHandledCount() {
        return this.handledCount;
    }
    /** Returns the count of unhandled tasks, not include failed tasks. */
    getUnhandledCount() {
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
    /** Returns the unhandled tasks. */
    getUnhandledTasks() {
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
     * Start handling tasks. Will emit `finish` event in next tick if no task to run.
     * Returns `true` if queue started.
     */
    start() {
        if (this.state === QueueState.Paused) {
            this.resume();
        }
        else if (this.tasks.length > 0) {
            this.state = QueueState.Running;
            this.mayHandleNextTask();
        }
        else {
            Promise.resolve().then(() => this.onFinish());
        }
        return this.state === QueueState.Running;
    }
    /**
     * Returns a promise which will be resolved after all tasks finished, or be rejected if error happens.
     */
    untilFinish() {
        if (this.getUnhandledCount() > 0) {
            return new Promise((resolve, reject) => {
                this.once('end', err => err ? reject(err) : resolve());
            });
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * Stop handling tasks, running tasks will not be aborted, but will be locked until `resume()`.
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
     * Resume handling tasks.
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
        this.mayHandleNextTask();
        return true;
    }
    mayHandleNextTask() {
        // State may change after in event handler, so we need to test state here.
        if (this.state !== QueueState.Running) {
            return;
        }
        while (this.getRunningCount() < this.concurrency && this.tasks.length > 0) {
            let task = this.tasks.shift();
            this.handleItem({
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
                    this.handleItem(item);
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
    handleItem(item) {
        let { task } = item;
        let onItemFinish = this.onItemFinish.bind(this, item);
        let onItemError = this.onItemError.bind(this, item);
        this.runningItems.push(item);
        let value = this.handler(task);
        if (value && typeof value === 'object' && value.promise instanceof Promise && typeof value.abort === 'function') {
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
    async onItemFinish(item, value) {
        await this.prepareItem(item);
        if (!this.removeFromRunning(item)) {
            return;
        }
        this.handledCount++;
        if (this.state === QueueState.Running) {
            this.emit('taskfinish', item.task, value);
            this.mayHandleNextTask();
        }
    }
    async onItemError(item, err) {
        await this.prepareItem(item);
        if (!this.removeFromRunning(item)) {
            return;
        }
        this.failedItems.push(item);
        this.emit('error', item.task, err);
        if (!this.continueOnError && this.maxRetryTimes === 0) {
            this.onFatalError(err);
        }
        else {
            this.mayHandleNextTask();
        }
    }
    // Prepare until we can handle it, normally is the state changed from pause to resume.
    async prepareItem(item) {
        item.abort = null;
        if (this.resumePromise) {
            await this.resumePromise;
        }
    }
    removeFromRunning(item) {
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
    abort(err = 'manually') {
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
     * End and finish queue, abort all running tasks and clear all tasks and handling records.
     * Returns `true` if queue clear successfully.
     */
    clear() {
        if (this.state === QueueState.Aborted) {
            return false;
        }
        this.state = QueueState.Finish;
        this.tasks = [];
        this.failedItems = [];
        this.handledCount = 0;
        this.abortRunningItems();
        this.emit('finish');
        this.emit('end');
        if (this.resumeResolve) {
            this.resumeResolve();
        }
        return true;
    }
    /** Remove all not running tasks. */
    clearNotRunning() {
        this.tasks = [];
        this.failedItems = [];
        this.handledCount = 0;
    }
    /** Push tasks to queue. */
    push(...tasks) {
        if (this.keysFound) {
            for (let task of tasks) {
                this.keysFound.add(task[this.key]);
            }
        }
        this.tasks.push(...tasks);
        if (this.state === QueueState.Finish) {
            this.start();
        }
        this.mayHandleNextTask();
    }
    /** Unshift tasks to queue. */
    unshift(...tasks) {
        if (this.keysFound) {
            for (let task of tasks) {
                this.keysFound.add(task[this.key]);
            }
        }
        this.tasks.unshift(...tasks);
        if (this.state === QueueState.Finish) {
            this.start();
        }
        this.mayHandleNextTask();
    }
    /** Returns true if found same key task. */
    has(task) {
        if (this.keysFound) {
            return this.keysFound.has(task[this.key]);
        }
        else {
            return false;
        }
    }
    /** Push tasks to queue, if not found same key task. */
    add(...tasks) {
        tasks = tasks.filter(t => !this.has(t));
        if (tasks.length > 0) {
            this.push(...tasks);
        }
    }
    /** Unshift tasks to queue, if not found same key task. */
    addToStart(...tasks) {
        tasks = tasks.filter(t => !this.has(t));
        if (tasks.length > 0) {
            this.unshift(...tasks);
        }
    }
    /** Find first task match `fn`, handled tasks can't be found. */
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
     * Only tasks that are running or not been handled can be removed.
     */
    remove(...tasksToRemove) {
        let taskSet = new Set(tasksToRemove);
        return this.removeWhere(task => taskSet.has(task));
    }
    /**
     * Removes all tasks that matched `fn`.
     * Only tasks that are running or not been handled can be removed.
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
        this.mayHandleNextTask();
        return toRemove;
    }
}
exports.Queue = Queue;
/**
 * Run tasks in queue, returns a promise which will be resolved after queue finished.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task.
 * @param concurrency Specify how many tasks to run simultaneously.
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
 * Run tasks in queue, returns a promise which will be resolved with returned values from handler after queue finished.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a value.
 * @param concurrency Specify how many tasks to run simultaneously.
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
 * Run tasks in queue, returns a promise which will be resolved if some tasks match handler.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a boolean value.
 * @param concurrency Specify how many tasks to run simultaneously.
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
 * Run tasks in queue, returns a promise which will be resolved if every tasks match handler.
 * @param tasks The task array which will be passed to handler in order.
 * @param handler The handler to handle each task. It should returns a boolean value.
 * @param concurrency Specify how many tasks to run simultaneously.
 */
function queueEvery(tasks, handler, concurrency) {
    return queueSome(tasks, async (task) => !(await handler(task)), concurrency).then(value => !value);
}
exports.queueEvery = queueEvery;

},{"./emitter":4,"./object":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * Select sub matches from `string` by matching `re`, then format a `template` with sub matches.
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
 * Select sub matches from `string` by matching `re`, then format a `template` with sub matches.
 * Returns the format results.
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
 * Returns specified `index` of sub matches from executing `re` on `string`.
 * @param string The string to select sub match.
 * @param re The RegExp to execute on string.
 * @param index Select the sub match in the index from match resul.
 */
function subMatchAt(string, re, index) {
    let match = re.exec(string);
    if (match) {
        return match[index] || '';
    }
    else {
        return '';
    }
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
 * For each match result from executing `re` on `string`, picks specified `index` of sub matches, returns array of them.
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
 * Returns array of sub matches from executing `re` on `string`.
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
 * Will keep the placeholder if no match found.
 * @param template String to format
 * @param args The arguments to replace ${...} to.
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
 * Get the left part of `string` before `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If true, when substring can't be found in string, returns the whole string.
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
 * Get the right part of `string` before `substring`.
 * @param string The string to search substring.
 * @param substring The sub part to search in string.
 * @param greedy If true, when substring can't be found in string, returns the whole string.
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
 * @param greedy If true, when substring can't be found in string, returns the whole string.
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
 * @param greedy If true, when substring can't be found in string, returns the whole string.
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
    return string.replace(/[-_ ][a-z]/g, m0 => m0[1].toUpperCase());
}
exports.toCamerCase = toCamerCase;
/**
 * Transform `string` to dash case type by spliting words with `-`.
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
 * Transform `string` to dash case by spliting words with `_`.
 * @param string The string to transform.
 */
function toUnderscoreCase(string) {
    return toDashCase(string).replace(/-/g, '_');
}
exports.toUnderscoreCase = toUnderscoreCase;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a promise which will be resolved after `ms` milliseconds.
 * @param ms The sleep time in milliseconds.
 */
function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("./css");
const node_1 = require("./node");
const util_1 = require("./util");
/**
 * Align `el` to `target` element by specified position.
 * If no enough space, will adjust align position automatically.
 * Note that this mathod will always cause reflow.
 * @param el The element to align, it's position should be fixed or absolute.
 * @param target The target element to align to.
 * @param position The position that aligning according to, `[Y of el][X of el]-[Y of target][X of target]` or `[Touch][Align]` or `[Touch]`.
 * @param options Additional options.
 */
function align(el, target, position, options = {}) {
    new Aligner(el, target, position, options);
}
exports.align = align;
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
function completeAlignPosition(pos) {
    if (pos.length === 1) {
        pos = 'tb'.includes(pos) ? pos + 'c' : 'c' + pos;
    }
    return pos;
}
/**
 * Get main align direction from align position string, can be used to set trangle styles.
 * @param pos Align position like `t`, `tc`, `bc-tc`.
 */
function getMainAlignDirection(pos) {
    let position = parseAlignPosition(pos);
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
class Aligner {
    constructor(el, target, position, options = {}) {
        this.x = 0;
        this.y = 0;
        this.el = el;
        this.target = target;
        this.trangle = options.trangle || null;
        this.position = parseAlignPosition(position);
        this.canShrinkInY = !!options.canShrinkInY;
        this.direction = this.getDirections();
        this.margin = this.parseMargin(options.margin || 0);
        this.targetRect = this.getExtendedRect();
        this.w = this.el.offsetWidth;
        if (this.canShrinkInY) {
            this.h = this.getNaturalHeight();
        }
        else {
            this.h = this.el.offsetHeight;
        }
        this.align();
    }
    align() {
        // If target not affected by document scrolling, el should same
        if (util_1.getClosestFixedElement(this.target)) {
            css_1.setStyle(this.el, 'position', 'fixed');
        }
        let anchor1 = this.getFixedAnchor(this.w, this.h, this.position[0]);
        let anchor2 = this.getAbsoluteAnchor(this.targetRect, this.position[1]);
        this.y = anchor2[1] - anchor1[1];
        let overflowYSet = this.alignVertical();
        // If scrollbar appeared, width of el may change
        if (overflowYSet) {
            this.w = this.el.offsetWidth;
            anchor1 = this.getFixedAnchor(this.w, this.h, this.position[0]);
        }
        this.x = anchor2[0] - anchor1[0];
        this.alignHerizontal();
        // Handle trangle position
        if (this.trangle) {
            this.alignTrangle();
        }
        // If is not fixed, minus coordinates relative to offsetParent
        if (getComputedStyle(this.el).position !== 'fixed' && this.target !== document.body && this.target !== document.documentElement) {
            var offsetParent = this.el.offsetParent;
            // If we use body's top postion, it will cause a bug when body has a margin top (even from margin collapse)
            if (offsetParent) {
                var parentRect = offsetParent.getBoundingClientRect();
                this.x -= parentRect.left;
                this.y -= parentRect.top;
            }
        }
        css_1.setStyle(this.el, {
            left: Math.round(this.x),
            top: Math.round(this.y),
        });
    }
    getDirections() {
        return {
            top: this.position[0].includes('b') && this.position[1].includes('t'),
            right: this.position[0].includes('l') && this.position[1].includes('r'),
            bottom: this.position[0].includes('t') && this.position[1].includes('b'),
            left: this.position[0].includes('r') && this.position[1].includes('l'),
        };
    }
    /** top [right] [bottom] [left] -> [t, r, b, l]. */
    parseMargin(marginOption) {
        let margin = Array.isArray(marginOption) ? [...marginOption] : [marginOption];
        margin[0] = margin[0] || 0;
        margin[1] = margin[1] !== undefined ? margin[1] || 0 : margin[0];
        margin[2] = margin[2] !== undefined ? margin[2] || 0 : margin[0];
        margin[3] = margin[3] !== undefined ? margin[3] || 0 : margin[1];
        if (this.trangle) {
            if (this.direction.top || this.direction.bottom) {
                margin[0] += this.trangle.offsetHeight;
                margin[2] += this.trangle.offsetHeight;
            }
            if (this.direction.left || this.direction.right) {
                margin[1] += this.trangle.offsetWidth;
                margin[3] += this.trangle.offsetWidth;
            }
        }
        return margin;
    }
    getExtendedRect() {
        let rect = node_1.getRect(this.target);
        rect.top -= this.margin[0];
        rect.height += this.margin[0] + this.margin[2];
        rect.bottom = rect.top + rect.height;
        rect.left -= this.margin[3];
        rect.width += this.margin[1] + this.margin[3];
        rect.right = rect.left + rect.width;
        return rect;
    }
    /**
     * When el can be scrolled, if we just expend it to test its natural height, it's scrolled position will lost.
     * So we get `scrollHeight - clientHeight` as a diff and add it to it's current height as it's natural height.
     * Note that the `trangle` will cause `scrollHeight` plus for it's height.
     * Otherwise may not el but child is scrolled.
     */
    getNaturalHeight() {
        let h = this.el.offsetHeight;
        let diffHeight = this.el.scrollHeight - this.el.clientHeight;
        let maxAllowdDiffWhenNotScrolled = this.trangle ? this.trangle.offsetHeight : 0;
        if (diffHeight <= maxAllowdDiffWhenNotScrolled) {
            diffHeight = Math.max(...[...this.el.children].map(child => child.scrollHeight - child.clientHeight));
        }
        if (diffHeight > 0) {
            h = h + diffHeight;
        }
        else {
            css_1.setStyle(this.el, 'height', '');
            h = this.el.offsetHeight;
        }
        return h;
    }
    /** get fixed anchor position in viewport */
    getFixedAnchor(w, h, anchor) {
        let x = anchor.includes('l') ? 0 : anchor.includes('r') ? w : w / 2;
        let y = anchor.includes('t') ? 0 : anchor.includes('b') ? h : h / 2;
        return [x, y];
    }
    /** get absolute anchor position in scrolling page */
    getAbsoluteAnchor(rect, anchor) {
        let x = anchor.includes('l') ? 0 : anchor.includes('r') ? rect.width : rect.width / 2;
        let y = anchor.includes('t') ? 0 : anchor.includes('b') ? rect.height : rect.height / 2;
        x += rect.left;
        y += rect.top;
        return [x, y];
    }
    alignVertical() {
        let dh = document.documentElement.clientHeight;
        let spaceTop = this.targetRect.top;
        let spaceBottom = dh - this.targetRect.bottom;
        let overflowYSet = false;
        let y = this.y;
        if (this.direction.top || this.direction.bottom) {
            if (this.direction.top && y < 0 && spaceTop < spaceBottom) {
                y = this.targetRect.bottom;
                this.direction.top = false;
                this.direction.bottom = true;
            }
            else if (y + this.h > dh && spaceTop > spaceBottom) {
                y = this.targetRect.top - this.h;
                this.direction.top = true;
                this.direction.bottom = false;
            }
        }
        else {
            if (y + this.h > dh) {
                y = dh - this.h;
            }
            if (y < 0) {
                y = 0;
            }
        }
        if (y < 0) {
            if (this.direction.top && this.canShrinkInY) {
                y = 0;
                css_1.setStyle(this.el, 'height', spaceTop);
                overflowYSet = true;
            }
        }
        else if (this.direction.bottom && y + this.h > dh) {
            if (this.canShrinkInY) {
                css_1.setStyle(this.el, 'height', spaceBottom);
                overflowYSet = true;
            }
        }
        this.y = y;
        return overflowYSet;
    }
    alignHerizontal() {
        let dw = document.documentElement.clientWidth;
        let spaceLeft = this.targetRect.left;
        let spaceRight = dw - this.targetRect.right;
        let x = this.x;
        if (this.direction.left || this.direction.right) {
            if (this.direction.left && x < 0 && spaceLeft < spaceRight) {
                x = this.targetRect.right;
                this.direction.left = false;
                this.direction.right = true;
            }
            else if (this.direction.right && x > dw - this.w && spaceLeft > spaceRight) {
                x = this.targetRect.left - this.w;
                this.direction.left = true;
                this.direction.right = false;
            }
        }
        else {
            if (x + this.w > dw) {
                x = dw - this.w;
            }
            if (x < 0) {
                x = 0;
            }
        }
        this.x = x;
    }
    alignTrangle() {
        let swapX = false;
        let swapY = false;
        let trangle = this.trangle;
        if (this.direction.top || this.direction.bottom) {
            let tx;
            let top = css_1.getStyleAsNumber(trangle, 'top');
            let bottom = css_1.getStyleAsNumber(trangle, 'bottom');
            if (this.w >= this.targetRect.width) {
                tx = this.targetRect.left + this.targetRect.width / 2 - this.x - trangle.offsetWidth / 2;
            }
            else {
                tx = this.w / 2 - trangle.offsetWidth / 2;
            }
            css_1.setStyle(trangle, { left: tx, right: '' });
            if (top < 0) {
                if (this.direction.top) {
                    swapY = true;
                    css_1.setStyle(trangle, { top: 'auto', bottom: top });
                }
            }
            else if (bottom < 0) {
                if (this.direction.bottom) {
                    swapY = true;
                    css_1.setStyle(trangle, { top: bottom, bottom: 'auto' });
                }
            }
            else {
                css_1.setStyle(trangle, { top: '', bottom: '' });
            }
        }
        if (this.direction.left || this.direction.right) {
            let ty;
            let tLeft = css_1.getStyleAsNumber(trangle, 'left');
            let tRight = css_1.getStyleAsNumber(trangle, 'right');
            if (this.h >= this.targetRect.height) {
                ty = this.targetRect.top + this.targetRect.height / 2 - this.y - trangle.offsetHeight / 2;
            }
            else {
                ty = this.h / 2 - trangle.offsetHeight / 2;
            }
            css_1.setStyle(trangle, { top: ty, bottom: '' });
            if (tLeft < 0) {
                if (this.direction.left) {
                    swapX = true;
                    css_1.setStyle(trangle, { left: 'auto', right: tLeft });
                }
            }
            else if (tRight < 0) {
                if (this.direction.right) {
                    swapX = true;
                    css_1.setStyle(trangle, { left: tRight, right: 'auto' });
                }
            }
            else {
                css_1.setStyle(trangle, { left: '', right: '' });
            }
        }
        if (swapX || swapY) {
            let oldTransform = trangle.style.transform;
            let newTransform = '';
            if (swapX) {
                newTransform = 'rotateY(180deg)';
            }
            if (swapY) {
                newTransform = 'rotateX(180deg)';
            }
            if (newTransform === oldTransform) {
                newTransform = '';
            }
            css_1.setStyle(trangle, 'transform', newTransform);
        }
    }
}
exports.Aligner = Aligner;
/**
 * Align element to a mouse event.
 * @param el A fixed position element to align.
 * @param event A mouse event to align to.
 * @param offset `[x, y]` offset to adjust align position.
 */
function alignToEvent(el, event, offset = [0, 0]) {
    if (css_1.getStyle(el, 'position') !== 'fixed') {
        throw new Error(`Element to call "alignToEvent" must be fixed layout`);
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
    css_1.setStyle(el, {
        left: Math.round(x),
        top: Math.round(y),
    });
}
exports.alignToEvent = alignToEvent;

},{"./css":15,"./node":21,"./util":25}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("./css");
const util_1 = require("./util");
exports.defaultAnimationDuration = 200;
exports.defaultAnimationEasing = 'ease-out-quad';
const ElementAnimationMap = new WeakMap();
// Copied from `Bourbon` source codes.
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
 * Get `cubic-bezier(...)` from easing name.
 * @param easing The extended easing name.
 */
function getEasing(easing) {
    return CUBIC_BEZIER_EASINGS.hasOwnProperty(easing)
        ? 'cubic-bezier(' + CUBIC_BEZIER_EASINGS[easing].join(', ') + ')'
        : easing;
}
exports.getEasing = getEasing;
/**
F(t)  = (1-t)^3 * P0 + 3t(1-t)^2 * P1 + 3t^2(1-t)^2 * P2 + t^3 * P3, t in [0, 1]

Cx(t) = 3t(1-t)^2 * x1 + 3t^2(1-t) * x2 + t^3
      = (3x1 - 3x2 + 1) * t^3 + (-6x1 + 3x2) * t^2 + 3x1 * t

Cx(t) = x
      => (3x1 - 3x2 + 1) * t^3 + (-6x1 + 3x2) * t^2 + 3x1 * t = x

Cy(t) = 3t(1-t)^2 * y1 + 3t^2(1-t) * y2 + t^3 = y

For any `x` betweens [0, 1], got `t` from Cx(t), then got `y` from Cy(t).
*/
function getCubicBezierEasingFunction(name) {
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
function playIntervalAnimation(duration = exports.defaultAnimationDuration, easing = exports.defaultAnimationEasing, onInterval, onEnd) {
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
 * Animate numberic style property or `scrollLeft` and `scrollTop` on `el`.
 * Execute animation by setting values in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param startValue The start value of `property`.
 * @param endValue  The end value of `property`.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateProperty(el, property, startValue, endValue, duration, easing = exports.defaultAnimationEasing) {
    let stop;
    let promise = new Promise((resolve) => {
        stop = playIntervalAnimation(duration, easing, (y) => {
            let value = startValue + (endValue - startValue) * y;
            if (property === 'scrollTop' || property === 'scrollLeft') {
                el[property] = value;
            }
            else {
                css_1.setStyle(el, property, value);
            }
        }, resolve);
    });
    return {
        promise,
        stop,
    };
}
exports.animateProperty = animateProperty;
/**
 * Animate numberic style property or `scrollLeft` and `scrollTop` on `el`.
 * Execute animation by setting values in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param startValue The start value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animatePropertyFrom(el, property, startValue, duration, easing = exports.defaultAnimationEasing) {
    let endValue;
    if (property === 'scrollTop' || property === 'scrollLeft') {
        endValue = el[property];
    }
    else {
        endValue = css_1.getStyleAsNumber(el, property);
    }
    return animateProperty(el, property, startValue, endValue, duration, easing);
}
exports.animatePropertyFrom = animatePropertyFrom;
/**
 * Animate numberic style property or `scrollLeft` and `scrollTop` on `el`.
 * Execute animation by setting values in `requestAnimationFrame`.
 * @param el The element to animate.
 * @param property The style property or `scrollLeft` and `scrollTop`.
 * @param endValue The end value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animatePropertyTo(el, property, endValue, duration, easing = exports.defaultAnimationEasing) {
    let startValue;
    if (property === 'scrollTop' || property === 'scrollLeft') {
        startValue = el[property];
    }
    else {
        startValue = css_1.getStyleAsNumber(el, property);
    }
    return animateProperty(el, property, startValue, endValue, duration, easing);
}
exports.animatePropertyTo = animatePropertyTo;
/**
 * Animate by a value range, `fn` recives current value as argument.
 * @param fn The function which will got a current state number value as argument.
 * @param startValue The start value.
 * @param endValue  The end value.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateByFunction(fn, startValue, endValue, duration, easing = exports.defaultAnimationEasing) {
    let stop;
    let promise = new Promise((resolve) => {
        stop = playIntervalAnimation(duration, easing, (y) => {
            fn(startValue + (endValue - startValue) * y);
        }, resolve);
    });
    return {
        promise,
        stop,
    };
}
exports.animateByFunction = animateByFunction;
/**
 * Execute standard web animation on element.
 * After animation end, the state of element will go back to the start state.
 * @param el The element to execute web animation.
 * @param startFrame The start frame.
 * @param endFrame The end frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animate(el, startFrame, endFrame, duration = exports.defaultAnimationDuration, easing = exports.defaultAnimationEasing) {
    if (!el.animate) {
        return Promise.resolve(false);
    }
    stopAnimation(el);
    startFrame = util_1.normativeStyleObject(startFrame);
    endFrame = util_1.normativeStyleObject(endFrame);
    let cubicEasing = getEasing(easing);
    let animation = el.animate([startFrame, endFrame], {
        easing: cubicEasing,
        duration,
    });
    el.style.pointerEvents = 'none';
    ElementAnimationMap.set(el, animation);
    return new Promise((resolve) => {
        animation.addEventListener('finish', () => {
            el.style.pointerEvents = '';
            ElementAnimationMap.delete(el);
            resolve(true);
        }, false);
        animation.addEventListener('cancel', () => {
            ElementAnimationMap.delete(el);
            resolve(false);
        }, false);
    });
}
exports.animate = animate;
/** The default style of element, which is not 0 */
const DEFAULT_STYLE = {
    transform: 'none'
};
/**
 * Execute standard web animation on element with start frame specified, the end frame will be set as zero or empty values.
 * @param el The element to execute web animation.
 * @param startFrame The start frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateFrom(el, startFrame, duration = exports.defaultAnimationDuration, easing = exports.defaultAnimationEasing) {
    let endFrame = {};
    let style = getComputedStyle(el);
    for (let property in startFrame) {
        endFrame[property] = style[property] || DEFAULT_STYLE[property] || '0';
    }
    return animate(el, startFrame, endFrame, duration, easing);
}
exports.animateFrom = animateFrom;
/**
 * Execute standard web animation on element with end frame specified, the end frame will be specified as values of current state.
 * After animation executed, will apply end frame values to element.
 * @param el The element to execute web animation.
 * @param endFrame The end frame.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
async function animateTo(el, endFrame, duration = exports.defaultAnimationDuration, easing = exports.defaultAnimationEasing) {
    let startFrame = {};
    let style = getComputedStyle(el);
    // Fix '' to `0` or `none`
    let standardEndFrame = Object.assign({}, endFrame);
    for (let property in standardEndFrame) {
        if (standardEndFrame[property] === '') {
            standardEndFrame[property] = DEFAULT_STYLE[property] || '0';
        }
    }
    for (let property in endFrame) {
        startFrame[property] = style[property] || DEFAULT_STYLE[property] || '0';
    }
    let finish = await animate(el, startFrame, standardEndFrame, duration, easing);
    if (finish) {
        css_1.setStyle(el, endFrame);
    }
    return finish;
}
exports.animateTo = animateTo;
/** Execute standard web animation, capture current state as start frame, and capture a new state later as end frame.
 * @param el The element to execute web animation.
 * @param properties The style properties to capture.
 * @param duration The animation duration.
 * @param easing  The animation easing.
 */
function animateToNextFrame(el, properties, duration = exports.defaultAnimationDuration, easing = exports.defaultAnimationEasing) {
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
 * Stop executing animation on element.
 * @param el The element to stop animation on.
 */
function stopAnimation(el) {
    let animation = ElementAnimationMap.get(el);
    if (animation) {
        animation.cancel();
        el.style.pointerEvents = '';
        ElementAnimationMap.delete(el);
    }
}
exports.stopAnimation = stopAnimation;

},{"./css":15,"./util":25}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
 * Get computed style value as number from element.
 * Note that this method may cause reflow.
 * @param el The element to get numeric value.
 * @param property The property name in camer case, `backgroundColor` as example.
 */
function getStyleAsNumber(el, property) {
    let value = getStyle(el, property);
    return value ? parseFloat(value) || 0 : 0;
}
exports.getStyleAsNumber = getStyleAsNumber;
/**
 * Get computed style value from element.
 * Note that this method may cause reflow.
 * @param el The element to get style value.
 * @param property The property name in camer case, `backgroundColor` as example.
 */
function getStyle(el, property) {
    return getComputedStyle(el)[property];
}
exports.getStyle = getStyle;
function setStyle(el, propertyOrMap, value) {
    if (typeof propertyOrMap === 'object') {
        for (let prop of Object.keys(propertyOrMap)) {
            setStyle(el, prop, propertyOrMap[prop]);
        }
    }
    else {
        el.style.setProperty(propertyOrMap, util_1.normativeStyleValue(propertyOrMap, value));
    }
}
exports.setStyle = setStyle;

},{"./util":25}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Download url as a file with specified `fileName`.
 * Not that `fileName` may not working for cross domain resources.
 * The final behavior depends on browser.
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
 * Select single file match MIME type by `<input type="file">`.
 * @param The MIME type of files.
 */
function selectFile(mime) {
    return selectFileOrFolder(mime, false, false);
}
exports.selectFile = selectFile;
/**
 * Select multiple files match MIME type by `<input type="file" multiple">`.
 * @param The MIME type of files.
 */
function selectMultipleFile(mime) {
    return selectFileOrFolder(mime, false, true);
}
exports.selectMultipleFile = selectMultipleFile;
/**
 * Select single folder by `<input type="file"directory>`.
 */
function selectFolder() {
    return selectFileOrFolder("*", true, false);
}
exports.selectFolder = selectFolder;
/**
 * Select multiple folder by `<input type="file" directory multiple>`.
 */
function selectMultipleFolder() {
    return selectFileOrFolder("*", true, true);
}
exports.selectMultipleFolder = selectMultipleFolder;
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
        function onDomFocus() {
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
 * Get files in DataTransfer object captured from drop event.
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
async function readFilesFromEntry(entry) {
    let files = [];
    return new Promise(async (resolve, reject) => {
        if (!entry) {
            resolve();
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

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Encode `<>` to `&...` to makesure HTML codes safe to append into document.
 * @param code Text to be encoded.
 */
function encodeHTML(code) {
    return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
exports.encodeHTML = encodeHTML;
/**
 * Decode HTML codes which includes `&...` to mapped readable characters.
 * @param code Encoded HTML codes.
 */
function decodeHTML(code) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(`<!DOCTYPE html><body>${code}</body></html>`, 'text/html');
    return dom.body.textContent;
}
exports.decodeHTML = decodeHTML;

},{}],18:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./css"));
__export(require("./node"));
__export(require("./align"));
__export(require("./scroll"));
__export(require("./animate"));
__export(require("./mouse-leave"));
__export(require("./file"));
__export(require("./query"));
__export(require("./storage"));
__export(require("./watch-layout"));
__export(require("./net"));
__export(require("./html"));

},{"./align":13,"./animate":14,"./css":15,"./file":16,"./html":17,"./mouse-leave":19,"./net":20,"./node":21,"./query":22,"./scroll":23,"./storage":24,"./watch-layout":26}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * It's common that popup2 triggered from an existing popup1,
 * later when mouse moved to popup2, popup1 will disappear because mouse leaves.
 *
 * This is not correct, so we implement a mouse leave stack:
 *   1. When popup2 generated, we check the trigger element if it was contained (not equal) in elements of existing popups.
 *   2. If so, we lock the exist popup until popup2 disappeared.
 *
 * Caution: never forget to unregister mouse leave binding before elements disconnected.
 */
var MouseLeave;
(function (MouseLeave) {
    const Controllers = new Set();
    /**
     * Make sure elements and all their ancestors can't trigger mouse leave callback and becomes invisible.
     * Normally used for contextmenu to keep parent popup showing.
     * @param elOrS Element or array of element.
     */
    function keep(elOrS) {
        let controller = getControllerContains(elOrS);
        if (controller) {
            controller.lock();
        }
        return () => {
            if (controller) {
                controller.unlock();
                controller = null;
            }
        };
    }
    MouseLeave.keep = keep;
    /** Keep parent elements visible. */
    function keepParents(elOrS) {
        let els = Array.isArray(elOrS) ? elOrS : [elOrS];
        let parents = els.map(el => el.parentElement).filter(el => el && el !== document.body);
        return keep(parents);
    }
    /** Get Controller whose related elements contains and or equal one of specified elements. */
    function getControllerContains(elOrS) {
        let els = Array.isArray(elOrS) ? elOrS : [elOrS];
        for (let controller of [...Controllers].reverse()) {
            for (let el of els) {
                if (controller.els.some(controllerEl => controllerEl.contains(el))) {
                    return controller;
                }
            }
        }
        return null;
    }
    /**
     * Check if element or any of it's ancestors was kept to be visible.
     * If element is not been kept, you can destroy or reuse it immediately.
     * It allows `el` equals to controller element.
     * @param el Element to check.
     */
    function inUse(el) {
        for (let controller of [...Controllers].reverse()) {
            if (controller.els.some(controllerEl => controllerEl.contains(el))) {
                return controller.mouseIn;
            }
        }
        return false;
    }
    MouseLeave.inUse = inUse;
    /**
     * Call `callback` after mouse leaves all of the elements for `ms` milliseconds.
     * It's very usefull to handle mouse hover event in menu & submenu.
     * @param elOrS The element array to capture leave at.
     * @param ms If mouse leaves all the element and don't enter elements again, call callback. Default value is 200.
     * @param callback The callback to call after mouse leaves all the elements.
     */
    function on(elOrS, callback, options) {
        let controller = new MouseLeaveController(false, elOrS, callback, options);
        return () => controller.cancel();
    }
    MouseLeave.on = on;
    /**
     * Call `callback` after mouse leaves all of the elements for `ms` milliseconds, only trigger `callback` for once.
     * It's very usefull to handle mouse event in menu & submenu.
     * @param elOrS The element array to capture leave at.
     * @param ms If mouse leaves all the element and don't enter elements again, call callback. Default value is 200.
     * @param callback The callback to call after mouse leaves all the elements.
     */
    function once(elOrS, callback, options) {
        let controller = new MouseLeaveController(true, elOrS, callback, options);
        return () => controller.cancel();
    }
    MouseLeave.once = once;
    class MouseLeaveController {
        constructor(isOnce, elOrS, callback, options) {
            this.mouseIn = false;
            // Why not a boolean property?
            // When a sub popup hide, it will trigger unlock on ontroller later, not immediately.
            // But a new sub popup may trigger lock on ontroller, and then old sub popup trigger unlock.
            // `old lock -> new lock -> old unlock`, cause controller to be canceled.
            this.lockCount = 0;
            this.delay = 200;
            this.ended = false;
            this.timer = null;
            this.isOnce = isOnce;
            this.els = Array.isArray(elOrS) ? elOrS : [elOrS];
            this.callback = callback;
            if (options) {
                Object.assign(this, options);
            }
            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
            for (let el of this.els) {
                el.addEventListener('mouseenter', this.onMouseEnter, false);
                el.addEventListener('mouseleave', this.onMouseLeave, false);
            }
            this.unkeep = keepParents(elOrS);
            Controllers.add(this);
        }
        onMouseEnter() {
            this.mouseIn = true;
            this.clearTimeout();
        }
        onMouseLeave() {
            this.mouseIn = false;
            if (this.lockCount === 0) {
                this.startTimeout();
            }
        }
        startTimeout() {
            this.clearTimeout();
            this.timer = setTimeout(() => this.onTimeout(), this.delay);
        }
        onTimeout() {
            this.timer = null;
            if (!this.mouseIn) {
                this.flush();
            }
        }
        clearTimeout() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
        flush() {
            if (this.ended) {
                return;
            }
            if (this.isOnce) {
                this.cancel();
            }
            this.callback();
        }
        cancel() {
            if (this.ended) {
                return;
            }
            this.clearTimeout();
            for (let el of this.els) {
                el.removeEventListener('mouseenter', this.onMouseEnter, false);
                el.removeEventListener('mouseleave', this.onMouseLeave, false);
            }
            this.ended = true;
            this.unkeep();
            Controllers.delete(this);
        }
        lock() {
            this.clearTimeout();
            this.lockCount++;
        }
        unlock() {
            this.lockCount--;
            if (this.lockCount === 0) {
                if (!this.mouseIn) {
                    this.flush();
                }
            }
        }
    }
})(MouseLeave = exports.MouseLeave || (exports.MouseLeave = {}));

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../base/string");
const base_1 = require("../base");
/**
 * Preload resources from their urls, and get total progress notifications.
 * Please beware of the CORS settings at the server.
 * If you want the progress working, please makesure the `content-length` response header.
 */
class ResourceLoader extends base_1.Emitter {
    constructor(options = {}) {
        super();
        /** URL base. */
        this.base = '';
        /** If `true`, will continue request other resource if error occurs, default value is `false` */
        this.continueOnError = false;
        this.blobMap = new Map();
        Object.assign(this, options);
    }
    async load(urls) {
        let normalized = this.normalizeResources(urls);
        let sizes = (await this.getTotalSizes(normalized.map(v => v.url))).map(v => v || 0);
        let totalSize = base_1.sum(sizes);
        let completedSize = 0;
        for (let { name, url, type } of normalized) {
            try {
                let blob = await this.loadOne(name, url, (loaded) => {
                    this.emit('progress', Math.min(completedSize + loaded, totalSize), totalSize);
                });
                completedSize += sizes.shift();
                if (blob) {
                    await this.handleBlob(type, blob);
                }
            }
            catch (err) {
                if (!this.continueOnError) {
                    throw err;
                }
            }
        }
    }
    async getTotalSizes(urls) {
        let promises = [];
        for (let url of urls) {
            promises.push(this.getURLSize(url));
        }
        return await Promise.all(promises);
    }
    async getURLSize(url) {
        let res = await fetch(this.getAbsoluteURL(url), { method: 'HEAD' });
        let length = res.headers.get('content-length');
        return length === null ? null : Number(length) || null;
    }
    getAbsoluteURL(url) {
        if (/^(?:https?:|\/\/)/.test(url) || !this.base) {
            return url;
        }
        return this.base + url;
    }
    normalizeResources(resources) {
        return resources.map(r => {
            if (typeof r === 'string') {
                return {
                    name: this.getBaseNameFromURL(r),
                    url: r,
                    type: this.inferResourceTypeFromURL(r)
                };
            }
            else {
                return {
                    name: r.name || this.getBaseNameFromURL(r.url),
                    url: r.url,
                    type: r.type || 'blob'
                };
            }
        });
    }
    getBaseNameFromURL(url) {
        return string_1.firstMatch(url, /([^\/]+)$/).replace(/\.\w+$/, '');
    }
    inferResourceTypeFromURL(url) {
        let ext = string_1.firstMatch(url, /\.(\w+)(?:\?.*?)?$/).toLowerCase();
        if (['css', 'js'].includes(ext)) {
            return ext;
        }
        else {
            return 'blob';
        }
    }
    async loadOne(name, url, onprogress) {
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
                    this.blobMap.set(name, xhr.response);
                    this.blobMap.set(absloteURL, xhr.response);
                    resolve(xhr.response);
                }
                else {
                    reject();
                }
            };
            xhr.send();
        });
    }
    async handleBlob(type, blob) {
        if (type === 'css') {
            await this.loadStyle(blob);
        }
        else if (type === 'js') {
            await this.loadScript(blob);
        }
    }
    loadStyle(blob) {
        return new Promise((resolve, reject) => {
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = URL.createObjectURL(blob);
            document.head.append(link);
            link.addEventListener('load', () => resolve());
            link.addEventListener('error', () => reject());
        });
    }
    loadScript(blob) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.async = false;
            script.src = URL.createObjectURL(blob);
            document.head.append(script);
            script.addEventListener('load', () => resolve());
            script.addEventListener('error', () => reject());
        });
    }
    /**
     * Get resource as blob URL.
     * @param name The defined resource name or base name of url.
     */
    getAsBlobURL(name) {
        let blob = this.blobMap.get(name);
        if (!blob) {
            return null;
        }
        return URL.createObjectURL(blob);
    }
    /**
     * Get resource as text.
     * @param name The defined resource name or base name of url.
     */
    getAsText(name) {
        return new Promise(resolve => {
            let blob = this.blobMap.get(name);
            if (!blob) {
                return resolve(null);
            }
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsText(blob);
        });
    }
    /**
     * Get resource as HTML document.
     * @param name The defined resource name or base name of url.
     */
    async getAsHTML(name) {
        let text = await this.getAsText(name);
        if (!text) {
            return null;
        }
        return new DOMParser().parseFromString(text, 'text/html');
    }
    /**
     * Get resource as JSON.
     * @param name The defined resource name or base name of url.
     */
    async getAsJSON(name) {
        let text = await this.getAsText(name);
        if (!text) {
            return null;
        }
        return JSON.parse(text);
    }
    /**
     * Get resource as ArrayBuffer.
     * @param name The defined resource name or base name of url.
     */
    async getAsBuffer(name) {
        return new Promise(resolve => {
            let blob = this.blobMap.get(name);
            if (!blob) {
                return resolve(null);
            }
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsArrayBuffer(blob);
        });
    }
    /**
     * Get resource as Image.
     * @param name The defined resource name or base name of url.
     */
    async getAsImage(name) {
        return new Promise(resolve => {
            let blobURL = this.getAsBlobURL(name);
            if (!blobURL) {
                return resolve(null);
            }
            let img = new Image();
            img.src = blobURL;
            img.onload = () => resolve(img);
        });
    }
}
exports.ResourceLoader = ResourceLoader;

},{"../base":7,"../base/string":11}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("./css");
/**
 * Returns the index of node in it's node siblings.
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
 * Returns the index of element in it's element siblings.
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
 * Returns inner width of element, which equals `clientWidth - paddingWidths` or `width - paddingWidths - scrollbarWidth`.
 * Note that this method may cause page reflow.
 * @param el The element to get width.
 */
function getInnerWidth(el) {
    let w = el.clientWidth;
    if (w) {
        return el.clientWidth - css_1.getStyleAsNumber(el, 'paddingLeft') - css_1.getStyleAsNumber(el, 'paddingRight');
    }
    else {
        return 0;
    }
}
exports.getInnerWidth = getInnerWidth;
/**
 * Returns inner height of element, which equals to `clientHeight - paddingHeights` or `height - paddingHeights - scrollbarHeight`.
 * Note that this method may cause page reflow.
 * @param el The element to get height.
 */
function getInnerHeight(el) {
    let h = el.clientHeight;
    if (h) {
        return h - css_1.getStyleAsNumber(el, 'paddingTop') - css_1.getStyleAsNumber(el, 'paddingBottom');
    }
    else {
        return 0;
    }
}
exports.getInnerHeight = getInnerHeight;
/**
 * Returns outer width of element, which equals `offsetWidth + marginWidths`.
 * Note that this method may cause page reflow.
 * @param el The element to get width.
 */
function getOuterWidth(el) {
    let w = el.offsetWidth;
    if (w) {
        return w + css_1.getStyleAsNumber(el, 'marginLeft') + css_1.getStyleAsNumber(el, 'marginRight');
    }
    else {
        return 0;
    }
}
exports.getOuterWidth = getOuterWidth;
/**
 * Returns inner height of element, which equals `offsetHeight + marginHeights`.
 * Note that this method may cause page reflow.
 * @param el The element to get height.
 */
function getOuterHeight(el) {
    let h = el.offsetHeight;
    if (h) {
        return h + css_1.getStyleAsNumber(el, 'marginTop') + css_1.getStyleAsNumber(el, 'marginBottom');
    }
    else {
        return 0;
    }
}
exports.getOuterHeight = getOuterHeight;
/**
 * Returns an object like `getBoundingClientRect`, the didderence is it always returns the rect of visible part for `<html>`.
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
            height: dh
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
            height: rect.height
        };
    }
}
exports.getRect = getRect;
/**
 * Check if element is visible in current viewport.
 * Note that this method may cause page reflow.
 * @param el The element to check if is in view.
 * @param percentage Specify how much percentage of el size implies in view.
 */
function isInview(el, percentage = 0.5) {
    let dw = document.documentElement.clientWidth;
    let dh = document.documentElement.clientHeight;
    let box = getRect(el);
    let xIntersect = Math.min(dw, box.right) - Math.max(0, box.left);
    let yIntersect = Math.min(dh, box.bottom) - Math.max(0, box.top);
    return xIntersect / Math.min(box.width, dw) > percentage
        && yIntersect / Math.min(box.height, dh) > percentage;
}
exports.isInview = isInview;

},{"./css":15}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse `url` search part to a query parameter object.
 * @param url The url to parse query parameter.
 */
function parseQuery(url) {
    let match = url.match(/\?(.+)/);
    let pieces = match ? match[1].split('&') : [];
    let q = {};
    for (let piece of pieces) {
        let [key, value] = piece.split('=');
        if (key) {
            value = decodeURIComponent(value || '');
            q[key] = value;
        }
    }
    return q;
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

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animate_1 = require("./animate");
/**
 * Returns if element can scroll.
 * May return `true` although element has no scroll bar.
 * Note that this method may cause reflow.
 * @param el The element to check scrolling.
 */
function isContentOverflow(el) {
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
exports.isContentOverflow = isContentOverflow;
let scrollBarWidth = null;
/**
 * Get scroll bar width.
 * After first running, the returned value will keep unchanged.
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
 * @param el The element to check scrolling from.
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
 * Scroll scrollbars in closest scroll wrapper for minimal distance to let element enter into the viewport area.
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
                animate_1.animatePropertyTo(wrapper, 'scrollTop', newScrollY, duration, easing);
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
                animate_1.animatePropertyTo(wrapper, 'scrollLeft', newScrollX, duration, easing);
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
 * Returns the scroll direction of scroll wrapper, may be `'x' | 'y' | ''`.
 * @param wrapper The element to get scroll direction.
 */
function getScrollDirection(wrapper) {
    let direction = '';
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
 * Get element's position in it's scroll wrapper's scroll area,
 * which also means the scroll wrapper's scrollTop when when top edges align.
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
 * Scroll scrollbars to let element in the top of the viewport area.
 * Returns true if scrolled.
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
            animate_1.animatePropertyTo(wrapper, 'scrollTop', newScrollY, duration, easing);
        }
        else {
            wrapper.scrollTop = newScrollY;
        }
        return true;
    }
    return false;
}
exports.scrollToTop = scrollToTop;

},{"./animate":14}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSONStorage {
    constructor(prefix) {
        this.prefix = '';
        this.expireSuffix = '_expires_';
        this.supported = null;
        this.prefix = prefix;
    }
    /**
     * Test if localStorage is supported.
     * Will return `false` in private mode.
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
     * Test if has set `key` in localStorage.
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
     * Cache json data into localStorage by `key`.
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
     * Delete cached json data in localStorage with specified `key`.
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
     * Returns a new storage to cache data using `namespace` as prefix of keys.
     * @param namespace The prefix of keys.
     */
    group(namespace) {
        return new JSONStorage(this.prefix + '_' + namespace);
    }
}
/** Like `LocalStorage` very much, except here it read and write JSON datas. */
exports.storage = new JSONStorage('_ff_');

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function normativeStyleObject(styleObject) {
    for (let property of Object.keys(styleObject)) {
        styleObject[property] = normativeStyleValue(property, styleObject[property]);
    }
    return styleObject;
}
exports.normativeStyleObject = normativeStyleObject;
function getClosestFixedElement(el) {
    while (el && el !== document.documentElement) {
        if (getComputedStyle(el).position === 'fixed') {
            break;
        }
        el = el.parentElement;
    }
    return el === document.documentElement ? null : el;
}
exports.getClosestFixedElement = getClosestFixedElement;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const base_1 = require("../base");
const WATCH_STATE_FN = {
    show(el) {
        return el.offsetWidth > 0 || el.offsetHeight > 0;
    },
    hide(el) {
        return el.offsetWidth === 0 && el.offsetHeight === 0;
    },
    inview(el) {
        return node_1.isInview(el);
    },
    outview(el) {
        return !node_1.isInview(el);
    },
    size(el) {
        return {
            width: el.clientWidth,
            height: el.clientHeight,
        };
    },
    rect(el) {
        return node_1.getRect(el);
    },
};
/**
 * Watch specified state, trigger `callback` if state changed.
 * Returns a cancel function.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type The state to watch, can be `'show' | 'hide' | 'inview' | 'outview' | 'size' | 'rect'`.
 * @param callback The callback to call when state changed.
 */
function watchLayout(el, type, callback) {
    return bindWatch(false, false, el, type, callback);
}
exports.watchLayout = watchLayout;
/**
 * Watch specified state, trigger `callback` if it changed for only once.
 * Returns a cancel function.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type The state to watch, can be `'show' | 'hide' | 'inview' | 'outview' | 'size' | 'rect'`.
 * @param callback The callback to call when state changed.
 */
function watchLayoutOnce(el, type, callback) {
    return bindWatch(true, false, el, type, callback);
}
exports.watchLayoutOnce = watchLayoutOnce;
/**
 * Watch specified state, trigger `callback` if the state becomes `true` and never trigger again.
 * Returns a cancel function.
 * Note that this method may slow page speed and cause additional reflow.
 * @param el The element to watch.
 * @param type The state to watch, can be `'show' | 'hide' | 'inview' | 'outview'`.
 * @param callback The callback to call when state becomes true.
 */
function watchLayoutUntil(el, type, callback) {
    return bindWatch(true, true, el, type, callback);
}
exports.watchLayoutUntil = watchLayoutUntil;
function bindWatch(isOnce, untilTrue, el, type, callback) {
    let getState = WATCH_STATE_FN[type];
    let oldState;
    let interval = null;
    let observer = null;
    if (!getState) {
        throw new Error(`Failed to watch, type "${type}" is not supported`);
    }
    // When using with flit, it may cause relayout, so please make sure everything rendered already.
    requestAnimationFrame(() => {
        if (untilTrue) {
            oldState = getState(el);
            if (oldState && untilTrue) {
                callback(oldState);
            }
        }
        if (untilTrue && oldState) {
            return;
        }
        if (type === 'size' && typeof window.ResizeObserver === 'function') {
            observer = new window.ResizeObserver(onResize);
            observer.observe(el);
        }
        else if ((type === 'inview' || type === 'outview') && typeof IntersectionObserver === 'function') {
            observer = new IntersectionObserver(onInviewChange);
            observer.observe(el);
        }
        else {
            oldState = getState(el);
            // `requestAnimationFrame` is better than `setInterval`,
            // because `setInterval` will either lost frame or trigger multiple times betweens one frame.
            // But check frequently will significantly affect rendering performance.
            interval = new base_1.Interval(() => {
                let newState = getState(el);
                onNewState(newState);
            }, 200);
        }
    });
    function onResize(entries) {
        for (let { contentRect } of entries) {
            onNewState({
                width: contentRect.width,
                height: contentRect.height
            });
        }
    }
    function onInviewChange(entries) {
        for (let { intersectionRatio } of entries) {
            let newState = type === 'inview' ? intersectionRatio > 0 : intersectionRatio === 0;
            onNewState(newState);
        }
    }
    function onNewState(newState) {
        if (!valueOrObjectEqual(newState, oldState)) {
            callback(oldState = newState);
            if (isOnce || untilTrue && newState) {
                unwatch();
            }
        }
    }
    function unwatch() {
        if (interval) {
            interval.cancel();
        }
        else if (observer) {
            observer.unobserve(el);
        }
    }
    return unwatch;
}
function valueOrObjectEqual(a, b) {
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

},{"../base":7,"./node":21}],27:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./base"));
__export(require("./dom"));

},{"./base":7,"./dom":18}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ff = require("@pucelle/ff");
const flit = require("@pucelle/flit");
const fui = require("../src");
window.ff = ff;
window.flit = flit;
window.fui = fui;
const flit_1 = require("@pucelle/flit");
const src_1 = require("../src");
flit_1.define('flit-preview', class extends flit.Component {
    render() {
        let { lineHeight } = src_1.theme;
        return flit_1.html `
		<div class="wrapper">
			<section class="theme">
				<h2>Theme</h2>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Mode</f-col>
					<f-col .span="20">
						<f-radiogroup .value="light" @change=${(name) => src_1.theme.changeTheme(name)}>
							<f-radio .value="light" style="margin-right: 20px;">Light</f-radio>
							<f-radio .value="dark" style="margin-right: 20px;">Dark</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Size</f-col>
					<f-col .span="20">
						<f-radiogroup .value="medium" @change=${(name) => src_1.theme.changeTheme(name)}>
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
							<f-icon .type="tips" tooltip="Tips about this field" />
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
				<h3>Inputs</h3>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>With Label</label><br>
						<f-input .type="text" style="width: 100%;" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .placeholder="With Placeholder" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${true} .placeholder="Valid Input" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
				</f-row>
			</section>

			<section>
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<h3>Checkboxes</h3>
						<f-checkboxgroup>
							<f-checkbox .value="1">Unchecked</f-checkbox><br>
							<f-checkbox .value="2" .checked>Checked</f-checkbox><br>
							<f-checkbox .value="3" .indeterminate>Indeterminate</f-checkbox><br>
						</f-checkboxgroup>
					</f-col>

					<f-col .span="6">
						<h3>Radios</h3>
						<f-radiogroup .value="2">
							<f-radio .value="1">Radio Off</f-radio><br>
							<f-radio .value="2" .checked>Radio On</f-radio><br>
						</f-radiogroup>
					</f-col>

					<f-col .span="6">
						<h3>Switchs</h3>
						<f-switch style="margin-right: 8px;" />Switch Off<br>
						<f-switch style="margin-right: 8px;" .checked />Switch On<br>
					</f-col>

					<f-col .span="6">
						<h3>Tags</h3>
						<f-tag .closable>Closable Tag</f-tag><br>
						<f-tag>Normal Tag</f-tag><br>
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Form</h3>

				<f-form>
					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label required>Name</label><br>
							<f-input style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="6">
							<label>Country</label><br>
							<f-input style="width: 100%;" />
						</f-col>

						<f-col .span="6">
							<label>City</label><br>
							<f-select style="width: 100%;" />
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
							<button primary>Save</button>
						</f-col>
					</f-row>
				</f-form>
			</section>

			<section>
				<h3>Select</h3>
				
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<header>Single Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${1}  />
					</f-col>

					<f-col .span="6">
						<header>Multiple Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .multiple .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header>Searchable Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .searchable .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${[1, 2]} />
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
				<h3>Progress Bar</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-progress style="width: 100%;" .value="0" />
						<f-progress style="width: 100%;" .value="0.5" />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Slider</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-slider style="width: 100%;" .value="0" />
					</f-col>
				</f-row>
			</section>

			<f-loader .size="small" />
			<f-loader />
			<f-loader .size="large" />

			<!-- <section>
				<f-slider value="50"></f-slider>
				<f-slider vertical value="50"></f-slider>
			</section>

			<section>
				<f-popover .title="Here is the popover title">
					<button>Popover</button>
					<div slot="content">Here is the popover content</div>
				</f-popover>
			</section>

			<section>
				<f-menu selectable style="width: 200px;">
					<f-menuitem icon="user">User A</f-menuitem>
					<f-menuitem icon="user">User B</f-menuitem>
					<f-submenu>
						<f-menuitem icon="folder">Folder A</f-menuitem>
						<f-menuitem icon="folder">Folder B</f-menuitem>
						<f-submenu>
							<f-menuitem>Item A</f-menuitem>
							<f-menuitem>Item B</f-menuitem>
						</f-submenu>
					</f-submenu>
				</f-menu>
			</section>

			<section>
				<f-dropdown icon="">
					<button><span>Dropdown</span><f-icon .type="down" /></button>
					<f-menu slot="content">
						<f-menuitem icon="user">User A</f-menuitem>
						<f-submenu>
							<f-menuitem>Item A</f-menuitem>
							<f-menuitem>Item B</f-menuitem>
						</f-submenu>
						<f-menuitem icon="user">User B</f-menuitem>
						<f-submenu>
							<f-menuitem icon="folder">Folder A</f-menuitem>
							<f-menuitem icon="folder">Folder B</f-menuitem>
							<f-menuitem icon="folder">Folder C</f-menuitem>
							<f-menuitem icon="folder">Folder D</f-menuitem>
							<f-menuitem icon="folder">Folder E</f-menuitem>
							<f-menuitem icon="folder">Folder F</f-menuitem>
							<f-submenu>
								<f-menuitem>Item A</f-menuitem>
								<f-menuitem>Item B</f-menuitem>
							</f-submenu>
						</f-submenu>	
					</f-menu>
				</f-dropdown>
			</section>

			<section>
				<button @click="${openModal}">Open Modal</button>
			</section>

			<section>
				<button @click="${() => src_1.message.info('This is a info message.')}">Open Info Message</button>
				<button @click="${() => src_1.message.success('This is a success message.')}">Open Success Message</button>
				<button @click="${() => src_1.message.alert('This is an alert message.')}">Open Alert Message</button>
				<button @click="${() => src_1.message.confirm('This is a confirm message.')}">Open Confirm Message</button>
				<button @click="${() => src_1.message.prompt('This is a prompt message.')}">Open Prompt Message</button>
				<button @click="${() => src_1.message.success('This is a success message.', { title: 'Message title' })}">Open Message with title</button>
			</section>

			<section>
				<button @click=${() => src_1.notification.success('This is a success notify')}>Show Success Notification</button>
				<button @click=${() => src_1.notification.alert('This is an alert notify')}>Show Alert Notification</button>
				<button @click=${() => src_1.notification.info('This is an info notify')}>Show Info Notification</button>
				<button @click=${() => src_1.notification.success('This is notify with title specified', { title: 'The notification title' })}>Show Notification with title</button>
			</section>

			<section>
				<f-tree style="width: 200px;" selectable .data=${treeData} />
			</section>

			<section style="height: 200px; overflow: auto; position: relative; background: ${src_1.theme.backgroundColor.darken(3)};">
				<div style="overflow: hidden; position: absolute; ">
				${flit_1.liveAsyncRepeat({
            //data: range(1, 1000),
            dataCount: 1000,
            dataGetter: async (start, count) => {
                await ff.sleep(500);
                return range(start, start + count - 1);
            },
            pageSize: 10,
        }, (item, index) => flit_1.html `
						<div class="row" style="height: 31px;" :style.background=${src_1.theme.backgroundColor}  ${src_1.contextmenu(() => renderContextMenu(item))}>
							<div>Index: ${index}</div>
							<div>Value: ${item === null ? '--' : item}</div>
						</div>`)}
				</div>
			</section>

			<section>
				<f-grid
					resizable
					live
					group-size="10"
					.store=${new src_1.Store({
            data: range(1, 50).map(n => ({ id: n, value: n })),
            key: 'id',
        })}
					.columns=${[
            {
                title: 'Index',
                render: (_item, index) => {
                    return index;
                }
            },
            {
                title: 'ID',
                orderable: true,
                render: (item) => {
                    return item.id;
                }
            },
            {
                title: 'Value',
                orderable: true,
                render: (item) => {
                    return item.value;
                }
            }
        ]}
				/>
			</section>

			<section>
				<div style="display: inline-flex; height: 120px; padding: 8px 0 10px 10px; background: ${src_1.theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${src_1.droppable((value, index) => {
            ff.remove(leftData, value);
            ff.remove(rightData, value);
            if (index === -1) {
                leftData.push(value);
            }
            else {
                leftData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(leftData, (data, index) => flit_1.html `
						<div style="width: 100px; margin-right: 10px;" :style.background=${src_1.theme.backgroundColor.highlight(15)} ${src_1.draggable(data, index)}>${data}</div>
					`)}
				</div>
				<br>
				<div style="display: inline-flex; height: 120px; padding: 8px 0 10px 10px; background: ${src_1.theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${src_1.droppable((value, index) => {
            ff.remove(leftData, value);
            ff.remove(rightData, value);
            if (index === -1) {
                rightData.push(value);
            }
            else {
                rightData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(rightData, (data, index) => flit_1.html `
						<div style="width: 100px; margin-right: 10px;" :style.background=${src_1.theme.backgroundColor.highlight(15)} ${src_1.draggable(data, index)}>${data}</div>
					`)}
				</div>
			</section>
			
			<section style="display: flex;">
				<div style="width: 120px; padding: 10px 8px 0; background: ${src_1.theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${src_1.droppable((value, index) => {
            ff.remove(leftData, value);
            ff.remove(rightData, value);
            if (index === -1) {
                leftData.push(value);
            }
            else {
                leftData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(leftData, (data, index) => flit_1.html `
						<div style="margin-bottom: 10px;" :style.background=${src_1.theme.backgroundColor.highlight(15)} ${src_1.draggable(data, index)}>${data}</div>
					`)}
				</div>

				<div style="width: 120px; padding: 10px 8px 0; background: ${src_1.theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${src_1.droppable((value, index) => {
            ff.remove(leftData, value);
            ff.remove(rightData, value);
            if (index === -1) {
                rightData.push(value);
            }
            else {
                rightData.splice(index, 0, value);
            }
        })}
				>
					${flit_1.repeat(rightData, (data, index) => flit_1.html `
						<div style="margin-bottom: 10px;" :style.background=${src_1.theme.backgroundColor.highlight(15)} ${src_1.draggable(data, index)}>${data}</div>
					`)}
				</div>
			</section> -->
		</div>
	`;
    }
});
let treeData = {
    children: [
        {
            icon: 'user',
            text: 'User A',
            path: '/'
        },
        {
            icon: 'user',
            text: 'User B',
            path: '/',
            children: [
                {
                    icon: 'folder',
                    text: 'Folder A',
                    path: '/'
                },
                {
                    icon: 'folder',
                    text: 'Folder B',
                    path: '/',
                },
            ]
        },
    ]
};
let leftData = flit_1.observe([1, 2, 3]);
let rightData = flit_1.observe([4, 5, 6]);
function renderContextMenu(index) {
    return flit_1.html `
		<f-menu>
			<f-menuitem>Line: ${index}</f-menuitem>
		</f-menu>
	`;
}
flit_1.define('f-main-color-select', class MainColorSelect extends src_1.Select {
    constructor() {
        super(...arguments);
        this.value = '#0077cf';
        this.data = [
            ['#48c7c7', 'cyan'],
            ['#3988e5', 'blue'],
            ['#0077cf', 'darkblue'],
            ['#4eb2ea', 'skyblue'],
            ['#be66cc', 'purple'],
            ['#ff6666', 'red'],
            ['#ff8095', 'pink'],
            ['#d65c5c', 'brown'],
            ['#f67d51', 'orange'],
            ['#15af78', 'green'],
            ['#888888', 'grey'],
        ];
    }
    renderOptionStyle(color) {
        return 'color: ' + color;
    }
    renderOptionDisplay(_color, name) {
        return ff.capitalize(name);
    }
    render() {
        return flit_1.html `<f-select style="color: ${this.value}" />`.extends(super.render());
    }
    onReady() {
        super.onReady();
        this.on('change', (value) => {
            src_1.theme.set('mainColor', value);
        });
    }
});
flit_1.define('f-border-radius-select', class BorderRadiusSelect extends src_1.Select {
    constructor() {
        super(...arguments);
        this.value = 15;
        this.data = [0, 3, 5, 8, 12, 15, 20].map(v => [v, v + 'px']);
    }
    onReady() {
        super.onReady();
        this.on('change', (value) => {
            src_1.theme.set('borderRadius', value);
        });
    }
});
function range(start, end) {
    let data = [];
    for (let i = start; i <= end; i++) {
        data.push(i);
    }
    return data;
}
let modal;
async function openModal() {
    if (!modal) {
        modal = flit_1.renderComponent(flit_1.html `
			<f-modal .title="Modal Title">
				<div slot="body">Win Body</div>
				<button slot="foot" @click="${hideModal}">OK</button>
			</f-modal>
		`).component;
    }
    modal.show();
}
function hideModal() {
    modal.hide();
}

},{"../src":57,"@pucelle/ff":27,"@pucelle/flit":89}],29:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const ff_1 = require("@pucelle/ff");
const theme_1 = require("../style/theme");
const popup_1 = require("../components/popup");
let ContextMenuLayer = class ContextMenuLayer extends popup_1.Popup {
    constructor() {
        super(...arguments);
        this.trangle = false;
    }
    static style() {
        let { adjustByLineHeight: lh } = theme_1.theme;
        return flit_1.css `
		${super.style()}
		:host{
			position: fixed;
			border-radius: 0;
			
			f-menuitem{
				padding: 0 ${lh(2)}px;
			}
		}
		`;
    }
};
ContextMenuLayer = __decorate([
    flit_1.define('f-contextmenu-layer')
], ContextMenuLayer);
class ContextMenuBinding {
    constructor(el, context) {
        this.layer = null;
        this.unwatchRect = null;
        this.unlockOuterMouseLeave = null;
        this.el = el;
        this.context = context;
        flit_1.on(this.el, 'contextmenu.prevent', this.showMenuInLayer, this);
    }
    async update(renderFn) {
        this.renderFn = renderFn;
    }
    async showMenuInLayer(e) {
        let layer = this.renderLayer();
        layer.applyAppendTo();
        await flit_1.renderComplete();
        ff_1.alignToEvent(layer.el, e);
        layer.el.focus();
        this.unlockOuterMouseLeave = ff_1.MouseLeave.keep(this.el);
        new flit_1.Transition(layer.el, 'fade').enter();
        flit_1.on(document, 'mousedown', this.onDocMouseDown, this);
        flit_1.once(layer.el, 'click', this.hideContextMenu, this);
        this.unwatchRect = ff_1.watchLayout(this.el, 'rect', this.onLayerRectChanged.bind(this));
    }
    renderLayer() {
        if (!this.layer) {
            this.layer = flit_1.renderComponent(flit_1.html `
				<f-contextmenu-layer>
					${this.renderFn()}
				</f-contextmenu-layer>
			`, this.context).component;
        }
        return this.layer;
    }
    onDocMouseDown(e) {
        let target = e.target;
        if (this.layer && !this.layer.el.contains(target)) {
            this.hideContextMenu();
        }
    }
    hideContextMenu() {
        if (this.layer) {
            flit_1.off(document, 'mousedown', this.onDocMouseDown, this);
            flit_1.off(this.layer.el, 'click', this.hideContextMenu, this);
            new flit_1.Transition(this.layer.el, 'fade').leave().then((finish) => {
                if (finish) {
                    this.layer.el.remove();
                    this.layer = null;
                }
            });
        }
        if (this.unlockOuterMouseLeave) {
            this.unlockOuterMouseLeave();
        }
        if (this.unwatchRect) {
            this.unwatchRect();
            this.unwatchRect = null;
        }
    }
    onLayerRectChanged() {
        this.hideContextMenu();
    }
    remove() {
        flit_1.off(this.el, 'contextmenu', this.showMenuInLayer, this);
    }
}
exports.contextmenu = flit_1.defineBinding('contextmenu', ContextMenuBinding);

},{"../components/popup":46,"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const ff_1 = require("@pucelle/ff");
const theme_1 = require("../style/theme");
class DraggableBinding {
    constructor(el) {
        this.name = '';
        this.data = null;
        this.index = -1;
        this.el = el;
        // To avoid image dragging handled be HTML5 drag & drop
        this.el.setAttribute('draggable', 'false');
        this.el.style.cursor = 'grab';
        flit_1.on(this.el, 'mousedown', this.onMouseDown, this);
        flit_1.on(this.el, 'mouseenter', this.onMouseEnter, this);
    }
    update(data, index, options) {
        this.data = data;
        this.index = index;
        if (options) {
            Object.assign(this, options);
        }
    }
    onMouseDown(e) {
        e.preventDefault();
        let isDragging = false;
        let startX = e.clientX;
        let startY = e.clientY;
        let onMouseMove = (e) => {
            if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
                isDragging = true;
                manager.startDragging(this);
            }
            if (isDragging) {
                let moveX = e.clientX - startX;
                let moveY = e.clientY - startY;
                manager.translateDragging(moveX, moveY);
            }
        };
        let onMouseUp = async () => {
            flit_1.off(document, 'mousemove', onMouseMove);
            manager.endDragging();
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
exports.draggable = flit_1.defineBinding('draggable', DraggableBinding);
class DroppableBinding {
    constructor(el) {
        this.name = '';
        this.direction = null;
        this.onenter = null;
        this.onleave = null;
        this.el = el;
        flit_1.on(this.el, 'mouseenter', this.onMouseEnter, this);
    }
    update(ondrop, options) {
        this.ondrop = ondrop;
        if (options) {
            Object.assign(this, options);
        }
    }
    onMouseEnter() {
        manager.enterDroppable(this);
        flit_1.once(this.el, 'mouseleave', this.onMouseLeave, this);
    }
    emitEnter(dragging) {
        this.updateDirection();
        if (this.onenter) {
            this.onenter(dragging.data, dragging.index);
        }
    }
    updateDirection() {
        if (!this.direction) {
            let style = getComputedStyle(this.el);
            if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
                this.direction = 'x';
            }
            else if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                this.direction = 'y';
            }
            else if (style.display.includes('flex') && style.flexDirection.includes('row')) {
                this.direction = 'x';
            }
            else if (style.display.includes('flex') && style.flexDirection.includes('column')) {
                this.direction = 'y';
            }
            else {
                this.direction = 'y';
            }
        }
    }
    onMouseLeave() {
        manager.leaveDroppable(this);
    }
    emitLeave(dragging) {
        if (this.onleave) {
            this.onleave(dragging.data, dragging.index);
        }
    }
    emitDrop(dragging, index) {
        if (this.ondrop) {
            this.ondrop(dragging.data, index);
        }
    }
    remove() {
        flit_1.off(this.el, 'mouseenter', this.onMouseEnter, this);
    }
}
exports.droppable = flit_1.defineBinding('droppable', DroppableBinding);
// Used to:
//   When start dragging, check it's related drop area.
//   When dragging element enters another draggable element, relate them and adjust position using `mover`.
//   When dragging element enters one drop area, give additional space for it.
//   When dragging element leaves one drop area, remove space that belongs to it.
class DragDropRelationshipManager {
    constructor() {
        this.dragging = null;
        this.mover = null;
        // May mouse enter in some drop areas, and start dragging,
        // then we need to check which drop area should trigger enter.
        this.enteringDrops = new Set();
        this.activeDrop = null;
    }
    startDragging(drag) {
        this.dragging = drag;
        let activeDrop;
        for (let drop of this.enteringDrops) {
            // May element has been removed
            if (!document.contains(drop.el)) {
                this.enteringDrops.delete(drop);
            }
            else if (drop.name === name) {
                activeDrop = drop;
                break;
            }
        }
        if (!activeDrop) {
            throw new Error(`Element with ":draggable" must be contained in a ":droppable" elemenet`);
        }
        activeDrop.emitEnter(this.dragging); // will also update direction
        this.activeDrop = activeDrop;
        this.mover = new Mover(this.dragging, activeDrop);
    }
    translateDragging(x, y) {
        if (this.mover) {
            this.mover.translateDraggingElement(x, y);
        }
    }
    enterDraggable(drag) {
        if (this.canSwapWith(drag) && this.mover) {
            this.mover.onEnterDraggable(drag);
        }
    }
    canSwapWith(drag) {
        return this.dragging && this.dragging.name === drag.name && this.dragging !== drag;
    }
    enterDroppable(drop) {
        this.enteringDrops.add(drop);
        if (this.canDropTo(drop)) {
            drop.emitEnter(this.dragging);
            this.activeDrop = drop;
            this.mover.onEnterDroppable(drop);
        }
    }
    canDropTo(drop) {
        return this.dragging && this.dragging.name === drop.name;
    }
    leaveDroppable(drop) {
        this.enteringDrops.delete(drop);
        if (this.activeDrop === drop) {
            drop.emitLeave(this.dragging);
            this.activeDrop = null;
            this.mover.onLeaveDroppable(drop);
        }
    }
    endDragging() {
        let mover = this.mover;
        let dragging = this.dragging;
        let activeDrop = this.activeDrop;
        if (mover) {
            mover.playEndDraggingAnimation().then(() => {
                if (mover.willSwapElements()) {
                    activeDrop.emitDrop(dragging, mover.getSwapIndex());
                }
            });
        }
        this.dragging = null;
        this.mover = null;
        this.activeDrop = null;
    }
}
const manager = new DragDropRelationshipManager();
// To handle dragging movements, includes:
// 1. When moved out of the droppable it's inside: All elements below moved up
// 2. When moved in a new droppable: Add a padding as space to contain
// 3. When moved between silbings: Moving items betweens them up or down, include the mouse enter sibling.
// 4. When moved into a already moved sibling: Fallback movements that not betweens them, include the mouse enter sibling.
class Mover {
    constructor(drag, drop) {
        this.elStyleText = '';
        this.translate = [0, 0];
        this.draggedTo = null;
        this.draggedToRect = null;
        this.draggedToIndex = -1;
        this.movedElements = new Set();
        this.dropArea = null;
        this.placeholder = null;
        this.dragging = drag;
        this.el = drag.el;
        this.startDropArea = this.dropArea = drop;
        this.width = this.el.offsetWidth + Math.max(ff_1.getStyleAsNumber(this.el, 'marginLeft'), ff_1.getStyleAsNumber(this.el, 'marginRight'));
        this.height = this.el.offsetHeight + Math.max(ff_1.getStyleAsNumber(this.el, 'marginTop'), ff_1.getStyleAsNumber(this.el, 'marginBottom'));
        this.setStartDraggingStyle();
        this.giveSpaceForDraggingElement(drop, false);
    }
    setStartDraggingStyle() {
        let rect = ff_1.getRect(this.el);
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        this.elStyleText = this.el.style.cssText;
        this.el.style.position = 'fixed';
        this.el.style.zIndex = '9999';
        this.el.style.width = rect.width + 'px';
        this.el.style.height = rect.height + 'px';
        this.el.style.left = rect.left + 'px';
        this.el.style.top = rect.top + 'px';
        this.el.style.boxShadow = `1px 1px ${theme_1.theme.layerShadowBlurRadius}px #888`;
        this.el.style.pointerEvents = 'none';
        this.el.style.willChange = 'transform';
    }
    moveSiblingsToGiveSpace(playAnimation) {
        let transform = this.getTranslateStyle(this.startDropArea, 1);
        for (let el of this.getSiblingsAfter(this.el)) {
            if (playAnimation) {
                ff_1.animateTo(el, { transform });
            }
            else {
                el.style.transform = transform;
            }
            this.movedElements.add(el);
        }
    }
    getSiblingsFrom(fromEl) {
        if (!fromEl) {
            return [];
        }
        let els = [];
        for (let el = fromEl; el; el = el.nextElementSibling) {
            els.push(el);
        }
        return els;
    }
    getSiblingsAfter(afterEl) {
        return this.getSiblingsFrom(afterEl.nextElementSibling);
    }
    onEnterDroppable(drop) {
        this.giveSpaceForDraggingElement(drop, true);
        this.dropArea = drop;
    }
    giveSpaceForDraggingElement(drop, playAnimation) {
        let isDraggingInStartArea = this.startDropArea === drop;
        if (isDraggingInStartArea) {
            let transform = this.getTranslateStyle(drop, 1);
            for (let el of this.getSiblingsAfter(this.el)) {
                if (playAnimation) {
                    ff_1.animateTo(el, { transform });
                }
                else {
                    el.style.transform = transform;
                }
                this.movedElements.add(el);
            }
        }
        this.placeholder = document.createElement('div');
        this.placeholder.style.visibility = 'hidden';
        if (drop.direction === 'x') {
            this.placeholder.style.width = this.width + 'px';
        }
        else {
            this.placeholder.style.height = this.height + 'px';
        }
        drop.el.append(this.placeholder);
    }
    getTranslateStyle(drop, moveDirection) {
        let movePx = drop.direction === 'x' ? this.width : this.height;
        return `translate${drop.direction.toUpperCase()}(${moveDirection * movePx}px)`;
    }
    onLeaveDroppable(drop) {
        if (drop !== this.dropArea) {
            return;
        }
        this.restoreMovedElements(true);
        this.dropArea = null;
        this.draggedTo = null;
        this.draggedToRect = null;
        this.draggedToIndex = -1;
    }
    restoreMovedElements(playAnimation) {
        for (let el of this.movedElements) {
            if (playAnimation) {
                ff_1.animateTo(el, { transform: '' });
            }
            else {
                el.style.transform = '';
                ff_1.stopAnimation(el);
            }
        }
        this.movedElements = new Set();
        if (this.placeholder) {
            this.placeholder.remove();
            this.placeholder = null;
        }
    }
    onEnterDraggable(drag) {
        if (!this.dropArea) {
            return;
        }
        let willMoveElements = new Set();
        for (let el of this.getSiblingsFrom(drag.el)) {
            if (el !== this.el) {
                willMoveElements.add(el);
            }
        }
        // When the dragged into element has been moved, dragged into it again means that it's movement will be restored.
        if (this.movedElements.has(drag.el)) {
            willMoveElements.delete(drag.el);
        }
        let transform = this.getTranslateStyle(this.dropArea, 1);
        for (let el of this.movedElements) {
            if (!willMoveElements.has(el)) {
                ff_1.animateTo(el, { transform: '' });
            }
        }
        // Each element either move down compare to it's original position, or keep position.
        for (let el of willMoveElements) {
            if (!this.movedElements.has(el)) {
                ff_1.animateTo(el, { transform });
            }
        }
        this.draggedToIndex = this.generateDraggedToIndex(drag, willMoveElements.has(drag.el));
        this.movedElements = willMoveElements;
        this.draggedTo = drag;
        this.draggedToRect = ff_1.getRect(drag.el);
    }
    // Assume we have:
    //	 group 1: 1 2 3
    //   group 2: 4 5 6
    generateDraggedToIndex(drag, beenMoved) {
        let isInSameDropArea = this.startDropArea === this.dropArea;
        let index = drag.index;
        if (isInSameDropArea) {
            // Drag 1 into 3
            if (index > this.dragging.index) {
                if (beenMoved) {
                    return index - 1; // 2 [1] 3, reutnrs index of 3 - 1
                }
                else {
                    return index; // 2 3 [1], returns index of 3
                }
            }
            // Drag 3 into 1
            else {
                if (beenMoved) {
                    return index; // [3] 1 2, reutnrs index of 1
                }
                else {
                    return index + 1; // 1 [3] 2, returns index of 1 + 1
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
    translateDraggingElement(x, y) {
        this.translate = [x, y];
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }
    willSwapElements() {
        return !!(this.draggedTo || this.dropArea && this.startDropArea !== this.dropArea);
    }
    getSwapIndex() {
        return this.draggedToIndex;
    }
    async playEndDraggingAnimation() {
        if (this.willSwapElements()) {
            await this.animateDraggingElementToDropArea();
            this.el.style.transform = '';
            this.clearDraggingStyle();
            this.restoreMovedElements(false);
        }
        else {
            // When moved dragging element outside
            if (this.dropArea !== this.startDropArea) {
                this.moveSiblingsToGiveSpace(true);
            }
            await ff_1.animateTo(this.el, { transform: '' });
            this.clearDraggingStyle();
            this.restoreMovedElements(false);
        }
    }
    async animateDraggingElementToDropArea() {
        let fromRect = ff_1.getRect(this.el);
        let toRect = this.draggedToRect || ff_1.getRect(this.placeholder);
        let x = toRect.left - fromRect.left + this.translate[0];
        let y = toRect.top - fromRect.top + this.translate[1];
        let transform = `translate(${x}px, ${y}px)`;
        await ff_1.animateTo(this.el, { transform });
    }
    clearDraggingStyle() {
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        this.el.style.cssText = this.elStyleText;
    }
}

},{"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const ff_1 = require("@pucelle/ff");
const NamedPopupCache = new Map();
const NamedPopupsInUse = new Map();
function getPopupCacheFromName(name) {
    let cache = NamedPopupCache.get(name);
    if (cache) {
        let popup = cache.popup;
        // If current popup is in use, not reuse it
        if (ff_1.MouseLeave.inUse(popup.el)) {
            return null;
        }
        return cache;
    }
    return null;
}
const defaultPopupOptions = {
    trigger: 'hover',
    alignPosition: 't',
    alignMargin: 3,
    showDelay: 0,
    hideDelay: 200,
    trangle: true,
    transition: 'fade',
    onOpenedChanged: () => undefined
};
/**
 * `:popup="..."`
 * `popup(title: string, {alignPosition: ..., ...})`
 */
class PopupBinding {
    constructor(el, context) {
        this.options = {};
        this.opened = false;
        this.showTimeout = null;
        this.hideTimeout = null;
        this.unwatchRect = null;
        this.unwatchLeave = null;
        this.unwatchResult = null;
        this.firstlyUpdate = true;
        this.popupTemplate = null;
        this.popup = null;
        this.el = el;
        this.context = context;
    }
    /** `renderFn` should never change. */
    update(renderFn, options) {
        this.options = options || {};
        if (this.firstlyUpdate) {
            this.renderFn = renderFn;
            this.bindTrigger();
            this.firstlyUpdate = false;
        }
        else {
            this.updatePopup();
        }
    }
    bindTrigger() {
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            flit_1.on(this.el, 'mouseenter', this.showPopupLater, this);
        }
        else if (trigger === 'click') {
            flit_1.on(this.el, 'click', this.toggleOpened, this);
        }
        else {
            flit_1.on(this.el, trigger, this.showPopupLater, this);
        }
    }
    remove() {
        flit_1.off(this.el, 'mouseenter', this.showPopupLater, this);
        if (this.popup) {
            this.popup.el.remove();
        }
    }
    toggleOpened() {
        if (this.opened) {
            this.hidePopup();
        }
        else {
            this.showPopup();
        }
    }
    getOption(key) {
        let value = this.options[key];
        if (value !== undefined) {
            return value;
        }
        return defaultPopupOptions[key];
    }
    async showPopupLater() {
        if (this.showTimeout) {
            return;
        }
        this.clearHideTimeout();
        if (this.opened) {
            return;
        }
        let trigger = this.getOption('trigger');
        let showDelay = this.getOption('showDelay');
        if (trigger === 'hover' || trigger === 'focus') {
            this.showTimeout = ff_1.timeout(() => {
                this.showTimeout = null;
                this.showPopup();
            }, showDelay);
            if (trigger === 'hover') {
                flit_1.once(this.el, 'mouseleave', this.hidePopupLater, this);
            }
            else if (trigger === 'focus') {
                flit_1.once(this.el, 'blur', this.hidePopupLater, this);
            }
        }
        else {
            await this.showPopup();
        }
    }
    async showPopup() {
        if (this.opened) {
            return;
        }
        let { popup, inUse } = this.getPopup();
        popup.applyAppendTo();
        popup.el.style.visibility = 'hidden';
        this.setOpened(true);
        await flit_1.renderComplete();
        if (!this.isPopupInControl()) {
            return;
        }
        this.alignPopup();
        popup.el.style.visibility = '';
        if (inUse) {
            flit_1.clearTransition(popup.el);
        }
        else {
            new flit_1.Transition(popup.el, this.getOption('transition')).enter();
        }
        let trigger = this.getOption('trigger');
        if (trigger === 'hover') {
            flit_1.off(this.el, 'mouseleave', this.hidePopupLater, this);
            // Should not use once to watch, or if the hideLater it triggered was canceled, This can't trigger again.
            this.unwatchLeave = ff_1.MouseLeave.on([this.el, popup.el], this.hidePopupLater.bind(this), {
                delay: this.getOption('hideDelay'),
                mouseIn: true,
            });
        }
        else if (trigger === 'click' || trigger === 'contextmenu') {
            flit_1.on(document, 'mousedown', this.onDocMouseDown, this);
        }
        this.unwatchRect = ff_1.watchLayout(this.el, 'rect', this.onElRectChanged.bind(this));
    }
    setOpened(opened) {
        this.opened = opened;
        if (this.options.onOpenedChanged) {
            this.options.onOpenedChanged(opened);
        }
    }
    // If popup is not been reused by another.
    isPopupInControl() {
        if (!this.popup) {
            return false;
        }
        let name = this.getOption('name');
        if (!name) {
            return true;
        }
        return NamedPopupsInUse.get(this.popup) === this;
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            this.hideTimeout.cancel();
            this.hideTimeout = null;
        }
    }
    getPopup() {
        let result = this.renderFn();
        let name = this.getOption('name');
        let popup = null;
        let template = null;
        let inUse = false;
        if (name) {
            let cache = getPopupCacheFromName(name);
            if (cache) {
                ({ popup, template } = cache);
                inUse = NamedPopupsInUse.has(popup);
                if (template.canMergeWith(result)) {
                    template.merge(result);
                }
                else {
                    popup.el.remove();
                    popup = null;
                }
            }
        }
        if (!popup) {
            let renderResult = flit_1.renderComponent(result, this.context);
            template = renderResult.template;
            popup = renderResult.component;
            if (name) {
                NamedPopupCache.set(name, { popup, template });
            }
        }
        if (name) {
            NamedPopupsInUse.set(popup, this);
        }
        this.popup = popup;
        this.popupTemplate = template;
        return { popup, inUse };
    }
    async updatePopup() {
        if (this.isPopupInControl()) {
            let result = this.renderFn();
            let name = this.getOption('name');
            let popup = this.popup;
            let template = this.popupTemplate;
            if (template.canMergeWith(result)) {
                template.merge(result);
            }
            else {
                popup.el.remove();
                let renderResult = flit_1.renderComponent(result, this.context);
                template = this.popupTemplate = renderResult.template;
                popup = renderResult.component;
                if (name) {
                    NamedPopupCache.set(name, { popup, template });
                }
            }
            await flit_1.renderComplete();
            this.alignPopup();
        }
    }
    onMouseLeave() {
        this.hidePopupLater();
    }
    onDocMouseDown(e) {
        let target = e.target;
        if (!this.el.contains(target) && !this.popup.el.contains(target)) {
            this.hidePopupLater();
        }
    }
    onElRectChanged(rect) {
        let dw = document.documentElement.offsetWidth;
        let dh = document.documentElement.offsetHeight;
        let inViewport = rect.width > 0 && rect.height > 0 && rect.top < dh && rect.bottom > 0 && rect.left < dw && rect.right > 0;
        if (inViewport && !this.shouldHideWhenElLayerChanged()) {
            this.alignPopup();
        }
        else {
            this.hidePopupLater();
        }
    }
    shouldHideWhenElLayerChanged() {
        return this.getOption('trigger') === 'hover';
    }
    alignPopup() {
        let toAlign = this.popup.el;
        let alignToFn = this.getOption('alignTo');
        let alignTo = alignToFn ? alignToFn() : this.el;
        let trangle = this.popup.refs.trangle;
        ff_1.align(toAlign, alignTo, this.getOption('alignPosition'), {
            margin: this.getOption('alignMargin'),
            canShrinkInY: true,
            trangle,
        });
    }
    hidePopupLater() {
        if (this.hideTimeout) {
            return;
        }
        this.clearShowTimeout();
        if (!this.opened) {
            return;
        }
        let trigger = this.getOption('trigger');
        let hideDelay = trigger === 'hover' ? 0 : this.getOption('hideDelay');
        if (hideDelay > 0) {
            this.hideTimeout = ff_1.timeout(() => {
                this.hideTimeout = null;
                this.hidePopup();
            }, hideDelay);
        }
        else {
            this.hidePopup();
        }
    }
    clearShowTimeout() {
        if (this.showTimeout) {
            this.showTimeout.cancel();
            this.showTimeout = null;
        }
    }
    hidePopup() {
        if (!this.opened) {
            return;
        }
        // Must unwatch here, not in `hideLater`, or if it was canceled...
        this.unwatch();
        let name = this.getOption('name');
        let popupEl = this.popup.el;
        if (this.isPopupInControl()) {
            if (name) {
                NamedPopupsInUse.delete(this.popup);
            }
            new flit_1.Transition(popupEl, this.getOption('transition')).leave().then((finish) => {
                if (finish) {
                    popupEl.remove();
                }
            });
        }
        this.setOpened(false);
        this.popup = null;
        this.popupTemplate = null;
    }
    unwatch() {
        let trigger = this.getOption('trigger');
        if (this.unwatchRect) {
            this.unwatchRect();
            this.unwatchRect = null;
        }
        if (this.unwatchLeave) {
            this.unwatchLeave();
            this.unwatchLeave = null;
        }
        if (this.unwatchResult) {
            this.unwatchResult();
            this.unwatchResult = null;
        }
        if (trigger === 'click' || trigger === 'contextmenu') {
            flit_1.off(document, 'mousedown', this.onDocMouseDown, this);
        }
    }
}
exports.PopupBinding = PopupBinding;
exports.popup = flit_1.defineBinding('popup', PopupBinding);

},{"@pucelle/ff":27,"@pucelle/flit":89}],32:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const popup_1 = require("../components/popup");
const popup_2 = require("./popup");
const ff_1 = require("@pucelle/ff");
const color_1 = require("../style/color");
const defaultTooltipOptions = {
    name: 'tooltip',
    alignPosition: 't',
    alignMargin: 3,
    showDelay: 0,
    hideDelay: 200,
};
let Tooltip = class Tooltip extends popup_1.Popup {
    constructor() {
        super(...arguments);
        this.backgroundColor = '';
    }
    static style() {
        let { adjustByLineHeight: lh, layerBorderRadius, textColor, backgroundColor, layerShadowBlurRadius, layerShadowColor } = theme_1.theme;
        return flit_1.css `
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(20)}px;
			background: ${backgroundColor.highlight(5)};
			color: ${textColor};
			border-radius: ${layerBorderRadius}px;
			filter: drop-shadow(0 0 ${layerShadowBlurRadius / 2}px ${layerShadowColor});	// 3px nearly equals 6px in box-shadow.
			pointer-events: none;
		}

		.trangle{
			position: absolute;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-bottom: 7px solid ${backgroundColor.highlight(5)};
			top: -7px;

			&-herizontal{
				border-top: 5px solid transparent;
				border-bottom: 5px solid transparent;
				border-right: 7px solid ${backgroundColor.highlight(5)};
				border-left: 0;
				top: auto;
				left: -7px;
			}
		}`;
    }
    render() {
        let backgroundColor = this.backgroundColor ? new color_1.Color(this.backgroundColor) : null;
        let textColor = backgroundColor ? backgroundColor.getLightness() < 0.5 ? '#fff' : '#000' : '';
        return flit_1.html `
		<template
			:style.background-color=${this.backgroundColor}
			:style.color=${textColor}
		>
			${this.trangle ? flit_1.html `
				<div class="trangle" :ref="trangle"
					:class.trangle-herizontal=${this.herizontal}
					:style.border-color=${this.backgroundColor}
				/>
			` : ''}
		`;
    }
};
Tooltip = __decorate([
    flit_1.define('f-tooltip')
], Tooltip);
exports.Tooltip = Tooltip;
/**
 * `:tooltip="..."`
 * `tooltip(title, {alignPosition: ..., ...})`
 */
class TooltipBinding extends popup_2.PopupBinding {
    constructor() {
        super(...arguments);
        this.title = '';
    }
    update(title, options) {
        this.title = title;
        super.update(this.getRenderFn.bind(this), this.getPopupOptions(options));
    }
    getRenderFn() {
        return flit_1.html `
			<f-tooltip
				.herizontal=${this.isHerizontal()}
				.backgroundColor=${this.getBackgroundColor()}
			>
				${this.title}
			</f-tooltip>
		`;
    }
    getBackgroundColor(options) {
        if (options && options.backgroundColor) {
            return options.backgroundColor;
        }
        return '';
    }
    getPopupOptions(options = {}) {
        ff_1.assignIf(options, defaultTooltipOptions);
        return options;
    }
    isHerizontal() {
        let direction = ff_1.getMainAlignDirection(this.getOption('alignPosition'));
        return direction === 'l' || direction === 'r';
    }
}
exports.TooltipBinding = TooltipBinding;
exports.tooltip = flit_1.defineBinding('tooltip', TooltipBinding);

},{"../components/popup":46,"../style/color":60,"../style/theme":62,"./popup":31,"@pucelle/ff":27,"@pucelle/flit":89}],33:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
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
				background: #000;
				border-color: #000;
			}
		}
		`;
    }
};
ButtonGroup = __decorate([
    flit_1.define('f-buttongroup')
], ButtonGroup);
exports.ButtonGroup = ButtonGroup;

},{"@pucelle/flit":89}],34:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
let Checkbox = class Checkbox extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.indeterminate = false;
        // Used to compare with `checkboxGroup.value`
        this.value = null;
        this.checkboxGroup = null;
    }
    static style() {
        let { mainColor, focusBlurRadius, adjustByLineHeight: lh } = theme_1.theme;
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
			width: ${lh(15)}px;
			height: ${lh(15)}px;
			border: 1px solid currentColor;
			border-radius: 2px;
			margin-right: ${lh(6)}px;
		}

		.indeterminate, .checked{
			color: ${mainColor};
			
			.icon{
				background: ${mainColor};
			}
		}

		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`;
    }
    render() {
        let svgInner = '';
        if (this.checked) {
            svgInner = flit_1.svg `<polyline style="fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;" points="1.5,7 5.7,10.5 10.5,1.5"/>`;
        }
        else if (this.indeterminate) {
            svgInner = flit_1.svg `<line style="fill:none;stroke:#FFFFFF;" x1="2" y1="6.5" x2="11" y2="6.5"/>`;
        }
        return flit_1.html `
			<template
				tabindex="0"
				:class.checked=${this.checked}
				:class.indeterminate=${this.indeterminate}
				@@click=${this.onClick}
				@@focus=${this.onFocus}
				@@blur=${this.onBlur}
			>
				<svg class="icon" viewBox="0 0 13 13">
					${svgInner}
				</svg>

				<div class="label">
					<slot />
				</div>
			</template>
		`;
    }
    onCreated() {
        let group = flit_1.getClosestComponent(this.el, CheckboxGroup);
        if (group) {
            this.checkboxGroup = group;
            this.checked = this.checkboxGroup.value == this.value;
            this.checkboxGroup.register(this);
        }
    }
    onClick() {
        this.checked = !this.checked;
        this.indeterminate = false;
        this.emit('change', this.checked);
    }
    onFocus() {
        flit_1.on(document, 'keydown.enter', this.onEnter, this);
    }
    onEnter(e) {
        e.preventDefault();
        this.onClick();
    }
    onBlur() {
        flit_1.off(document, 'keydown', this.onEnter, this);
    }
};
Checkbox = __decorate([
    flit_1.define('f-checkbox')
], Checkbox);
exports.Checkbox = Checkbox;
let CheckboxGroup = class CheckboxGroup extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.value = [];
        this.ordered = false;
        this.checkboxs = [];
    }
    register(checkbox) {
        this.checkboxs.push(checkbox);
        checkbox.on('change', this.onCheckboxChange.bind(this, checkbox));
    }
    onCheckboxChange(checkbox) {
        if (checkbox.checked) {
            this.value.push(checkbox.value);
        }
        else {
            ff_1.removeWhere(this.value, value => value == checkbox.value);
        }
        if (this.ordered) {
            let values = this.checkboxs.map(checkbox => checkbox.value);
            ff_1.orderBy(this.value, item => values.findIndex(value => value == item));
        }
        this.emit('change', this.value);
    }
};
CheckboxGroup = __decorate([
    flit_1.define('f-checkboxgroup')
], CheckboxGroup);
exports.CheckboxGroup = CheckboxGroup;

},{"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],35:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const popup_1 = require("../bindings/popup");
/** Normally work with a dropdown menu. */
let Dropdown = class Dropdown extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.icon = 'down';
        this.opened = false;
        this.trigger = 'click';
        this.trangle = true;
        this.alignPosition = 'b';
        this.alignMargin = 3;
        this.transition = 'fade';
        this.showDelay = 100;
        this.hideDelay = 100;
        this.popupBinding = null;
    }
    static style() {
        let { mainColor, adjustByLineHeight: lh, adjustByFontSize: fs } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
		}

		.opened{
			color: ${mainColor};
		}

		.icon{
			margin-right: 6px;
		}

		.popup{
			padding: 5px 0;
			font-size: ${fs(13)}px;

			f-menuitem{
				padding: 0 ${lh(7)}px;
			}
		}

		.list{
			overflow-y: auto;
			max-height: 100%;
		}
		`;
    }
    render() {
        let { trigger, trangle, alignPosition, alignMargin, transition, showDelay, hideDelay } = this;
        let onOpenedChanged = this.setOpened.bind(this);
        let toPopup = flit_1.refBinding(popup_1.popup(() => this.renderPopupContent(), { trigger, trangle, alignPosition, alignMargin, transition, showDelay, hideDelay, onOpenedChanged }), (v) => { this.popupBinding = v; });
        return flit_1.html `
		<template :class.opened=${this.opened} ${toPopup}>
			<slot />
			${this.icon ? flit_1.html `<f-icon class="icon" .type="${this.icon}" />` : ''}
		</template>
		`;
    }
    renderPopupContent() {
        let content = this.renderContent();
        return flit_1.html `
		<f-popup
			class="popup"
			.trangle=${this.trangle}
		>
			<div class="list">
				${content}
			</div>
		</f-popup>
		`;
    }
    setOpened(opened) {
        this.opened = opened;
        if (opened) {
            this.onPopupOpened();
        }
    }
    onPopupOpened() { }
    async showPopup() {
        if (this.popupBinding) {
            await this.popupBinding.showPopupLater();
        }
    }
    hidePopup() {
        if (this.popupBinding) {
            this.popupBinding.hidePopupLater();
        }
    }
};
Dropdown = __decorate([
    flit_1.define('f-dropdown')
], Dropdown);
exports.Dropdown = Dropdown;

},{"../bindings/popup":31,"../style/theme":62,"@pucelle/flit":89}],36:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
let Form = class Form extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.valid = true;
        this.inputs = [];
    }
    static style() {
        return flit_1.css `
		:host{
			display: block;
		}
		`;
    }
    register(input) {
        this.inputs.push(input);
        this.valid = this.valid && input.valid;
        input.on('change', this.onInputChange, this);
    }
    onInputChange(_value, valid) {
        if (valid !== this.valid) {
            this.valid = this.inputs.every(input => input.valid);
        }
    }
};
Form = __decorate([
    flit_1.define('f-form')
], Form);
exports.Form = Form;

},{"@pucelle/flit":89}],37:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
/**
 * Now these components only used to align, not for responsive layout.
 * Will extend later when needed.
 */
let RowLayout = class RowLayout extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.columnCount = 24;
        this.gutter = 0;
        this.justify = 'start';
        this.cols = [];
    }
    static style() {
        return flit_1.css `
		:host{
			display: flex;
			flex-wrap: wrap;
		}
		`;
    }
    onUpdated() {
        this.el.style.justifyContent = this.justify === 'start' ? '' : this.justify === 'end' ? 'flex-end' : this.justify;
    }
    register(col) {
        this.cols.push(col);
    }
    getLeftColCount(col) {
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
    isFirstCol(col) {
        return col === this.cols[0];
    }
};
RowLayout = __decorate([
    flit_1.define('f-row')
], RowLayout);
exports.RowLayout = RowLayout;
let ColLayout = class ColLayout extends flit_1.Component {
    constructor() {
        super(...arguments);
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
        let leftColCount = this.row.getLeftColCount(this);
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

},{"@pucelle/flit":89}],38:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
const async_store_1 = require("../store/async-store");
let Grid = class Grid extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.resizable = false;
        this.live = false;
        this.pageSize = 50;
        this.minColumnWidth = 64;
        this.orderedColumnName = null;
        this.orderedDirection = '';
        this.orderedColumnIndex = -1;
        this.columnWidths = null;
        this.resizingColumnWidths = null;
        this.columnResized = false;
        this.cachedTotalWidth = 0;
        this.repeatDir = null;
    }
    static style() {
        let { adjustByFontSize: fs, adjustByLineHeight: lh, mainColor, textColor, backgroundColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: flex;
			flex-direction: column;
			height: 200px;
		}

		.head{
			padding-right: 10px;	// Same with defined scrollbar width.
			border-bottom: 1px solid ${backgroundColor.highlight(15)};
			color: ${textColor.highlight(20)};
			font-size: ${fs(12)}px;
			user-select: none;
		}

		.columns{
			display: flex;
		}

		.column{
			position: relative;
			display: flex;
			align-items: stretch;
			padding: 0 ${lh(8)}px;

			&:last-child{
				padding-right: 0;
			}
		}

		.column-left{
			flex: 1;
			display: flex;
			max-width: 100%;

			&:hover .order{
				display: flex;
			}
		}

		.column-title{
			flex: 0 1 auto;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.resizable .column-title{
			flex: 1;
		}

		.order{
			width: ${lh(20)}px;
			display: none;
			flex: none;
			margin-right: ${lh(-5)}px;

			&.current{
				display: flex;
			}
		}

		.resizer{
			position: relative;
			z-index: 1;
			width: 17px;
			margin-left: auto;
			margin-right: ${lh(-16)}px;
			cursor: e-resize;

			&::before{
				content: '';
				position: absolute;
				left: 8px;
				top: 6px;
				bottom: 6px;
				width: 1px;
				background: ${backgroundColor.highlight(15)};
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
		}

		.rows{
			display: table;
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
		}

		td{
			vertical-align: middle;
			padding: 0 ${lh(8)}px;
			border-bottom: 1px solid ${backgroundColor.highlight(7.5)};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: default;
		}

		f-checkbox{
			max-width: 100%;
			height: 100%;

			f-icon{
				margin-right: ${lh(10)}px;
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
    render() {
        return flit_1.html `
		<div class="head" :ref="head">
			<div class="columns" :ref="columns">
				${this.renderColumns()}
			</div>
		</div>

		<div class="body">
			<table class="rows">
				<colgroup :ref="colgroup">
					${this.columns.map(() => flit_1.html `<col />`)}
				</colgroup>
				${this.renderRows()}
			</table>
		</div>
		`;
    }
    renderColumns() {
        return this.columns.map((column, index) => {
            return flit_1.html `
			<div class="column" @click=${(e) => this.doOrdering(e, index)}>
				<div class="column-left">
					<div class="column-title">${column.title}</div>
					${column.orderBy ? flit_1.html `
						<div class="order" :class.current=${this.orderedColumnIndex === index && this.orderedDirection !== ''}>
							<f-icon .type=${this.getOrderIcon(index)} />
						</div>`
                : ''}
				</div>

				${this.resizable && index < this.columns.length - 1 ? flit_1.html `
					<div class="resizer" @mousedown=${(e) => this.onStartResize(e, index)} />`
                : ''}
			</div>`;
        });
    }
    renderRows() {
        if (this.store instanceof async_store_1.AsyncStore) {
            return flit_1.refDirective(flit_1.liveAsyncRepeat({
                key: this.store.key,
                dataCount: this.store.dataCount.bind(this.store),
                dataGetter: this.store.dataGetter.bind(this.store),
                pageSize: this.pageSize,
                onUpdated: this.onRepeatDataUpdated.bind(this)
            }, this.renderRow.bind(this), this.transition), this.setRepeatDirective);
        }
        else if (this.live) {
            return flit_1.refDirective(flit_1.liveRepeat({
                data: this.store.currentData,
                pageSize: this.pageSize,
                onUpdated: this.onRepeatDataUpdated.bind(this)
            }, this.renderRow.bind(this), this.transition), this.setRepeatDirective);
        }
        else {
            return flit_1.repeat(this.store.currentData, this.renderRow.bind(this), this.transition);
        }
    }
    renderRow(item, index) {
        let tds = this.columns.map((column) => {
            let result = item && column.render ? column.render(item, index) : '';
            return flit_1.html `<td>${result}</td>`;
        });
        return flit_1.html `<tr>${tds}</tr>`;
    }
    setRepeatDirective(dir) {
        this.repeatDir = dir;
        if (this.store instanceof async_store_1.AsyncStore) {
            this.store.setRepeatDirective(dir);
        }
    }
    onRepeatDataUpdated(data, index) {
        this.emit('livedataupdated', data, index);
    }
    getOrderIcon(index) {
        if (index === this.orderedColumnIndex) {
            if (this.orderedDirection === 'asc') {
                return 'order-asc';
            }
            else if (this.orderedDirection === 'desc') {
                return 'order-desc';
            }
        }
        return 'order-default';
    }
    onCreated() {
        if (this.store instanceof async_store_1.AsyncStore) {
            for (let column of this.columns) {
                if (column.orderBy && typeof column.orderBy !== 'string') {
                    throw new Error(`"orderBy" in "columns" configuration must be string type when using "liveStore"`);
                }
            }
        }
        this.restoreOrderedColumn();
    }
    onReady() {
        flit_1.onRenderComplete(() => {
            this.refs.head.style.paddingRight = ff_1.getScrollbarWidth() + 'px';
            this.updatColumnWidths();
        });
    }
    onConnected() {
        this.watch(() => flit_1.observeGetter(this, 'columns'), async () => {
            this.restoreOrderedColumn();
            // Here we need it render new `<col>`s.
            await flit_1.renderComplete();
            this.updatColumnWidthsRoughly();
        });
        let unwatchSize = ff_1.watchLayout(this.el, 'size', () => this.updatColumnWidths());
        this.once('disconnected', unwatchSize);
    }
    // Order part
    doOrdering(e, index) {
        if (e.target.closest(this.scopeClassName('.resizer'))) {
            return;
        }
        let canOrder = this.columns[index].orderBy;
        if (!canOrder) {
            return;
        }
        let direction = '';
        let descFirst = this.columns[index].descFirst;
        if (index === this.orderedColumnIndex) {
            if (descFirst) {
                direction = this.orderedDirection === '' ? 'desc' : this.orderedDirection === 'desc' ? 'asc' : 'desc';
            }
            else {
                direction = this.orderedDirection === '' ? 'asc' : this.orderedDirection === 'asc' ? 'desc' : 'asc';
            }
        }
        else {
            direction = descFirst ? 'desc' : 'asc';
        }
        this.orderedColumnName = this.columns[index].name || null;
        this.orderedColumnIndex = index;
        this.orderedDirection = direction;
        this.orderStore();
        if (this.orderedColumnName) {
            this.emit('orderchanged', this.orderedColumnName, direction);
        }
    }
    orderStore() {
        if (this.orderedDirection === '') {
            this.store.clearOrder();
        }
        else if (this.store instanceof async_store_1.AsyncStore) {
            let column = this.columns[this.orderedColumnIndex];
            this.store.setOrder(column.orderBy, this.orderedDirection);
        }
        else {
            let column = this.columns[this.orderedColumnIndex];
            let order = new ff_1.Order([(column.orderBy || column.render), this.orderedDirection]);
            this.store.setOrder(order);
        }
    }
    restoreOrderedColumn() {
        let oldOrderedColumnIndex = this.orderedColumnIndex;
        if (this.orderedColumnName) {
            let columnIndex = this.columns.findIndex(column => column.name === this.orderedColumnName);
            if (columnIndex > -1) {
                this.orderedColumnIndex = columnIndex;
                if (oldOrderedColumnIndex === -1) {
                    this.orderStore();
                }
                return;
            }
        }
        this.orderedColumnIndex = -1;
        this.orderedDirection = '';
    }
    // Resizing part
    updatColumnWidths() {
        let totalWidth = this.refs.head.clientWidth - ff_1.getStyleAsNumber(this.refs.head, 'paddingLeft') - ff_1.getStyleAsNumber(this.refs.head, 'paddingRight');
        this.cachedTotalWidth = totalWidth;
        this.updatColumnWidthsWithTotalWidth(totalWidth);
    }
    // Used to adjust column widths after columns changed.
    // Many elements will be relayout after columns changed, 
    // And `updatColumnWidths` will cause force relayout.
    updatColumnWidthsRoughly() {
        this.updatColumnWidthsWithTotalWidth(this.cachedTotalWidth);
    }
    updatColumnWidthsWithTotalWidth(totalWidth) {
        let widthAndFlexArray = this.columns.map(({ flex, width }, index) => {
            let baseWidthInColumnConfig = Math.max(width || 0, this.minColumnWidth);
            // If column resized, we use the column width percentage to calculate new column width.
            let baseWidth = this.columnResized ? this.columnWidths[index] : baseWidthInColumnConfig;
            let extendFlex = 0;
            let shrinkFlex = 0;
            if (typeof flex === 'string') {
                let flexs = flex.split(/\s+/).map(Number);
                extendFlex = flexs[0] >= 0 ? flexs[0] : 0;
                shrinkFlex = flexs[1] >= 0 ? flexs[1] : extendFlex;
            }
            else if (typeof flex === 'number' && flex >= 0) {
                extendFlex = shrinkFlex = flex;
            }
            return [baseWidth, extendFlex, shrinkFlex];
        });
        let widths = columnWidthCalculator(widthAndFlexArray, totalWidth, this.minColumnWidth);
        this.columnWidths = widths;
        this.setColumnWidths(widths);
    }
    setColumnWidths(widths) {
        let totalWidth = ff_1.sum(widths);
        for (let index = 0; index < widths.length; index++) {
            let percent = widths[index] / totalWidth;
            this.refs.colgroup.children[index].style.width = percent * 100 + '%';
            this.refs.columns.children[index].style.width = percent * 100 + '%';
        }
    }
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
        let cursorMask = flit_1.render(flit_1.html `<div class="resizing-mask" />`, this).fragment.firstElementChild;
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
    setStartIndex(index) {
        if (this.repeatDir) {
            this.repeatDir.setStartIndex(index);
        }
    }
    scrollToViewIndex(index) {
        if (this.repeatDir) {
            this.repeatDir.scrollToViewIndex(index);
        }
    }
};
Grid = __decorate([
    flit_1.define('f-grid')
], Grid);
exports.Grid = Grid;
/**
    Calculate column widths from `{width, minWidth, flex}` values in column config.
    The algorithm is nearly same with the flex layout,
    except that the total column widths will always equal the available client width,
    and no column width should less than `minColumnWidth`.
*/
function columnWidthCalculator(widthAndFlexArray, clientWidth, minColumnWidth) {
    // Not enough space for even `minColumnWidth`, then average `clientWidth` to each column.
    if (clientWidth < minColumnWidth * widthAndFlexArray.length) {
        return ff_1.repeatTimes(clientWidth / widthAndFlexArray.length, widthAndFlexArray.length);
    }
    let totalBaseWidth = 0;
    let totalExtendFlex = 0;
    let totalShrinkFlex = 0;
    let widths = ff_1.repeatTimes(minColumnWidth, widthAndFlexArray.length);
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

},{"../store/async-store":58,"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],39:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const svg_symbol_1 = require("../icons/svg-symbol");
const ff_1 = require("@pucelle/ff");
const theme_1 = require("../style/theme");
let Icon = class Icon extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.type = '';
    }
    render() {
        let svgCode = svg_symbol_1.svgSymbols[this.type];
        if (!svgCode) {
            return '';
        }
        let [viewBox, inner] = ff_1.subMatches(svgCode, /<svg viewBox="(.+?)">([\s\S]+?)<\/svg>/)[0];
        let [, , w, h] = viewBox.split(' ');
        let width = theme_1.theme.adjustByLineHeight(Number(w));
        let height = theme_1.theme.adjustByLineHeight(Number(h));
        return flit_1.html `
		<template>
			<svg
				viewBox=${viewBox}
				width=${width}
				height=${height}
				:html=${inner}
			/>
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
let IconLoading = class IconLoading extends Icon {
    constructor() {
        super(...arguments);
        this.type = 'loading';
        this.loading = false;
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
            this.el.style.transform = 'rotate(' + value + 'deg)';
        };
        // Playing web animation will cause it becomes fuzzy.
        ff_1.animateByFunction(fn, 0, 360, 1000, 'linear').promise.then(() => {
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

},{"../icons/svg-symbol":56,"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],40:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const form_1 = require("./form");
let Input = class Input extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.type = 'text';
        this.touched = false;
        this.valid = true;
        this.placeholder = '';
        this.value = '';
        this.validator = null;
        this.error = '';
    }
    static style() {
        let { adjustByLineHeight: lh, adjustByFontSize: fs, errorColor, lineHeight, borderColor, backgroundColor, mainColor, successColor, focusBlurRadius } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			background: ${backgroundColor.highlight(5)};
			box-shadow: inset 0 -1px 0 0 ${borderColor};
		}

		input, textarea{
			width: 100%;
			font-size: ${fs(13)}px;
			border: none;
			background: none;
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		input{
			height: ${lineHeight}px;
			padding: 0 0 0 ${lh(8)}px;
		}

		textarea{
			line-height: ${lh(20)}px;
			padding: ${lh(4)}px ${lh(8)}px;
		}

		.valid{
			box-shadow: inset 0 -1px 0 0 ${successColor};

			input, textarea{
				padding-right: ${lineHeight}px;

				&:focus{
					box-shadow: 0 0 ${focusBlurRadius}px ${successColor.alpha(0.5)};
				}
			}
		}

		.invalid{
			box-shadow: inset 0 -1px 0 0 ${errorColor};

			input, textarea{
				padding-right: ${lineHeight}px;

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
			margin-bottom: -${lineHeight}px;
			font-size: ${fs(13)}px;
			color: ${errorColor};
		}
		`;
    }
    onCreated() {
        let form = flit_1.getClosestComponent(this.el, form_1.Form);
        if (form) {
            form.register(this);
        }
    }
    render() {
        return flit_1.html `
		<template
			:class.valid=${this.touched && this.valid === true}
			:class.invalid=${this.touched && this.valid === false}
		>
			<input type=${this.type}
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				@focus=${this.onFocus}
				@change=${(e) => this.onChange(e)}
			/>
			${this.touched && this.valid === true ? flit_1.html `<f-icon class="valid-icon" .type="checked" />` : ''}
			${this.error ? flit_1.html `<div class="error">${this.error}</div>` : ''}
		</template>
		`;
    }
    onFocus() {
        this.touched = true;
    }
    onChange(e) {
        let input = e.target;
        let value = this.value = input.value;
        if (this.validator) {
            this.error = this.validator(value);
        }
        this.emit('change', value, this.valid);
    }
};
Input = __decorate([
    flit_1.define('f-input')
], Input);
exports.Input = Input;
let Textarea = class Textarea extends Input {
    render() {
        return flit_1.html `
		<textarea
			placeholder=${this.placeholder}
			.value=${this.value}
			:ref="input"
			:class.valid=${this.touched && this.valid === true}
			:class.invalid=${this.touched && this.valid === false}
			@focus=${this.onFocus}
			@change=${(e) => this.onChange(e)}
		/>
		`;
    }
};
Textarea = __decorate([
    flit_1.define('f-textarea')
], Textarea);
exports.Textarea = Textarea;

},{"../style/theme":62,"./form":36,"@pucelle/flit":89}],41:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Loader_1;
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
let Loader = Loader_1 = class Loader extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.size = 'medium';
        this.round = 0;
    }
    static style() {
        let { mainColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: block;
			width: 18px;
			height: 18px;
			color: ${mainColor};
		}

		path{
			stroke: currentColor;
			fill: none;
			stroke-linecap: square;
			stroke-width: 3;
		}

		.bg{
			stroke-opacity: 0.3;
		}

		${Object.entries(Loader_1.sizes).map(([name, size]) => flit_1.css `
		.size-${name}{
			.snake{
				stroke-dasharray: ${size} ${size * 3};
			}
		}

		@keyframes loader-snake-${name}{
			0%{
				stroke-dashoffset: 0;
			}

			100%{
				stroke-dashoffset: -${size * 4};
			}
		}
		`)}
		`;
    }
    render() {
        let size = Loader_1.sizes[this.size];
        let d = `M1.5 1.5 H${size - 1.5} V${size - 1.5} H1.5Z`;
        return flit_1.html `
		<template
			:class="size-${this.size}"
			:style.animation="loader-snake-${this.size} 2s linear infinite"
		>
			<svg viewBox="0 0 ${size} ${size}" width=${size} height=${size}>
				<path class="bg" d=${d} />
				<path class="snake" d=${d} />
			</svg>
		<template
		`;
    }
};
Loader.sizes = {
    small: 16,
    medium: 24,
    large: 40,
};
Loader = Loader_1 = __decorate([
    flit_1.define('f-loader')
], Loader);
exports.Loader = Loader;

},{"../style/theme":62,"@pucelle/flit":89}],42:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const modal_1 = require("./modal");
let MessageModal = class MessageModal extends modal_1.Modal {
    constructor(el) {
        super(el);
        this.movable = false;
        this.options = null;
        this.stack = [];
        this.isTouched = false;
        this.inputErrorText = '';
    }
    static style() {
        let { mainColor, infoColor, adjustByLineHeight: lh, successColor, errorColor, warningColor, adjustByFontSize: fs } = theme_1.theme;
        return flit_1.css `
		:host{
			z-index: 1200;	// Higher that modal & layer - 1000, and tooltip - 1100
			width: 350px;
	
			&.wide, &.has-title{
				width: 500px;
			}
		}

		.body{
			display: flex;
			padding: ${lh(15)}px 0 0 0;
			line-height: ${lh(24)}px;
			min-height: ${lh(24)}px;
		}

		.left{}

		.icon{
			margin: 0 8px auto 0;
			stroke-width: 0.666px;

			svg{
				width: ${lh(30)}px;
				height: ${lh(30)}px;
			}
		}

		.right{
			flex: 1;
		}

		.text{
			padding-top: 4px;
			min-width: 0;
			word-wrap: break-word;

			a{
				text-decoration: underline;

				&:hover{
					color: ${mainColor.darken(10)};
				}
			}
		}

		.field{
			margin-top: 10px;
		}

		.input{
			width: 100%;
		}

		.error-text{
			color: ${errorColor};
			margin-top: 5px;
			font-size: ${fs(12)}px;
		}

		.list{
			margin-top: 10px;
			overflow-y: auto;
			max-height: ${lh(240)}px;
		}

		.icon-alert{
			color: ${errorColor};
		}

		.icon-info{
			color: ${infoColor};
		}

		.icon-success{
			color: ${successColor};
		}

		.icon-confirm{
			color: ${warningColor};
		}
		`.extends(super.style());
    }
    render() {
        let options = this.options || {};
        return flit_1.html `
		<template 
			tabindex="0"	
			:class.has-title=${options.title}
			:class.wide=${!!options.wide}
			${flit_1.show(this.opened, { transition: this.transition, enterAtStart: true, onend: this.onTransitionEnd })}
		>
		${this.mask ? flit_1.html `
			<div class="mask"
				:ref="mask"
				${flit_1.show(this.opened, { transition: this.transition, enterAtStart: true })}
			/>` : ''}
		${options.title ? flit_1.html `
			<div class="top head">${options.title}</whead>
			` : ''}
			<div class="body">
				<div class="left">
					${options.type !== 'prompt' ? flit_1.html `<f-icon :class="icon icon-${options.type}" .type="${options.type}" />` : ''}
				</div>
				<div class="right">
					<div class="text" :html=${options.content} />
				${options.type === 'prompt' ? flit_1.html `
					<div class="field">
						<input class="input" type="text"
							:ref="input"
							:class.touched=${this.isTouched}
							:model="options.inputValue"
							@keydown.enter=${this.onMouseEnter}
						>
						<div class="error-text">${this.inputErrorText}</div>
					</div>
					` : ''}
				</div>
			</div>

			<div class="foot">
			${options.buttons ? Object.entries(options.buttons).map(([key, text]) => {
            return flit_1.html `
					<button
						?filled=${key === 'ok'}
						@click=${() => this.onClickButton(key)}
						:disable=${options.type === 'prompt' && key === 'ok' && !options.inputValue}
					>
						${text}
					</button>
				`;
        }) : ''}
			</div>
		</template>
		`;
    }
    onMouseEnter() {
        this.onClickButton('ok');
    }
    onClickButton(btn) {
        let { type, inputValidator, inputValue, resolve } = this.options;
        let input = this.refs.input;
        if (btn === 'ok' && type === 'prompt' && input) {
            this.isTouched = true;
            if (inputValidator) {
                this.inputErrorText = inputValidator(inputValue || '');
                if (this.inputErrorText) {
                    return;
                }
            }
        }
        if (type === 'prompt') {
            this.isTouched = false;
            let value = btn === 'ok' && inputValue ? inputValue : '';
            resolve([btn, value]);
        }
        else {
            resolve(btn);
        }
        if (this.stack.length > 0) {
            this.showMessage(this.stack.shift());
        }
        else {
            this.hide();
        }
    }
    async showMessage(options) {
        let { list } = options;
        if (list) {
            options.content = options.content || '';
            options.content += '<div class="' + this.scopeClassName('list') + '">' + list.map(html => '<div>' + html.replace(/</g, '&lt;') + '</div>').join('') + '</div>';
        }
        let promise = new Promise((resolve) => {
            options.resolve = resolve;
        });
        this.options = options;
        this.inputErrorText = '';
        this.show();
        if (options.type === 'prompt') {
            await flit_1.renderComplete();
            this.refs.input.focus();
            this.refs.input.select();
        }
        return promise;
    }
};
MessageModal = __decorate([
    flit_1.define('f-message-modal')
], MessageModal);
exports.MessageModal = MessageModal;
class Message {
    constructor() {
        this.modal = null;
        this.labels = {
            ok: 'OK',
            cancel: 'Cancel',
            yes: 'Yes',
            no: 'No'
        };
    }
    showMessage(options) {
        if (!this.modal) {
            this.modal = flit_1.renderComponent(flit_1.html `<f-message-modal />`).component;
        }
        return this.modal.showMessage(options);
    }
    setLabels(labels) {
        Object.assign(this.labels, labels);
    }
    /** Show info type message. */
    info(content, options = {}) {
        return this.showMessage(Object.assign({
            type: 'info',
            content,
            buttons: { ok: this.labels.ok },
        }, options));
    }
    /** Show success type message. */
    success(content, options = {}) {
        return this.showMessage(Object.assign({
            type: 'success',
            content,
            buttons: { ok: this.labels.ok },
        }, options));
    }
    /** Show alert type message. */
    alert(content, options = {}) {
        return this.showMessage(Object.assign({
            type: 'alert',
            content,
            buttons: { ok: this.labels.ok },
        }, options));
    }
    /** Show confirm type message. */
    confirm(content, options = {}) {
        return this.showMessage(Object.assign({
            type: 'confirm',
            content,
            buttons: { cancel: this.labels.cancel, ok: this.labels.ok },
        }, options));
    }
    /** Show prompt type message. */
    prompt(content, options = {}) {
        return this.showMessage(Object.assign({
            type: 'prompt',
            content,
            inputValue: '',
            buttons: { cancel: this.labels.cancel, ok: this.labels.ok },
        }, options));
    }
}
exports.Message = Message;
exports.message = new Message();

},{"../style/theme":62,"./modal":43,"@pucelle/flit":89}],43:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
let Modal = class Modal extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.mask = true;
        this.title = '';
        this.opened = true;
        this.transition = 'fade';
        this.appendTo = 'body';
    }
    static style() {
        let { mainColor, textColor, layerBorderRadius, layerShadowBlurRadius, layerBackgroundColor, layerShadowColor, adjustByLineHeight: lh } = theme_1.theme;
        return flit_1.css `
		:host{
			position: fixed;
			display: flex;
			flex-direction: column;
			z-index: 1000;	// Same with layer
			border-radius: ${layerBorderRadius}px;
			box-shadow: 0 0 ${layerShadowBlurRadius}px ${layerShadowColor};
			background: ${layerBackgroundColor};
			max-width: 100%;
			max-height: 100%;
			padding: 0 ${lh(15)}px;
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

		.top{
			display: flex;
			flex: none;
			height: ${lh(40) + 2}px;
			line-height: ${lh(40)}px;
			border-bottom: 2px solid ${textColor.darken(10)};
		}

		.head{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(15)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.actions{
			display: flex;
			margin-right: -10px;

			button{
				all: unset;
				border: none;
				margin: auto 0;
				display: flex;
				width: ${lh(30)}px;
				height: ${lh(30)}px;
				cursor: pointer;
				color: ${textColor};
				transition: color 0.2s ease-out;

				f-icon{
					margin: auto;
				}
				
				&:hover{
					svg{
						stroke-width: 1.5;
					}
				}

				&:focus{
					color: ${mainColor};
					box-shadow: none;

					svg{
						stroke-width: 1.5;
					}
				}

				&:active{
					transform: translateY(1px);
				}
			}
		}

		.body{
			flex: 1;
			min-height: 0;
			position: relative;
		}

		.foot{
			flex: none;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 16px 0;

			button:nth-child(n+2){
				margin-left: 8px;
			}

			button:nth-last-child(n+2){
				margin-right: 8px;
			}

			button[align=left]{
				margin-right: auto;
			}

			button[align=right]{
				margin-left: auto;
			}

			button[align=center]{
				margin-left: auto;
				margin-right: auto;
			}
		}
	`;
    }
    //extensions may make win wrapped by a mask, so we need a win el
    render() {
        return flit_1.html `
		<template
			tabindex="0"
			${flit_1.show(this.opened, { transition: this.transition, enterAtStart: true, onend: this.onTransitionEnd })}
		>
		${this.mask ? flit_1.html `
			<div class="mask"
				:ref="mask"
				${flit_1.show(this.opened, { transition: this.transition, enterAtStart: true })}
			/>` : ''}
			<div class="top">
				<div class="head" :ref="head">
					${this.title}
				</div>
				<div class="actions">
					<button tabindex="0" @click=${this.hide}>
						<f-icon type="close" />
					</button>
				</div>
			</div>
			<div class="body"><slot name="body" /></div>
			<div class="foot"><slot name="foot" /></div>
		</template>
		`;
    }
    onTransitionEnd(type, finish) {
        if (type === 'leave' && finish) {
            if (this.mask) {
                this.refs.mask.remove();
            }
            this.el.remove();
        }
    }
    async onConnected() {
        if (this.appendTo) {
            flit_1.appendTo(this.el, this.appendTo);
        }
        await flit_1.renderComplete();
        if (this.mask && this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
            this.el.before(this.refs.mask);
        }
        this.toCenter();
        if (this.el.tabIndex === 0) {
            this.el.focus();
        }
        flit_1.on(window, 'resize', ff_1.debounce(this.onWindowResize, 200).wrapped, this);
    }
    onDisconnected() {
        flit_1.off(window, 'resize', this.onWindowResize, this);
    }
    onWindowResize() {
        if (this.opened) {
            this.toCenter();
        }
    }
    // To show the modal, you may `renderCoponent` and then call `show()` or append to `body`.
    // Otherwise you can also just render it as a child element into document.
    show() {
        this.opened = true;
        if (this.appendTo) {
            flit_1.appendTo(this.el, this.appendTo);
        }
    }
    toCenter() {
        ff_1.align(this.el, document.documentElement, 'c');
    }
    hide() {
        this.opened = false;
    }
    toggleOpened() {
        this.opened ? this.hide() : this.show();
    }
};
Modal = __decorate([
    flit_1.define('f-modal')
], Modal);
exports.Modal = Modal;

},{"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],44:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
let NotificationTips = class NotificationTips extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.hideDelay = 5000;
        this.appendTo = 'body';
        this.seed = 1;
        this.items = [];
    }
    static style() {
        let { infoColor, adjustByLineHeight: lh, successColor, errorColor, layerBorderRadius, layerShadowBlurRadius, adjustByFontSize: fs, backgroundColor, textColor, layerShadowColor } = theme_1.theme;
        return flit_1.css `
		:host{
			position: fixed;
			right: 10px;
			bottom: 10px;
			max-width: 300px;
			z-index: 1300;	// Higher than content
			font-size: ${fs(12)}px;
		}

		.item{
			position: relative;
			display: flex;
			margin-top: 10px;
			background: ${backgroundColor};
			box-shadow: 0 0 ${layerShadowBlurRadius}px ${layerShadowColor};
			cursor: pointer;
			overflow: hidden;
			border-radius: ${layerBorderRadius}px;
		}

		.close{
			position: absolute;
			right: 5px;
			top: 5px;
			display: flex;
			width: 30px;
			height: 30px;
			color: ${textColor};

			f-icon{
				margin: auto;
			}

			&:hover{
				color: ${textColor.highlight(10)};
			}

			&:active{
				transform: translateY(1px);
			}
		}

		.left{
			padding: ${lh(10)}px;
		}

		.icon{
			display: block;
			width: ${lh(20)}px;
			height: ${lh(20)}px;
			color: #fff;

			svg{
				width: ${lh(20)}px;
				height: ${lh(20)}px;
			}
		}

		.right{
			flex: 1;
			min-width: 0;
			padding: ${lh(10)}px;
			padding-right: ${lh(40)}px;
		}

		.head{
			font-weight: bold;
			line-height: ${lh(20)}px;
			margin-bottom: ${lh(4)}px;
		}

		.body{
			flex: 1;
			min-width: 0;
			line-height: ${lh(20)}px;
			text-align: left;
			word-wrap: break-word;

			a{
				font-weight: bold;
			}
		}

		.buttons{
			display: flex;
			margin-top: ${lh(8)}px;
		}

		
		button{
			height: ${lh(24)}px;
			line-height: ${lh(24) - 2}px;
			margin-right: ${lh(8)}px;
			padding: 0 ${lh(12)}px;
		}

		${[
            ['alert', errorColor],
            ['info', infoColor],
            ['success', successColor]
        ].map(([type, color]) => flit_1.css `
			.type-${type}{
				&:hover{
					background: ${color.mix(backgroundColor, 95)};
				}

				.left{
					background: ${color};
				}
			}`.toString()).join('')}
		`;
    }
    render() {
        return flit_1.repeat(this.items, (item) => flit_1.html `<div class="item"
				:class="type-${item.type}"
				@mouseenter=${() => this.onMouseEnter(item)}
				@mouseleave=${() => this.onMouseLeave(item)}
			>
				<div class="close" @click=${() => this.onClickClose(item)}>
					<f-icon type="close" />
				</div>
				<div class="left">
					<f-icon class="icon" .type=${item.type} />
				</div>
				<div class="right">
					${item.title ? flit_1.html `<div class="head">${item.title}</div>` : ''}
					<div class="body" :html=${item.content}></div>
					
					${item.buttons ? flit_1.html `
					<div class="buttons">
						${Object.entries(item.buttons).map(([btn, text]) => flit_1.html `
							<button @click=${() => this.onClickBtn(item, btn)}>
								${text}
							</button>`)}
					</div>` : ''}
				</div>
			</div>`, { transition: 'fade', enterAtStart: true, onend: this.onTransitionEnd });
    }
    onMouseEnter(item) {
        item.entered = true;
    }
    onMouseLeave(item) {
        item.entered = false;
        if (!item.timeout) {
            this.hideLater(item);
        }
    }
    onClickClose(item) {
        ff_1.remove(this.items, item);
    }
    onClickBtn(item, btn) {
        if (item.callback) {
            item.callback(btn);
        }
    }
    onTransitionEnd(type) {
        if (type === 'leave' && this.items.length === 0) {
            this.el.remove();
        }
    }
    showNotification(options) {
        if (options.id) {
            let item = this.items.find(v => v.id === options.id);
            if (item) {
                delete item.hideDelay;
                Object.assign(item, options);
                this.hideLater(item);
                return options.id;
            }
        }
        let item = Object.assign({
            id: this.seed++,
            entered: false,
            timeout: null
        }, options);
        this.items.unshift(item);
        this.hideLater(item);
        if (this.items.length === 1) {
            document.body.append(this.el);
        }
        return item.id;
    }
    hideLater(item) {
        if (item.timeout) {
            item.timeout.cancel();
        }
        item.timeout = ff_1.timeout(() => {
            item.timeout = null;
            if (!item.entered) {
                this.hide(item.id);
            }
        }, item.hideDelay || this.hideDelay);
    }
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
    hideAll() {
        this.items = [];
        if (this.items.length === 0) {
            this.el.remove();
        }
    }
};
NotificationTips = __decorate([
    flit_1.define('f-notification-tips')
], NotificationTips);
exports.NotificationTips = NotificationTips;
class Notification {
    constructor() {
        this.tips = null;
    }
    unique() {
        return new UniqueNotification(this);
    }
    showNotification(options) {
        if (!this.tips) {
            this.tips = flit_1.renderComponent(flit_1.html `<f-notification-tips />`).component;
        }
        return this.tips.showNotification(options);
    }
    info(content, options = {}) {
        options.type = 'info';
        options.content = content;
        return this.showNotification(options);
    }
    alert(content, options = {}) {
        options.type = 'alert';
        options.content = content;
        return this.showNotification(options);
    }
    success(content, options = {}) {
        options.type = 'success';
        options.content = content;
        return this.showNotification(options);
    }
}
exports.Notification = Notification;
class UniqueNotification {
    constructor(raw) {
        this.id = null;
        this.raw = raw;
    }
    overwriteOptions(options) {
        if (this.id) {
            options.id = this.id;
        }
    }
    info(content, options = {}) {
        this.overwriteOptions(options);
        return this.id = this.raw.info(content, options);
    }
    alert(content, options = {}) {
        this.overwriteOptions(options);
        return this.id = this.raw.alert(content, options);
    }
    success(content, options = {}) {
        this.overwriteOptions(options);
        return this.id = this.raw.success(content, options);
    }
}
exports.UniqueNotification = UniqueNotification;
exports.notification = new Notification();

},{"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],45:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const popup_1 = require("./popup");
// Compare to `<popup>`, it can set title.
let Popover = class Popover extends popup_1.Popup {
    constructor() {
        super(...arguments);
        this.title = '';
    }
    static style() {
        let { adjustByLineHeight: lh } = theme_1.theme;
        return flit_1.css `
		:host{
			padding: 0 ${lh(14)}px;
		}

		.header{
			line-height: ${lh(28)}px;
			padding: 5px 0;
			border-bottom: 2px solid #333;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(14)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			padding: ${lh(8)}px 0;
		}
		`.extends(super.style());
    }
    renderLayer() {
        return flit_1.html `
		<f-popup>	
		${this.title ? flit_1.html `
			<div class="header">
				<div class="title">${this.title}</div>
			</div>` : ''}
			<div class="content"><slot name="content" /></div>
		</f-popup>
		`.extends(super.render());
    }
};
Popover = __decorate([
    flit_1.define('f-popover')
], Popover);
exports.Popover = Popover;

},{"../style/theme":62,"./popup":46,"@pucelle/flit":89}],46:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
/**It's the base class for all the layer which will align with another element. */
let Popup = class Popup extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.herizontal = false;
        this.trangle = true;
        /**
         * The selector to get HTML element to append to or the HTML element.
         * Note that don't specify this value to `document.body`, it may not prepared when class initialize.
         */
        this.appendTo = 'body';
    }
    static style() {
        let { layerBorderRadius, layerBackgroundColor, layerShadowBlurRadius, layerShadowColor } = theme_1.theme;
        return flit_1.css `
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: ${layerBackgroundColor};
			border-radius: ${layerBorderRadius}px;
			filter: drop-shadow(0 1px ${layerShadowBlurRadius / 2}px ${layerShadowColor});	// 3px nearly equals 6px in box-shadow.
		}

		.trangle{
			position: absolute;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 11px solid ${layerBackgroundColor};
			top: -11px;

			&-herizontal{
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 11px solid ${layerBackgroundColor};
				border-left: 0;
				top: auto;
				left: -11px;
			}
		}
		`;
    }
    render() {
        return flit_1.html `
			${this.trangle ? flit_1.html `
				<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal} />
			` : ''}
			<slot />
		`;
    }
    // Call `update` every time after restored from `cache(...)`.
    onConnected() {
        // Why render `<layer>` to body?
        // It's very common that the `el` is covered or clipped,
        // which will cause the `<layer>` is not fully visible.
        // You can still render the `<layer>` in the same scroller with `<popup>`.
        // Why inserted into body every time?
        // Most layers share same `z-index`, append newly opened `<layer>` will makesure it covers others.
        // Note that:
        // The template `content` can't pass into `<layer>` as an argument,
        // it will cause the template was parsed in `<layer>` context.
        // The `<layer>` will be cached in `<popup>`, and element will be removed when not in use.
        // After restored from `cache`, it will be inserted back into `<popup>`.
        // So here we need to move it to `body` after every time rendered.
        // If there are serval nodes which belong to an template you need to append into another element,
        // Don't forget to move the anchor nodes, or the whole template nodes into the target element,
        // or they will can't be removed because they are outside of the template node ranges.
        // In the future, we may implement a flit directive `renderTo(..., ...)`, 
        // to render elements and it's anchor node to another element.
        this.applyAppendTo();
    }
    applyAppendTo() {
        if (this.appendTo) {
            flit_1.appendTo(this.el, this.appendTo);
        }
    }
};
Popup = __decorate([
    flit_1.define('f-popup')
], Popup);
exports.Popup = Popup;

},{"../style/theme":62,"@pucelle/flit":89}],47:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const tooltip_1 = require("../bindings/tooltip");
/** Now only a input, will extend to list suggestted local or remote data in future. */
let Progress = class Progress extends flit_1.Component {
    constructor() {
        super(...arguments);
        /** Betweens 0-1 */
        this.value = 0;
    }
    static style() {
        let { mainColor, lineHeight } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			height: ${lineHeight}px;
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
		`;
    }
    render() {
        let value = Math.round(Math.min(this.value, 1) * 100) + '%';
        let tip = tooltip_1.tooltip(value, {
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
};
Progress = __decorate([
    flit_1.define('f-progress')
], Progress);
exports.Progress = Progress;

},{"../bindings/tooltip":32,"../style/theme":62,"@pucelle/flit":89}],48:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
let Radio = class Radio extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.radioGroup = null;
        // Used to compare with `RadioGroup.value`
        this.value = null;
    }
    static style() {
        let { mainColor, adjustByLineHeight: lh, focusBlurRadius } = theme_1.theme;
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
			border-radius: 50%;
			border: 1px solid currentColor;
			margin-right: ${lh(6)}px;
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
    render() {
        let { adjustByLineHeight: lh } = theme_1.theme;
        return flit_1.html `
			<template
				tabindex="0"
				:class.checked=${this.checked}
				@@click=${this.onClick}
				@@focus=${this.onFocus}
			>
				<svg class="icon" viewBox="0 0 14 14" style="width: ${lh(16)}px; height: ${lh(16)}px;">
					${this.checked ? flit_1.svg `<circle style="fill:currentColor;stroke:none;" cx="7" cy="7" r="4" />` : ''}
				</svg>
				<div class="label">
					<slot />
				</div>
			</template>
		`;
    }
    onCreated() {
        let group = flit_1.getClosestComponent(this.el, RadioGroup);
        if (group) {
            this.radioGroup = group;
            this.checked = this.radioGroup.value == this.value;
            this.radioGroup.register(this);
        }
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
// Not `radio-group` because we want to correspond with `radiogroup` with `https://www.w3.org/TR/wai-aria-practices-1.2/`.
let RadioGroup = class RadioGroup extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.value = null;
        this.radios = [];
    }
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

},{"../style/theme":62,"@pucelle/flit":89}],49:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const ff_1 = require("@pucelle/ff");
let Resizer = class Resizer extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.position = 'right';
        this.rate = 1; // You may set this to `2` for parent that aligns to center .
        this.max = Infinity;
        this.min = 0;
        this.resizedValue = -1;
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
			@@mousedown=${this.onStartResize}
		/>
		`;
    }
    onReady() {
        if (ff_1.getStyle(this.el.parentElement, 'position') === 'static') {
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
            this.emit('change', this.resizedValue);
        };
        let cursorMask = flit_1.render(flit_1.html `
			<div class="resizing-mask" class="${this.position === 'left' || this.position === 'right' ? 'herizontal' : 'vertical'}"
		/>`, this).fragment.firstElementChild;
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
        this.resizedValue = value;
    }
};
Resizer = __decorate([
    flit_1.define('f-resizer')
], Resizer);
exports.Resizer = Resizer;

},{"@pucelle/ff":27,"@pucelle/flit":89}],50:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
let Router = class Router extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.prefix = '';
        this.path = '';
    }
    onCreated() {
        this.path = this.getPathFromUri(location.href);
        flit_1.on(window, 'popstate', this.onStateChange, this);
    }
    getPathFromUri(uri) {
        let path = new URL(uri).pathname;
        if (this.prefix && path.startsWith(this.prefix)) {
            path = path.slice(this.prefix.length);
        }
        if (!path) {
            path = '/';
        }
        return path;
    }
    onDisconnected() {
        flit_1.off(window, 'popstate', this.onStateChange, this);
    }
    onStateChange(e) {
        if (e.state) {
            this.redirectTo(e.state.path);
        }
    }
    route(routePath, renderFn, options = {}) {
        if (this.isMatch(routePath)) {
            if (options.title) {
                document.title = options.title;
            }
            let params = this.match(routePath);
            let match = {
                params: params ? params.params : {},
                captures: params ? params.captures : []
            };
            return renderFn(match);
        }
        else {
            return '';
        }
    }
    isMatch(routePath) {
        return PathParser.isMatch(this.path, routePath);
    }
    match(routePath) {
        return PathParser.matchPath(this.path, routePath);
    }
    goto(path) {
        this.path = path;
        let uri = this.getURIFromPath(path);
        history.pushState({ path }, '', uri);
    }
    redirectTo(path) {
        this.path = path;
        let uri = this.getURIFromPath(path);
        history.replaceState({ path }, '', uri);
    }
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
            captures
        };
    }
    PathParser.matchPath = matchPath;
    function parsePath(routePath) {
        let keys = [];
        let re = new RegExp(routePath
            .replace(/\./g, '\\.')
            .replace(/\*/g, '.*?')
            .replace(/(\/?):(\w+)/g, function (_m0, slash, property) {
            if (property) {
                keys.push(property);
            }
            return slash + '?([\\w-]*?)';
        })
            .replace(/^/, '^')
            .replace(/$/, '$'), 'i');
        let parsed = { re, keys };
        pathParsedResultMap.set(routePath, parsed);
        return parsed;
    }
})(PathParser || (PathParser = {}));
flit_1.defineBinding('goto', class GotoBinding {
    constructor(el) {
        this.value = '';
        this.router = null;
        this.el = el;
        flit_1.on(this.el, 'click', this.onClick, this);
    }
    update(value) {
        this.value = value;
    }
    onClick() {
        this.ensureRouter();
        this.router.goto(this.value);
    }
    ensureRouter() {
        if (!this.router) {
            this.router = flit_1.getClosestComponent(this.el.parentElement, Router);
            if (!this.router) {
                throw new Error(`":goto" must be contained in a extended component of "<f-router>"`);
            }
        }
    }
    remove() { }
});

},{"@pucelle/flit":89}],51:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
/** Now only a input, will extend to list suggestted local or remote data in future. */
let Search = class Search extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.placeholder = '';
        this.value = '';
        this.focused = false;
    }
    static style() {
        let { adjustByLineHeight: lh, lineHeight, borderColor, borderRadius, mainColor, focusBlurRadius } = theme_1.theme;
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
			height: ${lineHeight}px;
			padding: 0 ${lh(26)}px 0 ${lh(26)}px;
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
			color: ${borderColor.highlight(10)};
		}

		.clear{
			display: flex;
			position: absolute;
			width: ${lh(28)}px;
			top: 0;
			bottom: 0;
			right: 0px;
			color: ${borderColor.highlight(10)};
			cursor: pointer;

			&:hover{
				color: ${mainColor};
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
				@change=${(e) => this.onChange(e)}
			/>

			${this.value && !this.focused ? flit_1.html `
			<div class="clear" @click=${this.clear}>
				<f-icon class="close-icon" .type="close" />
			</div>` : ''}
		`;
    }
    onFocus() {
        this.focused = true;
        flit_1.once(this.refs.input, 'blur', () => this.focused = false);
    }
    onChange(e) {
        let input = e.target;
        let value = this.value = input.value;
        this.emit('change', value);
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

},{"../style/theme":62,"@pucelle/flit":89}],52:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
const dropdown_1 = require("./dropdown");
let Select = class Select extends dropdown_1.Dropdown {
    constructor() {
        super(...arguments);
        this.trigger = 'click';
        this.trangle = false;
        this.alignMargin = 0;
        this.data = [];
        this.value = null;
        this.multiple = false;
        this.searchable = false;
        this.ordered = false;
        this.placeholder = '';
        this.inputed = '';
        this.editing = false;
    }
    static style() {
        let { mainColor, lineHeight, adjustByLineHeight: lh, borderColor, layerShadowBlurRadius, backgroundColor, layerBackgroundColor, layerShadowColor } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			width: 150px;
			height: ${lineHeight}px;
			background: ${backgroundColor.highlight(5)};
			line-height: ${lineHeight}px;
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

		.icon{
			margin-left: auto;
			margin-right: 4px;
		}
	
		.input{
			flex: 1;
			min-width: 0;
			padding: 0 0 0 ${lh(8)}px;
			height: ${lineHeight}px;
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
	
		.popup{
			padding: 0;
			border-radius: 0;
			filter: none;
			box-shadow: 0 1px ${layerShadowBlurRadius}px ${layerShadowColor};
		}
	
		.option{
			display: flex;
			padding: 0 8px;
			cursor: pointer;

			&:not(:last-child){
				box-shadow: inset 0 -1px 0 0 ${layerBackgroundColor};	// Add a white line as spliter for adjacent selected items.
			}

			&:hover{
				background: ${layerBackgroundColor.highlight(5)};

				&.selected{
					background: ${mainColor.alpha(0.15)};
				}
			}

			&.selected{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};
			}
		}

		.option-content{
			flex: 1;
			min-width: 0;
		}

		.selected-icon{
			margin-right: -4px;
		}
		`.extends(super.style());
    }
    render() {
        return flit_1.html `
		<template :class.not-inputable=${!this.searchable}>
			${this.renderInput()}
		</template>
		`.extends(super.render());
    }
    renderInput() {
        return flit_1.html `
		<input type="text"
			class="input"
			:ref="input"
			.value=${this.editing ? this.inputed : this.renderCurrentDisplay()}
			.placeholder=${this.placeholder}
			?readonly=${!this.editing}
			@click=${this.onClick}
			@input=${this.onInput}
		>
		`;
    }
    renderPopupContent() {
        let data = this.getOptionData();
        let list = flit_1.repeat(data, ([key, display]) => this.renderOption(key, display));
        return flit_1.html `
		<f-popup
			class="popup"
			:ref="popup"
			.trangle="false"
		>
			<ul class="list" :ref="list">
				${list}
			</ul>
		</f-popup>
		`;
    }
    renderOption(key, display) {
        let selected = this.isSelected(key);
        return flit_1.html `
		<li
			class="option"
			:class.selected=${selected}
			@click.prevent=${() => this.select(key)}
			style=${this.renderOptionStyle(key)}
		>
			<div class="option-content">
				${this.renderOptionContent(key, display)}
			</div>
			${selected ? flit_1.html `<f-icon class="selected-icon" .type="checked" />` : ''}
		</li>
		`;
    }
    // Used to render like color select
    renderOptionStyle(_key) {
        return '';
    }
    renderCurrentDisplay() {
        if (this.multiple) {
            let displays = [];
            for (let [key, display] of this.data) {
                if (this.value.includes(key)) {
                    displays.push(this.renderOptionDisplay(key, display));
                }
            }
            return displays.join('; ');
        }
        else {
            for (let [key, display] of this.data) {
                if (this.value == key) {
                    return this.renderOptionDisplay(key, display);
                }
            }
            return '';
        }
    }
    renderOptionDisplay(_key, display) {
        return display;
    }
    renderOptionContent(key, display) {
        return this.renderOptionDisplay(key, display);
    }
    getOptionData() {
        if (this.searchable && this.inputed) {
            let lowerSearchWord = this.inputed.toLowerCase();
            let filteredData = [];
            for (let item of this.data) {
                if (String(item[1]).includes(lowerSearchWord)) {
                    filteredData.push(item);
                }
            }
            return filteredData;
        }
        else {
            return this.data;
        }
    }
    isSelected(key) {
        if (this.multiple) {
            return this.value.includes(key);
        }
        else {
            return this.value == key;
        }
    }
    onCreated() {
        this.initValue();
        this.initEditing();
    }
    initValue() {
        if (this.multiple && !Array.isArray(this.value)) {
            if (this.value === null || this.value === undefined) {
                this.value = [];
            }
            else {
                this.value = [this.value];
            }
        }
    }
    initEditing() {
        if (this.searchable) {
            this.watch(() => this.opened, (opened) => {
                if (!opened && this.editing) {
                    this.endEditing();
                }
            });
        }
    }
    onClick() {
        if (this.searchable && !this.editing) {
            this.startEditing();
        }
    }
    select(key) {
        if (this.multiple) {
            if (this.value.includes(key)) {
                ff_1.remove(this.value, key);
            }
            else {
                this.value.push(key);
                if (this.ordered) {
                    let keys = [...this.data].map(([key]) => key);
                    this.value.sort((key1, key2) => {
                        return keys.indexOf(key1) - keys.indexOf(key2);
                    });
                }
            }
        }
        else {
            this.value = key;
            this.hidePopup();
        }
        this.emit('change', this.value);
    }
    async startEditing() {
        this.editing = true;
        this.inputed = '';
        await flit_1.renderComplete();
        this.refs.input.focus();
    }
    endEditing() {
        this.editing = false;
    }
    async onPopupOpened() {
        await flit_1.renderComplete();
        if (this.editing && this.refs.input) {
            this.refs.input.focus();
        }
        // We should not ref popup el by `:ref`, or it will can't be released.
        if (this.popupBinding && this.popupBinding.popup) {
            let popupEl = this.popupBinding.popup.el;
            popupEl.style.minWidth = String(this.el.offsetWidth) + 'px';
            let el = popupEl.querySelector(this.scopeClassName('.selected'));
            if (el && ff_1.getScrollDirection(this.refs.list) === 'y') {
                ff_1.scrollToTop(el);
            }
        }
    }
    onInput() {
        this.inputed = this.refs.input.value;
        this.showPopup();
    }
};
Select = __decorate([
    flit_1.define('f-select')
], Select);
exports.Select = Select;

},{"../style/theme":62,"./dropdown":35,"@pucelle/ff":27,"@pucelle/flit":89}],53:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
const ff_1 = require("@pucelle/ff");
const tooltip_1 = require("../bindings/tooltip");
let Slider = class Slider extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.vertical = false;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.value = 0;
        this.draging = false;
    }
    static style() {
        let { mainColor, borderColor, adjustByLineHeight: lh, adjustByFontSize: fs, focusBlurRadius, backgroundColor } = theme_1.theme;
        let grooveSize = 1;
        let ballSize = Math.ceil(lh(7)) * 2 + grooveSize;
        return flit_1.css `
		:host{
			display: inline-flex;
			vertical-align: top;
			flex-direction: column;
			justify-content: center;
			position: relative;
			width: ${lh(150)}px;
			height: ${lh(30)}px;
			font-size: ${fs(13)}px;
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
			border-radius: 50%;
			border: 1px solid ${borderColor};
			background: ${backgroundColor};
			float: right;
			width: ${ballSize}px;
			height: ${ballSize}px;
			margin: -${(ballSize - grooveSize) / 2}px -${Math.round(ballSize / 2)}px;

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

		:host[vertical]{
			width: ${lh(30)}px;
			height: ${lh(150)}px;
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
		`;
    }
    render() {
        let tip = tooltip_1.tooltip(String(this.value), {
            alignTo: () => this.refs.ball,
            alignPosition: this.vertical ? 'r' : 't'
        });
        return flit_1.html `
		<template
			tabindex="0"
			:class.dragging=${this.draging}
			${tip}
			@@mousedown=${this.onMouseDown}
			@@focus=${this.onFocus}
			@@blur=${this.onBlur}
		>
			<div class="groove" :ref="groove">
				<div class="groove-bg" />
				<div class="progress"
					:style.width.percent=${this.vertical ? '' : this.getPercent()}
					:style.height.percent=${this.vertical ? this.getPercent() : ''}
				>
					<div class="ball" :ref="ball" />
				</div>
			</div>
		</template>
		`;
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
        let unkeep = ff_1.MouseLeave.keep(this.el);
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
            flit_1.off(document, 'mousemove', onMouseMove);
            unkeep();
            this.draging = false;
        });
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

},{"../bindings/tooltip":32,"../style/theme":62,"@pucelle/ff":27,"@pucelle/flit":89}],54:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
let Switch = class Switch extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.checked = false;
    }
    static style() {
        let { mainColor, lineHeight, adjustByLineHeight: lh, focusBlurRadius, backgroundColor } = theme_1.theme;
        let h = lh(18);
        let w = h * 2 - 8;
        return flit_1.css `
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${w}px;
			height: ${h}px;
			background: ${backgroundColor.highlight(23.3)};
			border-radius: ${h / 2}px;
			padding: 1px;
			margin: ${(lineHeight - h) / 2}px 0;
			transition: background-color 0.2s ${flit_1.getEasing('ease-out-cubic')};
			cursor: pointer;

			&:hover{
				background: ${backgroundColor.highlight(33)};
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
			transition: margin 0.2s ${flit_1.getEasing('ease-out-cubic')};
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
			:class.on=${this.checked}
			@@click=${this.onClick}
			@@focus=${this.onFocus}
			@@blur=${this.onBlur}
		>
			<div class="ball"></div>
		</template>
		`;
    }
    onClick() {
        this.checked = !this.checked;
        this.emit('change', this.checked);
    }
    onFocus() {
        flit_1.on(document, 'keydown', this.onKeyDown, this);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onClick();
        }
        else if (e.key === 'ArrowLeft') {
            if (this.checked) {
                e.preventDefault();
                this.onClick();
            }
        }
        else if (e.key === 'ArrowRight') {
            if (!this.checked) {
                e.preventDefault();
                this.onClick();
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

},{"../style/theme":62,"@pucelle/flit":89}],55:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("../style/theme");
let Tag = class Tag extends flit_1.Component {
    constructor() {
        super(...arguments);
        this.closable = false;
    }
    static style() {
        let { borderColor, borderRadius, adjustByLineHeight: lh, adjustByFontSize: fs } = theme_1.theme;
        return flit_1.css `
		:host{
			display: inline-flex;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			font-size: ${fs(13)}px;
			line-height: ${lh(18)}px;
			height: ${lh(20)}px;
			padding: 0 ${lh(6)}px 0 ${lh(6)}px;
			cursor: pointer;

			&:hover{
				opacity: 0.9;
			}

			&:active{
				opacity: 0.8;
			}
		}
	
		.icon{
			margin-left: ${lh(4)}px;
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
			${this.closable ? flit_1.html `<div class="icon" @@click=${this.close}><f-icon .type="close" /></div>` : ''}
		`;
    }
    close() {
        this.emit('close');
    }
};
Tag = __decorate([
    flit_1.define('f-tag')
], Tag);
exports.Tag = Tag;

},{"../style/theme":62,"@pucelle/flit":89}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svgSymbols = {
    'checked': `
		<svg viewBox="0 0 15 15">
			<path style="fill:currentColor; stroke:none;" d="M6,12L2.1,7.5C2,7.3,2,7,2.1,6.8c0.2-0.2,0.4-0.2,0.6,0c0,0,0,0,0,0L6,10.6l7.3-8.5c0.2-0.2,0.4-0.2,0.6,0c0,0,0,0,0,0c0.2,0.2,0.2,0.4,0,0.6L6,12z"/>
		</svg>
	`,
    'close': `
		<svg viewBox="0 0 15 15">
			<path style="fill:currentColor; stroke:none;" d="M2.9,12.5c-0.2,0-0.4-0.2-0.4-0.4c0-0.1,0-0.2,0.1-0.3l9.2-9.2c0.2-0.2,0.4-0.2,0.6,0c0.2,0.2,0.2,0.4,0,0.6l-9.2,9.2C3.1,12.5,3,12.5,2.9,12.5z"/>
			<path style="fill:currentColor; stroke:none;" d="M12.1,12.5c-0.1,0-0.2,0-0.3-0.1L2.6,3.2C2.5,3,2.5,2.8,2.6,2.6c0.2-0.2,0.4-0.2,0.6,0l9.2,9.2c0.2,0.2,0.2,0.4,0,0.6C12.3,12.4,12.2,12.5,12.1,12.5L12.1,12.5z"/>
		</svg>
	`,
    'down': `
		<svg viewBox="0 0 15 15">
			<polygon style="fill:currentColor; stroke:none;" points="7.5,11 3.5,4.4 4.2,4 7.5,9.4 10.8,4 11.5,4.4"/>
		</svg>
	`,
    'error': `
		<svg viewBox="0 0 23 23">
			<path style="fill:currentColor;stroke:none;" d="M16.35,6.65a.5.5,0,0,0-.71,0L11.5,10.79,7.35,6.65a.5.5,0,0,0-.71.71l4.15,4.15L6.65,15.65a.5.5,0,1,0,.71.71l4.15-4.15,4.15,4.15a.5.5,0,0,0,.71-.71L12.21,11.5l4.15-4.15A.5.5,0,0,0,16.35,6.65Z"/>
			<path style="fill:currentColor;stroke:none;" d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.5,11.5,0,0,0,11.5,0Zm0,22A10.5,10.5,0,1,1,22,11.5,10.51,10.51,0,0,1,11.5,22Z"/>
		</svg>
	`,
    'info': `
		<svg viewBox="0 0 23 23">
			<path style="fill:currentColor;stroke:none;" d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.5,11.5,0,0,0,11.5,0Zm0,22A10.5,10.5,0,1,1,22,11.5,10.51,10.51,0,0,1,11.5,22Z"/>
			<rect style="fill:currentColor;stroke:none;" x="10.5" y="5" width="2" height="2"/>
			<polygon style="fill:currentColor;stroke:none;" points="12.5 10 12.5 9 10.5 9 9.5 9 9.5 10 10.5 10 10.5 17 9.5 17 9.5 18 10.5 18 12.5 18 13.5 18 13.5 17 12.5 17 12.5 10"/>
		</svg>
	`,
    'love': `
		<svg viewBox="0 0 15 15">
			<path style="fill:currentColor;stroke:none;" d="M11.5,2.85a1.24,1.24,0,0,1,.76.26A1.92,1.92,0,0,1,13,4.47a2.1,2.1,0,0,1-.48,1.58l-5,5.67-5-5.67A2.1,2.1,0,0,1,2,4.47,1.92,1.92,0,0,1,2.74,3.1a1.23,1.23,0,0,1,.76-.26,1.61,1.61,0,0,1,1.18.58L5.74,4.62a2.32,2.32,0,0,0,3.53,0l1.06-1.19a1.61,1.61,0,0,1,1.18-.58m0-.85a2.45,2.45,0,0,0-1.82.86L8.63,4.06a1.47,1.47,0,0,1-2.26,0L5.32,2.86A2.45,2.45,0,0,0,3.5,2a2.09,2.09,0,0,0-1.27.43,2.94,2.94,0,0,0-.38,4.18L7.5,13l5.65-6.39a2.94,2.94,0,0,0-.38-4.18A2.09,2.09,0,0,0,11.5,2Z"/>
		</svg>
	`,
    'question': `
		<svg viewBox="0 0 23 23">
			<path style="fill:currentColor;stroke:none;" d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.5,11.5,0,0,0,11.5,0Zm0,22.08A10.58,10.58,0,1,1,22.08,11.5,10.59,10.59,0,0,1,11.5,22.08Z"/>
			<path style="fill:currentColor;stroke:none;" d="M13.94,5.93a3.23,3.23,0,0,0-1.16-.79A4.54,4.54,0,0,0,11,4.85a3.7,3.7,0,0,0-1.54.32,3.61,3.61,0,0,0-1.22.9,4.32,4.32,0,0,0-.82,1.39,5.73,5.73,0,0,0-.34,1.79h2A4.88,4.88,0,0,1,9.3,8.12a3.09,3.09,0,0,1,.4-.87,1.84,1.84,0,0,1,.59-.56,1.46,1.46,0,0,1,.75-.2,1.85,1.85,0,0,1,.75.14,1.5,1.5,0,0,1,.54.4,1.63,1.63,0,0,1,.32.58,2.38,2.38,0,0,1,.1.71,1.74,1.74,0,0,1-.22.88,3.79,3.79,0,0,1-.54.73,9.6,9.6,0,0,1-.71.67,6.62,6.62,0,0,0-.71.71,3.82,3.82,0,0,0-.54.84,2.4,2.4,0,0,0-.22,1.05v1.14h2.32V13.28a1.92,1.92,0,0,1,.2-.87,4.1,4.1,0,0,1,.49-.76q.3-.36.64-.72a8,8,0,0,0,.64-.75,4.1,4.1,0,0,0,.49-.84,2.51,2.51,0,0,0,.2-1A4.13,4.13,0,0,0,14.59,7,3,3,0,0,0,13.94,5.93Z"/>
			<rect style="fill:currentColor;stroke:none;" x="9.81" y="15.65" width="2.32" height="2.14"/>
		</svg>
	`,
    'right': `
		<svg viewBox="0 0 15 15">
			<polygon style="fill:currentColor; stroke:none;" points="4.4,11.5 4,10.8 9.4,7.5 4,4.2 4.4,3.5 11,7.5"/>
		</svg>
	`,
    'search': `
		<svg viewBox="0 0 15 15">
			<path style="fill:currentColor; stroke:none;" d="M6,1.9C8.2,1.9,10,3.7,10,6C10,7,9.6,8.1,8.8,8.8C7.3,10.5,4.7,10.6,3.1,9S1.4,4.9,2.9,3.3C3,3.2,3,3.2,3.1,3.1C3.9,2.3,4.9,1.9,6,1.9 M6,1C3.2,1,1,3.2,1,6c0,2.7,2.2,5,5,5s5-2.2,5-5c0-1.3-0.5-2.6-1.5-3.5C8.6,1.5,7.3,1,6,1z"/>
			<line style="fill:none;stroke:currentColor;stroke-linecap:round;" x1="9.2" y1="9.2" x2="13" y2="13"/>
		</svg>
	`,
    'success': `
		<svg viewBox="0 0 23 23">
			<path style="fill:currentColor;stroke:none;" d="M11.5,0A11.5,11.5,0,1,0,23,11.5,11.5,11.5,0,0,0,11.5,0Zm0,22.08A10.58,10.58,0,1,1,22.08,11.5,10.59,10.59,0,0,1,11.5,22.08Z"/>
			<path style="fill:currentColor;stroke:none;" d="M17.35,6.65l-7.12,8.54L7.11,11.45a.5.5,0,0,0-.77.64l3.88,4.66L18.11,7.3a.5.5,0,1,0-.77-.64Z"/>
		</svg>
	`,
    'tips': `
		<svg viewBox="0 0 15 15">
			<path style="fill:currentColor; stroke:none;" d="M7,1c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S3.7,1,7,1 M7,0C3.1,0,0,3.1,0,7s3.1,7,7,7s7-3.1,7-7S10.9,0,7,0z"/>
			<rect style="fill:currentColor; stroke:none;" x="6" y="3" width="2" height="2"/>
			<polygon style="fill:currentColor; stroke:none;" points="8,10 8,7 8,6 6,6 5,6 5,7 6,7 6,10 5,10 5,11 6,11 8,11 9,11 9,10"/>
		</svg>
	`,
    'trangle-down': `
		<svg viewBox="0 0 15 15">
			<polygon style="fill:currentColor;stroke:none;" points="7.5,12 12,3 3,3"/>
		</svg>
	`,
    'trangle-right': `
		<svg viewBox="0 0 15 15">
			<polygon style="fill:currentColor;stroke:none;" points="12,7.5 3,3 3,12"/>
		</svg>
	`,
    'warning': `
		<svg viewBox="0 0 22.91 20.04">
			<path style="fill:currentColor;stroke:none;" d="M22.77,18.47,12.36.52a1,1,0,0,0-1.81,0L.14,18.47A1,1,0,0,0,1,20H21.86A1,1,0,0,0,22.77,18.47Zm-.91.57H1L1,19,11.41,1a0,0,0,0,1,0,0l0,0L21.9,19Z"/>
			<path style="fill:currentColor;stroke:none;" d="M10.45,7.42v5a1,1,0,0,0,2,0v-5a1,1,0,0,0-2,0Z"/>
			<rect style="fill:currentColor;stroke:none;" x="10.45" y="14.42" width="2" height="2"/>
		</svg>
	`,
};

},{}],57:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./style/global-style");
__export(require("./style/theme"));
__export(require("./style/color"));
__export(require("./store/store"));
__export(require("./store/async-store"));
__export(require("./components/buttongroup"));
__export(require("./components/icon"));
__export(require("./components/radio"));
__export(require("./components/checkbox"));
__export(require("./components/switch"));
__export(require("./components/slider"));
__export(require("./components/form"));
__export(require("./components/input"));
__export(require("./components/tag"));
__export(require("./components/search"));
__export(require("./components/progress"));
__export(require("./components/loader"));
__export(require("./components/popup"));
__export(require("./components/popover"));
__export(require("./components/dropdown"));
__export(require("./components/select"));
//export * from './components/menu'
__export(require("./components/modal"));
__export(require("./components/message"));
__export(require("./components/notification"));
//export * from './components/tree'
__export(require("./components/grid"));
__export(require("./components/resizer"));
__export(require("./components/router"));
__export(require("./components/grid-layout"));
__export(require("./bindings/tooltip"));
__export(require("./bindings/contextmenu"));
__export(require("./bindings/drag-drop"));
__export(require("./bindings/popup"));
require("./bindings/drag-drop");

},{"./bindings/contextmenu":29,"./bindings/drag-drop":30,"./bindings/popup":31,"./bindings/tooltip":32,"./components/buttongroup":33,"./components/checkbox":34,"./components/dropdown":35,"./components/form":36,"./components/grid":38,"./components/grid-layout":37,"./components/icon":39,"./components/input":40,"./components/loader":41,"./components/message":42,"./components/modal":43,"./components/notification":44,"./components/popover":45,"./components/popup":46,"./components/progress":47,"./components/radio":48,"./components/resizer":49,"./components/router":50,"./components/search":51,"./components/select":52,"./components/slider":53,"./components/switch":54,"./components/tag":55,"./store/async-store":58,"./store/store":59,"./style/color":60,"./style/global-style":61,"./style/theme":62}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ff_1 = require("@pucelle/ff");
/**
 * Compare to `Store`, `AsyncStore` loads data for one page each time.
 * And every time after data changed, it refreshs to reload all datas.
 * It's an extension for `liveRepeat` directive, to cache data,
 * you should extends this class and overwrite abstract methods, and may support like column ordering and searching.
 */
class AsyncStore extends ff_1.Emitter {
    constructor() {
        super(...arguments);
        this.key = '';
        this.orderKey = '';
        this.orderDirection = '';
    }
    setRepeatDirective(dir) {
        this.repeatDir = dir;
    }
    reset(startIndex = 0) {
        if (this.repeatDir) {
            this.repeatDir.reset(startIndex);
        }
        this.emit('change');
    }
    reload() {
        if (this.repeatDir) {
            this.repeatDir.reload();
        }
        this.emit('change');
    }
    setOrder(key, direction) {
        this.orderKey = key;
        this.orderDirection = direction;
        this.reload();
    }
    clearOrder() {
        this.orderKey = '';
        this.orderDirection = '';
        this.reload();
    }
    getFirstVisibleIndex() {
        return this.repeatDir.getFirstVisibleIndex();
    }
}
exports.AsyncStore = AsyncStore;

},{"@pucelle/ff":27}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ff_1 = require("@pucelle/ff");
/** Used to replace same key items in `Store`. */
class KeyMap {
    constructor(key) {
        if (!key) {
            throw new Error('"key" must be provided when instantiate "KeyMap"!');
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
/* Used to cache object type data and support selection, ordering and filtering. */
class Store extends ff_1.Emitter {
    constructor(options = {}) {
        super();
        /** The whole data. */
        this.data = [];
        /** Current data after been sorted and filtered. */
        this.currentData = [];
        /** If `key` specified, when different but same key items added, it covers the old one. */
        this.key = null;
        /** Used to search data items. */
        this.filter = null;
        /** used to sort items, see `ff.orderBy` */
        this.order = null;
        /** Used to select range items by `shift + click`. */
        this.lastTouchedItem = null;
        this.selected = [];
        this.map = null;
        this.selectedMap = null;
        if (options.key) {
            this.map = new KeyMap(options.key);
            this.selectedMap = new KeyMap(options.key);
        }
        let data = options.data;
        delete options.data;
        Object.assign(this, options);
        this.initData(data);
    }
    initData(data) {
        if (data) {
            this.addItems(data);
        }
    }
    addItems(items, atStart = false) {
        if (items.length > 0) {
            if (this.map) {
                for (let item of items) {
                    this.map.add(item);
                }
            }
            if (atStart) {
                this.data.unshift(...items);
            }
            else {
                this.data.push(...items);
            }
            let filteredItems = this.filter ? items.filter(this.filter) : items;
            this.addItemsToCurrentData(filteredItems, atStart);
        }
    }
    addItemsToCurrentData(items, atStart = false) {
        if (this.order) {
            if (items.length > 1) {
                let newData = this.currentData.length > 0 ? [...this.currentData, ...items] : items;
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
            if (atStart) {
                this.currentData.unshift(...items);
            }
            else {
                this.currentData.push(...items);
            }
        }
    }
    setOrder(order) {
        this.order = order;
        this.updateCurrentData();
        this.emit('change');
    }
    clearOrder() {
        this.setOrder(null);
    }
    setFilter(filter) {
        this.filter = filter;
        this.updateCurrentData();
        this.deselectAll();
        this.emit('change');
    }
    clearFilter() {
        this.setFilter(null);
    }
    updateCurrentData() {
        this.clearCurrentData();
        this.addItemsToCurrentData(this.filter ? this.data.filter(this.filter) : this.data);
    }
    clearCurrentData() {
        this.currentData = [];
    }
    add(...items) {
        this.remove(...items);
        this.addItems(items);
        this.emit('change');
    }
    addToStart(...items) {
        this.remove(...items);
        this.addItems(items, true);
        this.emit('change');
    }
    push(...items) {
        this.addItems(items);
        this.emit('change');
    }
    unshift(...items) {
        this.addItems(items, true);
        this.emit('change');
    }
    insert(index, ...items) {
        if (items.length > 0) {
            this.data.splice(index, 0, ...items);
            if (this.map) {
                for (let item of items) {
                    this.map.add(item);
                }
            }
            if (this.order) {
                this.addItemsToCurrentData(this.filter ? items.filter(this.filter) : items);
            }
            else {
                this.updateCurrentData();
            }
        }
        this.emit('change');
    }
    has(item) {
        if (this.map) {
            return this.map.has(item);
        }
        else {
            return this.data.includes(item);
        }
    }
    get(item) {
        if (this.map) {
            return this.map.get(item);
        }
        else {
            return item;
        }
    }
    remove(...items) {
        let toRemoveSet = new Set();
        if (this.map) {
            for (let item of items) {
                if (this.map.has(item)) {
                    toRemoveSet.add(this.map.get(item));
                    this.map.delete(item);
                }
            }
        }
        else {
            for (let item of items) {
                if (this.data.includes(item)) {
                    toRemoveSet.add(item);
                }
            }
        }
        if (toRemoveSet.size > 0) {
            this.data = this.data.filter(item => !toRemoveSet.has(item));
            if (this.map) {
                this.currentData = this.currentData.filter(item => this.map.has(item));
            }
            else {
                this.currentData = this.currentData.filter(item => !toRemoveSet.has(item));
            }
            this.deselect(...toRemoveSet);
            this.emit('change');
        }
        return [...toRemoveSet];
    }
    isSelected(item) {
        if (this.selectedMap) {
            return this.selectedMap.has(item);
        }
        else {
            return this.selected.includes(item);
        }
    }
    isPartlySelected() {
        let selectedCount = this.selected.length;
        return selectedCount > 0 && selectedCount < this.currentData.length;
    }
    isSelectedAll() {
        let selectedCount = this.selected.length;
        return selectedCount > 0 && selectedCount === this.currentData.length;
    }
    getSelectedCount() {
        return this.selected.length;
    }
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
    deselect(...items) {
        if (items === this.selected) {
            this.deselectAll();
        }
        else {
            let toRemoveSet = new Set();
            if (this.selectedMap) {
                for (let item of items) {
                    if (this.selectedMap.has(item)) {
                        toRemoveSet.add(this.selectedMap.get(item));
                        this.selectedMap.delete(item);
                    }
                }
            }
            else {
                for (let item of items) {
                    if (this.selected.includes(item)) {
                        toRemoveSet.add(item);
                    }
                }
            }
            if (toRemoveSet.size > 0) {
                this.selected = this.selected.filter(item => !toRemoveSet.has(item));
            }
        }
        this.lastTouchedItem = items[0];
    }
    toggleSelect(item) {
        if (this.isSelected(item)) {
            this.deselect(item);
        }
        else {
            this.select(item);
        }
        this.lastTouchedItem = item;
    }
    selectByKeyboardEvent(item, event) {
        if (event.shiftKey) {
            this.shiftSelect(item);
        }
        else {
            this.toggleSelect(item);
        }
    }
    shiftSelect(item) {
        let startIndex = Math.max(this.lastTouchedItem ? this.getIndex(this.lastTouchedItem) : 0, 0);
        let endIndex = this.getIndex(item);
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
    getIndex(item) {
        if (this.map && !this.map.has(item)) {
            return -1;
        }
        return this.data.indexOf(this.get(item));
    }
    selectAll() {
        this.select(...this.currentData);
    }
    deselectAll() {
        this.selected = [];
        if (this.selectedMap) {
            this.selectedMap.clear();
        }
    }
    toggleSelectAll() {
        if (this.isSelectedAll()) {
            this.deselectAll();
        }
        else {
            this.selectAll();
        }
    }
    clear() {
        this.data = [];
        this.clearCurrentData();
        this.deselectAll();
        if (this.map) {
            this.map.clear();
        }
        this.emit('change');
    }
}
exports.Store = Store;

},{"@pucelle/ff":27}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ff_1 = require("@pucelle/ff");
/** Class to process colors. */
class Color {
    constructor(value) {
        this.value = value.trim();
    }
    toString() {
        return this.value;
    }
    /** Get [r, g, b, a], all betweens 0 ~ 1 from current color. */
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
    formatRGBA(r, g, b, a) {
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
        return this.formatRGBA(r, g, b, a);
    }
    /** Darken if is a light color, otherwise lighten. */
    highlight(percentage) {
        if (this.getLightness() < 0.5) {
            return this.lighten(percentage);
        }
        else {
            return this.darken(percentage);
        }
    }
    /** Lighten if is a light color, otherwise darken. */
    dim(percentage) {
        if (this.getLightness() > 0.5) {
            return this.lighten(percentage);
        }
        else {
            return this.darken(percentage);
        }
    }
    /** Returns lightless value of current color, betweens 0 ~ 1. */
    getLightness() {
        let [r, g, b] = this.getRGBA();
        return ff_1.avg([r, g, b]);
    }
    /** Change alpha channel of current color to value betweens 0-1. */
    alpha(a) {
        let [r, g, b] = this.getRGBA();
        return this.formatRGBA(r, g, b, a);
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
        return this.formatRGBA(r, g, b, a);
    }
}
exports.Color = Color;

},{"@pucelle/ff":27}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const theme_1 = require("./theme");
flit_1.addGlobalStyle(() => {
    let { mainColor, textColor, borderColor, errorColor, fontSize, lineHeight, borderRadius, focusBlurRadius, adjustByLineHeight: lh, adjustByFontSize: fs, backgroundColor } = theme_1.theme;
    return flit_1.css `
	html{
		color: ${textColor};
		font-size: ${fontSize}px;
		line-height: ${lineHeight}px;
		background-color: ${backgroundColor};
	}

	h1{
		font-size: ${fs(68)}px;
		line-height: 1.2;
		font-weight: 700;
	}

	h2{
		font-size: ${fs(36)}px;
		line-height: 1.2;
		font-weight: 300;
	}

	h3{
		font-size: ${fs(26)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h4{
		font-size: ${fs(22)}px;
		line-height: 1.2;
		font-weight: 400;
	}

	h5{
		font-size: ${fs(18)}px;
		line-height: 1.2;
	}

	h6{
		font-size: ${fs(14)}px;
		line-height: 1.2;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lineHeight}px;
		line-height: ${lineHeight - 2}px;
		border: 1px solid ${borderColor};
		color: ${textColor};
		border-radius: ${borderRadius}px;
		padding: 0 ${lh(16) + Math.max(0, (borderRadius - 5) / 2)}px;
		background: ${backgroundColor};
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover, &:focus{
			border-color: #666;
			background-color: #666;
			color: #fff;
		}

		&:active{
			border-color: #000;
			background-color: #000;
			color: #fff;
		}

		&:focus{
			box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
		}

		f-icon, f-icon-loading{
			&:first-child{
				margin-right: ${lh(8)}px;
			}

			&:last-child{
				margin-left: ${lh(8)}px;
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
			line-height: ${lineHeight}px;

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
		font-size: ${fs(13)}px;

		&[required]{
			&::after{
				position: relative;
				content: '*';
				color: ${errorColor};
				margin-left: 2px;
				top: ${lh(-5)}px;
			}
		}

		f-icon{
			margin-left: 4px;
			color: ${textColor.highlight(20)};
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
		background: ${backgroundColor.highlight(5)};
	}

	::-webkit-scrollbar-thumb{
		background: ${backgroundColor.highlight(15)};

		&:hover{
			background: ${backgroundColor.highlight(25)};
		}

		&:active{
			background: ${backgroundColor.highlight(35)};
		}
	}
`;
});

},{"./theme":62,"@pucelle/flit":89}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flit_1 = require("@pucelle/flit");
const ff_1 = require("@pucelle/ff");
const color_1 = require("./color");
class Theme {
    constructor() {
        this.themeMap = new Map();
        this.willUpdate = false;
        this.mode = 'light';
        this.options = Object.assign({}, defaultLightThemeOptions, defaultMediumThemeOptions);
    }
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
    /** Assigns theme options to current options, so it may keep options of last theme. */
    changeTheme(...names) {
        for (let name of names) {
            if (!this.themeMap.has(name)) {
                throw new Error(`"${name}" is not a defined theme`);
            }
            Object.assign(this.options, this.themeMap.get(name));
        }
        this.mode = this.getThemeDrakOrLightMode(this.options);
        this.update();
    }
    set(key, value) {
        this.options[key] = value;
        this.update();
    }
    async update() {
        if (!this.willUpdate) {
            this.willUpdate = true;
            await Promise.resolve();
            flit_1.updateComponents();
            flit_1.updateStyles();
            this.willUpdate = false;
        }
    }
    getOption(property) {
        return this.options[property];
    }
    /**
     * Pass the px value for `font-size` on default theme settings, returns the size in current theme settings.
     * Returns value will be at least 11.
     */
    get adjustByFontSize() {
        return (size) => {
            return Math.max(Math.round(size * this.fontSize / defaultMediumThemeOptions.fontSize), 11);
        };
    }
    /** Pass the px value for `line-height` on default theme settings, returns the line height in current theme settings. */
    get adjustByLineHeight() {
        return (size) => {
            return Math.round(size * this.lineHeight / defaultMediumThemeOptions.lineHeight);
        };
    }
    get mainColor() {
        return new color_1.Color(this.getOption('mainColor'));
    }
    get backgroundColor() {
        return new color_1.Color(this.getOption('backgroundColor'));
    }
    get textColor() {
        return new color_1.Color(this.getOption('textColor'));
    }
    get successColor() {
        return new color_1.Color(this.getOption('successColor'));
    }
    get errorColor() {
        return new color_1.Color(this.getOption('errorColor'));
    }
    get warningColor() {
        return new color_1.Color(this.getOption('warningColor'));
    }
    get infoColor() {
        return new color_1.Color(this.getOption('infoColor'));
    }
    get borderColor() {
        return new color_1.Color(this.getOption('borderColor'));
    }
    get borderRadius() {
        return this.getOption('borderRadius');
    }
    get layerBackgroundColor() {
        return new color_1.Color(this.getOption('layerBackgroundColor'));
    }
    get layerBorderRadius() {
        return this.getOption('layerBorderRadius');
    }
    get layerShadowBlurRadius() {
        return this.getOption('layerShadowBlurRadius');
    }
    get layerShadowColor() {
        return new color_1.Color(this.getOption('layerShadowColor'));
    }
    get focusBlurRadius() {
        return this.getOption('focusBlurRadius');
    }
    get fontSize() {
        return this.getOption('fontSize');
    }
    get lineHeight() {
        return this.getOption('lineHeight');
    }
}
exports.Theme = Theme;
const defaultLightThemeOptions = {
    mainColor: '#3a6cf6',
    backgroundColor: '#fff',
    textColor: '#000',
    successColor: '#29bc04',
    errorColor: '#e10000',
    warningColor: '#f3b907',
    infoColor: '#3988e5',
    borderColor: '#9b9b9b',
    layerBackgroundColor: '#fff',
    layerShadowColor: 'rgba(0, 0, 0, 0.4)',
};
const defaultMediumThemeOptions = {
    borderRadius: 4,
    layerBorderRadius: 4,
    layerShadowBlurRadius: 6,
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
    layerBackgroundColor: new color_1.Color('#333').lighten(5).toString(),
    layerShadowColor: 'rgba(0, 0, 0, 0.6)',
});
exports.theme.defineTheme('small', {
    fontSize: 13,
    lineHeight: 24,
});
exports.theme.defineTheme('medium', defaultMediumThemeOptions);
exports.theme.defineTheme('large', {
    fontSize: 18,
    lineHeight: 36,
});
exports.theme.defineTheme('touch', {
    fontSize: 18,
    lineHeight: 46,
});

},{"./color":60,"@pucelle/ff":27,"@pucelle/flit":89}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const component_1 = require("../component");
/**
 * `:class="'class1 class2'"`
 * `:class="[class1, class2]"`
 * `:class="{class1: value1, class2: value2}"`
 * `:class.class-name="value"`
 */
define_1.defineBinding('class', class ClassNameBinding {
    constructor(el, context, modifiers) {
        this.lastClassNames = null;
        if (modifiers) {
            if (modifiers.length > 1) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most one modifier as class name can be specified for ":class"`);
            }
            if (!/^\$?[\w-]+$/.test(modifiers[0])) {
                throw new Error(`Modifier "${modifiers[0]}" is not a valid class name`);
            }
        }
        this.el = el;
        this.modifiers = modifiers;
        this.scopeName = context ? context.el.localName : '';
        this.scopedClassNameSet = this.scopeName ? component_1.getScopedClassNameSet(this.scopeName) : undefined;
    }
    update(value) {
        if (this.lastClassNames) {
            this.el.classList.remove(...this.lastClassNames);
        }
        if (value) {
            let classNames = this.lastClassNames = this.parseClass(value);
            this.el.classList.add(...classNames);
        }
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
                if (this.scopedClassNameSet && this.scopedClassNameSet.has(name)) {
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
});

},{"../component":77,"./define":64}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definedMap = new Map();
function defineBinding(name, Binding) {
    if (definedMap.has(name)) {
        console.warn(`You are trying to overwrite binding definition "${name}"`);
    }
    if (Binding) {
        definedMap.set(name, Binding);
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
function getBindingConstructor(name) {
    return definedMap.get(name);
}
/**
 * Returned from calling defined bindings like `show(...)`, `hide(...)`.
 * Used to cache arguments and update template later.
 * @typeparam A Arguments type.
 */
class BindingResult {
    constructor(name, ...args) {
        this.ref = null;
        this.name = name;
        this.args = args;
    }
}
exports.BindingResult = BindingResult;
/** Create binding and add ref on element. */
/** @hidden */
function createBindingFromResult(el, context, result, modifiers) {
    let BindingConstructor = getBindingConstructor(result.name);
    if (!BindingConstructor) {
        throw new Error(`":${result.name}" on "<${el.localName}>" is not a registered binding class`);
    }
    let binding = new BindingConstructor(el, context, modifiers);
    if (result.ref) {
        result.ref(binding);
    }
    binding.update(...result.args);
    return binding;
}
exports.createBindingFromResult = createBindingFromResult;
/** Reference to binding instance after it created and before update. */
function refBinding(result, ref) {
    result.ref = ref;
    return result;
}
exports.refBinding = refBinding;

},{}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
/**
 * `:enabled="boolean"`, it's opposite to `:disabled=...`.
 * It can be replaced with `?disabled=!...`, but by the meaning it gives, we should use a direct word `enabled`.
 */
define_1.defineBinding('enable', class EnableBinding {
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
});
/**
 * `:disabled="boolean"`, it's same with `?disabled=...`.
 */
define_1.defineBinding('disable', class DisabledBinding {
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
});

},{"./define":64}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
/**
 * `:html="${HTMLCodes}"`
 */
define_1.defineBinding('html', class HTMLBinding {
    constructor(el) {
        this.el = el;
    }
    update(value) {
        this.el.innerHTML = value === null || value === undefined ? '' : String(value);
    }
    remove() {
        this.el.innerHTML = '';
    }
});

},{"./define":64}],67:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = require("./define");
exports.defineBinding = define_1.defineBinding;
exports.BindingResult = define_1.BindingResult;
exports.createBindingFromResult = define_1.createBindingFromResult;
exports.refBinding = define_1.refBinding;
require("./class");
require("./style");
require("./model");
require("./ref");
require("./html");
require("./enable-disable");
require("./src");
require("./show-hide");
__export(require("./show-hide"));

},{"./class":63,"./define":64,"./enable-disable":65,"./html":66,"./model":68,"./ref":69,"./show-hide":70,"./src":71,"./style":72}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const component_1 = require("../component");
const dom_event_1 = require("../libs/dom-event");
const ALLOWED_MODIFIERS = ['lazy', 'number'];
/**
 * Handle `:model="name"`, it binds and auto update a specified property name in current context
 * with the `<input>` or `<com>` which has `value` or `checked` property, and `change` event.
 * Supports `:model="a.b"`.
 * Model bind should only handle fixed model name.
 */
define_1.defineBinding('model', class ModelBinding {
    constructor(el, context, modifiers) {
        this.isBooleanValue = false;
        this.isMultiSelect = false;
        this.unwatch = null;
        if (!context) {
            throw new Error(`A context must be provided when using ":model=property"`);
        }
        if (modifiers) {
            if (modifiers.length > 2) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most two modifiers can be specified for ":model"`);
            }
            for (let modifier of modifiers) {
                if (!ALLOWED_MODIFIERS.includes(modifier)) {
                    throw new Error(`Modifier "${modifiers}" is not allowed, it must be one of ${ALLOWED_MODIFIERS.map(m => `"${m}"`).join(', ')}`);
                }
            }
        }
        this.el = el;
        this.modifiers = modifiers;
        this.context = context;
        this.isComModel = el.localName.includes('-');
        if (this.isComModel) {
            this.property = 'value'; // or checked
            this.eventName = 'change';
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
    // Normally this should only be called for once.
    update(modelName) {
        if (!modelName || typeof modelName !== 'string') {
            throw new Error(`"${modelName}" is not a valid model name`);
        }
        this.modelName = modelName;
        if (this.isComModel) {
            let com = component_1.getComponent(this.el);
            if (com) {
                this.bindCom(com);
            }
            else {
                component_1.onComponentCreatedAt(this.el, this.bindCom.bind(this));
            }
        }
        else {
            this.watchContextModelValue();
            dom_event_1.on(this.el, this.eventName, this.onEventInputOrChange.bind(this));
        }
    }
    bindCom(com) {
        // Avoid bind event twice when model changed.
        if (!this.com) {
            this.com = com;
            // Some component use `checked` property as model value.
            if (com.hasOwnProperty('checked') && typeof com.checked === 'boolean') {
                this.property = 'checked';
            }
            com.on(this.eventName, this.setModelValueToContext, this);
        }
        this.watchContextModelValue();
    }
    watchContextModelValue() {
        if (this.unwatch) {
            this.unwatch();
        }
        // There is a problem here:
        // When the `:model` was included in a `if` part, it can't be unwatch after relatated element removed.
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
    setModelValueToContext(value) {
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
        this.setModelValueToContext(value);
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
            throw new Error(`:model="${this.modelName}" of select[multiple] requires an array as value`);
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
});

},{"../component":77,"../libs/dom-event":90,"./define":64}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
/**
 * `:ref="name"`
 * `:ref="${this.onRef}"`
 */
define_1.defineBinding('ref', class RefBinding {
    constructor(el, context) {
        if (!context) {
            throw new Error(`A context must be provided when using ":ref"`);
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
});

},{"./define":64}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const directives_1 = require("../directives");
/**
 * `:show="boolean"`
 * `show(visible: boolean, transition: TransitionOptions)`
 * `show(visible: boolean, options: {transition: TransitionOptions, enterAtStart, leaveAtStart, onend})`
 */
class ShowBinding {
    constructor(el, context) {
        this.value = undefined;
        this.el = el;
        this.transition = new directives_1.DirectiveTransition(context);
    }
    update(value, options) {
        value = !!value;
        this.transition.setOptions(options);
        if (value !== this.value) {
            let atStart = this.value === undefined;
            if (value) {
                this.el.hidden = false;
                if (this.transition.shouldPlayEnter(atStart)) {
                    this.transition.mayPlayEnter(this.el);
                }
            }
            else {
                if (this.transition.shouldPlayLeave(atStart)) {
                    this.transition.mayPlayLeave(this.el).then(finish => {
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
exports.show = define_1.defineBinding('show', ShowBinding);
/**
 * `:hide="boolean"`
 * `hide(hidden: boolean, transition: TransitionOptions)`
 * `hide(hidden: boolean, options: {transition: TransitionOptions, enterAtStart, leaveAtStart, onend})`
 */
class HideBinding extends ShowBinding {
    update(value, options) {
        super.update(!value, options);
    }
}
exports.hide = define_1.defineBinding('hide', HideBinding);

},{"../directives":84,"./define":64}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const SrcLoadedURLs = new Set();
/**
 * `:src="${URL}"`
 * When reusing an image and reset it's src, it will keep old image until the new one loaded,
 * Which always confuse us.
 */
define_1.defineBinding('src', class SrcBinding {
    constructor(el) {
        this.el = el;
    }
    update(value) {
        if (SrcLoadedURLs.has(value)) {
            this.el.src = value;
        }
        else {
            this.el.src = '';
            let img = new Image();
            img.onload = () => {
                SrcLoadedURLs.add(value);
                this.el.src = value;
            };
            img.src = value;
        }
    }
    remove() {
        this.el.src = '';
    }
});

},{"./define":64}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const ALLOWED_MODIFIERS = ['px', 'percent', 'url'];
define_1.defineBinding('style', class StyleBinding {
    constructor(el, _context, modifiers) {
        this.lastStyle = null;
        if (modifiers) {
            if (modifiers.length > 2) {
                throw new Error(`Modifier "${modifiers.join('.')}" is not allowed, at most two modifiers (as style name property value modifier) can be specified for ":style"`);
            }
            if (modifiers.length === 2 && !ALLOWED_MODIFIERS.includes(modifiers[1])) {
                throw new Error(`Modifier "${modifiers[1]}" is not allowed, it must be one of ${ALLOWED_MODIFIERS.join(', ')}`);
            }
            if (!/^[\w-]+$/.test(modifiers[0]) || ALLOWED_MODIFIERS.includes(modifiers[0])) {
                throw new Error(`Modifier "${modifiers[0]}" is not a valid style property`);
            }
        }
        this.el = el;
        this.modifiers = modifiers;
    }
    update(value) {
        if (this.lastStyle) {
            this.removeStyle(this.lastStyle);
        }
        if (value !== '' && value !== null && value !== undefined) {
            this.addStyle(this.lastStyle = this.parseStyle(value));
        }
    }
    removeStyle(style) {
        for (let name of Object.keys(style)) {
            this.el.style[name] = '';
        }
    }
    addStyle(style) {
        let unit = this.modifiers ? this.modifiers[1] : '';
        for (let name of Object.keys(style)) {
            let value = style[name];
            if (value === null || value === undefined) {
                value = '';
            }
            // Units like `s`, `deg` is very rare to use.
            else if (unit === 'px') {
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
    }
    parseStyle(style) {
        let o = {};
        if (this.modifiers) {
            if (style !== '' && style !== null && style !== undefined) {
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
            this.removeStyle(this.lastStyle);
        }
    }
});

},{"./define":64}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emitter_1 = require("../libs/emitter");
const template_1 = require("../template");
const queue_1 = require("../queue");
const observer_1 = require("../observer");
const watcher_1 = require("../watcher");
const style_1 = require("./style");
const node_helper_1 = require("../libs/node-helper");
const from_element_1 = require("./from-element");
const life_cycle_1 = require("./life-cycle");
const slot_1 = require("./slot");
/**
 * Super class of all the components, create automacially from custom elements connected into document.
 * @typeparam E Event interface in `{eventName: (...args) => void}` format.
 */
class Component extends emitter_1.Emitter {
    constructor(el) {
        super();
        /**
         * The reference map object of element inside.
         * You can specify `:ref="refName"` on an element,
         * or using `:ref=${this.onRef}` to call `this.onRef(refElement)` every time when the reference element updated.
         */
        // Should be `Element` type, but in 99% scenarios it's HTMLElement.
        this.refs = {};
        this.__slotProcesser = null;
        this.__rootPart = null;
        this.__updated = false;
        this.__watcherGroup = null;
        this.__connected = true;
        this.el = el;
        return observer_1.observeComTarget(this);
    }
    /** Not called in constructor because in child classes it doesn't apply instance properties yet. */
    /** @hidden */
    __emitCreated() {
        from_element_1.setComponentAtElement(this.el, this);
        life_cycle_1.emitComponentCreatedCallbacks(this.el, this);
        this.onCreated();
        // A typescript issue here if we want to infer emitter arguments:
        // We accept an `Events` and union it with type `ComponentEvents`,
        // the returned type for `rendered` property will become `Events['rendered'] & () => void`,
        // `Parmaters<...>` of it will return the arguments of `Events['rendered']`.
        // So here show the issue that passed arguments `[]` can't be assigned to it.
        // This can't be fixed right now since we can't implement a type function like `interface overwritting`
        // But finally this was resolved by a newly defined type `ExtendEvents` in `emitter.ts`.
        // this.emit('created')
    }
    /** @hidden */
    __emitConnected() {
        // Not do following things when firstly connected.
        if (!this.__connected) {
            // Must restore before updating, because the restored result may be changed when updating.
            observer_1.restoreAsDependency(observer_1.targetMap.get(this));
            if (this.__watcherGroup) {
                this.__watcherGroup.connect();
            }
            this.__connected = true;
        }
        // Why using `update` but not `__updateImmediately`?
        // After component created, it may delete element belongs to other components in `onCreated`
        // Then in following micro task, the deleted components's `__connected` becomes false,
        // and they will not been updated finally as expected.
        this.update();
        this.onConnected();
        this.emit('connected');
        life_cycle_1.onComponentConnected(this);
    }
    /** @hidden */
    __emitDisconnected() {
        observer_1.clearDependencies(this);
        // We generated `updatable proxy -> dependency target` maps in dependency module,
        // So here need to pass component target but not proxy to clear dependencies.
        observer_1.clearAsDependency(observer_1.targetMap.get(this));
        if (this.__watcherGroup) {
            this.__watcherGroup.disconnect();
        }
        this.__connected = false;
        this.onDisconnected();
        this.emit('disconnected');
        life_cycle_1.onComponentDisconnected(this);
    }
    /** May be called in rendering, so we can avoid checking slot elements when no slot rendered. */
    /** @hidden */
    __foundSlotsWhenRendering() {
        // One potential issue here:
        // created -> child component created.
        //         -> element of child component removed, which also used as slot element of current component.
        //         -> render and initialize slots for current component.
        //         -> Can't found slot element because it was removed.
        if (!this.__slotProcesser && this.el.childNodes.length > 0) {
            this.__slotProcesser = new slot_1.SlotProcesser(this);
        }
        if (this.__slotProcesser) {
            this.__slotProcesser.needToFillSlotsLater();
        }
    }
    /** @hidden */
    __updateImmediately() {
        if (!this.__connected) {
            return;
        }
        observer_1.startUpdating(this);
        let result = this.render();
        observer_1.endUpdating(this);
        if (this.__rootPart) {
            this.__rootPart.update(result);
        }
        else if (result !== null) {
            this.__rootPart = new template_1.NodePart(new node_helper_1.NodeAnchor(this.el, node_helper_1.NodeAnchorType.Root), result, this);
        }
        if (this.__slotProcesser) {
            this.__slotProcesser.mayFillSlots();
        }
        let isFirstlyUpdate = !this.__updated;
        if (isFirstlyUpdate) {
            this.onReady();
            this.__updated = true;
        }
        this.onUpdated();
    }
    /** Force to update all watchers binded to current context. */
    /** @hidden */
    __updateWatcherGroup() {
        if (this.__watcherGroup) {
            this.__watcherGroup.update();
        }
    }
    /**
     * Child class should implement this method, normally returns html`...` or string.
     * You can choose to not overwrite `render()` to keep it returns `null` when you don't want to render any child nodes.
     */
    render() {
        return null;
    }
    /**
     * Call this to partially or fully update asynchronously if needed.
     * You should not overwrite this method until you know what you are doing.
     */
    update() {
        queue_1.enqueueComponentUpdate(this);
    }
    /**
     * Called when component instance was just created and all properties assigned.
     * Original child nodes are prepared, but slots are not prepared right now.
     * You may changed some data or visit parent nodes or `this.el` and operate them here.
     */
    onCreated() { }
    /**
     * Called after all the data updated for the first time.
     * Child nodes are rendered, slots are prepared, but child components are not.
     * Will keep updating other components, so please don't check computed styles on elements.
     * You may visit child nodes or bind events here.
     */
    onReady() { }
    /**
     * Called after all the data updated.
     * Will keep updating other components, so please don't check computed style on elements.
     */
    onUpdated() { }
    /**
     * Called after all the data updated and elements have rendered.
     * You can visit elemenet layout properties now.
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
     * If you registered global listeners like `resize`, don't forget to unregister them here.
     */
    onDisconnected() { }
    /**
     * Watch return value of function and trigger callback with this value as argument after it changed.
     * Will set callback scope as this.
     */
    watch(fn, callback) {
        this.__watcherGroup = this.__watcherGroup || new watcher_1.WatcherGroup();
        return this.__watcherGroup.watch(fn, callback.bind(this));
    }
    /**
     * Watch return value of function and trigger callback with this value as argument later and after it changed.
     * Will set callback scope as this.
     */
    watchImmediately(fn, callback) {
        this.__watcherGroup = this.__watcherGroup || new watcher_1.WatcherGroup();
        return this.__watcherGroup.watchImmediately(fn, callback.bind(this));
    }
    /**
     * Watch return value of function and trigger callback with this value as argument. Trigger callback for only once.
     * Will set callback scope as this.
     */
    watchOnce(fn, callback) {
        this.__watcherGroup = this.__watcherGroup || new watcher_1.WatcherGroup();
        return this.__watcherGroup.watchOnce(fn, callback.bind(this));
    }
    /**
     * Watch return value of function and trigger callback with this value as argument. Trigger callback for only once.
     * Will set callback scope as this.
     */
    watchUntil(fn, callback) {
        this.__watcherGroup = this.__watcherGroup || new watcher_1.WatcherGroup();
        return this.__watcherGroup.watchUntil(fn, callback.bind(this));
    }
    /** returns scoped class name E `.name -> .name__com-name` */
    scopeClassName(className) {
        let startsWithDot = className[0] === '.';
        let classNameWithoutDot = startsWithDot ? className.slice(1) : className;
        let scopedClassNameSet = style_1.getScopedClassNameSet(this.el.localName);
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
 * The static `style` property contains style text used as styles for current component.
 * Styles in it will be partialy scoped, so we have benefits of scoped styles,
 * and also avoid the problems in sharing styles.
 *
 * symbol `$` in class name will be replaced to current component name:
 * `.$title` -> `.title__com-name`
 *
 * tag selector will be nested in com-name selector:
 * `p` -> `com-name p`
 */
Component.style = null;

},{"../libs/emitter":91,"../libs/node-helper":93,"../observer":100,"../queue":108,"../template":113,"../watcher":123,"./from-element":76,"./life-cycle":78,"./slot":79,"./style":80}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** To cache `name -> component constructor` */
const componentConstructorMap = new Map();
/**
 * Define a component with specified name and class, called by `define()`.
 * @param name The component name, same with `define()`.
 * @param Com The component class.
 */
function defineComponentConstructor(name, Com) {
    if (componentConstructorMap.has(name)) {
        console.warn(`You are trying to overwrite component definition "${name}"`);
    }
    componentConstructorMap.set(name, Com);
}
exports.defineComponentConstructor = defineComponentConstructor;
/**
 * Get component constructor from name, then we can instantiate it.
 * @param name The component name, same with `define()`.
 * @param Com The component class.
 */
function getComponentConstructor(name) {
    return componentConstructorMap.get(name);
}
exports.getComponentConstructor = getComponentConstructor;

},{}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("./style");
const constructor_1 = require("./constructor");
const from_element_1 = require("./from-element");
function define(name, Com) {
    if (!name.includes('-')) {
        throw new Error(`"${name}" can't be defined as custom element, it must contain "-"`);
    }
    // Used at `@define` decorator.
    if (!Com) {
        return function (Com) {
            define(name, Com);
        };
    }
    customElements.define(name, class CustomLitElement extends HTMLElement {
        // When `connectedCallback` called on elements in start HTML Document, the child nodes of it is not ready yet.
        // So we must render all the codes in js.
        // Note that it will be called when insert element to a fragment.
        // If we insert bundled js behind all other elements, or with `defer`,
        // because elements were prepared already, then they will be instantiated in component registered order, not in element order.
        // We fix this by the `connectSoonMap`, it output elements in order when iterating.
        connectedCallback() {
            enqueueConnect(this, Com);
        }
        // Moving element using like `append` will also trigger this.
        disconnectedCallback() {
            enqueueDisconnect(this, Com);
        }
    });
    constructor_1.defineComponentConstructor(name, Com);
    return undefined;
}
exports.define = define;
// Using queue to delay the connect and disconnect operations on components.
// Both `connectedCallback` and `disconnectedCallback` may triggered multiple times in DOM removing,
// so we must delay the component connect and disconnect operation by a queue.
let connectSoonMap = new Map();
let disconnectSoonMap = new Map();
function enqueueConnect(el, Com) {
    // When append, trigger disconnect and connect soon.
    if (disconnectSoonMap.has(el)) {
        disconnectSoonMap.delete(el);
    }
    else {
        connectSoonMap.set(el, Com);
        disconnectSoonMap.delete(el);
        if (!willUpdate) {
            enqueueUpdate();
        }
    }
}
function enqueueDisconnect(el, Com) {
    // When inserted into a fragment and then removed.
    if (connectSoonMap.has(el)) {
        connectSoonMap.delete(el);
    }
    else {
        disconnectSoonMap.set(el, Com);
        if (!willUpdate) {
            enqueueUpdate();
        }
    }
}
let willUpdate = false;
function enqueueUpdate() {
    Promise.resolve().then(update);
    willUpdate = true;
}
function update() {
    let connectMap = connectSoonMap;
    let disconnectMap = disconnectSoonMap;
    // Very import, more connect and disconnect map may be added when updating.
    // So we must reset `connectSoonMap` and `disconnectSoonMap` and set `willUpdate` to false before updating.
    connectSoonMap = new Map();
    disconnectSoonMap = new Map();
    willUpdate = false;
    for (let [el] of disconnectMap.entries()) {
        disconnectElement(el);
    }
    // `el` was sorted inside map.
    for (let [el, Com] of connectMap.entries()) {
        // `el` may not in document,
        // e.g., inserted into a fragment.
        // No need to worry about forgetting to instantiate it,
        // it will trigger `connectedCallback` again after insert into document.
        if (document.contains(el)) {
            connectElement(el, Com);
        }
    }
}
function connectElement(el, Com) {
    let com = from_element_1.getComponent(el);
    if (!com) {
        com = createComponent(el, Com);
    }
    com.__emitConnected();
}
/** Export for `renderComponent`, which will create component manually. */
/** @hidden */
function createComponent(el, Com) {
    style_1.ensureComponentStyle(Com, el.localName);
    let com = new Com(el);
    com.__emitCreated();
    return com;
}
exports.createComponent = createComponent;
function disconnectElement(el) {
    let com = from_element_1.getComponent(el);
    if (com) {
        com.__emitDisconnected();
    }
}

},{"./constructor":74,"./from-element":76,"./style":80}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const life_cycle_1 = require("./life-cycle");
/** To cache `el -> com` map */
const elementComponentMap = new WeakMap();
/**
 * Set component instance at root element.
 */
function setComponentAtElement(el, com) {
    elementComponentMap.set(el, com);
}
exports.setComponentAtElement = setComponentAtElement;
/**
 * Get component instance from root element.
 * @param el The element to get component instance at.
 */
function getComponent(el) {
    return elementComponentMap.get(el);
}
exports.getComponent = getComponent;
/**
 * Get component instance from root element asynchronously.
 * @param el The element to get component instance at.
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
        return Promise.resolve(undefined);
    }
}
exports.getComponentAsync = getComponentAsync;
/**
 * Get closest ancestor component which instanceof `Com`.
 * It's very common that you extend a component and define a new custom element,
 * So you will can't find the parent component from the tag name.
 * Bu you can also search super class by this method.
 * @param el The element to search from it and it's ancestors for component instance.
 * @param Com The component constructor to search.
 */
function getClosestComponent(el, Com) {
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
exports.getClosestComponent = getClosestComponent;

},{"./life-cycle":78}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constructor_1 = require("./constructor");
exports.getComponentConstructor = constructor_1.getComponentConstructor;
var component_1 = require("./component");
exports.Component = component_1.Component;
var from_element_1 = require("./from-element");
exports.getComponent = from_element_1.getComponent;
exports.getComponentAsync = from_element_1.getComponentAsync;
exports.getClosestComponent = from_element_1.getClosestComponent;
var life_cycle_1 = require("./life-cycle");
exports.onComponentCreatedAt = life_cycle_1.onComponentCreatedAt;
exports.updateComponents = life_cycle_1.updateComponents;
var style_1 = require("./style");
exports.getScopedClassNameSet = style_1.getScopedClassNameSet;
exports.addGlobalStyle = style_1.addGlobalStyle;
exports.updateStyles = style_1.updateStyles;
var define_1 = require("./define");
exports.define = define_1.define;
exports.createComponent = define_1.createComponent;

},{"./component":73,"./constructor":74,"./define":75,"./from-element":76,"./life-cycle":78,"./style":80}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const watcher_1 = require("../watcher");
/** To cache callbacks after component initialized */
const componentCreatedMap = new WeakMap();
/** Call callbacks after component instance created. */
function onComponentCreatedAt(el, callback) {
    let callbacks = componentCreatedMap.get(el);
    if (!callbacks) {
        componentCreatedMap.set(el, (callbacks = []));
    }
    callbacks.push(callback);
}
exports.onComponentCreatedAt = onComponentCreatedAt;
/** may assign properties from `:props`, or bind component events from `@com-event` */
function emitComponentCreatedCallbacks(el, com) {
    let callbacks = componentCreatedMap.get(el);
    if (callbacks) {
        for (let callback of callbacks) {
            callback(com);
        }
        componentCreatedMap.delete(el);
    }
}
exports.emitComponentCreatedCallbacks = emitComponentCreatedCallbacks;
/** To mark all the connected components */
const connectedComponentSet = new Set();
function onComponentConnected(com) {
    connectedComponentSet.add(com);
}
exports.onComponentConnected = onComponentConnected;
function onComponentDisconnected(com) {
    connectedComponentSet.delete(com);
}
exports.onComponentDisconnected = onComponentDisconnected;
/** Update all components, watchers. e.g., when language changed. */
function updateComponents() {
    watcher_1.globalWatcherGroup.update();
    for (let com of connectedComponentSet) {
        // Why didn't handle watcher group updating in `update`:
        // Component collect dependencies from `render` function and update it by `update`,
        // while each watchers in watcher group do the similar thing.
        com.update();
        com.__updateWatcherGroup();
    }
}
exports.updateComponents = updateComponents;

},{"../watcher":123}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_helper_1 = require("../libs/node-helper");
class SlotProcesser {
    constructor(com) {
        this.slots = {};
        this.restSlotNodeRange = null;
        // When updated inner templates and found there are slots need to be filled, This value will become `true`.
        // Why not just move slots into template fragment?
        //   1. It will trigger `connectedCallback` when append into fragment.
        //   2. To handle all `<slot>` elements in one query would be better.
        this.hasSlotsToBeFilled = false;
        this.com = com;
        this.initNamedSlotNodes();
        this.initRestSlotRange();
    }
    // Must cache slot nodes when com created and before child created,
    // Because child components may remove them when created, in this situation we will lost it forever.
    initNamedSlotNodes() {
        let slots = this.slots;
        // We only check `[slot]` in the children, or:
        // <com1><com2><el slot="for com2"></com2></com1>
        // it will cause `slot` for `com2` was captured by `com1`.
        for (let el of [...this.com.el.children]) {
            let slotName = el.getAttribute('slot');
            if (slotName) {
                let els = slots[slotName];
                if (!els) {
                    els = slots[slotName] = [];
                }
                els.push(el);
                // No need to move slot attribute here, bacause only check child slot elements, not check deeper.
                // So it can avoid been treated as slot element again after moved into an outer component
                el.remove();
            }
        }
    }
    // It's very import to cache rest nodes after child created and before rendering,
    // because these nodes may be changed since child nodes may be removed when child components created.
    // Otherwise those nodes may be firstly removed and then restored from `<slot />`, so we must cache before rendering.
    initRestSlotRange() {
        let fragment = document.createDocumentFragment();
        fragment.append(...this.com.el.childNodes);
        this.restSlotNodeRange = new node_helper_1.NodeRange(fragment);
    }
    needToFillSlotsLater() {
        this.hasSlotsToBeFilled = true;
    }
    mayFillSlots() {
        if (!this.hasSlotsToBeFilled) {
            return;
        }
        let slots = this.slots;
        let slotAnchors = this.com.el.querySelectorAll('slot');
        for (let slotAnchor of slotAnchors) {
            let name = slotAnchor.getAttribute('name');
            if (name) {
                if (slots && slots[name]) {
                    while (slotAnchor.firstChild) {
                        slotAnchor.firstChild.remove();
                    }
                    slotAnchor.append(...slots[name]);
                }
            }
            else if (this.restSlotNodeRange) {
                while (slotAnchor.firstChild) {
                    slotAnchor.firstChild.remove();
                }
                slotAnchor.append(this.restSlotNodeRange.getFragment());
            }
        }
        this.hasSlotsToBeFilled = false;
    }
}
exports.SlotProcesser = SlotProcesser;

},{"../libs/node-helper":93}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../queue");
// At beginning, we remove styles when they are no needed, but later we decided to always keep them,
// because we think that removing style tags will affect rendering performance.
// Here is a benchmark: https://jsperf.com/is-removing-style-affect-rendering-performance
/** Cache `Component` -> {style element, referenced count} */
const componentStyleTagMap = new Map();
const globalStyleTagSet = new Set();
/** Called when component was connected. */
function ensureComponentStyle(Com, name) {
    if (Com.style) {
        if (!componentStyleTagMap.has(Com)) {
            let styleTag = createStyle(Com.style, name);
            componentStyleTagMap.set(Com, styleTag);
        }
    }
}
exports.ensureComponentStyle = ensureComponentStyle;
/** Create <style> tag and insert it into body. */
function createStyle(style, name) {
    let styleTag = document.createElement('style');
    styleTag.setAttribute('name', name);
    styleTag.textContent = getStyleContent(style, name === 'global' ? '' : name);
    document.head.append(styleTag);
    return styleTag;
}
/** Get style text from static style property. */
function getStyleContent(style, scopeName) {
    if (typeof style === 'function') {
        style = style();
    }
    return StyleParser.parse(String(style), scopeName === 'global' ? '' : scopeName);
}
/** Add global style codes. */
function addGlobalStyle(style) {
    let styleTag = createStyle(style, 'global');
    globalStyleTagSet.add([style, styleTag]);
    return styleTag;
}
exports.addGlobalStyle = addGlobalStyle;
/** Update all styles for components, you can update styles after theme changed. */
// `updateStyles` should always been called along with `update`,
// So we may need to makesure `updateStyles` in the same micro task with `update`.
function updateStyles() {
    queue_1.onRenderComplete(() => {
        let styleAndTags = [...globalStyleTagSet];
        for (let [Com, styleTag] of componentStyleTagMap) {
            if (Com.style && styleTag) {
                styleAndTags.push([Com.style, styleTag]);
            }
        }
        for (let [style, styleTag] of styleAndTags) {
            if (typeof style === 'function') {
                let newContent = getStyleContent(style, styleTag.getAttribute('name'));
                if (newContent !== styleTag.textContent) {
                    styleTag.textContent = newContent;
                }
            }
        }
    });
}
exports.updateStyles = updateStyles;
/** Parse style, remove nesting selectors and scope them. */
var StyleParser;
(function (StyleParser) {
    /** Cache `Component` -> {style element, referenced count} */
    StyleParser.scopedClassNameSetMap = new Map();
    function getScopedClassNameSet(comName) {
        return StyleParser.scopedClassNameSetMap.get(comName);
    }
    StyleParser.getScopedClassNameSet = getScopedClassNameSet;
    function parse(text, comName) {
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
        let classNameSet;
        let keyframesDeep = 0;
        if (comName) {
            // May add more scoped class name when using `render` or `renderAndUpdate`.
            classNameSet = StyleParser.scopedClassNameSetMap.get(comName);
            if (!classNameSet) {
                classNameSet = new Set();
                StyleParser.scopedClassNameSetMap.set(comName, classNameSet);
            }
        }
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
                    let names = current = parseToNames(chars, current, comName);
                    if (comName) {
                        names = current.map(name => scopeClassName(name, comName, classNameSet));
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
    StyleParser.parse = parse;
    function parseToNames(selector, current, comName) {
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
    // Benchmark about nested selector: https://jsperf.com/is-nesting-selector-slower
    // About 2~4% slower for each nested selector when rendering.
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
     * One style may be used in multiple component, `:host` can be replaced to specified `com-name` dynamically.
     */
    function scopeTagSelector(name, comName) {
        return name.replace(/^(?=\w)/g, comName + ' ')
            .replace(/:host/g, comName);
    }
})(StyleParser || (StyleParser = {}));
exports.getScopedClassNameSet = StyleParser.getScopedClassNameSet;

},{"../queue":108}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const template_1 = require("../template");
const template_2 = require("../template");
const node_helper_1 = require("../libs/node-helper");
const directive_transition_1 = require("./directive-transition");
class CacheDirective {
    constructor(anchor, context) {
        this.templates = [];
        this.currentTemplate = null;
        this.anchor = anchor;
        this.context = context;
        this.transition = new directive_transition_1.DirectiveTransition(context);
    }
    async playEnterTransition(template) {
        let firstElement = template.range.getFirstElement();
        if (firstElement) {
            await this.transition.mayPlayEnter(firstElement);
        }
    }
    canMergeWith(_result) {
        return true;
    }
    merge(result, options) {
        this.transition.setOptions(options);
        if (result) {
            if (typeof result === 'string') {
                result = template_2.text `${result}`;
            }
            if (this.currentTemplate && this.currentTemplate.canMergeWith(result)) {
                this.currentTemplate.merge(result);
            }
            else {
                if (this.currentTemplate) {
                    this.cacheCurrentTemplate();
                }
                let template = this.templates.find(t => t.canMergeWith(result));
                if (template) {
                    template.merge(result);
                    this.anchor.insert(template.range.getFragment());
                    this.playEnterTransition(template);
                    this.currentTemplate = template;
                }
                else {
                    this.initTrueResult(result);
                }
            }
        }
        else {
            if (this.currentTemplate) {
                this.cacheCurrentTemplate();
            }
        }
    }
    initTrueResult(result) {
        if (typeof result === 'string') {
            result = template_2.text `${result}`;
        }
        let atStart = this.templates.length === 0;
        let template = new template_1.Template(result, this.context);
        let fragment = template.range.getFragment();
        this.anchor.insert(fragment);
        if (this.transition.shouldPlayEnter(atStart)) {
            this.playEnterTransition(template);
        }
        this.currentTemplate = template;
        this.templates.push(template);
    }
    async cacheCurrentTemplate() {
        let template = this.currentTemplate;
        let firstElement = template.range.getFirstElement();
        // Cached elements have been moved, reset the anchor node to current parent node.
        if (this.anchor.type === node_helper_1.NodeAnchorType.Next && firstElement && firstElement.parentNode && firstElement.parentNode !== this.anchor.el.parentNode) {
            this.anchor = new node_helper_1.NodeAnchor(firstElement.parentNode, node_helper_1.NodeAnchorType.Parent);
        }
        if (this.transition.shouldPlay() && firstElement) {
            this.transition.mayPlayLeave(firstElement).then((finish) => {
                if (finish) {
                    template.range.cacheFragment();
                }
            });
        }
        else {
            template.range.cacheFragment();
        }
        this.currentTemplate = null;
    }
    remove() {
        if (this.currentTemplate) {
            this.currentTemplate.remove();
        }
    }
}
/**
 * When returned vlaue of `result` changed, this directive will try to reuse old rendered elements.
 * Note that when old rendering result restored, the scroll positions in it will fall back to start position.
 * @param result The html`...` result, can be null or empty string. This value map change when rerendering.
 */
exports.cache = define_1.defineDirective(CacheDirective);

},{"../libs/node-helper":93,"../template":113,"./define":82,"./directive-transition":83}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let seed = 0;
const directiveMap = new Map();
/**
 * Defines a directive from a class which implements `Directive`.
 * Returns a function call which will generate a `DirectiveResult`.
 * A `Directive` works like Binding, but it used to generate HTML code pieces,
 * not like `Binding` to modify properties of an element.
 */
function defineDirective(Dir) {
    let id = seed++;
    directiveMap.set(id, Dir);
    return function (...args) {
        return new DirectiveResult(id, ...args);
    };
}
exports.defineDirective = defineDirective;
/**
 * Returned from calling directive functions like `repeat`.
 * Used to cache arguments and update template later.
 */
class DirectiveResult {
    constructor(id, ...args) {
        this.ref = null;
        this.id = id;
        this.args = args;
    }
}
exports.DirectiveResult = DirectiveResult;
/** Create directive from directive result. used in `node.ts` */
/** @hidden */
function createDirectiveFromResult(anchor, context, result) {
    let Dir = directiveMap.get(result.id);
    let directive = new Dir(anchor, context);
    if (result.ref) {
        result.ref(directive);
    }
    directive.merge(...result.args);
    return directive;
}
exports.createDirectiveFromResult = createDirectiveFromResult;
/** Reference to directive instance after it created and before merge. */
function refDirective(result, ref) {
    result.ref = ref;
    return result;
}
exports.refDirective = refDirective;

},{}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transition_1 = require("../transition");
/** @hidden */
class DirectiveTransition {
    constructor(context, options) {
        this.options = null;
        this.enterAtStart = false;
        this.leaveAtStart = false;
        this.onend = null;
        this.context = context;
        this.setOptions(options);
    }
    setOptions(options) {
        if (options && typeof options === 'object' && options.hasOwnProperty('transition')) {
            let opt = options;
            this.enterAtStart = !!opt.enterAtStart;
            this.leaveAtStart = !!opt.leaveAtStart;
            this.onend = opt.onend || null;
            this.options = transition_1.formatShortTransitionOptions(opt.transition);
        }
        else {
            this.enterAtStart = false;
            this.leaveAtStart = false;
            this.onend = null;
            if (options) {
                this.options = transition_1.formatShortTransitionOptions(options);
            }
            else {
                this.options = null;
            }
        }
    }
    shouldPlay() {
        return !!this.options;
    }
    shouldPlayEnter(atStart = false) {
        if (!this.shouldPlay()) {
            return false;
        }
        if (atStart && !this.enterAtStart) {
            return false;
        }
        return true;
    }
    shouldPlayLeave(atStart = false) {
        if (!this.shouldPlay()) {
            return false;
        }
        if (atStart && !this.leaveAtStart) {
            return false;
        }
        return true;
    }
    async mayPlayEnter(el) {
        if (!this.shouldPlay()) {
            return true;
        }
        let finish = await new transition_1.Transition(el, this.options).enter();
        if (this.onend) {
            this.onend.call(this.context, 'enter', finish);
        }
        return finish;
    }
    async mayPlayLeave(el) {
        if (!this.shouldPlay()) {
            return true;
        }
        let finish = await new transition_1.Transition(el, this.options).leave();
        if (this.onend) {
            this.onend.call(this.context, 'leave', finish);
        }
        return finish;
    }
}
exports.DirectiveTransition = DirectiveTransition;

},{"../transition":122}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directive_transition_1 = require("./directive-transition");
exports.DirectiveTransition = directive_transition_1.DirectiveTransition;
var define_1 = require("./define");
exports.defineDirective = define_1.defineDirective;
exports.refDirective = define_1.refDirective;
exports.DirectiveResult = define_1.DirectiveResult;
exports.createDirectiveFromResult = define_1.createDirectiveFromResult;
var cache_1 = require("./cache");
exports.cache = cache_1.cache;
var repeat_1 = require("./repeat");
exports.repeat = repeat_1.repeat;
var live_repeat_1 = require("./live-repeat");
exports.liveRepeat = live_repeat_1.liveRepeat;
exports.LiveRepeatDirective = live_repeat_1.LiveRepeatDirective;
var live_async_repeat_1 = require("./live-async-repeat");
exports.liveAsyncRepeat = live_async_repeat_1.liveAsyncRepeat;
exports.LiveAsyncRepeatDirective = live_async_repeat_1.LiveAsyncRepeatDirective;

},{"./cache":81,"./define":82,"./directive-transition":83,"./live-async-repeat":85,"./live-repeat":86,"./repeat":87}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const template_1 = require("../template");
const live_repeat_1 = require("./live-repeat");
const page_data_cacher_1 = require("../libs/page-data-cacher");
const observer_1 = require("../observer");
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
/** @hidden */
class LiveAsyncRepeatDirective extends live_repeat_1.LiveRepeatDirective {
    constructor() {
        super(...arguments);
        this.dataCount = null;
        this.key = null;
        /**
         * Whole data count when using `dataGetter`.
         * `-1` means the total count is not determinated yet.
         * We will try to get the data count value when assigning render options.
         */
        this.knownDataCount = -1;
        /** Need to call `updateSliderPosition` after got `knownDataCount`. */
        this.needToUpdateSliderPositionAfterDataCountKnown = false;
        this.updateId = 0;
    }
    validateTemplateFn(templateFn) {
        try {
            let result = templateFn(null, 0);
            if (!(result instanceof template_1.TemplateResult)) {
                throw new Error();
            }
        }
        catch (err) {
            throw new Error(`Please makesure "${templateFn.toString()}" can render "null" value`);
        }
    }
    initRenderOptions(options) {
        this.dataCacher = new page_data_cacher_1.PageDataCacher(this.pageSize);
        this.updateRenderOptions(options);
        this.updateDataCount();
    }
    updateRenderOptions(options) {
        if (options.averageItemHeight) {
            this.averageItemHeight = options.averageItemHeight;
        }
        if (options.onUpdated) {
            this.onUpdated = options.onUpdated;
        }
        this.dataCacher.setDataGetter(options.dataGetter);
        this.dataCount = options.dataCount;
    }
    async updateDataCount() {
        if (!this.dataCount) {
            return;
        }
        this.knownDataCount = -1;
        let dataCount;
        if (typeof this.dataCount === 'function') {
            dataCount = this.dataCount();
        }
        else {
            dataCount = this.dataCount;
        }
        if (dataCount instanceof Promise) {
            this.knownDataCount = await dataCount;
        }
        else {
            this.knownDataCount = dataCount;
        }
        if (this.needToUpdateSliderPositionAfterDataCountKnown) {
            this.updateSliderPosition();
        }
    }
    async update(renderPalceholders = true) {
        this.updateSliderPosition();
        let endIndex = this.limitEndIndex(this.startIndex + this.pageSize * this.renderPageCount);
        let needToRenderWithFreshData = !renderPalceholders;
        let updateImmediatelyPromise;
        if (renderPalceholders) {
            let { data, fresh } = this.dataCacher.getExistingData(this.startIndex, endIndex);
            updateImmediatelyPromise = this.updateData(data);
            needToRenderWithFreshData = !fresh;
        }
        let updateFreshPromise;
        let updateId = this.updateId += 1;
        if (needToRenderWithFreshData) {
            updateFreshPromise = this.dataCacher.getFreshData(this.startIndex, endIndex).then((data) => {
                if (updateId === this.updateId) {
                    return this.updateData(data);
                }
                else {
                    return Promise.resolve();
                }
            });
        }
        if (updateImmediatelyPromise) {
            await updateImmediatelyPromise;
        }
        if (updateFreshPromise) {
            await updateFreshPromise;
        }
    }
    async updateData(data) {
        if (this.key) {
            data = this.uniqueData(data);
        }
        data = data.map(observer_1.observe);
        await super.updateData(data);
    }
    uniqueData(data) {
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
    updateSliderPosition() {
        if (this.knownDataCount === -1) {
            this.needToUpdateSliderPositionAfterDataCountKnown = true;
        }
        super.updateSliderPosition();
    }
    // Returns `-1` when total count is not determinated.
    getTotalDataCount() {
        return this.knownDataCount;
    }
    /** When data ordering changed and you want to keep scroll position, e.g., after sorting by columns. */
    async reload() {
        this.dataCacher.beStale();
        this.updateDataCount();
        await this.update(false);
    }
    /**
     * When data changed completely and you want to move to start scroll position, e.g., after data type changed.
     * @param index Specified the start index you want to set by `setStartIndex`.
     */
    async reset(index = 0) {
        this.dataCacher.clear();
        this.updateDataCount();
        await this.setStartIndex(index);
    }
    getItem(index) {
        return this.dataCacher.getExistingData(index, index + 1).data[0];
    }
    /** Get currently rendered item in index. */
    getRenderedItem(index) {
        let isRendered = index >= this.startIndex && index < this.startIndex + this.data.length;
        if (isRendered) {
            return this.data[index - this.startIndex];
        }
        else {
            return null;
        }
    }
    /** When async items added at index, we need to adjust scrolling position and data count immediately,
     * and may add null item as placeholders for the added items.
     * Such that you will feel no delay after the add or delete operation.
     * After data loaded, new render result should be the same.
     */
    notifyAdded(index, count = 1) {
        this.dataCacher.moveData(index, count);
        this.update();
    }
    notifyDeleted(index, count = 1) {
        this.dataCacher.moveData(index, -count);
        this.update();
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

},{"../libs/page-data-cacher":94,"../observer":100,"../template":113,"./define":82,"./live-repeat":86}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const dom_event_1 = require("../libs/dom-event");
const watcher_1 = require("../watcher");
const repeat_1 = require("./repeat");
const queue_1 = require("../queue");
const util_1 = require("../libs/util");
const observer_1 = require("../observer");
// Benchmark about using static layout or absolute layout: https://jsperf.com/is-absolute-layout-faster
// The `liveRepeat` only support render one item in one line.
// At beginning, we supported rendering several items in one line (works like photo album).
// This required us to listen watch the rect of the `scroller`,
// then to adjust a `cellCount` value which specify how many items in one line.
// This is not hard, but it requires us to support `onReconnected` and `onDisconnected` on directive,
// So that we can unregister or restore the watch for scroller size changes.
// This is a break change and needs us to modify `Component`, `NodePart`, `Template`, `defineDirective`, `Directive`.
// So finally we plan to implement a component to support rendering several items in one line.
/** @hidden */
class LiveRepeatDirective extends repeat_1.RepeatDirective {
    constructor(anchor, context) {
        super(anchor, context);
        this.scrollerBorderTopWidth = 0;
        this.scrollerBorderBottomWidth = 0;
        /**
        * How many items to render each time.
        * If you are using dynamic data, you should set this value to count of items that you ajax interface returned.
        * Otherwise you may set this value big enough to cover viewport, but should not too big to render too much items.
        * Normally 50 would be enough since minimal lineHeight is `24` and `24 * 50 = 1200` can cover most screens.
        * If the render result can't cover the viewport, it will be double until it can and rerender.
        */
        this.pageSize = 50;
        /**
        * How many pages to render each time.
        * If the render result can't cover viewport, will double this value.
        * Normally you don't need to set this, it's value will be automatically detected.
        * Set this value only if you can makesure `1` is not enough and don't want the rerendering at the beginning.
        */
        this.renderPageCount = 1;
        /**
         * `startIndex` can only be set for once from `options`.
         * Otherwise you should call `setStartIndex`, then `needToApplyStartIndex` will be set to true and wait for next rendering.
         */
        this.needToApplyStartIndex = false;
        /**
         * Average item height value, it is used to calculate the position of the `slider`.
         * It will be detected automatically from the first rendering if was not initialized.
         */
        this.averageItemHeight = 0;
        /**
         * When we scrolled up or down, we don't know about the height of just inserted or removed elements.
         * But we can keep it's scrolling position by adjusting `top` or `bottom` property of slider element.
         */
        this.continuousScrollDirection = null;
        this.continuousSliderPosition = null;
        this.toCompleteRendering = null;
        /** We may want to do something with the currently rendered results, link loading screenshots... */
        this.onUpdated = null;
        /** Whole data from options. */
        this.rawData = null;
        this.initElements();
    }
    async initElements() {
        this.slider = this.anchor.el.parentElement;
        this.scroller = this.slider.parentElement;
        if (!this.slider || !this.scroller || this.scroller.children.length !== 1) {
            throw new Error(`"liveRepeat" must be contained in the struct like "
				<div style="overflow: auto | scroll; position: relative" title="as a scroll parent">
					<div title="as a scroll slider" style="position: absolute">
						\${liveRepeat(...)}
					</div>
				</div>
			"`);
        }
        dom_event_1.on(this.scroller, 'scroll.passive', util_1.throttleByAnimationFrame(this.onScroll.bind(this)));
        queue_1.onRenderComplete(() => {
            let computedStyle = getComputedStyle(this.scroller);
            if (!['scroll', 'auto'].includes(computedStyle.overflowY)) {
                throw `The "overflow-y" value of "scroller" out of "liveRepeat" directive must be "scroll" or "auto"`;
            }
            if (computedStyle.position === 'static') {
                throw `The "position" value of "scroller" out of "liveRepeat" directive must not be "static"`;
            }
            if (getComputedStyle(this.slider).position !== 'absolute') {
                throw `The "position" value of "slider" out of "liveRepeat" directive must not be "absolute"`;
            }
            this.scrollerBorderTopWidth = Number(getComputedStyle(this.scroller).borderTopWidth.replace('px', '')) || 0;
            this.scrollerBorderBottomWidth = Number(getComputedStyle(this.scroller).borderBottomWidth.replace('px', '')) || 0;
        });
    }
    canMergeWith(_options, templateFn) {
        return templateFn.toString() === this.templateFn.toString();
    }
    merge(options, templateFn, transitionOptions) {
        if (this.firstlyMerge) {
            this.initRenderOptions(options);
            this.validateTemplateFn(templateFn);
        }
        this.templateFn = templateFn;
        this.transition.setOptions(transitionOptions);
        this.updateRenderOptions(options);
        this.firstlyMerge = false;
    }
    validateTemplateFn(_templateFn) { }
    initRenderOptions(options) {
        if (options.pageSize !== undefined && options.pageSize > 0) {
            this.pageSize = options.pageSize;
        }
        if (options.renderPageCount) {
            this.renderPageCount = options.renderPageCount;
        }
        if (options.averageItemHeight) {
            this.averageItemHeight = options.averageItemHeight;
        }
    }
    // Only `data` is updatable
    updateRenderOptions(options) {
        if (options.averageItemHeight) {
            this.averageItemHeight = options.averageItemHeight;
        }
        if (options.onUpdated) {
            this.onUpdated = options.onUpdated;
        }
        if (options.data !== undefined) {
            this.watchRawDataAndUpdateImmediately(options.data);
        }
    }
    watchRawDataAndUpdateImmediately(data) {
        if (this.unwatchData) {
            this.unwatchData();
            this.unwatchData = null;
        }
        if (!data) {
            this.rawData = [];
            return;
        }
        let watchFn = () => {
            return [...data].map(observer_1.observe);
        };
        let onUpdate = (data) => {
            this.rawData = data;
            this.update();
        };
        this.unwatchData = (this.context || watcher_1.globalWatcherGroup).watchImmediately(watchFn, onUpdate);
    }
    async update() {
        this.updateSliderPosition();
        let endIndex = this.limitEndIndex(this.startIndex + this.pageSize * this.renderPageCount);
        let data = this.rawData ? this.rawData.slice(this.startIndex, endIndex) : [];
        this.toCompleteRendering = this.updateData(data);
        await this.toCompleteRendering;
        this.toCompleteRendering = null;
    }
    async updateData(data) {
        super.updateData(data);
        if (this.onUpdated) {
            this.onUpdated(this.data, this.startIndex);
        }
        queue_1.onRenderComplete(() => {
            if (this.data.length > 0) {
                if (!this.averageItemHeight) {
                    this.measureAverageItemHeight();
                    this.updateSliderPosition();
                }
                if (this.needToApplyStartIndex && this.averageItemHeight) {
                    this.scroller.scrollTop = this.averageItemHeight * this.startIndex || 0;
                    this.needToApplyStartIndex = false;
                }
            }
        });
    }
    limitEndIndex(index) {
        let maxCount = this.getTotalDataCount();
        if (maxCount >= 0 && index > maxCount) {
            index = maxCount;
        }
        return index;
    }
    getTotalDataCount() {
        if (this.rawData) {
            return this.rawData.length;
        }
        else {
            return 0;
        }
    }
    // If you use two placeholder elements but not top and bottom margin to specify the position of `slider`,
    // There will be a big issue:
    // When no child nodes moved in scroller, expecially when rendering placeholder values [null, ...].
    // updating height of placeholder elements will cause `scroller.scrollTop` reset.
    updateSliderPosition() {
        let countBeforeStart = this.startIndex;
        let endIndex = this.limitEndIndex(this.startIndex + this.pageSize * this.renderPageCount);
        let countAfterEnd = 0;
        let totalCount = this.getTotalDataCount();
        if (totalCount >= 0) {
            countAfterEnd = Math.max(0, totalCount - endIndex);
        }
        let translateY = this.averageItemHeight * countBeforeStart;
        if (this.continuousScrollDirection && countBeforeStart > 0) {
            translateY = this.continuousSliderPosition;
        }
        let marginBottom = this.averageItemHeight * countAfterEnd;
        if (this.continuousScrollDirection === 'up' && countBeforeStart > 0) {
            if (translateY < this.averageItemHeight) {
                translateY = this.averageItemHeight;
            }
            this.slider.style.top = 'auto';
            this.slider.style.bottom = '-' + this.averageItemHeight * countAfterEnd + 'px';
        }
        else {
            this.slider.style.top = '0';
            this.slider.style.bottom = 'auto';
        }
        this.slider.style.marginBottom = marginBottom + 'px';
        this.slider.style.transform = `translateY(${translateY}px)`;
    }
    measureAverageItemHeight() {
        if (this.data.length === 0) {
            return;
        }
        // Here it is not 100% right when `pageSize` is not big enough.
        // Assume that there is only one `30px` height item with `10px` margin,
        // You will got wrong value 50, not right value 40.
        let sliderHeight = this.slider.offsetHeight;
        if (sliderHeight <= 0) {
            return;
        }
        this.averageItemHeight = Math.round(sliderHeight / this.data.length);
    }
    getElementOfIndex(index) {
        let wtem = this.wtems[index - this.startIndex];
        if (wtem) {
            return wtem.template.range.getFirstElement();
        }
        return null;
    }
    async onScroll() {
        if (this.toCompleteRendering) {
            await this.toCompleteRendering;
        }
        this.checkRenderedRange();
    }
    checkRenderedRange() {
        let scrollerRect = new util_1.ScrollerClientRect(this.scroller);
        let sliderRect = this.slider.getBoundingClientRect();
        if (scrollerRect.rect.top < sliderRect.top) {
            this.updateToCover('up');
        }
        else if (scrollerRect.rect.bottom > sliderRect.bottom) {
            this.updateToCover('down');
        }
    }
    // `direction` means where we render new items, and also the direction that the value of `startIndex` will change to.
    updateToCover(scrollDirection) {
        let startIndex = -1;
        let endIndex = -1; // Max value is `rawData.length`, it's a slice index, not true index of data. 
        let visibleIndex = -1;
        if (scrollDirection === 'up') {
            visibleIndex = this.locateLastVisibleIndex();
            endIndex = visibleIndex > -1 ? visibleIndex + 1 : 0;
        }
        else {
            startIndex = visibleIndex = this.locateFirstVisibleIndex();
            if (startIndex > -1) {
                endIndex = startIndex + this.pageSize * this.renderPageCount;
            }
        }
        // In this situation two rendering have no sharing part
        if (endIndex === -1) {
            if (scrollDirection === 'up') {
                endIndex = Math.ceil((this.scroller.scrollTop + this.scroller.clientHeight) / this.averageItemHeight);
            }
            else {
                endIndex = Math.floor(this.scroller.scrollTop / this.averageItemHeight)
                    + this.pageSize * this.renderPageCount;
            }
        }
        endIndex = this.limitEndIndex(endIndex);
        startIndex = Math.max(0, endIndex - this.pageSize * this.renderPageCount);
        this.validateContinuousScrolling(scrollDirection, startIndex, endIndex);
        this.startIndex = startIndex;
        this.update();
    }
    locateFirstVisibleIndex() {
        return this.locateVisibleIndex(true);
    }
    locateLastVisibleIndex() {
        return this.locateVisibleIndex(false);
    }
    locateVisibleIndex(isFirst) {
        let scrollerRect = new util_1.ScrollerClientRect(this.scroller);
        let visibleIndex = util_1.binaryFindIndexToInsert(this.wtems, (wtem) => {
            let firstElement = wtem.template.range.getFirstElement();
            if (firstElement) {
                let rect = firstElement.getBoundingClientRect();
                if (scrollerRect.isRectAbove(rect)) {
                    return 1;
                }
                else if (scrollerRect.isRectBelow(rect)) {
                    return -1;
                }
                else {
                    return isFirst ? -1 : 1;
                }
            }
            else {
                return -1;
            }
        });
        if (visibleIndex === this.data.length) {
            visibleIndex -= 1;
        }
        if (visibleIndex === -1) {
            return -1;
        }
        let firstElement = this.wtems[visibleIndex].template.range.getFirstElement();
        let firstElementRect = firstElement.getBoundingClientRect();
        // The found index is just an enge index, may the element still outside the visible range.
        if (scrollerRect.isRectAbove(firstElementRect)) {
            visibleIndex += 1;
        }
        else if (scrollerRect.isRectBelow(firstElementRect)) {
            visibleIndex -= 1;
        }
        if (visibleIndex >= 0 && visibleIndex < this.data.length) {
            return this.startIndex + visibleIndex;
        }
        return -1;
    }
    validateContinuousScrolling(scrollDirection, startIndex, endIndex) {
        let indexToKeepPosition = scrollDirection === 'down' ? startIndex : endIndex;
        let isSameScrollDirection = this.continuousScrollDirection === scrollDirection;
        let el = this.getElementOfIndex(indexToKeepPosition);
        if (el !== null) {
            this.continuousScrollDirection = scrollDirection;
            if (scrollDirection === 'down') {
                let position = isSameScrollDirection ? this.continuousSliderPosition : this.getSliderTopPosition();
                position += el.getBoundingClientRect().top - this.slider.getBoundingClientRect().top;
                this.continuousSliderPosition = position;
            }
            else {
                let position = isSameScrollDirection ? this.continuousSliderPosition : this.getSliderBottomPosition();
                position += el.getBoundingClientRect().bottom - this.slider.getBoundingClientRect().bottom;
                this.continuousSliderPosition = position;
            }
        }
        else {
            this.continuousScrollDirection = null;
        }
    }
    getSliderTopPosition() {
        let scrollerPaddingAreaTop = this.scroller.getBoundingClientRect().top - this.scrollerBorderTopWidth;
        let sliderAreaTop = this.slider.getBoundingClientRect().top;
        return sliderAreaTop - scrollerPaddingAreaTop + this.scroller.scrollTop;
    }
    getSliderBottomPosition() {
        let scrollerPaddingAreaBottom = this.scroller.getBoundingClientRect().bottom + this.scrollerBorderBottomWidth;
        let sliderAreaBottom = this.slider.getBoundingClientRect().bottom;
        return sliderAreaBottom - scrollerPaddingAreaBottom + this.scroller.scrollTop;
    }
    remove() {
        for (let wtem of this.wtems) {
            wtem.remove();
        }
    }
    /** Get `startIndex` property. */
    getStartIndex() {
        return this.startIndex;
    }
    /** Get the index of the first visible element, which can be used to restore scrolling position by `setStartIndex`. */
    getFirstVisibleIndex() {
        return Math.max(0, this.locateFirstVisibleIndex());
    }
    /** Set `startIndex`, and the item in which index will be at the top start position of the viewport. */
    async setStartIndex(index) {
        this.startIndex = this.limitEndIndex(index);
        this.needToApplyStartIndex = true;
        this.continuousScrollDirection = null;
        // It doesn't update immediately because `rawData` may changed and will update soon.
        // Need to wait reset `needToApplyStartIndex` in `updateData`.
        await queue_1.renderComplete();
        if (this.needToApplyStartIndex) {
            await this.update();
        }
    }
    /** Adjust `startIndex` and scroll position to make item in the specified index becomes visible if it's not. */
    async scrollToViewIndex(index) {
        // Only adjust scroll position
        if (this.isIndexRendered(index)) {
            this.scrollToViewRenderedIndex(index);
        }
        else {
            if (index < this.startIndex) {
                await this.setStartIndex(index);
            }
            else {
                let startIndex = Math.max(0, (index + 1) - Math.ceil(this.scroller.clientHeight / this.averageItemHeight));
                await this.setStartIndex(startIndex);
                if (this.isIndexRendered(index)) {
                    this.scrollToViewRenderedIndex(index);
                }
            }
        }
    }
    isIndexRendered(index) {
        return index >= this.startIndex && index < this.startIndex + this.data.length;
    }
    scrollToViewRenderedIndex(index) {
        let el = this.wtems[index - this.startIndex].template.range.getFirstElement();
        let rect = el.getBoundingClientRect();
        let scrollerRect = new util_1.ScrollerClientRect(this.scroller);
        // Below it, need to scroll up
        if (rect.bottom > scrollerRect.rect.bottom) {
            this.scroller.scrollTop = this.scroller.scrollTop + (scrollerRect.rect.bottom - rect.bottom);
        }
        // Above it, need to scroll down
        else if (rect.top < scrollerRect.rect.top) {
            this.scroller.scrollTop = this.scroller.scrollTop + (scrollerRect.rect.top - rect.top);
        }
    }
    /** Get item in index. */
    getItem(index) {
        return this.rawData ? this.rawData[index] || null : null;
    }
}
exports.LiveRepeatDirective = LiveRepeatDirective;
/**
 * Gerenate live repeat elements, reuse elements as much as possible when data changed.
 * Compare to `repeat` directive, it will only show partial elements in viewport when you scroll it.
 * @param options Options for live rendering.
 * @param templateFn The fucntion which will return a template from one iterable data and index position.
 * @param transitionOptions The transition options, it can be a transition name, property or properties, or {transition, enterAtStart}.
 */
exports.liveRepeat = define_1.defineDirective(LiveRepeatDirective);

},{"../libs/dom-event":90,"../libs/util":95,"../observer":100,"../queue":108,"../watcher":123,"./define":82,"./repeat":87}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define_1 = require("./define");
const watcher_1 = require("../watcher");
const directive_transition_1 = require("./directive-transition");
const watched_template_1 = require("../libs/watched-template");
const observer_1 = require("../observer");
/** @hidden */
class RepeatDirective {
    constructor(anchor, context) {
        this.data = [];
        this.wtems = [];
        this.unwatchData = null;
        this.firstlyMerge = true;
        /**
         * For `liveRepeat`, specify the the start index of first item in the whole data.
         * It was initialized from start options, and was reset when trigger `scroll` event on `scroller`.
         */
        this.startIndex = 0;
        this.anchor = anchor;
        this.context = context;
        this.transition = new directive_transition_1.DirectiveTransition(context);
    }
    watchAndUpdateDataImmediately(data) {
        // Here if `data` eauqls `lastData`, we still must update watchers.
        // Bacause the old watcher may trigger another update and cause update for twice. 
        if (this.unwatchData) {
            this.unwatchData();
            this.unwatchData = null;
        }
        if (!data) {
            this.updateData([]);
            return;
        }
        // Here need to read each item of the `Iterable<T>` so we can observe changes like `a[i] = xxx`.
        let watchFn = () => {
            return [...data].map(observer_1.observe);
        };
        let onUpdate = (data) => {
            this.updateData(data);
        };
        this.unwatchData = (this.context || watcher_1.globalWatcherGroup).watchImmediately(watchFn, onUpdate);
    }
    canMergeWith(_data, templateFn) {
        return templateFn.toString() === this.templateFn.toString();
    }
    merge(data, templateFn, options) {
        this.templateFn = templateFn;
        this.transition.setOptions(options);
        this.watchAndUpdateDataImmediately(data);
        this.firstlyMerge = false;
    }
    // We want to reduce moving times, the best way is here:
    // http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf
    // Another way in `lit-html` is to check from start and end position,
    // it's good when only add or remove somes in one position:
    // https://github.com/Polymer/lit-html/blob/master/src/directives/repeat.ts
    // But here we need to keep the index of template nodes that will be removed,
    // So we check from start position to end position,
    // collected templates which will be removed but keep them in their old position.
    // This algorthim is good when you add or remove data, but a little weak when reordering data.
    // Concepts:
    //   matched: same item, no need to update item. if duplicate items exist, only the first one match.
    //   reuse: reuse not in use item and update item on it.
    updateData(data) {
        // Old
        let oldData = this.data;
        let oldItemIndexMap = new Map();
        let oldWtems = this.wtems;
        // New
        // Here it's not in updating and we can't capture dependencies,
        // so we need to observe each item manually,
        // then later we can generate templates and automatically update them when properties of item changed.
        let newData = this.data = data;
        let newItemSet = new Set(this.data);
        this.wtems = [];
        // Mark not in use and reused
        let notInUseIndexSet = new Set();
        let usedIndexSet = new Set();
        for (let i = 0; i < oldData.length; i++) {
            let oldItem = oldData[i];
            // Duplicate item or placeholder item, which should not in use.
            if (oldItem === null || oldItemIndexMap.has(oldItem)) {
                notInUseIndexSet.add(i);
            }
            else {
                oldItemIndexMap.set(oldItem, i);
                if (!newItemSet.has(oldItem)) {
                    notInUseIndexSet.add(i);
                }
            }
        }
        // `nextMatchedOldIndex` is the core indicator we moving elements according to,
        // The element at `nextMatchedOldIndex` will keep it's position.
        // When we check other element whose new index before it:
        //   if is a matched one and before it: move it before
        //   if is a matched one and after or is it: leave it and upgrade `nextMatchedOldIndex`
        // If we have upgrade `nextMatchedOldIndex` to new value,
        // we can leave elements between last and new `nextMatchedOldIndex` and reuse them without moving.
        // Note that if we moved an matched item before `nextMatchedOldIndex` element,
        // we need to move all the following items until `nextMatchedOldIndex`.
        function getNextMatchedOldIndex(startIndex) {
            for (let i = startIndex; i < oldData.length; i++) {
                let oldItem = oldData[i];
                if (newItemSet.has(oldItem) && oldItemIndexMap.get(oldItem) === i) {
                    return i;
                }
            }
            return oldData.length;
        }
        let nextMatchedOldIndex = getNextMatchedOldIndex(0);
        let lastStayedOldIndex = -1;
        for (let index = 0; index < newData.length; index++) {
            let item = newData[index];
            // May reuse
            if (oldItemIndexMap.has(item)) {
                // Find the old index for item
                let reuseIndex = oldItemIndexMap.get(item);
                // Although template with the index can be reused, but it may be reused already.
                // In this scenario we don't try to find a new index that match item,
                // Such that all the items with duplicate value except the first one will be removed.
                if (usedIndexSet.has(reuseIndex)) {
                    reuseIndex = -1;
                }
                // Already in the right position, no need to move.
                if (reuseIndex >= nextMatchedOldIndex) {
                    this.useMatchedOne(oldWtems[reuseIndex], index);
                    usedIndexSet.add(reuseIndex);
                    lastStayedOldIndex = reuseIndex;
                    nextMatchedOldIndex = getNextMatchedOldIndex(reuseIndex + 1);
                    continue;
                }
                if (reuseIndex > -1) {
                    this.moveOneBefore(oldWtems[reuseIndex], nextMatchedOldIndex < oldData.length ? oldWtems[nextMatchedOldIndex] : null);
                    this.useMatchedOne(oldWtems[reuseIndex], index);
                    usedIndexSet.add(reuseIndex);
                    lastStayedOldIndex = nextMatchedOldIndex;
                    continue;
                }
            }
            // Reuse template that will be removed and rerender it
            if (!this.transition.shouldPlay() && notInUseIndexSet.size > 0) {
                let reuseIndex = notInUseIndexSet.keys().next().value; // index in `notInUseIndexSet` is ordered.
                // If the index betweens `lastStayedOldIndex + 1` and `nextMatchedOldIndex`, no need to move it.
                let canStay = reuseIndex > lastStayedOldIndex && reuseIndex < nextMatchedOldIndex;
                if (!canStay) {
                    this.moveOneBefore(oldWtems[reuseIndex], nextMatchedOldIndex < oldData.length ? oldWtems[nextMatchedOldIndex] : null);
                    lastStayedOldIndex = nextMatchedOldIndex;
                }
                this.reuseOne(oldWtems[reuseIndex], item, index);
                notInUseIndexSet.delete(reuseIndex);
                usedIndexSet.add(reuseIndex);
                continue;
            }
            this.wtems.push(this.createOne(item, index, nextMatchedOldIndex < oldData.length ? oldWtems[nextMatchedOldIndex] : null));
        }
        // Should not follow `notInUseIndexSet` here:
        // e.g., two same items exist, and only first one reused, 
        // the second one needs to be removed but not in `notInUseIndexSet`.
        if (usedIndexSet.size < oldData.length) {
            for (let i = 0; i < oldData.length; i++) {
                if (!usedIndexSet.has(i)) {
                    this.removeOne(oldWtems[i]);
                }
            }
        }
    }
    useMatchedOne(wtem, index) {
        wtem.updateIndex(index + this.startIndex);
        this.wtems.push(wtem);
    }
    reuseOne(wtem, item, index) {
        wtem.update(item, index + this.startIndex);
        this.wtems.push(wtem);
    }
    moveOneBefore(wtem, nextOldWtem) {
        let fragment = wtem.template.range.getFragment();
        if (nextOldWtem) {
            nextOldWtem.template.range.startNode.before(fragment);
        }
        else {
            this.anchor.insert(fragment);
        }
    }
    createOne(item, index, nextOldWtem) {
        let wtem = new watched_template_1.WatchedTemplate(this.context, this.templateFn, item, index + this.startIndex);
        let template = wtem.template;
        let fragment = template.range.getFragment();
        let firstElement = null;
        if (this.transition.shouldPlayEnter(this.firstlyMerge)) {
            firstElement = fragment.firstElementChild;
        }
        if (nextOldWtem) {
            nextOldWtem.template.range.startNode.before(fragment);
        }
        else {
            this.anchor.insert(fragment);
        }
        if (firstElement) {
            this.transition.mayPlayEnter(firstElement);
        }
        return wtem;
    }
    removeOne(wtem) {
        let template = wtem.template;
        if (this.transition.shouldPlay()) {
            let firstElement = template.range.getFirstElement();
            if (firstElement) {
                this.transition.mayPlayLeave(firstElement).then((finish) => {
                    if (finish) {
                        wtem.remove();
                    }
                });
            }
            else {
                wtem.remove();
            }
        }
        else {
            wtem.remove();
        }
    }
    remove() {
        for (let wtem of this.wtems) {
            wtem.remove();
        }
    }
}
exports.RepeatDirective = RepeatDirective;
/**
 * Gerenate repeat elements, it will reuse elements as much as possible when data changed.
 * Currently the repeat directive reuses rendered elements by repeat data items, not `key` can be specified.
 * If data items have changed and you do need to reuse elements by a `key`, try repeat the `key` values.
 * @param items The iterable data, each item in it will pass to `templateFn.`
 * @param templateFn The fucntion which will return a template from one iterable data and index position.
 * @param options The transition options, it can be a transition name, property or properties, or {transition, enterAtStart}.
 */
exports.repeat = define_1.defineDirective(RepeatDirective);

},{"../libs/watched-template":96,"../observer":100,"../watcher":123,"./define":82,"./directive-transition":83}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer_1 = require("./observer");
const emitter_1 = require("./libs/emitter");
/** Observed base class, changes it's sub properties will cause the components depend on them to update. */
class ObservedBaseClass {
    constructor() {
        return observer_1.observeTarget(this);
    }
}
exports.ObservedBaseClass = ObservedBaseClass;
/** Observed emitter class, changes it's sub properties will cause the components depend on them to update. */
class ObservedEmitter extends emitter_1.Emitter {
    constructor() {
        super();
        return observer_1.observeTarget(this);
    }
}
exports.ObservedEmitter = ObservedEmitter;

},{"./libs/emitter":91,"./observer":100}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emitter_1 = require("./emitter");
exports.ObservedBaseClass = emitter_1.ObservedBaseClass;
exports.ObservedEmitter = emitter_1.ObservedEmitter;
var render_1 = require("./render");
exports.render = render_1.render;
exports.renderComponent = render_1.renderComponent;
exports.appendTo = render_1.appendTo;
var template_1 = require("./template");
exports.html = template_1.html;
exports.css = template_1.css;
exports.svg = template_1.svg;
exports.TemplateResult = template_1.TemplateResult;
exports.Template = template_1.Template;
var component_1 = require("./component");
exports.Component = component_1.Component;
exports.define = component_1.define;
exports.addGlobalStyle = component_1.addGlobalStyle;
exports.updateStyles = component_1.updateStyles;
exports.getComponent = component_1.getComponent;
exports.getComponentAsync = component_1.getComponentAsync;
exports.getClosestComponent = component_1.getClosestComponent;
exports.updateComponents = component_1.updateComponents;
var bindings_1 = require("./bindings");
exports.defineBinding = bindings_1.defineBinding;
exports.refBinding = bindings_1.refBinding;
exports.BindingResult = bindings_1.BindingResult;
exports.show = bindings_1.show;
exports.hide = bindings_1.hide;
var dom_event_1 = require("./libs/dom-event");
exports.on = dom_event_1.on;
exports.once = dom_event_1.once;
exports.off = dom_event_1.off;
var observer_1 = require("./observer");
exports.observe = observer_1.observe;
exports.observeGetter = observer_1.observeGetter;
var watcher_1 = require("./watcher");
exports.watch = watcher_1.watch;
exports.watchOnce = watcher_1.watchOnce;
exports.watchUntil = watcher_1.watchUntil;
exports.watchImmediately = watcher_1.watchImmediately;
exports.Watcher = watcher_1.Watcher;
var queue_1 = require("./queue");
exports.onRenderComplete = queue_1.onRenderComplete;
exports.renderComplete = queue_1.renderComplete;
var directives_1 = require("./directives");
exports.defineDirective = directives_1.defineDirective;
exports.refDirective = directives_1.refDirective;
exports.DirectiveResult = directives_1.DirectiveResult;
exports.cache = directives_1.cache;
exports.repeat = directives_1.repeat;
exports.liveRepeat = directives_1.liveRepeat;
exports.LiveRepeatDirective = directives_1.LiveRepeatDirective;
exports.liveAsyncRepeat = directives_1.liveAsyncRepeat;
exports.LiveAsyncRepeatDirective = directives_1.LiveAsyncRepeatDirective;
var transition_1 = require("./transition");
exports.defineTransion = transition_1.defineTransion;
exports.getEasing = transition_1.getEasing;
exports.Transition = transition_1.Transition;
exports.clearTransition = transition_1.clearTransition;

},{"./bindings":67,"./component":77,"./directives":84,"./emitter":88,"./libs/dom-event":90,"./observer":100,"./queue":108,"./render":109,"./template":113,"./transition":122,"./watcher":123}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GLOBAL_EVENT_MODIFIERS = ['capture', 'self', 'once', 'prevent', 'stop', 'passive'];
const CONTROL_KEYS = ['ctrl', 'shift', 'alt'];
const CHANGE_FILTERS = ['check', 'uncheck'];
const WHEEL_FILTERS = ['up', 'down'];
const BUTTON_NAME_INDEX = {
    left: 0,
    middle: 1,
    right: 2,
    main: 0,
    auxiliary: 1,
    secondary: 2
};
const EVENT_FILTER_FN = {
    keydown: keyEventFilter,
    keyup: keyEventFilter,
    keypress: keyEventFilter,
    mousedown: mouseEventFilter,
    mousemove: mouseEventFilter,
    mouseup: mouseEventFilter,
    click: mouseEventFilter,
    change: changeEventFilter,
    wheel: wheelEventFilter
};
// Full key list: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
// Capture key at: https://keycode.info/
function keyEventFilter(e, filters) {
    let keyOrCodeFilters = [];
    for (let filter of filters) {
        if (CONTROL_KEYS.includes(filter)) {
            if (!isControlKeyMatchFilters(e, filter)) {
                return false;
            }
            continue;
        }
        keyOrCodeFilters.push(filter);
    }
    return keyOrCodeFilters.length === 0
        || keyOrCodeFilters.includes(e.key.toLowerCase());
}
function mouseEventFilter(e, filters) {
    let buttonFilters = [];
    for (let filter of filters) {
        if (CONTROL_KEYS.includes(filter)) {
            if (!isControlKeyMatchFilters(e, filter)) {
                return false;
            }
            continue;
        }
        buttonFilters.push(filter);
    }
    if (buttonFilters.length === 0) {
        return true;
    }
    if (buttonFilters.find(f => BUTTON_NAME_INDEX[f] === e.button)) {
        return true;
    }
    return false;
}
function isControlKeyMatchFilters(e, filter) {
    switch (filter) {
        case 'ctrl':
            if (!e.ctrlKey) {
                return false;
            }
            break;
        case 'shift':
            if (!e.shiftKey) {
                return false;
            }
            break;
        case 'alt':
            if (!e.altKey) {
                return false;
            }
            break;
    }
    return true;
}
function changeEventFilter(e, [filter]) {
    let checked = e.target.checked;
    return checked && filter === 'check'
        || checked && filter === 'uncheck';
}
function wheelEventFilter(e, [filter]) {
    return (e.deltaY < 0) && filter === 'up'
        || (e.deltaY > 0) && filter === 'down';
}
function validateModifiers(rawName, name, modifiers) {
    modifiers = modifiers.filter(m => !GLOBAL_EVENT_MODIFIERS.includes(m));
    if (modifiers.length === 0) {
        return true;
    }
    if (name === 'change') {
        if (modifiers.length > 1 || !CHANGE_FILTERS.includes(modifiers[0])) {
            throw new Error(`"${rawName}" is valid, check filter for change event must be one of "${CHANGE_FILTERS.join(',')}"`);
        }
    }
    else if (name === 'wheel') {
        if (modifiers.length > 1 || !WHEEL_FILTERS.includes(modifiers[0])) {
            throw new Error(`"${rawName}" is valid, direction filter for wheel event must be one of "${WHEEL_FILTERS.join(',')}"`);
        }
    }
    else if (name === 'keydown' || name === 'keyup' || name === 'keypress') {
        modifiers = modifiers.filter(m => !CONTROL_KEYS.includes(m));
        if (modifiers.length > 1) {
            throw new Error(`"${rawName}" is valid, only one key name can be specified as key`);
        }
    }
    else if (name === 'mousedown' || name === 'mousemove' || name === 'mouseup' || name === 'click') {
        modifiers = modifiers.filter(m => !CONTROL_KEYS.includes(m));
        if (modifiers.length > 1 || !BUTTON_NAME_INDEX.hasOwnProperty(modifiers[0])) {
            throw new Error(`"${rawName}" is valid, button filter for mouse event must be one of "${Object.keys(BUTTON_NAME_INDEX).join(',')}"`);
        }
    }
    return true;
}
const ElementEventMap = new WeakMap();
/**
 * Register an event handler on element.
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
 * Register an event handler on element, it will be triggered only for once.
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
    let eventMap = ElementEventMap.get(el);
    if (!eventMap) {
        eventMap = {};
        ElementEventMap.set(el, eventMap);
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
 * Unregister an event handler on element.
 * @param el The element to unregister listener on.
 * @param name The event name with or without modifiers.
 * @param handler The event handler.
 * @param scope The event context used to call handler. If specified, it must be match too.
 */
function off(el, name, handler, scope) {
    let eventMap = ElementEventMap.get(el);
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
function wrapHandler(once, modifiers, el, name, handler, scope) {
    let filterModifiers = modifiers ? modifiers.filter(m => !GLOBAL_EVENT_MODIFIERS.includes(m)) : null;
    return function wrappedHandler(e) {
        if (filterModifiers && filterModifiers.length > 0) {
            let filterFn = EVENT_FILTER_FN[name];
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

},{}],91:[function(require,module,exports){
"use strict";
// This file cloned for https://github.com/pucelle/ff/blob/master/src/base/emitter.ts
// You may visit it to find more descriptions about the implemention.
Object.defineProperty(exports, "__esModule", { value: true });
class Emitter {
    constructor() {
        this.__events = new Map();
    }
    __ensureEvents(name) {
        let events = this.__events.get(name);
        if (!events) {
            this.__events.set(name, events = []);
        }
        return events;
    }
    on(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: false,
        });
    }
    once(name, listener, scope) {
        let events = this.__ensureEvents(name);
        events.push({
            listener,
            scope,
            once: true
        });
    }
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
    hasListener(name, listener, scope) {
        let events = this.__events.get(name);
        if (!listener) {
            return !!events && events.length > 0;
        }
        else if (events && listener) {
            for (let i = 0, len = events.length; i < len; i++) {
                let event = events[i];
                if (event.listener === listener && (!scope || event.scope === scope)) {
                    return true;
                }
            }
        }
        return false;
    }
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
    removeAllListeners() {
        this.__events = new Map();
    }
}
exports.Emitter = Emitter;

},{}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
var HTMLTokenType;
(function (HTMLTokenType) {
    HTMLTokenType[HTMLTokenType["StartTag"] = 0] = "StartTag";
    HTMLTokenType[HTMLTokenType["EndTag"] = 1] = "EndTag";
    HTMLTokenType[HTMLTokenType["Text"] = 2] = "Text";
})(HTMLTokenType = exports.HTMLTokenType || (exports.HTMLTokenType = {}));
const SELF_CLOSE_TAGS = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];
/**
 * Parse html codes to tokens.
 * After parsed, all comment was removed, and `\r\n\t` in text nodes was removed too.
 */
function parseToHTMLTokens(string) {
    const tagRE = /<!--[\s\S]*?-->|<([\w-]+)([\s\S]*?)\/?>|<\/[\w-]+>/g;
    let lastIndex = 0;
    let tokens = [];
    let match;
    while (match = tagRE.exec(string)) {
        let piece = match[0];
        if (match.index > lastIndex) {
            let text = util_1.trim(string.slice(lastIndex, match.index));
            if (text) {
                tokens.push({
                    type: HTMLTokenType.Text,
                    text
                });
            }
        }
        lastIndex = tagRE.lastIndex;
        if (piece[1] === '!') {
            continue;
        }
        else if (piece[1] === '/') {
            let tagName = piece.slice(2, -1);
            if (!SELF_CLOSE_TAGS.includes(tagName)) {
                tokens.push({
                    type: HTMLTokenType.EndTag,
                    tagName,
                });
            }
        }
        else {
            let tagName = match[1];
            let attributes = match[2];
            let selfClose = SELF_CLOSE_TAGS.includes(tagName);
            tokens.push({
                type: HTMLTokenType.StartTag,
                tagName,
                attributes,
                selfClose,
            });
            //`<tag />` -> `<tag></tag>`
            // Benchmark: https://jsperf.com/array-includes-vs-object-in-vs-set-has
            if (piece[piece.length - 2] === '/' && !selfClose) {
                tokens.push({
                    type: HTMLTokenType.EndTag,
                    tagName,
                });
            }
        }
    }
    if (lastIndex < string.length) {
        let text = util_1.trim(string.slice(lastIndex));
        if (text) {
            tokens.push({
                type: HTMLTokenType.Text,
                text: string.slice(lastIndex)
            });
        }
    }
    return tokens;
}
exports.parseToHTMLTokens = parseToHTMLTokens;
/**
 * Join tokens that parsed from `parseToHTMLTokens` to HTML codes.
 */
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

},{"./util":95}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeAnchorType;
(function (NodeAnchorType) {
    NodeAnchorType[NodeAnchorType["Next"] = 0] = "Next";
    NodeAnchorType[NodeAnchorType["Root"] = 1] = "Root";
    NodeAnchorType[NodeAnchorType["Parent"] = 2] = "Parent";
})(NodeAnchorType = exports.NodeAnchorType || (exports.NodeAnchorType = {}));
/**
 * Used for `RootPart` or `NodePart` to mark end position.
 * Please never move the command type anchor node, the whole document may be removed.
 */
class NodeAnchor {
    constructor(el, type) {
        this.el = el;
        this.type = type;
    }
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
/**
 * Use to cache rest nodes for component, or mark the range of a template output.
 * The nodes in it may be moved or removed, or insert more.
 * We need to makesure that what ever the inner nodes change,
 * we can still get nodes from the fixed start and end node.
 */
class NodeRange {
    constructor(fragment) {
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
        // The end node will never be moved.
        // It should be a fixed element, or a comment node of a child part.
        this.endNode = fragment.lastChild;
    }
    /** Can be used to get firstly parsed fragment, or reuse template nodes as a fragment. */
    getFragment() {
        let fragment;
        if (this.fragment) {
            fragment = this.fragment;
            this.fragment = null;
        }
        else {
            fragment = document.createDocumentFragment();
            fragment.append(...this.getNodes());
        }
        return fragment;
    }
    /** Cache nodes in a fragment and use them later. */
    cacheFragment() {
        this.fragment = this.getFragment();
    }
    /** Get nodes in range. */
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
}
exports.NodeRange = NodeRange;

},{}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class PageDataCacher {
    constructor(pageSize) {
        this.map = {}; // Need to get keys in order, so not use `Map`.
        this.requestingMap = new Map();
        this.pageSize = pageSize;
    }
    setDataGetter(dataGetter) {
        this.dataGetter = dataGetter;
    }
    getExistingData(startIndex, endIndex) {
        let startPageIndex = Math.floor(startIndex / this.pageSize); //49 -> 0, 50 -> 1
        let endPageIndex = Math.floor((endIndex - 1) / this.pageSize); // 50 -> 0, 51 -> 1
        let data = [];
        let nullValues;
        let fresh = true;
        for (let i = startPageIndex; i <= endPageIndex; i++) {
            let cacheItem = this.map[i];
            let items = cacheItem ? cacheItem.items : nullValues || (nullValues = util_1.repeatValue(null, this.pageSize));
            if (cacheItem && !cacheItem.fresh) {
                fresh = false;
            }
            if (i === startPageIndex && i === endPageIndex) {
                data.push(...items.slice(startIndex - startPageIndex * this.pageSize, endIndex - endPageIndex * this.pageSize));
            }
            else if (i === startPageIndex) {
                data.push(...items.slice(startIndex - startPageIndex * this.pageSize));
            }
            else if (i === endPageIndex) {
                data.push(...items.slice(0, endIndex - endPageIndex * this.pageSize));
            }
            else {
                data.push(...items);
            }
        }
        if (nullValues) {
            fresh = false;
        }
        return { data, fresh };
    }
    async getFreshData(startIndex, endIndex) {
        let startPageIndex = Math.floor(startIndex / this.pageSize); //49 -> 0, 50 -> 1
        let endPageIndex = Math.floor((endIndex - 1) / this.pageSize); // 50 -> 0, 51 -> 1
        let promises = [];
        for (let i = startPageIndex; i <= endPageIndex; i++) {
            let cacheItem = this.map[i];
            if (!cacheItem || !cacheItem.fresh) {
                promises.push(this.loadPageData(i));
            }
        }
        await Promise.all(promises);
        return this.getExistingData(startIndex, endIndex).data;
    }
    // It's very often that you load one page of data, and then still load this page after scrolled.
    // So we need to cache requests for pages before it returned.
    loadPageData(pageIndex) {
        if (this.requestingMap.has(pageIndex)) {
            return this.requestingMap.get(pageIndex);
        }
        let itemsPromise = this.dataGetter(pageIndex * this.pageSize, this.pageSize);
        if (itemsPromise instanceof Promise) {
            let promise = itemsPromise.then(items => {
                this.map[pageIndex] = {
                    items: [...items],
                    fresh: true
                };
                this.requestingMap.delete(pageIndex);
            });
            this.requestingMap.set(pageIndex, promise);
            return promise;
        }
        else {
            this.map[pageIndex] = {
                items: [...itemsPromise],
                fresh: true
            };
            return Promise.resolve();
        }
    }
    // `moveRight` can be negative.
    // Not handle tatal count and slicing last page data,
    // which can be handled inside `LiveRepeat` directivve.
    moveData(index, moveRight) {
        if (moveRight === 0) {
            return;
        }
        if (moveRight > 0) {
            this.moveDataRight(index, moveRight);
        }
        else {
            this.moveDataLeft(index, -moveRight);
        }
    }
    // `count` will never be `0`
    moveDataRight(index, count) {
        let pageIndex = Math.floor(index / this.pageSize);
        let keys = Object.keys(this.map).map(Number);
        let lastGeneratedPageIndex = -1;
        let unUsedKeys = new Set();
        for (let i = keys.length - 1; i >= 0; i--) {
            let key = keys[i];
            if (key < pageIndex) {
                continue;
            }
            unUsedKeys.add(key);
            let leftPageIndex = key + Math.floor(count / this.pageSize);
            let rightPageIndex = key + Math.ceil(count / this.pageSize);
            if (rightPageIndex !== lastGeneratedPageIndex) {
                let rightPageStartIndex = rightPageIndex * this.pageSize - count;
                let generated = this.generateNewCacheItem(rightPageIndex, rightPageStartIndex, index, index);
                if (generated) {
                    unUsedKeys.delete(rightPageIndex);
                }
            }
            if (leftPageIndex !== rightPageIndex) {
                let leftPageStartIndex = leftPageIndex * this.pageSize - count;
                let generated = this.generateNewCacheItem(leftPageIndex, leftPageStartIndex, index, index);
                if (generated) {
                    unUsedKeys.delete(leftPageIndex);
                }
            }
            lastGeneratedPageIndex = leftPageIndex;
        }
        // Handle rest items in `pageIndex`
        if (lastGeneratedPageIndex > pageIndex) {
            let generated = this.generateNewCacheItem(pageIndex, pageIndex * this.pageSize - count, index, index);
            if (generated) {
                unUsedKeys.delete(pageIndex);
            }
        }
        for (let key of unUsedKeys) {
            delete this.map[key];
        }
    }
    // Will copy values whose index less than `moveStartIndex` to the generated items.
    // The value whose index less than `nullStartIndex` will be set by `null`.
    generateNewCacheItem(pageIndex, index, moveStartIndex, nullStartIndex) {
        let startPageIndex = Math.floor(moveStartIndex / this.pageSize);
        let haveItemsFromMovement = index + this.pageSize > nullStartIndex;
        let haveRestItemsInPageIndex = pageIndex === startPageIndex && this.map[pageIndex] && moveStartIndex > startPageIndex * this.pageSize;
        if (!haveItemsFromMovement && !haveRestItemsInPageIndex) {
            return false;
        }
        let newItems;
        if (index < nullStartIndex) {
            newItems = [...util_1.repeatValue(null, nullStartIndex - index), ...this.getExistingData(nullStartIndex, index + this.pageSize).data];
        }
        else {
            newItems = this.getExistingData(index, index + this.pageSize).data;
        }
        // If is the first page, move start fix items into new items.
        if (pageIndex === startPageIndex) {
            let indexToSlice = moveStartIndex - startPageIndex * this.pageSize;
            newItems = [
                ...this.getExistingData(startPageIndex * this.pageSize, moveStartIndex).data,
                ...newItems.slice(indexToSlice)
            ];
        }
        if (this.hasAnyItem(newItems)) {
            this.map[pageIndex] = {
                items: newItems,
                fresh: this.hasNoNull(newItems)
            };
            return true;
        }
        return false;
    }
    // `count` > 0
    moveDataLeft(index, count) {
        let pageIndex = Math.floor(index / this.pageSize);
        let keys = Object.keys(this.map).map(Number);
        let lastGeneratedPageIndex = -1;
        let unUsedKeys = new Set();
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key < pageIndex) {
                continue;
            }
            unUsedKeys.add(key);
            let leftPageIndex = key - Math.ceil(count / this.pageSize);
            let rightPageIndex = key - Math.floor(count / this.pageSize);
            if (leftPageIndex >= 0 && leftPageIndex !== lastGeneratedPageIndex) {
                let leftPageStartIndex = leftPageIndex * this.pageSize + count;
                let generated = this.generateNewCacheItem(leftPageIndex, leftPageStartIndex, index, index + count);
                if (generated) {
                    unUsedKeys.delete(leftPageIndex);
                }
            }
            if (rightPageIndex >= 0 && rightPageIndex !== leftPageIndex) {
                let rightPageStartIndex = rightPageIndex * this.pageSize + count;
                let generated = this.generateNewCacheItem(rightPageIndex, rightPageStartIndex, index, index + count);
                if (generated) {
                    unUsedKeys.delete(rightPageIndex);
                }
            }
            lastGeneratedPageIndex = rightPageIndex;
        }
        for (let key of unUsedKeys) {
            delete this.map[key];
        }
    }
    hasNoNull(items) {
        return items.every(item => item !== null);
    }
    hasAnyItem(items) {
        return items.some(item => item !== null);
    }
    clear() {
        this.map = {};
    }
    // Compare to clear all the cache, here it can keep showing old results,
    // and replace them when data prepared.
    beStale() {
        for (let cacheItem of Object.values(this.map)) {
            cacheItem.fresh = false;
        }
    }
}
exports.PageDataCacher = PageDataCacher;

},{"./util":95}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trim(text) {
    return text.replace(/^[\r\n\t]+|[\r\n\t]+$/g, '');
}
exports.trim = trim;
function cloneAttributes(el, attributes) {
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
exports.cloneAttributes = cloneAttributes;
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
/** Exclude paddings from `getBoundingClientRect` result. */
class ScrollerClientRect {
    constructor(scroller) {
        let rawRect = scroller.getBoundingClientRect();
        let style = getComputedStyle(scroller);
        let paddingTop = parseFloat(style.paddingTop) || 0;
        let paddingRight = parseFloat(style.paddingRight) || 0;
        let paddingBottom = parseFloat(style.paddingTop) || 0;
        let paddingLeft = parseFloat(style.paddingLeft) || 0;
        this.rect = {
            top: rawRect.top + paddingTop,
            right: rawRect.right - paddingRight,
            bottom: rawRect.bottom - paddingBottom,
            left: rawRect.left + paddingLeft,
            width: rawRect.width - paddingLeft - paddingRight,
            height: rawRect.height - paddingTop - paddingBottom
        };
    }
    /** Returns if the element with `rect` is above the scroller. */
    isRectAbove(rect) {
        return rect.bottom <= this.rect.top;
    }
    /** Returns if the element with `rect` is below the scroller. */
    isRectBelow(rect) {
        return rect.top >= this.rect.bottom;
    }
    /** Returns if the element with `rect` is in scroller or cross with the scroller. */
    isRectIn(rect) {
        return !this.isRectAbove(rect) && !this.isRectBelow(rect);
    }
}
exports.ScrollerClientRect = ScrollerClientRect;
/** Used to throttle scroll event to trigger at most once in each animation frame. */
function throttleByAnimationFrame(fn) {
    let frameId = null;
    return function (...args) {
        if (!frameId) {
            frameId = requestAnimationFrame(() => {
                frameId = null;
            });
            fn(...args);
        }
    };
}
exports.throttleByAnimationFrame = throttleByAnimationFrame;
function repeatValue(value, count) {
    let values = [];
    for (let i = 0; i < count; i++) {
        values.push(value);
    }
    return values;
}
exports.repeatValue = repeatValue;

},{}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../template");
const watcher_1 = require("../watcher");
/** Used to watch and update template result generated from `templateFn`. */
class WatchedTemplate {
    constructor(context, templateFn, item, index) {
        this.context = context;
        this.templateFn = templateFn;
        this.item = item;
        this.index = index;
        this.parseAndWatchTemplate();
    }
    parseAndWatchTemplate() {
        let { templateFn } = this;
        let watchFn = () => {
            let result = templateFn(this.item, this.index);
            return result;
        };
        let onUpdate = (result) => {
            // Note that the template update in the watcher updating queue.
            if (this.template.canMergeWith(result)) {
                this.template.merge(result);
            }
            else {
                let newTemplate = new template_1.Template(result, this.context);
                this.template.range.startNode.before(newTemplate.range.getFragment());
                this.template.remove();
                this.template = newTemplate;
            }
        };
        this.watcher = new watcher_1.Watcher(watchFn, onUpdate);
        this.template = new template_1.Template(this.watcher.value, this.context);
    }
    updateIndex(index) {
        this.index = index;
        this.watcher.__updateImmediately();
    }
    update(item, index) {
        this.item = item;
        this.index = index;
        this.watcher.__updateImmediately();
    }
    remove() {
        this.template.remove();
        this.watcher.disconnect();
    }
}
exports.WatchedTemplate = WatchedTemplate;

},{"../template":113,"../watcher":123}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implement data constructor for two way map:
 * L -> R[]
 * R -> L[]
 */
// Benchmark 1: https://jsperf.com/set-always-add-or-test-if-has-first
// Benchmark 2: https://jsperf.com/is-merge-from-small-to-large-set-be-faster
class Weak2WayMap {
    constructor() {
        this.lm = new WeakMap();
        this.rm = new WeakMap();
    }
    updateFromLeft(l, rs) {
        let oldRs = this.lm.get(l);
        if (!oldRs || oldRs.size === 0) {
            for (let r of rs) {
                this.addRightLeftMap(r, l);
            }
        }
        else {
            // Very high rate no need to add or remove.
            // So we test if should add or remove firstly.
            for (let r of rs) {
                if (!oldRs.has(r)) {
                    this.addRightLeftMap(r, l);
                }
            }
            for (let r of oldRs) {
                if (!rs.has(r)) {
                    this.removeRightLeftMap(r, l);
                }
            }
        }
        this.lm.set(l, rs);
    }
    addRightLeftMap(r, l) {
        let ls = this.rm.get(r);
        if (!ls) {
            ls = new Set();
            this.rm.set(r, ls);
        }
        ls.add(l);
    }
    removeRightLeftMap(r, l) {
        let ls = this.rm.get(r);
        if (ls) {
            ls.delete(l);
        }
    }
    getFromRight(r) {
        return this.rm.get(r);
    }
    clearFromLeft(l) {
        let rs = this.lm.get(l);
        if (rs) {
            for (let r of rs) {
                this.removeRightLeftMap(r, l);
            }
            this.lm.delete(l);
        }
    }
    clearFromRight(r) {
        let ls = this.rm.get(r);
        if (ls) {
            for (let l of ls) {
                this.removeLeftRightMap(l, r);
            }
            this.rm.delete(r);
        }
    }
    removeLeftRightMap(l, r) {
        let rs = this.lm.get(l);
        if (rs) {
            rs.delete(r);
        }
    }
}
exports.Weak2WayMap = Weak2WayMap;

},{}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implement data constructor for two way property map:
 * L -> { R: [prop] }
 * R -> { prop: [L] }
 */
// Benchmark refere to `wrek-2way-map`.
class Weak2WayPropMap {
    constructor() {
        this.lm = new WeakMap();
        this.rm = new WeakMap();
    }
    updateFromLeft(l, rps) {
        let oldRps = this.lm.get(l);
        if (!oldRps || oldRps.size === 0) {
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
                    this.removeRightLeftMap(r, props, l);
                }
            }
        }
        this.lm.set(l, rps);
    }
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
    removeRightLeftMap(r, props, l) {
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
    getFromRight(r, prop) {
        let pls = this.rm.get(r);
        if (pls) {
            return pls.get(prop);
        }
        return undefined;
    }
    clearFromLeft(l) {
        let rps = this.lm.get(l);
        if (rps) {
            for (let [r, props] of rps) {
                this.removeRightLeftMap(r, props, l);
            }
            this.lm.delete(l);
        }
    }
    clearFromRight(r) {
        let pls = this.rm.get(r);
        if (pls) {
            for (let ls of pls.values()) {
                for (let l of ls) {
                    this.removeLeftRightMap(l, r);
                }
            }
            // Comment this line very important:
            // R may be connect again, so we can restore `L -> R -> prop` from the `R -> prop -> L`.
            // Don't worry, it doesn't prevent GC for `R`.
            //this.rm.delete(r)
        }
    }
    removeLeftRightMap(l, r) {
        let rps = this.lm.get(l);
        if (rps) {
            rps.delete(r);
        }
    }
    restoreFromRight(r) {
        let pls = this.rm.get(r);
        if (pls) {
            for (let [prop, ls] of pls.entries()) {
                for (let l of ls) {
                    this.addLeftRightMap(l, r, prop);
                }
            }
        }
    }
    addLeftRightMap(l, r, prop) {
        let rps = this.lm.get(l);
        if (!rps) {
            rps = new Map();
            this.lm.set(l, rps);
        }
        let ps = rps.get(r);
        if (!ps) {
            ps = new Set();
            rps.set(r, ps);
        }
        ps.add(prop);
    }
}
exports.Weak2WayPropMap = Weak2WayPropMap;

},{}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weak_2way_map_1 = require("../libs/weak-2way-map");
const weak_2way_prop_map_1 = require("../libs/weak-2way-prop-map");
/**
 * To know when rendering component, which objects we used.
 * And to know when object changed, which component or watcher should be update.
 * Otherwise we need to remove from left when component disconnected.
 *
 * If the dependent objects were removed, the component or watchers should be updated, And it will clear dependencies before.
 * So cached the objects will not prevent their GC.
 */
const depMap = new weak_2way_map_1.Weak2WayMap();
/**
 * To know when rendering component, which component and what's the properties it called.
 * And to know when specified property in object changed, which component should be update.
 *
 * Why we don't observe properties for all the object but only component?
 * In fact I do so at beginning, until one day I found 1M dependencies in my app.
 * There is no memory leak, my app just may load more than 20K data records.
 * Otherwise, now we are using not 100% precise updating, and update whole component part for once.
 * no need to observe every details.
 */
const comPropMap = new weak_2way_prop_map_1.Weak2WayPropMap();
let updating = null;
// a stack is required, `watchImmediately` need to be update immediately,
// but an component may be updating recently.
const updatingStack = [];
/** Called when start rendering proxied component or running watch functions. */
function startUpdating(upt) {
    if (updating) {
        updatingStack.push(updating);
    }
    updating = {
        target: upt,
        deps: new Set(),
        depPropMap: new Map()
    };
}
exports.startUpdating = startUpdating;
/** Called when complete rendering component or complete running watch functions. */
function endUpdating(_upt) {
    if (updating) {
        depMap.updateFromLeft(updating.target, updating.deps);
        comPropMap.updateFromLeft(updating.target, updating.depPropMap);
        updating = updatingStack.pop() || null;
    }
}
exports.endUpdating = endUpdating;
/** Returns if is updating recently. */
function isUpdating() {
    return !!updating;
}
exports.isUpdating = isUpdating;
/** Called when start rendering component or running watch functions, or component and watcher disconnected. */
function clearDependencies(updating) {
    depMap.clearFromLeft(updating);
    comPropMap.clearFromLeft(updating);
}
exports.clearDependencies = clearDependencies;
/**
 * Called when don't want to obserse object or component changing.
 * In fact `dep` can only be component target.
 */
function clearAsDependency(dep) {
    depMap.clearFromRight(dep);
    comPropMap.clearFromRight(dep);
}
exports.clearAsDependency = clearAsDependency;
// when one component or watcher was disconnected and connect again,
// it can easily restore it's dependencies by `update()`,
// But an dependency, we can't restore it's influenced components or watchers .
// So we keep the `dep -> prop -> upt` map, and restore `upt -> dep -> prop` map when `dep` connected again.
/** When one component or watcher connected again, here to restore the what it can update. */
function restoreAsDependency(dep) {
    comPropMap.restoreFromRight(dep);
}
exports.restoreAsDependency = restoreAsDependency;
// We split adding dependencies to two steps:
//   1. Collect dependencies, cache them.
//   2. Merge them into dependency tree.
// 
// May use one object dependency for moren than 100 times in one updating,
// no need to update dependency tree for each calling.
// 
// Otherwise, a very high rate the dependencies are no need to update.
/** Called when in object's or array's proxy.get. */
function mayAddDependency(dep) {
    if (!updating) {
        return;
    }
    updating.deps.add(dep);
}
exports.mayAddDependency = mayAddDependency;
/** Called when in component's proxy.get. */
function mayAddComDependency(com, prop) {
    if (!updating) {
        return;
    }
    let propertySet = updating.depPropMap.get(com);
    if (!propertySet) {
        propertySet = new Set();
        updating.depPropMap.set(com, propertySet);
    }
    propertySet.add(prop);
}
exports.mayAddComDependency = mayAddComDependency;
/** Called when in component's proxy.set. */
function notifyComPropertySet(com, prop) {
    let upts = comPropMap.getFromRight(com, prop);
    if (upts) {
        for (let upt of upts) {
            upt.update();
        }
    }
}
exports.notifyComPropertySet = notifyComPropertySet;
/** Called when in array's or object's proxy.set. */
function notifyObjectSet(obj) {
    let upts = depMap.getFromRight(obj);
    if (upts) {
        for (let upt of upts) {
            upt.update();
        }
    }
}
exports.notifyObjectSet = notifyObjectSet;

},{"../libs/weak-2way-map":97,"../libs/weak-2way-prop-map":98}],100:[function(require,module,exports){
"use strict";
// Proxy benchmark: https://jsperf.com/es6-proxy/11
// Proxy getting and setting are always 50x-100x slower than plain object.
// Proxy can't apply any compile optimizing, it equals always call a dynamic function.
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("./shared");
exports.observeTarget = shared_1.observeTarget;
exports.targetMap = shared_1.targetMap;
exports.proxyMap = shared_1.proxyMap;
var observe_1 = require("./observe");
exports.observe = observe_1.observe;
var observe_com_1 = require("./observe-com");
exports.observeComTarget = observe_com_1.observeComTarget;
var dependency_1 = require("./dependency");
exports.startUpdating = dependency_1.startUpdating;
exports.endUpdating = dependency_1.endUpdating;
exports.clearDependencies = dependency_1.clearDependencies;
exports.clearAsDependency = dependency_1.clearAsDependency;
exports.restoreAsDependency = dependency_1.restoreAsDependency;
var observe_getter_1 = require("./observe-getter");
exports.observeGetter = observe_getter_1.observeGetter;

},{"./dependency":99,"./observe":106,"./observe-com":102,"./observe-getter":103,"./shared":107}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const shared_1 = require("./shared");
const ARRAY_SET_METHODS = ['push', 'pop', 'unshift', 'splice', 'shift', 'sort'];
function observeArrayTarget(arr) {
    let proxy = new Proxy(arr, proxyHandler);
    shared_1.proxyMap.set(arr, proxy);
    shared_1.proxyMap.set(proxy, proxy);
    shared_1.targetMap.set(proxy, arr);
    return proxy;
}
exports.observeArrayTarget = observeArrayTarget;
const proxyHandler = {
    get(arr, prop) {
        let value = arr[prop];
        let type = typeof value;
        if (arr.hasOwnProperty(prop)) {
            dependency_1.mayAddDependency(arr);
            if (value && type === 'object') {
                if (shared_1.proxyMap.has(value)) {
                    return shared_1.proxyMap.get(value);
                }
                else if (dependency_1.isUpdating()) {
                    return shared_1.observeTarget(value);
                }
            }
        }
        else if (type === 'function') {
            dependency_1.mayAddDependency(arr);
            if (ARRAY_SET_METHODS.includes(prop)) {
                dependency_1.notifyObjectSet(arr);
            }
        }
        return value;
    },
    set(arr, prop, value) {
        arr[prop] = value;
        dependency_1.notifyObjectSet(arr);
        return true;
    },
    has(arr, prop) {
        dependency_1.mayAddDependency(arr);
        return prop in arr;
    },
    deleteProperty(arr, prop) {
        if (arr.hasOwnProperty(prop)) {
            dependency_1.mayAddDependency(arr);
            return delete arr[prop];
        }
        else {
            return true;
        }
    }
};

},{"./dependency":99,"./shared":107}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const shared_1 = require("./shared");
function observeComTarget(com) {
    let proxy = new Proxy(com, proxyHandler);
    shared_1.proxyMap.set(com, proxy);
    shared_1.proxyMap.set(proxy, proxy);
    shared_1.targetMap.set(proxy, com);
    return proxy;
}
exports.observeComTarget = observeComTarget;
const proxyHandler = {
    get(com, prop) {
        let value = com[prop];
        // It doesn't check if own property exists here.
        // It's common that to declare `property!: Type` in Typescript,
        // Which has no initialize value but still need to be observed.
        dependency_1.mayAddComDependency(com, prop);
        if (value && typeof value === 'object') {
            if (shared_1.proxyMap.has(value)) {
                return shared_1.proxyMap.get(value);
            }
            // Here means it will only observe more data when updating.
            // If we choose to always observe every value, so many proxies will be generated.
            // Only generate new proxy only when updating still have a little problem.
            // If we cached some not proxy values, modify them will not cause rerender.
            else if (dependency_1.isUpdating()) {
                return shared_1.observeTarget(value);
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
        dependency_1.mayAddComDependency(com, prop);
        return prop in com;
    },
    deleteProperty(com, prop) {
        if (com.hasOwnProperty(prop)) {
            dependency_1.mayAddComDependency(com, prop);
            return delete com[prop];
        }
        else {
            return true;
        }
    }
};

},{"./dependency":99,"./shared":107}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * After think more about getter, we decided to drop supports for observing getters automatically.
 * The main reason is when we observe get callings in proxy, we can't distinguish if it's a normal property
 * or a getter calling immediately, but we must to follow prototype chains to find the getter descriptor,
 * and call the getter function manually by: `descriptor.get.call(objectProxy)`.

 * You can still check getter descriptor and call it with proxied object manually.
 */
function observeGetter(obj, getterProperty) {
    let descriptor = getPropertyDescriptor(obj, getterProperty);
    if (descriptor && descriptor.get) {
        return descriptor.get.call(obj);
    }
    else {
        return obj[getterProperty];
    }
}
exports.observeGetter = observeGetter;
function getPropertyDescriptor(obj, property) {
    let proto = obj;
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

},{}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const shared_1 = require("./shared");
function observePlainObjectTarget(obj) {
    let proxy = new Proxy(obj, proxyHandler);
    shared_1.proxyMap.set(obj, proxy);
    shared_1.proxyMap.set(proxy, proxy);
    shared_1.targetMap.set(proxy, obj);
    return proxy;
}
exports.observePlainObjectTarget = observePlainObjectTarget;
const proxyHandler = {
    get(obj, prop) {
        let value = obj[prop];
        if (obj.hasOwnProperty(prop)) {
            dependency_1.mayAddDependency(obj);
            if (value && typeof value === 'object') {
                if (shared_1.proxyMap.has(value)) {
                    return shared_1.proxyMap.get(value);
                }
                else if (dependency_1.isUpdating()) {
                    return shared_1.observeTarget(value);
                }
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
        dependency_1.mayAddDependency(obj);
        return prop in obj;
    },
    deleteProperty(obj, prop) {
        if (obj.hasOwnProperty(prop)) {
            dependency_1.mayAddDependency(obj);
            return delete obj[prop];
        }
        else {
            return true;
        }
    }
};

},{"./dependency":99,"./shared":107}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const shared_1 = require("./shared");
const MAP_SET_METHODS = ['add', 'set', 'delete', 'clear'];
function observeMapOrSetTarget(ms) {
    let proxy = new Proxy(ms, proxyHandler);
    shared_1.proxyMap.set(ms, proxy);
    shared_1.proxyMap.set(proxy, proxy);
    shared_1.targetMap.set(proxy, ms);
    return proxy;
}
exports.observeMapOrSetTarget = observeMapOrSetTarget;
// A potential issue in map and set:
// We may add an item to a set, and then test if proxy of item in set,
// or add proxy of item and cause it has duplicate values in set.
// We will fix this when we indeed meet this.
const proxyHandler = {
    get(ms, prop) {
        let value = ms[prop];
        let type = typeof value;
        if (!ms.hasOwnProperty(prop) && type === 'function') {
            // Required, pass proxy as this to native Set or Map methods will cause error.
            value = value.bind(ms);
            dependency_1.mayAddDependency(ms);
            if (MAP_SET_METHODS.includes(prop)) {
                dependency_1.notifyObjectSet(ms);
            }
        }
        return value;
    }
};

},{"./dependency":99,"./shared":107}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
/**
 * Begin to track `value`'s property settings, and update components which use `value`'s properties when needed.
 * Note that if returns a proxy, it can be used like original object, but it's not it, compare with `===` will return `false`.
 * So it may cause some issue if you cached the original object and compare it with observed one.
 * Normally you don't need to call this, component's properties will be observed automatically after used when rendering.
 * Once an object was observed, it can't be revoked.
 */
function observe(value) {
    if (value && typeof value === 'object') {
        let proxy = shared_1.proxyMap.get(value);
        if (proxy) {
            return proxy;
        }
        return shared_1.observeTarget(value);
    }
    else {
        return value;
    }
}
exports.observe = observe;

},{"./shared":107}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_object_1 = require("./observe-object");
const observe_array_1 = require("./observe-array");
const observe_set_or_map_1 = require("./observe-set-or-map");
/** `target -> proxy` and `proxy -> proxy` */
exports.proxyMap = new WeakMap();
/** `proxy -> target` */
exports.targetMap = new WeakMap();
const originalToString = Object.prototype.toString;
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

},{"./observe-array":101,"./observe-object":104,"./observe-set-or-map":105}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let componentSet = new Set();
let watcherSet = new Set();
let renderCompleteCallbacks = [];
let willUpdate = false;
let updatingComponents = false;
let watchersToUpdate = [];
let componentsToUpdate = [];
/** @hidden */
function enqueueComponentUpdate(com) {
    // If updating component trigger another watcher or component, we should update it in the same update function.
    if (!componentSet.has(com)) {
        componentSet.add(com);
        componentsToUpdate.push(com);
    }
    if (!willUpdate) {
        enqueueUpdate();
    }
}
exports.enqueueComponentUpdate = enqueueComponentUpdate;
/** @hidden */
function enqueueWatcherUpdate(watcher) {
    if (updatingComponents) {
        watcher.__updateImmediately();
    }
    else {
        // If updating watcher trigger another watcher or component, we should update it in the same update function.
        if (!watcherSet.has(watcher)) {
            watcherSet.add(watcher);
            watchersToUpdate.push(watcher);
        }
        if (!willUpdate) {
            enqueueUpdate();
        }
    }
}
exports.enqueueWatcherUpdate = enqueueWatcherUpdate;
/**
 * Call `callback` after rendered all the components in followed micro task queues.
 * Note that it was called before `renderComplete`.
 */
function onRenderComplete(callback) {
    renderCompleteCallbacks.push(callback);
    if (!willUpdate) {
        enqueueUpdate();
    }
}
exports.onRenderComplete = onRenderComplete;
/**
 * Returns a promise which will be resolved after rendered all the components in micro task queues.
 * Note that it was called after `onRenderComplete`.
 * So if you are implementing a common component, using `onRenderComplete` would be better.
 * Please don't call `await renderComplete()` for two times,
 * The second one will be called in a new `requestAnimationFrame` and browser will render before it.
 */
function renderComplete() {
    return new Promise(resolve => {
        onRenderComplete(resolve);
    });
}
exports.renderComplete = renderComplete;
function enqueueUpdate() {
    // Why not using `Promise.resolve().then` to start a micro stask:
    // When initialize a component from `connectedCallback`, it's child nodes is not ready,
    // even in the following micro task queue.
    // But we need `<slot>` elemnts to be prepared before updating.
    // Otherwise it's very frequently to trigger updating from data changing ,
    // but then more data changes in micro tasks and trigger new updating.
    requestAnimationFrame(update);
    willUpdate = true;
}
async function update() {
    let updatedTimesMap = new Map();
    do {
        // At beginning, we update watchers firstly and then components,
        // because we want to reduce the sencories that data changing in watchers cause components to updated.
        // But later we relaized the watchers were updated most possible because the components updated and applied `:prop` or `:props`,
        // And updating watchers later can ensure components which requires the watched properties are rendered.
        // So finally we decided to update watchers before components,
        // And if components is updating, we update watchers immediately.
        for (let i = 0; i < watchersToUpdate.length; i++) {
            let watcher = watchersToUpdate[i];
            // Delete it so it can be added again.
            watcherSet.delete(watcher);
            let updatedTimes = updatedTimesMap.get(watcher) || 0;
            updatedTimesMap.set(watcher, updatedTimes + 1);
            if (updatedTimes > 3) {
                console.warn(`Watcher "${watcher.toString()}" may change values in the watcher callback and cause infinite updating!`);
            }
            else {
                try {
                    watcher.__updateImmediately();
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
        watchersToUpdate = [];
        updatingComponents = true;
        for (let i = 0; i < componentsToUpdate.length; i++) {
            let com = componentsToUpdate[i];
            componentSet.delete(com);
            let updatedTimes = updatedTimesMap.get(com) || 0;
            updatedTimesMap.set(com, updatedTimes + 1);
            if (updatedTimes > 3) {
                let html = com.el.outerHTML;
                let shortHTML = html.length > 100 ? html.slice(0, 100) + '...' : html;
                console.warn(`Component with element "${shortHTML}" may change values in the render function and cause infinite updating!`);
            }
            else {
                try {
                    com.__updateImmediately();
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
        componentsToUpdate = [];
        updatingComponents = false;
        // If elements were added when updating, they will be connected in micro task queue.
        // Here we must wait them to be instantiated.
        await Promise.resolve();
    } while (componentsToUpdate.length > 0 || watchersToUpdate.length > 0);
    willUpdate = false;
    // Normally `onRenderComplete` should not enqueue more watchers and components.
    // But if it enqueued, run them in next updating.
    let callbacks = renderCompleteCallbacks;
    renderCompleteCallbacks = [];
    for (let callback of callbacks) {
        callback();
    }
}

},{}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
const component_1 = require("./component");
const watcher_1 = require("./watcher");
const directives_1 = require("./directives");
function render(codesOrRenderFn, context = null, onUpdate) {
    if (typeof codesOrRenderFn === 'function') {
        return renderAndWatch(codesOrRenderFn, context, onUpdate);
    }
    else {
        return renderCodes(codesOrRenderFn, context);
    }
}
exports.render = render;
function renderCodes(codes, context = null) {
    if (codes instanceof directives_1.DirectiveResult) {
        codes = template_1.html `${codes}`;
    }
    let template = new template_1.Template(codes, context);
    let fragment = template.range.getFragment();
    return { template, fragment };
}
function renderAndWatch(renderFn, context = null, onUpdate) {
    let template;
    let unwatch = (context || watcher_1.globalWatcherGroup).watchImmediately(renderFn, (result) => {
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
        fragment: template.range.getFragment(),
        unwatch,
    };
}
function renderComponent(codesOrFn, context = null, onUpdate) {
    let template;
    let fragment;
    let component = null;
    let unwatch = null;
    if (typeof codesOrFn === 'function') {
        ({ fragment, unwatch } = renderAndWatch(codesOrFn, context, onUpdate));
    }
    else {
        ({ fragment, template } = render(codesOrFn, context));
    }
    let firstElement = fragment.firstElementChild;
    if (firstElement) {
        let Com = component_1.getComponentConstructor(firstElement.localName);
        if (Com) {
            component = component_1.createComponent(firstElement, Com);
        }
    }
    if (unwatch) {
        return { component, unwatch };
    }
    else {
        return { component, template: template };
    }
}
exports.renderComponent = renderComponent;
/**
 * Append a fragment or element into target element or selector.
 * Returns the first element in the fragment.
 * It's a helper function to use like `appendTo(render(...), document.body)`.
 * @param fragment The fragment to append.
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

},{"./component":77,"./directives":84,"./template":113,"./watcher":123}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `attr=${...}`, set attribute value.
 */
class AttrPart {
    constructor(el, name, value) {
        this.el = el;
        this.name = name;
        this.setValue(value);
    }
    setValue(value) {
        value === null || value === undefined ? '' : String(value);
        this.el.setAttribute(this.name, value);
    }
    update(value) {
        this.setValue(value);
    }
}
exports.AttrPart = AttrPart;

},{}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bindings_1 = require("../bindings");
/**
 * Transfer arguments to a fixed type binding module, e.g.:
 * `:class=${...}`, `:style=${...}`, `:ref="..."`.
 */
class FixedBindingPart {
    constructor(el, name, value, context) {
        let dotIndex = name.indexOf('.');
        let bindingName = dotIndex > -1 ? name.slice(0, dotIndex) : name;
        let bindingModifiers = dotIndex > -1 ? name.slice(dotIndex + 1).split('.') : undefined;
        let result = new bindings_1.BindingResult(bindingName, value);
        this.binding = bindings_1.createBindingFromResult(el, context, result, bindingModifiers);
    }
    update(value) {
        this.binding.update(value);
    }
}
exports.FixedBindingPart = FixedBindingPart;
/**
 * Transfer arguments to binding module, used in:
 * `show(...)`, `hide(...)`, `cache(...)`.
 */
class BindingPart {
    constructor(el, value, context) {
        this.binding = null;
        this.name = null;
        this.el = el;
        this.context = context;
        if (value instanceof bindings_1.BindingResult) {
            this.name = value.name;
            this.binding = bindings_1.createBindingFromResult(el, context, value);
            this.binding.update(...value.args);
        }
    }
    update(value) {
        if (value instanceof bindings_1.BindingResult) {
            if (value.name === this.name) {
                this.binding.update(...value.args);
            }
            else {
                this.removeBinding();
                this.binding = bindings_1.createBindingFromResult(this.el, this.context, value);
            }
        }
        else {
            this.removeBinding();
        }
    }
    removeBinding() {
        if (this.binding) {
            this.name = null;
            this.binding.remove();
            this.binding = null;
        }
    }
}
exports.BindingPart = BindingPart;

},{"../bindings":67}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../component");
const dom_event_1 = require("../libs/dom-event");
/**
 * `<div @click=${...}>` to register event on element.
 * `<com @event=${...}>` to register event on component.
 * `<com @@event=${...}>` to register event always on element.
 */
class EventPart {
    constructor(el, name, handler, context) {
        this.el = el;
        this.name = name[0] === '@' ? name.slice(1) : name;
        this.context = context;
        this.isComEvent = el.localName.includes('-') && name[0] !== '@';
        this.update(handler);
        this.bindListener();
    }
    update(handler) {
        if (typeof handler !== 'function') {
            throw new Error(`Failed to register listener at "<${this.el.localName} @${this.name}='${handler}'">, listener is not a function`);
        }
        // Should here compare handler `toString` result and not update if they are the same?
        // This sames required, because it's frequently to meet handlers like `() => ...`.
        // But the truth is that we must update the handler,
        // because the scoped variables that called in these handlers may changed.
        this.handler = handler;
    }
    bindListener() {
        if (this.isComEvent) {
            let com = component_1.getComponent(this.el);
            if (com) {
                this.bindComListener(com);
            }
            else {
                component_1.onComponentCreatedAt(this.el, this.bindComListener.bind(this));
            }
        }
        else {
            dom_event_1.on(this.el, this.name, this.triggerHandler, this);
        }
    }
    bindComListener(com) {
        com.on(this.name, this.triggerHandler, this);
    }
    triggerHandler(...args) {
        this.handler.call(this.context, ...args);
    }
    // If element was removed, it implies that the component was removed too.
    // No need to off listener.
    remove() { }
}
exports.EventPart = EventPart;

},{"../component":77,"../libs/dom-event":90}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_part_1 = require("./node-part");
exports.NodePart = node_part_1.NodePart;
var template_1 = require("./template");
exports.Template = template_1.Template;
var template_result_1 = require("./template-result");
exports.TemplateResult = template_result_1.TemplateResult;
exports.html = template_result_1.html;
exports.css = template_result_1.css;
exports.svg = template_result_1.svg;
exports.text = template_result_1.text;

},{"./node-part":115,"./template":121,"./template-result":120}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `?checked=${...}`, remove the attribute if expression returns false.
 */
class MayAttrPart {
    constructor(el, name, value) {
        this.el = el;
        this.name = name;
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
    update(value) {
        this.setValue(value);
    }
    remove() { }
}
exports.MayAttrPart = MayAttrPart;

},{}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_result_1 = require("./template-result");
const template_1 = require("./template");
const directives_1 = require("../directives");
const util_1 = require("../libs/util");
var ChildContentType;
(function (ChildContentType) {
    ChildContentType[ChildContentType["Templates"] = 0] = "Templates";
    ChildContentType[ChildContentType["Directive"] = 1] = "Directive";
    ChildContentType[ChildContentType["Text"] = 2] = "Text";
})(ChildContentType || (ChildContentType = {}));
class NodePart {
    constructor(anchor, value, context) {
        this.templates = null;
        this.directive = null;
        this.textNode = null;
        this.contentType = null;
        this.anchor = anchor;
        this.context = context;
        this.update(value);
    }
    update(value) {
        let contentType = this.getContentType(value);
        if (contentType !== this.contentType) {
            this.clearContent();
            this.contentType = contentType;
        }
        if (contentType === ChildContentType.Directive) {
            this.updateDirective(value);
        }
        else if (Array.isArray(value)) {
            this.beTemplateResults(value);
            this.updateTemplates(value);
        }
        else if (contentType === ChildContentType.Templates) {
            this.updateTemplates([value]);
        }
        else {
            this.updateText(value);
        }
    }
    getContentType(value) {
        if (value instanceof directives_1.DirectiveResult) {
            return ChildContentType.Directive;
        }
        else if (value instanceof template_result_1.TemplateResult || Array.isArray(value)) {
            return ChildContentType.Templates;
        }
        else {
            return ChildContentType.Text;
        }
    }
    clearContent() {
        let contentType = this.contentType;
        if (contentType === null) {
            return;
        }
        if (contentType === ChildContentType.Directive) {
            this.directive.remove();
            this.directive = null;
        }
        else if (contentType === ChildContentType.Templates) {
            for (let template of this.templates) {
                template.remove();
            }
            this.templates = null;
        }
        else if (contentType === ChildContentType.Text) {
            if (this.textNode) {
                this.textNode.remove();
                this.textNode = null;
            }
        }
    }
    updateDirective(directiveResult) {
        if (this.directive) {
            if (this.directive.canMergeWith(...directiveResult.args)) {
                this.directive.merge(...directiveResult.args);
                return;
            }
            else {
                this.directive.remove();
            }
        }
        this.directive = directives_1.createDirectiveFromResult(this.anchor, this.context, directiveResult);
    }
    beTemplateResults(array) {
        for (let i = 0; i < array.length; i++) {
            if (!(array[i] instanceof template_result_1.TemplateResult)) {
                array[i] = template_result_1.text `${array[i]}`;
            }
        }
        return array;
    }
    // One issue when reusing old template, image will keep old appearance until the new image loaded.
    updateTemplates(results) {
        let templates = this.templates;
        if (!templates) {
            templates = this.templates = [];
        }
        if (templates.length > 0 && results.length > 0) {
            for (let i = 0; i < templates.length && i < results.length; i++) {
                let oldTemplate = templates[i];
                let result = results[i];
                if (oldTemplate.canMergeWith(result)) {
                    oldTemplate.merge(result);
                }
                else {
                    let newTemplate = new template_1.Template(result, this.context);
                    let fragment = newTemplate.range.getFragment();
                    oldTemplate.range.startNode.before(fragment);
                    oldTemplate.remove();
                    templates[i] = newTemplate;
                }
            }
        }
        if (results.length < templates.length) {
            for (let i = templates.length - 1; i >= results.length; i--) {
                templates.pop().remove();
            }
        }
        else if (templates.length < results.length) {
            for (let i = templates.length; i < results.length; i++) {
                let template = new template_1.Template(results[i], this.context);
                let fragment = template.range.getFragment();
                this.anchor.insert(fragment);
                templates.push(template);
            }
        }
    }
    updateText(value) {
        let text = value === null || value === undefined ? '' : util_1.trim(String(value));
        if (text) {
            if (this.textNode) {
                this.textNode.textContent = text;
            }
            else {
                this.textNode = document.createTextNode(text);
                this.anchor.insert(this.textNode);
            }
        }
        else {
            if (this.textNode) {
                this.textNode.textContent = '';
            }
        }
    }
}
exports.NodePart = NodePart;

},{"../directives":84,"../libs/util":95,"./template":121,"./template-result":120}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("../component");
/**
 * `.property=${...}` will assign value to element by `element.property = value`.
 * `.property=${...}` will assign value to component by `com.property = value` if on custom element.
 * `..property=${...}` will always assign value to element.
*/
class PropertyPart {
    constructor(el, name, value, fixed) {
        this.com = null;
        this.value = undefined;
        this.el = el;
        this.name = name[0] === '.' ? name.slice(1) : name;
        this.isComProperty = el.localName.includes('-') && name[0] !== '.';
        this.fixed = fixed;
        if (this.isComProperty) {
            this.bindCom();
            this.updateComProperty(value);
        }
        else {
            this.updateElementProperty(value);
        }
    }
    bindCom() {
        let com = component_1.getComponent(this.el);
        if (com) {
            this.com = com;
        }
        else {
            component_1.onComponentCreatedAt(this.el, this.onComCreated.bind(this));
        }
    }
    onComCreated(com) {
        this.com = com;
        this.setComProperty(this.value);
        this.value = undefined;
    }
    updateComProperty(value) {
        if (this.com) {
            this.setComProperty(value);
        }
        else {
            this.value = value;
        }
    }
    setComProperty(value) {
        if (this.fixed) {
            this.setFixedComProperty(value);
        }
        else {
            this.com[this.name] = value;
        }
    }
    setFixedComProperty(value) {
        let com = this.com;
        let type = typeof com[this.name];
        if (type === 'boolean') {
            com[this.name] = value === 'false' ? false : true;
        }
        else if (type === 'number') {
            com[this.name] = Number(value);
        }
        else if (type !== 'undefined') {
            com[this.name] = value;
        }
        else {
            console.warn(`Please makesure value of property "${this.name}" exist in "<${com.el.localName} />" when assigning fixed property!`);
        }
    }
    updateElementProperty(value) {
        // Required, set same value for `<input type="text">` may cause cursor position reset.
        if (this.el[this.name] !== value) {
            this.el[this.name] = value;
        }
    }
    update(value) {
        if (this.isComProperty) {
            this.updateComProperty(value);
        }
        else {
            this.updateElementProperty(value);
        }
    }
    remove() { }
}
exports.PropertyPart = PropertyPart;

},{"../component":77}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_token_1 = require("../libs/html-token");
const template_result_1 = require("./template-result");
const template_result_operate_1 = require("./template-result-operate");
const extendsTemplateCache = new Map();
/**
 * Merge root attributes and slot elements from front result to the later one.
 * This is used when one component call super template by rendering `<super-name additional-properties><tag slot="name">`.
 *
 * What happens when multiple slot element with same name exists:
 * 	 The outside most slot elements will exist, others will be removed.
 *
 * What happens when multiple rest slot anchor elements (`<slot />`) exists in different template:
 *   The outside most rest slot elements will exist too, others will be removed.
 */
function extendsTemplateResult(result, superResult) {
    let totalValues = [...result.values, ...superResult.values];
    let string = template_result_operate_1.joinWithOrderedMarkers(result.strings);
    let superString = template_result_operate_1.joinWithOrderedMarkers(superResult.strings, result.values.length);
    let stringsAndValueIndexes;
    let cacheForSuper = extendsTemplateCache.get(string);
    if (cacheForSuper) {
        stringsAndValueIndexes = cacheForSuper.get(superString);
    }
    if (!stringsAndValueIndexes) {
        stringsAndValueIndexes = parseTemplateResultForExtending(string, superString);
    }
    let { strings, valueIndexes } = stringsAndValueIndexes;
    let reOrderedValues = valueIndexes.map(index => totalValues[index]);
    return new template_result_1.TemplateResult(result.type, strings, reOrderedValues);
}
exports.extendsTemplateResult = extendsTemplateResult;
function parseTemplateResultForExtending(string, superString) {
    let tokens = html_token_1.parseToHTMLTokens(string);
    let { attributes, slots, restSlot } = parseToRootPropertiesAndSlots(tokens);
    let superTokens = html_token_1.parseToHTMLTokens(superString);
    assignRootPropertiesAndSlotsTo(superTokens, attributes, slots, restSlot);
    let stringsAndValueIndexes = template_result_operate_1.splitByOrderedMarkers(html_token_1.joinHTMLTokens(superTokens));
    let cacheForSuper = extendsTemplateCache.get(string);
    if (!cacheForSuper) {
        cacheForSuper = new Map();
        extendsTemplateCache.set(string, cacheForSuper);
    }
    cacheForSuper.set(superString, stringsAndValueIndexes);
    return stringsAndValueIndexes;
}
function parseToRootPropertiesAndSlots(tokens) {
    let firstTagStartIndex = tokens.findIndex(token => token.type === html_token_1.HTMLTokenType.StartTag);
    let firstTagEndIndex = 0;
    let tabCount = 0;
    let firstTag = tokens[firstTagStartIndex];
    let attributes = firstTag.attributes;
    let slots = {};
    // Text nodes already been trimmed when parsing as tokens, no need to worry rest slot exist with empty text.
    let restSlot = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case html_token_1.HTMLTokenType.StartTag:
                if (!token.selfClose) {
                    tabCount++;
                }
                if (/slot\s*=\s*['"](\w+)/.test(token.attributes)) {
                    let name = token.attributes.match(/slot\s*=\s*['"](\w+)/)[1];
                    let wholeTokensBelows = outOuterNestingTokens(tokens, i);
                    slots[name] = slots[name] || [];
                    slots[name].push(...wholeTokensBelows);
                    i--;
                }
                break;
            case html_token_1.HTMLTokenType.EndTag:
                tabCount--;
                if (tabCount === 0) {
                    firstTagEndIndex = i + 1;
                }
                break;
        }
    }
    if (firstTagEndIndex - firstTagStartIndex > 2) {
        restSlot = tokens.slice(firstTagStartIndex + 1, firstTagEndIndex - 1);
    }
    return { attributes, slots, restSlot };
}
function assignRootPropertiesAndSlotsTo(tokens, attributes, slots, restSlot) {
    let firstTag = tokens.find(token => token.type === html_token_1.HTMLTokenType.StartTag);
    firstTag.attributes += attributes;
    if (Object.keys(slots).length > 0 || restSlot.length > 0) {
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            switch (token.type) {
                case html_token_1.HTMLTokenType.StartTag:
                    if (token.tagName === 'slot') {
                        let nameMatch = token.attributes.match(/name\s*=\s*['"](\w+)/);
                        let name = nameMatch ? nameMatch[1] : null;
                        if (name) {
                            if (slots[name]) {
                                outInnerNestingTokens(tokens, i);
                                let tokenPieces = slots[name];
                                tokens.splice(i + 1, 0, ...tokenPieces);
                                i += tokenPieces.length;
                            }
                        }
                        else {
                            outInnerNestingTokens(tokens, i);
                            if (restSlot.length) {
                                tokens.splice(i + 1, 0, ...restSlot);
                                i += restSlot.length;
                            }
                        }
                    }
                    break;
            }
        }
    }
}
function outOuterNestingTokens(tokens, startTagIndex) {
    return tokens.splice(startTagIndex, findEndTagIndex(tokens, startTagIndex) + 1 - startTagIndex);
}
function outInnerNestingTokens(tokens, startTagIndex) {
    return tokens.splice(startTagIndex + 1, findEndTagIndex(tokens, startTagIndex) - 1 - startTagIndex);
}
function findEndTagIndex(tokens, startTagIndex) {
    let tabCount = 1;
    for (let i = startTagIndex + 1; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case html_token_1.HTMLTokenType.StartTag:
                if (!token.selfClose) {
                    tabCount++;
                }
                break;
            case html_token_1.HTMLTokenType.EndTag:
                tabCount--;
                if (tabCount === 0) {
                    return i;
                }
                break;
        }
    }
    return tokens.length - 1;
}

},{"../libs/html-token":92,"./template-result":120,"./template-result-operate":119}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_result_operate_1 = require("./template-result-operate");
const component_1 = require("../component");
const util_1 = require("../libs/util");
const html_token_1 = require("../libs/html-token");
var PartType;
(function (PartType) {
    PartType[PartType["Node"] = 0] = "Node";
    PartType[PartType["Attr"] = 1] = "Attr";
    PartType[PartType["MayAttr"] = 2] = "MayAttr";
    PartType[PartType["Property"] = 3] = "Property";
    PartType[PartType["Event"] = 4] = "Event";
    PartType[PartType["FixedBinging"] = 5] = "FixedBinging";
    PartType[PartType["Binding"] = 6] = "Binding";
})(PartType = exports.PartType || (exports.PartType = {}));
// context name -> template string -> parse result
const parseResultCache = new Map();
/**
 * Parse template strings to an fragment and interlations and their related nodes.
 * Always prepend a comment in the front to mark current template start position.
 * @param type
 * @param strings
 */
function parse(type, strings, el) {
    let scopeName = el ? el.localName : 'global';
    if ((type === 'html' || type === 'svg')) {
        let string = template_result_operate_1.joinWithOrderedMarkers(strings);
        let sharedResultMap = parseResultCache.get(scopeName);
        let sharedResult = sharedResultMap ? sharedResultMap.get(string) : null;
        if (!sharedResult) {
            if (!sharedResultMap) {
                sharedResultMap = new Map();
                parseResultCache.set(scopeName, sharedResultMap);
            }
            sharedResult = new HTMLSVGTemplateParser(type, string, scopeName).parse();
            sharedResultMap.set(string, sharedResult);
        }
        return cloneParseResult(sharedResult, el);
    }
    else if (type === 'css') {
        let html = `<style>${strings[0]}</style>`;
        let fragment = createTemplateFromHTML(html).content;
        return {
            fragment,
            nodesInPlaces: null,
            places: null,
            hasSlots: false
        };
    }
    else {
        let text = strings[0];
        let fragment = document.createDocumentFragment();
        fragment.append(document.createTextNode(text));
        return {
            fragment,
            nodesInPlaces: null,
            places: null,
            hasSlots: false
        };
    }
}
exports.parse = parse;
function createTemplateFromHTML(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
class HTMLSVGTemplateParser {
    constructor(type, string, scopeName) {
        this.nodeIndex = 0;
        this.places = [];
        this.nodeIndexs = [];
        this.type = type;
        this.string = string;
        this.scopeName = scopeName;
        this.scopedClassNameSet = component_1.getScopedClassNameSet(this.scopeName);
    }
    // Benchmark: https://jsperf.com/regexp-exec-match-replace-speed
    parse() {
        let tokens = html_token_1.parseToHTMLTokens(this.string);
        let codes = '';
        let hasSlots = false;
        for (let token of tokens) {
            switch (token.type) {
                case html_token_1.HTMLTokenType.StartTag:
                    let tagName = token.tagName;
                    let attributes = token.attributes;
                    if (tagName === 'slot') {
                        hasSlots = true;
                    }
                    // ` {flit:0}` be at least 
                    if (attributes.length >= 9) {
                        attributes = this.parseAttribute(attributes);
                    }
                    codes += '<' + tagName + attributes + '>';
                    this.nodeIndex++;
                    break;
                case html_token_1.HTMLTokenType.EndTag:
                    codes += `</${token.tagName}>`;
                    break;
                case html_token_1.HTMLTokenType.Text:
                    codes += this.parseText(token.text);
                    break;
            }
        }
        let firstTag = tokens.find(token => token.type === html_token_1.HTMLTokenType.StartTag);
        let svgWrapped = false;
        if (firstTag) {
            if (this.type === 'svg' && firstTag.tagName !== 'svg') {
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
        return {
            template,
            places: this.places,
            hasSlots,
            attributes
        };
    }
    parseText(text) {
        // `text` has already been trimmed here when parsing as tokens.
        if (!text) {
            return text;
        }
        if (template_result_operate_1.containsOrderedMarker(text)) {
            let { strings, valueIndexes } = template_result_operate_1.splitByOrderedMarkers(text);
            // Each hole may be a string, or a `TemplateResult`, so must unique them, but can't join them to a string.
            for (let i = 1; i < strings.length; i++) {
                this.places.push({
                    type: PartType.Node,
                    name: null,
                    strings: null,
                    valueIndexes: valueIndexes.slice(i - 1, i),
                    nodeIndex: this.nodeIndex
                });
                this.nodeIndexs.push(this.nodeIndex);
                this.nodeIndex += 1;
            }
            text = strings.map(util_1.trim).join('<!--->');
        }
        return text;
    }
    parseAttribute(attr) {
        const attrRE = /([.:?@\w-]+)\s*(?:=\s*(".*?"|'.*?'|\{flit:\d+\})\s*)?|\{flit:(\d+)\}\s*/g;
        return attr.replace(attrRE, (m0, name, value = '', markerId) => {
            if (markerId) {
                this.places.push({
                    type: PartType.Binding,
                    name: null,
                    strings: null,
                    valueIndexes: [Number(markerId)],
                    nodeIndex: this.nodeIndex
                });
                this.nodeIndexs.push(this.nodeIndex);
                return '';
            }
            let type;
            let hasMarker = template_result_operate_1.containsOrderedMarker(value);
            switch (name[0]) {
                case '.':
                    type = PartType.Property;
                    break;
                case ':':
                    type = PartType.FixedBinging;
                    break;
                case '?':
                    type = PartType.MayAttr;
                    break;
                case '@':
                    type = PartType.Event;
                    break;
            }
            if (type !== undefined) {
                name = name.slice(1);
            }
            if (type === undefined && hasMarker) {
                // `class=${...}` -> `:class=${...}`, so the class value can be scoped.
                if (name === 'class') {
                    type = PartType.FixedBinging;
                }
                else {
                    type = PartType.Attr;
                }
            }
            if (type !== undefined) {
                if (value[0] === '\'' || value[0] === '"') {
                    value = value.slice(1, -1);
                }
                if (hasMarker) {
                    let { strings, valueIndexes } = template_result_operate_1.parseOrderedMarkers(value);
                    this.places.push({
                        type,
                        name,
                        strings,
                        valueIndexes,
                        nodeIndex: this.nodeIndex
                    });
                }
                else {
                    this.places.push({
                        type,
                        name,
                        strings: [value],
                        valueIndexes: null,
                        nodeIndex: this.nodeIndex
                    });
                }
                this.nodeIndexs.push(this.nodeIndex);
                if (type === PartType.Attr) {
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
}
/**
 * Clone the result fragment and link it with node indexes from the parsed result.
 */
// TreeWalker Benchmark: https://jsperf.com/treewalker-vs-nodeiterator
// Clone benchmark: https://jsperf.com/clonenode-vs-importnode
function cloneParseResult(sharedResult, el) {
    let { template, places, hasSlots, attributes } = sharedResult;
    let fragment = template.content.cloneNode(true);
    let nodesInPlaces = [];
    if (attributes) {
        if (!el) {
            throw new Error('A context must be provided when rendering `<template>...`');
        }
        util_1.cloneAttributes(el, attributes);
    }
    if (places.length > 0) {
        let nodeIndex = 0;
        let placeIndex = 0;
        let walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT, null);
        let node;
        let end = false;
        if (attributes) {
            while (placeIndex < places.length && places[placeIndex].nodeIndex === 0) {
                nodesInPlaces.push(el);
                placeIndex++;
            }
            nodeIndex = 1;
        }
        if (placeIndex < places.length) {
            while (node = walker.nextNode()) {
                while (places[placeIndex].nodeIndex === nodeIndex) {
                    nodesInPlaces.push(node);
                    placeIndex++;
                    if (placeIndex === places.length) {
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
        nodesInPlaces,
        places,
        hasSlots,
    };
}

},{"../component":77,"../libs/html-token":92,"../libs/util":95,"./template-result-operate":119}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Get the start tag of a `TemplateResult`. */
function getStartTagOfTemplateResult(result) {
    let match = result.strings[0].match(/<([\w-]+)/);
    return match ? match[1] : null;
}
exports.getStartTagOfTemplateResult = getStartTagOfTemplateResult;
/**
 * Join template strings with `${flit:id}`, the id is the increased index of values.
 */
function joinWithOrderedMarkers(strings, startIndex = 0) {
    let text = strings[0];
    for (let i = 0; i < strings.length - 1; i++) {
        text += `{flit:${i + startIndex}}`;
        text += strings[i + 1];
    }
    return text;
}
exports.joinWithOrderedMarkers = joinWithOrderedMarkers;
/**
 * Test if string contains `${flit:id}`.
 */
function containsOrderedMarker(string) {
    return /\{flit:\d+\}/.test(string);
}
exports.containsOrderedMarker = containsOrderedMarker;
/**
 * Test if string is just a `${flit:id}`.
 */
function beOrderedMarker(string) {
    return /^\{flit:\d+\}$/.test(string);
}
exports.beOrderedMarker = beOrderedMarker;
/**
 * Split string contains `${flit:id}` into strings and valueIndexes.
 * But returned `strings` will be `null` if whole string be a marker.
 */
function parseOrderedMarkers(string) {
    if (beOrderedMarker(string)) {
        return {
            strings: null,
            valueIndexes: [Number(string.match(/^\{flit:(\d+)\}$/)[1])]
        };
    }
    else {
        return splitByOrderedMarkers(string);
    }
}
exports.parseOrderedMarkers = parseOrderedMarkers;
/** Split string contains `${flit:id}` into strings and valueIndexes. */
function splitByOrderedMarkers(string) {
    let re = /\{flit:(\d+)\}/g;
    let match;
    let strings = [];
    let valueIndexes = [];
    let lastIndex = 0;
    while (match = re.exec(string)) {
        strings.push(string.slice(lastIndex, match.index));
        valueIndexes.push(Number(match[1]));
        lastIndex = re.lastIndex;
    }
    strings.push(string.slice(lastIndex));
    return {
        strings,
        valueIndexes
    };
}
exports.splitByOrderedMarkers = splitByOrderedMarkers;

},{}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_extends_1 = require("./template-extends");
/** HTML template literal that can be used to render or update a component. */
function html(strings, ...values) {
    return new TemplateResult('html', strings, values);
}
exports.html = html;
/** SVG template literal that can be used to render or update a component. */
function svg(strings, ...values) {
    return new TemplateResult('svg', strings, values);
}
exports.svg = svg;
/** CSS template literal that can be used as component's static style property. */
function css(strings, ...values) {
    return new TemplateResult('css', strings, values);
}
exports.css = css;
/** Text template literal that used inside. */
/** @hidden */
function text(strings, ...values) {
    return new TemplateResult('text', strings, values);
}
exports.text = text;
/**
 * Returned from html`...`, it represents a render result,
 * and can be used to merge with the last result.
 */
class TemplateResult {
    /**
     * Created from each html`...` or svg`...`.
     * Every time call `Component.update` will generate a new template result tree.
     * Then we will check if each result can be merged or need to be replaced recursively.
     */
    constructor(type, strings, values) {
        this.type = type;
        this.strings = strings;
        this.values = values;
    }
    /** Join strings and values to string. */
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
    /**
     * Used for `TemplateResult` to merge root attributes and slot elements into super.
     * Sometimes you want to reuse super rendering result and add some classes and set soem slots,
     * but normally this can only work when instantiation, not working inside a new defined component.
     * Now using `CurrentRenderingResult.extends(super.render())`, you can do this.
     *
     * At beginning, we decided to implement this by rendering `<super-com>`,
     * but every time for every rendered component to update, it need to check the name.
     * We should makesure the rendering logic simple and easy to understand,
     * so finally we implement a new API `extends` to call it manually.
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

},{"./template-extends":117}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_helper_1 = require("../libs/node-helper");
const template_parser_1 = require("./template-parser");
const node_part_1 = require("./node-part");
const may_attr_part_1 = require("./may-attr-part");
const event_part_1 = require("./event-part");
const attr_part_1 = require("./attr-part");
const binding_part_1 = require("./binding-part");
const property_part_1 = require("./property-part");
/**
 * Class to parse a template result returned from html`...` to element,
 * And can do some patches on it according to newly rendered template result.
 */
class Template {
    /**
     * Create an template from html`...` like template result and context
     * @param result The template result like html`...`.
     * @param context The context passed to event handlers.
     */
    constructor(result, context) {
        this.canUpdateParts = [];
        this.result = result;
        this.context = context;
        let { fragment, nodesInPlaces, places, hasSlots } = template_parser_1.parse(this.result.type, this.result.strings, this.context ? this.context.el : null);
        this.range = new node_helper_1.NodeRange(fragment);
        this.parseParts(nodesInPlaces, places);
        if (hasSlots && this.context) {
            this.context.__foundSlotsWhenRendering();
        }
    }
    /** Parse template result and returns a fragment. */
    parseParts(nodesInPlaces, places) {
        let resultValues = this.result.values;
        if (nodesInPlaces && places) {
            for (let nodeIndex = 0; nodeIndex < nodesInPlaces.length; nodeIndex++) {
                let node = nodesInPlaces[nodeIndex];
                let place = places[nodeIndex];
                let strings = place.strings;
                let valueIndexes = place.valueIndexes;
                let values = valueIndexes ? valueIndexes.map(index => resultValues[index]) : null;
                let value = join(strings, values);
                let part;
                switch (place.type) {
                    case template_parser_1.PartType.Node:
                        part = new node_part_1.NodePart(new node_helper_1.NodeAnchor(node, node_helper_1.NodeAnchorType.Next), value, this.context);
                        break;
                    case template_parser_1.PartType.MayAttr:
                        part = new may_attr_part_1.MayAttrPart(node, place.name, value);
                        break;
                    case template_parser_1.PartType.Event:
                        part = new event_part_1.EventPart(node, place.name, value, this.context);
                        break;
                    case template_parser_1.PartType.Attr:
                        part = new attr_part_1.AttrPart(node, place.name, value);
                        break;
                    case template_parser_1.PartType.Property:
                        part = new property_part_1.PropertyPart(node, place.name, value, !valueIndexes);
                        break;
                    case template_parser_1.PartType.FixedBinging:
                        part = new binding_part_1.FixedBindingPart(node, place.name, value, this.context);
                        break;
                    case template_parser_1.PartType.Binding:
                        part = new binding_part_1.BindingPart(node, value, this.context);
                        break;
                }
                if (part && valueIndexes) {
                    this.canUpdateParts.push({
                        part,
                        strings,
                        valueIndexes
                    });
                }
            }
        }
    }
    /** Compare if two template result can be merged. */
    canMergeWith(result) {
        if (this.result.type !== result.type) {
            return false;
        }
        if (this.result.strings.length !== result.strings.length) {
            return false;
        }
        for (let i = 0; i < this.result.strings.length; i++) {
            if (this.result.strings[i] !== result.strings[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Merge with another template result.
     * @param result The template result to merge.
     */
    merge(result) {
        for (let { part, strings, valueIndexes } of this.canUpdateParts) {
            let changed = valueIndexes.some(index => this.result.values[index] !== result.values[index]);
            if (changed) {
                let values = valueIndexes.map(index => result.values[index]);
                let value = join(strings, values);
                part.update(value);
            }
        }
        this.result = result;
    }
    // Been called when this template will never be used any more.
    remove() {
        this.range.getNodes().forEach(node => node.remove());
    }
}
exports.Template = Template;
/** Join strings and values to string, returns `values[0]` if `strings` is null. */
function join(strings, values) {
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

},{"../libs/node-helper":93,"./attr-part":110,"./binding-part":111,"./event-part":112,"./may-attr-part":114,"./node-part":115,"./property-part":116,"./template-parser":118}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_event_1 = require("./libs/dom-event");
const queue_1 = require("./queue");
const DEFAULT_TRANSITION_OPTIONS = {
    duration: 200,
    easing: 'ease-out',
    direction: 'both'
};
// Copied from `Bourbon` source codes.
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
/**
 * Get `cubic-bezier(...)` from easing name.
 * @param easing The extended easing name.
 */
/** @hidden */
function getEasing(easing) {
    return CUBIC_BEZIER_EASINGS.hasOwnProperty(easing)
        ? 'cubic-bezier(' + CUBIC_BEZIER_EASINGS[easing].join(', ') + ')'
        : 'linear';
}
exports.getEasing = getEasing;
const elementTransitionMap = new WeakMap();
const definedTransition = new Map();
/** Register a js transiton. */
function defineTransion(name, TransitionConstructor) {
    if (definedTransition.has(name)) {
        console.warn(`You are trying to overwrite transition definition "${name}"`);
    }
    if (CSS_PROPERTIES.hasOwnProperty(name)) {
        console.warn(`"${name}" is an available CSS property, you may confuse them when using short transition`);
    }
    definedTransition.set(name, TransitionConstructor);
}
exports.defineTransion = defineTransion;
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
/** @hidden */
function formatShortTransitionOptions(options) {
    if (Array.isArray(options)) {
        return {
            properties: options
        };
    }
    else if (typeof options === 'string') {
        if (CSS_PROPERTIES.hasOwnProperty(options)) {
            return {
                properties: [options]
            };
        }
        else {
            return {
                name: options
            };
        }
    }
    else {
        return options;
    }
}
exports.formatShortTransitionOptions = formatShortTransitionOptions;
/**
 * Class used to play specified transition on an element.
 * Transition types includes class name, css properties, and registered js transition.
 */
class Transition {
    constructor(el, options) {
        this.cleaner = null;
        this.el = el;
        this.options = formatShortTransitionOptions(options);
        clearTransition(this.el);
        elementTransitionMap.set(this.el, this);
    }
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
                elementTransitionMap.delete(this.el);
                resolve(finish);
            };
            if (this.options.properties) {
                this.cssEnter(onEntered);
            }
            else if (definedTransition.has(name)) {
                this.jsEnter(onEntered);
            }
            else {
                this.classEnterOrLeave('enter', onEntered);
            }
        });
    }
    leave() {
        return new Promise(resolve => {
            this.clean();
            let direction = this.options.direction;
            let willPlay = direction === 'leave' || direction === 'both' || direction === undefined;
            if (!willPlay) {
                resolve(true);
                return;
            }
            let el = this.el;
            let onLeaved = (finish) => {
                el.style.pointerEvents = '';
                elementTransitionMap.delete(this.el);
                resolve(finish);
            };
            el.style.pointerEvents = 'none';
            if (this.options.properties) {
                this.cssLeave(onLeaved);
            }
            else if (definedTransition.has(name)) {
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
        let { promise, cancel } = animateFrom(this.el, startFrame, this.options.duration || DEFAULT_TRANSITION_OPTIONS.duration, this.options.easing || DEFAULT_TRANSITION_OPTIONS.easing);
        promise.then(onEntered);
        this.cleaner = cancel;
    }
    cssLeave(onLeaved) {
        let endFrame = {};
        for (let property of this.options.properties) {
            endFrame[property] = property === 'transform' ? 'none' : '0';
        }
        let { promise, cancel } = animateTo(this.el, endFrame, this.options.duration || DEFAULT_TRANSITION_OPTIONS.duration, this.options.easing || DEFAULT_TRANSITION_OPTIONS.easing);
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
        let JsTransition = definedTransition.get(this.options.name);
        return new JsTransition(this.el, {
            duration: this.options.duration || DEFAULT_TRANSITION_OPTIONS.duration,
            easing: this.options.easing || DEFAULT_TRANSITION_OPTIONS.easing
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
            el.style.transitionTimingFunction = getEasing(easing);
        }
        el.style.transition = 'none';
        el.classList.add(className, className + '-from');
        this.cleaner = () => {
            canceled = true;
        };
        // Here to makesure rendering complete for current frame,
        // Then the next `requestAnimationFrame` will be called for a new frame.
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
            el.style.pointerEvents = '';
            onEnd(true);
        };
        let onTimeout = () => {
            dom_event_1.off(el, eventName, onTransitionEnd);
            el.style.pointerEvents = '';
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
/** Clear the transition that is running in the element. */
function clearTransition(el) {
    if (elementTransitionMap.has(el)) {
        elementTransitionMap.get(el).clean();
    }
}
exports.clearTransition = clearTransition;
function animate(el, startFrame, endFrame, duration, easing) {
    if (!el.animate) {
        return {
            promise: Promise.resolve(false),
            cancel: () => { }
        };
    }
    let cubicEasing = getEasing(easing);
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
        cancel
    };
}
/** The default style of element, which is not 0 */
const DEFAULT_STYLE = {
    transform: 'none'
};
function animateFrom(el, startFrame, duration, easing) {
    let endFrame = {};
    let style = getComputedStyle(el);
    for (let property in startFrame) {
        endFrame[property] = style[property] || DEFAULT_STYLE[property] || '0';
    }
    return animate(el, startFrame, endFrame, duration, easing);
}
function animateTo(el, endFrame, duration, easing) {
    let startFrame = {};
    let style = getComputedStyle(el);
    for (let property in endFrame) {
        startFrame[property] = style[property] || DEFAULT_STYLE[property] || '0';
    }
    return animate(el, startFrame, endFrame, duration, easing);
    // el will hide, no need to set style to end frame.
}

},{"./libs/dom-event":90,"./queue":108}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer_1 = require("./observer");
const queue_1 = require("./queue");
/**
 * Used to watch a function returns and trigger callback if it is changed.
 * You need to know that when callback was called, it doesn't ensure the watched datas are truly changed.
 */
class Watcher {
    constructor(fn, callback) {
        this.connected = true;
        this.fn = fn;
        this.callback = callback;
        this.value = this.getValue();
    }
    getValue() {
        observer_1.startUpdating(this);
        let newValue = this.fn.call(null);
        observer_1.endUpdating(this);
        return newValue;
    }
    /** When detected dependencies changed. trigger this immediately. */
    update() {
        queue_1.enqueueWatcherUpdate(this);
    }
    /** Keep consitant with Component */
    __updateImmediately() {
        if (!this.connected) {
            return;
        }
        let newValue = this.getValue();
        if (newValue !== this.value || typeof newValue === 'object') {
            this.callback.call(null, this.value = newValue);
        }
    }
    /**
     * We currently just check the update times, if exceed 3 then warn.
     * The better way should be analysising dependency tree:
     * Get current watcher referenced objects, then get their referenced watchers.
     * Then check if current watcher in it.
     */
    toString() {
        return this.fn.toString();
    }
    /**
     * Watcher and the Component can't be GC automatically,
     * because we added `object -> Component | Watcher` map into dependencies.
     * But if it's referred object is no longer in use any more, no need to disconnect it.
     */
    // One question: Will the update be triggered after disconnected?
    //   1. Data changed, cause watcher update been enqueued, and will be updated in micro task queue.
    //   2. later some element was removed in same stack, related watcher was disconnected in micro task queue.
    //   3. Update and then disconnect.
    //
    // So this will not happen.
    // But we still need to avoid it by adding a `connected` property,
    // because once update after disconnect, the watcher will have new dependencies and be reconnected. 
    disconnect() {
        observer_1.clearDependencies(this);
        this.connected = false;
    }
    /** If it's related commponent restore to be connected, connect and activate it's watchers. */
    connect() {
        this.connected = true;
        this.update();
    }
}
exports.Watcher = Watcher;
/**
 * Used to manage several watchers that binded to a context or as global watchers.
 * By this class, you can easily connect, disconnect, update all the watchers related.
 */
/** @hidden */
class WatcherGroup {
    constructor() {
        this.watchers = new Set();
    }
    add(watcher) {
        this.watchers.add(watcher);
    }
    delete(watcher) {
        watcher.disconnect();
        this.watchers.delete(watcher);
    }
    connect() {
        for (let watcher of this.watchers) {
            watcher.connect();
        }
    }
    disconnect() {
        for (let watcher of this.watchers) {
            watcher.disconnect();
        }
    }
    update() {
        if (this.watchers) {
            for (let watcher of this.watchers) {
                watcher.update();
            }
        }
    }
    watch(fn, callback) {
        let watcher = new Watcher(fn, callback);
        this.add(watcher);
        return () => {
            this.delete(watcher);
        };
    }
    watchImmediately(fn, callback) {
        let watcher = new Watcher(fn, callback);
        callback.call(this, watcher.value);
        this.add(watcher);
        return () => {
            this.delete(watcher);
        };
    }
    watchOnce(fn, callback) {
        let wrappedCallback = (value) => {
            callback(value);
            unwatch();
        };
        let watcher = new Watcher(fn, wrappedCallback);
        this.add(watcher);
        let unwatch = () => {
            this.delete(watcher);
        };
        return unwatch;
    }
    watchUntil(fn, callback) {
        let wrappedCallback = (value) => {
            if (value) {
                callback();
                unwatch();
            }
        };
        let unwatch;
        let watcher = new Watcher(fn, wrappedCallback);
        if (watcher.value) {
            watcher.disconnect();
            callback.call(this);
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
/** @hidden */
exports.globalWatcherGroup = new WatcherGroup();
/** Watch return value of function and trigger callback with this value as argument. */
function watch(fn, callback) {
    return exports.globalWatcherGroup.watch(fn, callback);
}
exports.watch = watch;
/** Watch return value of function and trigger callback with this value as argument. */
function watchImmediately(fn, callback) {
    return exports.globalWatcherGroup.watchImmediately(fn, callback);
}
exports.watchImmediately = watchImmediately;
/** Watch return value of function and trigger callback with this value as argument. Run callback for only once. */
function watchOnce(fn, callback) {
    return exports.globalWatcherGroup.watchOnce(fn, callback);
}
exports.watchOnce = watchOnce;
/** Watch returned values of function and trigger callback if it becomes true. */
function watchUntil(fn, callback) {
    return exports.globalWatcherGroup.watchUntil(fn, callback);
}
exports.watchUntil = watchUntil;

},{"./observer":100,"./queue":108}]},{},[28]);
