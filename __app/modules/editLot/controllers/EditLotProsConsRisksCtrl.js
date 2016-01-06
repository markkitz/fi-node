define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotProsConsRisksCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", 
        function ($scope, $state, $stateParams, $q, fieldSetService) {
            var entityId;
            $scope.fieldSetProsandCons = {};
            $scope.fieldSetEnvironmentalRisk = {};
           
            $scope.initialize = function () {
                console.log("EditLotProsConsRisksCtrl initialize hit");
                entityId = $stateParams.id;       

                $q.all([
                    fieldSetService.getFieldset("PROSANDCONS", entityId),
                    fieldSetService.getFieldset("ENVIRONMENTALRISK", entityId),
                    $scope.$parent.loadLands(entityId)
                ]).then(function (dataArray) {
                    $scope.fieldSetProsandCons = dataArray[0].data;
                    $scope.fieldSetEnvironmentalRisk = dataArray[1].data;
                    $scope.$parent.editLotInitialized();
                });

            };
           
        }]);
});
