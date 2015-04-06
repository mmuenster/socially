Meteor.methods({
	'createNewUser':function(user){
		var id=Accounts.createUser({ 
		  username:user.username,
		  email:user.email, 
          password:user.password, 
          profile: {name:user.name}, 
        });
        Roles.addUsersToRoles(id, user.roles)
        return id;
	},

	'removeUser':function(id){
		return Meteor.users.remove({_id:id})
	},

	'updateUser':function(user){
		if(Roles.userIsInRole(Meteor.user(), 'admin')) {
		return Meteor.users.update(
			{_id:user._id}, { $set:{
				'emails[0].address': user.emails[0].address,
				'profile.name': user.profile.name, 
				'roles':user.roles
			}}
		);
 	}
 }
});