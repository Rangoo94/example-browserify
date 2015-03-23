(function() {
    'use strict';

    module.exports = {
        /**
         * Get hostname by specified URL
         *
         * @param {String} url
         * @returns {String}
         */
        getHostname: function(url) {
            var a = document.createElement('a');
            a.href = url;

            return a.hostname;
        }
    }
}());
