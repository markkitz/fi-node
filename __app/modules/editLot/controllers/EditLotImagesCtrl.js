define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotImagesCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal', 'uiGmapGoogleMapApi', function ($scope, $state, $stateParams, $q, fieldSetService, $modal, uiGmapGoogleMapApi) {

    var entityId;
    $scope.fieldSetMaps = {};
    $scope.fieldSetPhotos = {};

    $scope.initialize = function () {
        console.log("initialize hit");
        entityId = $stateParams.id;
        $q.all([
            fieldSetService.getFieldset("MAPS", entityId),
            fieldSetService.getFieldset("PHOTOS", entityId),
        ]).then(function (dataArray) {
            $scope.fieldSetMaps = dataArray[0].data;
            $scope.fieldSetPhotos = dataArray[1].data;
            $scope.$parent.editLotInitialized();
        });
    };
    //////// Image Functions ///////////////////////////////////////////////////////////////////////////////

    $scope.rdm = Math.random();
    $scope.getImageThumbURL = function (column) {
        return "http://127.0.0.1:10000/devstoreaccount1/firstindustrial/" + entityId + "_" + column.fieldIdentifier.toLowerCase() + "_tm.jpg?decahe=" + $scope.rdm;
    };
    $scope.addNewImage = function (column) {

        var modal = $modal.open({
            templateUrl: "/app/modules/search/views/uploadImage.tpl.html",
            controller: function ($scope, $modalInstance, $upload) {
                $scope.acceptTypes = ["png", "jpeg", "jpg"];
                $scope.cancel = function () {
                    $modalInstance.dismiss("cancel");
                };
                $scope.onFileSelect = function ($files) {
                    $scope.errorMessage = "";
                    if ($files.length == 1) {
                        var file = $files[0];
                        if ($scope.acceptTypes.indexOf(file.name.toLowerCase().split(".").pop()) != -1) {
                            if (file.size > 4145728) {
                                $scope.errorMessage = "You can only upload a file which is less than 4MB.";
                            }
                            else {
                                this.upload = $upload.upload({
                                    url: "Image/UploadImage",
                                    fields: { entityId: entityId, imageType: column.fieldIdentifier },
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
            column.value = true;
            updateAndRefreshImages(column);
        },
        function () {
            console.log("close");
        }

        );
    };
    $scope.deleteImage = function (column) {
        column.value = false;

        updateAndRefreshImages(column);
    };
    function updateAndRefreshImages(column) {

        $scope.inputChanged(column).then(function () {
            console.log("update");
            $q.all([
                    fieldSetService.getFieldset("MAPS", entityId),
                    fieldSetService.getFieldset("PHOTOS", entityId)
            ])
            .then(function (array) {
                $scope.fieldSetMaps = array[0].data;
                $scope.fieldSetPhotos = array[1].data;
                $scope.rdm = Math.random();
            });
        }, function (reason) {
            alert('Failed: ' + reason);
        }, function (update) {
            alert('Got notification: ' + update);
        });

    }



    }]);
});
       
