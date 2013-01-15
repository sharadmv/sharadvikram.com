angular.module('sharad', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/blog/:id', {
        templateUrl : '/partials/blog/blog-post',
        controller : BlogPostControl
    }).
        when('/blog', {
        templateUrl : '/partials/blog/blog-home',
        controller : BlogControl
    }).
        when('/', {
        templateUrl : '/partials/blog/blog-home',
        controller : HomeControl
    }).
        otherwise({redirectTo: '/'})
    $locationProvider.html5Mode(true);
}])
.directive('markdown', function() {
    var converter = new Showdown.converter();
    var link = function(scope, element, attrs, model) {
        scope.$watch(attrs['ngModel'], function(){
            var htmlText = converter.makeHtml(model.$modelValue);
            element.html(htmlText);
            element.find('pre code').each(function(index, block){
                hljs.highlightBlock(block);
            });
        });
    };
    return {
        restrict: 'E',
        require: 'ngModel',
        link: link
    }
})
.directive('markdownShort', function() {
    var converter = new Showdown.converter();
    var link = function(scope, element, attrs, model) {
        scope.$watch(attrs['ngModel'], function(){
            var htmlText = converter.makeHtml(model.$modelValue);
            element.html(htmlText);
        });
    };
    return {
        restrict: 'E',
        require: 'ngModel',
        link: link
    }
});
