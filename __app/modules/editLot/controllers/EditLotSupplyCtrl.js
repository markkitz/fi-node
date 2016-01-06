define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotSupplyCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal) {
            var entityId;
            var supplyId;
            $scope.fieldSetKeyData = {};
            $scope.fieldSetDocumentation = {};
            $scope.fieldSetPricing = {};
            $scope.fieldSetRemarks = {};
            $scope.initialize = function () {
                console.log("EditLotSupplyCtrl initialize hit");
                entityId = $stateParams.id;
                supplyId = $stateParams.subEntityId;

                $q.all([
                   //editLotService.getLINCsForSale(entityId, saleId),
                   fieldSetService.getFieldset("SUPPLYKEYDATA", supplyId),
                   fieldSetService.getFieldset("SUPPLYDOCUMENTATION", supplyId),
                   fieldSetService.getFieldset("SUPPLYPRICING", supplyId),
                   fieldSetService.getFieldset("SUPPLYREMARKS", supplyId)                     
                ]).then(function (dataArray) {
                    //setupLINCS(dataArray[0].data);
                    $scope.fieldSetKeyData = dataArray[0].data;
                    $scope.fieldSetDocumentation = dataArray[1].data;
                    $scope.fieldSetPricing = dataArray[2].data;
                    $scope.fieldSetRemarks = dataArray[3].data;
                    $scope.$parent.editLotInitialized();
                });
            };
        }]);
});