// 'use strict';

// Function wrapper
(function() {

  /* Directives */
  angular.module('conversionApp.directives', [])

  .directive('assumptionsStandardline', [function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/assumptions-standardline.html'
    };
  }]);


// End of function wrapper
})();
