'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        
        var datum = new Date();
        var hours = datum.getHours();
        var minutes = datum.getMinutes();

        // Bedingter Ternärer Operator (Ersetzt eine einfache if anweisung)
        minutes = minutes <= 9 ? '0' + minutes : minutes;
        var time = hours + ":" + minutes;
        var stunde = datum.getHours()

        if (stunde > 6 && stunde <= 11)
            $('#message').text('Guten Morgen ' + user.get_title() + '. Es ist ' + time + ' Uhr.');
        if (stunde > 11 && stunde <= 15)
            $('#message').text('Hallo und guten Mittag ' + user.get_title() + '. Es ist ' + time + ' Uhr.');
        if (stunde > 15 && stunde <= 22)
            $('#message').text('Schönen guten Abend ' + user.get_title() + '. Es ist ' + time + ' Uhr.');
        if (stunde > 22 && stunde <= 6)
            $('#message').text('So spät arbeitest du noch? Naja, es ist ' + time + ' Uhr.');
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}