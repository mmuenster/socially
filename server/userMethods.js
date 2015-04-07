Meteor.methods({
	'passwordSet':function(userId, newPassword) {
		return Accounts.setPassword(userId, newPassword);
	},

	'createNewUser':function(user){
		var id=Accounts.createUser({ 
		  username:user.username,
		  email: user.email, 
          password:user.password, 
          profile: {name:user.name}, 
        });
        Roles.addUsersToRoles(id, user.roles)
        return id;
	},
 
	'log': function(){
		if(this.userId && Roles.userIsInRole(this.userId, 'admin')){
		console.log("Hellow world")
	} else {
		throw new Meteor.Error("logged-out",  "The user must be logged in to post a comment.");
	}
	},

	'removeUser':function(id){
		return Meteor.users.remove({_id:id})
	},

	'updateUser':function(user){
		if(Roles.userIsInRole(Meteor.user(), 'admin')) {
		return Meteor.users.update(
			{_id:user._id}, { $set:{
				'emails': [{ address: user.emails[0].address }],
				'profile.name': user.profile.name, 
				'roles':user.roles
			}}
		);
 	}
 },
 	'updateEmail':function(user){
 		return Meteor.users.update({_id:user._id}, {$set:{
 			'emails': [ {address: user.email, verified: true} ]
 		}})
 	}
});