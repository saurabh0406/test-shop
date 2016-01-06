require.config({
        baseUrl: 'script',
        paths: {
            'jasmine': 'libs/jasmine-2.0.0/jasmine',
            'jasmine-html': 'libs/jasmine-2.0.0/jasmine-html',
            'boot': 'libs/jasmine-2.0.0/boot',
            'jasmine-jquery': 'libs/jasmine-2.0.0/jasmine-jquery',
            'jquery': 'libs/jquery-2.1.4.min'
        },
        shim: {
            'jasmine': {
                exports: 'window.jasmineRequire',
                deps:['jquery']
            },
            'jasmine-html': {
                deps: ['jasmine'],
                exports: 'window.jasmineRequire'
            },
            'boot': {
                deps: ['jasmine', 'jasmine-html'],
                exports: 'window.jasmineRequire'
            }
        }
    });
    var specs = [
        'tests/tests'
    ];
    require(['boot'], function() {
        require(specs, function() {
        	//triggering onload as jasmine boot starts working on this event 
            window.onload();
        });
    });