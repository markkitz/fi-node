
define(["modules/search/module"], function (module) {
    "use strict";

    module.registerFactory("TrafficFlowService", ["$http", function ($http) {
        var ret = {};

        ret.getTrafficFlowsForLot = function (entityId) {
            return $http.post("/FieldSet/GetTrafficFlowsForLot", { entityId: entityId });      
        };
        ret.addTrafficFlow = function (entityId) {
            return $http.post("/FieldSet/AddTrafficFlow", { entityId: entityId });
        };
        ret.editTrafficFlow = function (entityId, flow) {
            return $http.post("/FieldSet/editTrafficFlow", {entityId: entityId, flow:flow});
        };
        ret.deleteTrafficFlow = function (entityId, flow) {
            console.log("deleteTrafficFlow", entityId);
            return $http.post("/FieldSet/deleteTrafficFlow", {entityId: entityId, flow: flow });
        };
        console.log("TrafficFlowService loaded.");
        return ret;
    }]);
});
