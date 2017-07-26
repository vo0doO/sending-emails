module.exports.getDateAndTime = getDateAndTime;

function getDateAndTime(secs) {
    if (secs == undefined) {
        var currentdate = new Date();
    } else {
        var currentdate = new Date(secs);
    }


    var seconds;
    var minutes;
    var hours;
    if (currentdate.getSeconds().toString().length == 1) {
        seconds = '0' + currentdate.getSeconds();
    } else {
        seconds = currentdate.getSeconds();
    }

    if (currentdate.getMinutes().toString().length == 1) {
        minutes = '0' + currentdate.getMinutes();
    } else {
        minutes = currentdate.getMinutes();
    }

    if (currentdate.getHours().toString().length == 1) {
        hours = '0' + currentdate.getHours();
    } else {
        hours = currentdate.getHours();
    }
    var datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        hours + ":" +
        minutes + ":" +
        seconds;

    return datetime;
}