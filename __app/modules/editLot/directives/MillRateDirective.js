define(["modules/search/module"], function (module) {
    "use strict";

    module.registerDirective("millRate", function () {
        return {
            restrict: "E",
            templateUrl: "/app/modules/editLot/views/directives/millRate.tpl.html",
            controller: function ($scope) {

                $scope.editMillRate = function () {
                    console.log("hit");
                };
                
            }
        }
    });
});