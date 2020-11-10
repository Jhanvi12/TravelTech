angular.module('TravelTechApp1', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ngSanitize',
    'ngToast',
    'ngTable',
    'app.admin.logout',
    'app.factory.interceptor',
    'app.admin.profile',
    'app.admin',
    'app.admin.login',
    'app.admin.forgot-password',
    'app.admin.reset-password',
    'app.admin.dashboard',
    'app.admin.employees',
    'app.admin.operator',
    'app.admin.customer',
    'app.admin.city',
    'app.admin.leftmenu',
    'app.admin.headermenu',
    'app.admin.profile',
    'app.admin.vehicle_category',
    'app.admin.driver',
    'app.admin.listdriver',
    'app.admin.vehicle',
    'app.admin.listvehicle',
    'app.admin.permission',
    'app.admin.document',
    'app.admin.openleads',
    'app.admin.preference',
    'app.core.directive.filemodel',
    'app.core.filters.date',
    'app.core.filters.ride',
    'app.core.filters.bid',
    'app.core.directive.chat',
    'app.core.filters.chat',
    'app.admin.upcomingride',
    'app.admin.completedride',
    'app.admin.canceledride',
    'app.admin.noshow',
    'app.admin.bid',
    'app.admin.review',
    'app.admin.notification',
    'app.admin.payment',
    'app.admin.coupon',
    'app.admin.default_vehicle',
    'app.admin.inventory',
    'app.admin.chat',
    'app.admin.emailtemplate',
    'ui.tinymce',
    'app.admin.corporate'
 


])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'ngToastProvider',
            function($stateProvider, $urlRouterProvider, $httpProvider, ngToastProvider) {
                // configuration for toast message displayer
                ngToastProvider.configure({
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    animation: 'slide',
                    className: 'danger',
                    timeout:2000,
                    dismissButton: true
                });
                $httpProvider.interceptors.push('Interceptor');

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

                $stateProvider

                        // login page for admin & employee
                        .state('admin', {
                            url: '/admin',
                            templateUrl: 'js/admin/index.html',
                            controller: 'AdminController'
                        })

                        // login page for admin & employee
                        .state('admin.login', {
                            url: '/login',
                            templateUrl: 'js/admin/login/views/index.html',
                            controller: 'AdminLoginController'
                        })

                        // logout user
                        .state('admin.logout', {
                            url: '/logout',
                            templateUrl: 'js/admin/logout/views/index.html',
                            params: {state: null, last_state: null},
                            controller: 'LogoutController'
                        })

                        // Forgot Password page for admin & employee
                        .state('admin.forgot-password', {
                            url: '/forgot-password',
                            templateUrl: 'js/admin/forgot-password/views/index.html',
                            controller: 'AdminForgotPasswordController'
                        })

                        // Reset Password page for admin & employee
                        .state('admin.reset-password', {
                            url: '/reset-password',
                            templateUrl: 'js/admin/reset-password/views/index.html',
                            controller: 'AdminResetPasswordController'
                        })

                        // dashboard page for admin & employee
                        .state('admin.dashboard', {
                            url: '/dashboard',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/dashboard/views/index.html',
                                    controller: 'AdminDashboardController'
                                },
                                'top@admin.dashboard': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.dashboard': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // profile page for admin & employee
                        .state('admin.profile', {
                            url: '/profile',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/profile/views/index.html',
                                    controller: 'AdminProfileController'
                                },
                                'top@admin.profile': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.profile': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // profile page for admin & employee
                        .state('admin.chat', {
                            url: '/chat/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/chat/views/index.html',
                                    controller: 'EmployeeController'
                                },
                                'top@admin.chat': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.chat': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list employees
                        .state('admin.employee', {
                            url: '/employees',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/employees/views/index.html',
                                    controller: 'EmployeeController'
                                },
                                'top@admin.employee': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.employee': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new employee
                        .state('admin.addemployee', {
                            url: '/addemployee',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/employees/views/addeditemployee.html',
                                    controller: 'EmployeeController'
                                },
                                'top@admin.addemployee': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addemployee': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit employee
                        .state('admin.editemployee', {
                            url: '/editemployee/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/employees/views/addeditemployee.html',
                                    controller: 'EmployeeController'
                                },
                                'top@admin.editemployee': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editemployee': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list operators
                        .state('admin.operator', {
                            url: '/operators',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/operator/views/index.html',
                                    controller: 'OperatorController'
                                },
                                'top@admin.operator': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.operator': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new operator
                        .state('admin.addoperator', {
                            url: '/addoperator',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/operator/views/addeditoperator.html',
                                    controller: 'OperatorController'
                                },
                                'top@admin.addoperator': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addoperator': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit operator
                        .state('admin.editoperator', {
                            url: '/editoperator/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/operator/views/addeditoperator.html',
                                    controller: 'OperatorController'
                                },
                                'top@admin.editoperator': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editoperator': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        }).

                        state('admin.operatordetails', {
                            url: '/operatordetails/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/noshow/views/operatordetails.html',
                                    controller: 'OperatorController'
                                },
                                'top@admin.operatordetails': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.operatordetails': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list customers
                        .state('admin.customer', {
                            url: '/customers',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/customer/views/index.html',
                                    controller: 'CustomerController'
                                },
                                'top@admin.customer': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.customer': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new customer
                        .state('admin.addcustomer', {
                            url: '/addcustomer',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/customer/views/addeditcustomer.html',
                                    controller: 'CustomerController'
                                },
                                'top@admin.addcustomer': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addcustomer': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit customer
                        .state('admin.editcustomer', {
                            url: '/editcustomer/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/customer/views/addeditcustomer.html',
                                    controller: 'CustomerController'
                                },
                                'top@admin.editcustomer': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editcustomer': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list cities
                        .state('admin.city', {
                            url: '/cities',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/city/views/index.html',
                                    controller: 'CityController'
                                },
                                'top@admin.city': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.city': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new city
                        .state('admin.addcity', {
                            url: '/addcity',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/city/views/addcity.html',
                                    controller: 'CityController'
                                },
                                'top@admin.addcity': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addcity': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit city
                        .state('admin.editcity', {
                            url: '/editcity/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/city/views/addcity.html',
                                    controller: 'CityController'
                                },
                                'top@admin.editcity': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editcity': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list categories
                        .state('admin.vehicle_category', {
                            url: '/vehicle_categories',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle_category/views/index.html',
                                    controller: 'Vehicle_categoryController'
                                },
                                'top@admin.vehicle_category': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.vehicle_category': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new category
                        .state('admin.addvehicle_category', {
                            url: '/addvehicle_category',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle_category/views/addvehicle_category.html',
                                    controller: 'Vehicle_categoryController'
                                },
                                'top@admin.addvehicle_category': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addvehicle_category': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit category
                        .state('admin.editvehicle_category', {
                            url: '/editvehicle_category/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle_category/views/addvehicle_category.html',
                                    controller: 'Vehicle_categoryController'
                                },
                                'top@admin.editvehicle_category': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editvehicle_category': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list default vehicles
                        .state('admin.default_vehicle', {
                            url: '/default_vehicles',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/default_vehicle/views/index.html',
                                    controller: 'DefaultVehiclesController'
                                },
                                'top@admin.default_vehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.default_vehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new default vehicle
                        .state('admin.adddefault_vehicle', {
                            url: '/adddefault_vehicle',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/default_vehicle/views/adddefault_vehicle.html',
                                    controller: 'DefaultVehiclesController'
                                },
                                'top@admin.adddefault_vehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.adddefault_vehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit default vehicle
                        .state('admin.editdefault_vehicle', {
                            url: '/editdefault_vehicle/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/default_vehicle/views/adddefault_vehicle.html',
                                    controller: 'DefaultVehiclesController'
                                },
                                'top@admin.editdefault_vehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editdefault_vehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list inventories
                        .state('admin.inventory', {
                            url: '/inventories',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/inventory/views/index.html',
                                    controller: 'InventoriesController'
                                },
                                'top@admin.inventory': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.inventory': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        .state('admin.addinventory', {
                            url: '/addinventory',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/inventory/views/addinventory.html',
                                    controller: 'InventoriesController'
                                },
                                'top@admin.inventory': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.inventory': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list all drivers
                        .state('admin.listdriver', {
                            url: '/drivers',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/driver/views/all.html',
                                    controller: 'AllDriverController'
                                },
                                'top@admin.listdriver': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.listdriver': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit driver
                        .state('admin.editalldriver', {
                            url: '/editalldriver/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/driver/views/addeditalldriver.html',
                                    controller: 'AllDriverController'
                                },
                                'top@admin.editalldriver': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editalldriver': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list drivers
                        .state('admin.driver', {
                            url: '/drivers/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/driver/views/index.html',
                                    controller: 'DriverController'
                                },
                                'top@admin.driver': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.driver': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new driver
                        .state('admin.adddriver', {
                            url: '/adddriver/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/driver/views/addeditdriver.html',
                                    controller: 'DriverController'
                                },
                                'top@admin.adddriver': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.adddriver': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit driver
                        .state('admin.editdriver', {
                            url: '/editdriver/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/driver/views/addeditdriver.html',
                                    controller: 'DriverController'
                                },
                                'top@admin.editdriver': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editdriver': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list all vehicles
                        .state('admin.listvehicle', {
                            url: '/vehicles',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle/views/all.html',
                                    controller: 'AllVehicleController'
                                },
                                'top@admin.listvehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.listvehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit vehicle
                        .state('admin.editallvehicle', {
                            url: '/editallvehicle/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle/views/addeditallvehicle.html',
                                    controller: 'AllVehicleController'
                                },
                                'top@admin.editallvehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editallvehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list vehicles
                        .state('admin.vehicle', {
                            url: '/vehicles/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle/views/index.html',
                                    controller: 'VehicleController'
                                },
                                'top@admin.vehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.vehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })


                        // add new vehicle
                        .state('admin.addvehicle', {
                            url: '/addvehicle/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle/views/addeditvehicle.html',
                                    controller: 'VehicleController'
                                },
                                'top@admin.addvehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addvehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit vehicle
                        .state('admin.editvehicle', {
                            url: '/editvehicle/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/vehicle/views/addeditvehicle.html',
                                    controller: 'VehicleController'
                                },
                                'top@admin.editvehicle': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editvehicle': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list documents
                        .state('admin.document', {
                            url: '/documents/:type?id',
                            params: {uid: null},
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/document/views/index.html',
                                    controller: 'DocumentController'
                                },
                                'top@admin.document': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.document': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new document
                        .state('admin.adddocument', {
                            url: '/adddocument/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/document/views/addeditdocument.html',
                                    controller: 'DocumentController'
                                },
                                'top@admin.adddocument': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.adddocument': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list openleads
                        .state('admin.openlead', {
                            url: '/openleads',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/openleads/views/index.html',
                                    controller: 'OpenLeadsController'
                                },
                                'top@admin.openlead': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.openlead': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // view openleads
                        .state('admin.viewopenlead', {
                            url: '/viewopenlead/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/openleads/views/viewopenlead.html',
                                    controller: 'OpenLeadsController'
                                },
                                'top@admin.viewopenlead': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewopenlead': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list upcoming rides
                        .state('admin.upcomingride', {
                            url: '/upcomingrides',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/upcomingrides/views/index.html',
                                    controller: 'UpcomingRidesController'
                                },
                                'top@admin.upcomingride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.upcomingride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // view upcoming rides
                        .state('admin.viewupcomingride', {
                            url: '/viewupcomingride/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/upcomingrides/views/viewupcomingride.html',
                                    controller: 'UpcomingRidesController'
                                },
                                'top@admin.viewupcomingride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewupcomingride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list completed rides
                        .state('admin.completedride', {
                            url: '/completedrides',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/completedrides/views/index.html',
                                    controller: 'CompletedRidesController'
                                },
                                'top@admin.completedride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.completedride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // view completed rides
                        .state('admin.viewcompletedride', {
                            url: '/viewcompletedride/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/completedrides/views/viewcompletedride.html',
                                    controller: 'CompletedRidesController'
                                },
                                'top@admin.viewcompletedride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewcompletedride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list canceled rides
                        .state('admin.canceledride', {
                            url: '/canceledrides',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/canceledrides/views/index.html',
                                    controller: 'CanceledRidesController'
                                },
                                'top@admin.canceledride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.canceledride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // view canceled rides
                        .state('admin.viewcanceledride', {
                            url: '/viewcanceledride/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/canceledrides/views/viewcanceledride.html',
                                    controller: 'CanceledRidesController'
                                },
                                'top@admin.viewcanceledride': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewcanceledride': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                         // list noshow rides
                        .state('admin.noshow', {
                            url: '/noshow',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/noshow/views/index.html',
                                    controller: 'NoshowController'
                                },
                                'top@admin.noshow': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.noshow': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                         // list noshow rides
                        .state('admin.viewnoshow', {
                            url: '/noshow/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/noshow/views/viewnoshow.html',
                                    controller: 'NoshowController'
                                },
                                'top@admin.viewnoshow': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewnoshow': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })



                        // list bids
                        .state('admin.bid', {
                            url: '/bids',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/bids/views/index.html',
                                    controller: 'BidsController'
                                },
                                'top@admin.bid': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.bid': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list reviews
                        .state('admin.review', {
                            url: '/reviews',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/reviews/views/index.html',
                                    controller: 'ReviewsController'
                                },
                                'top@admin.review': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.review': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list notifications
                        .state('admin.notification', {
                            url: '/notifications',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/notifications/views/index.html',
                                    controller: 'NotificationsController'
                                },
                                'top@admin.notification': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.notification': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new notification
                        .state('admin.addnotification', {
                            url: '/addnotification',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/notifications/views/addnotification.html',
                                    controller: 'NotificationsController'
                                },
                                'top@admin.addnotification': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addnotification': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list payments
                        .state('admin.payment', {
                            url: '/payments',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/payments/views/index.html',
                                    controller: 'PaymentsController'
                                },
                                'top@admin.payment': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.payment': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new payment
                        .state('admin.addpayment', {
                            url: '/addpayment',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/payments/views/addpayment.html',
                                    controller: 'PaymentsController'
                                },
                                'top@admin.addpayment': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addpayment': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list coupons
                        .state('admin.coupon', {
                            url: '/coupons',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/coupons/views/index.html',
                                    controller: 'CouponsController'
                                },
                                'top@admin.coupon': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.coupon': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // add new coupon
                        .state('admin.addcoupon', {
                            url: '/addcoupon',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/coupons/views/addcoupon.html',
                                    controller: 'CouponsController'
                                },
                                'top@admin.addcoupon': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addcoupon': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })


                        //list modules
                        .state('admin.permission', {
                            url: '/permissions/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/permission/views/index.html',
                                    controller: 'PermissionController'
                                },
                                'top@admin.permission': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.permission': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // list preferences
                        .state('admin.preference', {
                            url: '/preferences',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/preference/views/index.html',
                                    controller: 'PreferenceController'
                                },
                                'top@admin.preference': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.preference': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit preferences
                        .state('admin.addpreference', {
                            url: '/addpreference',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/preference/views/editpreference.html',
                                    controller: 'PreferenceController'
                                },
                                'top@admin.addpreference': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addpreference': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // edit preferences
                        .state('admin.editpreference', {
                            url: '/editpreference',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/preference/views/editpreference.html',
                                    controller: 'PreferenceController'
                                },
                                'top@admin.editpreference': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.editpreference': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })

                        // email template
                       .state('admin.emailtemplate', {
                           url: '/emailtemplate',
                           views: {
                               '@': {
                                   templateUrl: 'js/admin/emailtemplate/views/index.html',
                                   controller: 'EmailTemplateController'
                               },
                               'top@admin.emailtemplate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                               'left@admin.emailtemplate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                           },
                       })

                       // email template
                      .state('admin.addmailtemplate', {
                          url: '/addemailtemplate',
                          views: {
                              '@': {
                                  templateUrl: 'js/admin/emailtemplate/views/addemailtemplate.html',
                                  controller: 'EmailTemplateController'
                              },
                              'top@admin.addmailtemplate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                              'left@admin.addmailtemplate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                          },
                      })
                      // email template
                     .state('admin.updateemailtemplate', {
                         url: '/updateemailtemplate/:id',
                         views: {
                             '@': {
                                 templateUrl: 'js/admin/emailtemplate/views/updateemailtemplate.html',
                                 controller: 'EmailTemplateController'
                             },
                             'top@admin.updateemailtemplate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                             'left@admin.updateemailtemplate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                         },
                     })
                        .state('admin.corporate', {
                            url: '/corporate',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/corporate/views/index.html',
                                    controller: 'CorporateController'
                                },
                                'top@admin.corporate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.corporate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })
                          .state('admin.corporateedit', {
                            url: '/corporateedit/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/corporate/views/corporateedit.html',
                                    controller: 'CorporateController'
                                },
                                'top@admin.corporateedit': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.corporateedit': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })
                           .state('admin.viewcorporate', {
                            url: '/viewcorporate/:id',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/corporate/views/viewcorporate.html',
                                    controller: 'CorporateController'
                                },
                                'top@admin.viewcorporate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.viewcorporate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })
                           .state('admin.addcorporate', {
                            url: '/addcorporate',
                            views: {
                                '@': {
                                    templateUrl: 'js/admin/corporate/views/addcorporate.html',
                                    controller: 'CorporateController'
                                },
                                'top@admin.addcorporate': {templateUrl: 'js/admin/headermenu/views/index.html', },
                                'left@admin.addcorporate': {templateUrl: 'js/admin/leftmenu/views/index.html', },
                            },
                        })
                       

                $urlRouterProvider.otherwise("/admin");
            }]);
