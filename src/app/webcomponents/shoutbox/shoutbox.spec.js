describe('Shoutbox Component', function () {
    var element, $scope;

    beforeEach(module('angularfire-shoutbox-example'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope  = $rootScope.$new();
        element = angular.element("<shoutbox></shoutbox>");
        element = $compile(element)($scope);
        $scope.$digest();
    }));

    it("should replace <shoutbox> with the component's template", inject(function() {
        expect(element.hasClass("shoutbox-component")).toBeTruthy();
    }));
});