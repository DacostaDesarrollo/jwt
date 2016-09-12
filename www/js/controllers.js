angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$auth) {
  var self = this;
  self.token ={};

  self.token = $auth.getPayload();

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();                                                                                       
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('LoginCtrl', function($scope,$auth,$location) {
  var self = this;
    self.login= function(){
      $auth.login({
          username: self.username,
          password: self.password
      })
      .then(function(response){
          // Si se ha logueado correctamente, lo tratamos aquí.
          // Podemos también redirigirle a una ruta
          $location.path("/");
      })
      .catch(function(response){
          // Si ha habido errores llegamos a esta parte
          console.log(response);
          
          
      });
    }

    self.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })
        })
        .catch(function(error) {

          $ionicPopup.alert({
            title: 'Error',
            content: error.message || (error.data && error.data.message) || error
            
          });

        });
    };

    self.logout = function() {
      $auth.logout();
    };

    self.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };


});