(function(){
  angular
  .module('grocery')
  .controller('MainController', function($http, $state){
    var self = this;

    this.signup = function (user) {
      console.log(user);
      self.signed = user;
      return $http({
        url: `/users/signup`,
        method: 'POST',
        data: user
      })
      .then(function(response){
        console.log(response);
        self.login(self.signed);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.login = function(user) {
      return $http({
        url: '/users/login',
        method: 'POST',
        data: user
      })
      .then(function(response) {
        console.log(response);
        self.user = response.data.user;
        $state.go('list', {ur: '/list'})
      })
      .catch(function(err) {
        console.log(err);
      })
    }

  }); //controller closure
})()
