define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotStatusCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService",
        function ($scope, $state, $stateParams, $q, fieldSetService) {
    var entityId;
    $scope.fieldSetSettings = {};
    $scope.fieldSetLINCs = {};
    $scope.initializeStatus = function () {
        console.log("EditLotStatusCtrl initialize hit");
        entityId = $stateParams.id;
        
        $q.all([                
            fieldSetService.getFieldset("SETTINGS", entityId),
            fieldSetService.getFieldset("LINCS", entityId),
            $scope.$parent.loadLands(entityId)
        ]).then(function (dataArray) {
            $scope.fieldSetSettings = dataArray[0].data;
            $scope.fieldSetLINCs = dataArray[1].data;
            $scope.$parent.editLotInitialized();
        });

    };
    }]);
});
       
