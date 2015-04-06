'use strict';

angular.module('newlisApp')
  .controller('HomeController', function ($scope, user, $meteor, $state) {

    $scope.cases = {};

    $scope.orderBy = "receivedDate";
    $scope.reverse = false;
    $scope.orderString = "receivedDate";

    $scope.logout = function(){
      $meteor.logout().then(function(){
        console.log('Logout success');
        $state.go('login');
      }, function(err){
        console.log('Logout error - ', err)
      });
    };

    $scope.changeSortOrder = function(sortKey) {
      if(sortKey==$scope.orderBy) {
        $scope.reverse = !$scope.reverse
        if ($scope.reverse) {
          $scope.orderString = "-" + $scope.orderBy;
        } else {
          $scope.orderString = $scope.orderBy;
        }
      } else {
        $scope.orderBy = sortKey;
        $scope.reverse = false;
        $scope.orderString = $scope.orderBy;
      }
    }
    
    $scope.search = function(q) {
      $state.go('home.caseEdit', {caseNum:q})
      $scope.searchText = "";
    }

    $scope.isAdmin = function() {
      if(user.roles) { 
        return (user.roles.indexOf('admin') > -1) ? true : false;
      } else {
     	return false
      }
    }
  });
