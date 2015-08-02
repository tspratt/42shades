angular
  .module('club42', [
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider,$httpProvider,$sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self'                                                   // Allow same origin resource loads.
    ]);

    $urlRouterProvider.otherwise('/member-list');
    $stateProvider
      .state('member-list', {
        url: '/member-list',
        templateUrl: '/views/member-list.html',
        controller: 'MemberCtrl'
      })
      .state('name-search', {
        url: '/name-search',
        templateUrl: '/views/name-search.html',
        controller: 'NameSearchCtrl'
      })
      .state('field-filter', {
        url: '/field-filter',
        templateUrl: '/views/field-filter.html',
        controller: 'FieldFilterCtrl'
      })

  })
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$state = $state;



  }]);