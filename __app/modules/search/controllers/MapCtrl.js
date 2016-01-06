define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("MapCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", 'SearchService', '$modal', 'uiGmapGoogleMapApi',
        function ($scope, $state, $stateParams, $q, fieldSetService, searchService, $modal, uiGmapGoogleMapApi) {
            $scope.mapMarkers = [];
            $scope.polygons = [];
            $scope.center = {
                latitude: 53.555,
                longitude: -113.637
            };
            $scope.map = {
                center: $scope.center,
                zoom: 10,
                bounds: {}
            };
            $scope.windowOptions = {};
            $scope.geoFill = {
                opacity: 0.4,
                color: "#00868B"
            };
            $scope.geoStroke = {
                color: "#00868B",
                weight: 2
            };
            var lotCollectionIconHref = "/styles/img/collection-marker.png";
            var lotSelectedIconHref = "/styles/img/blue-marker.png";

            $scope.initialize = function () {
                var entityId = $stateParams.id;
                $scope.$parent.showMap = true;
                tableHeightSize();
                $q.all([
                    $scope.$parent.loadLands(entityId)

                ]).then(function (dataArray) {
                    getMarkers();
                    $scope.$parent.isLoading = false;
                    console.log("Map loaded.");
                    if ($scope.$parent.selected != null) {
                        $scope.childMapObj.Locate($scope.$parent.selected);
                    }
                    console.log($scope.$parent.lands);
                });
            };
            $scope.$parent.childMapObj.Locate = function (land) {
                if (land.latitude == null || land.longitude == null)
                {
                    $scope.$parent.selected = land;
                    return;
                }


                $scope.map.center = {
                    latitude: land.latitude,
                    longitude: land.longitude
                };



                if (land == $scope.$parent.selected)
                    $scope.map.zoom = 15;
                else if ($scope.$parent.selected != null) {
                    var marker = getMarkerById($scope.$parent.selected.id);
                    if ($scope.$parent.selected.isLotCollection == false) {
                        marker.icon = null;
                    }
                }

                var marker = getMarkerById(land.id);
                if (land.isLotCollection == false) {
                    marker.icon = lotSelectedIconHref;
                }

                marker.options.animation = google.maps.Animation.BOUNCE;
                setTimeout(function () { marker.options.animation = null; }, 1000);
                $scope.$parent.selected = land;
            };

            /////// MAPPING ///////////////////////////////////////////////////////////
            function getMarkerById(id) {
                var result = $.grep($scope.mapMarkers, function (e) { return e.id == id; });
                if (result.length == 1)
                    return result[0];
                return null;
            }
            $scope.locateLand = function (land) {
                $scope.$parent.childMapObj.Locate(land);               
            };
            
            var getMarkers = function () {
                console.group("get Markers");
                $scope.mapMarkers = [];
                angular.forEach($scope.$parent.lands, function (land) {
                    var icon = null;
                    if(land.isLotCollection == true)
                    {
                        icon = lotCollectionIconHref;
                    }


                    if (land.latitude != null || land.longitude) {
                          var marker = {
                              id: land.id,
                              icon: icon,
                                latitude: land.latitude,
                                longitude: land.longitude,
                                options: { title: land.Id, animation: null },
                                show: false,
                                address: land.heading,
                            windowButtonClick: function() { alert("hit");}
                        };
                        console.log(land);
                        $scope.mapMarkers.push(marker);
                    }
                    if (land.polygonJson != null)
                    {
                        var polygon = {
                            id: land.id,
                            location: JSON.parse(land.polygonJson).location
                        };
                        $scope.polygons.push(polygon);
                    }                  
                });
                console.groupEnd();
            };
            $scope.markerClick = function (marker) {
                console.log("markerClick hit");
                if (marker.show) {
                    marker.show = false;
                } else {
                    _.forEach($scope.mapMarkers, function (curMarker) {
                        curMarker.show = false;
                        console.log(curMarker);
                    });
                    marker.show = true;
                }
            };
            $scope.openLandModal = function (id)
            {
                console.log(id);
            };            
            $scope.closeClick = function () {
                console.log("close");
            };
            
            console.log("Search controller loaded");
        }]);
});