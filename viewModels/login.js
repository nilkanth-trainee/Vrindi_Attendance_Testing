/**
 * Login view model
 */

var app = app || {};

app.Login = (function () {
    'use strict';

    var loginViewModel = (function () {

        var $loginUsername,$loginPassword;
        var accountStoreInfoDatasource;

        var init = function () {
            $loginUsername = $('#loginUserName');
            $loginPassword = $('#loginPassword');
        };

        var show = function () {
            $loginUsername.val('');
            $loginPassword.val('');
        };

        var login = function () {

            var username = $loginUsername.val();
            var password = $loginPassword.val();
            app.mobileApp.showLoading();

            if (username === "" || password === "") {
                app.mobileApp.hideLoading();
                app.showAlert("Please enter both username and password", "Login failed", 'OK');
                return;
            }
            var validator = $("#loginUserName").kendoValidator(
                {
                    messages: {
                        email: "",
                        required: ""
                        //email: "Please enter a valid Email Address" uncomment this only when msg is to be displayed on form
                    }
                }
             ).data("kendoValidator");

            if (!validator.validate()) {
                app.mobileApp.hideLoading();
                app.showAlert("Please enter valid E-mail address !!", "Login failed", 'OK');
                return;
            }

            var ajaxURL = app.helper.ETrackingWaveApiURL("checkStoreAccount");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountEmailId:'" + username + "',masterAccountPassword:'" + password + "'}",
                    success: function (result) {
                        if (result != null && result.d != null && result.d['isValidAccount'] != null) {
                            if (result.d['isValidAccount'].toString() == 'true') {
                                app.helper.writeIntoLocalStorage("masterAccountUserName", username);
                                app.helper.writeIntoLocalStorage("isMasterAccountUserLoggedIn", "true");
                                app.helper.writeObjectIntoLocalStorage("accountStoreInfoDatasource", result.d);
                                app.mobileApp.navigate('views/AccountDashboard.html');
                                app.mobileApp.hideLoading();
                            }
                            else {
                                app.mobileApp.hideLoading();
                                app.showAlert("Invalid login credentials !!", "Login failed", 'OK');
                            }
                        }
                        else {
                            app.mobileApp.hideLoading();
                            app.showAlert("Invalid login credentials !!", "Login failed", 'OK');

                        }

                    },
                    error: function (xhr, status, error) {
                        app.mobileApp.hideLoading();
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
                app.mobileApp.hideLoading();
                app.showAlert("Connection Failed. Please try again");
            }
        };



        return {
            init: init,
            show: show,
            login: login,
        };

    }());

    return loginViewModel;

}());
