
define(["modules/search/module"], function (module) {
    "use strict";

    module.registerFactory("EditLotService", ["$http", function ($http) {
        var ret = {};

        ret.addSale = function (entityId) {
            return $http.post("/Land/AddSale", { entityId: entityId });
        };
        ret.deleteSale = function (entityId, subEntityId) {
            return $http.post("/Land/DeleteSale", { entityId: entityId, subEntityId: subEntityId });
        };

        ret.addSupply = function (entityId) {            
            return $http.post("/Land/AddSupply", { entityId: entityId });
        };
        ret.deleteSupply = function (entityId, subEntityId) {
            return $http.post("/Land/DeleteSupply", { entityId: entityId, subEntityId: subEntityId });
        };
        ret.addZoning = function (entityId) {
            return $http.post("/Land/AddZoning", { entityId: entityId });
        };
        ret.deleteZoning = function (entityId, subEntityId) {
            return $http.post("/Land/DeleteZoning", { entityId: entityId, subEntityId: subEntityId });
        };
        ret.addTaxation = function (entityId) {
            return $http.post("/Land/AddTaxation", { entityId: entityId });
        };
        ret.deleteTaxation = function (entityId, subEntityId) {
            return $http.post("/Land/DeleteTaxation", { entityId: entityId, subEntityId: subEntityId });
        };
        ret.getLotStructure = function (entityId) {
            return $http.post("/Land/GetLotStructure", { entityId: entityId });
        };
        ret.getLINCsForSale = function (entityId, saleId) {
            return $http.post("/Land/GetLINCsForSale", {entityId:entityId, saleId: saleId });
        };
        ret.addLINCToSale = function (entityId, saleId, linc) {
            return $http.post("/Land/AddLINCToSale", { entityId: entityId, saleId: saleId, linc: linc });
        };
        ret.removeLINCFromSale = function (entityId, saleId, linc) {
            return $http.post("/Land/RemoveLINCFromSale", { entityId: entityId, saleId: saleId, linc: linc });
        };
        console.log("EditLotService loaded.");
        return ret;
    }]);
});
