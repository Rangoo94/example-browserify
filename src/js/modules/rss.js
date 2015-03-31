(function() {
    'use strict';

    var request = require('./request'),
        parseXML = require('./xml-parser'),
        Promise = require('./promise');

    /**
     * Understands RSS structure
     * Currently it allow only one channel
     *
     * @param {String|Document} xml  XML string or document
     * @constructor
     */
    function RSS(xml) {
        this.data = this.parse(xml);
    }

    /**
     * Parse XML string or document to structure
     *
     * @param {String|Document} xml
     * @returns {Object}
     */
    RSS.prototype.parse = function(xml) {
        var result = (typeof xml === 'string' ? parseXML.fromString : parseXML)(xml, {
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

        request.get(url, null, true).then(function(xhr) {
            promise.resolve(new RSS(xhr.responseXML));
        }, function(xhr) {
            promise.reject(xhr);
        });

        return promise;
    };

    module.exports = RSS;
}());
