var app = angular.module('mainjap.controllers', ['mainjap.services']);

app.controller('SuccessCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService) {
    //$scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
//     $scope.serial = $stateParams.serial;
//     $scope.checktoken = function () {
//         $ionicLoading.show({
//             template: 'Loading...'
//         });
// //        var To = localStorage.getItem("token");
//         location.reload();
//         $ionicLoading.hide();
//         $state.go('app.home', {}, {reload: true});
//
//     };
    $scope.serial = $stateParams.serial;
    $scope.checktoken = function () {

        $ionicLoading.hide();
        $state.go('app.home', {}, {reload: true});

    };
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

    $scope.searchChange = function() {

        ProvinceService.searchProvince($scope.dataProvince.search).then(
            function (matches) {
                $scope.ListProvinceArr = matches;
            }
        )
    };
    $scope.radioClick = function (province) {
        $scope.provinceSelect = province;
        ProvinceDataService.setProvinceDataService($scope.provinceSelect);

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

    $scope.searchChange = function() {

        PostCodeService.searchProvince($scope.dataProvince.search).then(
            function (matches) {
                $scope.ListProvinceArr = matches;
            }
        )
    };
    $scope.radioClick = function (province) {
        $scope.provinceSelect = province;
        PostCodeDataService.setProvinceDataService($scope.provinceSelect);
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
    $ionicLoading.show({
        template: 'Loading...'
    });
    Address.getMember($scope.search).then(function (response) {
        // $scope.typeSearchss = response;
        var arrItem = [];
        $scope.ListAddress = response.data;
        $scope.ListAddressArr = response.data;
        $scope.address.airlinesServer   = response.data;
        localStorage.setItem("address", response.data);
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
        $scope.apply;
    });

    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.address.search+JSON.stringify($scope.address.airlinesServer));
        AddressService.searchAirlines($scope.address.search,$scope.address.airlinesServer).then(
            function(matches) {
                $scope.ListAddressArr = matches;
            }
        )

    };
    $scope.radioClick = function (buy_ticket_delivery_address,
                                  buy_ticket_delivery_provincy,
                                  buy_ticket_delivery_postcode
                                  ) {
        AddressDataService.setAddressDataService(buy_ticket_delivery_address,buy_ticket_delivery_provincy,buy_ticket_delivery_postcode);
        $ionicNavBarDelegate.back();

    };


    // $scope.selectcheck = function () {
    //
    //     $ionicNavBarDelegate.back();
    //
    // }

});


