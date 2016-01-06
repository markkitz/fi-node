define(["modules/search/module"], function (module) {
    "use strict";
    module.registerController("EditLotCollectionCtrl", ["$scope", "$state", "$stateParams", '$q', "FieldSetService", '$modal', 'uiGmapGoogleMapApi', function ($scope, $state, $stateParams, $q, fieldSetService, $modal, uiGmapGoogleMapApi) {

        $scope.currentState = "";


        $scope.ChangeState = function (state) {
            $scope.currentState = "app.search.editLotCollection." + state;
            $state.go($scope.currentState, { id: $state.params.id });
        }

        $scope.editLotCollectionInitalized = function () {
            console.log("editLotCollectionInitalized");

            $scope.currentState = $state.current.name;
            $scope.$parent.isLoading = false;
            $scope.$parent.showEditor = true;

        };
        
        console.log("Edit LotCollection loaded.");
    }]);


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
});