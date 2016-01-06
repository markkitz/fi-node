define([
    'angular',
    'angular-couch-potato',
        'angular-ui-router',
    'angular-resource',
    'angular-ui-date',
    'angular-google-maps'
], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.lotCollection', ['ui.router', 'ngResource', 'ui.date', 'google-maps'.ns()]);

    module.config(function ($stateProvider, $couchPotatoProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyARh9SCNR-vNADst2P-co2fPy0yiSKhP64',
            v: '3.17'
        });
        $stateProvider
            .state('app.lotCollection', {
                url: '/lotCollection/:id',
                data: {
                    title: 'Group or Set Lots'
                },
                views: {
                    "content@app": {
                        controller: 'LotCollectionController',
                        templateUrl: function ($stateParams) { return '/app/modules/lotCollection/views/index.tpl.html' },
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/lotCollection/controllers/LotCollectionController',
                                'modules/global/services/FieldSetService',
                                'modules/fieldsetPresenter/controllers/EditOptionsCtrl',
                                'modules/fieldsetPresenter/controllers/AreaEditorCtrl',
                                'modules/lotCollection/controllers/AddLotModuleCtrl'
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