define(["app"], function (module) {
    "use strict";

    module.registerDirective("formEditor", function () {
        return {
            restrict: "E",
            templateUrl: "/app/modules/global/views/formEditor-directive.tpl.html",
            replace: true,
            scope: { input: "@", model: "=", field: "@", blur: "&", change: "&", tooltipMsg: "@", require: "=?", dropdownData: "=?", textareaRows: "@", positive: "=?", placeholder: "@" },
            controller: function ($scope) {
                $scope.inputClass = {
                    textbox: "input",
                    textarea: "textarea textarea-resizable",
                    checkbox: "checkbox",
                    dropdown: "select",
                    dropdownWithId: "select",
                    integer: "input",
                    decimal: "input"
                };
            }
        };
    });
});