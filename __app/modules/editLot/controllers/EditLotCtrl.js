define(["modules/search/module"], function (module) {
    "use strict";

    module.registerController("EditLotCtrl", ["$scope", "$stateParams", "$state", '$q', "FieldSetService", "EditLotService", "$timeout", "$modal", "$location", function ($scope, $stateParams, $state, $q, fieldSetService, editLotService, $timeout, $modal, $location) {
        $scope.groupedMoodleCourses = [];
        $scope.moodleYearItems = [];
        $scope.address = "";
        $scope.isSubEnityLoading = true;
        $scope.AzureFileLocationUrl = "http://127.0.0.1:10000/devstoreaccount1/firstindustrial/";
        var entityId;
        $scope.initialize = function () {
            console.log("initalize edit lot");
            entityId = $stateParams.id;
            console.log(entityId);
            $scope.$parent.loadLands(entityId);
            $scope.$parent.showEditor = true;

            console.log($location.host());

            $q.all([
                fieldSetService.getField("ADDRESS", entityId, "AddressFormatter"),
                editLotService.getLotStructure(entityId)
            ]).then(function (dataArray) {
                $scope.address = dataArray[0].data;
                $scope.rowGroups = dataArray[1].data;                
                var subEntityId = $state.params.subEntityId;
                

                $scope.rowGroups.forEach(function (rowGroup) {
                    rowGroup.rows.forEach(function (row) {
                        if($state.current.name == row.state && row.subEntityId == 0)
                        {
                            rowGroup.selected = true;
                            selectedgroup = rowGroup;
                        }
                        else if($state.current.name == row.state && row.subEntityId == subEntityId)
                        {
                            rowGroup.selected = true;
                            row.selected = true;
                            selectedgroup = rowGroup;
                            selectedRow = row;                                      
                        }
                    });
                });
            });
            $scope.$parent.isLoading = false;
        };

        $scope.editLotInitialized = function () {
            console.log("editLotInitialized");
            $scope.currentState = $state.current.name;
            $scope.isSubEnityLoading = false;
            $scope.$parent.isLoading = false;
            $scope.$parent.showEditor = true;
        };
        /*****  Grid Control **************************************/
        var selectedgroup = {};
        var selectedRow = {};
        $scope.rowGroups = null;
        $scope.currentState = "";
        $scope.groupClick = function (group) {

            selectedgroup.selected = false;
            console.log("test group click");
            if (selectedgroup == group) {
                //unselect
                selectedgroup = {};
                return;
            }
            selectedgroup = group;
            selectedgroup.selected = true;
        }
        $scope.closeGroup = function (group) {
            group.selected = false;
            selectedgroup = {};
        }
        $scope.rowClick = function (row) {
            console.log("row click");
            selectedRow.selected = false;
            if (selectedRow == row) {
                //unselect
                selectedRow = {};
                return;
            }
            $scope.isSubEnityLoading = true;
            $q.all([
             $state.go(row.state, { id: $state.params.id, subEntityId: row.subEntityId })
            ]).then(function () {
                selectedRow = row;
                selectedRow.selected = true;
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


            }, function (x) {
                console.log('Modal dismissed at: ' + new Date());
                console.log($state.current);
                // var currentRow = selectedRow;
                // $q.all([
                $state.go($state.current, { id: $state.params.id }, { reload: true })
                //]).then(function () {
                //    selectedRow = currentRow;
                //    selectedRow.selected = true;
                //});
            });
        };
        $scope.uploadFile = function (column) {
            console.log("upload");
        };
        $scope.addWebLink = function (column) {
            console.log("addWebLink");
        };
        $scope.addSubEntity = function (rowGroup) {
            if (rowGroup.title == "Sales") {
                editLotService.addSale(entityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) {reloadStructureAddOpen(data, "Sales"); });
                });
            }
            else if (rowGroup.title == "Supply") {
                editLotService.addSupply(entityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Supply"); });
                });
            }
            else if (rowGroup.title == "Zoning") {
                editLotService.addZoning(entityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) {   reloadStructureAddOpen(data, "Zoning");
                    });
                });
            }
            else if (rowGroup.title == "Taxation") {
                editLotService.addTaxation(entityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Taxation"); });
                });
            }
        };
        $scope.deleteSubEntity = function (row, event) {
            if (row.state == "app.search.editLot.sale") {
                editLotService.deleteSale(entityId, row.subEntityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Sales"); });
                });
            }
            else if (row.state == "app.search.editLot.supply") {
                editLotService.deleteSupply(entityId, row.subEntityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Supply"); });
                });
            }
            else if (row.state == "app.search.editLot.zoning") {
                editLotService.deleteZoning(entityId, row.subEntityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Zoning"); });
                });
            }
            else if (row.state == "app.search.editLot.taxation") {
                editLotService.deleteTaxation(entityId, row.subEntityId).success(function () {
                    editLotService.getLotStructure(entityId).success(function (data) { reloadStructureAddOpen(data, "Taxation"); });
                });
            }


        };


        function reloadStructureAddOpen(data, selectedGroupTitle)
        {
            $scope.rowGroups = data;
            $scope.rowGroups.forEach(function (rowGroup) {
                console.log(rowGroup)
                if (rowGroup.title == selectedGroupTitle) {
                    rowGroup.selected = true;
                    selectedgroup = rowGroup;
                    console.log("hit");
                }
            });
        }

        $scope.addNewDocumentOLD = function (instance, docTypes) {
            var modal = $modal.open({
                templateUrl: "/app/modules/course/views/modals/uploadDocument.tpl.html",
                controller: function ($scope, $modalInstance, $upload) {
                    $scope.docTypes = docTypes;
                    $scope.acceptTypes = ["pdf", "docx", "doc", "png", "jpeg", "jpg", "msg"];
                    $scope.docType = "";
                    $scope.cancel = function () {
                        $modalInstance.dismiss("cancel");
                    };
                    $scope.onFileSelect = function ($files) {
                        $scope.errorMessage = "";
                        if ($files.length == 1) {
                            var file = $files[0];
                            if ($scope.acceptTypes.indexOf(file.name.split(".").pop().toLowerCase()) != -1) {
                                if (file.size > 3145728) {
                                    $scope.errorMessage = "You can only upload a file which is less than 3MB.";
                                }
                                else {
                                    this.upload = $upload.upload({
                                        url: "Course/UploadDocument",
                                        data: { instanceId: instance.id, docType: $scope.docType, courseId: $stateParams.id },
                                        file: file
                                    }).progress(function (evt) {
                                        $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
                                    }).success(function (data) {
                                        if (data.error) {
                                            $scope.errorMessage = data.error;
                                        }
                                        else {
                                            $modalInstance.close();
                                        }
                                    }).error(function () {
                                        $scope.errorMessage = "Error occurs when uploading file.";
                                    });
                                }
                            }
                            else $scope.errorMessage = "You cannot upload this type of file.\nWe accepts ." + $scope.acceptTypes.join(", .") + " files.";
                        }
                    };
                }
            });
            modal.result.then(function () {
                CourseService.getInstanceDocuments(instance.id).success(function (data) {
                    instance.documents = data;
                });
            });
        };

        console.log("EditLotCtrl loaded.");
    }]);

});