define(['modules/fieldsetPresenter/module'], function (module) {
    'use strict';

    module.registerController('SearchCtrl', ['$scope', 'SearchService', 'FieldSetService', '$modal', '$upload', 'uiGmapGoogleMapApi', '$sce', '$q', "$state",
    function ($scope, searchService, fieldSetService, $modal, $upload, uiGmapGoogleMapApi, $sce, $q, $state) {

        /////////// LOCAL VARIABLES /////////////////////////////////
        $scope.selected = null;
        $scope.courseDetails = null;
        $scope.allLoaded = false;
        $scope.lands = null;
        $scope.showMap = false;
        $scope.showEditor = false;
        $scope.showLotCollectionEditor = false;
        $scope.showPreview = false;
        $scope.showLotCollectionPreview = false;
        var skipAmount = 30;
        $scope.isLoading = false;
        $scope.marker = {};
        $scope.childMapObj = {};
        /// INITIALIZE ////////////////////////////////////////////////

        $scope.loadLands = function (entityId) {
            var q = $q.defer();
            if ($scope.lands == null)
            {
                searchService.search(0, skipAmount).success(function (data) {
                    $scope.lands = data;
                    if (entityId != null) {
                        $scope.selected = $scope.getLandById(entityId);
                    }
                    q.resolve($scope.lands);
                });
            }
            else if(entityId != null)
            {
                $scope.selected = $scope.getLandById(entityId);
                q.resolve($scope.lands);
            }            
            return q.promise;            
        };

        /// SEARCH //////////////////////////////////////////////
        $scope.loadMoreRecords = function () {
            if ($scope.isLoading == false && $scope.allLoaded == false) {
                console.log("load more");
                $scope.isLoading = true;
                searchService.search($scope.rows.length, skipAmount).success(function (data) {

                    $scope.isLoading = false;
                    if (data.length == 0) {
                        $scope.allLoaded = true;
                    }
                    else {
                        $scope.lands = $scope.lands.concat(data);
                    }
                });
            }
        };

        $scope.landSelected = function (land) {          
            if (land == $scope.selected)
            {
                return;
            }
            if ($scope.showMap) {
                $scope.childMapObj.Locate(land);                
            }
            else if (($scope.showEditor || $scope.showLotCollectionEditor) && !land.isLotCollection) {
                $scope.editLot(land);
            }
            else if (($scope.showEditor || $scope.showLotCollectionEditor) && land.isLotCollection) {
                $scope.editLotCollection(land);
            }
            else if ($scope.showPreview) {
                $scope.viewLot(land);
            }
        };

        $scope.EditorClose = function () {
            $state.go("app.search.map", {});
        };

        //$scope.viewLot = function (land) {
        //    hideAll();
        //    console.log("viewLot()");           

        //    $scope.isLoading = true;

        //    if ($state.current.name == "app.search.previewLot" && $scope.selected != null && $scope.selected.id == land.id) {
        //        hideAll();
        //        $state.reload();
        //    }
        //    else {
        //        hideAll();
        //        $scope.selected = land;
        //        $state.go("app.search.previewLot", { id: $scope.selected.id });
        //    }

        //};

        $scope.viewLot = function (){
            var view = "/app/modules/previewLand/views/previewLot-modal.tpl.html";
            var controller = "PreviewLotCtrl";
            var parameter = {
                inputs: function () {
                    var inputs = {};
                    inputs.entityId = $scope.selected.id;
                    return inputs;
                }
            };
            var modalInstance = $modal.open({
                templateUrl: view,
                controller: controller,
                resolve: parameter,
                size: 'lg'
            });
            //modalInstance.result.then(function (x) {
            //    console.log("modal returned" + x);
            //    $scope.loadTree();
            //}, function (x) {
            //    console.log('Modal dismissed at: ' + new Date());
            //});
        }


        $scope.searchClick = function () {
            //console.log("search click");
            //console.log($scope.mapMarkers[0].icon);
            //$scope.mapMarkers[0].icon = "/styles/img/blue-marker.png";
            //console.log($scope.selected);
            //$scope.selected = $scope.getParcelById(1);
            
        };

        function hideAll() {
            console.log("hide all");
            $scope.showMap = false;
            $scope.showEditor = false;
            $scope.showLotCollectionEditor = false;
            $scope.showPreview = false;
            $scope.showLotCollectionPreview = false;
        }

        $scope.getLandById = function(id)
        {
            return $.grep($scope.lands, function (e) { return e.id == id; })[0];
        }

        $scope.locateLand = function (land) {

            if ($state.current.name == "app.search.map") {
                $scope.childMapObj.Locate(land);
            }
            else {
                hideAll();
                $scope.selected = land;
                $state.go("app.search.map", { id: $scope.selected.id });
            }
            console.log("hit locateLand");
        }

        $scope.editLot = function (land) {
            console.log("editLot" );
            $scope.isLoading = true;
            hideAll();
            if ($state.current.name == "app.search.editLot"
                && $scope.selected != null && $scope.selected.id == land.id)
            {
                $state.reload();                
            }
            else
            {                
                $scope.selected = land;
                console.log("edit selected", $scope.selected.id );
                $state.go("app.search.editLot", { id: $scope.selected.id });
            }
        };

        $scope.editLotCollection = function (land) {
            $scope.isLoading = true;
            hideAll();
            if ($state.current.name == "app.search.editLotCollection.profile"
                && $scope.selected != null && $scope.selected.id == land.id) {
                $state.reload();
            }
            else
            {
                $scope.selected = land;
                $state.go("app.search.editLotCollection.profile", { id: $scope.selected.id });
            }
        };
        $scope.viewLotCollection = function (land) {
        //    hideAll();
        //    $scope.showLotCollectionPreview = true;
        //    if ($state.current.name == "app.search.editLotCollection.profile" && $scope.selected != null && $scope.selected.id == land.id)
        //    {  
        //        $state.reload();
        //    }
        //    else
        //    {
        //        $scope.selected = land;
        //        $state.go("app.search.editLotCollection.profile", { id: $scope.selected.id });

            //    }
            alert("viewLotCollection");
        };

        /// Field METHODS  //////////////////////////////////////////////
        $scope.inputChanged = function (column) {

            var entityId;
            if($state.params.subEntityId == null)
            {
                entityId = $state.params.id;
            }
            else
            {
                entityId = $state.params.subEntityId;
            }
            
            var deferred = $q.defer();
            console.log("input changed:" + column);
            column.isError = false;
            if (column.fieldType == "Numeric") {
                if (isNaN(column.value) && column.value != null) {
                    column.isError = true;
                    column.errorMessage = "Must be a number.";
                    deferred.reject('invalid');
                    return deferred.promise;
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
                    deferred.resolve('done');
                });
            }
            else {

                fieldSetService.saveField(entityId, column.fieldId, column.value).success(function (data) {
                    column.isSaving = false;
                    deferred.resolve('done');
                });
            }
            return deferred.promise;

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

        $scope.date = new Date('2011-04-11');
        $scope.dateOptions = {};



       


    }]);
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
    //module.registerDirective('map', function () {
    //    return {
    //        restrict: 'E',
    //        replace: true,
    //        template: '<div></div>',
    //        link: function ($scope, element, attrs) {

    //            console.log(attrs);

    //            var map_options = {
    //                zoom: 14,
    //                center: $scope.center,
    //                mapTypeId: google.maps.MapTypeId.SATELLITE
    //            };

    //            // create map
    //            var map = new google.maps.Map(document.getElementById(attrs.id), map_options);
    //            console.log(map);
    //            // configure marker
    //            var marker_options = {
    //                map: map,
    //                position: $scope.center
    //            };

    //            // create marker
    //            //var marker = new google.maps.Marker(marker_options);
    //            //var marker = new google.maps.Marker(marker_options);


    //            //53.577305

    //            //- 113.299931



    //            $scope.$watch('selected', function () {

    //                window.setTimeout(function () {

    //                    google.maps.event.trigger(map, 'resize');
    //                }, 100);

    //            });
    //        }
    //    }
    //});

});

