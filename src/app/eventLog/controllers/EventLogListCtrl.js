define(["app.test"], function (module) {
    "use strict";

    module.registerController("EventLogListCtrl", ["$scope", "$state", "EventLogService", "$timeout", '$sce', function ($scope, $state, eventLogService, $timeout, $sce) {


        $scope.logs = [];
        $scope.isSearching = false;
        $scope.takeAmount = 20;
        $scope.skip = 0;
        $scope.scrollHelper = { refresh: function () { } };
        var selectedRow = {};
        $scope.helper = {};

        $scope.filter = { searchText: null, type: null, byUser: null };

        $scope.initialize = function () {
           performSearch();
        };

        $scope.highlight = function (inValue, text) {
            if (!text || !inValue) {
                return inValue;
            }
            return $sce.trustAsHtml(inValue.replace(new RegExp(text, "gi"), function (match) {
                return '<span class="highlightedText">' + match + '</span>';
            }));
        };

        function performSearch() {
            console.log("performSearch - EventLogListCtrl");
            if (!$scope.isSearching) {
                $scope.isSearching = true;
                if ($scope.allLoaded) {
                    $scope.isSearching = false;
                    return;
                }

                var type = $scope.filter.type;
                var searchText = $scope.filter.searchText;
                var user = ($scope.filter.byUser == null || $scope.filter.byUser.length == 0) ? null : $scope.filter.byUser[0].userName;
                console.log($scope.filter);
                eventLogService.getEventLogSearch($scope.skip, $scope.takeAmount, searchText, type, user).success(function (data) {

                    $scope.resultsFilter = [];

                    //if (data.searchText) {
                    //    $scope.resultsFilter.push({ name: 'Search Text', value: data.searchText});
                    //}
                    if (data.type) {
                        $scope.resultsFilter.push({ name: 'Event Type', value: data.type});
                    }

                    if (data.userName) {
                        $scope.resultsFilter.push({ name: 'User', value: data.userName });
                    }


                    $scope.isSearching = false;
                    $scope.logs = $scope.logs.concat( data.results );
                    $scope.skip = data.skip + data.take;
                    $scope.allLoaded = data.results.length < $scope.takeAmount;
                    $scope.totalRecords = data.totalRecords;

                    if (!$scope.allLoaded) {
                        $timeout(function () {
                            $scope.scrollHelper.refresh();
                        });
                    }
                }).error(function () {
                    $scope.isSearching = false;
                });
            }
        }

        $scope.loadMore = function () {
            console.log("loadMore");
            performSearch();
        };


        $scope.$on('searchTextChange', function (event, data) {
            $scope.filter.searchText = data[0];
            $scope.searchChanged();
        });

        $scope.$on('filterBtnClick', function (event, data) {
            $scope.showSearchParameters = !$scope.showSearchParameters;
        });

        $scope.searchChanged = function () {
            $scope.logs = [];
            $scope.skip = 0;
            $scope.allLoaded = false;
            performSearch();
        };

        $scope.refresh = function () {
            $scope.searchChanged();
        }

        $scope.rowClick = function (row, event) {
            selectedRow.selected = false;
            if (selectedRow == row) {
                selectedRow = {};
                return;
            }
            DoSmoothCollapse(event);
            selectedRow = row;

            selectedRow.selected = true;
        }

        $scope.removeFilter = function (name) {

            console.log(name);
            if (name == 'Event Type') {
                //ignore if already empty
                if (!$scope.filter.type)
                    return;

                $scope.filter.type = null;
            }
            else if (name == 'User') {
                if ($scope.filter.byUser.length == 0)
                    return;

                $scope.helper.clear();
            }

            $scope.searchChanged();

        }


        console.log("EventLogListCtrl loaded.");
    }]);
});
