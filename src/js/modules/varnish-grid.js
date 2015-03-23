(function() {
    'use strict';

    var shortenText,
        COLUMNS;

    shortenText = function(len) {
        len = len || 50;

        return function(txt, cell) {
            cell.title = txt;

            return txt.length > len ? txt.substr(0, len) + '...' : txt;
        }
    };

    COLUMNS = [
        { column: 'remote', label: 'Remote host' },
        { column: 'date', label: 'Date', transform: function(date) { return date.toString(); } },
        { column: 'method', label: 'Method' },
        { column: 'url', label: 'URL', transform: shortenText(40) },
        { column: 'status', label: 'Status' },
        { column: 'size', label: 'Size' },
        { column: 'referer', label: 'Referer', transform: shortenText(40) },
        { column: 'userAgent', label: 'User agent', transform: shortenText(40) }
    ];

    function VarnishGrid(group) {
        this.group = group;
    }

    VarnishGrid.prototype.setGroupingFunction = function(func) {
        this.group = func;
    };

    VarnishGrid.prototype.createHeader = function() {
        var header = document.createElement('thead'),
            rowEl = document.createElement('tr'),
            cell;

        for (var i = 0; i < COLUMNS.length; i++) {
            cell = document.createElement('th');
            cell.innerText = COLUMNS[i].label;
            rowEl.appendChild(cell);
        }

        header.appendChild(rowEl);

        return header;
    };

    VarnishGrid.prototype.createGroupRow = function(group) {
        var row = document.createElement('tr'),
            cell = document.createElement('td');

        cell.setAttribute('colspan', COLUMNS.length);
        cell.innerText = group;

        row.className = 'group';
        row.appendChild(cell);

        return row;
    };

    VarnishGrid.prototype.createRow = function(row) {
        var rowEl = document.createElement('tr'),
            cell;

        for (var i = 0; i < COLUMNS.length; i++) {
            cell = document.createElement('td');
            cell.innerText = COLUMNS[i].transform ? COLUMNS[i].transform(row[COLUMNS[i].column], cell) : row[COLUMNS[i].column];
            rowEl.appendChild(cell);
        }

        return rowEl;
    };

    VarnishGrid.prototype.render = function(data) {
        var table = document.createElement('table'),
            tbody = document.createElement('tbody'),
            currentGroup = null,
            group;

        table.className = 'grid';

        table.appendChild(this.createHeader());

        table.appendChild(tbody);

        for (var rowIdx = 0; rowIdx < data.length; rowIdx++) {
            if (this.group) {
                group = this.group(data[rowIdx], data, rowIdx);

                if (group !== currentGroup) {
                    currentGroup = group;
                    tbody.appendChild(this.createGroupRow(group));
                }
            }

            tbody.appendChild(this.createRow(data[rowIdx]));
        }

        return table;
    };

    module.exports = VarnishGrid;
}());