app.controller('CustomerstCtrl', function ($scope,cartDataService,$ionicNavBarDelegate ,$http, $timeout, $ionicModal, $ionicPopup, $state, SearchService,$stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery,$cordovaNetwork,Member) {
    $scope.ListmemberArr = {};
    $scope.typeSearch = "PoNumber";

    $scope.data = {
        "airlinesServer": [],
        "airlines": [],
        "search": ''
    };
    $scope.search= "";
    $ionicLoading.show({
        template: 'Loading...'
    });
    Member.getMember($scope.search).then(function (response) {
        // $scope.typeSearchss = response;

        var arrItem = [];
        $scope.Listmember = response.data;
        $scope.ListmemberArr = response.data;
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
            });
        }
        $scope.ListmemberArr = arrItem;
        $ionicLoading.hide();
        $scope.apply;
    });

    $scope.searchChange = function() {
        console.log('Searching searchChange  ' + $scope.data.search+' type :'+$scope.typeSearch);
        SearchService.searchAirlines($scope.data.search,$scope.data.airlinesServer,$scope.typeSearch).then(
            function(matches) {
                $scope.ListmemberArr = matches;
            }
        )

    };
    $scope.radioClick = function (buy_ticket_gender,
                                   buy_ticket_namef,
                                   buy_ticket_namel,
                                   buy_ticket_phone,
                                   buy_ticket_email,
                                   buy_ticket_line,
                                   buy_ticket_adds) {

        // $scope.cartData= {};
        $scope.cartData = cartDataService.getCartDataService();
        $scope.cartData.selectSEX= [];
        $scope.cartData.namef= [];
        $scope.cartData.namel= [];
        $scope.cartData.selectSEX[0] = buy_ticket_gender;
        $scope.cartData.namef[0] = buy_ticket_namef;
        $scope.cartData.namel[0] =  buy_ticket_namel;
        $scope.cartData.phone = parseInt(buy_ticket_phone);
        $scope.cartData.mail = buy_ticket_email;
        $scope.cartData.line = buy_ticket_line;
        $scope.cartData.address =  buy_ticket_adds;
        cartDataService.setCartDataService($scope.cartData);

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
    var token = localStorage.getItem("token");
    if(token  == undefined){
        token = 0;
    }
    $scope.itemTicket = function (data) {
        var net = $cordovaNetwork.getNetwork();

        if(net == 'none'){
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please connect to the Internet.'
            });

        }else{
            if (data) {
                $scope.Delivery_to.splice(0,0,{'delivery': $scope.Delivery_to[0].delivery, 'address':  $scope.Delivery_to[0].address, 'province':  $scope.Delivery_to[0].province,'postcode':  $scope.Delivery_to[0].postcode,'status_pay': data});
//            $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': $scope.Profile[0].delivery, 'address': $scope.Profile[0].address, 'postcode': $scope.Profile[0].postcode, 'status_pay': data});
//            ItemsProfileService.setProfile($scope.Profile);
                ItemsDelivery.setDelivery($scope.Delivery_to);
                $scope.Profile = ItemsProfileService.getProfile();
                $scope.Delivery_to = ItemsDelivery.getDelivery();
                var ArrData = ItemsArrService.getCorredores();
                var ArrDataDiscount = ItemsDiscountService.getDiscount();
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.post("http://192.168.1.33/mobile/MainApp/AddDataMember_V1", {API_ID: "KEYADD", profile: $scope.Profile, ticket: ArrData, discount: ArrDataDiscount,tokeninput:token,delivery: $scope.Delivery_to}).then(function (res) {
                    $ionicLoading.hide();
                    var boolData = JSON.stringify(res.data);
                    if(data == 2){
                        $state.go('app.Paymentcard', {'serial':boolData}, {reload: true});
                    }else{
                        $state.go('app.Success', {'serial':boolData}, {reload: true});
                    }

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
app.controller('DeliveryCtrl', function ($scope,AddressDataService,PostCodeDataService,ProvinceDataService, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery) {
    $scope.deliveryData = {};

    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    // alert($scope.tokenData);
    $scope.deliveryData = {};
    $scope.IdInput = $stateParams.Id;
    $scope.Profile = ItemsProfileService.getProfile();
    $scope.Delivery_to = ItemsDelivery.getDelivery();
    var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){

    }else{
        $scope.deliveryData.account_user_address =tokenDataToTicket.account_user_address;
        $scope.deliveryData.account_user_postcode =parseInt(tokenDataToTicket.account_user_postcode);
    }

    $scope.$on("$ionicView.enter", function(){


        if(AddressDataService.getAddress() != null){
            $scope.deliveryData.account_user_address = AddressDataService.getAddress();
        }
        if(AddressDataService.getprovince() != null){
            $scope.deliveryData.account_user_province = AddressDataService.getprovince();
        }
        if(AddressDataService.getpostcode() != null){
            $scope.deliveryData.account_user_postcode = parseInt(AddressDataService.getpostcode());
        }

        if(ProvinceDataService.getProvinceDataService() != null){
            $scope.deliveryData.account_user_province = ProvinceDataService.getProvinceDataService();

        }
        if(PostCodeDataService.getProvinceDataService() != null){
            $scope.deliveryData.account_user_postcode = PostCodeDataService.getProvinceDataService();
        }
        $scope.apply;
    });
    $scope.delivery = function (input) {

        if (input) {
            var inaa = input.account_user_address;

            if (input.account_user_address && input.account_user_postcode) {
                if(inaa && inaa.length < 10){

                    var alertPopup = $ionicPopup.alert({
                        title: 'Notifications',
                        template: 'Please Address fill more than 10.'
                    });
                }else{
//                $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': $scope.Profile[0].delivery, 'address': input.account_user_address, 'postcode': input.account_user_postcode});

                    $scope.Delivery_to.splice(0,0,{'delivery': $scope.Delivery_to[0].delivery, 'address': input.account_user_address,'province':input.account_user_province, 'postcode': input.account_user_postcode});
                    ItemsDelivery.setDelivery($scope.Delivery_to);
//               ItemsProfileService.setProfile($scope.Profile);
                    $state.go('app.Payment', {'Id': $scope.IdInput}, {reload: true});
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please complete your information.'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please complete your information.'
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
app.controller('AppShopping_processCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService,ItemsDelivery) {
    //$scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    $scope.IdInput = $stateParams.Id;
    $scope.Profile = ItemsProfileService.getProfile();
    $scope.Delivery = ItemsDelivery.getDelivery();

    $scope.Cashier = function () {
//        $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': 1, 'address': '', 'postcode': ''});

        $scope.Delivery.push({'delivery': 1, 'address': '', 'postcode': ''});
        ItemsDelivery.setDelivery($scope.Delivery);
        $state.go('app.Payment', {'Id': $scope.IdInput}, {reload: true});
    };
    $scope.Office = function () {
//        $scope.Profile.splice(0, 0, {'namef': $scope.Profile[0].namef, 'namel': $scope.Profile[0].namel, 'mail': $scope.Profile[0].mail, 'phone': $scope.Profile[0].phone, 'sex': $scope.Profile[0].sex,'start': $scope.Profile[0].start,'end': $scope.Profile[0].end, 'delivery': 2, 'address': '', 'postcode': ''});
        $scope.Delivery.push({'delivery': 2, 'address': '', 'postcode': ''});
        ItemsDelivery.setDelivery($scope.Delivery);
        $state.go('app.Delivery', {'Id': $scope.IdInput}, {reload: true});
    };

});

app.controller('AppShopping_ProfileCtrl', function ($scope,cartDataService,ItemsYOUService,ItemsYOU2Service, $http, $timeout, $ionicModal,$cordovaDatePicker, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService, ItemsProfileService) {

    $scope.cartData = cartDataService.getCartDataService();
    $scope.showAdmin = false;

    $scope.IdInput = $stateParams.Id;
    $scope.gotoCustomer = function () {
        cartDataService.setCartDataService($scope.cartData);
        $state.go('app.customer', {}, {reload: true});
    };
    $scope.arrTicketPush = ItemsArrService.getCorredores();
    var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    var start = ItemsYOUService.getCompanyCorredores1();
    var end = ItemsYOU2Service.getCompanyCorredores2();
    // var namef = ItemsYOU3Service.getCompanyCorredores3();
    // var namel = ItemsYOU4Service.getCompanyCorredores4();
    // var phone = ItemsYOU5Service.getCompanyCorredores5();
    // var mail = ItemsYOU6Service.getCompanyCorredores6();
    // var line = ItemsYOU7Service.getCompanyCorredores7();
    // var address = ItemsYOU8Service.getCompanyCorredores8();
    // var selectSEX = ItemsYOU9Service.getCompanyCorredores9();

    if((start != null || start != '' || start != undefined ) && (end != null || end != '' || end != undefined )){
        $scope.cartData.start =start;
        $scope.cartData.end=end;
    }

    if(tokenDataToTicket == null || tokenDataToTicket == '' || tokenDataToTicket == undefined){
        $scope.IdInput_class = 'app.AppShopping2';
    }else{
        if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
            $scope.IdInput_class = 'app.AppShopping2';
            $scope.cartData.namef = {0:tokenDataToTicket.account_user_fname};
            $scope.cartData.namel = {0:tokenDataToTicket.account_user_lname};
            $scope.cartData.phone = parseInt(tokenDataToTicket.account_user_phone);
            $scope.cartData.mail = tokenDataToTicket.account_user_email;
            $scope.cartData.address = tokenDataToTicket.account_user_address+' '+tokenDataToTicket.account_user_postcode;
            $scope.showAdmin = false;
        }else{
            $scope.IdInput_class = 'app.AppShopping';
            $scope.showAdmin = true;

        }
    }
    $scope.$on("$ionicView.enter", function(){
        $scope.cartData = cartDataService.getCartDataService();
        $scope.apply;
    });

    var ii=0;
    angular.forEach($scope.arrTicketPush, function (value) {
        ii = parseInt(ii) + parseInt(value.num);

    });
    $scope.number = ii;
    $scope.getNumber = function(num) {
        return new Array(num);
    };
    $scope.namefChanged = function(dd) {
        var l = $scope.cartData.namef[dd];

        var EMAIL_REGEXP =  /^[A-Z]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.cartData.namef[dd] = l.substring(0, l.length - 1);

        }
    };
    $scope.namelChanged = function(dd) {
        var l = $scope.cartData.namel[dd];

        var EMAIL_REGEXP =  /^[A-Z]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){
        }else{
            $scope.cartData.namel[dd] = l.substring(0, l.length - 1);

        }
    };
    $scope.phoneChanged = function() {
        var l = $scope.cartData.phone;
        var ls = l.toString();

        if(ls.length >10){
            var d = ls.substring(0,10);
            $scope.cartData.phone = parseInt(d);
        }
        var EMAIL_REGEXP =  /^[0-9]*$/;
        var isMatchRegex = EMAIL_REGEXP.test(l);

        if(isMatchRegex){

        }else{
            $scope.cartData.phone = l.substring(0, l.length - 1);

        }

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
        var dataselectSEX = $scope.cartData.selectSEX;
        var datanamef = $scope.cartData.namef;
        var datanamel = $scope.cartData.namel;
        //var dataphone = $scope.cartData.phone;
        // var datamail = $scope.cartData.mail;
        dataselectSEX[copyNum] = dataselectSEX[0];
        datanamef[copyNum] = datanamef[0];
        datanamel[copyNum] = datanamel[0];
        //dataphone[copyNum] = dataphone[0];
        //datamail[copyNum] = datamail[0];
        // console.log(copyNum);
    };

    $scope.createEventStart = function() {
        var dtr = $scope.cartData.start;
        if(dtr != ''){
            var dddd=  dtr.split('-');
            var dfr = dddd[2]+"-"+dddd[1]+"-"+dddd[0];

            var optionsTo = {

                date: new Date(dddd[2],dddd[1]-1,dddd[0]),
                mode: 'date', // or 'time'
                allowOldDates: true,
                allowFutureDates: true,
                doneButtonLabel: 'DONE',
                doneButtonColor: '#000000',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            };
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

            var getMonth= date.getMonth()+1;
            var fde = date.getDate()+'-'+getMonth+'-'+date.getFullYear();

            ItemsYOUService.setCompanyCorredores1(fde);
            var m =  new Date().getMonth()+1;
            var d =  new Date().getDate();
            var y =  new Date().getFullYear();
            var newtt = d+'-'+m+'-'+y;
            var StartDateF = new Date(y,m,d);
            var StopDateF = new Date(date.getFullYear(),getMonth,date.getDate());
            if(StopDateF >= StartDateF){
                $scope.cartData.start = fde;
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Day can not be less than the current'
                });
                $scope.cartData.start = "";
            }
        });
    };
    $scope.createEventEnd = function() {
        var dtr = $scope.cartData.start;
        var dtree = $scope.cartData.end;
        if(dtr!=''){

            var dddd=  dtr.split('-');
            var dfr = dddd[2]+"-"+dddd[1]+"-"+dddd[0];
            if(dtree!=''){
                var dddddtree=  dtree.split('-');
                var dfrdtree = dddddtree[2]+"-"+dddddtree[1]+"-"+dddddtree[0];
                var optionsTo = {

                    date: new Date(dddddtree[2],dddddtree[1]-1,dddddtree[0]),
                    mode: 'date', // or 'time'
                    allowOldDates: true,
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
        });
    };


    $scope.ShoppingProfile = function () {

        var datastart = $scope.cartData.start;
        var dataend = $scope.cartData.end;
        var dataselectSEX = $scope.cartData.selectSEX;
        var datanamef = $scope.cartData.namef;
        var datanamel = $scope.cartData.namel;
        var dataphone = $scope.cartData.phone;
        var datamail = $scope.cartData.mail;
        var dataline = $scope.cartData.line;
        var dataaddress = $scope.cartData.address;
        if (datastart && dataend) {
            var i =0;
            var datatrue ='';
            if(dataselectSEX && datanamef && datanamel && dataphone && datamail){
                for(i;i<$scope.number;i++){
                    if(dataselectSEX[i] == undefined || datanamef[i] == undefined || datanamel[i] == undefined ||dataselectSEX[i] == '' || datanamef[i] == '' || datanamel[i]=='' || dataphone == undefined || datamail == undefined){
                        datatrue = 'error';
                        break;
                    }
                }
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please complete your information.'
                });
            }

            if(datatrue == 'error'){
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please complete your information.'
                });
            }else{
                $scope.Profile = ItemsProfileService.getProfile();
                $scope.Profile.splice(0, 1);
                ItemsProfileService.setProfile($scope.Profile);
                for(i=0;i<$scope.number;i++){
                    $scope.Profile.push({'namef': datanamef[i], 'namel': datanamel[i], 'mail': datamail, 'phone': dataphone, 'sex': dataselectSEX[i],'start':datastart,'end':dataend,'line':dataline,'addresstic':dataaddress});

                }
                ItemsProfileService.setProfile($scope.Profile);
                $state.go('app.AppShopping_process', {'Id': $scope.IdInput}, {reload: true});
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please complete your information.'
            });
        }

    };


});

