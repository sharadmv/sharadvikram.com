function HomeControl($scope, $http, $routeParams) {
    $scope.partial = function(post) {
        return "Hello";
    }
    $http.get('/api/post/').success(function(data) {
        $scope.posts = data;
    });
}
function BlogControl($scope, $http, $routeParams) {
    $scope.meta = {};
    $http.get('/api/post/').success(function(data) {
        $scope.meta.length = data.length;
        $scope.meta.count = 0;
        $scope.posts = data;
    });
}
function BlogPostControl($scope, $http, $routeParams) {
    $scope.meta = {};
    $http.get('/api/post/'+$routeParams.id).success(function(data) {
        $scope.post = data;
        $scope.meta.count = 0;
        $scope.meta.length = 1;
    });
}
