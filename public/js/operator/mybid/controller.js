angular.module('app.operator.mybid',
['app.operator.mybid.service',
'app.operator.enquiries.service',
'app.core.services.LocalStorage',
'angularjs-dropdown-multiselect'])

.controller('OperatorMyBidController',['$scope','$state','EnquiriesService','$uibModal','MyBidService','ngToast','$stateParams','ngTableParams','$filter','LocalStorageService',
'sweet',function($scope,$state,EnquiriesService,$uibModal,MyBidService,ngToast,$stateParams,ngTableParams,$filter,LocalStorageService,sweet){
    if(!LocalStorageService.isLogin('travel_tech_user')){
        $state.go("operator.login");
        LocalStorageService.delete("travel_tech_user");
        $scope.state.name='operator.login';
        $state.go('operator.login');
    }
      $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };

    $scope.example2settings = {
        displayProp: 'id'
    };
    /*Function to get bid list*/
    $scope.getBidList = function(status){
         $scope.bidType = status;
           MyBidService.getMyBids(status).then(function(data){
            angular.forEach(data, function(val){
                MyBidService.getLowestBids(val.ride._id).then(function(data){
                    if(data){
                        val.lbid = data.amount;
                    }else{
                        val.lbid = 0;
                    }
                }).catch(function(err){
                    val.lbid = 0;
                    console.log(err);
                });
            });
           $scope.mybids = data;
           console.log('$scope.mybids',$scope.mybids);
           /*Code for unique bids in my bid section*/
          /* $scope.mybids.forEach(function(item, i){
                console.log(item.ride._id);
           });
           $scope.mybids = _.uniq($scope.mybids, false, function(p){ 
                return p.ride._id; 
            });          */ 
           console.log('$scope.mybids after',$scope.mybids);         
                        $scope.bidsFields = [];
                        $scope.mybids.forEach(function(item, i){
                            console.log('i ', i);
                        $scope.bidsFields[i] = [{}];
                    });
            $scope.bid = [];
            for(var i=0; i< $scope.mybids.length; i++){
                $scope.bid.push({vehicle_quote:[]});
            }
        }).catch(function(err){
            console.log(err);
        });
    };
    $scope.disable = true;
    $scope.addnew =  false;
    $scope.changeBid = function(){
        $scope.disable = false;
    }
    $scope.addNewBid = function(){
        $scope.addnew = true;
    }
    /*To ask confirmation before deletion of bids*/
    $scope.confirmCancel = function(id) {
        sweet.show({
            title: 'Confirm',
            text: 'Delete this Bid?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                 $scope.DeleteBid(id); 
                 sweet.show('Deleted!', 'The Bid has been deleted.', 'success');
            }else{
                sweet.show('Cancelled', 'Your Bid is safe :)', 'error');
            }
        });
    };
    /**
    * @ Deleting Bid
    * function user for softdeleting  information
    **/
    $scope.DeleteBid = function(id){
        MyBidService.DeleteBid(id).then(function(data){
            console.log(data);
            _.remove($scope.mybids, function(n) {
                return n._id == id;
            });
            ngToast.dismiss();
            ngToast.create({
                className: 'success',
                content: "Deleted"
            });
            // $route.reload();
            //$state.go('operator.myprofile');
        }).catch(function(err){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: "Process Failed"
            });
        });
    };
    /*
    * @showVehiclesInDropdown
    * function:to show the vehicle in dropdown
    */
    $scope.showVehiclesInDropdown=function(){
         var vehicalarray =[];
        MyBidService.showVehicles().then(function(data){
            if(data){
                console.log(data , "mydata");
                $scope.options = data.data;
                  console.log("vehicledata",data.data[0].type);
                       for(var i = 0; i< data.data.length; i++ ){
                        vehicalarray.push({"label":data.data[i].type, "id":data.data[i].type})

                       }
                     $scope.example14data = vehicalarray;
                     $scope.example14model = [];

            }
        }).catch(function(err){
            console.log(err)
        });
    };
    /*To push the bid length*/
      $scope.bidlength = function(vehicle_count){
            var bidlen = [];
            for(var i = 0; i< vehicle_count; i++){
                bidlen.push(i);
            }
            return bidlen;
        }
        /*To fetch the drivers*/
         $scope.showDriverInDropdown=function(){
            MyBidService.showDrivers().then(function(data){
                if(data){
                    $scope.drivers = data.data;
                }
            }).catch(function(err){
                console.log(err)
            });
        };
        $scope.showDriverInDropdown();
        $scope.showVehiclesInDropdown();
        /*Function to get vehicle count and push*/
          $scope.getVehicleCount = function(vehicle){
            var arr = [];
            for(var i = 0; i<= vehicle-1; i++){
                arr.push(i);
            }
            return arr;
        };

   
    /*To save bidding details*/
   /* $scope.BiddingDetails=function(index, ride, vehicle_count, passenger_count,form){
        console.log("$scope.example14model" ,$scope.bid[index].vehicle_quote);

        $scope.bid[index].ride= ride;
        $scope.bid[index].bid_rate_type= "flat";
        $scope.bid[index].bid_status= "not_approved";
        $scope.error= {};
        $scope.error.is = false;
        console.log('$scope.final model',$scope.bid[index]);
       
        var totalCapacity = [];
        var totalCarCount = 0;
        angular.forEach($scope.bid[index].vehicle_quote,function(item){
            var count = 0;
            totalCarCount +=item.vehicle.length;
            angular.forEach(item.vehicle,function(val){
                angular.forEach($scope.options,function(option){
                    if(val.id == option._id){
                        count += option.capacity;
                    }
                });
            });
            totalCapacity.push(count);
        });
        var error_count = 0;
        angular.forEach(totalCapacity,function(item){
            if(item < passenger_count)
                error_count++;
        })
        console.log("Console one",error_count);
        console.log("Console two",totalCapacity);
        if(error_count > 0){
           $scope.error.is = true
           $scope.error.message = 'Please provide more Vehicles than' + passenger_count;
        }

        if(totalCarCount>vehicle_count){
           $scope.error.is = true
           $scope.error.message = 'Cannot Select More Vehicles than '+ vehicle_count;
        }

        if($scope.error.is){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: $scope.error.message
            });
        }
        else{
            EnquiriesService.BiddingDetails($scope.bid[index]).then(function(data){
       
                $scope.bid[index].vehicle_quote.forEach(function(item, i){
                    item.vehicle = [];
                    item.ride_duration = '';
                    item.bid_amount = '';
                });
                form.$setUntouched();
                form.$setPristine();
                console.log('form 2 is ',form);
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Your bid is saved'
                });
                $state.reload();
            }).catch(function(err){
                ngToast.dismiss();
                ngToast.create({
                    className: 'danger',
                    content: 'Information not saved'
                });
            });
        }
    };*/
            /*To post Bids*/
    $scope.BiddingDetails=function(index, ride, vehicle_count, passenger_count,form){
        console.log("$scope.example14model" ,$scope.bid[index].vehicle_quote);

        $scope.bid[index].ride= ride;
        $scope.bid[index].bid_rate_type= "flat";
        $scope.bid[index].bid_status= "not_approved";
        $scope.error= {};
        $scope.error.is = false;
        console.log('$scope.final model',$scope.bid[index]);
        /*Validation for selecting cars according to number of passenger count*/
        var totalCapacity = [];
     
        var totalCarCount = [];
        angular.forEach($scope.bid[index].vehicle_quote,function(item){
            var count = 0;
            totalCarCount.push(item.vehicle.length);
            angular.forEach(item.vehicle,function(val){
                angular.forEach($scope.options,function(option){
                    if(val.id == option._id){
                        count += option.capacity;
                    }
                });
            });
            totalCapacity.push(count);
        });
        var error_count = 0;
        angular.forEach(totalCapacity,function(item){
            if(item < passenger_count)
                error_count++;
        })
        var err_veh = 0;
        angular.forEach(totalCarCount,function(item){
            if(item > vehicle_count)
                err_veh ++;
        })
        console.log("Console one",error_count);
        console.log("Console two",totalCapacity);
        if(error_count > 0){
           $scope.error.is = true
           $scope.error.message = 'Please provide more Vehicles than' + passenger_count;
        }
        console.log("Console three",totalCarCount);
        console.log("Console four",vehicle_count);
    
         if(err_veh > 0){
           $scope.error.is = true
           $scope.error.message = 'Cannot Select More Vehicles than '+ vehicle_count;
        }

        if($scope.error.is){
            ngToast.dismiss();
            ngToast.create({
                className: 'danger',
                content: $scope.error.message
            });
        }
        else{
            EnquiriesService.BiddingDetails($scope.bid[index]).then(function(data){
                /*To make the entry blank*/
                $scope.bid[index].vehicle_quote.forEach(function(item, i){
                    item.vehicle = [];
                    item.ride_duration = '';
                    item.bid_amount = '';
                });
                form.$setUntouched();
                form.$setPristine();
                console.log('form 2 is ',form);
                ngToast.dismiss();
                ngToast.create({
                    className: 'success',
                    content: 'Your bid is saved'
                });
                $state.reload();
            }).catch(function(err){
                ngToast.dismiss();
                ngToast.create({
                    className: 'danger',
                    content: 'Information not saved'
                });
            });
        }
    };
          /*To add a bid detail at bid page*/
        $scope.addMyBidInfo = function(index){
            $scope.bidsFields[index].push({});
        };
          /*To remove a bid detail at bid page*/
        $scope.removeMyBidInfo = function(parent,index){
            $scope.bidsFields[parent].splice(index,1);
            $scope.bid[parent].vehicle_quote.splice(index, 1);
        };
}])
var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',

