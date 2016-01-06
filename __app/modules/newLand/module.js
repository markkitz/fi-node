define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {
    "use strict";

    var module = ng.module('app.newLand', ['ui.router', "ngResource"]);

    module.config(function ($stateProvider, $couchPotatoProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyARh9SCNR-vNADst2P-co2fPy0yiSKhP64',
            v: '3.17'
        });
        $stateProvider
            .state('app.newLand', {
                url: '/newLand',
                data: {
                    title: 'New Land'
                },
                views: {
                    "content@app": {
                        controller: 'NewLandCtrl',
                        templateUrl: 'app/modules/newLand/views/newLand.tpl.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/newLand/controllers/NewLandCtrl',
                                'modules/global/services/LandService',

                            ]),
                            api: function (uiGmapGoogleMapApi) {
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
