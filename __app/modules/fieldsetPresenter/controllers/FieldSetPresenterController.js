define(['modules/fieldsetPresenter/module'], function (module) {

    'use strict';


    module.registerController('FieldsetPresenterController', ['$scope', '$stateParams', 'FieldSetService', '$modal',  'uiGmapGoogleMapApi',
    function ($scope, $stateParams, fieldSetService, $modal, uiGmapGoogleMapApi) {

        ////$scope.styles = SmartMapStyle.styles;

        ////uiGmapGoogleMapApi.then(function (maps) {
        ////    maps.visualRefresh = true;
        ////});


        ////$scope.setType = function (key) {
        ////    SmartMapStyle.getMapType(key).then(function (type) {
        ////        $scope.mapInstance.mapTypes.set(key, type);
        ////        $scope.mapInstance.setMapTypeId(key);
        ////    });
        ////    $scope.currentType = key;
        ////};

        ////SmartMapInstances.getMap('demoMap').then(function (instance) {
        ////    $scope.mapInstance = instance
        ////});


        //$scope.map = {
        //    center: {
        //        latitude: 53.554599, longitude: -113.637278
        //    },
        //    zoom: 10
        //};

        ////$scope.options = {
        ////    scrollwheel: false,
        ////    disableDefaultUI: true
        ////};
        $scope.center = new google.maps.LatLng(53.554599, -113.637278);



        var entityId;

        ////for debugging
        if ($stateParams == null || $stateParams.id == "")
            entityId = 1;
        else
            entityId = $stateParams.id;

            

        console.log(entityId);
        //$scope.fieldSetSummary = {};
        $scope.fieldSetSettings = {};
        $scope.fieldSetLINCs = {};
        $scope.fieldLocation = {};
        $scope.fieldConfiguration = {};
        $scope.address = "";


        $scope.initialize = function () {
            console.log("initalize hit");


            fieldSetService.getFieldset("SETTINGS", entityId).success(function (data) {
                
                $scope.fieldSetSettings = data;
            });
            fieldSetService.getFieldset("LINCS", entityId).success(function (data) {

                $scope.fieldSetLINCs = data;
            });
            fieldSetService.getFieldset("LOCATION", entityId).success(function (data) {

                $scope.fieldLocation = data;
            });
            //fieldSetService.getFieldset("CONFIGURATION", entityId).success(function (data) {

            //    $scope.fieldConfiguration = data;
            //});
            //fieldSetService.getFieldset("SUMMARY", entityId).success(function (data) {

            //    $scope.fieldSetSummary = data;
            //});
            fieldSetService.getField("ADDRESS", entityId, "AddressFormatter").success(function (data) {
                console.log("hit Address");
                $scope.address = data;
            });
        };
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


});