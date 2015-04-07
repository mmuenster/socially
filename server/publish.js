Meteor.publish('allUsers', function publishFunction() {
	return Meteor.users.find({});
})

Meteor.publish(null, function (){ 
  return Messages.find({})
})

