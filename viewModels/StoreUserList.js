/**
 * storeUserListViewModel
 */

var app = app || {};

app.storeUserList = (function () {
    'use strict';
   
    var storeUserListViewModel = (function () {
        var masterAccountStoreId;
        var dsMyDatabase;


        var accountStoreUserInfoDatasource;
        var init = function () {
            var masterAccountObjInfo = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            masterAccountStoreId = masterAccountObjInfo.storeId;

            var isMasterAccountUserLoggedIn = app.helper.readFromLocalStorage("isMasterAccountUserLoggedIn");
            if (isMasterAccountUserLoggedIn === null || isMasterAccountUserLoggedIn != "true" || masterAccountStoreId === null || masterAccountObjInfo === null) {
                app.mobileApp.navigate("#ETrackingWaveHomeView");
            }
            else {
               
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
        };
        var show = function () {
            app.mobileApp.showLoading();
            var masterAccountObjInfoObject = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            if (masterAccountObjInfoObject != null || masterAccountObjInfoObject != "undefined") {
                var companyName = masterAccountObjInfoObject.store_name;
                $("#lblHeadingCompany").html(companyName + " Employee List");
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
                            dsMyDatabase = new kendo.data.DataSource.create({ data: result.d })
                            $("#lStoreUserListFilterable").data("kendoMobileListView").setDataSource(dsMyDatabase);
                        }
                        else {
                            app.mobileApp.hideLoading();
                            app.showAlert("Company Employee not Registered !", "Listing failed", 'OK');
                            app.mobileApp.navigate('\#Views/RegisterEmployees.html');
                        }
                    },
                    error: function (xhr, status, error) {
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

        }
        //var navigateBack = function () {
        //    app.mobileApp.navigate("Views/AccountDashboard.html");
        //}
        //var refreshPage = function () {
        //    //app.helper.reload();
        //    //window.location.reload();
        //}
       
        return {
            init: init,
            show: show,
           // refreshPage: refreshPage
            //navigateBack: navigateBack
        };
    }());

    return storeUserListViewModel;

}());
