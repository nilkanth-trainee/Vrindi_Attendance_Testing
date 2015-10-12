/**
 * accountDashboardViewModel
 */

var app = app || {};

app.storeAdminAccountDashboard = (function () {
    'use strict';
    var masterAccountStoreId, isMasterAccountUserLoggedIn, $storeAdminPassword;
    var dsMyDatabase;
    


    function getStoreUserList() {
        

    }

    function onConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            app.helper.deleteFromLocalStorage("masterAccountUserName");
            app.helper.deleteFromLocalStorage("isMasterAccountUserLoggedIn");
            app.helper.deleteFromLocalStorage("accountStoreInfoDatasource");
            app.mobileApp.navigate('\#ETrackingWaveHomeView');
        }
    }
    function showConfirm() {
        if (app.helper.appmode) {
            navigator.notification.confirm(
                'Are you sure you want to log out ?', // message
                 onConfirm,            // callback to invoke with index of button pressed
                'Log Out',           // title
                ['Yes', 'Cancel']         // buttonLabels
            );
        }
        else {
            app.helper.deleteFromLocalStorage("masterAccountUserName");
            app.helper.deleteFromLocalStorage("isMasterAccountUserLoggedIn");
            app.helper.deleteFromLocalStorage("accountStoreInfoDatasource");
            app.mobileApp.navigate('\#ETrackingWaveHomeView');
        }
    }
    var storeAdminAccountDashboardViewModel = (function () {
        var init = function () {
            $storeAdminPassword = $("#txtStoreAdminPassword");
            isMasterAccountUserLoggedIn = app.helper.readFromLocalStorage("isMasterAccountUserLoggedIn");
            if (isMasterAccountUserLoggedIn != null && isMasterAccountUserLoggedIn.length > 0 && isMasterAccountUserLoggedIn == 'true') {
                $("#lStoreUserListFilterable").kendoMobileListView({
                    template: $("#myStoreUserListTemplate").text(),
                    style: "inset",
                    filterable: {
                        field: "userFullName",
                        ignoreCase: true,
                        operator: "contains",
                        placeholder: "Select Your Name",
                    }
                });
            }
            else {

                app.mobileApp.navigate("#ETrackingWaveHomeView");
            }
            
            
        };

        var show = function () {
            checkauth();
            $storeAdminPassword.val('');
            app.mobileApp.showLoading();
            var masterAccountObjInfoObject = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            if (masterAccountObjInfoObject != null || masterAccountObjInfoObject != "undefined") {
                var companyName = masterAccountObjInfoObject.store_name;
                $("#lblHeadingCompany").html(companyName + " Employee List");
                masterAccountStoreId = masterAccountObjInfoObject.storeId;
            }
            var ajaxURL = app.helper.ETrackingWaveApiURL("getStoreUser");
            try {
                $.ajax({
                    url: ajaxURL,
                    dataType: "json",
                    type: "POST",
                    crossDomain: true,
                    data: "{storeId:'" + masterAccountStoreId + "'}",
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        if (result != null && result.d != null && result.d[0] != null) {
                            app.mobileApp.hideLoading();
                            dsMyDatabase = new kendo.data.DataSource.create({ data: result.d, sort: [{ field: "userFullName", dir: "asc" }], })
                            $("#lStoreUserListFilterable").data("kendoMobileListView").setDataSource(dsMyDatabase);
                        }
                        else {
                            app.mobileApp.hideLoading();
                            app.showAlert("Company Employee not Registered !", "Listing failed", 'OK');
                            app.mobileApp.navigate('views/RegisterEmployees.html');
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
                console.log(ex.toString());
            }
        };
        var logout = function () {
            showConfirm();
        };
        var checkauth = function () {
            isMasterAccountUserLoggedIn = app.helper.readFromLocalStorage("isMasterAccountUserLoggedIn");
            if (isMasterAccountUserLoggedIn != null && isMasterAccountUserLoggedIn.length > 0 && isMasterAccountUserLoggedIn=='true')
            {
            }
            else
            {
                app.mobileApp.navigate("#ETrackingWaveHomeView");
            }
        };


        var markEntrees = function () {
            app.mobileApp.navigate('\#views/StoreUserList.html');
        }
        var viewStatus = function () {
            app.mobileApp.navigate('\#views/ViewStatus.html');
        }
        var createEmployeeAccount = function () {
            app.mobileApp.navigate('\#views/RegisterEmployees.html');

        }
        var onOpenAdminVerificationPanel = function () {
            $("#txtStoreAdminPassword").val('');
            $("#leftSidePanel").data('kendoMobileDrawer').hide();
        }
        var onLoginAdminClick = function () {
            
            app.mobileApp.showLoading();
            var masterAccountUserName = app.helper.readFromLocalStorage("masterAccountUserName");
            var storeAdminPassword = $storeAdminPassword.val();
            if (storeAdminPassword === "") {
                app.mobileApp.hideLoading();
                app.showAlert("Please enter your password", "Admin Login failed", 'OK');
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
                    data: "{masterAccountEmailId:'" + masterAccountUserName + "',masterAccountPassword:'" + storeAdminPassword + "'}",
                    success: function (result) {
                        if (result != null && result.d != null && result.d['isValidAccount'] != null) {
                            if (result.d['isValidAccount'].toString() == 'true') {
                                app.helper.writeIntoLocalStorage("isStoreAdminPanelLoginVerified", "true");
                                app.mobileApp.navigate('views/StoreAccountDashboard.html');
                                app.mobileApp.hideLoading();
                            }
                            else {
                                app.mobileApp.hideLoading();
                                app.showAlert("Invalid login credentials !!", "Admin Login failed", 'OK');
                            }
                        }
                        else {
                            app.mobileApp.hideLoading();
                            app.showAlert("Invalid login credentials !!", "Admin Login failed", 'OK');

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
        }
        

        return {
            init: init,
            show: show,
            markEntrees: markEntrees,
            viewStatus: viewStatus,
            createEmployeeAccount: createEmployeeAccount,
            logout: logout,
            checkauth: checkauth,
            onLoginAdminClick: onLoginAdminClick,
            onOpenAdminVerificationPanel: onOpenAdminVerificationPanel
        };

    }());

    return storeAdminAccountDashboardViewModel;

}());