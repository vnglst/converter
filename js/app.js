// Function wrapper
(function() {
  'use strict';

// Declare app level module which depends on filters, and services
angular.module('conversionApp', [
  'ngRoute',
  'conversionApp.controllers',
  'conversionApp.directives',
  'angulartics', 'angulartics.google.analytics'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/word-to-line-rates', {
    templateUrl: 'partials/word-to-line-rates.html',
    controller: 'Word2LineCtrl'
    });
  $routeProvider.when('/line-to-word-rates', {
      templateUrl: 'partials/line-to-word-rates.html',
      controller: 'Line2WordCtrl'
    });
  $routeProvider.when('/stats', {
    templateUrl: 'partials/stats.html',
    controller: 'AboutCtrl'
    });
  // $routeProvider.when('/features', {
  //     templateUrl: 'partials/features.html',
  //     controller: 'AboutCtrl'
  //   });
  $routeProvider.otherwise({
    redirectTo: '/word-to-line-rates'});
}]);

})(); // End of function wrapper
