/**
 * @Model
 */
function Shout(text) {
    this.text = text;
    this.timestamp = new Date();
}

/**
 * @WebComponent
 */
APP.directive("shoutbox", function () {

    /**
     * @WebComponentController
     */
    ShoutboxWebComponentCtrl.$inject = ["$scope"];
    function ShoutboxWebComponentCtrl($scope) {
        $scope.shouts = [];
        $scope.input  = "";

        $scope.addShout = function () {
            if ($scope.input) {
                var shout = new Shout($scope.input);
                $scope.shouts.push(shout);
                $scope.input = "";
            }
        };
    }

    return {
        "restrict"    : "E",
        "replace"     : true,
        "templateUrl" : "webcomponents/shoutbox/shoutbox.tpl.html",
        "controller"  : ShoutboxWebComponentCtrl
    };
});