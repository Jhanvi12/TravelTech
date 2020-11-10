angular.module('app.admin.chat', [
    'app.chat.service',
    'app.core.services.LocalStorage',
    'app.core.service.Count'
])
.controller('AdminChatController', ['$scope', '$location', '$anchorScroll', 'LocalStorageService', 'socket', 'ChatService', 'Count', '$state', '$http', function($scope, $location, $anchorScroll, LocalStorageService, socket, ChatService, Count, $state, $http) {
    console.log("welcome chat")
     $scope.hideClass = [];
    $scope.hidden = false;
    $scope.activeMemberChat = [{}];
    $scope.activeMemberChat[0].fname = 'vky';
    $scope.activeMemberChat[0].lname = 'raj';
    $scope.minus = function(index){
        if(!_.includes($scope.hideClass, index)){
            $scope.hideClass.push(index);
            $scope.hidden = true;
        }else{
            var i = _.indexOf($scope.hideClass, index);
            _.pullAt($scope.hideClass, i);
            $scope.hidden = false;
        }
    };
    $scope.close =  function(index){
        _.pullAt($scope.activeMemberChat, index);
    };
    $scope.sendMsg = function(msg, active){
        var json = {};
        json.msg = msg;
        json.reciever = active._id;
        ChatService.sendMsg(json).then(function(data){
            console.log(data);
        }).catch(function(err){
            console.log(err);
        });
    }
}]);
