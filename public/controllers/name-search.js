angular.module('club42')
  .controller('NameSearchCtrl', ['$scope', '$state', '$timeout', 'appConstants','memberData',
    function($scope, $state, $timeout, appConstants, memberData) {
      $scope.members = [];
      $scope.member = null;
      $scope.selectedId = '';
      $scope.matchString = '';

      function initModule(){
        document.getElementById('inputMatchString').focus();
      }


      $scope.onChangeMatchString = function () {
        $timeout(function () {
          $scope.member = null;
          memberData.getMembersByNameMatch($scope.matchString)
            .then(function (res) {
              if (res.status >= 200 && res.status < 300) {
                $scope.members = res.data.data;
                if ($scope.members.length === 1) {
                  $scope.member = $scope.members[0];
                }
              }
              else {
                console.log('HTTP Error: ' + res.statusText);
              }

            });

        },appConstants.QUERY_DELAY);
      };

      $scope.onClickMember = function(oMember) {
        $scope.member = oMember;
        $scope.selectedId = oMember._id
      };

     initModule();
}]);
