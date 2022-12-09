var app = angular.module('mainjap.controllers', ['mainjap.services']);
app.controller('SuccessCtrl', function ($location,$ionicHistory,ItemsYOU2Service,ItemsYOUService,cartDataService,ItemsProfileService,$scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService) {
    //$scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    $scope.serial = $stateParams.serial;
    $scope.checktoken = function () {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $scope.arrTicketPush = [];
        ItemsArrService.setCorredores($scope.arrTicketPush);
        ItemsProfileService.setProfile([]);
        cartDataService.setuserCartDataService({});
        cartDataService.setCartDataService({});
        ItemsYOUService.setCompanyCorredores1([]);
        ItemsYOU2Service.setCompanyCorredores2([]);
        // $state.go('app.home', {}, {reload: true});
        $location.path("/app/home");
    };

});

app.controller('ChangePasswordCtrl', function ($scope, $state, $ionicPopup, $http, $ionicLoading,$ionicNavBarDelegate) {
    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    $scope.newpass  = {};
    // $scope.newpass.current_password = "";
    // $scope.newpass.confirm_password = "";
    // $scope.newpass.new_password = "";

    var token = localStorage.getItem("token");
    $ionicLoading.show({
        template: 'Loading...'
    });
    $ionicLoading.hide();


    $scope.sentData = function () {

        if($scope.newpass.current_password != null && $scope.newpass.current_password != '' && $scope.newpass.current_password != undefined){
            if($scope.newpass.new_password != '' && $scope.newpass.new_password != undefined){
                if($scope.newpass.new_password == $scope.newpass.confirm_password) {

                    $http.post("https://qms.japanallpass.com/mobile/Register/EditPassword", {
                        API_ID: "ccc",
                        password: $scope.newpass.new_password,
                        oldpassword: $scope.newpass.current_password,
                        id: token
                    },{timeout : 15000}).then(function (res) {
                        if(res.data.status == 2){
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'รหัสผ่านเก่าไม่ถูกต้อง.'
                            });
                            $ionicLoading.hide();

                        } else {
                            $ionicLoading.hide();
                            // location.reload(true);
                            $ionicNavBarDelegate.back();
                            // $state.go('app.profile');
                        }

                    },function (e) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'NO Internet Connetion'
                        });
                    });
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'รหัสผ่านไม่ตรงกัน.'
                    });
                }

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'กรุณากรอกรหัสผ่านใหม่.'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'กรุณากรอกรหัสผ่านเก่า.'
            });
        }
    };


    // $scope.data = {};
    // if($scope.data.current_password != ""){
    //     if($scope.data.new_password == $scope.data.confirm_password) {
    //
    //         $http.post("https://qms.japanallpass.com/mobile/Register/EditPassword", {
    //             API_ID: "",
    //             password: $scope.data.new_password,
    //             id: token
    //         }).then(function (res) {
    //             $ionicLoading.hide();
    //             location.reload(true);
    //             $state.go('app.profile');
    //         });
    //     } else {}
    //
    //
    // } else {
    //     var alertPopup = $ionicPopup.alert({
    //         title: 'Notifications',
    //         template: 'This mail is no longer available.'
    //     });
    // }


});

app.controller('mainjap', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService) {

    $scope.cartData = {};

});

app.controller('ProvinceCtrl', function ($scope,ProvinceDataService,$ionicNavBarDelegate ,$http, $timeout, $ionicModal, $ionicPopup, $state, ProvinceService,$stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork,Member) {
    $scope.ListProvinceArr = {};
    $scope.dataProvince = {
        "airlines": [],
        "search": ''
    };

    $scope.provinceSelect = "";
    $scope.search= "";
    $scope.noneValue = false;
    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.dataProvince.search);
        // AddressService.searchAirlines($scope.address.search,$scope.address.airlinesServer).then(
        //     function(matches) {
        //         $scope.ListAddressArr = matches;
        //     }
        // )
        if($scope.dataProvince.search.length > 2){
            ProvinceService.getMember($scope.dataProvince.search).then(function (response) {
                // $scope.typeSearchss = response;
                var arrItem = [];
                $scope.ListProvince = response.data;
                $scope.ListProvinceArr = response.data;
                console.log(JSON.stringify(response.data));
                if($scope.ListProvince.length == 0){
                    $scope.noneValue = true;
                } else {
                    $scope.noneValue = false;
                }
                for (var i = 0; i < $scope.ListProvince.length; i++) {
                    // $scope.typeSearchss += $scope.Listmember[i].buy_ticket_gender;
                    arrItem.push({
                        'province_name': $scope.ListProvince[i].province_name
                    });
                }
                $scope.ListProvinceArr = arrItem;
                $ionicLoading.hide();
                $scope.$apply();

            },function (e) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'NO Internet Connetion'
                });
            });

        }
    };


    $scope.radioClick = function (province) {
        $scope.provinceSelect = province;
        ProvinceDataService.setProvinceDataService($scope.provinceSelect);
        $ionicNavBarDelegate.back();

    };

    $scope.selectcheck = function () {

        $ionicNavBarDelegate.back();

    }
});
app.controller('PostCodeCtrl', function ($scope,PostCodeDataService,$ionicNavBarDelegate ,$http, $timeout, $ionicModal, $ionicPopup, $state, PostCodeService,$stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork,Member) {
    $scope.ListProvinceArr = {};
    $scope.dataProvince = {
        "airlines": [],
        "search": ''
    };

    $scope.provinceSelect = "";
    $scope.search= "";
    $scope.noneValue = false;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $ionicLoading.hide();

    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.dataProvince.search);
        // AddressService.searchAirlines($scope.address.search,$scope.address.airlinesServer).then(
        //     function(matches) {
        //         $scope.ListAddressArr = matches;
        //     }
        // )
        if($scope.dataProvince.search.length > 2){
            PostCodeService.getMember($scope.dataProvince.search).then(function (response) {
                // $scope.typeSearchss = response;
                var arrItem = [];
                $scope.ListProvince = response.data;
                $scope.ListProvinceArr = response.data;
                console.log(JSON.stringify(response.data));
                if($scope.ListProvince.length == 0){
                    $scope.noneValue = true;
                } else {
                    $scope.noneValue = false;
                }
                for (var i = 0; i < $scope.ListProvince.length; i++) {
                    // $scope.typeSearchss += $scope.Listmember[i].buy_ticket_gender;
                    arrItem.push({
                        'AMPHUR_NAME': $scope.ListProvince[i].AMPHUR_NAME,
                        'POSTCODE': $scope.ListProvince[i].POSTCODE,
                    });
                }
                $scope.ListProvinceArr = arrItem;
                $ionicLoading.hide();
                $scope.$apply();
            },function (e) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'NO Internet Connetion'
                });
            });

        }
    };
    $scope.radioClick = function (province) {
        $scope.provinceSelect = province;
        PostCodeDataService.setProvinceDataService($scope.provinceSelect);
        $ionicNavBarDelegate.back();

    };
    $scope.selectcheck = function () {

        $ionicNavBarDelegate.back();

    }

});

app.controller('AddressCtrl', function ($scope,AddressService,AddressDataService,$ionicNavBarDelegate ,$http, $timeout, $ionicModal, $ionicPopup, $state,$stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork,Address) {
    $scope.ListAddressArr = {};

    $scope.address = {
        "airlinesServer": [],
        "airlines": [],
        "search": ''
    };
    $scope.search= "";
    $scope.noneValue = false;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $ionicLoading.hide();


    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.address.search+JSON.stringify($scope.address.airlinesServer));
        // AddressService.searchAirlines($scope.address.search,$scope.address.airlinesServer).then(
        //     function(matches) {
        //         $scope.ListAddressArr = matches;
        //     }
        // )
        if($scope.address.search.length > 2){
            Address.getMember($scope.address.search).then(function (response) {
                // $scope.typeSearchss = response;
                var arrItem = [];
                $scope.ListAddress = response.data;
                $scope.ListAddressArr = response.data;
                if($scope.ListAddress.length == 0){
                    $scope.noneValue = true;
                } else {
                    $scope.noneValue = false;
                }
                $scope.address.airlinesServer   = response.data;
                for (var i = 0; i < $scope.ListAddress.length; i++) {
                    // $scope.typeSearchss += $scope.Listmember[i].buy_ticket_gender;
                    arrItem.push({
                        'buy_ticket_delivery_address': $scope.ListAddress[i].buy_ticket_delivery_address,
                        'buy_ticket_delivery_provincy': $scope.ListAddress[i].buy_ticket_delivery_provincy,
                        'buy_ticket_delivery_postcode': $scope.ListAddress[i].buy_ticket_delivery_postcode,
                    });
                }
                $scope.ListAddressArr = arrItem;
                $ionicLoading.hide();
                $scope.$apply();
            },function (e) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'NO Internet Connetion'
                });
            });

        }
    };
    $scope.radioClick = function (buy_ticket_delivery_address,
                                  buy_ticket_delivery_provincy,
                                  buy_ticket_delivery_postcode
    ) {
        AddressDataService.setCartDataService(buy_ticket_delivery_address,buy_ticket_delivery_provincy,buy_ticket_delivery_postcode);
        $ionicNavBarDelegate.back();

    };


    $scope.selectcheck = function () {

        $ionicNavBarDelegate.back();

    }

});


