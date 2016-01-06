define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotTransportationCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService","TrafficFlowService",
        function ($scope, $state, $stateParams, $q, fieldSetService, trafficFlowService) {
            var entityId;
            $scope.fieldSetTransportation = {};
            $scope.trafficFlows = {}
            $scope.initialize = function () {
                console.log("EditLotTransportationCtrl initialize hit");
                entityId = $stateParams.id;       

                $q.all([
                    fieldSetService.getFieldset("TRANSPORTATION", entityId),
                    trafficFlowService.getTrafficFlowsForLot(entityId),
                    $scope.$parent.loadLands(entityId)
                ]).then(function (dataArray) {
                    $scope.fieldSetTransportation = dataArray[0].data;
                    $scope.trafficFlows = dataArray[1].data;
                    $scope.$parent.editLotInitialized();
                });

            };
            $scope.addTrafficFlow = function () {
                trafficFlowService.addTrafficFlow(entityId).success(function (data) {
                    $scope.trafficFlows = data;
                });
            };
            $scope.deleteTrafficFlow = function (trafficFlow) {
                trafficFlowService.deleteTrafficFlow(entityId, trafficFlow).success(function (data) {
                    $scope.trafficFlows = data;
                });
            };
            $scope.editTrafficFlow = function (trafficFlow) {
                trafficFlowService.editTrafficFlow(entityId, trafficFlow).success(function (data) {
                    //$scope.trafficFlows = data;
                });
            };
        }]);
});
