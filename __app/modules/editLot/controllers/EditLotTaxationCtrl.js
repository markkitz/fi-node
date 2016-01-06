define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotTaxationCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal) {

            $scope.fieldSetCommericalLevy = {};
            $scope.fieldSetLocalImprovements = {};
            $scope.fieldSetOnsiteAnddOffSiteChanges = {};
            $scope.fieldSetDedication = {};
            $scope.fieldSetTaxForfeiture = {};
            $scope.fieldSetRemarks = {};
            var subEntityId;

            $scope.initialize = function () {

                subEntityId = $stateParams.subEntityId;
                $q.all([
                  fieldSetService.getFieldset("TAXATIONCOMMERCIALLEVY", subEntityId),
                  fieldSetService.getFieldset("TAXATIONLOCALIMPROVEMENTS", subEntityId),
                  fieldSetService.getFieldset("TAXATIONONSITEANDOFFSITECHARGES", subEntityId),
                  fieldSetService.getFieldset("TAXATIONDEDICATION", subEntityId),
                  fieldSetService.getFieldset("TAXATIONTAXFORFEITURE", subEntityId),
                  fieldSetService.getFieldset("TAXATIONREMARKS", subEntityId)
                ]).then(function (dataArray) {
                    $scope.fieldSetCommericalLevy = dataArray[0].data;
                    $scope.fieldSetLocalImprovements = dataArray[1].data;
                    $scope.fieldSetOnsiteAnddOffSiteChanges = dataArray[2].data;
                    $scope.fieldSetDedication = dataArray[3].data;
                    $scope.fieldSetTaxForfeiture = dataArray[4].data;
                    $scope.fieldSetRemarks = dataArray[5].data;
                    $scope.$parent.editLotInitialized();
                });
            };
        }]);
});