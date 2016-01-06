define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotNotesReportsDrawingsCtrl", ["$scope", "$state", "$stateParams", "$modal", '$q', "FieldSetService",
        function ($scope, $state, $stateParams, $modal, $q, fieldSetService) {
            var entityId;
            $scope.fieldSetNotes = {};
            $scope.initializeStatus = function () {
                console.log("EditLotStatusCtrl initialize hit");
                entityId = $stateParams.id;

                $q.all([
                    fieldSetService.getFieldset("NOTES", entityId),
                    $scope.$parent.loadLands(entityId)
                ]).then(function (dataArray) {
                    $scope.fieldSetNotes = dataArray[0].data;
                    $scope.$parent.editLotInitialized();
                });

            };
            
            $scope.uploadFile = function (column) {

            var modal = $modal.open({
                templateUrl: "/app/modules/search/views/uploadImage.tpl.html",
                controller: function ($scope, $modalInstance, $upload) {
                    $scope.acceptTypes = ["pdf", "docx", "doc", "png", "jpeg", "jpg", "msg"];
                    $scope.cancel = function () {
                        $modalInstance.dismiss("cancel");
                    };
                    $scope.onFileSelect = function ($files) {
                        $scope.errorMessage = "";
                        if ($files.length == 1) {
                            var file = $files[0];
                            if ($scope.acceptTypes.indexOf(file.name.toLowerCase().split(".").pop()) != -1) {
                                if (file.size > 3145728) {
                                    $scope.errorMessage = "You can only upload a file which is less than 3MB.";
                                }
                                else {
                                    this.upload = $upload.upload({
                                        url: "File/UploadDocument",
                                        fields: { entityId: entityId, fieldId: column.fieldId },
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
                //column.value = "file:abc123.docx";
                //updateAndRefreshImages(column);
            },
            function () {
                console.log("close");
            }

            );
        };
            $scope.addWebLink = function (column) {
                console.log(column.value);
                
                $.SmartMessageBox({
                    title: 'Weblink',
                    content: '<p>Enter the url.</p><p><input class="form-control" id="txtUrl" type="text"/></p>',
                    buttons: "[OK][Cancel]"
                }, function (buttonPressed) {
                    if (buttonPressed == "OK") {
                        var txtUrl = angular.element("#txtUrl").val();
                        txtUrl = txtUrl.replace("http://", "");

                        column.value = "url:" + txtUrl;                        
                        $scope.inputChanged(column, column.value);
                        $scope.$apply();
                    }
                });
            };
            
            $scope.removeLink = function (column) {
                column.value = "";
                $scope.inputChanged(column, column.value);
                $scope.$apply();
            };
            $scope.getUrl = function (column) {
                var url = column.value.replace("url:", "");
                if (url.indexOf("http") != 0)
                {
                    url = "http://" + url;
                }
                return url;
            };

        }]);
});
