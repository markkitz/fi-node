define(['modules/maps/module'], function (module) {

    'use strict';

    module.registerController('MapsDemoCtrl', ['$scope', 'uiGmapGoogleMapApi',
        function ($scope, uiGmapGoogleMapApi) {


            $scope.map = {
                center: {
                    latitude: 59.4413345,
                    longitude: 24.8137725
                },
                zoom: 10
            }

            var foos = {
                0: {
                    id: 0,
                    name: "Main Foo",
                    coordinates: {
                        latitude: 59.4,
                        longitude: 24.8
                    }
                },
                1: {
                    id: 1,
                    name: "Another Foo",
                    coordinates: {
                        latitude: 59.5,
                        longitude: 24.8
                    }
                }
            }

            $scope.markers = {};
            _.forEach(foos, function (foo) {
                $scope.markers[foo.id] = {
                    id: foo.id,
                    foo: foo,
                    show: false,
                    options: {
                        maxWidth: 400
                    }
                };
            });

            $scope.markerClick = function (marker) {
                console.log("click");
                if (marker.show) {
                    marker.show = false;
                } else {
                    _.forEach($scope.markers, function (curMarker) {
                        curMarker.show = false;
                    });
                    marker.show = true;
                }
            };

            $scope.markerClose = function (marker) {
                marker.show = false;
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
            $scope.marker = {
                id:99,
                coords: {
                    latitude: 33.75,
                    longitude: -118
                },
                options: { draggable: true },
                events: {}
            };
            $scope.windowOptions = {


            };
            $scope.closeClick = function () {
                console.log("close");
            };
            $scope.title = "hot";

            $scope.geoFill = {
                opacity: 0.4,
                color: '#0000ff'
                
            };

            $scope.stringify = '[{"id":1,"location":[{"latitude":33.75,"longitude":-118},{"latitude":36,"longitude":-115},{"latitude":39,"longitude":-119}]}]';

            $scope.TestMap = function () {
                console.log($scope.polygons);
                $scope.polygons = JSON.parse($scope.stringify);
            };

            $scope.polyEvents = {
                mouseover: function (geo, eventName, model, args) {
                    console.log("mouse over");
                },
                mouseout: function (geo, eventName, model, args) {
                    console.log("mouse out");
                }
                //set_at: THIS IS WHAT I NEED!!!!!!!!!!!!
            }
        }]);

});
//http://stackoverflow.com/questions/29176269/listening-to-set-at-event-using-the-ui-gmap-polygon