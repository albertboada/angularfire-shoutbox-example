/**
 * @Module
 */
angular.module("boa.utils", [])

/**
 * @Directive
 */
.directive("keepViewportAtBottom", function () {
    return {
        "restrict" : "A",
        "link": function ($scope, $element) {
            $scope.$watch(
                function () { return $element.children().length; },
                function (length_new, length_old) {
                    $element.animate({"scrollTop": $element.prop("scrollHeight")});
                }
            );
        }
    };
})
;