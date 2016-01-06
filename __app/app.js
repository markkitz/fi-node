'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-animate',
    'angular-cookies',
    'angular-sanitize',
    'angular-bootstrap',
    'angular-file-upload',
    'angular-diff-match-patch',
    'smartwidgets',
    'notification'
], function (ng, couchPotato) {

    var app = ng.module('app', [
        
        'scs.couch-potato',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'angularFileUpload',
        'diff-match-patch',
        'ui.router',
        'ui.bootstrap',
        // App
        'app.auth',
        'app.layout',
        'app.fieldsetPresenter',
        'app.lotCollection',
        'app.search',
        'app.maps',
        'app.newLand'
    ]);

    couchPotato.configureApp(app);

    app.config(function ($provide, $httpProvider, $urlRouterProvider) {
        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;
            function notifyError(rejection) {
                
                var errorMessage = "Unknown Error";
                var startOfH2 = rejection.data.indexOf("<i>");
                var endOfH2 = rejection.data.indexOf("</i>");
                
                if (startOfH2 > -1)
                {
                    errorMessage = rejection.data.substring(startOfH2 + 3, endOfH2);
                }

                var errorMessage = rejection.data.substring(startOfH2 + 3, endOfH2);
                console.log("***rejection***",startOfH2, endOfH2, errorMessage, rejection);

                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: errorMessage,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter
                });
            }

            

            $urlRouterProvider.when('/search', '/search/map/');

            //Added by Ed 
            $urlRouterProvider.rule(function ($injector, $location) {
                //what this function returns will be set as the $location.url
                var path = $location.path(), normalized = path.toLowerCase();
                if (path != normalized) {
                    //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
                    $location.replace().path(normalized);
                }
                // because we've returned nothing, no state change occurs
            });


            return {
                // On request failure
                requestError: function (rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');

    }).filter("jsonDate", function ($filter) {
        return function (input, format) {
            return $filter("date")(parseInt(input.substr(6)), format);
        };
    }).filter("yesNo", function () {
        return function (input) {
            return input ? "Yes" : "No";
        };
    }).filter("paragraph", function ($sce) {
        return function (input) {
            if (input == null) return input;
            var para = input.split("\n");
            var ret = "";
            for (var i = 0; i < para.length; i++) {
                ret += para[i] + (i != para.length - 1 ? "<br />" : "");
            }
            return ret;
        };
    }).filter("urlLink", function () {
        return function (input) {
            var ret = input.toLowerCase();
            if (ret.indexOf("http://") == -1 && ret.indexOf("https://") == -1) ret = "http://" + ret;
            return ret;
        };
    }).filter("simpleHTML", function ($filter, $sce) {
        return function (input) {
            if (input == null) return input;
            var ret = input;
            var replaceTags = [{ o: "[b]", r: "<b>" }, { o: "[/b]", r: "</b>" }, { o: "[i]", r: "<i>" }, { o: "[/i]", r: "</i>" }, { o: "[u]", r: "<u>" }, { o: "[/u]", r: "</u>" }];
            for (var i = 0; i < replaceTags.length; i++) {
                while (ret.indexOf(replaceTags[i].o) >= 0) {
                    ret = ret.replace(replaceTags[i].o, replaceTags[i].r);
                }
            }
            var start = ret.indexOf("[url]");
            while (start >= 0) {
                var end = ret.indexOf("[/url]", start) + 6;
                var tag = ret.substr(start, end - start);
                var url = tag.replace("[url]", "").replace("[/url]", "");
                ret = ret.replace(tag, "<a target='_blank' href='" + $filter("urlLink")(url) + "'>" + url + "</a>");
                start = ret.indexOf("[url]", start);
            }
            if (ret.indexOf("[*]") >= 0) {
                var lines = ret.split("\n");
                ret = "";
                var isULStarted = false;
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].indexOf("[*]") == 0) {
                        if (!isULStarted) {
                            ret += "<ul class='ulAlign'>";
                            isULStarted = true;
                        }
                        ret += "<li>" + lines[i].replace("[*]", "") + "</li>";
                    }
                    else {
                        if (isULStarted) {
                            ret += "</ul>";
                            isULStarted = false;
                        }
                        ret += lines[i] + "<br />";
                    }
                }
                if (isULStarted) ret += "</ul>";
                return $sce.trustAsHtml(ret);
            }
            else return $sce.trustAsHtml($filter("paragraph")(ret));
        };
    });

    app.run(function ($couchPotato, $rootScope, $state, $stateParams) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';
    });

    return app;
});
