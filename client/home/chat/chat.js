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

    $scope.addCases = function() {
      HTTP.get("https://dazzling-torch-3393.firebaseio.com/CaseData.json", function (error, result) {
            if(error) {
                console.log('http get FAILED!');
            } else {
                console.log('http get SUCCESS');
                var y=EJSON.parse(result.content)
                for (var key in y) { 
                  y[key]._id = key
                  Cases.insert(y[key])
                //   console.log(key,y[key])// for ( var key in result.content) {
                  //     console.log(result.content);
                  //   }
                  //             }
                
                };
            };
      });
    }


    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