function ($filter, $document, $compile, $parse) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            extraSettings: '=',
            events: '=',
            searchFilter: '=?',
            translationTexts: '=',
            groupBy: '@'
        },
        template: function (element, attrs) {
            var checkboxes = attrs.checkboxes ? true : false;
            var groups = attrs.groupBy ? true : false;

            var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
            template += '<button type="button" class="btn btn-warning type" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
            template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\'  }" style="" >';


            if (groups) {
                template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                template += '<li ng-repeat-end role="presentation">';
            } else {
                template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter" style="margin:0px;"> ';
            }

            template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

            if (checkboxes) {
                template += '<div><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            } else {
                template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
            }

            template += '</li>';

            template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
            template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

            template += '</ul>';
            template += '</div>';

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            var $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onSelectAll: angular.noop,
                onDeselectAll: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            $scope.settings = {
                dynamicTitle: true,
                scrollable: false,
                scrollableHeight: '300px',
                closeOnBlur: true,
                displayProp: 'type',
                idProp: '_id',
                externalIdProp: 'id',
                enableSearch: false,
                selectionLimit: 0,
                showCheckAll: true,
                showUncheckAll: true,
                closeOnSelect: false,
                buttonClasses: 'btn btn-default',
                closeOnDeselect: false,
                groupBy: $attrs.groupBy || undefined,
                groupByTextProvider: null,
                smartButtonMaxItems: 0,
                smartButtonTextConverter: angular.noop
            };

            $scope.texts = {
                selectionCount: 'checked',
                selectionOf: '/',
                buttonDefaultText: 'Select',
                dynamicButtonTextSuffix: 'Car Selected'
            };

            $scope.searchFilter = $scope.searchFilter || '';

            if (angular.isDefined($scope.settings.groupBy)) {
                $scope.$watch('options', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                    }
                });
            }

            angular.extend($scope.settings, $scope.extraSettings || []);
            angular.extend($scope.externalEvents, $scope.events || []);
            angular.extend($scope.texts, $scope.translationTexts);

            $scope.singleSelection = $scope.settings.selectionLimit === 1;

            function getFindObj(id) {
                var findObj = {};

                if ($scope.settings.externalIdProp === '') {
                    findObj[$scope.settings.idProp] = id;
                } else {
                    findObj[$scope.settings.externalIdProp] = id;
                }

                return findObj;
            }

            function clearObject(object) {
                for (var prop in object) {
                    delete object[prop];
                }
            }

            if ($scope.singleSelection) {
                if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                    clearObject($scope.selectedModel);
                }
            }

            if ($scope.settings.closeOnBlur) {
                $document.on('click', function (e) {
                    var target = e.target.parentElement;
                    var parentFound = false;

                    while (angular.isDefined(target) && target !== null && !parentFound) {
                        if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                            if (target === $dropdownTrigger) {
                                parentFound = true;
                            }
                        }
                        target = target.parentElement;
                    }

                    if (!parentFound) {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                    }
                });
            }

            $scope.getButtonText = function () {
           //     console.log($scope.selectedModel);
                if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                    if ($scope.settings.smartButtonMaxItems > 0) {
                        var itemsText = [];

                        angular.forEach($scope.options, function (optionItem) {
                            if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                itemsText.push(converterResponse ? converterResponse : displayText);
                            }
                        });

                        if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                            itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                            itemsText.push('...');
                        }

                        return itemsText.join(', ');
                    } else {
                        var totalSelected;

                        if ($scope.singleSelection) {
                            totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                        } else {
                            totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                        }

                        if (totalSelected === 0) {
                            return $scope.texts.buttonDefaultText;
                        } else {
                            return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                        }
                    }
                } else {
                    return $scope.texts.buttonDefaultText;
                }
            };

            $scope.getPropertyForObject = function (object, property) {
                if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                    return object[property];
                }

                return '';
            };



            $scope.setSelectedItem = function (id, dontRemove) {
                var findObj = getFindObj(id);
                var finalObj = null;

                if ($scope.settings.externalIdProp === '') {
                    finalObj = _.find($scope.options, findObj);
                } else {
                    finalObj = findObj;
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                    angular.extend($scope.selectedModel, finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                    if ($scope.settings.closeOnSelect) $scope.open = false;

                    return;
                }

                dontRemove = dontRemove || false;

                var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                if (!dontRemove && exists) {
                    $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                }
                if ($scope.settings.closeOnSelect) $scope.open = false;
            };

            $scope.isChecked = function (id) {
                if ($scope.singleSelection) {
                    return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                }

                return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
            };

            $scope.externalEvents.onInitDone();
        }
    };
}]);

