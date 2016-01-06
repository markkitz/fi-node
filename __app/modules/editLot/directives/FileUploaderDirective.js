define(["modules/search/module"], function (module) {
    "use strict";

    module.registerDirective("fileUploader", function () {
        return {
            restrict: "E",
            templateUrl: "/app/modules/editLot/views/directives/fileUploader.tpl.html",
            controller: function ($scope) {

                $scope.editMillRate = function () {
                    console.log("hit");
                };

            }
        }
    });
});