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
         * @param {Boolean} [plainXhr]  Should return plain XHR in promise instead of data?
         * @returns {Promise}
         */
        request: function(method, url, data, plainXhr) {
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
                        promise.resolve(plainXhr ? xhr : xhr.responseText);
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
         * @param {Boolean} [plainXhr]
         * @returns {Promise}
         */
        'get': function(url, data, plainXhr) {
            return this.request('GET', url, data, plainXhr);
        },

        /**
         * Create JSONP request to specified URL
         *
         * @param {String} url
         * @param {String} [callbackParameter]  Callback GET parameter
         * @returns {Promise}
         */
        jsonp: function(url, callbackParameter) {
            var promise = new Promise(),
                script = document.createElement('script'),
                uid = 0;

            callbackParameter = callbackParameter || 'callback';

            while (window['jsonp_' + uid]) {
                uid++;
            }

            window['jsonp_' + uid] = function(data) {
                delete window['jsonp_' + uid];
                promise.resolve(data);
            };

            script.addEventListener('error', function(err) {
                delete window['jsonp_' + uid];
                promise.reject(err);
            });

            document.body.appendChild(script);

            script.setAttribute('src', url + '?' + encodeURIComponent(callbackParameter) + '=jsonp_' + uid);

            return promise;
        }
    };
}());
