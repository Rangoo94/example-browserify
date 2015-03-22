(function() {
    'use strict';

    // Dispatch all boxes with tabs
    var TabBox = require('./modules/tab-box'),
        tabs = document.getElementsByClassName('tabs');

    //var request = require('./modules/request'),
    //    VarnishLog = require('./modules/log/varnish');
    //
    //request.get('data/varnish.log').then(function(data) {
    //    console.log('Success!', new VarnishLog(data));
    //}, function(err) {
    //    console.log('error!', err);
    //});

    for (var i = 0; i < tabs.length; i++) {
        TabBox.create(tabs[i]);
    }
}());
