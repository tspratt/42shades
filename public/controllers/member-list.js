angular.module('club42')
  .controller('MemberCtrl', ['$scope', '$state', 'appConstants', 'memberData',
    function($scope, $state, appConstants, memberData) {
      $scope.members = [];
      $scope.member = {};
      $scope.pageNum = 0;
      $scope.pageLen = 10;

      function initModule(){
        getMembers();
      }

      $scope.nextPage = function (){
        console.log('nextPage');
        $scope.pageNum ++;
        getMembers();
      };
      $scope.prevPage = function (){
        console.log('prevPage');
        if ($scope.pageNum > 0) {
          $scope.pageNum --;
          getMembers();
        }
      };
      $scope.firstPage = function (){
        console.log('firstPage');
        $scope.pageNum = 0;
        getMembers();
      };
      $scope.lastPage = function (){

      };

      $scope.onChangePageLen = function(){
        console.log('onChangePageLen');
        getMembers();
      };

      function getMembers () {
        $scope.member = null;
        memberData.getMembers($scope.pageNum,$scope.pageLen,null,null, false)
          .then(function (res) {
            if (res.status >= 200 && res.status < 300) {
              $scope.members = res.data.data;
            }
            else {
              console.log('HTTP Error: ' + res.statusText);
            }

          });
      }


      $scope.onClickMember = function(oMember) {
        $scope.member = oMember;
        $scope.selectedId = oMember._id
      };

      initModule();

}]);
