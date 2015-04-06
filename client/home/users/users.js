angular.module('newlisApp')
  .controller('UsersController', function ($scope, user, $state, $meteor, $timeout) {
    
    if(user.roles.indexOf("admin") < 0) {
      $state.go('uiHome')
    }

    $scope.roles = Meteor.roles.find().fetch();
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('allUsers');
    $scope.messages = [];

    $scope.setModalData = function(user) {
      $scope.modalData = angular.copy(user);
      $scope.newpass = "";
      $scope.confirm = "";
      $scope.newEmail = "";
    }

    $scope.removeUser=  function(user) {
      $meteor.call('removeUser', user._id)
        .then(
          function(message) { success(user.profile.name + " deleted sucessfully!")},
          function(message) { error(message)}
        );
    };   

    $scope.addNewUser = function() {
      $meteor.call('createNewUser', $scope.addNew)
        .then(
          function(message) {success("User " + $scope.addNew.name + " created sucessfully!")}, 
          function(message) {error(message)}
        );
    }

    $scope.saveUser = function() {
      $meteor.call('updateUser', $scope.modalData)
        .then(
          function(message) { success ("Changes to user " + $scope.modalData.profile.name + " saved sucessfully.") },
          function(error) { error (message) }
        );
    }

    $scope.changePassword = function() {
      $scope.err = null;
      if( !$scope.confirm || !$scope.newpass ) {
        error('Please enter all fields');
      }
      else if( $scope.newpass !== $scope.confirm ) {
        error('Passwords do not match');
      }
      else {
        $meteor.call('passwordSet', $scope.modalData._id, $scope.newpass)
          .then(
            function(message) { success ("Password changes to user " + $scope.modalData.profile.name + " saved sucessfully.") },
            function(message) { error(message) }
          );
      }
    };

    $scope.changeEmail = function() {
      $scope.err = null;
      firebaseUtils.changeEmail($scope.modalData.password, $scope.newEmail, $scope.modalData.email)
        .then(
          function() { 
            var x = $scope.users.$indexFor($scope.modalData.$id);
            $scope.users[x].email = $scope.newEmail;
            $scope.users.$save(x).then(
              function(message) { success ("Email for user " + $scope.users[x].name + " changed sucessfully.") },
              function(message) { error(message) }
              )},
          function(message) { error(message) }
        );
    };



    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  });
