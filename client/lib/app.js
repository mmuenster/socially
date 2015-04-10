angular.module('newlisApp',[
	'angular-meteor',
	'ui.router'
	 ]);

angular.module('newlisApp')
	.constant('CASE_TEMPLATES', {
		"US1": {
			name: "US1",
			description: "Standard Prostate Report",
			template: 'US1.ng.html'
		},

		"SP1": {
			name: "SP1",
			description: "Standard Skin Report",
			template: 'SP1.ng.html'
		},
	})

