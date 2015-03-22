(function() {
    'use strict';

    module.exports = {
        /**
         * Parse string by regular expression to array of entries in log
         *
         * @param {String} data  Plain text data
         * @param {String|RegExp} format  Regular expression
         * @param {String[]} columns  Column names to create object from parts of expression
         * @param {String} separator  Entry separator
         * @param {Boolean} [parseEmpty]  Should also try to parse empty lines?
         * @returns {Object[]}
         */
        parse: function parseLog(data, format, columns, separator, parseEmpty) {
            var row;

            if (!(format instanceof RegExp)) {
                format = new RegExp(format);
            }

            separator = separator || '\n';

            data = data.split(separator);

            for (var i = 0; i < data.length; i++) {
                if (!parseEmpty && data[i] === '') {
                    data.splice(i, 1);
                    i--;
                    continue;
                }

                row = data[i].match(format);

                if (!row) {
                    throw new Error('Row doesn\'t pass expected format');
                }

                data[i] = {};

                for (var j = 1; j < row.length; j++) {
                    data[i][columns[j - 1]] = row[j];
                }
            }

            return data;
        }
    };
}());
