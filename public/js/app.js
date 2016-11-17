(function() {
  angular
    .module('grocery', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
      })
      .state('login', {
        url:'/login',
        templateUrl: 'login.html',
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup.html',
      })
      .state('gurus', {
        url: '/gurus',
        templateUrl: 'gurus.html',
      })
      .state('list', {
        url: '/list',
        templateUrl: 'list.html',
      })
      .state('list.add', {
        url: '/add',
        templateUrl: 'add.html'
      })
      .state('zip', {
        url: '/zip',
        templateUrl: 'zip.html',
      })

    $urlRouterProvider.otherwise('/');

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // })

  } //MainRouter closure
})()
