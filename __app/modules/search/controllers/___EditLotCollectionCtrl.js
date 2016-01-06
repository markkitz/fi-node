define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotCollectionCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal', 'uiGmapGoogleMapApi',
        function ($scope, $state, $stateParams, $q, fieldSetService, $modal, uiGmapGoogleMapApi) {

            $scope.fieldsetLotCollectionsLocation = {};
            $scope.fieldsetLotCollectionsSettings = {};
            $scope.collectionLots = {};
            $scope.parcelArea;
            $scope.identifier = "";
            var entityId;
            $scope.initialize = function () {
                $scope.isLoading = true;
                entityId = $stateParams.id;      

                $q.all([
                    fieldSetService.getFieldset("LOTCOLLECTIONSLOCATION", entityId),
                    fieldSetService.getFieldset("LOTCOLLECTIONSETTINGS", entityId),
                    fieldSetService.getLotCollectionLots(entityId)
                ]).then(function (dataArray) {
                    $scope.fieldsetLotCollectionsLocation = dataArray[0].data;
                    $scope.fieldsetLotCollectionsSettings = dataArray[1].data;
                    $scope.collectionLots = dataArray[2].data;
                    $scope.identifier = findColumnByLabel(dataArray[1].data, "Identifier");
                    $scope.parcelArea = findColumnByLabel(dataArray[0].data, "Parcel Area (acres)");
                    $scope.$parent.isLoading = false;
                    $scope.$parent.showLotCollectionEditor = true;
                });
            };
            $scope.viewLotCollection = function (parcel) {
                hideAll();
                $scope.showLotCollectionPreview = true;
                $scope.selected = parcel;
            };

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
            $scope.recalculateParcelArea = function () {
                var total = 0;
                $($scope.collectionLots).each(function () {
                    total += this.ParcelAreaAcres;
                });
                console.log($scope.collectionLots);

                $scope.parcelArea.value = total;
            };
            $scope.areaEditor = function (column) {
                var view = "/app/modules/fieldsetPresenter/views/areaEditor-modal.tpl.html";
                var controller = "AreaEditorCtrl";
                var parameter = {
                    inputs: function () {
                        var ret = {};
                        ret.fieldId = column.fieldId;
                        ret.fieldLabel = column.label;
                        return ret;
                    }
                };
                var modalInstance = $modal.open({
                    templateUrl: view,
                    controller: controller,
                    resolve: parameter,
                    size: 'sm'
                });
                modalInstance.result.then(function (x) {
                    console.log("modal returned" + x);
                    $scope.loadTree();
                }, function (x) {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
            $scope.editOptions = function (column) {
                var view = "/app/modules/fieldsetPresenter/views/editOptions-modal.tpl.html";
                var controller = "EditOptionsCtrl";
                var parameter = {
                    inputs: function () {
                        var ret = {};
                        ret.fieldId = column.fieldId;
                        ret.fieldLabel = column.label;
                        return ret;
                    }
                };
                var modalInstance = $modal.open({
                    templateUrl: view,
                    controller: controller,
                    resolve: parameter,
                    size: 'sm'
                });
                modalInstance.result.then(function (x) {
                    console.log("modal returned" + x);
                    $scope.loadTree();
                }, function (x) {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };      


        }]);

});