define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotLocationCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", "$timeout",
        function ($scope, $state, $stateParams, $q, fieldSetService, $timeout) {
            var entityId;
            var isUrbanColumn = null;
            $scope.fieldSetLocation = {};
            $scope.fieldSetConfiguration = {};

        $scope.initialize = function () {
            console.log("EditLotLocationCtrl initialize hit");

            entityId = $stateParams.id;
            $q.all([
                fieldSetService.getFieldset("LOCATION", entityId),
                fieldSetService.getFieldset("CONFIGURATION", entityId),
                $scope.$parent.loadLands(entityId)
            ]).then(function (dataArray) {
                $scope.fieldSetLocation = dataArray[0].data;
                $scope.fieldSetConfiguration = dataArray[1].data;
                console.log("inside then");
                $scope.$parent.editLotInitialized();                

                isUrbanColumn = findColumnByLabel($scope.fieldSetLocation, "Municipal Address?");
                isUrbanColumn.value = isUrbanColumn.value == "True";
                console.log("bool value", isUrbanColumn.value);
                $timeout(function () {
                    showHideAddressRow(isUrbanColumn.value);
                    $scope.$watch(function () { return isUrbanColumn.value; },
                    function () {

                        showHideAddressRow(isUrbanColumn.value);
                    });
                }, 1000);
                
            });

        };

        function showHideAddressRow(isUrban)
        {
            console.log("hit show hide", isUrban);
            if(isUrban)
            {
                $("label:contains('Roadway Name')").parent().parent().show();
                $("label:contains('Range Road')").parent().parent().hide();
            }
            else
            {
                $("label:contains('Roadway Name')").parent().parent().hide();
                $("label:contains('Range Road')").parent().parent().show();
            }

        }

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
    }]);
});
       
