define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("NewLandCtrl", ["$scope", "$state", "$stateParams", '$q', 'LandService', 'uiGmapGoogleMapApi', function ($scope, $state, $stateParams, $q, landService, uiGmapGoogleMapApi) {
    //    $scope.initalize = function () {
    //        console.log("NewLandCtrl initialize");
    //    };
    //    $scope.newLotClick = function () {


    //        landService.newLot().success(function (data) {
    //            $state.go("app.search.editLot.profile", { id: data });
    //        });
            
    //    };
    //}]);
        //console.log("new lot ctrl");

        console.log("New Land Map***", uiGmapGoogleMapApi);


        $scope.mapDto = {};
        $scope.polygons = [];
        $scope.polygons_start = [];
        $scope.marker = { id: 0 };
        $scope.marker_start = {};
        $scope.hasChanged = false;
        $scope.showEditMap = false;
        $scope.geoFill = { opacity: 0.4, color: "#00868B" };
        $scope.geoStroke = { color: "#00868B", weight: 2 };
        $scope.geoCodeAddress = "";
        $scope.area = "";

        $scope.addressGetter = {};


        $scope.centralLatitude = 53.5410;
        $scope.centralLongitude = -113.49364;
        $scope.marker = { id: 0 };
        var zoom = 12;

        $scope.initialize = function () {
            console.log("new land ctrl");
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

           
            $scope.marker_start = angular.copy($scope.marker);

            //tableHeightSize();
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

        
            var lat = $scope.marker.coords.latitude;
            var long = $scope.marker.coords.longitude;
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
        $scope.getAddress = function () {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng($scope.marker.coords.latitude, $scope.marker.coords.longitude);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    $scope.addressGetter = { isInCity: false, cityAddress: { addressNumber: "", roadwayName: "", roadwayType: "", quadrant: "", jurisdiction: "", postalCode: "" } };
                    
                    $scope.addressGetter.isInCity = results[0].types[0] == "street_address";
                    console.log(results);
                    console.log("ADDRESS GETTER:", $scope.addressGetter, results[0].address_components[0].types[0]);



                    if($scope.addressGetter.isInCity)
                    {
                        
                        $scope.addressGetter.cityAddress.addressNumber = results[0].address_components[0].long_name;
                        var route = results[0].address_components[1];

                        var routeArray = results[0].address_components[1].long_name.split(' ');
                        if (routeArray.length == 3)
                        {
                            $scope.addressGetter.cityAddress.roadwayName = routeArray[0];
                            $scope.addressGetter.cityAddress.roadwayType = routeArray[1];
                            var quadrant = routeArray[2];
                            if(quadrant == "Northwest")
                            {
                                $scope.addressGetter.cityAddress.quadrant = "NW";
                            }
                            else if (quadrant == "Northeast") {
                                $scope.addressGetter.cityAddress.quadrant = "NE";
                            }
                            else if (quadrant == "Southwest") {
                                $scope.addressGetter.cityAddress.quadrant = "SW";
                            }
                            else if (quadrant == "Southeast") {
                                $scope.addressGetter.cityAddress.quadrant = "SE";
                            }
                        }
                        if (routeArray.length == 2) {
                            $scope.addressGetter.cityAddress.roadwayName = routeArray[0];
                            $scope.addressGetter.cityAddress.roadwayType = routeArray[1];
                            
                        }
                        var oLocality = results[0].address_components[3];
                        if (oLocality.types[0] == "locality")
                        {
                            $scope.addressGetter.cityAddress.jurisdiction = oLocality.long_name;

                        }
                        var oPostalCode = results[0].address_components[7];
                        if (oPostalCode.types[0] == "postal_code") {
                            $scope.addressGetter.cityAddress.postalCode = oPostalCode.long_name;

                        }
                        console.log("in");
                    }
                    else
                    {
                        console.log("not");
                    }
                    //AddressNumber

                    //Roadway Name

                    //RoadwayType

                    //Quadrant

                    $scope.geoCodeAddress = results;
                } else {
                    $scope.geoCodeAddress = 'Geocoder failed due to: ' + status;
                }
            });

            if ($scope.polygons.length > 0)
            {
                var googleLatLngs = [];
                for (var i in $scope.polygons[0].location) {
                    googleLatLngs.push(new google.maps.LatLng($scope.polygons[0].location[i].latitude, $scope.polygons[0].location[i].longitude));
                }
                var area = google.maps.geometry.spherical.computeArea(googleLatLngs);
                $scope.area = (Math.round(area * 0.00024711 * 100) / 100) + " acres"; 
            }
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
