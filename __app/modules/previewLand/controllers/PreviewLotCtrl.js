define(['modules/search/module'], function (module) {
    'use strict';


    module.registerController('PreviewLotCtrl', ['$scope', "$stateParams", '$q', '$modalInstance', 'LandService', 'inputs',
        function ($scope,$stateParams,  $q, $modalInstance, landService, inputs) {
            var entityId;
            $scope.initialize = function () {
                console.log("PreviewLotCtrl initalized");
                entityId = inputs.entityId;
                console.log("EntityId: " +entityId);
                $q.all([
                    landService.getLot(entityId)
                ]).then(function (dataArray) {
                    $scope.lot = dataArray[0].data;
                    console.log($scope.lot);
                });


                setTimeout(function () {
                    //in order for map to load proper, wait a bit
                    $scope.showPreviewMap = true;
                    
                }, 100);
            };

            $scope.lot = null;

            $scope.showPreviewMap = false;
            
            $scope.mapDto = {
                center: {
                    latitude: 53.4495215867747,
                    longitude: -113.472417473793
                },
                zoom: 18,
                bounds: {},
                options: {
                    maxZoom: 20,
                    minZoom: 10,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                }
            };



            $scope.polygons = [{
                id: 1,
                location:[{latitude:53.448992290139245,longitude:-113.47317881374352},{latitude:53.44896440689974,longitude:-113.47225158424379},{latitude:53.44987555643112,longitude:-113.47171514244081},{latitude:53.4500517548068,longitude:-113.47247607498161}]
                
                }];
             

            $scope.geoFill = {
                opacity: 0.3,
                color: "#00868B"
            };
            $scope.geoStroke = {
                color: "#00868B",
                weight:2
            };


            $scope.save = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            console.log("PreviewLotCtrl loaded");

        }]);
});