app.controller('ProfileCtrl', function ($scope, $state) {
    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));

});

app.controller('ChangePasswordCtrl', function ($scope, $state, $ionicPopup, $http, $ionicLoading) {
    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));
    var token = localStorage.getItem("token");
    $ionicLoading.show({
        template: 'Loading...'
    });
    $scope.data = {};
    if($scope.data.current_password != ""){
        if($scope.data.new_password == $scope.data.confirm_password) {

            $http.post("http://192.168.1.33/mobile/Register/EditPassword", {
                API_ID: "",
                password: $scope.data.new_password,
                id: token
            }).then(function (res) {
                $ionicLoading.hide();
                location.reload(true);
                $state.go('app.profile');
            });
        } else {}


    } else {
        var alertPopup = $ionicPopup.alert({
            title: 'Notifications',
            template: 'This mail is no longer available.'
        });
    }


});

app.controller('editProfileCtrl', function ($scope, $state, $ionicPopup, $http, $ionicLoading) {
    $scope.tokenData = JSON.parse(localStorage.getItem("tokenData"));

    $scope.proFile = function (inputData) {
        if (inputData.account_user_fname != '' && inputData.account_user_lname != '' && inputData.account_user_phone != '' && inputData.account_user_email != '') {
            var token = localStorage.getItem("token");
            console.log(inputData);
            $ionicLoading.show({
                template: 'Loading...'
            });
            $http.post("http://192.168.1.33/mobile/Register/EditProfileAPI", {API_ID: "KEYAPIEDIT", namef: inputData.account_user_fname, namel: inputData.account_user_lname, mail: inputData.account_user_email, phone: inputData.account_user_phone, address: inputData.account_user_address, postcode: inputData.account_user_postcode, id: token}).then(function (res) {
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
                        location.reload(true);
                        $state.go('app.profile');
                    });
                }
            });
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
    $scope.counttotal = $scope.arrTicketPush.length;
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
     $http.post("http://192.168.1.33/mobile/MainApp/ViewTicketBuy", {token: token}).then(function (res) {

     $ionicLoading.hide();
     var bool = res.data.dataReturn;

     console.log(bool);
     $scope.arrTicketvvv = bool;
     });
     }*/

});





