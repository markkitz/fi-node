define(["modules/search/module"], function (module) {
    "use strict";

    module.registerDirective("whenscrollends", function () {
        return {

            restrict: "A",
            link: function (scope, element, attrs) {
                var visibleHeight = element.height();
                var threshold = 20;
                console.log("whenscroll ends");
                element.scroll(function () {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        // Scroll is almost at the bottom. Loading more rows
                        scope.$apply(attrs.whenscrollends);
                    }
                });
            }
        };
    });
});
