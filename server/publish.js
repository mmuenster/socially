Meteor.publish('allUsers', function publishFunction() {
	return Meteor.users.find({});
})

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})