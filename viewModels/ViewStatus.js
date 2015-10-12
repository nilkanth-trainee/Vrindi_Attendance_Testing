/**
 * Login view model
 */

var app = app || {};

app.accountDashboard = (function () {
    'use strict';
    var ETrackingWaveApiURL = "http://etrackingwave.webondemo.com/ETrackingWaveApi/EtrackingWave.asmx/";

    var accountDashboardViewModel = (function () {

        var $loginUsername;
        var $loginPassword;

        
        var init = function () {

            //if (!app.isKeySet(appSettings.everlive.apiKey)) {
            //    app.mobileApp.navigate('views/noApiKey.html', 'fade');
            //}

          //  $loginUsername = $('#loginUserName');
            //$loginPassword = $('#loginPassword');
        };

        var show = function () {
           // $loginUsername.val('');
           // $loginPassword.val('');
        };
        var logout = function () {
            // $loginUsername.val('');
            // $loginPassword.val('');
        };

        var markEntrees = function () {
            app.mobileApp.navigate('views/StoreUserLogin.html');
        }
        var viewStatus = function () {
            app.mobileApp.navigate('views/ViewStatus.html');
        }
        var createEmployeeAccount = function () {
            app.mobileApp.navigate('views/RegisterEmployees.html');

        }
        // Authenticate to use Backend Services as a particular user
        var login = function () {
        };

        return {
            init: init,
            show: show,
            markEntrees: markEntrees,
            viewStatus: viewStatus,
            createEmployeeAccount:createEmployeeAccount,
            logout:logout,
            login: login,
        };

    }());

    return accountDashboardViewModel;

}());
