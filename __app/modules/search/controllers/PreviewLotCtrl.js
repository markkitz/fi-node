define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("PreviewLotCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal', 'uiGmapGoogleMapApi',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal, uiGmapGoogleMapApi) {

            $scope.initialize = function () {
                console.log("initialize");
                entityId = $stateParams.id;
                
                $q.all([
                    $scope.$parent.loadLands(entityId)
                ]).then(function (dataArray) {
                    tableHeightSize();
                    $scope.$parent.isLoading = false;
                    $scope.$parent.showPreview = true;
                    setTimeout(function () {
                        //in order for map to load proper, wait a bit
                        $scope.showPreviewMap = true;              
                        }, 100);                    
                });


            };


 
            $scope.mapDto = {
                center: {
                    latitude: 36,
                    longitude: -116
                },
                zoom: 5,
                bounds: {},
                options: {
                    maxZoom: 20,
                    minZoom: 3
                }
            };

            $scope.polygons = [{
                id: 1,
                location: [{
                    latitude: 33.75,
                    longitude: -118
                }, {
                    latitude: 36,
                    longitude: -115
                }, {
                    latitude: 39,
                    longitude: -119
                }]
            }];

            $scope.geoFill = {
                opacity: 0.4,
                color: "#00868B"
            };
            $scope.geoStroke = {
                color: "#00868B",
                weight:2
            };

            var entityId = null;
            
        


            console.log("PreviewLotCtrl loaded.");
        }]);
    
});
