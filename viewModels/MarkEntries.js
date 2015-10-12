/**
 * MarkUserEntry View Model
 */

var app = app || {};

app.MarkUserEntry = (function () {
    'use strict';

    var $storeEmployeeId, $storeId, $breakEntryDescription, $breakEntryType, $loginStoreUsername;
    var $BreakBeginEntryButton, $BreakEndEntryButton, $DayBeginEntryButton, $DayEndEntryButton;

    function onConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    function showConfirm() {
        if (app.helper.appmode) {
            navigator.notification.confirm(
                'Are you sure you want to Save End of Day Entry ?', // message
                 onConfirm,            // callback to invoke with index of button pressed
                'Log Out',           // title
                ['Yes', 'Cancel']         // buttonLabels
            );
        }
        else {
            var retVal = confirm("Are you sure you want to Save End of Day Entry ?");
            if (retVal == true) {
                return true;
            }
            else {
                return false;
            }
           
        }
    }

    function setEntryButtons(lastEntryType) {
        //alert(lastEntryType);
        if (lastEntryType == "NE") {
            $($DayBeginEntryButton).removeClass("hideEntryButtons");
            $($DayBeginEntryButton).addClass("showEntryButtons");

            $($DayEndEntryButton).removeClass("showEntryButtons");
            $($DayEndEntryButton).addClass("hideEntryButtons");

            $($BreakBeginEntryButton).removeClass("showEntryButtons");
            $($BreakBeginEntryButton).addClass("hideEntryButtons");

            $($BreakEndEntryButton).removeClass("showEntryButtons");
            $($BreakEndEntryButton).addClass("hideEntryButtons");
        }
        else if (lastEntryType == "BE") {
            $($DayBeginEntryButton).removeClass("showEntryButtons");
            $($DayBeginEntryButton).addClass("hideEntryButtons");

            $($DayEndEntryButton).removeClass("showEntryButtons");
            $($DayEndEntryButton).addClass("hideEntryButtons");

            $($BreakBeginEntryButton).removeClass("showEntryButtons");
            $($BreakBeginEntryButton).addClass("hideEntryButtons");

            $($BreakEndEntryButton).removeClass("hideEntryButtons");
            $($BreakEndEntryButton).addClass("showEntryButtons");
        }
        else if (lastEntryType == "DB") {
            $($DayBeginEntryButton).removeClass("showEntryButtons");
            $($DayBeginEntryButton).addClass("hideEntryButtons");

            $($DayEndEntryButton).removeClass("hideEntryButtons");
            $($DayEndEntryButton).addClass("showEntryButtons");

            $($BreakBeginEntryButton).removeClass("hideEntryButtons");
            $($BreakBeginEntryButton).addClass("showEntryButtons");

            $($BreakEndEntryButton).removeClass("showEntryButtons");
            $($BreakEndEntryButton).addClass("hideEntryButtons");
        }
        else if (lastEntryType == "DE") {
            $($DayBeginEntryButton).removeClass("showEntryButtons");
            $($DayBeginEntryButton).addClass("hideEntryButtons");

            $($DayEndEntryButton).removeClass("showEntryButtons");
            $($DayEndEntryButton).addClass("hideEntryButtons");

            $($BreakBeginEntryButton).removeClass("showEntryButtons");
            $($BreakBeginEntryButton).addClass("hideEntryButtons");

            $($BreakEndEntryButton).removeClass("showEntryButtons");
            $($BreakEndEntryButton).addClass("hideEntryButtons");

            $('#lblHeading').html("<strong>" + $loginStoreUsername + "</strong>, Thankyou for Marking all your entries of today");


        }
        else if (lastEntryType == "BEnd") {
            $($DayBeginEntryButton).removeClass("showEntryButtons");
            $($DayBeginEntryButton).addClass("hideEntryButtons");

            $($DayEndEntryButton).removeClass("hideEntryButtons");
            $($DayEndEntryButton).addClass("showEntryButtons");

            $($BreakBeginEntryButton).removeClass("hideEntryButtons");
            $($BreakBeginEntryButton).addClass("showEntryButtons");

            $($BreakEndEntryButton).removeClass("showEntryButtons");
            $($BreakEndEntryButton).addClass("hideEntryButtons");
        }
    }

    var MarkEntryViewModel = (function () {
        var dsMyDatabase;

        var onBreakLunchEntryType = function () {
            $breakEntryType = "Lunch";
            onMarkBreakEntry();
        }
        var onBreakOfficeEntryType = function () {
            $breakEntryType = "Office Work";
            onMarkBreakEntry();
        }
        var onBreakElectrictyOutage = function () {
            $breakEntryType = "Electricity Outage";
            onMarkBreakEntry();
        }
        var onBreakPersonalEntryType = function () {
            $breakEntryType = "Personal";
            onMarkBreakEntry();
        }

        var init = function (e) {
            //onGetCurrentDayStoreUserEntry();
        };
        var onGetCurrentDayStoreUserEntry = function () {
            app.mobileApp.showLoading();
            var lastEntryType;
            var ajaxURL = app.helper.ETrackingWaveApiURL("getStoreUserCurrentDayLatestEntry");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId +"',sortingType:'desc'}",
                    success: function (result) {

                        if (result != null && result.d != null && result.d[0] != null) {
                            lastEntryType = result.d[0].EntryType;
                            $("#divNoEntriesFond").removeClass("showEntryButtons");
                            $("#divNoEntriesFond").addClass("hideEntryButtons");
                            $("#lmyEntries").removeClass("hideEntryButtons");
                            $("#lmyEntries").addClass("showEntryButtons");
                            dsMyDatabase = new kendo.data.DataSource.create({ data: result.d, sort: [{ field: "EntryDateTime", dir: "asc" }], })
                            console.log(dsMyDatabase);
                            $("#lmyEntries").kendoMobileListView({
                                dataSource: dsMyDatabase,
                                template: $("#myEntriesTemplate").text(),
                                style: "inset",
                                sort: [{ field: "EntryDateTime", dir: "desc" }],
                            });
                        }
                        else {
                            lastEntryType = "NE";
                            $('#lblHeading').html("<strong>" + $loginStoreUsername + "</strong>, Please Mark your selection !!");
                            $("#divNoEntriesFond").removeClass("hideEntryButtons");
                            $("#divNoEntriesFond").addClass("showEntryButtons");
                            $("#lmyEntries").removeClass("showEntryButtons");
                            $("#lmyEntries").addClass("hideEntryButtons");
                        }
                        setEntryButtons(lastEntryType);
                        app.mobileApp.hideLoading();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
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
     /*   var showUserEntryDetails = function () {
            app.mobileApp.showLoading();
            var lastEntryType;
            var ajaxURL = app.helper.ETrackingWaveApiURL("getStoreUserCurrentDayLatestEntry");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId + "',sortingType:'asc'}",
                    success: function (result) {

                        if (result != null && result.d != null && result.d[0] != null) {
                           
                            lastEntryType = result.d[0].EntryType;
                            $("#divNoEntriesFond").removeClass("showEntryButtons");
                            $("#divNoEntriesFond").addClass("hideEntryButtons");
                            $("#lmyEntries").removeClass("hideEntryButtons");
                            $("#lmyEntries").addClass("showEntryButtons");
                            dsMyDatabase = new kendo.data.DataSource.create({ data: result.d })
                            $("#lmyEntries").kendoMobileListView({
                                dataSource: dsMyDatabase,
                                template: $("#myEntriesTemplate").text(),
                                style: "inset",
                            });
                        }
                        else {
                            lastEntryType = "NE";
                            $("#divNoEntriesFond").removeClass("hideEntryButtons");
                            $("#divNoEntriesFond").addClass("showEntryButtons");
                            $("#lmyEntries").removeClass("showEntryButtons");
                            $("#lmyEntries").addClass("hideEntryButtons");
                        } 
                        app.mobileApp.hideLoading();
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        app.mobileApp.hideLoading();
                        app.showError("Please check your network connection.")
                    }
                });
            }
            catch (ex) {
                app.mobileApp.hideLoading();
                app.showError("Please check your network connection.")
                console.log(ex.toString());
            }
        };*/
        var onMarkDayBeginEntry = function () {
            app.mobileApp.showLoading();
            var ajaxURL = app.helper.ETrackingWaveApiURL("insertStoreUserCurrentDayEntry");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId + "',entryType:'" + "DB" + "',entryDescription:'" + "DayBeginEntry" + "'}",
                    success: function (result) {
                        setEntryButtons("DB");
                        app.mobileApp.hideLoading();
                        app.showAlert("Your Entry saved successfully..", "Day Check-In Entry", 'OK');
                       app.mobileApp.navigate('\#views/AccountDashboard.html'); 

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
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
        var onMarkBreakEntry = function () {
            app.mobileApp.showLoading();
            var ajaxURL = app.helper.ETrackingWaveApiURL("insertStoreUserCurrentDayEntry");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId + "',entryType:'" + "BE" + "',entryDescription:'" + $breakEntryType + "'}",
                    success: function (result) {
                        setEntryButtons("BE");
                        app.mobileApp.hideLoading();
                        app.showAlert("Your Entry saved successfully..", "Break Check-In Entry", 'OK');
                       app.mobileApp.navigate('\#views/AccountDashboard.html'); 
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
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
        var onMarkBreakEndEntry = function () {
            app.mobileApp.showLoading();
            var ajaxURL = app.helper.ETrackingWaveApiURL("insertStoreUserCurrentDayEntry");
            try {
                $.ajax({
                    url: ajaxURL,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId + "',entryType:'" + "BEnd" + "',entryDescription:'" + $breakEntryType + "'}",
                    success: function (result) {
                        setEntryButtons("BEnd");
                        app.mobileApp.hideLoading();
                        app.showAlert("Your Entry saved successfully..", "Break Check-Out Entry", 'OK');
                       app.mobileApp.navigate('\#views/AccountDashboard.html'); 
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
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
        var onMarkEndDayEntry = function () {
            var isEndEntryMarkedTrue = showConfirm();
            alert(isEndEntryMarkedTrue)
            if (isEndEntryMarkedTrue) {
                app.mobileApp.showLoading();
                var ajaxURL = app.helper.ETrackingWaveApiURL("insertStoreUserCurrentDayEntry");
                try {
                    $.ajax({
                        url: ajaxURL,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        data: "{masterAccountStoreId:'" + $storeId + "',storeUserId:'" + $storeEmployeeId + "',entryType:'" + "DE" + "',entryDescription:'" + "DayEndEntry" + "'}",
                        success: function (result) {
                            setEntryButtons("DE");
                            app.mobileApp.hideLoading();
                            app.showAlert("Your Entry saved successfully..", "Day Check-Out Entry", 'OK');
                            app.mobileApp.navigate('\#views/AccountDashboard.html');
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
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
        };
     
        var show = function (e) {
            $BreakBeginEntryButton, $BreakEndEntryButton, $DayBeginEntryButton, $DayEndEntryButton;
            $BreakEndEntryButton = $('#btnBreakEnd');
            $BreakBeginEntryButton = $('#divBreakEntryOptionsContainer');
            $DayBeginEntryButton = $('#btnDayBegin');
            $DayEndEntryButton = $('#btnDayEnd');

            var p = e.view.params;
            $storeEmployeeId = p.suid;
            $loginStoreUsername = p.suname;
            $('#lblHeading').html("<strong>" + $loginStoreUsername + "</strong>, Please Mark your selection !!");

            var masterAccountObjInfo = JSON.parse(app.helper.readObjectFromLocalStorage("accountStoreInfoDatasource"));
            $storeId = masterAccountObjInfo.storeId;
            onGetCurrentDayStoreUserEntry();
        };
        var logout = function () {
            app.mobileApp.navigate("\#views/StoreUserList.html");
        };


        return {
            init: init,
            show: show,
            logout: logout,
            onMarkDayBeginEntry: onMarkDayBeginEntry,
            onMarkBreakEntry: onMarkBreakEntry,
            onMarkEndDayEntry: onMarkEndDayEntry,
            onBreakLunchEntryType: onBreakLunchEntryType,
            onBreakPersonalEntryType: onBreakPersonalEntryType,
            onBreakOfficeEntryType: onBreakOfficeEntryType,
            onGetCurrentDayStoreUserEntry: onGetCurrentDayStoreUserEntry,
            onMarkBreakEndEntry: onMarkBreakEndEntry,
            onBreakElectrictyOutage: onBreakElectrictyOutage
            //showUserEntryDetails: showUserEntryDetails

        };

    }());

    return MarkEntryViewModel;

}());
