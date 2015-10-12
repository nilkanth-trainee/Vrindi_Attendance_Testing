var app = (function (win) {

    'use strict';

    var appmode = true;

    var showAlert = function (message, title, buttonName) {
        if (appmode)
            showNativeNotificationAlert(message, title, buttonName);
        else
            alert(message);
    };

    var showNativeNotificationAlert = function (message, title, buttonName) {
        if (title == null) title = "Whoops!";
        if (buttonName == null) buttonName = "OK";
        navigator.notification.alert(
        message,  // message
        null,     // callback
        title,    // title
       buttonName  // buttonName
      );

    };

    var showError = function (message) {
        showAlert(message);
    };

    var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    var isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !isNullOrEmpty(key) && !regEx.test(key);
    };

    var AppHelper = {
        appmode: true,
        appName: "ETrackingWave",
        appApIURL: "http://testmobileapp603.webondemo.com/ETrackingWaveApi/EtrackingWave.asmx/",
        formatDate: function (dateString) {
            var months = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'
            ];
            var date = new Date(dateString);
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var day = date.getDate();

            return month + ' ' + day + ', ' + year;
        },
        ETrackingWaveApiURL: function (callFunctionName) {
            if (appmode) {
                return app.helper.appApIURL + callFunctionName;
            }
            else {
                return "ETrackingWaveApi/EtrackingWave.asmx/" + callFunctionName;
            }

        },
        readFromLocalStorage: function (keyName) {
            if (typeof (window.localStorage) != 'undefined') {
                if (window.localStorage.getItem(keyName)) {
                    return window.localStorage.getItem(keyName).toString();
                }
                else {
                    return "";
                }
            }
        },
        writeIntoLocalStorage: function (keyName, KeyValue) {
            if (typeof (window.localStorage) != 'undefined') {
                window.localStorage.setItem(keyName, KeyValue);
            }
        },
        writeObjectIntoLocalStorage: function (keyName, KeyValue) {
            if (typeof (window.localStorage) != 'undefined') {
                window.localStorage.setItem(keyName, JSON.stringify(KeyValue));
            }
        },
        readObjectFromLocalStorage: function (keyName) {
            if (typeof (window.localStorage) != 'undefined') {
                if (window.localStorage.getItem(keyName)) {
                    return window.localStorage.getItem(keyName).toString();
                }
                else {
                    return "";
                }
            }
        },
        deleteFromLocalStorage: function (keyName) {
            if (typeof (window.localStorage) != 'undefined') {
                window.localStorage.removeItem(keyName);
            }
        },
        reload: function () {
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            window.location.replace(window.location.origin);
        }
    };


    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        navigator.splashscreen.hide();
    }

    // Initialize KendoUI mobile application
    var mobileApp = new kendo.mobile.Application(document.body, {
        transition: 'slide',
        layout: 'ETrackingWaveHomeLayout',
        skin: 'flat'
    });

    return {
        showNativeNotificationAlert: showNativeNotificationAlert,
        showAlert: showAlert,
        showError: showError,
        isKeySet: isKeySet,
        mobileApp: mobileApp,
        helper: AppHelper
    };

}(window));
