define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotSaleCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", "EditLotService",
        function ($scope, $state, $stateParams, $q, fieldSetService, editLotService) {
            var entityId;
            var saleId;
            $scope.otherLincs = [];
            $scope.currentLotLinc = null;
            $scope.fieldSetKeyData = {};
            $scope.fieldSetOwnerProfile = {};
            $scope.fieldSetDevelopmentProfile = {};
            $scope.fieldSetVendorProfile = {};
            $scope.fieldSetLandTitles = {};
            $scope.fieldSetRemarks = {};
            $scope.initialize = function () {
                console.log("EditLotSaleCtrl initialize hit");
                
                entityId = $stateParams.id;
                saleId = $stateParams.subEntityId;
                $q.all([
                    editLotService.getLINCsForSale(entityId, saleId),
                    fieldSetService.getFieldset("SALEKEYDATA", saleId),
                    fieldSetService.getFieldset("SALEENDUSEPROFILE", saleId),
                    fieldSetService.getFieldset("SALEOWNERPROFILE", saleId),
                    fieldSetService.getFieldset("SALEDEVELOPMENTPROFILE", saleId),
                    fieldSetService.getFieldset("SALEVENDORPROFILE", saleId),
                    fieldSetService.getFieldset("SALELANDTITLES", saleId),
                    fieldSetService.getFieldset("SALEREMARKS", saleId) 
                ]).then(function (dataArray) {
                    setupLINCS(dataArray[0].data);
                    $scope.fieldSetKeyData = dataArray[1].data;
                    $scope.fieldSetEndUseProfile = dataArray[2].data;
                    $scope.fieldSetOwnerProfile = dataArray[3].data;
                    $scope.fieldSetDevelopmentProfile = dataArray[4].data;
                    $scope.fieldSetVendorProfile = dataArray[5].data;
                    $scope.fieldSetLandTitles = dataArray[6].data;
                    $scope.fieldSetRemarks = dataArray[7].data;
                    $scope.$parent.editLotInitialized();
                });
            };
            $scope.addLINC = function () {                
                $.SmartMessageBox({
                    title: 'Add LINC',
                    content: '<p>Enter the LINC involved in this sale.</p><p><input class="form-control" id="txtLINC" type="text"/></p>',
                    buttons: "[Cancel][OK]"
                }, function (buttonPressed) {
                    if (buttonPressed == "OK") {
                        var linc = angular.element("#txtLINC").val();
                        editLotService.addLINCToSale(entityId, saleId, linc).success(function (data) {
                            setupLINCS(data);
                        });
                    }
                });
            };
            $scope.removeLINCFromSale = function (linc) {
                console.log(linc);
                editLotService.removeLINCFromSale(entityId, saleId, linc).success(function(data) {
                    setupLINCS(data);
                });
            };
            function setupLINCS(data)
            {
                $scope.otherLincs = data.otherLincs;
                $scope.currentLotLinc = data.currentLINC;
            }
        }]);
});




