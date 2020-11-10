angular.module('app.core.directive.chat', ['app.factory.socket','app.env'])
        .directive('chatBox', [function() {
                return {
                    restrict: 'E',
                    templateUrl: '../admin/js/admin/chat/views/index.html',
                    scope: {
                        activeMemberChat: '='
                    },
                    controller: 'AdminChatController',
                    link: function(scope, element, attr) {
                        if (!status) {
                            var status = 1;
                        }

                        $(element).find('#minus').click(function() {
                            if (status == 1) {
                                $('#chatBox').css({
                                });
                                status = 2;
                            } else {
                                $('#chatBox').css({
                                });
                                status = 1;
                            }
                        });
                    }
                };
            }]);
