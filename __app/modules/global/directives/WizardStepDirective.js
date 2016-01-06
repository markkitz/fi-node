define(["app"], function (module) {
    "use strict";

    module.registerDirective("wizardStep", function () {
        return {
            restrict: "E",
            templateUrl: "/app/modules/global/views/wizardStep-directive.tpl.html",
            replace: true,
            scope: { steps: "=", currentStep: "=" }
        };
    });
});