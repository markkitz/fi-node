define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotMapCtrl", ["$scope", "$state", "$stateParams", '$q', "LandService", 'uiGmapGoogleMapApi', '$timeout', function ($scope, $state, $stateParams, $q, landService, uiGmapGoogleMapApi, $timeout) {

        var entityId;
        $scope.mapDto = {};
        $scope.polygons = [];
        $scope.polygons_start = [];
        $scope.marker = {id:0};
        $scope.marker_start = {};
        $scope.hasChanged = false;
        $scope.centralLatitude = null;
        $scope.centralLongitude = null;
        $scope.showEditMap = false;
        $scope.geoFill = { opacity: 0.4, color: "#00868B" };
        $scope.geoStroke = { color: "#00868B", weight: 2 };
        $scope.geoCodeAddress = "";
        $scope.area = "";

        $scope.showMap = false;

        $scope.initialize = function () {
                   
            entityId = $stateParams.id;
            $q.all([
               landService.getMapData(entityId),
               $scope.$parent.loadLands(entityId)
            ]).then(function (dataArray) {
                console.group("EditLotMapCtrl initialize then");
                var mapData = dataArray[0].data;
                $scope.$parent.editLotInitialized();
                var zoom = 17;               

                if (mapData.latitude == null || mapData.longitude == null )
                {
                    $scope.centralLatitude = 53.5410;
                    $scope.centralLongitude = -113.49364;
                    zoom = 12;
                }
                else
                {
                    $scope.centralLatitude = mapData.latitude;
                    $scope.centralLongitude = mapData.longitude;
                }
                $scope.mapDto = {
                    center: {
                        latitude: $scope.centralLatitude,
                        longitude: $scope.centralLongitude
                    },
                    zoom: zoom,
                    bounds: {},
                    options: {
                        maxZoom: 20,
                        minZoom: 3
                    }
                };
                if (mapData.polygonJson != null) {
                    $scope.polygons = makePolygon(entityId, JSON.parse(mapData.polygonJson).location);
                }
                $scope.polygons_start = angular.copy($scope.polygons);
                if (mapData.latitude == null || mapData.longitude == null) {
                    $scope.marker = { id: 0 };
                }
                else
                {
                    $scope.marker = getMarker($scope.centralLatitude, $scope.centralLongitude);
                    console.log($scope.marker);
                }
                $scope.marker_start = angular.copy($scope.marker);
                $timeout(function () { $scope.showMap = true; }, 0);                
                console.groupEnd();
            });

        };
        $scope.addPin = function () {
            var lat = $scope.mapDto.center.latitude;
            var long = $scope.mapDto.center.longitude;
            $scope.marker = getMarker(lat, long);
            $scope.hasChanged = true;
        };
        $scope.removePin = function () {
            $scope.marker = { id: 0 };
            $scope.hasChanged = true;
        };
        $scope.addPolygon = function () {
            var lat = $scope.mapDto.center.latitude;
            var long = $scope.mapDto.center.longitude;
            var spacing = 0.0003;
            $scope.polygons = [{
                id: 1,
                location: [{
                    latitude: lat - spacing,
                    longitude: long - spacing,
                }, {
                    latitude: lat - spacing,
                    longitude: long + spacing,
                }, {
                    latitude: lat + spacing,
                    longitude: long + spacing,
                }, {
                    latitude: lat + spacing,
                    longitude: long - spacing,
                }]
            }];
            $scope.hasChanged = true;
        };
        $scope.removePolygon = function () {
            $scope.polygons = [];
            $scope.hasChanged = true;
        };
        $scope.polyEvents = {
            mouseover: function (geo, eventName, model, args) {
                hasPolygonChanged();
            }
        }
        $scope.save = function () {
            console.log($scope.polygons);
            var location = null
            if ($scope.polygons != null) {
                location = $scope.polygons[0].location;
            }
            landService.saveMarkerAndPolygon(entityId, $scope.marker, location);
        }
        $scope.revert = function () {
            console.log($scope.marker);
        }   
        $scope.getAddress = function() {            
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng($scope.marker.coords.latitude, $scope.marker.coords.longitude);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results)
                    //if (results[0]) {
                    //    $scope.geoCodeAddress = results[0].formatted_address;
                    //} else {
                    //    $scope.geoCodeAddress = 'Location not found';
                    //}
                    $scope.geoCodeAddress = results;
                } else {
                    $scope.geoCodeAddress = 'Geocoder failed due to: ' + status;
                }
            });

            var googleLatLngs = [];

            for(var i in $scope.polygons[0].location)
            {
                googleLatLngs.push(new google.maps.LatLng($scope.polygons[0].location[i].latitude, $scope.polygons[0].location[i].longitude));
            }


            //var nyc = new google.maps.LatLng(40.715, -74.002);
            //var london = new google.maps.LatLng(51.506, -0.119);
            //var rio = new google.maps.LatLng(-22.916, -43.251);



            var area = google.maps.geometry.spherical.computeArea(googleLatLngs);
            $scope.area = (Math.round(area * 0.00024711 *100)/100 )+ " acres";
        };
        
        function makePolygon(id, locations) {
            return [{
                id: id,
                location: locations
            }];
        }
        function setEditMap() {
            console.log("setEditMap");

        }
        function hasPolygonChanged() {
            if (!$scope.hasChanged) {
                $scope.hasChanged = !angular.equals($scope.polygons, $scope.polygons_start);
            }

        }
        function hasMarkerChanged() {
            if (!$scope.hasChanged) {
                $scope.hasChanged = !angular.equals($scope.marker, $scope.marker_start);
            }
        }
        function getMarker(lat, long) {
            return {
                id: "1",
                icon: "/styles/img/blue-marker.png",
                coords: {
                    latitude: lat,
                    longitude: long
                },
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        console.log('marker dragend');
                        hasMarkerChanged();

                        //$scope.mapLatLongSelectorCenter.latitude = marker.getPosition().lat();
                        //$scope.mapLatLongSelectorCenter.longitude = marker.getPosition().lng();
                        //$scope.marker.options = {
                        //    draggable: true,
                        //    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        //    labelAnchor: "100 0",
                        //    labelClass: "marker-labels"
                        //};
                    }
                }
            }
        }
    }]);

});

