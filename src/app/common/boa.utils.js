/**
 * @Module
 */
angular.module("boa.utils", [])

/**
 * @Directive followsAppendedContent
 *
 * This directive is intended for HTML containers which:
 * - are constrained in height,
 * - its content will be longer than its height constraint (hence showing a scrollbar),
 * - its content is frequently updated live downwards,
 * - the most important content is always the latest content (i.e. the one at the bottom)
 *
 * This directive will scroll the HTML container each time its content changes,
 * ensuring most recent content is being shown to the user.
 *
 * Exceptional case: if the user itself has manually scrolled (upwards) in order
 * to check previous content, then, when new content is added, this directive
 * will NOT scroll. When the user manually scrolls back to the latest content,
 * standard behaviour will re-engage.
 * In case we want to override this exceptional behaviour (i.e. always scroll
 * to the latests content, even if the user is checking the previous'), use the
 * directive's `forceFollowIf` attribute and set it to `true`.
 *
 * @param string followsAppendedContent  Identifies each specific application of this directive.
 * @param bool   forceFollowIf           If `true`, this directive always follows
 *                                       the latest content, no matter what (read doc above).
 *
 * @emits "followedAppendedContent"
 */
.directive("followsAppendedContent", function () {
    return {
        restrict : "A",
        scope    : {forceFollowIf: "="},
        link     : function ($scope, $element, attrs) {
            var identifier = attrs.followsAppendedContent || null;

            $scope.$watch(
                function () { return $element.prop("scrollHeight"); },
                function (scrollHeight_new, scrollHeight_old) {
                    var viewport_height        = $element.innerHeight();
                    var viewport_paddingTop    = parseInt($element.css("paddingTop"), 10);
                    var viewport_paddingBottom = parseInt($element.css("paddingBottom"), 10);

                    var scrollHeight_old_if_empty  = 0 + viewport_paddingTop + viewport_paddingBottom; // scrollHeight = height + paddings (sadly)
                    var scrollHeight_old_if_bottom = $element.scrollTop() + viewport_height;

                    var hasScroll         = (scrollHeight_new > viewport_height);
                    var hadScroll         = (scrollHeight_old > viewport_height);
                    var wasScrollAdded    = (!hadScroll && hasScroll);
                    var wasViewportEmpty  = (scrollHeight_old == scrollHeight_old_if_empty);
                    var wasScrollAtBottom = (!hadScroll || scrollHeight_old == scrollHeight_old_if_bottom);
                    var isScrollingForced = (!angular.isUndefined($scope.forceFollowIf) && $scope.forceFollowIf === true);

                    var doScroll = (wasViewportEmpty || wasScrollAtBottom || isScrollingForced);
                    if (doScroll) {
                        __scrollElementViewportToBottom($element);
                        $scope.$emit("followedAppendedContent", identifier);
                    }
                }
            );

            function __scrollElementViewportToBottom($element) {
                $element.animate({"scrollTop": $element.prop("scrollHeight")});
            }
        }
    };
})

;