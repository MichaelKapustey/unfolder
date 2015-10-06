var async = require('async');

var createMapper = function (element, parentKey, currentKey, currentPropertyName, properties) {
    var keys;

    if (parentKey != null) {
        currentPropertyName = currentPropertyName ? currentPropertyName + '.' + parentKey : parentKey;
    }

    if (!(element instanceof Object)) {
        properties.push(currentPropertyName ? currentPropertyName + '.' + currentKey : currentKey);
        return;
    }
    keys = Object.keys(element);

    if (keys.length === 0) {
        properties.push(currentPropertyName ? currentPropertyName + '.' + currentKey : currentKey);
        return;
    }

    keys.forEach(function (key) {
        var innerElement = element[key];
        createMapper(innerElement, currentKey, key, currentPropertyName, properties);
    });
};

var getValue = function (name, obj) {
    var array = name.split('.');
    var value = obj;

    for (var i = 0, l = array.length; i < l; i++) {
        value = value[array[i]];
        if (!value) {
            return value
        }
    }

    return value;
};

var createMap = function (element) {
    if (!(element instanceof Object)) {
        throw new TypeError();
    }
    var properties = [];
    createMapper(element, null, null, null, properties);
    return properties;
};

var mapObject = function (map, element) {
    var mappedObject = {};
    var propertyMap;
    for (var i = map.length-1; i >= 0; i--) {
        propertyMap = map[i];
        mappedObject[propertyMap] = getValue(propertyMap, element);
    }
    return mappedObject;
};

var convertToSimpleObjects = function (map, array) {
    var result;
    var mappedElement;
    if (!(array instanceof Array)) {
        throw new TypeError();
    }
    if (!(map instanceof Array)) {
        map = createMap(array[0]);
    }
    result = [];

    for (var i = 0, len = array.length; i < len; i++) {
        mappedElement = mapObject(map, array[i]);
        result.push(mappedElement);
    }
    return result;

};
/**
 *

 * @param {Object[]} elements - objects to unfold
 * @param {Function} callback - Callback that will be executed after unfolding objects.
 * @param {string[]} [propertyMapArray=undefined] - Array of property names that you want to have in unfolded object.
 * If null, property names will be created using first object properties, joined by dot, e.g 'property.second.third'
 *
 */
exports.convertToLinearObjects = function (elements, callback,propertyMapArray) {
    var convertAsync = async.wrapSync(convertToSimpleObjects);
    convertAsync(propertyMapArray, elements, callback);
};
