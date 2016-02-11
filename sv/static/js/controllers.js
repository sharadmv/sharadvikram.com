app.controller("ResearchController", function($scope) {
  $scope.papers = [
    {
      title: "Interactive Bayesian Hierarchical Clustering",
      authors: "Sharad Vikram and Sanjoy Dasgupta",
      venue: "Arxiv",
      link: "http://arxiv.org/abs/1602.03258",
      year: 2015,
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
  $scope.sections = [
    {
      'section_link': "/pdf/250b/section1.pdf"
    }
  ]
});
