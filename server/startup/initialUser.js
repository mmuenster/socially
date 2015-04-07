  Meteor.startup(function () {
    if(Meteor.users.find().count() < 1){
      var users = [ 
        { name:'Matt Muenster', email: 'matt.muenster@gmail.com', username: 'mmuenster', roles:['pathologist', 'admin']},
        { name:'Kay Koenig', email: 'k@k.com', username: 'kk', roles: ['admin', 'accessioning']},
        { name:'Ned Nobody', email: 'n@n.com', username: 'nn', roles:['staff']}
      ];

      _.each(users,function(userData){
        var userid = Accounts.createUser({
          email: userData.email,
          password:'test11',
          username: userData.username,
          profile:{name: userData.name}
        });
        Meteor.users.update({_id:userid},{$set:{'emails.0.verified':true}});
        Roles.addUsersToRoles(userid,userData.roles);
      })
    }

    if(Cases==undefined) {
      HTTP.get("https://dazzling-torch-3393.firebaseio.com/CaseData/SP14-015781.json", function (error, result) {
      if(error) {
          console.log('http get FAILED!');
      } else {
          console.log('http get SUCCESS');
          var x=EJSON.parse(result.content)
          x._id = x.caseNumber;
          if (result.statusCode === 200) {
            Cases.insert(x)
          // for ( var key in result.content) {
          //     console.log(result.content);
          //   }
          //             }
          }
      };
    });

   };
});