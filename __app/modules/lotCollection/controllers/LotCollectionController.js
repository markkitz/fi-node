define(['modules/lotCollection/module'], function (module) {

    'use strict';


    module.registerController('LotCollectionController', ['$scope', '$stateParams', 'FieldSetService', '$modal', 'uiGmapGoogleMapApi', '$sce',
    function ($scope, $stateParams, fieldSetService, $modal, uiGmapGoogleMapApi, $sce) {


        $scope.center = new google.maps.LatLng(53.554599, -113.637278);

        var entityId;

        //////for debugging
        //if ($stateParams == null || $stateParams.id == "")
        //    entityId = 1;
        //else
        entityId = $stateParams.id;



        console.log(entityId);
        $scope.fieldsetLotCollectionsLocation = {};
        $scope.fieldsetLotCollectionsSettings = {};
        $scope.collectionLots = {};
        $scope.parcelArea;
        $scope.identifier = "";

        $scope.initialize = function () {
            console.log("initalize hit lotCollection controller");


            fieldSetService.getFieldset("LOTCOLLECTIONSLOCATION", entityId).success(function (data) {
                $scope.parcelArea = findColumnByLabel(data, "Parcel Area (acres)");
                $scope.fieldsetLotCollectionsLocation = data;
            });
            fieldSetService.getFieldset("LOTCOLLECTIONSETTINGS", entityId).success(function (data) {
                
                $scope.identifier = findColumnByLabel(data, "Identifier");
                console.log($scope.identifier);
                $scope.fieldsetLotCollectionsSettings = data;
            });

            fieldSetService.getLotCollectionLots(entityId).success(function (data) {
                console.log("getLotCollectionLots success");
                $scope.collectionLots = data;
            });


        };

        function findColumnByLabel(data, label)
        {
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

        $scope.inputChanged = function (column) {
            console.log("input changed:" + column);
            column.isError = false;
            if (column.fieldType == "Numeric") {
                if (isNaN(column.value) && column.value != null) {
                    column.isError = true;
                    column.errorMessage = "Must be a number.";
                    return;
                }
            }

            column.isSaving = true;

            if (column.fieldType == "MultiSelect") {
                var values = [];

                column.multiSelectOptions.map(function (option) {
                    if (option.isChecked) {
                        values.push(option.id);
                    }
                });

                fieldSetService.saveMultiSelectField(entityId, column.fieldId, values).success(function (data) {
                    column.isSaving = false;
                });
            }
            else {

                fieldSetService.saveField(entityId, column.fieldId, column.value).success(function (data) {
                    column.isSaving = false;
                });
            }

        };
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
        $scope.addLot = function () {
            var view = "/app/modules/lotCollection/views/addLot-modal.tpl.html";
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
            var view = "/app/modules/lotCollection/views/addLot-modal.tpl.html";
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
        $scope.date = new Date('2011-04-11');
        $scope.dateOptions = {};
        console.log('fieldsetPresenter Loaded');
    }]);


    module.registerDirective('map', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attrs) {


                var map_options = {
                    zoom: 14,
                    center: scope.center,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                };

                // create map
                var map = new google.maps.Map(document.getElementById(attrs.id), map_options);

                // configure marker
                var marker_options = {
                    map: map,
                    position: scope.center
                };

                // create marker
                var marker = new google.maps.Marker(marker_options);

                scope.$watch('selected', function () {

                    window.setTimeout(function () {

                        google.maps.event.trigger(map, 'resize');
                    }, 100);

                });
            }
        }
    });

    module.registerFilter('unsafe', function ($sce) { return $sce.trustAsHtml; });

    module.registerDirective("compileHtml", function ($parse, $sce, $compile) {
        return {
            restrict: "A",
            link: function (scope, element, attributes) {

                var expression = $sce.parseAsHtml(attributes.compileHtml);

                
                var getResult = function () {
                    return expression(scope);
                };

                console.log($sce);

                scope.$watch(getResult, function (newValue) {
                    var linker = $compile(newValue);
                    element.append(linker(scope));
                });
            }
        }
    });


});