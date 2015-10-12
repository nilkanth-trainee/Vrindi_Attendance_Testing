/**
 * storeInfoViewModel
 */

var app = app || {};

app.storeInfo = (function () {
    'use strict';
  
    var storeInfoViewModel = (function () {

        var $loginStoreUsername, $loginStoreUserFullName, $loginStoreUserId, $loginStorePassword;
        var masterAccountStoreId;

        var init = function () {
            var masterAccountObjInfo = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            masterAccountStoreId = masterAccountObjInfo.storeId;
            var isMasterAccountUserLoggedIn = app.helper.readFromLocalStorage("isMasterAccountUserLoggedIn");
            if (isMasterAccountUserLoggedIn === null || isMasterAccountUserLoggedIn != "true" || masterAccountStoreId === null || masterAccountObjInfo === null) {
                app.mobileApp.navigate("#ETrackingWaveHomeView");
            }
        };
    /*    var login = function () {
            var password = $loginStorePassword.val();
            app.mobileApp.showLoading();
            if (password === "") {
                app.showAlert("Password is Required", "Employee Login failed", 'OK');
                app.mobileApp.hideLoading();
                return;
            }
            var ajaxURL = app.helper.ETrackingWaveApiURL("checkStoreUserAccount");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{storeUserId:'" + $loginStoreUserId + "',storeUserPassword:'" + password + "',masterAccountstoreId:'" + masterAccountStoreId + "'}",
                    success: function (result) {
                        if (result.d.toString() == "false") {
                            app.mobileApp.hideLoading();
                            app.showAlert("Invalid Credentials", "Employee Login failed", 'OK');

                        }
                        else if (result.d.toString() == "true") {
                            app.mobileApp.hideLoading();
                            app.mobileApp.navigate('\#views/MarkEntries.html?suid=' + $loginStoreUserId + '&suname=' + $loginStoreUserFullName);
                        }
                    },
                    error: function (xhr, status, error) {
                        hideLoader();
                        if (xhr.responseText.length > 0) {
                            app.showAlert(xhr.responseText);
                        }
                        else {
                            app.showAlert("Connection Failed. Please try again");
                        }

                    }
                });
            }
            catch (ex) {
                app.showAlert("Connection Failed. Please try again");
            }
        };
        */
         var gridButtonClick = function (e) {
            var prm = e.button.data();
            var userButtonClickValue = prm.number.toString();
            if (userButtonClickValue != 'b')
            {
                var pwdDifgits = $loginStorePassword.val().toString() + userButtonClickValue;
                $loginStorePassword.val(pwdDifgits);
            }
            if (userButtonClickValue === 'b')
            {
                var extractedText = $loginStorePassword.val().toString().substring(0, $loginStorePassword.val().toString().length-1);
                $loginStorePassword.val(extractedText);
            }
            if ($loginStorePassword.val().length >=4)
            {               
                app.mobileApp.showLoading();
                var ajaxURL = app.helper.ETrackingWaveApiURL("checkStoreUserAccount");
                try {
                    $.ajax({
                        url: ajaxURL,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        data: "{storeUserId:'" + $loginStoreUserId + "',storeUserPassword:'" + $loginStorePassword.val() + "',masterAccountstoreId:'" + masterAccountStoreId + "'}",
                        success: function (result) {
                            if (result.d.toString() == "false") {
                                app.mobileApp.hideLoading();
                                $loginStorePassword.val('');
                                app.showAlert("Invalid Credentials", "Employee Login failed", 'OK');

                            }
                            else if (result.d.toString() == "true") {
                                app.mobileApp.hideLoading();
                                app.mobileApp.navigate('\#views/MarkEntries.html?suid=' + $loginStoreUserId + '&suname=' + $loginStoreUserFullName);
                            }
                        },
                        error: function (xhr, status, error) {
                            hideLoader();
                            if (xhr.responseText.length > 0) {
                                app.showAlert(xhr.responseText);
                            }
                            else {
                                app.showAlert("Connection Failed. Please try again");
                            }

                        }
                    });
                }
                catch (ex) {
                    app.showAlert("Connection Failed. Please try again");
                }
            }
         };
         var viewPassword = function (e) {
             var isShowPassword = e.checked ? "true" : "false";
             if (isShowPassword == "true") {
                 $($loginStorePassword).attr('type', 'text');
             }
             else {
                 $($loginStorePassword).attr('type', 'password');
             }
         }
         var clearPasswordField = function (e) {
             $loginStorePassword.val('');
         }
         var show = function (e) {
            var p = e.view.params;
            $loginStorePassword = $('#loginStorePassword');
            $loginStorePassword.val('');
            $loginStoreUserFullName = p.suname;
            $loginStoreUserId = p.suid;
            $('#storeUserTitle').html("Name : <strong>" + $loginStoreUserFullName + "</strong>");

        };
      
        return {
            init: init,
            show: show,
            gridButtonClick: gridButtonClick,
            viewPassword: viewPassword,
            clearPasswordField: clearPasswordField
           // login: login
        };

    }());

    return storeInfoViewModel;

}());