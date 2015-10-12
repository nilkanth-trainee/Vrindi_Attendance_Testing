/**
 * accountDashboardViewModel
 */

var app = app || {};

app.storeAccountDashboard = (function () {
    'use strict';

    var masterAccountStoreId;
    var dsMyDatabase;
   
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

  
    var accountDashboardViewModel = (function () {

       
        var logout = function () {
            showConfirm();
        };
        var viewStatus = function () {
            app.mobileApp.navigate('\#views/ViewStatus.html');
        }
        var createEmployeeAccount = function () {
            app.mobileApp.navigate('\#views/RegisterEmployees.html');

        }
        var init = function () {
           app.mobileApp.showLoading();
           // var masterAccountObjInfoObject = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
           // if (masterAccountObjInfoObject != null || masterAccountObjInfoObject != "undefined") {
                //var companyName = masterAccountObjInfoObject.store_name;
                companyName ="Vrindi Inc."
               $("#lblHeadingCompany").html(companyName + " Employee List");
           // }
            
            //var ajaxURL = app.helper.ETrackingWaveApiURL("getStoreUser");
            //try {
            //    $.ajax({
            //        url: ajaxURL,
            //        dataType: "json",
            //        type: "POST",
            //        crossDomain: true,
            //        //data: "{storeId:'" + masterAccountStoreId + "'}",
            //        data: "{storeId:'0099EDE6-0849-41B8-A156-2BA9FC0BC2B0'}",
            //        contentType: 'application/json; charset=utf-8',
            //        success: function (result) {
            //            if (result != null && result.d != null && result.d[0] != null) {
            //                app.mobileApp.hideLoading();
            //                dsMyDatabase = new kendo.data.DataSource.create({ data: result.d, sort: [{ field: "userFullName", dir: "asc" }], })
            //                $("#lStoreUserListFilterable").data("kendoMobileListView").setDataSource(dsMyDatabase);
            //            }
            //            else {
            //                app.mobileApp.hideLoading();
            //                app.showAlert("Company Employee not Registered !", "Listing failed", 'OK');
            //                app.mobileApp.navigate('\#Views/RegisterEmployees.html');
            //            }
            //        },
            //        error: function (xhr, status, error) {
            //            if (xhr.responseText.length > 0) {
            //                app.showAlert(xhr.responseText);
            //            }
            //            else {
            //                app.showAlert("Connection Failed. Please try again");
            //            }
            //        }
            //    });
            //}
            //catch (ex) {
            //    app.mobileApp.hideLoading();
            //    console.log(ex.toString());
            //}

        }
        return {
            viewStatus: viewStatus,
            createEmployeeAccount: createEmployeeAccount,
            logout: logout,
            //show: show,
            init:init
        };

    }());

    return accountDashboardViewModel;

}());