app.controller('CustomerstCtrl', function (MemberDataService,$scope,cartDataService,$ionicNavBarDelegate ,$http, $timeout, $ionicModal, $ionicPopup, $state, SearchService,$stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork,Member) {
    $scope.ListmemberArr = {};

    $scope.data = {
        "airlinesServer": [],
        "airlines": [],
        "search": '',
        "typeSearch":'2'
    };
    $scope.search= "";
    $ionicLoading.show({
        template: 'Loading...'
    });
    $ionicLoading.hide();

    $scope.update =function () {
        $scope.data.search = "";
        // alert($scope.data.typeSearch)
    };
    // $scope.$watch('selection', function(newVal, oldVal){
    //     switch(newVal){
    //         case 'first choice':
    //             [do Some Stuff]
    //             break;
    //         case 'second choice':
    //             [do Some Stuff]
    //             break;
    //         default:
    //             [well, do some stuff]
    //             break;
    //     }
    // }
    // Member.getMember($scope.search,$scope.type).then(function (response) {
    //     // $scope.typeSearchss = response;
    //
    //     var arrItem = [];
    //     $scope.Listmember = response.data;
    //     $scope.ListmemberArr = response.data;
    //     $scope.data.airlinesServer   = response.data;
    //     localStorage.setItem("customer", response.data);
    //     for (var i = 0; i < $scope.Listmember.length; i++) {
    //         // $scope.typeSearchss += $scope.Listmember[i].buy_ticket_gender;
    //         arrItem.push({
    //             'buy_ticket_serial': $scope.Listmember[i].buy_ticket_serial,
    //             'buy_ticket_gender': $scope.Listmember[i].buy_ticket_gender,
    //             'buy_ticket_namef': $scope.Listmember[i].buy_ticket_namef,
    //             'buy_ticket_namel': $scope.Listmember[i].buy_ticket_namel,
    //             'buy_ticket_phone':$scope.Listmember[i].buy_ticket_phone,
    //             'buy_ticket_email': $scope.Listmember[i].buy_ticket_email,
    //             'buy_ticket_passport': $scope.Listmember[i].buy_ticket_passport,
    //             'buy_ticket_line': $scope.Listmember[i].buy_ticket_line,
    //             'buy_ticket_adds': $scope.Listmember[i].buy_ticket_adds,
    //         });
    //     }
    //     $scope.ListmemberArr = arrItem;
    //     $ionicLoading.hide();
    //     $scope.apply;
    // },function (e) {
    //     $ionicLoading.hide();
    //     var alertPopup = $ionicPopup.alert({
    //         title: 'Notifications',
    //         template: 'NO Internet Connetion'
    //     });
    // });
    // $scope.Valueselect = function() {
    //     alert($scope.data.typeSearch);
    //
    // }
    $scope.noneValue = false;
    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.data.search+' type :'+$scope.data.typeSearch);
        // SearchService.searchAirlines($scope.data.search,$scope.data.airlinesServer,$scope.typeSearch).then(
        //     function(matches) {
        //         $scope.ListmemberArr = matches;
        //     }
        // )

        if($scope.data.search.length > 2){
            // $ionicLoading.show({
            //     template: 'Loading...'
            // });
            Member.getMember($scope.data.search,$scope.data.typeSearch).then(function (response) {
            // $scope.typeSearchss = response;
            var arrItem = [];
            $scope.Listmember = response.data;
            $scope.ListmemberArr = response.data;
            if($scope.ListAddress.length == 0){
                    $scope.noneValue = true;
            } else {
                    $scope.noneValue = false;
            }
            $scope.data.airlinesServer   = response.data;
            localStorage.setItem("customer", response.data);
            for (var i = 0; i < $scope.Listmember.length; i++) {
                // $scope.typeSearchss += $scope.Listmember[i].buy_ticket_gender;
                arrItem.push({
                    'buy_ticket_serial': $scope.Listmember[i].buy_ticket_serial,
                    'buy_ticket_gender': $scope.Listmember[i].buy_ticket_gender,
                    'buy_ticket_namef': $scope.Listmember[i].buy_ticket_namef,
                    'buy_ticket_namel': $scope.Listmember[i].buy_ticket_namel,
                    'buy_ticket_phone':$scope.Listmember[i].buy_ticket_phone,
                    'buy_ticket_email': $scope.Listmember[i].buy_ticket_email,
                    'buy_ticket_passport': $scope.Listmember[i].buy_ticket_passport,
                    'buy_ticket_line': $scope.Listmember[i].buy_ticket_line,
                    'buy_ticket_adds': $scope.Listmember[i].buy_ticket_adds,
                    'buy_ticket_postcode': $scope.Listmember[i].buy_ticket_postcode,
                    'buy_ticket_province': $scope.Listmember[i].buy_ticket_province,

                });
            }
            $scope.ListmemberArr = arrItem;
            // $ionicLoading.hide();
                $scope.$apply();
        },function (e) {
            // $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'NO Internet Connetion'
            });
        });
        }
    };
    $scope.radioClick = function (buy_ticket_gender,
                                  buy_ticket_namef,
                                  buy_ticket_namel,
                                  buy_ticket_phone,
                                  buy_ticket_email,
                                  buy_ticket_line,
                                  buy_ticket_adds,buy_ticket_province,buy_ticket_postcode) {

        // $scope.cartData= {};
        // $scope.cartData = cartDataService.getCartDataService();
        // $scope.cartData.selectSEX= [];
        // $scope.cartData.namef= [];
        // $scope.cartData.namel= [];
        // $scope.cartData.selectSEX[0] = buy_ticket_gender;
        // $scope.cartData.namef[0] = buy_ticket_namef;
        // $scope.cartData.namel[0] =  buy_ticket_namel;
        // $scope.cartData.phone = parseInt(buy_ticket_phone);
        // $scope.cartData.mail = buy_ticket_email;
        // $scope.cartData.line = buy_ticket_line;
        // $scope.cartData.address =  buy_ticket_adds;
        //

        $scope.member = {};
        $scope.member.selectSEX = buy_ticket_gender;
        $scope.member.namef= buy_ticket_namef;
        $scope.member.namel =  buy_ticket_namel;
        $scope.member.phone = buy_ticket_phone ;
        $scope.member.mail = buy_ticket_email;
        $scope.member.line = buy_ticket_line;
        $scope.member.address =  buy_ticket_adds;
        $scope.member.province =  buy_ticket_province;
        $scope.member.postcode =  buy_ticket_postcode;

        MemberDataService.setMemberDataService($scope.member);
        // cartDataService.setuserCartDataService($scope.usercartData)
        // cartDataService.setCartDataService($scope.cartData);
        $ionicNavBarDelegate.back();

    };


    $scope.selectcheck = function () {

        $ionicNavBarDelegate.back();

    }

});



app.controller('PaymentCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork) {
    //$scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    $scope.IdInput = $stateParams.Id;
    $scope.Profile = ItemsProfileService.getProfile();
    $scope.Delivery_to = ItemsDelivery.getDelivery();
    // alert($scope.Delivery_to[0].delivery);

    var token = localStorage.getItem("token");
    if(token  == undefined){
        token = 0;
    }
    $scope.$on("$ionicView.afterEnter", function() {
        $scope.IdInput = $stateParams.Id;
        $scope.Profile = ItemsProfileService.getProfile();
        $scope.Delivery_to = ItemsDelivery.getDelivery();
        var token = localStorage.getItem("token");
        if(token  == undefined){
            token = 0;
        }
    });
        $scope.itemTicket = function (data) {
        var net = $cordovaNetwork.getNetwork();

        if(net == 'none'){
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please connect to the Internet.'
            });
        }else{
            if (data) {
                // alert($scope.Delivery_to[0].delivery);
                $scope.Delivery_to.splice(0,0,{'delivery': $scope.Delivery_to[0].delivery, 'address':  $scope.Delivery_to[0].address, 'province':  $scope.Delivery_to[0].province,'postcode':  $scope.Delivery_to[0].postcode,'status_pay': data});
//            $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': $scope.Profile[0].delivery, 'address': $scope.Profile[0].address, 'postcode': $scope.Profile[0].postcode, 'status_pay': data});
//            ItemsProfileService.setProfile($scope.Profile);
                ItemsDelivery.setDelivery($scope.Delivery_to);

//            $scope.Profile = ItemsProfileService.getProfile();
                $scope.Delivery_to = ItemsDelivery.getDelivery();
                var ArrData = ItemsArrService.getCorredores();
                var ArrDataDiscount = ItemsDiscountService.getDiscount();
                $ionicLoading.show({
                    template: 'Loading...'
                });
                //,{timeout : 15000}
                $http.post("https://qms.japanallpass.com/mobile/MainApp/AddDataMember_V3", {API_ID: "KEYADD", profile: $scope.Profile, ticket: ArrData, discount: ArrDataDiscount,tokeninput:token,delivery: $scope.Delivery_to}).then(function (res) {
                    $ionicLoading.hide();
                    var boolData = JSON.stringify(res.data);
                    if(data == 2){
                        $state.go('app.Paymentcard', {'serial':boolData}, {reload: true});
                    }else{
                        $state.go('app.Success', {'serial':boolData}, {reload: true});
                    }

                },function (e) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'NO Internet Connetion'
                    });
                });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please complete your information.'
                });
            }
        }

    };


});
app.controller('DeliveryCtrl', function (ItemsDeliveryProfile,$scope,AddressDataService,PostCodeDataService,ProvinceDataService, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery) {

    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    // alert($scope.tokenData);
    $scope.deliveryData = {};
    $scope.IdInput = $stateParams.Id;
    $scope.Profile = ItemsProfileService.getProfile();
    $scope.Delivery_to = ItemsDelivery.getDelivery();
    $scope.deliveryData = ItemsDeliveryProfile.getProfile();

    // var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    // if($scope.tokenData != null && $scope.tokenData != '' && $scope.tokenData != undefined){
    //     $scope.deliveryData.account_user_address =$scope.deliveryDatas.account_user_address;
    //     $scope.deliveryData.account_user_postcode =$scope.deliveryDatas.account_user_postcode;
    //     $scope.deliveryData.account_user_province =$scope.deliveryDatas.account_user_province;
    // } else {
    //
    // }

    ItemsDeliveryProfile.setProfile($scope.deliveryData);

    $scope.$on("$ionicView.afterEnter", function(){
        $scope.IdInput = $stateParams.Id;
        $scope.Profile = ItemsProfileService.getProfile();
        $scope.Delivery_to = ItemsDelivery.getDelivery();
        $scope.deliveryData = ItemsDeliveryProfile.getProfile();

        if(AddressDataService.getAddress() != null){
            $scope.deliveryData.account_user_address = AddressDataService.getAddress();
        }
        if(AddressDataService.getprovince() != null){
            $scope.deliveryData.account_user_province = AddressDataService.getprovince();
        }
        if(AddressDataService.getpostcode() != null){
            $scope.deliveryData.account_user_postcode = parseInt(AddressDataService.getpostcode());
        }

        AddressDataService.setCartDataService(null,null,null);

        if(ProvinceDataService.getProvinceDataService() != null){
            $scope.deliveryData.account_user_province = ProvinceDataService.getProvinceDataService();
            ProvinceDataService.setProvinceDataService(null);
        }
        if(PostCodeDataService.getProvinceDataService() != null){
            $scope.deliveryData.account_user_postcode = PostCodeDataService.getProvinceDataService();
            PostCodeDataService.setProvinceDataService(null);
        }
        ItemsDeliveryProfile.setProfile($scope.deliveryData);

        $scope.$apply();
    });
    $scope.delivery = function (input) {

        if (input) {
            var inaa = input.account_user_address;

            if (input.account_user_address && input.account_user_address != "" && input.account_user_postcode && input.account_user_postcode != "" && input.account_user_province && input.account_user_province != "") {
                if(inaa && inaa.length < 10){


                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Please Address fill more than 10.'
                    });
                }else{
//                $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': $scope.Profile[0].delivery, 'address': input.account_user_address, 'postcode': input.account_user_postcode});
//                     alert($scope.Delivery_to[0].delivery);
                    $scope.Delivery_to.splice(0,0,{'delivery': $scope.Delivery_to[0].delivery, 'address': input.account_user_address,'province':input.account_user_province, 'postcode': input.account_user_postcode});
                    ItemsDelivery.setDelivery($scope.Delivery_to);
//               ItemsProfileService.setProfile($scope.Profile);
                    ItemsDeliveryProfile.resetProfile();

                    $state.go('app.Payment', {'Id': $scope.IdInput}, {reload: true});
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Inset Address,Province,Postcode .'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Inset Address,Province,Postcode .'
            });
        }

    };

    $scope.postcodeChanged = function() {
        var l = $scope.deliveryData.account_user_postcode;

        var EMAIL_REGEXP =  /^[0-9]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.deliveryData.account_user_postcode = l.substring(0, l.length - 1);

        }
    };

});
app.controller('AppShopping_processCtrl', function ($scope, $ionicScrollDelegate,$http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery) {
    //$scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    $scope.IdInput = $stateParams.Id;
    $scope.Profile = ItemsProfileService.getProfile();
    $scope.Delivery = [];
    ItemsDelivery.setDelivery($scope.Delivery);
    // $scope.Delivery = ItemsDelivery.getDelivery();

    $scope.Cashier = function () {
//        $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': 1, 'address': '', 'postcode': ''});
        $scope.Delivery = [];
        $scope.Delivery.push({'delivery': 1, 'address': '', 'postcode': '', 'province': ''});
        ItemsDelivery.setDelivery($scope.Delivery);
        $scope.$apply();
        // alert($scope.Delivery[0].delivery);
        $state.go('app.Payment', {'Id': $scope.IdInput}, {reload: true});
    };
    $scope.Office = function () {
        $scope.Delivery = [];
//        $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': 2, 'address': '', 'postcode': ''});
        $scope.Delivery.push({'delivery': 2, 'address': '', 'postcode': '', 'province': ''});
        ItemsDelivery.setDelivery($scope.Delivery);
        $scope.$apply();
        // alert($scope.Delivery[0].delivery);
        $state.go('app.Delivery', {'Id': $scope.IdInput}, {reload: true});
    };

});

