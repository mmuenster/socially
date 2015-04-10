angular.module("newlisApp").config(['CASE_TEMPLATES','$urlRouterProvider', '$stateProvider', '$locationProvider',
  function(CASE_TEMPLATES, $urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'client/login/login.ng.html',
        controller: 'LoginController',
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'client/logout/logout.ng.html',
        controller: 'LogoutController',
      })
      .state('home', {
        url: '/',
        templateUrl: 'client/home/home.ng.html',
        controller: 'HomeController',
        resolve: {
          "user": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]}
      })
      .state('home.users', {
        url: 'users',
        templateUrl: 'client/home/users/users.ng.html',
        controller: 'UsersController',
        resolve: {
          "user": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]}
      })
      .state('home.pdfBuilder', {
        url: 'pdfBuilder',
        templateUrl: 'client/home/pdfBuilder/pdfBuilder.ng.html',
        controller: 'PDFBuilderController',
        resolve: {
          "user": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]}
      })
      .state('home.chat', {
        url: 'chat',
        templateUrl: 'client/home/chat/chat.ng.html',
        controller: 'ChatController',
        resolve: {
          "user": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]}
      })
      .state('home.caseEdit', {
        url: 'caseEdit/:caseNum',
        templateUrl: function($stateParams) {
          if($stateParams.caseNum=="US15-001974") { 
            console.log("Int he US")
            return 'client/home/caseEdit/' + CASE_TEMPLATES.US1.template;
          } else { 
            return 'client/home/caseEdit/' + CASE_TEMPLATES.SP1.template;
          }
        },
        controller: 'CaseEditController',
        resolve: {
          "user": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]}
      })

      // .state('partyDetails', {
      //   url: '/parties/:partyId',
      //   templateUrl: 'client/parties/views/party-details.ng.html',
      //   controller: 'PartyDetailsCtrl',
      //   resolve: {
      //     "currentUser": ["$meteor", function($meteor){
      //       return $meteor.requireUser();
      //     }]
      //   }
      // });

      $urlRouterProvider.otherwise("/login");
}]);

angular.module("newlisApp").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    console.log("$stateChangeError", error)
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);
