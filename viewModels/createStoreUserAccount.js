/*

storeUserAccountViewModel*/

var app = app || {};

app.storeUserAccount = (function () {
    'use strict';

    var storeUserAccountViewModel = (function () {

        var $storeUserUserName, $storeUserPassword, $storeUserFullName;
        var masterAccountStoreId;
        var init = function () {
            $storeUserUserName = $('#storeUserUserName');
            $storeUserPassword = $('#storeUserPassword');
            $storeUserFullName = $('#storeUserFullName');
           
        };
      
        var show = function () {
            $storeUserUserName.val('');
            $storeUserPassword.val('');
            $storeUserFullName.val('');
           
        };

        // Authenticate to use Backend Services as a particular user
        var createStoreUserAccount = function () {
            var username = $storeUserUserName.val();
            var password = $storeUserPassword.val();
            var storeUserFullName = $storeUserFullName.val();
            app.mobileApp.showLoading();

            if (storeUserFullName === "") {
                app.mobileApp.hideLoading();
                app.showAlert("Employee FullName is required.", "Employee Registration Failed", 'OK');
                return;
            }
            if (username === "") {
                app.mobileApp.hideLoading();
                app.showAlert("Email-id is required", "Employee Registration Failed", 'OK');
                return;
            }
            var validator = $("#storeUserUserName").kendoValidator(
               {
                   messages: {
                       email: "",
                       //email: "Please enter a valid Email Address" uncomment this only when msg is to be displayed on form
                   }
               }
            ).data("kendoValidator");

            if (!validator.validate()) {
                app.mobileApp.hideLoading();
                app.showAlert("Please enter valid Employee E-mail address.", "Employee Registration Failed", 'OK');
                return;
            }

            if (password === "") {
                app.mobileApp.hideLoading();
                app.showAlert("Password is required.", "Employee Registration Failed", 'OK');

                return;
            }


            var masterAccountObjInfo = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            masterAccountStoreId = masterAccountObjInfo.storeId;
            // alert(masterAccountStoreId)
            var isMasterAccountUserLoggedIn = app.helper.readFromLocalStorage("isMasterAccountUserLoggedIn");
            if (isMasterAccountUserLoggedIn === null || isMasterAccountUserLoggedIn != "true" || masterAccountStoreId === null || masterAccountObjInfo === null) {
                app.mobileApp.navigate("#ETrackingWaveHomeView");
            }
            else {
               
                try {
                   
                }
                catch (ex) {
                    app.mobileApp.hideLoading();
                    console.log(ex.toString());
                }
            }
                                   

            //var ajaxURL = ETrackingWaveApiURL + "checkStoreAccount";
            var ajaxURL = app.helper.ETrackingWaveApiURL("checkStoreUserAccountExist");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{storeUserEmailId:'" + username + "',masterAccountstoreId:'" + masterAccountStoreId + "'}",
                    success: function (result) {
                        if (result.d.toString() == "true") {
                            app.mobileApp.hideLoading();
                            app.showAlert("Employee with same account already registered in your account.", "Employee Registration Failed", 'OK');
                        }
                        else if (result.d.toString() == "false") {
                            app.mobileApp.hideLoading();
                            var ajaxURL = app.helper.ETrackingWaveApiURL("createStoreUserAccount");
                            try {
                                $.ajax({
                                    url: ajaxURL,
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    crossDomain: true,
                                    data: "{storeUserEmailId:'" + username + "',storeUserPassword:'" + password + "',storeUserFullName:'" + storeUserFullName + "',masterAccountstoreId:'" + masterAccountStoreId + "'}",
                                    success: function () {
                                        app.mobileApp.hideLoading();
                                        app.showAlert("Employee Registered Successfully..,Please check your registered inbox for details.", "Employee Registrated Successfully", 'OK');
                                        app.mobileApp.navigate('#ETrackingAccountDashboard');
                                      
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        app.mobileApp.hideLoading();
                                        app.showError("Whoops !! Something wrong occured,Please try again.")
                                    }
                                });
                            }
                            catch (ex) {
                                app.mobileApp.hideLoading();
                                app.showError(ex.toString());
                            }
                            /**END region **/
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        app.mobileApp.hideLoading();
                        app.showError("Whoops !! Something wrong occured,Please try again.")
              
                    }
                });
            }
            catch (ex) {
                app.mobileApp.hideLoading();
                app.showError(ex.toString());
            }
        };
        
        return {
            init: init,
            show: show,
            createStoreUserAccount: createStoreUserAccount,
        };

    }());

    return storeUserAccountViewModel;

}());
