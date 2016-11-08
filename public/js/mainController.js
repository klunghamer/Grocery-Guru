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
        self.user = response.data.user;
        console.log(self.user);
        $state.go('list', {ur: '/list'});
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.logout = function(user) {
      return $http({
        url:'/users/logout',
        method: 'DELETE',
        data: user
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status === 200) {
          self.user = null;
          $state.go('home', {ur: '/'});
        }
      })
    }

    this.addItem = function(item) {
      return $http({
        url: '/users',
        method: 'POST',
        data: item
      })
      .then(function(response){
        console.log(response);
        self.user.itemsToFind.push(item);
        $state.go('list', {ur: '/list'});
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.deleteFromToFind = function(item, index) {
      // console.log(item);
      return $http({
        url: `/users/${item._id}`,
        method: 'DELETE',
      })
      .then(function(response){
        console.log(response);
        self.user.itemsToFind.splice(index, 1);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.deleteFromInCart = function(item, index) {
      console.log(item);
      return $http({
        url: `/users/cart/${item._id}`,
        method: 'DELETE',
      })
      .then(function(response){
        console.log(response);
        self.user.itemsInCart.splice(index, 1);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.moveToCart = function(item, index) {
      console.log('item>', item);
      console.log('index>', index);
      return $http({
        url: `/users/${item._id}`,
        method: 'PUT',
        data: item
      })
      .then(function(response){
        console.log(response);
        self.user.itemsToFind.splice(index, 1);
        self.user.itemsInCart.push(item);
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.findStores = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        return $http({
          url: `/helpers/stores/${latitude}/${longitude}`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response);
          // console.log('latitude', latitude);
        })
      });
    }


  }); //controller closure
})()
