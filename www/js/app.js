// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('mainjap', ['ionic','ion-autocomplete', 'ngCordova', 'mainjap.controllers', 'mainjap.services']);

app.run(function ($ionicPlatform, $rootScope,$cordovaStatusbar) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true)
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.$on('$stateChangeStart', function (event, next) {
            $rootScope.token_Root = localStorage.getItem("token");
        });

        $rootScope.token_Root = localStorage.getItem("token");
    });
});


app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    });

    $stateProvider.state('app.logout', {
        cache : false,
        url: "/logout",
        views: {
            'menuContent': {
                templateUrl: "templates/login.html",
                controller: 'LogoutCtrl'
            }
        }
    });
    $stateProvider.state('app.home', {
        cache : false,
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    });


    $stateProvider.state('app.login', {
        cache : false,
        url: "/login",
        views: {
            'menuContent': {
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            }
        }
    });

    $stateProvider.state('app.forget_password', {
        url: "/forget_password",
        views: {
            'menuContent': {
                templateUrl: "templates/forget_password.html",
                controller: 'Forget_PasswordCtrl'
            }
        }
    });
    $stateProvider.state('app.register', {
        url: "/register",
        views: {
            'menuContent': {
                templateUrl: "templates/register.html",
                controller: 'RegisterCtrl'
            }
        }
    });
    $stateProvider.state('app.ticket', {
		cache : false,
        url: "/ticket",
        views: {
            'menuContent': {
                templateUrl: "templates/ticket.html",
                controller: 'TicketCtrl'
            }
        }
    });
    $stateProvider.state('app.ticketQRcode', {
	    cache : false,
        url: "/ticketQRcode",
        views: {
            'menuContent': {
                templateUrl: "templates/ticket-qrcode.html",
                controller: 'TicketQRcodeCtrl'
            }
        }
    });
    $stateProvider.state('app.contactus', {
        url: "/contactus",
        views: {
            'menuContent': {
                templateUrl: "templates/contact.html",
                controller: 'contactusCtrl'
            }
        }
    });
    $stateProvider.state('app.ticketApp', {
			cache : false,
        url: "/ticketApp",
        views: {
            'menuContent': {
                templateUrl: "templates/ticket-app-listcompany.html",
                controller: 'appListcompanyCtrl'
            }
        }
    });
    $stateProvider.state('app.ticketAppCompany', {
			cache : false,
        url: "/ticketAppCompany/:Id/:Name",
        views: {
            'menuContent': {
                templateUrl: "templates/ticket-app-listcompany-2.html",
                controller: 'ticketAppCompanyCtrl'
            }
        }
    });
	$stateProvider.state('app.ticketAppCompany2', {
			cache : false,
            url: "/ticketAppCompany2/:Id/:Name",
            views: {
                'menuContent': {
                    templateUrl: "templates/ticket-app-listcompany-2.html",
                    controller: 'ticketAppCompany2Ctrl'
                }
            }
     });
    $stateProvider.state('app.profile', {
        cache : false,
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "templates/profile.html",
                controller: 'ProfileCtrl'
            }
        }
    });
    $stateProvider.state('app.editProfile', {
        cache : false,
        url: "/editProfile",
        views: {
            'menuContent': {
                templateUrl: "templates/editprofile.html",
                controller: 'editProfileCtrl'
            }
        }
    });
    $stateProvider.state('app.history', {
        cache : false,
        url: "/history",
        views: {
            'menuContent': {
                templateUrl: "templates/history.html",
                controller: 'HistoryCtrl'
            }
        }
    });
    $stateProvider.state('app.AppShopping', {
			cache : false,
        url: "/AppShopping/:Id/:Name",
        views: {
            'menuContent': {
                templateUrl: "templates/shopping_cart.html",
                controller: 'AppShoppingCtrl'
            }
        }
    });
      $stateProvider.state('app.AppShopping2', {
		  	cache : false,
            url: "/AppShopping2/:Id/:Name",
            views: {
                'menuContent': {
                    templateUrl: "templates/shopping_cart_member.html",
                    controller: 'AppShoppingCtrl'
                }
            }
        });

    $stateProvider.state('app.AppShopping_Profile', {
		// cache : false,
        url: "/AppShopping_Profile/:Id",
        views: {
            'menuContent': {
                templateUrl: "templates/shopping_cart_profile.html",
                controller: 'AppShopping_ProfileCtrl'
            }
        }
    });

    $stateProvider.state('app.AppShopping_process', {
        cache : false,
        url: "/AppShopping_process/:Id",
        views: {
            'menuContent': {
                templateUrl: "templates/shopping_cart_process.html",
                controller: 'AppShopping_processCtrl'
            }
        }
    });
    $stateProvider.state('app.Payment', {
		cache : false,
        url: "/Payment/:Id",
        views: {
            'menuContent': {
                templateUrl: "templates/payment.html",
                controller: 'PaymentCtrl'
            }
        }
    });

    $stateProvider.state('app.Delivery', {
		// cache : false,
        url: "/Delivery/:Id",
        views: {
            'menuContent': {
                templateUrl: "templates/delivery.html",
                controller: 'DeliveryCtrl'
            }
        }
    });
    $stateProvider.state('app.Success', {
		cache : false,
        url: "/Success/:serial",
        views: {
            'menuContent': {
                templateUrl: "templates/success.html",
                controller: 'SuccessCtrl'
            }
        }
    });

    $stateProvider.state('app.Historyview', {
        cache : false,
        url: "/Historyview/:phone/:passport",
        views: {
            'menuContent': {
                templateUrl: "templates/historyview.html",
                controller: 'HistoryviewCtrl'
            }
        }
    });

    $stateProvider.state('app.Paymentcard', {
        url: "/Paymentcard/:serial",
        views: {
            'menuContent': {
                templateUrl: "templates/paymentcard.html",
                controller: 'PaymentcardCtrl'
            }
        }
    });
    $stateProvider.state('app.test', {
            url: "/test",
            views: {
                'menuContent': {
                    templateUrl: "templates/test.html",
                    controller: 'TestCtrl'

                }
            }
    });
    $stateProvider.state('app.customers', {
        cache : false,
        url: "/customers",
        views: {
            'menuContent': {
                templateUrl: "templates/customers.html",
                controller: 'CustomerstCtrl'

            }
        }
    });
    $stateProvider.state('app.province', {
        cache : false,
        url: "/province",
        views: {
            'menuContent': {
                templateUrl: "templates/province.html",
                controller: 'ProvinceCtrl'

            }
        }
    });
    $stateProvider.state('app.postcode', {
        cache : false,
        url: "/postcode",
        views: {
            'menuContent': {
                templateUrl: "templates/postcode.html",
                controller: 'PostCodeCtrl'

            }
        }
    });
    $stateProvider.state('app.address', {
        cache : false,
        url: "/address",
        views: {
            'menuContent': {
                templateUrl: "templates/address.html",
                controller: 'AddressCtrl'
            }
        }
    });
    $stateProvider.state('app.changepassword', {
        cache : false,
        url: "/changepassword",
        views: {
            'menuContent': {
                templateUrl: "templates/changepassword.html",
                controller: 'ChangePasswordCtrl'
            }
        }
    });
    $stateProvider.state('app.ticketview', {
        url: "/ticketview",
        views: {
            'menuContent': {
                //templateUrl: "templates/viewticket.html",
                controller: 'viewticketCtrl'
            }
        }
    });
    $stateProvider.state('app.viewqrcode', {
        cache : false,
        url: "/viewqrcode",
        views: {
            'menuContent': {
                //templateUrl: "templates/viewticket.html",
                controller: 'ViewQRcodeCtrl'

            }
        }
    });


    $urlRouterProvider.otherwise('/app/home');

});
