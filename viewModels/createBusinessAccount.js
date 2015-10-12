/**
 * businessAccountViewModel
 */

var app = app || {};

app.businessAccount = (function () {
    'use strict';
    //  var ETrackingWaveApiURL = "http://etrackingwave.webondemo.com/ETrackingWaveApi/EtrackingWave.asmx/";
    var businessAccountViewModel = (function () {

        var $loginBusinessUsername, $loginBusinessPassword, $businessName, $businessTimeZone;

        var init = function () {
            $loginBusinessUsername = $('#loginBusinessUserName');
            $loginBusinessPassword = $('#loginBusinessPassword');
            $businessName = $('#companyName');
            $businessTimeZone = $('#selectTimeZone');
        };
        var onSelectChange = function (sel) {
            var selected = sel.options[sel.selectedIndex].value;
            sel.style.color = (selected === 0) ? '#b6c5c6' : '#34495e';
            console.log(selected);
        }
        var show = function () {
            $loginBusinessUsername.val('');
            $loginBusinessPassword.val('');
            $businessName.val('');
            // $businessTimeZone.val('');
        };

        // Authenticate to use Backend Services as a particular user
        var createBusinessAccount = function () {

            var username = $loginBusinessUsername.val();
            var password = $loginBusinessPassword.val();
            var businessName = $businessName.val();
            var selectedTimeZone = $businessTimeZone.val();
            app.mobileApp.showLoading();

            if (businessName === "") {
                app.mobileApp.hideLoading();
                // navigator.notification.alert("Please enter Company Name!",
                //   function () { }, "Login failed", 'OK');
                //alert("Please enter Company Name");
                app.showAlert("Please enter Company Name.", "Registration failed", 'OK');
                return;
            }
            if (username === "") {
                app.mobileApp.hideLoading();
                // navigator.notification.alert("Please enter a Email-Id for your company account!",
                //   function () { }, "Login failed", 'OK');
                // alert("Please enter a Email-Id for your company account");
                app.showAlert("Please enter a Email-Id for your company account.", "Registration failed", 'OK');

                return;
            }
            var validator = $("#loginBusinessUserName").kendoValidator(
               {
                   messages: {
                       email: "",
                       //email: "Please enter a valid Email Address" uncomment this only when msg is to be displayed on form
                   }
               }
            ).data("kendoValidator");

            if (!validator.validate()) {
                app.mobileApp.hideLoading();
                // navigator.notification.alert("Please enter valid E-mail address for your company account !!",
                //   function () { }, "Login failed", 'OK');
                //alert("Please enter valid E-mail address for your company account !!");
                app.showAlert("Please enter valid E-mail address for your company account.", "Registration failed", 'OK');

                return;
            }

            if (password === "") {
                app.mobileApp.hideLoading();
                // navigator.notification.alert("Please enter both username and password!",
                //   function () { }, "Login failed", 'OK');
                // alert("Please enter a password for your company account");
                app.showAlert("Please enter a password for your company account.", "Registration failed", 'OK');

                return;
            }

            
            if (selectedTimeZone === "") {
                app.mobileApp.hideLoading();
                // navigator.notification.alert("Please select time zone of your location!",
                //   function () { }, "Login failed", 'OK');
                //alert("Please select time zone of your location");
                app.showAlert("Please select time zone of your location.", "Registration failed", 'OK');

                return;
            }

            //var ajaxURL = ETrackingWaveApiURL + "checkStoreAccount";
            var ajaxURL = app.helper.ETrackingWaveApiURL("checkStoreAccountExist");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountEmailId:'" + username + "'}",
                    success: function (result) {
                        if (result.d.toString() == "true") {
                            app.mobileApp.hideLoading();
                            // navigator.notification.alert("Company Account with same Email-id already Exist..!",
                            //   function () { }, "Login failed", 'OK
                            //alert("Company Account with same Email-id already Exist.. !");
                            app.showAlert("Company Account with same Email-id already Exist.. !", "Registration failed", 'OK');

                        }
                        else if (result.d.toString() == "false") {
                            app.mobileApp.hideLoading();
                            //alert("You can create account");
                            /**START of region for creating company account**/
                            var ajaxURL = app.helper.ETrackingWaveApiURL("createBusinessAccount");
                            try {
                                $.ajax({
                                    url: ajaxURL,
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    crossDomain: true,
                                    data: "{masterAccountEmailId:'" + username + "',masterAccountPassword:'" + password + "',masterAccountName:'" + businessName +"',masterAccountTimeZone:'" + selectedTimeZone +"'}",
                                    success: function () {
                                        app.mobileApp.hideLoading();
                                        // navigator.notification.alert("Your Company Account created successfully..,Please check your registered inbox for details",
                                        //   function () { }, "Registered Successfully", 'OK
                                        // alert("Your Company Account created successfully..,Please check your registered inbox for details");
                                        app.showAlert("Your Company Account created successfully..,Please check your registered inbox for details.. !", "Registred Successfully", 'OK');
                                        app.mobileApp.navigate('#ETrackingWaveHomeView');

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
                                //console.log(ex.toString());
                            }
                            /**END region **/
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        app.mobileApp.hideLoading();
                        //app.showError("Please check your network connection.")
                        app.showError("Whoops !! Something wrong occured,Please try again.")

                    }
                });
            }
            catch (ex) {
                app.mobileApp.hideLoading();
                //console.log(ex.toString());
                app.showError(ex.toString());
            }
        };



        return {
            init: init,
            show: show,
            createBusinessAccount: createBusinessAccount,
            onSelectChange: onSelectChange
        };

    }());

    return businessAccountViewModel;

}());
