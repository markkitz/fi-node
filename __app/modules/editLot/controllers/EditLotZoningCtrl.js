define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotZoningCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal) {
            var subEntityId;
            $scope.fieldSet_eventdate = {};
            $scope.fieldSet_existing = {};
            $scope.fieldSet_plansstudiesbriefs = {};
            $scope.fieldSet_proposed = {};
            $scope.fieldSet_encumbrances = {};
            $scope.fieldSet_remarks = {};


            $scope.initialize = function () {
                subEntityId = $stateParams.subEntityId;
                $q.all([
                    fieldSetService.getFieldset("ZONINGEVENTDATE", subEntityId),
                    fieldSetService.getFieldset("ZONINGEXISTING", subEntityId),
                    fieldSetService.getFieldset("ZONINGPLANSSTUDIESBRIEFS", subEntityId),
                    fieldSetService.getFieldset("ZONINGPROPOSED", subEntityId),
                    fieldSetService.getFieldset("ZONINGENCUMBRANCES", subEntityId),
                    fieldSetService.getFieldset("ZONINGREMARKS", subEntityId)
                ]).then(function (dataArray) {
                    $scope.fieldSet_eventdate = dataArray[0].data;
                    $scope.fieldSet_existing = dataArray[1].data;
                    $scope.fieldSet_plansstudiesbriefs = dataArray[2].data;
                    $scope.fieldSet_proposed = dataArray[3].data;
                    $scope.fieldSet_encumbrances = dataArray[4].data;
                    $scope.fieldSet_remarks = dataArray[5].data;
                    $scope.$parent.editLotInitialized();
                });
            };
        }]);
});



