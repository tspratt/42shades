angular.module('club42')
  .controller('MainCtrl', ['$rootScope','$scope', '$state', 'memberData',
    function ($rootScope, $scope, $state, memberData) {
      $scope.activeState = 'list-members';

      $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
          var sState = toState.name;
          $scope.activeState = sState;
        });
      $scope.goView = function (state) {
        $state.go(state)
      };

    }]);