app.controller('AppShopping_ProfileCtrl', function (ItemsDeliveryProfile,$ionicActionSheet,$cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer,MemberDataService,ProvinceDataService,PostCodeDataService,$scope,cartDataService,ItemsYOUService,ItemsYOU2Service, $http, $timeout, $ionicModal,$cordovaDatePicker, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService) {
    // alert("sss");
    $scope.cartData = cartDataService.getCartDataService();
    $scope.usercartData= cartDataService.getuserCartDataService();
    $scope.arrTicketPush = ItemsArrService.getCorredores();

    $scope.showProvince = false;
    $scope.cartDatas = [];
    $scope.showAdmin = false;
    $scope.cartData.selectSEX= [] ;
    $scope.cartData.namef =  [];
    $scope.cartData.namel =  [];
    $scope.cartData.photo =  [];
    $scope.cartData.photofull =  [];
    $scope.cartData.photopreview =  [];
    $scope.cartData.checkStatus =  [];

    $scope.IdInput = $stateParams.Id;
    $scope.gotoCustomer = function () {
        cartDataService.setCartDataService($scope.cartData);
        $state.go('app.customer', {}, {reload: true});
    };

    $scope.tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));

    //  ,
    $scope.RemoveFiless = function (index) {
        $scope.cartData.photo[index] = "";
        console.log($scope.cartData.photo[index]);
        $scope.apply;
    };
    $scope.showaction = function(Path) {
        var Path = Path ;
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Take Photo' },
                { text: 'Photo album ' }
            ],
            titleText: 'Select Photo',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if(index == 0){
                    $scope.uploadFilessTake(Path);
                } else {
                    $scope.uploadFiless(Path);
                }
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds

    };

    // var options = {
    //     quality: 50,
    //     destinationType: Camera.DestinationType.DATA_URL,
    //     sourceType: Camera.PictureSourceType.CAMERA,
    //     allowEdit: true,
    //     encodingType: Camera.EncodingType.JPEG,
    //     targetWidth: 100,
    //     targetHeight: 100,
    //     popoverOptions: CameraPopoverOptions,
    //     saveToPhotoAlbum: false,
    //     correctOrientation:true
    // };
    //
    // $cordovaCamera.getPicture(options).then(function(imageData) {
    //     var image = document.getElementById('myImage');
    //     image.src = "data:image/jpeg;base64," + imageData;
    // }, function(err) {
    //     // error
    // });

    $scope.uploadFilessTake = function (index) {
        var indexData = index;
        // alert("uploadFiles");
        $ionicLoading.show({
            template: 'Loading...'
        });

        var options =   {
            quality: 100
            , destinationType: Camera.DestinationType.DATA_URL
            // destinationType: Camera.DestinationType.DATA_URL,
            , sourceType: Camera.PictureSourceType.CAMERA
            , encodingType: Camera.EncodingType.JPEG
            , saveToPhotoAlbum: true
            , targetWidth: 350
            // , allowEdit: true
            , targetHeight: 350,
        };

        $cordovaCamera.getPicture(options).then(
            function(fileURL) {
                var targetPath = fileURL;

                $scope.cartData.photo[indexData] = targetPath;
                $scope.cartData.photofull[indexData] = "data:image/jpeg;base64,"+targetPath;
                // $scope.cartData.photopreview[indexData].src = "data:image/jpeg;base64,"+targetPath;

                console.log($scope.cartData.photo[indexData]);
                console.log($scope.cartData.photofull[indexData]);

                $scope.$apply();
                $ionicLoading.hide();

            }, function(err){
                $ionicLoading.hide();
            }
        );
    };
    $scope.uploadFiless = function (index) {
         var indexData = index;
        // alert("uploadFiles");
        $ionicLoading.show({
            template: 'Loading...'
        });
        var options = {
            quality: 100
            , destinationType: Camera.DestinationType.DATA_URL
            // destinationType: Camera.DestinationType.DATA_URL,
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            , encodingType: Camera.EncodingType.JPEG
            // , allowEdit: true
            , targetWidth: 350
            , targetHeight: 350
        };

        $cordovaCamera.getPicture(options).then(
            function(fileURL) {
                var targetPath = fileURL;

                $scope.cartData.photo[indexData] = targetPath;
                $scope.cartData.photofull[indexData] = "data:image/jpeg;base64,"+targetPath;
                // $scope.cartData.photopreview[indexData].src = "data:image/jpeg;base64,"+targetPath;
                console.log($scope.cartData.photo[indexData]);
                console.log($scope.cartData.photofull[indexData]);

                $scope.$apply();

                $ionicLoading.hide();


            }, function(err){
                $ionicLoading.hide();
             }
        );
    };

    var start = ItemsYOUService.getCompanyCorredores1();
    var end = ItemsYOU2Service.getCompanyCorredores2();
    if((start != null || start != '' || start != undefined ) && (end != null || end != '' || end != undefined )){
        $scope.cartData.start =start;
        $scope.cartData.end=end;
    }
    // $scope.cartData = cartDataService.getCartDataService();


    // $scope.$apply();

    if($scope.tokenDataToTicket == null || $scope.tokenDataToTicket == '' || $scope.tokenDataToTicket == undefined){
        $scope.IdInput_class = 'app.AppShopping2';
        $scope.showAdmin = false;
        $scope.showProvince = true;
    }else{
        if($scope.tokenDataToTicket.account_user_privilege == 'MEMBER'){
            $scope.IdInput_class = 'app.AppShopping2';
            $scope.usercartData.namef =  $scope.tokenDataToTicket.account_user_fname ;
            $scope.usercartData.namel =  $scope.tokenDataToTicket.account_user_lname ;
            $scope.usercartData.phone = $scope.tokenDataToTicket.account_user_phone;
            $scope.usercartData.mail = $scope.tokenDataToTicket.account_user_email;
            $scope.usercartData.address = $scope.tokenDataToTicket.account_user_address;
            $scope.usercartData.province = $scope.tokenDataToTicket.account_user_province;
            $scope.usercartData.postcode = $scope.tokenDataToTicket.account_user_postcode;
            $scope.usercartData.photo = "";
            $scope.showAdmin = false;
            $scope.showProvince = false;

        }else  if($scope.tokenDataToTicket.account_user_privilege == 'SALES' || $scope.tokenDataToTicket.account_user_privilege == 'ADMIN' ){
            $scope.IdInput_class = 'app.AppShopping';
            $scope.showAdmin = true;
            $scope.showProvince = true;

        } else {
            $scope.showAdmin = false;
            $scope.showProvince = true;

        }
    }

    console.log("PostCodeDataService: " + PostCodeDataService.getProvinceDataService());
    // $scope.$on("$ionicView.beforeEnter", function(event, data){
    //     // handle event
    //     console.log("State beforeEnter: ", data.stateParams);
    // });



    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // handle event
        console.log("State beforeEnter: ", data.stateParams);
    });
    $scope.$on("$ionicView.afterEnter", function(){
        console.log("State afterEnter: ");
        $scope.tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
         $scope.cartDatas = [];
        var start = ItemsYOUService.getCompanyCorredores1();
        var end = ItemsYOU2Service.getCompanyCorredores2();
        if((start != null || start != '' || start != undefined ) && (end != null || end != '' || end != undefined )){
            $scope.cartData.start =start;
            $scope.cartData.end=end;
        }
        $scope.usercartData= cartDataService.getuserCartDataService();
        $scope.arrTicketPush = ItemsArrService.getCorredores();
        $scope.cartData = cartDataService.getCartDataService();

        $scope.apply;


        if($scope.tokenDataToTicket == null || $scope.tokenDataToTicket == '' || $scope.tokenDataToTicket == undefined){
            $scope.IdInput_class = 'app.AppShopping2';
            $scope.showAdmin = false;
            $scope.showProvince = true;
        }else{
            if($scope.tokenDataToTicket.account_user_privilege == 'MEMBER'){
                $scope.IdInput_class = 'app.AppShopping2';
                $scope.usercartData.namef =  $scope.tokenDataToTicket.account_user_fname ;
                $scope.usercartData.namel =  $scope.tokenDataToTicket.account_user_lname ;
                $scope.usercartData.phone = $scope.tokenDataToTicket.account_user_phone;
                $scope.usercartData.mail = $scope.tokenDataToTicket.account_user_email;
                $scope.usercartData.address = $scope.tokenDataToTicket.account_user_address;
                $scope.usercartData.province = $scope.tokenDataToTicket.account_user_province;
                $scope.usercartData.postcode = $scope.tokenDataToTicket.account_user_postcode;
                $scope.usercartData.photo = "";
                $scope.showAdmin = false;
                $scope.showProvince = false;

            }else  if($scope.tokenDataToTicket.account_user_privilege == 'SALES' || $scope.tokenDataToTicket.account_user_privilege == 'ADMIN' ){
                $scope.IdInput_class = 'app.AppShopping';
                $scope.showAdmin = true;
                $scope.showProvince = true;

            } else {
                $scope.showAdmin = false;
                $scope.showProvince = true;

            }
        }

        console.log("cartDatas: " + JSON.stringify($scope.cartDatas));
        if(ProvinceDataService.getProvinceDataService() != null){
            $scope.usercartData.province = ProvinceDataService.getProvinceDataService();
            ProvinceDataService.setProvinceDataService(null);
            cartDataService.setuserCartDataService($scope.usercartData);

        }

        if(PostCodeDataService.getProvinceDataService() != null){
            $scope.usercartData.postcode = PostCodeDataService.getProvinceDataService();
            PostCodeDataService.setProvinceDataService(null);
            cartDataService.setuserCartDataService($scope.usercartData);

        }
        if(MemberDataService.getMemberDataService() != null){
            $scope.member = MemberDataService.getMemberDataService();
            $scope.usercartData.namef = $scope.member.namef;
            $scope.usercartData.namel =  $scope.member.namel ;
            $scope.usercartData.phone = $scope.member.phone;
            $scope.usercartData.mail = $scope.member.mail;
            $scope.usercartData.address = $scope.member.address;
            $scope.usercartData.line = $scope.member.line;
            $scope.usercartData.province =  $scope.member.province;
            $scope.usercartData.postcode = $scope.member.postcode;
            $scope.usercartData.photo = "";
            $scope.apply;
            MemberDataService.setMemberDataService(null);

        }

        for(var i=0;i<$scope.arrTicketPush.length;i++) {

            for(var j=0;j<$scope.arrTicketPush[i].num;j++) {
                if (j == 0) {
                    $scope.cartDatas.push({
                        'id': $scope.arrTicketPush[i].id,
                        'name': $scope.arrTicketPush[i].name,
                        'sex': "",
                        'namef': "",
                        'namel': "",
                        'photo': "",
                        'type': $scope.arrTicketPush[i].type
                    });
                } else {
                    $scope.cartDatas.push({
                        'id': $scope.arrTicketPush[i].id,
                        'name': 0,
                        'sex': "",
                        'namef': "",
                        'namel': "",
                        'photo': "",
                        'type': $scope.arrTicketPush[i].type

                    });
                }
            }

        }

        $scope.$apply();

    });

    var ii=0;
    angular.forEach($scope.arrTicketPush, function (value) {
        ii = parseInt(ii) + parseInt(value.num);

    });
    $scope.number = ii;
    $scope.getNumber = function(num) {
        return new Array(num);
    };
    $scope.getNumbers = function(num) {
        return new Array(num);
    };
    $scope.namefChanged = function(dd) {
        var l = $scope.cartData.namef[dd];

        var EMAIL_REGEXP =  /^[a-zA-Z]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.cartData.namef[dd] = l.substring(0, l.length - 1);

        }
    };
    $scope.namelChanged = function(dd) {
        var l = $scope.cartData.namel[dd];

        var EMAIL_REGEXP =  /^[a-zA-Z]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.cartData.namel[dd] = l.substring(0, l.length - 1);
        }
    };
    $scope.phoneChanged = function() {
        // var l = $scope.cartData.phone;
        // var ls = l.toString();
        // if(ls.length >10){
        //     var d = ls.substring(0,10);
        //     $scope.cartData.phone = l;
        // }
        // var EMAIL_REGEXP =  /^[0-9]*$/;
        // var isMatchRegex = EMAIL_REGEXP.test(l);
        //
        // if(isMatchRegex){
        //
        // }else{
        //     $scope.cartData.phone = l.substring(0, l.length - 1);
        //
        // }

    };

    var options = {

        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#000000',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'

    };

    $scope.copyText = function(copyNum){

        if($scope.cartData.checkStatus[copyNum] == true){
        var dataselectSEX = $scope.usercartData.selectSEX;
        var datanamef = $scope.usercartData.namef;
        var datanamel = $scope.usercartData.namel;

        //var dataphone = $scope.cartData.phone;
        // var datamail = $scope.cartData.mail;

            if(dataselectSEX != "" && dataselectSEX != undefined){
                $scope.cartData.selectSEX[copyNum] = dataselectSEX;
                $scope.cartData.namef[copyNum] = datanamef;
                $scope.cartData.namel[copyNum] = datanamel;
                $scope.$apply();
            } else {
                $scope.cartData.checkStatus[copyNum] = false;
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Select Gender profile information.'
                });

            }

        } else {
            $scope.cartData.selectSEX[copyNum] = "";
            $scope.cartData.namef[copyNum] = "";
            $scope.cartData.namel[copyNum] = "";
            $scope.$apply();

        }
        //dataphone[copyNum] = dataphone[0];
        //datamail[copyNum] = datamail[0];
        // console.log(copyNum);
    };

    $scope.createEventStart = function() {
        var dtr = $scope.cartData.start;
        var dtrEnd = $scope.cartData.end;
    //    maxDate
        if(dtr != ''){
            var dddd=  dtr.split('-');
            var dfr = dddd[2]+"-"+dddd[1]+"-"+dddd[0];



            if(dtrEnd != ''){

                var ddddS=  dtrEnd.split('-');
                var optionsTo = {

                    date: new Date(dddd[2],dddd[1]-1,dddd[0]),
                    mode: 'date', // or 'time'
                    minDate: new Date()-1000,
                    maxDate: new Date(ddddS[2],ddddS[1]-1,ddddS[0]),
                    allowOldDates: true,
                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };
            } else {
                var optionsTo = {

                    date: new Date(dddd[2],dddd[1]-1,dddd[0]),
                    mode: 'date', // or 'time'
                    minDate: new Date()-1000,
                    allowOldDates: true,
                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };

            }
        }else{
            if(dtrEnd != ''){

                var ddddS=  dtrEnd.split('-');
                var optionsTo = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    minDate: new Date()-1000,
                    maxDate: new Date(ddddS[2],ddddS[1]-1,ddddS[0]),
                    allowOldDates: true,
                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };

            } else {
                var optionsTo = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    minDate: new Date()-1000,
                    allowOldDates: true,
                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };
            }

        }

        $cordovaDatePicker.show(optionsTo).then(function(date){
            var getMonth= date.getMonth()+1;
            var fde = date.getDate()+'-'+getMonth+'-'+date.getFullYear();
            ItemsYOUService.setCompanyCorredores1(fde);
            var m =  new Date().getMonth()+1;
            var d =  new Date().getDate();
            var y =  new Date().getFullYear();
            var newtt = d+'-'+m+'-'+y;
            var StartDateF = new Date(y,m,d);
            var StopDateF = new Date(date.getFullYear(),getMonth,date.getDate());
            var dtree = $scope.cartData.end;
            // var dddddtree =  dtree.split('-');
            // var dfrdtree = dddddtree[2]+"-"+dddddtree[1]+"-"+dddddtree[0];
            // var Enddatess = new Date(dddddtree[2],dddddtree[1]-1,dddddtree[0]);


            // if(Enddatess >= StartDateF){
            //     $scope.cartData.start = fde;
            // }else{

                if(StopDateF >= StartDateF) {
                    $scope.cartData.start = fde;

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Day can not be less than the current'
                    });
                    $scope.cartData.start = "";
                }

            // }
            $scope.$apply();

        });
    };
    $scope.createEventEnd = function() {


        var dtr = $scope.cartData.start;
        var dtree = $scope.cartData.end;
        if(dtr!=''){

            var dddd=  dtr.split('-');
            var dfr = dddd[2]+"-"+dddd[1]+"-"+dddd[0];
            if(dtree!=''){
                var dddddtree =  dtree.split('-');
                var dfrdtree = dddddtree[2]+"-"+dddddtree[1]+"-"+dddddtree[0];
                var optionsTo = {

                    date: new Date(dddddtree[2],dddddtree[1]-1,dddddtree[0]),
                    mode: 'date', // or 'time'
                    allowOldDates: true,
                    minDate: new Date(dddd[2],dddd[1]-1,dddd[0]),

                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };
            }else{
                var optionsTo = {

                    date: new Date(dddd[2],dddd[1]-1,dddd[0]),
                    mode: 'date', // or 'time'
                    minDate: new Date(dddd[2],dddd[1]-1,dddd[0]),
                    allowOldDates: true,
                    allowFutureDates: true,
                    doneButtonLabel: 'DONE',
                    doneButtonColor: '#000000',
                    cancelButtonLabel: 'CANCEL',
                    cancelButtonColor: '#000000'
                };
            }

        }else{


            var optionsTo = {

                date: new Date(),
                mode: 'date', // or 'time'
                minDate: new Date()-1000,
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#000000',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };
        }

        $cordovaDatePicker.show(optionsTo).then(function(date){
            if(dtr!='') {


             var getMonth= date.getMonth()+1;
            var fde = date.getDate()+'-'+getMonth+'-'+date.getFullYear();
            ItemsYOU2Service.setCompanyCorredores2(fde);
            var fde2 =date.getFullYear()+'-'+getMonth+'-'+date.getDate();
            var m =  new Date().getMonth()+1;
            var y =  new Date().getDate();
            var d =  new Date().getFullYear();
            var newtt = y+'-'+m+'-'+d;
            if(fde){

                var StartDateF = new Date( dddd[2],dddd[1],dddd[0]);
                var StopDateF = new Date(date.getFullYear(),getMonth,date.getDate());
                if(StopDateF >= StartDateF){
                    $scope.cartData.end = fde;
                }else{
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Date can not be less than the start date.'
                    });
                    $scope.cartData.end = "";
                }
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Closures start date'
                });
                $scope.cartData.end = "";
            }
            $scope.$apply();
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Select Start Date'
                });
                $scope.cartData.start = "";
                $scope.cartData.end = "";
            }
        });
    };

    $scope.ShoppingProfile = function () {
        $scope.arrTicketPush = ItemsArrService.getCorredores();
        var datastart = $scope.cartData.start;
        var dataend = $scope.cartData.end;
        var dataselectSEX = $scope.cartData.selectSEX;
        var datanamefsub = $scope.cartData.namef;
        var datanamelsub = $scope.cartData.namel;
        var dataphoto = $scope.cartData.photo;
        var datanamef = $scope.usercartData.namef;
        var datanamel = $scope.usercartData.namel;
        var dataselectSEXmain = $scope.usercartData.selectSEX;
        var dataphone = $scope.usercartData.phone;
        var datamail = $scope.usercartData.mail;
        var dataline = $scope.usercartData.line;
        var dataaddress = $scope.usercartData.address;
        var dataprovince = $scope.usercartData.province;
        var datapostcode = $scope.usercartData.postcode;


        $scope.deliveryData = {} ;
        $scope.deliveryData.account_user_address = dataaddress;
        $scope.deliveryData.account_user_postcode = datapostcode;
        $scope.deliveryData.account_user_province = dataprovince;
        ItemsDeliveryProfile.setProfile($scope.deliveryData);


        var EMAIL_REGEXP = /^[\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
        var isMatchRegexEmail = EMAIL_REGEXP.test(datamail);
        var Phone_REGEXP = /^[0-9]*$/;
        var isMatchRegexPhone = Phone_REGEXP.test(dataphone);

        if (!isMatchRegexEmail) {

            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Check Email Format.'
            });

        } else {

            if (!isMatchRegexPhone) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Check Phone Format.'
                });
            } else {


        if (datastart != "" && datastart != undefined &&
            dataend != "" && dataend != undefined) {
            var i = 0;
            var datatrue = '';
            if (dataselectSEXmain != "" && dataselectSEXmain != undefined &&
                datanamef != "" && datanamef != undefined &&
                datanamel != "" && datanamel != undefined &&
                datamail != "" && datamail != undefined &&
                dataprovince != "" && dataprovince != undefined &&
                datapostcode != "" && datapostcode != undefined &&
                dataphone != "" && dataphone != undefined &&
                dataaddress != "" && dataaddress != undefined) {

                // alert($scope.arrTicketPush[0]['type']);

                for (var i = 0; i < $scope.cartDatas.length; i++) {
                    if ($scope.cartDatas[i]['type'] == 1) {

                        // $scope.cartData.selectSEX[i] = ;
                        // $scope.cartData.namef[i] = ;
                        // $scope.cartData.namel[i] = ;
                        if (dataselectSEX[i] == undefined || datanamefsub[i] == undefined || datanamelsub[i] == undefined || dataselectSEX[i] == '' || datanamef[i] == '' || datanamel[i] == '' || dataphone == undefined || datamail == undefined) {
                            datatrue = 'error';
                            break;
                        }
                    }
                }
                if (datatrue == 'error') {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Please Insert Gender, Firstname , Lastname in Ticket Fill.'
                    });
                } else {
                    $scope.Profile = ItemsProfileService.getProfile();
                    $scope.Profile.splice(0, 1);
                    ItemsProfileService.setProfile($scope.Profile);
                    for (var i = 0; i < $scope.cartDatas.length; i++) {

                        var maindatanamef = $scope.usercartData.namef;
                        var maindatanamel = $scope.usercartData.namel;
                        var maindataselectSEXmain = $scope.usercartData.selectSEX;
                        var maindataphone = $scope.usercartData.phone;
                        var maindatamail = $scope.usercartData.mail;
                        var maindataline = $scope.usercartData.line;
                        var maindataaddress = $scope.usercartData.address;
                        var maindataprovince = $scope.usercartData.province;
                        var maindatpostcode = $scope.usercartData.postcode;


                        if ($scope.cartDatas[i]['type'] == 1) {

                            $scope.Profile.push({
                                "Mnamef": maindatanamef,
                                "Mnamel": maindatanamel,
                                "Mmail": maindatamail,
                                "Mphone": maindataphone,
                                "Msex": maindataselectSEXmain,
                                "Mline": maindataline,
                                "Maddress": maindataaddress,
                                "MProvince": maindataprovince,
                                "MPostcode": maindatpostcode,
                                'namef': datanamefsub[i],
                                'namel': datanamelsub[i],
                                'mail': datamail,
                                'phone': dataphone,
                                'sex': dataselectSEX[i],
                                'start': datastart,
                                'end': dataend,
                                'line': dataline,
                                'photo': dataphoto[i],
                                'addresstic': dataaddress
                            });

                        } else {
                            $scope.Profile.push({
                                "Mnamef": maindatanamef,
                                "Mnamel": maindatanamel,
                                "Mmail": maindatamail,
                                "Mphone": maindataphone,
                                "Msex": maindataselectSEXmain,
                                "Mline": maindataline,
                                "Maddress": maindataaddress,
                                "MProvince": maindataprovince,
                                "MPostcode": maindatpostcode,
                                'namef': "",
                                'namel': "",
                                'mail': datamail,
                                'phone': dataphone,
                                'sex': "",
                                'start': datastart,
                                'end': dataend,
                                'line': dataline,
                                'photo': dataphoto[i],
                                'addresstic': dataaddress
                            });
                        }
                    }
                    ItemsProfileService.setProfile($scope.Profile);
                    $state.go('app.AppShopping_process', {'Id': $scope.IdInput}, {reload: true});
                }

            } else {

                var nullfill = [];
                if (dataselectSEXmain == "" || dataselectSEXmain == undefined) {
                    nullfill.push("Gender");
                } else if (datanamef == "" || datanamef == undefined) {
                    nullfill.push("Firstname");
                } else if (datanamel == "" || datanamel == undefined) {
                    nullfill.push("Lastname");
                } else if (dataphone == "" || dataphone == undefined) {
                    nullfill.push("Phone");
                } else if (datamail == "" || datamail == undefined) {
                    nullfill.push("Email");
                } else if (dataaddress == "" || dataaddress == undefined) {
                    nullfill.push("Address");
                } else if (dataprovince == "" || dataprovince == undefined) {
                    nullfill.push("Province");
                } else if (datapostcode == "" || datapostcode == undefined) {
                    nullfill.push("ZipCode");
                }

                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Insert ' + nullfill.toString() + ' information.'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Select Start Date and End Date information.'
            });
        }
            }

        }
    };


});

