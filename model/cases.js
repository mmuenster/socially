Cases = new Mongo.Collection('cases');

Cases.allow({
	insert: function() { return true; },
	update: function() { return true; }
})
