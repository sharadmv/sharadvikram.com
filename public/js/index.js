angular.module('sharad', []).directive('markdown', function() {
    var converter = new Showdown.converter();
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.$watch(attrs['ngModel'], function() {
                var htmlText = converter.makeHtml(element.text());
                element.html(htmlText);
                element.find('pre code').each(function(i, e) { hljs.highlightBlock(e) });
            });
        }
    }
});
function BlogControl($scope, $http) {
    $http.get('/api/post/').success(function(data) {
        $scope.posts = data;
    });
}
