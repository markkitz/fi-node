define(["modules/search/module"], function (module) {
    "use strict";

    module.registerFactory("LandService", ["$http", function ($http) {
        var ret = {};

        ret.getMapData = function ( entityId) {
            var rtn = $http.post("/Land/GetMapData", { entityId: entityId });
            return rtn;
        };        
        ret.saveMarkerAndPolygon = function (entityId, marker, locations) {
            var lat = null;
            var long = null;
            var loc = null;
            if (marker != null) {
                lat = marker.coords.latitude;
                long = marker.coords.longitude;
            }
            if (locations != null)
            {
                loc = JSON.stringify(locations);
                loc = '{ "location": ' + loc + '}';
                console.log(loc);
            }
            console.log(locations);
            var rtn = $http.post("/Land/SaveMarkerAndPolygon", { entityId: entityId, latitude: lat, longitude: long, locations: loc  });
            return rtn;
        };

        ret.newLot = function () {
            return $http.post("/Land/NewLot", {});

        };
        ret.getLot= function (entityId) {
            return $http.post("/Land/GetLot", { entityId: entityId });
        }
        ret.isLandUrban = function (entityId) {
            return $http.post("/Land/isLandUrban", { entityId: entityId });
        }


        console.log("LandService loaded.");
        return ret;
    }]);
});