app.controller('ProfileCtrl', function ($scope, $state) {
    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));

});

app.controller('editProfileCtrl', function (updateProfileData,$ionicNavBarDelegate,ProvinceDataService,PostCodeDataService,$scope, $state, $ionicPopup, $http, $ionicLoading) {

    if (updateProfileData.getupdateProfileData() == null) {
        $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
        updateProfileData.setupdateProfileData($scope.tokenData);
    } else {

        $scope.tokenData = updateProfileData.getupdateProfileData();
    }

    $scope.$on("$ionicView.enter", function(){

        if(ProvinceDataService.getProvinceDataService() != null){
            $scope.tokenData.account_user_province = ProvinceDataService.getProvinceDataService();
            ProvinceDataService.setProvinceDataService(null);
        }
        if(PostCodeDataService.getProvinceDataService() != null){
            $scope.tokenData.account_user_postcode = PostCodeDataService.getProvinceDataService();
            PostCodeDataService.setProvinceDataService(null);
        }

        $scope.apply;
    });

    $scope.proFile = function (inputData) {


        if (inputData.account_user_fname != '' && inputData.account_user_lname != '' && inputData.account_user_phone != '' && inputData.account_user_email != '') {

            var EMAIL_REGEXP = /^[\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
            var isMatchRegexEmail = EMAIL_REGEXP.test(inputData.account_user_email);
            var Phone_REGEXP = /^[0-9]*$/;
            var isMatchRegexPhone = Phone_REGEXP.test(inputData.account_user_phone);

            if (!isMatchRegexEmail) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Check Email Format.'
                });

            } else {

                if (!isMatchRegexPhone) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Please Check Phone Format.'
                    });
                } else {
                    var token = localStorage.getItem("token");
                    console.log(inputData);
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    $http.post("https://qms.japanallpass.com/mobile/Register/EditProfileAPI", {API_ID: "KEYAPIEDIT", namef: inputData.account_user_fname, namel: inputData.account_user_lname, mail: inputData.account_user_email, phone: inputData.account_user_phone, address: inputData.account_user_address, province: inputData.account_user_province, postcode: inputData.account_user_postcode, id: token},{timeout : 15000}).then(function (res) {
                        $ionicLoading.hide();

                        var bool = res.data.type;
                        console.log(bool);
//          var x = bool.toString();
                        if (bool == "mailError") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'This mail is no longer available.'
                            });
                        } else if (bool == "success") {
                            var boolData = JSON.stringify(res.data.dataUser);
                            localStorage.setItem("tokenData", boolData);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'Edit Success'
                            });
                            alertPopup.then(function (res) {
                                // $ionicHistory.goBack();
                                $ionicNavBarDelegate.back();
                                // location.reload(true);
                                // $state.go('app.profile');
                            });
                        }
                    },function (e) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'NO Internet Connetion'
                        });
                    });
                }
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Complete'
            });
        }

    };
});


