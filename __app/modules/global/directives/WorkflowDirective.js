define(["app"], function (module) {
    "use strict";

    module.registerDirective("workflow", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/app/modules/global/views/workflow-directive.tpl.html",
            scope: { type: "@", id: "@", actionEvent: "=" },
            controller: function ($scope, WorkflowService) {
                WorkflowService.getWorkflowMap($scope.type, $scope.id).success(function (data) {
                    $scope.workflowSteps = data.steps;
                    $scope.deadline = data.deadline;
                });

                $scope.workflowDecision = function (decision) {
                    $.SmartMessageBox({
                        title: "Are you sure you want to make this decision?",
                        buttons: "[No][Yes]"
                    }, function (ButtonPressed) {
                        if (ButtonPressed == "Yes") {
                            WorkflowService.makeDecision($scope.type, $scope.id, decision).success(function (data) {
                                if (data.error) {
                                    $.smallBox({
                                        title: "Workflow Error!",
                                        content: data.error,
                                        color: "#C46A69",
                                        iconSmall: "fa fa-warning bounce animated",
                                        timeout: 30000
                                    });
                                }
                                else if (typeof ($scope.actionEvent) == "function") {
                                    $scope.actionEvent.call();
                                }
                            });
                        }
                    });
                };
            }
        };
    });
});