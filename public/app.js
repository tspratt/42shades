angular
  .module('portalUiApp', [
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider,$httpProvider,$sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self'                                                   // Allow same origin resource loads.
    ]);

    //$urlRouterProvider.otherwise('/member-list');
    $stateProvider
      .state('sign-in', {
        url: '/sign-in/:signInId',
        templateUrl: '/views/sign-in.html',
        controller: 'SignInCtrl'
      })

  })
  .run(['$rootScope', '$state', 'appService', function($rootScope, $state, appService) {
    $rootScope.$state = $state;



  }]);