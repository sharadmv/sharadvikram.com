function HomeControl($scope, $http, $routeParams) {
    $scope.partial = function(post) {
        return "Hello";
    }
    $http.get('/api/post/').success(function(data) {
        $scope.posts = data;
    });
}
function BlogControl($scope, $http, $routeParams) {
    $http.get('/api/post/').success(function(data) {
        $scope.posts = data;
    });
}
function BlogPostControl($scope, $http, $routeParams) {
    $http.get('/api/post/'+$routeParams.id).success(function(data) {
        $scope.post = data;
    });
}
