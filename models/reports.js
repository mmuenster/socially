Reports = new Mongo.Collection('reports');

Reports.allow({
	insert: function() { return true; },
	update: function() { return true; }
})