app.controller('viewticketCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup,$ionicLoading, $state, $rootScope, $cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer) {
    var token = localStorage.getItem("token");
    var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    $scope.Name = '';
    var Id = '';

    $scope.arrTicketPush = ItemsArrService.getCorredores();

    var countcart = 0;
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {
        for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
            countcart = countcart +1;
        }
    }
    $scope.counttotal = countcart;

    if($scope.counttotal != 0){

        if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
            $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
        }else{
            if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }else{
                $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }

        }

    }else{
        var alertPopup = $ionicPopup.alert({
            title: 'Notifications',
            template: 'Tickets must not be empty'
        });

    }

    /* if(token){
     $http.post("https://qms.japanallpass.com/mobile/MainApp/ViewTicketBuy", {token: token}).then(function (res) {

     $ionicLoading.hide();
     var bool = res.data.dataReturn;

     console.log(bool);
     $scope.arrTicketvvv = bool;
     });
     }*/

});



app.controller('HistoryCtrl', function ($ionicActionSheet,$scope, $http, $timeout, $ionicModal, $ionicPopup,$ionicLoading, $state, $rootScope, $cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer) {

var token = JSON.parse(localStorage.getItem("token"));
    $ionicLoading.show({
        template: 'Loading...'
    });
    var token = localStorage.getItem("token");
    console.log(token);
    $http.post("https://qms.japanallpass.com/mobile/MainApp/History", {API_ID: "KEYHistory", token: token},{timeout : 15000}).then(function (res) {

        $ionicLoading.hide();
        var bool = res.data.dataReturn;
        console.log(bool);
        $scope.arrTicketHistory = bool;
    },function (e) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'Notifications',
            template: 'NO Internet Connetion'
        });
    });

    $scope.showaction = function(id,name) {
        var id = id ;
        var name = name ;
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Take Photo' },
                { text: 'Photo album ' }
            ],
            titleText: 'Select Photo',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if(index == 0){
                    $scope.uploadFileTake(id,name);
                } else {
                    $scope.uploadFile(id,name);
                }
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds


    };
    $scope.uploadFileTake = function (id,name) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var options =   {
            quality: 100
            , destinationType: Camera.DestinationType.FILE_URI
            // destinationType: Camera.DestinationType.DATA_URL,
            , sourceType: Camera.PictureSourceType.CAMERA
            , encodingType: Camera.EncodingType.JPEG
            , saveToPhotoAlbum: true
            , targetWidth: 350
            , targetHeight: 350
        };

        $cordovaCamera.getPicture(options).then(

            function(fileURL) {
                var url = "https://qms.japanallpass.com/mobile/MainApp/upload/"+id;
                //target path may be local or url
                var targetPath = fileURL;
                var filename = targetPath.split("/").pop();
                var t = new Date();
                var nameimg = t.getTime();
                var options = {
                    fileKey: "file",
                    fileName: nameimg+'.jpg',
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };
                $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    $ionicLoading.hide();
                    location.reload();

                }, function(err) {
                    $ionicLoading.hide();
                    console.log("ERROR: " + JSON.stringify(err));

                });

            }, function(err){
                $ionicLoading.hide();
                deferred.reject(err);
            });
    };
    $scope.uploadFile = function (id,name) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var options =   {
            quality: 100
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            , encodingType: Camera.EncodingType.JPEG
            , targetWidth: 350
            , targetHeight: 350
        };


        $cordovaCamera.getPicture(options).then(

            function(fileURL) {
                var url = "https://qms.japanallpass.com/mobile/MainApp/upload/"+id;
                //target path may be local or url
                var targetPath = fileURL;
                var filename = targetPath.split("/").pop();
                var t = new Date();
                var nameimg = t.getTime();
                var options = {
                    fileKey: "file",
                    fileName: nameimg+'.jpg',
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };
                $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    $ionicLoading.hide();
                    location.reload();

                }, function(err) {
                    $ionicLoading.hide();
                    console.log("ERROR: " + JSON.stringify(err));

                });

            }, function(err){
                $ionicLoading.hide();
                deferred.reject(err);
            });
    };
    $scope.view = function(id){
        $ionicLoading.show({
            template: 'Loading...'
        });
        $http.post("https://qms.japanallpass.com/mobile/MainApp/HistoryView", {API_ID: "KEYHistory", token: id},{timeout : 15000}).then(function (res) {
            $ionicLoading.hide();
            var bool = res.data.dataReturn;
            $scope.viewHistory = bool;
            $ionicLoading.hide();
//          location.reload();
            $state.go('app.Historyview', {'phone':  $scope.viewHistory.buy_ticket_book_phone,'passport': $scope.viewHistory.buy_ticket_book_passport}, {reload: true});
        },function (e) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'NO Internet Connetion'
            });
        });
    }

});


