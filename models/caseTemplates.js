CaseTemplates = new Mongo.Collection('caseTemplates');

CaseTemplates.allow({
	insert: function() { return true; },
	update: function() { return true; }
})
