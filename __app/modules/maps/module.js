define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {
    "use strict";


    var module = ng.module('app.maps', ['ui.router', "ngResource"]);


    module.config(function ($stateProvider, $couchPotatoProvider, uiGmapGoogleMapApiProvider) {

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyARh9SCNR-vNADst2P-co2fPy0yiSKhP64',
            v: '3.17'
        });
        $stateProvider
            .state('app.maps', {
                url: '/maps',
                data: {
                    title: 'Maps'
                },
                views: {
                    "content@app": {
                        controller: 'MapsDemoCtrl',
                        templateUrl: 'app/modules/maps/views/maps-demo.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/maps/controllers/MapsDemoCtrl',

                            ]),
                            api: function(uiGmapGoogleMapApi){
                                return uiGmapGoogleMapApi;
                            }
                        }
                    }
                }
            });
    });

    couchPotato.configureApp(module);
    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;
});
