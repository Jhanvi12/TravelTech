angular.module('app.factory.socket',[])
.factory('socket', ['$rootScope','baseAPI', function ($rootScope, baseAPI) {
    console.log(baseAPI)
    // temperary work around to resolve non-sticky socket error
  // var socket = io.connect(baseAPI, {transports: ['websocket'], 'force new connection': true});
  var socket = io('http://localhost:2001');
  socket.on('connect', function(){console.log('connected')});
  socket.on('disconnect', function (){console.log('disconnected')});
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}]);
