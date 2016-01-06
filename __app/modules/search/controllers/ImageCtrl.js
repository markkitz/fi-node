define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("ImageCtrl", ["$scope", "$state", "$stateParams", '$q', 'ImageService', "$upload", "$modal", function ($scope, $state, $stateParams, $q, $imageService, $upload, $modal) {

        $scope.initialize = function () {
            console.log("images cntlr intitialize");

            $q.all([
                $scope.$parent.loadLands(null)
            ]).then(function (dataArray) {
                $scope.$parent.isLoading = false;
                $scope.$parent.showEditor = true;
                tableHeightSize();
                //console.log($imageService.test());
            });
        };

        //$scope.addNewImage = function () {
        //    var modal = $modal.open({
        //        templateUrl: "/app/modules/search/views/uploadImage.tpl.html",
        //        controller: function ($scope, $modalInstance, $upload) {
        //            //$scope.docTypes = docTypes;
        //            $scope.acceptTypes = ["png", "jpeg", "jpg"];
        //            //$scope.docType = "";
        //            $scope.cancel = function () {
        //                $modalInstance.dismiss("cancel");
        //            };
        //            $scope.onFileSelect = function ($files) {
        //                $scope.errorMessage = "";
        //                if ($files.length == 1) {
        //                    var file = $files[0];
        //                    if ($scope.acceptTypes.indexOf(file.name.toLowerCase().split(".").pop()) != -1) {
        //                        if (file.size > 3145728) {
        //                            $scope.errorMessage = "You can only upload a file which is less than 3MB.";
        //                        }
        //                        else {
        //                            this.upload = $upload.upload({
        //                                url: "Image/UploadImage",
        //                                data: { entityId: 1 },
        //                                file: file
        //                            }).progress(function (evt) {
        //                                $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
        //                            }).success(function (data) {
        //                                if (data.error) {
        //                                    $scope.errorMessage = data.error;
        //                                }
        //                                else {
        //                                    $modalInstance.close();
        //                                }
        //                            }).error(function () {
        //                                $scope.errorMessage = "Error occurs when uploading file.";
        //                            });
        //                        }
        //                    }
        //                    else $scope.errorMessage = "You cannot upload this type of file.\nWe accepts ." + $scope.acceptTypes.join(", .") + " files.";
        //                }
        //            };
        //        }
        //    });
        //    modal.result.then(function () {
        //        //CourseService.getInstanceDocuments(instance.id).success(function (data) {
        //        //    instance.documents = data;
        //        //});
        //    });
        //};

        console.log("images cntlr loading");
    }
    ]);


});