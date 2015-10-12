//(function ($, console, doc) {
//    var ETrackingWaveApiURL = "ETrackingWaveApi/EtrackingWave.asmx/";
//    var loginViewModel, accountDashboardViewModel;

    
//    //(START) of LoginViewModel Region
//    loginViewModel = kendo.observable({
//        loginUserName: "",
//        loginPassword: "",
//        isValidUser: false,
//        isLoggedIn: false,
//        showInvalidUser: false,
//        writeIntoLocalStorage: function (loginUserName) {
//            //var dataToWrite = JSON.stringify(cardsViewModel.cards);
//            window.localStorage.setItem("masterAccountUserId", loginUserName);
//            // window.lo
//        },
//        onClickValidateUser: function () {
//            var that = this,
//              loginUserName = that.get("loginUserName").trim(),
//              loginPassword = that.get("loginPassword").trim();

//            if (loginUserName === "" || loginPassword === "") {
//                // navigator.notification.alert("Both fields are required!",
//                //   function () { }, "Login failed", 'OK');
//                alert("Both field Required");
//                return;
//            }
//            var ajaxURL = ETrackingWaveApiURL + "checkStoreAccount";
//            $.ajax({
//                url: ajaxURL,
//                type: "POST",
//                contentType: "application/json; charset=utf-8",
//                dataType: "json",
//                crossDomain: true,
//                // data:"'username'"
//                data: "{masterAccountEmailId:'" + loginUserName + "',masterAccountPassword:'" + loginPassword + "'}",
//                success: function (result) {
//                    // alert(result.d);
//                    if (result.d.toString() == "false") {
//                        that.set("isValidUser", false);
//                        that.set("isLoggedIn", false);
//                        // alert("no user");
//                    }
//                    else if (result.d.toString() == "true") {
//                        that.set("isValidUser", true);
//                        that.set("isLoggedIn", true);
//                        //alert("found user");
//                        that.writeIntoLocalStorage(loginUserName);
//                        app.navigate("Views/AccontDashboard.html");
//                    }
//                },
//                error: function () {
//                    alert('Something unexpected occurs,Please try after some time\n');
//                }
//            });

//            //that.set("isLoggedIn", true);
//        }
       
//    });
//    //(END) of LoginViewModel Region




//    //(START) of AccountDashboardViewModel Region
//    accountDashboardViewModel = kendo.observable({
//        writeIntoLocalStorage: function () {
//            //var dataToWrite = JSON.stringify(cardsViewModel.cards);
//            //window.localStorage.setItem("cards", dataToWrite);
//            // window.lo
//        },
//        onMarkEmployeeEntries: function () {
//            app.navigate("Views/StoreUserLogin.html");
//        },

//        onViewCurrentStaus: function () {
//            app.navigate("Views/ViewStatus.html");
//        },
//        onRegisterEmployee: function () {
//            app.navigate("Views/RegisterEmployees.html");
//        }
//    });
//    //(END) of AccountDashboardViewModel Region



//    //(START) of StoreEmployeeViewModel Region
//    StoreEmployeeViewModel = kendo.observable({
//        masterAccountUserId: "bgdf",
//        EmployeeUserName: "d",
//        EmployeeUserPassword:"dd",
//        storeUserList: new kendo.data.DataSource({
//            data: [{ field: "Thing 1", id: 1 }, { field: "Thing 2", id: 2 }, { field: "Thing 3", id: 3 }]
//        }),
        
//        loadFromLocalStorage: function () {
//            if (window.localStorage.getItem("masterAccountUserId") !== null) {
//                masterAccountUserId = window.localStorage.getItem("masterAccountUserId").toString();
//            }
//            that.set("masterAccountUserId", masterAccountUserId);
//        }
        
        
//        //init: function () {
//        //    var that = this;
//        //    var ajaxURL = ETrackingWaveApiURL + "getStoreUser";
//        //    $.ajax({
//        //        url: ajaxURL,
//        //        type: "POST",
//        //        contentType: "application/json; charset=utf-8",
//        //        dataType: "json",
//        //        crossDomain: true,
//        //        //data: "{storeId:'" + loginUserName+ "'}",
//        //        data: "{storeId:'2987FDF7-46AB-4FC7-B117-08EFAC2000A1'}",
//        //        success: function (result) {
//        //            //alert(result.d);
//        //            that.storeUserList.data.set(result.d);
//        //        },
//        //        error: function () {
//        //            alert('Something unexpected occurs,Please try after some time\n');
//        //        }
//        //    });

//        //},
        
//        //storeuserList: new kendo.data.DataSource({}),


//    });
//    //(END) of StoreEmployeeViewModel Region


//    //(START) of MarkEntreeViewModel Region
//    markEntreeViewModel = kendo.observable({
//        masterAccountUserId:"",
//        loadFromLocalStorage: function () {
            
//            if (window.localStorage.getItem("masterAccountUserId") !== null) {
//                masterAccountUserId = JSON.parse(window.localStorage.getItem("masterAccountUserId"));
//            }
//            that.set("masterAccountUserId", masterAccountUserId);
//        },
//        init: function () {
//            //var ajaxURL = ETrackingWaveApiURL + "getStoreUser";
//            //$.ajax({
//            //    url: ajaxURL,
//            //    type: "POST",
//            //    contentType: "application/json; charset=utf-8",
//            //    dataType: "json",
//            //    crossDomain: true,
//            //    // data:"'username'"
//            //    data: "{storeId:'" + loginUserName+ "'}",
//            //    success: function (result) {
//            //        alert(result.d);
//            //    },
//            //    error: function () {
//            //        alert('Something unexpected occurs,Please try after some time\n');
//            //    }
//            //});

//        },
//        //storeuserList: new kendo.data.DataSource({}),

       
//    });
//    //(END) of MarkEntreeViewModel Region



//    $.extend(window, {
//        loginViewModel: loginViewModel,
//        accountDashboardViewModel: accountDashboardViewModel,
//        StoreEmployeeViewModel:StoreEmployeeViewModel,
//        markEntreeViewModel: markEntreeViewModel
//    });
//})(jQuery, console, document);