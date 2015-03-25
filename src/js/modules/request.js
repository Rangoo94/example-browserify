(function() {
    'use strict';

    var Promise = require('./promise');

    module.exports = {
        /**
         * Convert object to query string
         *
         * @param {Object} obj
         * @returns {String}
         */
        objectToQueryString: function(obj) {
            var qs = [];

            for (var idx in obj) {
                if (obj.hasOwnProperty(idx)) {
                    qs.push(encodeURIComponent(idx) + '=' + encodeURIComponent(obj[idx]));
                }
            }

            return qs.join('&');
        },

        /**
         * Make request to external service
         *
         * @param {String} method
         * @param {String} url
         * @param {Object} data
         * @returns {Promise}
         */
        request: function(method, url, data) {
            var promise = new Promise(),
                xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            if (method === 'POST') {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        promise.resolve(xhr.responseText);
                    } else {
                        promise.reject(xhr);
                    }
                }
            };

            xhr.open(method, url, true);
            xhr.send(data ? this.objectToQueryString(data) : void 0);

            return promise;
        },

        /**
         * Alias for GET request
         *
         * @param {String} url
         * @param {Object} data
         * @returns {Promise}
         */
        'get': function(url, data) {
            return this.request('GET', url, data);
        },

        /**
         * Create JSONP request to specified URL
         *
         * @param {String} url
         * @param {String} [callbackParameter]  Callback GET parameter
         * @param {Number} [timeout]  Timeout in milliseconds
         * @returns {Promise}
         */
        jsonp: function(url, callbackParameter, timeout) {
            var promise = new Promise(),
                script = document.createElement('script'),
                tmt,
                uid = 0;

            callbackParameter = callbackParameter || 'callback';

            while (window['jsonp_' + uid]) {
                uid++;
            }

            window['jsonp_' + uid] = function(data) {
                delete window['jsonp_' + uid];
                clearTimeout(tmt);
                promise.resolve(data);
            };

            if (timeout) {
                tmt = setTimeout(function() {
                    script.parentNode.removeChild(script);
                    promise.reject();
                }, timeout);
            }

            document.body.appendChild(script);

            script.setAttribute('src', url + '?' + encodeURIComponent(callbackParameter) + '=jsonp_' + uid);

            return promise;
        }
    };
}());
