angular.module('sharad', [])
.directive('markdown', function() {
  var converter = new Showdown.converter();
  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {
      if (attrs.markdown) {
        scope.$watch(attrs.markdown, function (newVal) {
          var html = newVal ? converter.makeHtml(newVal) : '';
          element.html(html);
        });
      } else {
        var html = converter.makeHtml(element.text());
        element.html(html);
      }
      element.find('pre code').each(function(index, block){
        hljs.highlightBlock(block);
      });
      MathJax.Hub.Configured({
      });
    }
  };
})
.directive('permalink', function() {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      console.log(scope)
    }
  };
});
