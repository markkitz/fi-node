
define(["modules/search/module"], function (module) {
    "use strict";

    module.registerFactory("SearchService", ["$http", function ($http) {
        var ret = {};

        ret.search = function (skip, take) {
            var rtn = $http.post("/Search/search", { skip: skip, take: take });
            return rtn;
        };
        ret.getMarkers = function (searchText) {
            var rtn = $http.post("/Search/getMarkers", { searchText: searchText });
            return rtn;
        };

        console.log("SearchService loaded.");
        return ret;
    }]);
});
