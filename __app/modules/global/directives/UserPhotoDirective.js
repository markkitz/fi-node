define(["app"], function (module) {
    "use strict";

    module.registerDirective("userPhoto", function () {
        return {
            restrict: "E",
            template: "<img ng-if='!photoString' src='/styles/img/avatars/male.png' class='{{styleClass}}'><img ng-if='photoString' ng-src='data:image/png;base64,{{photoString}}'  class='{{styleClass}}'>",
            scope: { userId: "=", styleClass: "@?" },
            controller: function ($scope, AccountService) {
                $scope.$watch("userId", function (newValue) {
                    if (!isGuid(newValue)) return;
                    $scope.photoString = getUserPhoto(newValue);
                    if ($scope.photoString === undefined) {
                        AccountService.getUserPhoto(newValue).success(function (data) {
                            $scope.photoString = data.photo;
                            addUserPhoto(newValue, $scope.photoString);
                        });
                    }
                });
            }
        };
    });
});