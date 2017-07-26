const getEmail = require('./libs/getEmail');
const getEmailTemplate = require('./libs/getEmailTemplate');
const sendEmail = require('./libs/sendEmail');
const changeEmailStatus = require('./libs/changeEmailStatus');
const settings = require('./settings.json')

var _startStatus = false;

async function start() {
    try {
        _startStatus = true;

        console.log('-------------------');
        console.log('Start');

        var currentEmail = await getEmail.getEmail('in process', settings.EmailsLimit);

        if (currentEmail == false) {
            console.log(settings.EmailsLimit +  ' were sent');

            return;
        }
        
        var currentUser = currentEmail.value.UserName
        currentEmail = currentEmail.value.Email;

        var emailTemaplte = await getEmailTemplate.getEmailTemplate();

        await sendEmail.sendEmail(currentEmail, emailTemaplte);

        await changeEmailStatus.changeEmailStatus(currentUser);

        console.log('Finish');

        _startStatus = false;
    } catch (err) {
        console.log('Try/catch error: ', err);
    }
}

setInterval(() => {
    if (_startStatus == false) {
        start();
    }
}, 500);