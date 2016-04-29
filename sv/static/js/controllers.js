app.controller("ResearchController", function($scope) {
  $scope.papers = [
    {
      title: "Interactive Bayesian Hierarchical Clustering",
      authors: "Sharad Vikram and Sanjoy Dasgupta",
      venue: "International Conference on Machine Learning",
      link: "http://arxiv.org/pdf/1602.03258",
      year: 2016,
    },
    {
      title: "Interactive Hierarchical Clustering using Bayesian Nonparametrics",
      authors: "Sharad Vikram and Sanjoy Dasgupta",
      venue: "NIPS Workshop - Bayesian Nonparametrics: The Next Generation",
      link: "/pdf/research/ihcbn.pdf",
      year: 2015,
    },
  ]
});

app.controller("TeachingController", function($scope) {
});
