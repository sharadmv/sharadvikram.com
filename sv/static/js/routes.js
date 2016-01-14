app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider.
    state('home', {
      url: "/home",
      templateUrl: '/templates/home.html',
    }).
    state('about', {
      url: "/about",
      templateUrl: '/templates/about.html',
    }).
    state('teaching', {
      url: "/teaching",
      templateUrl: '/templates/teaching.html',
    }).
    state('research', {
      url: "/research",
      templateUrl: '/templates/research.html',
      controller: "ResearchController"
    })
});
