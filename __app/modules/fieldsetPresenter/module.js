define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource',
    'angular-ui-date',
    'angular-google-maps'
], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.fieldsetPresenter', ['ui.router', 'ngResource', 'ui.date', 'google-maps'.ns()]);

    module.config(function ($stateProvider, $couchPotatoProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyARh9SCNR-vNADst2P-co2fPy0yiSKhP64',
            v: '3.17'
        });
        $stateProvider
            .state('app.fieldsetPresenter', {
                url: '/fieldsetPresenter/:id',
                data: {
                    title: 'fieldsetPresenter'
                },
                views: {
                    "content@app": {
                        controller: 'FieldsetPresenterController',
                        templateUrl: function ($stateParams) { return '/app/modules/fieldsetPresenter/views/index.tpl.html' },
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/fieldsetPresenter/controllers/FieldsetPresenterController',
                                'modules/global/services/FieldSetService',
                                'modules/fieldsetPresenter/controllers/EditOptionsCtrl',
                                'modules/fieldsetPresenter/controllers/AreaEditorCtrl'
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