app.controller('LogoutCtrl', function ($ionicHistory,ItemsYOUService,ItemsYOU2Service,ItemsProfileService,ItemsArrService,cartDataService,$scope, $http, $timeout, $ionicModal, $ionicPopup, $state,$ionicHistory) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenData");

    $ionicHistory.clearCache();
    $scope.arrTicketPush = [];
    ItemsArrService.setCorredores($scope.arrTicketPush);
    ItemsProfileService.setProfile([]);
    cartDataService.setuserCartDataService({});
    cartDataService.setCartDataService({});
    ItemsYOUService.setCompanyCorredores1([]);
    ItemsYOU2Service.setCompanyCorredores2([]);

    // $ionicHistory.clearHistory();
    // $ionicHistory.nextViewOptions({
    //     disableBack: true
    // });
    $scope.token_r = {};
    $scope.$apply();

    $scope.$on("$ionicView.afterEnter", function() {
        $ionicHistory.clearCache();
        localStorage.removeItem("token");
        localStorage.removeItem("tokenData");
        ItemsArrService.setCorredores($scope.arrTicketPush);
        ItemsProfileService.setProfile([]);
        cartDataService.setuserCartDataService({});
        cartDataService.setCartDataService({});
        ItemsYOUService.setCompanyCorredores1([]);
        ItemsYOU2Service.setCompanyCorredores2([]);
        $scope.token_r = {};
        $scope.$apply();
    });
        // $ionicHistory.nextViewOptions({
    //     historyRoot: true,
    //     disableAnimate: true,
    //     expire: 300
    // });
    $state.go('app.home', {}, {reload: true});
    // $location.path("/app/home");

    // $state.go('app.home', {}, {reload: true});
//$state.go('app.home', {}, {reload: true});
//location.reload(true);
});

app.controller('AppShoppingCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService,$cordovaDatePicker) {
    $scope.Name = $stateParams.Name;
    $scope.arrTicketPush = ItemsArrService.getCorredores();

    var countcart = 0;
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {
        for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
            countcart = countcart +1;
        }
    }
    $scope.counttotal = countcart;

    $scope.gotoC = function(x1,x2){
        if(x1 == ''){
            $state.go('app.ticket', {}, {reload: true});
        }else{
            $state.go('app.ticketAppCompany2', {Id:x1,Name:x2}, {reload: true});
        }
    };
    $scope.gotoCX = function(){
//    alert('sss');
        $state.go('app.ticketAppCompany2', {Id:x1,Name:x2}, {reload: true});
    };
    var options = {

        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
    };

    $scope.createEvent = function() {
        $cordovaDatePicker.show(options).then(function(date){
//            console.log();
            // alert(date.getFullYear()+date.getMonth()+date.getDate());
        });
    };
    if ($scope.arrTicketPush != '' || $scope.arrTicketPush != undefined || $scope.arrTicketPush != null) {

        $scope.IdInput = $stateParams.Id;
        var arrItemPush = [];
        var DiscountItemPush = [];
//        angular.forEach($scope.arrTicketPush, function (value) {
//            arrItemPush.push({'id': value.id, 'name': value.name, 'price': value.price, 'priceSum': value.price, 'num': value.num});
//
//        });


    } else {
        $state.go('app.ticket', {}, {reload: true});
    }
    var sumNumTotal = 0;
    var sumNumdetail = 0;
    // $scope.numSum = 0;
    // $scope.discount = 0;
    // $scope.discount_total = 0;
    // $scope.totaldiscount = 0;
    // for (var i = 0; i < $scope.arrTicketPush.length; i++) {
    //     $scope.numSum = parseInt($scope.numSum) + (parseInt($scope.arrTicketPush[i].price) * $scope.arrTicketPush[i].num);
    // }
    // $scope.totaldiscount = $scope.numSum - $scope.discount;
    //
    // $scope.arrTicketPush = ItemsArrService.getCorredores()

    //
    $scope.arrTicketPush = ItemsArrService.getCorredores();
    $scope.$apply();
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {

        // for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
        //     // countcart = countcart +1;
        //
        //     sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
        //     sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
        //
        // }
        sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
        sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
    }
    // alert(sumNumTotal);
    // alert(sumNumdetail);
    $scope.numSum = sumNumTotal;
    $scope.discount_total = sumNumdetail;
    $scope.totaldiscount = sumNumTotal - sumNumdetail;
    $scope.$apply();
    $scope.japDis = function (val) {
        if (val == '' || val == undefined || val == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Complete'
            });
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });
            $http.post("https://qms.japanallpass.com/mobile/MainApp/JAPDISCOUNT", {API_ID: val},{timeout : 15000}).then(function (res) {
                $ionicLoading.hide();
                if (res.data.text == '' || res.data.text == null || res.data.text == undefined) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Discount Code None!'
                    });
                } else {

                    $scope.DiscountTotal = ItemsDiscountService.getDiscount();
                    $scope.DiscountTotal.splice(0, 1);
                    ItemsDiscountService.setDiscount($scope.DiscountTotal);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Discount Success'
                    });
                    $scope.DiscountTotal.push({'id_code': res.data.text.discount_code, 'detail': res.data.text.discount_detail});
                    ItemsDiscountService.setDiscount($scope.DiscountTotal);
                    var sumDiscount = ItemsDiscountService.getDiscount();

                    $scope.discount = sumDiscount[0].detail;
                    var sumNumdetail = ($scope.numSum * $scope.discount) / 100;
                    $scope.discount_total = sumNumdetail;
                    $scope.totaldiscount = $scope.numSum - sumNumdetail;

                }

            },function (e) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'NO Internet Connetion'
                });
            });

        }

    };

    $scope.logValue = function (num, id, name, price,type) {
        if (num == '' || num == undefined || num == null) {
            $scope.arrTicketPush = ItemsArrService.getCorredores();
        } else {

            for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                var dis = $scope.arrTicketPush[i].dis;
                var priceSumdis_2 = 0;
                var sumdisprice = 0;
                var sumpricex = 0;

                for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                    if(dis == 0 || dis == ''){
                        if(dis == ''){
                            dis = 0;
                        }
                        sumpricex = sumpricex + parseFloat(price);
                        // alert(sumdisprice);
                    }else{
                        // alert(Math.round((dis * price)/100));
                        priceSumdis_2 = priceSumdis_2 + (Math.round((dis * parseFloat(price))/100));
                        // alert(priceSumdis_2);
                        sumpricex =  sumpricex + parseFloat(price);

                    }
                }
                sumdisprice = sumpricex - priceSumdis_2;

                if ($scope.arrTicketPush[i].id == id) {
                    var priceSum = num * price;
                    $scope.arrTicketPush.splice(i, 1);
                    $scope.arrTicketPush.splice(i, 0, {'id': id, 'name': name, 'price': price, 'priceSum': priceSum, 'num': num,'dis':dis,'priceSumDis':sumdisprice,'sumdis':priceSumdis_2,'type':type});
                }
                console.log($scope.arrTicketPush[i].priceSumDis);

                console.log($scope.arrTicketPush[i].priceSum);
            }
            ItemsArrService.setCorredores($scope.arrTicketPush);
            //$state.go('app.AppShopping', {'Id':$scope.Id},{reload: true});
        }
        var sumNumTotal = 0;
        var sumNumdetail = 0;
        $scope.arrTicketPush = ItemsArrService.getCorredores();
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {

                // for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                //     // countcart = countcart +1;
                //
                //     sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
                //     sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
                //
                // }
            sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
            sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
        }

        $scope.numSum = sumNumTotal;
        $scope.discount_total = sumNumdetail;
        $scope.totaldiscount = sumNumTotal - sumNumdetail;

        // document.getElementById("num-"+id).focus();

        var countcart = 0;
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                countcart = countcart +1;
            }
        }
        $scope.counttotal = countcart;

        setTimeout(
            function()
            {
                $(".num-"+id).focus();

            }, 100);

    };

    $scope.logValueDiscount = function (num, id, name, price,priceSum,dis,priceSumDis,type) {
        if (num == '' || num == undefined || num == null  || dis == undefined || dis == null ) {
            $scope.arrTicketPush = ItemsArrService.getCorredores();
        } else {

            for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                var priceSumdis_2 = 0;
                var sumdisprice = 0;
                var sumpricex = 0;

                for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                    var dis = $scope.arrTicketPush[i].dis;
                    if(dis == 0 || dis == ''){
                        if(dis == ''){
                            dis = 0;
                        }
                        priceSumdis_2  = priceSumdis_2 + 0;
                        sumpricex = sumpricex +parseFloat(price);
                        // alert(sumdisprice);
                    }else{
                        // alert(Math.round((dis * price)/100));
                        priceSumdis_2 = priceSumdis_2 + (Math.round((dis * parseFloat(price))/100));
                        // alert(priceSumdis_2);
                        sumpricex =  sumpricex + parseFloat(price);

                    }
                }
                sumdisprice = sumpricex - priceSumdis_2;
                if ($scope.arrTicketPush[i].id == id) {
                    var priceSum = num * price;

                    $scope.arrTicketPush.splice(i, 1);
                    $scope.arrTicketPush.splice(i, 0, {'id': id, 'name': name, 'price': price, 'priceSum': priceSum, 'num': num,'dis':dis,'priceSumDis':sumdisprice,'sumdis':priceSumdis_2,'type':type});
                }
                //                console.log($scope.arrTicketPush[i].priceSum);
            }
            ItemsArrService.setCorredores($scope.arrTicketPush);

            //$state.go('app.AppShopping', {'Id':$scope.Id},{reload: true});
        }
        var sumNumTotal = 0;
        var sumNumdetail = 0;
        $scope.arrTicketPush = ItemsArrService.getCorredores();
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
            sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis;
        }

        $scope.numSum = sumNumTotal;
        $scope.discount_total = sumNumdetail;
        $scope.totaldiscount = $scope.numSum - sumNumdetail;

        setTimeout(
            function()
            {
                $(".dis-"+id).focus();

            }, 100);
    };

    $scope.removeTicket = function (idpush, name, price) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remove Ticket',
            template: 'Ticket ' + name
        });
        var tokenDataToTicket = localStorage.getItem("tokenData");
        confirmPopup.then(function (res) {
            if (res) {
                for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                    if ($scope.arrTicketPush[i].id == idpush) {
                        $scope.arrTicketPush.splice(i, 1);
                    }
                }
                ItemsArrService.setCorredores($scope.arrTicketPush);
                $scope.arrTicketPush = ItemsArrService.getCorredores();
                var sumNumTotal = 0;
                var sumNumdetail = 0;
                for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                    sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
                    sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis;
                }

                $scope.numSum = sumNumTotal;
                $scope.discount_total = sumNumdetail;
                $scope.totaldiscount = $scope.numSum - sumNumdetail;

                var countcart = 0;
                for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                    for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                        countcart = countcart +1;
                    }
                }
                $scope.counttotal = countcart;

                if ($scope.arrTicketPush == '' || $scope.arrTicketPush == undefined || $scope.arrTicketPush == null) {
                    $state.go('app.ticket');
                } else {
                    if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                        $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                    }else{
                        if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                            $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                        }else{
                            $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
                        }
                    }


                }
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.AppShopping_Profile_Check = function(){
        $scope.arrTicketPush = ItemsArrService.getCorredores();
        var gt = '';
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            if($scope.arrTicketPush[i].num == 0){
                gt = 'err';
            }
        }

        if(gt == 'err'){
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Value Not = 0'
            });
        } else {
            $state.go('app.AppShopping_Profile', {'Id': $scope.IdInput}, {reload: true});
        }
        $scope.$apply();
    };
    $scope.numSum = 0;
    $scope.discount = 0;
    $scope.discount_total = 0;
    $scope.totaldiscount = 0;
    sumNumTotal = 0;
    sumNumdetail = 0;
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {

        // for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
        //     // countcart = countcart +1;
        //
        //     sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
        //     sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
        //
        // }
        sumNumTotal = parseInt(sumNumTotal) + parseInt($scope.arrTicketPush[i].priceSum);
        sumNumdetail = sumNumdetail + $scope.arrTicketPush[i].sumdis ;
    }
    // alert(sumNumTotal);
    // alert(sumNumdetail);
    $scope.numSum = sumNumTotal;
    $scope.discount_total = sumNumdetail;
    $scope.totaldiscount = sumNumTotal - sumNumdetail;
    $scope.$apply();
    // for (var i = 0; i < $scope.arrTicketPush.length; i++) {
    //     $scope.numSum = parseInt($scope.numSum) + (parseInt($scope.arrTicketPush[i].price) * $scope.arrTicketPush[i].num);
    // }
    // $scope.totaldiscount = $scope.numSum - $scope.discount;
});
app.controller('PaymentcardCtrl', function ($scope,$sce, $http, $timeout, $ionicModal, $ionicPopup, $state,$stateParams, $rootScope, $cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer) {

    // alert("PaymentcardCtrl");
    $scope.serial = JSON.parse($stateParams.serial);
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    $scope.linkURLTOWeb = "https://qms.japanallpass.com/mobile/Paymentcard/cardID/"+$scope.serial;
    $scope.trustSrc = function() {
        return $sce.trustAsResourceUrl($scope.linkURLTOWeb);
    };
    $scope.apply;
//  $http.post("https://qms.japanallpass.com/mobile/Paymentcard/cardID", {API_ID: $scope.serial}).then(function (res) {

//            });

});
app.controller('HomeCtrl', function ($scope,$ionicViewService,$ionicHistory,$ionicNavBarDelegate, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicSlideBoxDelegate) {
    // $ionicHistory.clearHistory();
    // $ionicHistory.nextViewOptions({
    //     disableBack: true
    // });
    // $ionicNavBarDelegate.showBackButton(false);
    //$state.go('menutoken');
    //location.reload(true);
    // $state.go('app.home');
    var token = localStorage.getItem("token");
    $scope.token_r = token;
    $scope.$apply();
    $scope.$on("$ionicView.afterEnter", function() {
         var token = localStorage.getItem("token");
        $scope.token_r = token;
        $scope.$apply();

    });
 //console.log(token);

});
app.controller('HistoryviewCtrl', function ($ionicNavBarDelegate,$scope,$http, $state, $stateParams,$ionicHistory) {
    var p = $stateParams.phone;
    var s = $stateParams.passport;
    $scope.dataHis = {};
    $scope.dataHis.img = "";
//var t = new Date();
//$scope.time2=t.getTime();
//     $ionicHistory.clearCache();
//     $ionicHistory.clearHistory();

    // alert('https://qms.japanallpass.com/assets/photo/'+$stateParams.passport);
    $scope.dataHis.img = 'https://qms.japanallpass.com/assets/photo/'+$stateParams.passport;

    $scope.$apply();

    $scope.backview = function () {
        $ionicNavBarDelegate.back();
    }
});

