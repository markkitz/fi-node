define(['angular',
    'angular-couch-potato',
    'angular-ui-router'], function (ng, couchPotato) {

    "use strict";


    var module = ng.module('app.layout', ['ui.router']);


    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {


        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        controller: "LayoutCtrl",
                        templateUrl: 'app/layout/layout.tpl.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'auth/directives/loginInfo',
                                'layout/controllers/LayoutCtrl',
                                'layout/controllers/NavigationCtrl'
                            ])
                        }
                    }
                }
            });
        $urlRouterProvider.otherwise('/search');

    });

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;

});
