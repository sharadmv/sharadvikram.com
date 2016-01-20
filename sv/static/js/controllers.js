app.controller("ResearchController", function($scope) {
  $scope.papers = [
    {
      title: "Interactive Hierarchical Clustering using Bayesian Nonparametrics",
      authors: "Sharad Vikram and Sanjoy Dasgupta",
      venue: "NIPS Workshop - Bayesian Nonparametrics: The Next Generation",
      link: "/pdf/research/ihcbn.pdf",
      year: 2015,
    }
  ]
});

app.controller("TeachingController", function($scope) {
  $scope.sections = [
    {
      'section_link': "/pdf/250b/section1.pdf"
    }
  ]
});
