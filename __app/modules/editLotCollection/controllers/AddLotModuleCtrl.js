define(['modules/lotCollection/module'], function (module) {
    'use strict';
    module.registerController('AddLotModuleCtrl', ['$scope', '$modalInstance', 'inputs', 'FieldSetService',
        

        function ($scope, $modalInstance, inputs, fieldSetService) {
            console.log(inputs);
            $scope.error = "";            
            $scope.lot = inputs.lot;
            var existingLINC;
            if (inputs.lot != null)
            {
                existingLINC = inputs.lot.LINC;
            }
            var entityId = inputs.entityId;
            $scope.initialize = function () {
                console.log("AddLotModuleCtrl ctrl initalized")            
            };

            $scope.save = function () {
                fieldSetService.saveLotCollection(entityId, $scope.lot, existingLINC).success(function (data) {
                    console.log(data.length > 0);
                    if (data.length> 0)
                    {
                        $scope.error = data;
                    }
                    else
                    {
                        console.log("save hit");
                    
                        $modalInstance.close();
                    }
                });               
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.search = function () {
                console.log("search hit");
                console.log("LINC: " + $scope.lot.LINC);

                fieldSetService.searchForLINCForLotCollection($scope.lot.LINC).success(function (data) {
                    $scope.lot.Plan = data.Plan;
                    $scope.lot.Plan = data.Plan;
                    $scope.lot.Block = data.Block;
                    $scope.lot.Lot = data.Lot;
                    $scope.lot.Portion = data.Portion;
                    $scope.lot.Section = data.Section;
                    $scope.lot.Township = data.TownTownship
                    $scope.lot.Range = data.Range;
                    $scope.lot.Meridian = data.Meridian;
                    $scope.lot.ParcelAreaAcres = data.ParcelArea;
                    $scope.lot.MunicipalAddress = data.Address;
                });
            };

            console.log('AddLotModuleCtrl Loaded');
    }]);
});