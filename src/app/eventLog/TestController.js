define(["modules/test/module"], function (module) {
    "use strict";

    module.registerController("TestCtrl", ["$scope", "$state", function ($scope, $state) {
        console.log("TestCtrl loaded.");
    }]);
});
