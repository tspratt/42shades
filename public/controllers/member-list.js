angular.module('club42')
  .controller('MemberCtrl', ['$scope', '$state', 'memberData',
    function($scope, $state, memberData) {
      $scope.name = 'Member List';

}]);
