(function() {
    'use strict';

    var Promise = require('./promise');

    module.exports = {
        objectToQueryString: function(obj) {
            var qs = [];

            for (var idx in obj) {
                if (obj.hasOwnProperty(idx)) {
                    qs.push(encodeURIComponent(idx) + '=' + encodeURIComponent(obj[idx]));
                }
            }

            return qs.join('&');
        },

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
                    if (xhr.status == 200) {
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

        'get': function(url, data) {
            return this.request('GET', url, data);
        }
    };
}());
