define(["layout/module"], function (module) {
    "use strict";

    module.registerController("LayoutCtrl", ["$scope", "$rootScope", "$state",  function ($scope, $rootScope, $state) {
        $scope.loadUserNavigation = function () {
        };

        $scope.initialize = function () {
            console.log("initialize layout", $state.current.name);
            setHeader($state.current.name);            
        };
        var headerStates = {};
        $scope.hdrColor = "#4285f4";
        headerStates['app.search.map'] = { title: "Map", showSearchBox: true, showFilterBtn: true, hdrColor: "#4285f4", searchPlaceHolderText: "Search Lots…" };
        headerStates['app.search.editLot'] = { title: "Edit", showSearchBox: true, showFilterBtn: true, hdrColor: "#4285f4", searchPlaceHolderText: "Search Lots…" };
        headerStates['app.newLand'] = { title: "Edit", showSearchBox: false, showFilterBtn: false, hdrColor: "#4285f4" };
        
        console.log("****scope****", $scope);

        $scope.searchText = "";
        $scope.searchPlaceHolderText = "Search";

        $scope.searchChange = function () {
            console.log("search change");
            $rootScope.$broadcast('searchTextChange', [$scope.searchText]);
        };
        $scope.filterBtnClick = function () {
            $rootScope.$broadcast('filterBtnClick');
        };
        $scope.showNav = false;

        $scope.hamburgerClick = function () {
            $scope.showNav = !$scope.showNav;
        };

        //headerStates['app.courseListing'] = { title: "Course" };

        function setHeader(appStateName) {
            var hState = headerStates[appStateName];

            //if null check for parent so we don't have to define all subitems
            if (hState == null) {
                for (var i in headerStates) {
                    if (appStateName.indexOf(i) >= 0) {
                        hState = headerStates[i];
                    }
                }
            }

            if (hState != null) {
                $scope.title = hState.title;
                $scope.showSearchBox = hState.showSearchBox;
                $scope.showFilterBtn = hState.showFilterBtn;
                $scope.hdrColor = hState.hdrColor;
                $scope.searchPlaceHolderText = hState.searchPlaceHolderText;
            }
            else {
                $scope.title = "";
                $scope.showSearchBox = false;
                $scope.showFilterBtn = false;
                $scope.hdrColor = "#898984";
                $scope.searchPlaceHolderText = "Search";
            }
        }


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //if (notLoggedIn) {
            //    event.preventDefault();
            //    $state.go('login');
            //}
            console.log("$stateChange" + toState);
            console.log(toState.name);
            setHeader(toState.name);
            $scope.searchText = "";


        });






        

        console.log("LayoutCtrl loaded.");
    }]);
});