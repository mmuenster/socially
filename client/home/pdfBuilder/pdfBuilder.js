angular.module('newlisApp')
  .controller('PDFBuilderController', function ($scope, $timeout, $meteor, $stateParams, $sce, $q) {
		var baseReport=$meteor.object(Reports, "test");
		  $scope.preview = false;
		  $scope.iframeURL = "";
		  $scope.caseNumber="SP15-000424"

		$scope.editor = AceEditor.instance("editor",{
		    theme:"monokai", 
		    mode:"javascript"
		}, function(editor) {
			editor.$blockScrolling = Infinity;
			editor.setValue(baseReport.code);
		});

		$scope.test = function() {
			AceEditor.instance("editor",null,function(editor){
	  			var data = $meteor.object(Cases,$scope.caseNumber)
				var doc = new PDFDocument();
			    var stream = doc.pipe(blobStream());

				eval(editor.getValue())

				stream.on('finish', function() {
				  $scope.iframeURL =  $sce.trustAsResourceUrl( stream.toBlobURL('application/pdf') );
				  $scope.preview = true;
				  $scope.$apply();
				});    	

			});
		}

		$scope.newReport = function() {

		}

		$scope.loadReport = function() {

		}

		$scope.saveReport = function() {
			AceEditor.instance("editor",null,function(editor){
				console.log(baseReport)
				baseReport.code = editor.getValue();
			});
		}
});