app.controller('HistoryCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup,$ionicLoading, $state, $rootScope, $cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer) {

// var token = JSON.parse(localStorage.getItem("token"));
    $ionicLoading.show({
        template: 'Loading...'
    });
    var token = localStorage.getItem("token");
    alert(token);
    console.log(token);
    $http.post("http://192.168.1.33/mobile/MainApp/History", {API_ID: "KEYHistory", token: token}).then(function (res) {

        $ionicLoading.hide();
        var bool = res.data.dataReturn;

        console.log(bool);
        $scope.arrTicketHistory = bool;
    });
    $scope.uploadFile = function (id,name) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var options =   {
            quality: 100
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            , encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(

            function(fileURL) {
                var url = "http://192.168.1.33/mobile/MainApp/upload/"+id;
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
        $http.post("http://192.168.1.33/mobile/MainApp/HistoryView", {API_ID: "KEYHistory", token: id}).then(function (res) {

            $ionicLoading.hide();
            var bool = res.data.dataReturn;
            $scope.viewHistory = bool;
            $ionicLoading.hide();
//          location.reload();
            $state.go('app.Historyview', {'phone':  $scope.viewHistory.buy_ticket_book_phone,'passport': $scope.viewHistory.buy_ticket_book_passport}, {reload: true});
        });
    }


});


app.controller('LogoutCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenData");
    $state.go('app.home', {}, {reload: true});
//$state.go('app.home', {}, {reload: true});
//location.reload(true);
});

