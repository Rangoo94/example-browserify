(function() {
    'use strict';

    // Dispatch all boxes with tabs
    var TabBox = require('./modules/tab-box'),
        tabs = document.getElementsByClassName('tabs');

    for (var i = 0; i < tabs.length; i++) {
        TabBox.create(tabs[i]);
    }
}());
