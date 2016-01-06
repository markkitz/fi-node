
define(["modules/fieldsetPresenter/module"], function (module) {
    "use strict";

    module.registerFactory("FieldSetService", ["$http", function ($http) {
        var ret = {};

        ret.getFieldset = function (fieldSetIdentifier, entityId) {
            var rtn = $http.post("/FieldSet/GetFieldSet", { fieldSetIdentifier: fieldSetIdentifier, entityId: entityId });
            return rtn;
        };
        ret.saveField = function (entityId, fieldId, value) {
            var rtn = $http.post("/FieldSet/SaveField", { entityId: entityId, fieldId: fieldId, value: value });
            return rtn;
        };
        ret.saveMultiSelectField = function (entityId, fieldId, values) {
            var rtn = $http.post("/FieldSet/SaveMultiSelectField", { entityId: entityId, fieldId: fieldId, values: values });
            return rtn;
        };
        ret.getOptionsForField = function (fieldId) {
            return $http.post("/FieldSet/GetOptionsForField", { fieldId: fieldId });
        };
        ret.addOptionForField = function (fieldId, optionText) {
            return $http.post("/FieldSet/AddOptionForField", { fieldId: fieldId, optionText: optionText });
        };
        ret.deleteOptionForField = function (fieldId, optionId) {
            return $http.post("/FieldSet/deleteOptionForField", { fieldId: fieldId, optionId: optionId });
        };
        ret.getField = function (identifier, entityId, customFormatter) {
            return $http.post("/FieldSet/GetField", { identifier: identifier, entityId: entityId, customFormatter: customFormatter });
        };
        ret.getLotCollectionLots = function (entityId) {
            return $http.post("/FieldSet/GetLotCollectionLots", {  entityId: entityId });
        };
        ret.saveLotCollection = function (entityId, lot, previousLINC) {
            return $http.post("/FieldSet/SaveLotCollectionLot", { entityId: entityId, lotCollectionLot: lot, previousLINC: previousLINC });
        };
        ret.deleteLotCollectionLot = function (entityId, linc) {
            return $http.post("/FieldSet/DeleteLotCollectionLot", { entityId: entityId, linc: linc });
        };
        ret.searchForLINCForLotCollection = function (linc) {
            return $http.post("/FieldSet/SearchForLINCForLotCollection", {linc:linc});
        }
        
        console.log("FieldSetService loaded.");
        return ret;
    }]);
});
