angular.module('club42')
  .controller('MemberCtrl', ['$scope', '$state', 'appConstants', 'memberData',
    function($scope, $state, appConstants, memberData) {
      $scope.members = [];
      $scope.member = {};

      function initModule(){

      }

      initModule();

}]);
