define(["layout/module"], function (module) {
    "use strict";

    module.registerController("NavigationCtrl", ["$scope", "LayoutService", "$window", function ($scope, layoutService, $window) {
        $scope.userNavigation = {};
        $scope.loadUserNavigation = function () {
            layoutService.getUserNavigation().success(function (data) {
                $scope.userNavigation = data;
                console.log($window);
            });
        };

        $scope.initialize = function () {
            $scope.loadUserNavigation();
        };

        //$scope.loginas = function () {
        //    $.SmartMessageBox({
        //        title: 'Login As',
        //        content: '<p>Enter the username</p><p><input class="form-control" id="txtUserName" type="text"/>',
        //        buttons: "[OK][Cancel]"
        //    }, function (buttonPressed) {
        //        if (buttonPressed == "OK") {
        //            var txtNote = angular.element("#txtUserName").val();
        //            layoutService.loginAs(txtNote).success(function (data) {
        //                $window.location.reload();
        //            });
        //        }
        //    }
        //    );
        //};

        console.log("NavigationCtrl loaded.");
    }]);
});