(function () {

    'use strict';

  /**
  * The above global variables are visibale to each component (controllers, services...)
  * adds it self to them. E.g: controllers.controller('ExController', ExControllerDef)
  */
  var constants = angular.module("starter.constants", []);
  var controllers = angular.module("starter.controllers", []);
  var directives = angular.module("starter.directives", []);
  var factories = angular.module("starter.factories", []);
  var services = angular.module("starter.services", []);


  require('./constants/config');
  require('./constants/routes');

  require('./directives/menu-directive');
  require('./directives/footer-directive');

  require('./services/app-toolkit');
  require('./services/access-service');
  require('./services/atividade-service');
  require('./services/login-service');
  require('./services/cadastro-service');

  require('./controllers/app-controller');
  require('./controllers/main-app-controller');
  require('./controllers/atividade-controller');
  require('./controllers/login-controller');
  require('./controllers/cadastro-controller');


  //require controllers, services etc.

  var app = angular.module("starter", [
    /**
    * Libraries modules dependencies
    */
    "ui.router","ui.materialize","ngMap",

    /**
    * Our modules  dependencies
    */
    "starter.constants", "starter.controllers", "starter.directives", "starter.factories", "starter.services"
  ])

  /**
  * Main function
  */
  .run(["$rootScope", "Access", "$state", function ($rootScope, Access, $state) {



    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      //em alguns casos mandar para login
      console.log(error);
      if (error == Access.UNAUTHORIZED) {
        $state.go("app");
      } else if (error == Access.FORBIDDEN) {
        $state.go("app");
      } else if( error == Access.OK){
        $state.go("app");
      } else{
        $state.go("app");
      }
    });


    }])
  /**
  * States configuration
  */
  .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    /**
    * The above code shows how to add an state and state part.
    *
    * $stateProvider
    *  .state("stateName", {
    *    url: "stateUrl/"
    *    templateUrl: "templates/state.html",
    *    controller: "ControllerName"
    *  })
    *  .state("stateName.part", {
    *    url: "statePartUrl/"
    *    templateUrl: "templates/state/part.html",
    *    controller: "ControllerPartName"
    *  })
    */

    $stateProvider
      .state("app", {
        url: "/",
        templateUrl: "templates/app.html",
        controller: "AppController",
        resolve: {
          access: ["Access", function (Access) { return Access.isPublic(); }]
        }
      })
      .state("atividade-detalhes", {
        url: "/detalhes-atividade/:atividadeId",
        templateUrl: "templates/detalhes-atividade.html",
        controller: "AtividadeController",
        resolve: {
          access: ["Access", function (Access) { return Access.isPublic(); }]
        }
      })
      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginController",
        resolve: {
          access: ["Access", function (Access) { return Access.isPublic(); }]
        }
      })
      .state("cadastro", {
        url: "/cadastro",
        templateUrl: "templates/cadastro.html",
        controller: "CadastroController",
        resolve: {
          access: ["Access", function (Access) { return Access.isPublic(); }]
        }
      })
      .state("otherwise",{
        url: "{path:.*}",
        templateUrl: "templates/app.html",
        controller: "AppController",
        resolve: {
          access: ["Access", function (Access) { return Access.isOtherwise(); }]
        }
      });

      //$urlRouterProvider.otherwise("/");

  }]);

  app.filter("trustUrl", ["$sce", function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

  module.exports = app;

})();