app.controller('AppCtrl', function ($scope, $http, $state, $stateParams, $ionicLoading) {
    var token = localStorage.getItem("token");
    $scope.token_r = token;
});
app.controller('Forget_PasswordCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading) {

    $scope.forgetPassword = function (data) {
        if (data) {
            $ionicLoading.show({
                template: 'Loading...'
            });

            $http.post("https://qms.japanallpass.com/mobile/MainApp/Forget_PasswordCtrl", {API_ID: 'reMail', API_MAIL: data.mail},{timeout : 15000}).then(function (res) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: res.data.text
                });
            },function (e) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'NO Internet Connetion'
                });
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Complete'
            });
        }
    };
});
app.controller('ticketAppCompanyCtrl', function ($ionicNavBarDelegate,$scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService) {
    // $scope.ListCompany = {};
    var Id = $stateParams.Id;
    $scope.Name = $stateParams.Name;
    $ionicLoading.show({
        template: 'Loading...'
    });
    var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    console.log(tokenDataToTicket);
    var arrItem = [];
    $scope.tokenDataTicket = ItemsArrService.getCorredores();
    var countcart = 0;
    for (var i = 0; i < $scope.tokenDataTicket.length; i++) {
        for (var j = 0; j < $scope.tokenDataTicket[i].num; j++) {
            countcart = countcart +1;
        }
    }
    $scope.counttotal = countcart;
    $http.post("https://qms.japanallpass.com/mobile/Listticket/ListCompany_TODO", {API_ID: Id},{timeout : 15000}).then(function (res) {
        $ionicLoading.hide();
        $scope.ListCompany = res.data.ticket;
        for (var i = 0; i < $scope.ListCompany.length; i++) {
            var status = false;
            for (var ii = 0; ii < $scope.tokenDataTicket.length; ii++) {
                if ($scope.ListCompany[i].id == $scope.tokenDataTicket[ii].id) {
                    status = true;
                }
            }
            arrItem.push({'id': $scope.ListCompany[i].id,'type': $scope.ListCompany[i].type, 'name': $scope.ListCompany[i].name, 'price': $scope.ListCompany[i].price, 'status': status});

        }
        $scope.ListCompanyArr = arrItem;
    },function (e) {
        $ionicLoading.hide();
        // var alertPopup = $ionicPopup.alert({
        //     title: 'Notifications',
        //     template: 'NO Internet Connetion'
        // });
        var confirmPopup = $ionicPopup.confirm({
            title: 'Notifications',
            template: 'NO Internet Connetion Confirm Reload Data'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $state.go($state.current, {}, {reload: true});
                console.log('Reload');
            } else {
                $ionicNavBarDelegate.back();
                console.log('Back');
            }
        });

    });

    $scope.itemTicket = function () {
        if ($scope.tokenDataTicket == undefined || $scope.tokenDataTicket == '' || $scope.tokenDataTicket == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please choose ticket'
            });
        } else {
            console.log($scope.tokenDataTicket);
            ItemsArrService.setCorredores($scope.tokenDataTicket);

            if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }else{
                if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                    $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }else{
                    $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }
            }
        }

    };
    $scope.itemTicketData = function (index, data, name, price, checkStatus,type) {
        if (checkStatus) {
            $scope.tokenDataTicket.push({'id': data, 'name': name, 'type': type,'price': price, 'priceSum': price, 'num': 1,'dis':0,'priceSumDis': price,'sumdis':0});
            ItemsArrService.setCorredores($scope.tokenDataTicket);
        } else {
            for (var i = 0; i < $scope.tokenDataTicket.length; i++) {
                console.log($scope.tokenDataTicket[i].id);
                if ($scope.tokenDataTicket[i].id == data) {
                    $scope.tokenDataTicket.splice(i, 1);

                }
            }
            ItemsArrService.setCorredores($scope.tokenDataTicket);
        }
    };


    $scope.ticketview = function(){
        var token = localStorage.getItem("token");
        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
        $scope.Name = '';
        var Id = '';

        $scope.arrTicketPush = ItemsArrService.getCorredores();

        var countcart = 0;
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                countcart = countcart +1;
            }
        }
        $scope.counttotal = countcart;

        if($scope.counttotal != 0){

            if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }else{
                if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                    $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }else{
                    $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }

            }
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Tickets must not be empty'
            });
        }

    }

});
app.controller('appListcompanyCtrl', function ($ionicNavBarDelegate,$scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading, ItemsArrService) {
    $ionicLoading.show({
        template: 'Loading...'
    });
    $scope.tokenDataTicket = ItemsArrService.getCorredores();
    var countcart = 0;
    for (var i = 0; i < $scope.tokenDataTicket.length; i++) {
        for (var j = 0; j < $scope.tokenDataTicket[i].num; j++) {
            countcart = countcart +1;
        }
    }
    $scope.counttotal = countcart;

    $http.post("https://qms.japanallpass.com/mobile/Listticket/ListCompany", {API_ID: "KETAPI"},{timeout : 15000}).then(function (res) {
        $ionicLoading.hide();
        $scope.ListCompany = res.data;
        // $scope.tokenDataTicket = ItemsArrService.getCorredores();
        //
        // $scope.counttotal = $scope.tokenDataTicket.length;
//        $scope.tokenDataTicket = JSON.stringify(ItemsArrService.getCorredores());
//        if ($scope.tokenDataTicket != undefined || $scope.tokenDataTicket != '' || $scope.tokenDataTicket != null || $scope.tokenDataTicket != '{}') {
        ItemsArrService.setCorredores($scope.tokenDataTicket);
//        }

    },function (e) {
        $ionicLoading.hide();
        var confirmPopup = $ionicPopup.confirm({
            title: 'Notifications',
            template: 'NO Internet Connetion Confirm Reload Data'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $state.go($state.current, {}, {reload: true});
                console.log('Reload');
            } else {
                $ionicNavBarDelegate.back();
                console.log('Back');
            }
        });
    });

    $scope.ticketview = function(){
        var token = localStorage.getItem("token");
        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
        $scope.Name = '';
        var Id = '';

        $scope.arrTicketPush = ItemsArrService.getCorredores();
        var countcart = 0;
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                countcart = countcart +1;
            }
        }
        $scope.counttotal = countcart;
        if($scope.counttotal != 0){
            if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }else{
                if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                    $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }else{
                    $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }
            }
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Tickets must not be empty'
            });
        }
    }

});

app.controller('LoginCtrl', function (cartDataService,ItemsYOU2Service,ItemsYOUService,ItemsProfileService,ItemsArrService,$scope,$ionicViewService,$ionicHistory, $location,$http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading) {

    $scope.signIn = function (data) {
        if (data) {
            if (data.username && data.password) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.post("https://qms.japanallpass.com/mobile/UserApp/Loginapp", {API_ID: "KETAPI", username: data.username, password: data.password},{timeout : 15000}).then(function (res) {
                    var bool = res.data.type;
                    $ionicLoading.hide();

                    if (bool == 'error') {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'Please correct username and password'
                        });
                    } else if (bool != '') {

                        $scope.arrTicketPush = [];
                        ItemsArrService.setCorredores($scope.arrTicketPush);
                        ItemsProfileService.setProfile([]);
                        cartDataService.setuserCartDataService({});
                        cartDataService.setCartDataService({});
                        ItemsYOUService.setCompanyCorredores1([]);
                        ItemsYOU2Service.setCompanyCorredores2([]);

                        var boolData = JSON.stringify(res.data.dataUser);

                        localStorage.setItem("token", bool);
                        localStorage.setItem("tokenData", boolData);

                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'Login Success'
                        });
                        // $location.path('#/app/home');
                        // $ionicViewService.clearHistory();
                        // $ionicHistory.nextViewOptions({
                        //     disableBack: true
                        // });

                        $state.go('app.home', {}, {reload: true});

                    }
                },function (e) {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'NO Internet Connetion'
                    });
                });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please correct username and password'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please correct username and password'
            });
            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });

        }

    };

});

