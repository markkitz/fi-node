define(['modules/fieldsetPresenter/module'], function (module) {

    'use strict';
   

    module.registerController('EditOptionsCtrl', ['$scope', '$modalInstance', 'inputs', 'FieldSetService',
        function ($scope, $modalInstance, inputs, fieldSetService) {
            console.log(inputs);
            $scope.addOption = "";
            $scope.fieldLabel = inputs.fieldLabel;
            $scope.options = null;

        $scope.initialize = function () {
            console.log("edit option ctrl initalized")
            fieldSetService.getOptionsForField(inputs.fieldId).success(function (data) {
                console.log("getOptionsForField success");
                $scope.options = data;

            });
        };
        $scope.add = function () {
            fieldSetService.addOptionForField(inputs.fieldId, $scope.addOption).success(function (data) {
                console.log("addOptionForField success");
                $scope.options = data;
                $scope.addOption = "";

            });
        };
        $scope.delete = function (option) {
            fieldSetService.deleteOptionForField(inputs.fieldId, option.id).success(function (data) {
                console.log("deleteOptionForField success");
                $scope.options = data;
            });
        };
        

        $scope.save = function () {
                $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        console.log('EditOptionsCtrl Loaded');
    }]);
});