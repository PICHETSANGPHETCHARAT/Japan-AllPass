var app = angular.module('mainjap.services', []);
app.factory('ItemsService', function () {
    return {
        listToken: function () {
            return  localStorage.getItem("token");
        }
    };
});
app.factory('updateProfileData', function () {
    var updateProfileData = null;
    return {
        getupdateProfileData: function () {
            return updateProfileData;
        },
        setupdateProfileData: function (data) {
            updateProfileData = data;
        }
    };
});
app.factory('ItemsArrCompanyService', function () {
    var corredoresCompany = [];
    return {
        getCompanyCorredores: function () {
            return corredoresCompany;
        },
        setCompanyCorredores: function (data) {
            corredoresCompany = data;
        }
    };
});
app.factory('ItemsArrService', function () {
    var corredores = [];
    return {
        getCorredores: function () {
            return corredores;
        },
        setCorredores: function (data) {
            corredores = data;
        }
    };
});
app.factory('cartDataService', function () {
    var cartDataService = {};
    var userDataService = {};
    return {
        getCartDataService: function () {
            return cartDataService;
        },
        setCartDataService: function (data) {
            cartDataService = data;
        },
        getuserCartDataService: function () {
            return userDataService;
        },
        setuserCartDataService: function (data) {
            userDataService = data;
        }
    };
});
app.factory('AddressDataService', function () {
    var address = null;
    var province = null;
    var postcode = null;
    return {
        getAddress: function () {
            return address;
        },
        getprovince: function () {
            return province;
        },
        getpostcode: function () {
            return postcode;
        },
        setCartDataService: function (addressdata,provincedata,postcodedata) {
            address = addressdata;
            province =provincedata;
            postcode = postcodedata;
        }
    };
});

app.factory('MemberDataService', function () {
    var MemberDataService = null;
    return {
        getMemberDataService: function () {
            return MemberDataService;
        },
        setMemberDataService: function (data) {
            MemberDataService = data;
        }
    };
});


app.factory('PostCodeDataService', function () {
    var PostCodeDataService = null;
    return {
        getProvinceDataService: function () {
            return PostCodeDataService;
        },
        setProvinceDataService: function (data) {
            PostCodeDataService = data;
        }
    };
});
app.factory('ProvinceDataService', function () {
    var ProvinceDataService = null;
    return {
        getProvinceDataService: function () {
            return ProvinceDataService;
        },
        setProvinceDataService: function (data) {
            ProvinceDataService = data;
        }
    };
});
app.factory('ItemsYOUService', function () {
    var corredoresCompany1 = [];
    return {
        getCompanyCorredores1: function () {
            return corredoresCompany1;
        },
        setCompanyCorredores1: function (data) {
            corredoresCompany1 = data;
        }
    };
});
app.factory('ItemsYOU2Service', function () {
    var corredoresCompany2 = [];
    return {
        getCompanyCorredores2: function () {
            return corredoresCompany2;
        },
        setCompanyCorredores2: function (data) {
            corredoresCompany2 = data;
        }
    };
});

app.factory('ItemsDiscountService', function () {
    var Discount = [];
    return {
        getDiscount: function () {
            return Discount;
        },
        setDiscount: function (data) {
            Discount = data;
        }
    };
});
app.factory('ItemsDeliveryProfile', function () {
    var Profile = [];
    Profile.account_user_postcode = "";
    Profile.account_user_province = "";
    Profile.account_user_address = "";
    return {
        getProfile: function () {
            return Profile;
        },
        setProfile: function (data) {
            Profile = data;
        },
        resetProfile: function () {
            var Profile = [];
            Profile.account_user_postcode = "";
            Profile.account_user_province = "";
            Profile.account_user_address = "";
        }
    };
});
app.factory('ItemsProfileService', function () {
    var Profile = [];
    return {
        getProfile: function () {
            return Profile;
        },
        setProfile: function (data) {
            Profile = data;
        }
    };
});
app.factory('ItemsDelivery', function () {
    var Delivery = [];
    return {
        getDelivery: function () {
            return Delivery;
        },
        setDelivery: function (data) {
            Delivery = data;
        }
    };
});
//app.factory('tokenSerial', function () {
//    var Serial = [];
//    return {
//        getSerial: function () {
//            return Serial;
//        },
//        setSerial: function (data) {
//            Serial = data;
//        }
//    };
//});

