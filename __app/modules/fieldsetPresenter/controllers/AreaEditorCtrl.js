define(['modules/fieldsetPresenter/module'], function (module) {

    'use strict';



    module.registerController('AreaEditorCtrl', ['$scope', '$modalInstance', 'inputs', 'FieldSetService',
        function ($scope, $modalInstance, inputs, fieldSetService) {
            console.log(inputs);
            $scope.fieldLabel = inputs.fieldLabel;
            $scope.options = null;

            $scope.initialize = function () {
                console.log("edit option ctrl initalized");
                //FieldSetService.getOptionsForField(inputs.fieldId).success(function (data) {
                //    console.log("getOptionsForField success");
                //    console.log(data);
                //    $scope.options = data;

                //});
            };

            $scope.save = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            console.log('AreaEditorCtrl Loaded');
        }]);
});