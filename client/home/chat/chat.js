angular.module('newlisApp')
  .controller('ChatController', function ($scope, $meteor, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $meteor.collection(Messages);
    console.log();
    // display any errors
    // $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        $scope.messages.push({ text: newMessage})
        alert("Message added!")
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
