define(["app"], function (module) {
    "use strict";

    module.registerDirective("userTags", function () {
        return {
            restrict: "E",
            templateUrl: "/app/modules/global/views/userTags-directive.tpl.html",
            scope: {
                model: "=",
                ldapType: "@?",
                showPicture: "=?",
                dropdownHeight: "=?",
                placeholderText: "=?",
                //denotes whether more than one user can be selected at once.
                multiSelect: "=?",
                //used if you want the results dropdown to be layed out differently. is an id of a text/ng-template element or a file path.
                detailsRowSrc: "@?",
                //Callback method to check if user should be removed from results. returns true to remove.
                excludeUserCheck: "&?",
                //method called when the list of selected users has changed
                onChange: "&?",
                //method called when a user has been added to selected list. takes param named user
                onUserAdded: "&?",
                //method called when a user has been removed from the selected list. takes param named user
                onUserRemoved: "&?"
            },
            replace: true,
            controller: function ($scope, $element, $window, UserService) {
                //if no model initialize
                if (!$scope.model) {
                    $scope.tags = [];
                    $scope.model = $scope.tags;
                }
                else {
                    $scope.tags = $scope.model;
                }

                if (!$scope.placeholderText) {
                    $scope.placeholderText = "Enter User Name / Full Name...";
                }

                if ($scope.multiSelect == null) {
                    $scope.multiSelect = true;
                }

                if (!$scope.multiSelect && $scope.tags.length > 0) {
                    //if no multi select and one already there, dont allow more.
                    $element.find("input").hide();
                }

                $scope.inputWidth = "180px";
                $scope.tagInput = "";
                $scope.search = [];
                $scope.currIndex = -1;

                if (!$scope.dropdownHeight)
                    $scope.maxHeight = 150;
                else
                    $scope.maxHeight = parseInt($scope.dropdownHeight);

                $scope.removeTag = function (tagIndex) {

                    var removed = $scope.tags[tagIndex];

                    $scope.tags.splice(tagIndex, 1);

                    userRemoved(removed);

                    if (!$scope.multiSelect && $scope.tags.length == 0) {
                        $element.find("input").show();
                    }

                };

                $scope.addTag = function (tag) {
                    //return if only one allowed
                    if (!$scope.multiSelect && $scope.tags.length > 0) {
                        return;
                    }

                    if (!tag) tag = $scope.search[$scope.currIndex];
                    $scope.tagInput = "";
                    for (var i = 0; i < $scope.tags.length; i++) {
                        if ($scope.tags[i].userId == tag.userId) return;
                    }
                    $scope.tags.push(tag);

                    userAdded(tag);
                    
                    if (!$scope.multiSelect && $scope.tags.length > 0) {
                        $element.find("input").hide();
                        return;
                    }

                    $scope.inputFocus();
                };

                $scope.textInput = function ($event) {
                    
                    switch ($event.keyCode) {
                        case 9: // Tab
                        case 13: // Enter
                        case 59: // ;
                        case 186: // ;
                            if ($scope.currIndex >= 0) $scope.addTag();
                            $event.preventDefault();
                            break;
                        case 8: // Backspace
                            if ($scope.tagInput.length == 0 && $scope.tags.length > 0)
                            {
                                userRemoved($scope.tags.pop());
                            }
                            break;
                        case 40: // Down
                            if ($scope.currIndex < $scope.search.length - 1) {
                                $scope.currIndex++;
                                var currElement = $($element.find("ul li")[$scope.currIndex]);
                                if ($element.find("ul").scrollTop() + $scope.maxHeight < currElement.context.offsetTop + currElement.outerHeight())
                                    $element.find("ul").scrollTop(currElement.context.offsetTop);
                            }
                            break;
                        case 38: // Up
                            if ($scope.currIndex > 0) {
                                $scope.currIndex--;
                                var currElement = $($element.find("ul li")[$scope.currIndex]);
                                if (currElement.context.offsetTop < $element.find("ul").scrollTop())
                                    $element.find("ul").scrollTop(currElement.context.offsetTop - $scope.maxHeight + currElement.outerHeight());
                            }
                            break;
                        case 27: // Esc
                            $element.find("input").blur();
                            break;
                    }
                };

                $scope.pasteInput = function ($event) {                    
                    setTimeout(function () {
                        if ($event.target.value.split(";").length > 1) {
                            $scope.pasting = true;                        
                            UserService.checkMultiUsers($event.target.value).success(function (data) {
                                $event.target.value = "";
                                for (var i = 0; i < data.result.length; i++) $scope.addTag(data.result[i]);
                                if (data.invalid) showErrorMessage(data.invalid, "Invlid user name(s):");                                
                                setTimeout(function () {
                                    $scope.tagInput = "";
                                    setTimeout(function () { $scope.pasting = false; }, 200);                                    
                                }, 500);
                            });                            
                        }
                    }, 0);
                };

                $scope.inputFocus = function () {
                    setTimeout(function () {
                        $element.find("input").focus();
                    }, 10);
                };

                $scope.isFocus = function () {
                    setTimeout(function () {
                        $scope.focusing = $element.find("input").is(":focus");
                    }, 10);
                };

                //watch the tags object in case we have to hide the searchbox
                $scope.$watch("tags.length", function (newValue) {
                    if (!$scope.multiSelect && $scope.tags.length > 0) {
                        $element.find("input").hide();
                        return;
                    }
                    else if (!$scope.multiSelect && $scope.tags.length == 0) {
                        $element.find("input").show();
                    }
                });

                $scope.searchChange = function () {
                    //only search if there is at least 3 characters
                    if ($scope.tagInput.length >= 3) {

                        //clear results so the old results dont show
                        $scope.search.length = 0;
                        $scope.searchLoading = true;
                        UserService.searchUser($scope.tagInput, $scope.ldapType).success(function (data) {

                            var items = [];

                            //only include items not in the exclude list
                            if ($scope.excludeUserCheck) {

                                $.each(data, function (idx, user) {
                                    var exclude = $scope.excludeUserCheck({ user: user });
                                    if (!exclude) {
                                        items.push(user);
                                    }
                                });
                            }
                            else {
                                items = data;
                            }

                            $scope.search = items;
                            if (items.length > 0) $scope.currIndex = 0;
                            $element.find("ul").scrollTop(0);

                            $scope.searchLoading = false;
                        });
                    }
                    else {
                        $scope.search.length = 0;
                    }
                }

                function userAdded(user) {
                    if ($scope.onChange) {
                        $scope.onChange();
                    }

                    if ($scope.onUserAdded) {
                        $scope.onUserAdded({ user: user });
                    }
                }

                function userRemoved(user) {
                    if ($scope.onChange) {
                        $scope.onChange();
                    }

                    if ($scope.onUserRemoved) {
                        $scope.onUserRemoved({ user: user });
                    }
                }

                $scope.$watch("tagInput.length", function (newValue) {
                    
                    $scope.inputWidth = (newValue * 10) + "px";
                    if ($scope.tagInput.trim().length < 3) {
                        $scope.currIndex = -1;
                        $scope.search = [];
                    }
                    else {
                  
                    }
                });

                $scope.searchHover = function (index) {
                    $scope.currIndex = index;
                };
            }
        };
    });
});