app.controller('TestCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state) {

    $scope.call = function(){
        var phonedialer2 =new phonedialer();
        var phnum='0836145721';
        phonedialer.dial(
            phnum,
            function(err) {
                if (err == "empty") alert("Unknown phone number");
                else alert("Dialer Error:" + err);
            },
            function(success) { alert('Dialing succeeded'); }
        );

    }


});
app.controller('TicketCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading, ItemsArrService) {

    $scope.tokenDataTicket = ItemsArrService.getCorredores();
    var countcart = 0;
    for (var i = 0; i < $scope.tokenDataTicket.length; i++) {
        for (var j = 0; j < $scope.tokenDataTicket[i].num; j++) {
            countcart = countcart +1;
        }
    }
    $scope.counttotal = countcart;
    $scope.ticketQRcode = function () {
        $state.go('app.ticketQRcode');
    };
    $scope.ticketview = function(){
        var token = localStorage.getItem("token");
        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
        $scope.Name = '';
        var Id = '';

        $scope.arrTicketPush = ItemsArrService.getCorredores();
        var countcart = 0;
        for (var i = 0; i < $scope.arrTicketPush.length; i++) {
            for (var j = 0; j < $scope.arrTicketPush[i].num; j++) {
                countcart = countcart +1;
            }
        }
        $scope.counttotal = countcart;
        if($scope.counttotal != 0){
            if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
            }else{
                if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                    $state.go('app.AppShopping2', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }else{
                    $state.go('app.AppShopping', {'Id': Id,'Name':$scope.Name}, {reload: true});
                }
            }
        }else{
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Tickets must not be empty'
            });

        }

    }
});
app.controller('ViewQRcodeCtrl', function ($ionicPlatform,$scope, $http, $timeout, $ionicModal, $ionicPopup, $state, ItemsArrService) {



});

app.controller('TicketQRcodeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, ItemsArrService) {


    document.addEventListener("deviceready", function () {

    $scope.tokenDataTicket = ItemsArrService.getCorredores();

    $scope.$apply();
    console.log("qr " +JSON.stringify($scope.tokenDataTicket));
      var str = "";
    $scope.scanBarcode = function () {

        var params = {
            text_title: "", // Android only
            text_instructions: "", // Android only
            camera: "back",
            flash: "auto",
            drawSight: true
        } ;

        cloudSky.zBar.scan(params, function (result) {
            // alert("we got a barcode: " + result)
            str = result;
            console.log("qr " +result);
            var subStr = str.split('|');
            if(subStr[1]  != undefined && subStr[2]  != undefined && subStr[4]  != undefined){

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Ticket',
                    template: 'Company name : ' + subStr[1] + '<br>' + 'Ticket name : ' + subStr[2] + '<br>' + 'Price : ' + subStr[4] + ' Baht'
                });
            }
            confirmPopup.then(function (res) {
                if (res) {
                    var subStr = str.split('|');
                    $scope.tokenDataTicket = ItemsArrService.getCorredores();
                    $scope.$apply();
                    if($scope.tokenDataTicket.length > 0){
                        var  Newamount = 1;
                        var  Price_newsum = subStr[4];
                        var  dis = 0;
                        var priceSumdis_2 = 0;
                        for (var i = 0; i < $scope.tokenDataTicket.length; i++) {
                            if (parseInt($scope.tokenDataTicket[i].id) == parseInt(subStr[0])) {
                                // alert(parseInt($scope.tokenDataTicket[i].id)+' and '+parseInt(subStr[0]));
                                // $scope.tokenDataTicket[i].id
                                Newamount =  $scope.tokenDataTicket[i].num + Newamount;
                                dis =  $scope.tokenDataTicket[i].dis;
                                $scope.tokenDataTicket.splice(i, 1);
                                // $scope.tokenDataTicket.splice(i, 1, {'id': subStr[0], 'name': subStr[2], 'price': subStr[4], 'priceSum': subStr[4], 'num': Newamount, 'type': 1,'dis':0,'priceSumDis': subStr[4],"sumdis":0});
                                // console.log("qr After " +JSON.stringify($scope.tokenDataTicket));
                                // ItemsArrService.setCorredores($scope.tokenDataTicket);
                                // var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
                                //
                                // if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                                //
                                //     $state.go('app.AppShopping2', {reload: true});
                                //
                                // }else{
                                //
                                //     if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                                //
                                //         $state.go('app.AppShopping2', {reload: true});
                                //
                                //     }else  if(tokenDataToTicket.account_user_privilege == 'SALES' || tokenDataToTicket.account_user_privilege == 'ADMIN' ){
                                //         $state.go('app.AppShopping', {reload: true});
                                //
                                //     } else {
                                //         $state.go('app.AppShopping2', {reload: true});
                                //
                                //         // , {'Id': 'QRcode'},
                                //     }
                                // }
                            } else {

                              //  $scope.tokenDataTicket.push({'id': subStr[0], 'name': subStr[2], 'price': subStr[4], 'priceSum': subStr[4], 'num': 1, 'type': 1,'dis':0,'priceSumDis': subStr[4],"sumdis":0});
                              //   console.log("qr After " +JSON.stringify($scope.tokenDataTicket));
                              //   ItemsArrService.setCorredores($scope.tokenDataTicket);
                              //
                              //   var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
                              //
                              //   if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
                              //
                              //       $state.go('app.AppShopping2', {reload: true});
                              //
                              //   }else{
                              //
                              //       if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                              //
                              //           $state.go('app.AppShopping2', {reload: true});
                              //
                              //       }else  if(tokenDataToTicket.account_user_privilege == 'SALES' || tokenDataToTicket.account_user_privilege == 'ADMIN' ){
                              //           $state.go('app.AppShopping', {reload: true});
                              //
                              //       } else {
                              //           $state.go('app.AppShopping2', {reload: true});
                              //
                              //           // , {'Id': 'QRcode'},
                              //       }
                              //   }
                            }
                            // console.log($scope.tokenDataTicket[i].priceSum);
                        }
                        var sumdisprice = Price_newsum ;
                        var sumpricex = 0;
                        if(dis == 0 || dis == ''){
                            if(dis == ''){
                                dis = 0;
                            }
                            priceSumdis_2  = priceSumdis_2 + 0;
                            sumpricex = sumpricex + parseFloat(subStr[4]);
                            sumdisprice = sumpricex - priceSumdis_2;

                            // alert(sumdisprice);
                        }else{
                            // alert(Math.round((dis * price)/100));
                            priceSumdis_2 = priceSumdis_2+ (Math.round((dis * parseFloat(subStr[4]))/100));
                            // alert(priceSumdis_2);
                            sumpricex =  sumpricex + parseFloat(subStr[4]);
                            sumdisprice = sumpricex - priceSumdis_2;

                        }

                        $scope.tokenDataTicket.push({'id': subStr[0], 'name': subStr[2], 'price': subStr[4], 'priceSum': parseFloat(subStr[4])*Newamount, 'num': Newamount, 'type': 1,'dis':dis,'priceSumDis': sumdisprice*Newamount,"sumdis":priceSumdis_2*Newamount});
                        console.log("qr After " +JSON.stringify($scope.tokenDataTicket));
                        ItemsArrService.setCorredores($scope.tokenDataTicket);

                        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
                        if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){

                            $state.go('app.AppShopping2', {reload: true});

                        }else{

                            if(tokenDataToTicket.account_user_privilege == 'MEMBER'){

                                $state.go('app.AppShopping2', {reload: true});

                            }else  if(tokenDataToTicket.account_user_privilege == 'SALES' || tokenDataToTicket.account_user_privilege == 'ADMIN' ){
                                $state.go('app.AppShopping', {reload: true});

                            } else {
                                $state.go('app.AppShopping2', {reload: true});

                                // , {'Id': 'QRcode'},
                            }
                        }
                    } else {

                        $scope.tokenDataTicket.push({'id': subStr[0], 'name': subStr[2], 'price': subStr[4], 'priceSum': subStr[4], 'num': 1, 'type': 1,'dis':0,'priceSumDis': subStr[4],"sumdis":0});
                        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));

                        if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){

                            $state.go('app.AppShopping2', {reload: true});

                        }else{
                            if(tokenDataToTicket.account_user_privilege == 'MEMBER'){

                                $state.go('app.AppShopping2', {reload: true});

                            }else  if(tokenDataToTicket.account_user_privilege == 'SALES' || tokenDataToTicket.account_user_privilege == 'ADMIN' ){
                                $state.go('app.AppShopping', {reload: true});

                            } else {
                                $state.go('app.AppShopping2', {reload: true});

                                // , {'Id': 'QRcode'},
                            }
                        }
                    }



//                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }, function () {
            // alert("false")
        })



    };
    }, false);
});
app.controller('RegisterCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state) {

    $scope.registerData = {};
    $scope.phoneChanged = function() {
        var l = $scope.registerData.phone;
        var ls = l.toString();

        if(ls.length >10){
            var d = ls.substring(0,10);
            $scope.registerData.phone = parseInt(d);
        }

    };


    $scope.mailChanged = function() {
        var l = $scope.registerData.mail;

        var EMAIL_REGEXP =  /^[A-Za-z0-9@_.]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.registerData.mail = l.substring(0, l.length - 1);

        }
    };

    $scope.namefChanged = function() {
        var l = $scope.registerData.namef;

        var EMAIL_REGEXP =  /^[A-Za-zก-ฮฯ-์]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.registerData.namef = l.substring(0, l.length - 1);

        }
    };

    $scope.namelChanged = function() {
        var l = $scope.registerData.namel;

        var EMAIL_REGEXP =  /^[A-Za-zก-ฮฯ-์]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.registerData.namel = l.substring(0, l.length - 1);

        }
    };

    $scope.passwordChanged = function(){
        var l = $scope.registerData.password;
        var ls = l.toString();
        if(ls.length >18){
            var d = ls.substring(0,18);
            $scope.registerData.password = d;
        }

    };

    $scope.Register = function (data) {
        if (data) {
            if (data.namef && data.namel && data.mail && data.phone && data.password) {
                var ps = data.password;
                if(ps.length < 6 ){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Please Complete Password > 6'
                    });
                }else{

                    $http.post("https://qms.japanallpass.com/mobile/Register/RegisterAPI", {API_ID: "KETAPI", namef: data.namef, namel: data.namel, mail: data.mail, phone: data.phone, password: data.password},{timeout : 15000}).then(function (res) {

                        var bool = res.data.type;
                        var x = bool.toString();
                        console.log(x);
                        if (x == "mailError") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'This mail is no longer available.'
                            });
                        } else if (x == "success") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Notifications',
                                template: 'Register Success'
                            });
                            alertPopup.then(function (res) {
                                $state.go('app.login');
                            });
                        }
                    },function (e) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'NO Internet Connetion'
                        });
                    });
                }

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Complete'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Complete'
            });
        }
    };
});

app.controller('contactusCtrl', function ($scope) {
});

