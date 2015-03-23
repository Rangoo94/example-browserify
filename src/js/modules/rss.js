(function() {
    'use strict';

    var request = require('./request'),
        parseXML = require('./xml-parser'),
        Promise = require('./promise');

    /**
     * Understands RSS structure
     * Currently it allow only one channel
     *
     * @param {String} str  XML string
     * @constructor
     */
    function RSS(str) {
        this.data = this.parse(str);
    }

    /**
     * Parse XML string to structure
     *
     * @param {String} str
     * @returns {Object}
     */
    RSS.prototype.parse = function(str) {
        var result = parseXML(str, {
            rss: {
                channel: {
                    item: {
                        '@type': 'array'
                    }
                }
            }
        }).rss.channel;

        result.ttl = +result.ttl;
        result.lastbuilddate = new Date(result.lastbuilddate);

        for (var i = 0; i < result.item.length; i++) {
            result.item[i].pubdate = new Date(result.item[i].pubdate);
        }

        return result;
    };

    /**
     * Get one of basic RSS parameters: description, image, lastbuilddate, link, title, ttl
     *
     * @param {String} property
     * @returns {*}
     */
    RSS.prototype.get = function(property) {
        return this.data[property];
    };

    /**
     * Get items list
     *
     * @returns {Object[]}
     */
    RSS.prototype.getItems = function() {
        return this.data.item;
    };

    /**
     * Get RSS from specified URL
     *
     * @param {String} url
     * @returns {Promise}  which results with RSS object after resolving
     */
    RSS.fromURL = function(url) {
        var promise = new Promise();

        request.get(url).then(function(data) {
            promise.resolve(new RSS(data));
        }, function(xhr) {
            promise.reject(xhr);
        });

        return promise;
    };

    module.exports = RSS;
}());