app.controller('AppShoppingCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService, ItemsDiscountService,$cordovaDatePicker) {
    $scope.Name = $stateParams.Name;
    $scope.arrTicketPush = ItemsArrService.getCorredores();

    $scope.counttotal = $scope.arrTicketPush.length;

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
    $scope.numSum = 0;
    $scope.discount = 0;
    $scope.discount_total = 0;
    $scope.totaldiscount = 0;
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {
        $scope.numSum = parseInt($scope.numSum) + (parseInt($scope.arrTicketPush[i].price) * $scope.arrTicketPush[i].num);
    }
    $scope.totaldiscount = $scope.numSum - $scope.discount;

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
            $http.post("http://192.168.1.33/mobile/MainApp/JAPDISCOUNT", {API_ID: val}).then(function (res) {
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

            });

        }

    };

    $scope.logValue = function (num, id, name, price) {
        if (num == '' || num == undefined || num == null) {
            $scope.arrTicketPush = ItemsArrService.getCorredores();
        } else {
            for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                if ($scope.arrTicketPush[i].id == id) {
                    var priceSum = num * price;
//                   var sumpricetotal = price*num;
                    var dis = $scope.arrTicketPush[i].dis;
                    if(dis == 0){
                        var priceSumdis_2 = 0;
                        var sumdisprice = priceSum;
                    }else{
                        var priceSumdis_2 = Math.round((dis * priceSum)/100);
                        var sumdisprice = priceSum-priceSumdis_2;
                    }
                    $scope.arrTicketPush.splice(i, 1);
                    $scope.arrTicketPush.splice(i, 0, {'id': id, 'name': name, 'price': price, 'priceSum': priceSum, 'num': num,'dis':dis,'priceSumDis':sumdisprice,'sumdis':priceSumdis_2});
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

    };

    $scope.logValueDiscount = function (num, id, name, price,priceSum,dis,priceSumDis) {
        if (num == '' || num == undefined || num == null || num == 0 ||  dis == '' || dis == undefined || dis == null ) {
            $scope.arrTicketPush = ItemsArrService.getCorredores();
        } else {
            for (var i = 0; i < $scope.arrTicketPush.length; i++) {
                if ($scope.arrTicketPush[i].id == id) {
                    var sumpricetotal = price*num;
                    if(dis == 0){
                        var priceSumdis_2 = 0;
                        var sumdisprice = priceSum;
                    }else{
                        var priceSumdis_2 = Math.round((dis * sumpricetotal)/100);
                        var sumdisprice = priceSum-priceSumdis_2;
                    }

                    $scope.arrTicketPush.splice(i, 1);
                    $scope.arrTicketPush.splice(i, 0, {'id': id, 'name': name, 'price': price, 'priceSum': priceSum, 'num': num,'dis':dis,'priceSumDis':sumdisprice,'sumdis':priceSumdis_2});
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



                if ($scope.arrTicketPush == '' || $scope.arrTicketPush == undefined || $scope.arrTicketPush == null) {
                    $state.go('app.ticket');
                } else {
                    if(tokenDataToTicket.account_user_privilege == 'MEMBER'){
                        $state.go('app.AppShopping2', {'Id': $scope.IdInput}, {reload: true});
                    }else{
                        $state.go('app.AppShopping', {'Id': $scope.IdInput}, {reload: true});
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
        }else{
            $state.go('app.AppShopping_Profile', {'Id': $scope.IdInput}, {reload: true});
        }
    };
    $scope.numSum = 0;
    $scope.discount = 0;
    $scope.discount_total = 0;
    $scope.totaldiscount = 0;
    for (var i = 0; i < $scope.arrTicketPush.length; i++) {
        $scope.numSum = parseInt($scope.numSum) + (parseInt($scope.arrTicketPush[i].price) * $scope.arrTicketPush[i].num);
    }
    $scope.totaldiscount = $scope.numSum - $scope.discount;
});
app.controller('PaymentcardCtrl', function ($scope,$sce, $http, $timeout, $ionicModal, $ionicPopup, $state,$stateParams, $rootScope, $cordovaCamera, $cordovaImagePicker,$cordovaFileTransfer) {
    $scope.serial = JSON.parse($stateParams.serial);
    $scope.linkURLTOWeb = "http://192.168.1.33/mobile/Paymentcard/cardID/"+$scope.serial;
    $scope.trustSrc = function() {
        return $sce.trustAsResourceUrl($scope.linkURLTOWeb);
    };
//  $http.post("http://192.168.1.33/mobile/Paymentcard/cardID", {API_ID: $scope.serial}).then(function (res) {

//            });

});


app.controller('HomeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicSlideBoxDelegate) {
    // var token = localStorage.getItem("token");
    // var net = $cordovaNetwork.getNetwork();
    // $scope.token_r = token;
    var token = localStorage.getItem("token");
//$state.go('menutoken');
//location.reload(true);
    $scope.token_r = token;
//console.log(token);

});


app.controller('HistoryviewCtrl', function ($scope,$http, $state, $stateParams,$ionicHistory) {
    var p = $stateParams.phone;
    var s = $stateParams.passport;
//var t = new Date();
//$scope.time2=t.getTime();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $scope.img = 'http://192.168.1.33/assets/photo/'+p+'/'+s;

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
            $http.post("http://192.168.1.33/mobile/MainApp/Forget_PasswordCtrl", {API_ID: 'reMail', API_MAIL: data.mail}).then(function (res) {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: res.data.text
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
app.controller('ticketAppCompanyCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $stateParams, $ionicLoading, ItemsArrService) {
    $ionicHistory.clearHistory();
    var Id = $stateParams.Id;
    $scope.Name = $stateParams.Name;
    $ionicLoading.show({
        template: 'Loading...'
    });
    var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
    console.log(tokenDataToTicket);
    var arrItem = [];
    $scope.tokenDataTicket = ItemsArrService.getCorredores();
    $scope.counttotal = $scope.tokenDataTicket.length;

    $http.post("http://192.168.1.33/mobile/Listticket/ListCompany_TODO", {API_ID: Id}).then(function (res) {
        $ionicLoading.hide();
        $scope.ListCompany = res.data.ticket;
        for (var i = 0; i < $scope.ListCompany.length; i++) {
            var status = false;
            for (var ii = 0; ii < $scope.tokenDataTicket.length; ii++) {
                if ($scope.ListCompany[i].id == $scope.tokenDataTicket[ii].id) {
                    status = true;
                }
            }
            arrItem.push({'id': $scope.ListCompany[i].id, 'name': $scope.ListCompany[i].name, 'price': $scope.ListCompany[i].price, 'status': status});

        }
        $scope.ListCompanyArr = arrItem;
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
    $scope.itemTicketData = function (index, data, name, price, checkStatus) {
        if (checkStatus) {
            $scope.tokenDataTicket.push({'id': data, 'name': name, 'price': price, 'priceSum': price, 'num': 1,'dis':0,'priceSumDis': price,'sumdis':0});
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
        $scope.counttotal = $scope.arrTicketPush.length;
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
app.controller('appListcompanyCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading, ItemsArrService) {
    $ionicLoading.show({
        template: 'Loading...'
    });
    $scope.tokenDataTicket = ItemsArrService.getCorredores();
    $scope.counttotal = $scope.tokenDataTicket.length;
    $http.post("http://192.168.1.33/mobile/Listticket/ListCompany", {API_ID: "KETAPI"}).then(function (res) {
        $ionicLoading.hide();
        $scope.ListCompany = res.data;
        $scope.tokenDataTicket = ItemsArrService.getCorredores();
        $scope.counttotal = $scope.tokenDataTicket.length;
//        $scope.tokenDataTicket = JSON.stringify(ItemsArrService.getCorredores());
//        if ($scope.tokenDataTicket != undefined || $scope.tokenDataTicket != '' || $scope.tokenDataTicket != null || $scope.tokenDataTicket != '{}') {
        ItemsArrService.setCorredores($scope.tokenDataTicket);
//        }

    });

    $scope.ticketview = function(){
        var token = localStorage.getItem("token");
        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
        $scope.Name = '';
        var Id = '';

        $scope.arrTicketPush = ItemsArrService.getCorredores();
        $scope.counttotal = $scope.arrTicketPush.length;
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

app.controller('LoginCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $ionicLoading) {

    $scope.signIn = function (data) {
        if (data) {
            if (data.username && data.password) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.post("http://192.168.1.33/mobile/UserApp/Loginapp", {API_ID: "KETAPI", username: data.username, password: data.password}).then(function (res) {
                    var bool = res.data.type;
                    $ionicLoading.hide();

                    if (bool == 'error') {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'Login Crash data'
                        });
                    } else if (bool != '') {
                        var boolData = JSON.stringify(res.data.dataUser);
                        localStorage.setItem("token", bool);
                        localStorage.setItem("tokenData", boolData);
                        // localStorage.setItem("permission", boolData);

                        var alertPopup = $ionicPopup.alert({
                            title: 'Notifications',
                            template: 'Login Success'
                        });
                        $state.go('app.home', {}, {reload: true});

                    }
                });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Notifications',
                    template: 'Please Complete'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'Notifications',
                template: 'Please Complete'
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
    $scope.counttotal = $scope.tokenDataTicket.length;
    $scope.ticketQRcode = function () {
        $state.go('app.ticketQRcode');
    };
    $scope.ticketview = function(){
        var token = localStorage.getItem("token");
        var tokenDataToTicket = JSON.parse(localStorage.getItem("tokenData"));
        $scope.Name = '';
        var Id = '';

        $scope.arrTicketPush = ItemsArrService.getCorredores();
        $scope.counttotal = $scope.arrTicketPush.length;
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

app.controller('TicketQRcodeCtrl', function ($scope, $http, $timeout, $ionicModal, $ionicPopup, $state, $cordovaBarcodeScanner, ItemsArrService) {
    $scope.scanBarcode = function () {
        $scope.tokenDataTicket = ItemsArrService.getCorredores();
        $cordovaBarcodeScanner.scan().then(function (imageData) {
//            alert(imageData.text);
            var str = imageData.text;
            var subStr = str.split('|');
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm Ticket',
                template: 'Company name : ' + subStr[1] + '<br>' + 'Ticket name : ' + subStr[2] + '<br>' + 'Price : ' + subStr[4] + ' Baht'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    var str = imageData.text;
                    var subStr = str.split('|');
                    $scope.tokenDataTicket.push({'id': subStr[0], 'name': subStr[2], 'price': subStr[4], 'priceSum': subStr[4], 'num': 1});
                    ItemsArrService.setCorredores($scope.tokenDataTicket);
                    $state.go('app.AppShopping', {'Id': 'QRcode'}, {reload: true});
//                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function (error) {
            console.log("An error happened -> " + error);
        });
    };

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

                    $http.post("http://192.168.1.33/mobile/Register/RegisterAPI", {API_ID: "KETAPI", namef: data.namef, namel: data.namel, mail: data.mail, phone: data.phone, password: data.password}).then(function (res) {

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

