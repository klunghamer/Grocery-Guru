(function(){
  angular
  .module('grocery')
  .controller('MainController', function($http, $state){
    var self = this;
    self.adding = false;

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
        self.findStores();
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

    this.startAdd = function() {
      self.adding = true;
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
        self.adding = false;
        $state.go('list', {ur: '/list'});
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.back = function() {
      self.adding = false;
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
      if (!item._id) {
        console.log('are you sure you want to delete?');
        return item;
      }
      return $http({
        url: `/users/delete/${item._id}`,
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
      var zipcode = self.user.zipcode;
      console.log('ZIP>>', zipcode);
      return $http({
        url: `/helpers/location/${zipcode}`,
        method: 'GET'
      })
      .then(function(response) {
        console.log(response);
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        console.log(latitude, longitude);
        return $http({
          url: `/helpers/stores/${latitude}/${longitude}`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response);
          self.store1 = response.data.results[0];
          self.store2 = response.data.results[1];
          self.store3 = response.data.results[2];
        })
        .catch(function(err) {
          console.log(err);
        })
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.editZip = function(user) {
      console.log(user);
      return $http({
        url: `/users/zip/${self.user._id}`,
        method: 'PUT',
        data: user
      })
      .then(function(response) {
        console.log(response);
        self.findStores();
        $state.go('list', {ur: '/list'});
      })
      .catch(function(err) {
        console.log(err);
      })
    }


  }); //controller closure
})()
