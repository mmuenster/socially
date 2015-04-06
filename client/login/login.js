'use strict';
 
angular.module('newlisApp')
  .controller('LoginController', function ($scope, $meteor, $state, $location) {
    
    if($meteor.waitForUser()) {
      redirect();
    }

    $scope.passwordLogin = function(email, password) {
      $scope.err = null;
      $meteor.loginWithPassword(email, password).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, password, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        firebaseUtils.createAccount(email, pass, {rememberMe: true})
          .then(redirect, showError);
      }
    };
    
    function redirect() {
      $state.go('home'); 
    }

    function showError(err) {
      console.log(err)
      $scope.err = err;
    }

  });
