angular.module('app.core.services.LocalStorage',[])

.service('LocalStorageService', [function(){

  this.set = function(name, value) {
    localStorage.setItem(name,value);
  };
  this.get = function(name) {
    if (!localStorage.getItem(name)) {
      return null;
    }
      return localStorage.getItem(name);
    };
   this.delete = function(name){
   	  localStorage.removeItem(name);
   };
   this.isLogin = function(name) {
    if (!localStorage.getItem(name)) {
      return false;
    }
      return true;
    };
}]);
