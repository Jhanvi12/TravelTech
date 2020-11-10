angular.module('app.core.directive.preloader', [])
.directive('preloader', function ()
{
    return {
        restrict: 'A',
        template: '<div class="loading-spiner-holder" data-loading ></div>',
        link: function (scope, elm, attrs)
        {
            $(elm).hide();
            scope.$on('start',function(){
                $(elm).children('.loading-spiner-holder').css({
                    "width":$(elm).parent().width(),
                    "height":$(elm).parent().height()
                });
                $(elm).find('.loading-image').css({
                    "top":($(elm).parent().height()/2)-100,
                });
                $(elm).show();
            });
            scope.$on('stop',function(){
                $(elm).hide();
            });
        }
    };
});
