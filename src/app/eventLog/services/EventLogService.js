define(["app"], function (module) {
    "use strict";

    module.registerFactory("EventLogService", ["$http", function ($http) {
        var ret = {};

        ret.getEventLogSearch = function (skip,take,searchText,type,userName) {
            return $http.post("/EventLog/GetEventLogSearch", { skip: skip, take: take, searchText: searchText, type: type, userName: userName});
        };

        console.log("EventLogService loaded.");
        return ret;
    }]);
});