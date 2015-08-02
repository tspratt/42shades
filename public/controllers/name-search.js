angular.module('club42')
  .controller('NameSearchCtrl', ['$scope', '$state', 'memberData',
    function($scope, $state, memberData) {
      $scope.name = 'Member List';

}]);