app.factory('userService', function ($http) {
    return {
        getUsers: function (longurl) {
            $http({method: "GET", url: "http://tinyurl.com/api-create.php", params: {url: longurl}})
                    .success(function (result) {
                        return result;// alert(result);
                    })
                    .error(function (error) {

                            $ionicLoading.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'NO Internet Connetion'
                            });

                        console.log("ERROR: " + error);
                    });

//    			return $http.get('http://tinyurl.com/api-create.php?url='+longurl).then(function(response){
//    				return response.data.results;
//    			});
        }
    }
});

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, ' ');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


app.directive('select', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.bind('focus', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("show bar (hide = false)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                }
            });
            element.bind('blur', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("hide bar (hide = true)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
            });
        }
    };
});

app.directive('textarea', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.bind('focus', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("show bar (hide = false)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                }
            });
            element.bind('blur', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("hide bar (hide = true)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
            });
        }
    };
});

app.directive('input', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.bind('focus', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("show bar (hide = false)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
            });
            element.bind('blur', function(e) {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // console.log("hide bar (hide = true)");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.closeKeyboard()

                }
            });
        }
    };
});
app.factory('SearchService', function($q, $timeout) {
      var airline = [];
    var searchAirlines = function(searchFilter,airlinesServer,type) {
        airline = airlinesServer;
        console.log('Searching airlines for ' + searchFilter);
        var deferred = $q.defer();
        var matches = airline.filter(function(airline) {
            if(type == "PoNumber"){
                if (airline.buy_ticket_serial.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
            } else if(type == "E-Mail"){
                if (airline.buy_ticket_email.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
            } else if(type == "Passport"){
                if (airline.buy_ticket_passport.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
            } else if(type == "Line ID"){
                if (airline.buy_ticket_line.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
            } else if(type == "Phone"){
                if (airline.buy_ticket_phone.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
            }

        });

        $timeout(function() {

            deferred.resolve(matches);

        }, 100);
        return deferred.promise;
    };

    return {

        searchAirlines: searchAirlines

    }
});
app.factory('PostCodeService',function($http) {

    return {
        getMember: function (textSearch) {
            return $http.post('https://qms.japanallpass.com/mobile/member/ListPostcode_TODO', {keyword : textSearch},{timeout : 15000})
        },

    };

});
app.factory('ProvinceService',function($http) {
    return {
        getMember: function (textSearch) {
            return $http.post('https://qms.japanallpass.com/mobile/member/ListProvince_TODO', {keyword : textSearch},{timeout : 15000})
        },

    };

});

app.factory('Member', function ($http) {
        return {
            getMember: function (textSearch,type) {
                return $http.post('https://qms.japanallpass.com/mobile/member/ListMember_TODOS', {keyword : textSearch,type : type},{timeout : 15000})
            },

        };
});
app.factory('Address', function ($http) {
    return {
        getMember: function (textSearch) {

            return $http.post('https://qms.japanallpass.com/mobile/member/ListAddress_TODO', {keyword : textSearch},{timeout : 15000})
        },

    };
});

app.factory('AddressService', function($q, $timeout) {
    var airline = [];
    var searchAirlines = function(searchFilter,airlinesServer) {
        airline = airlinesServer;
        console.log('Searching airlines for ' + searchFilter);
        var deferred = $q.defer();
        var matches = airline.filter(function(airline) {
             if (airline.buy_ticket_delivery_address.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
        });
        $timeout(function() {

            deferred.resolve(matches);

        }, 100);
        return deferred.promise;
    };

    return {
        searchAirlines: searchAirlines

    }
});


