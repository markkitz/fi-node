define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotCollectionProfileCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal', 'uiGmapGoogleMapApi',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal, uiGmapGoogleMapApi) {

            var entityId;
            //$scope.fieldsetLotCollectionsLocation = {};
            //$scope.fieldsetLotCollectionsSettings = {};
            //$scope.collectionLots = {};
            //$scope.parcelArea;
            //$scope.identifier = "";

            console.log(" registerController EditLotCollectionProfileCtrl");

            $scope.initialize = function () {
                console.log("EditLotCollectionProfileCtrl initialize hit");
                entityId = $stateParams.id;

                $q.all([
                        fieldSetService.getFieldset("LOTCOLLECTIONSLOCATION", entityId),
                        fieldSetService.getFieldset("LOTCOLLECTIONSETTINGS", entityId),
                        fieldSetService.getLotCollectionLots(entityId),
                        $scope.$parent.loadLands(entityId)
                ]).then(function (dataArray) {
                    $scope.fieldsetLotCollectionsLocation = dataArray[0].data;
                    $scope.fieldsetLotCollectionsSettings = dataArray[1].data;
                    $scope.collectionLots = dataArray[2].data;
                    $scope.identifier = findColumnByLabel(dataArray[1].data, "Identifier");
                    $scope.parcelArea = findColumnByLabel(dataArray[0].data, "Parcel Area (acres)");
                    $scope.$parent.editLotCollectionInitalized();
                });



            };
            $scope.addLot = function () {
                var view = "/app/modules/editLotCollection/views/addLot-modal.tpl.html";
                var controller = "AddLotModuleCtrl";
                var parameter = {
                    inputs: function () {
                        var inputs = {};
                        inputs.entityId = entityId;
                        return inputs;
                    }
                };
                var modalInstance = $modal.open({
                    templateUrl: view,
                    controller: controller,
                    resolve: parameter,
                    size: 'md'
                });
                modalInstance.result.then(function (x) {
                    console.log("modal returned" + x);
                    fieldSetService.getLotCollectionLots(entityId).success(function (data) {
                        console.log("getLotCollectionLots success");
                        $scope.collectionLots = data;
                    });

                }, function (x) {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
            $scope.deleteLotCollectionLot = function (linc) {
                console.log("deleteLotCollectionLot:" + linc);

                fieldSetService.deleteLotCollectionLot(entityId, linc).success(function (data) {
                    console.log(data);
                    $scope.collectionLots = data;
                });


            };
            $scope.editLotCollectionLot = function (lot) {
                var view = "/app/modules/editLotCollection/views/addLot-modal.tpl.html";
                var controller = "AddLotModuleCtrl";
                var parameter = {
                    inputs: function () {
                        var inputs = {};
                        inputs.entityId = entityId;
                        inputs.lot = lot;
                        return inputs;
                    }
                };
                var modalInstance = $modal.open({
                    templateUrl: view,
                    controller: controller,
                    resolve: parameter,
                    size: 'md'
                });
                modalInstance.result.then(function (x) {
                    console.log("modal returned" + x);
                    fieldSetService.getLotCollectionLots(entityId).success(function (data) {
                        console.log("getLotCollectionLots success");
                        $scope.collectionLots = data;
                    });

                }, function (x) {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
            $scope.recalculateParcelArea = function () {
                var total = 0;
                $($scope.collectionLots).each(function () {
                    total += this.ParcelAreaAcres;
                });
                console.log($scope.collectionLots);

                $scope.parcelArea.value = total;
            };

        }]);



    console.log("EditLotCollectionProfileCtrl");
    function findColumnByLabel(data, label) {
        var rtn = null;
        $(data.rows).each(function () {
            $(this.columns).each(function () {
                if (this.label == label) {
                    rtn = this;
                }
            });
        });
        return rtn;
    }
});

