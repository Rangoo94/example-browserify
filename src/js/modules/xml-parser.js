(function() {
    'use strict';

    function getChildren(element) {
        if (element.children) {
            return element.children;
        } else {
            var result = [];

            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                    result.push(element.childNodes[i]);
                }
            }

            return result;
        }
    }

    /**
     * Simple parsing XML/DOM element to plain object structure by definition.
     *
     * @param {Element} dom
     * @param {Object} definition  Definition which explain where in structure is array of elements
     * @returns {Object}
     */
    function domToObject(dom, definition) {
        var result = null,
            tag = dom.tagName.toLowerCase(),
            children = getChildren(dom);

        if ((definition[tag] && definition[tag]['@type'] === 'array') || children.length) {
            result = domListToObject(children, definition[tag]);
        } else {
            result = dom.textContent;
        }

        return result;
    }

    /**
     * Simple parsing XML/DOM elements to plain object structure by definition.
     *
     * @param {Element[]} list
     * @param {Object} [definition]  Definition which explain where in structure is array of elements
     * @returns {Object}
     */
    function domListToObject(list, definition) {
        var result = {},
            tag,
            i;

        if (!definition) {
            definition = {};
        }

        for (i = 0; i < list.length; i++) {
            tag = list[i].tagName.toLowerCase();

            if (definition[tag] && definition[tag]['@type'] === 'array') {
                if (!result[tag]) {
                    result[tag] = [];
                }

                result[tag].push(domToObject(list[i], definition));
            } else {
                result[tag] = domToObject(list[i], definition);
            }
        }

        return result;
    }

    /**
     * Expose function to parse XML string to object
     *
     * @param {String} str
     * @param {Object} [definition]
     * @returns {Object}
     */
    module.exports = function parseXML(str, definition) {
        var xml = (new DOMParser()).parseFromString(str, 'text/xml');

        return domListToObject([ xml.documentElement ], definition);
    };
}());
