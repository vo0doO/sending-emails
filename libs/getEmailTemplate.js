const fs = require('fs');
const path = require('path');

module.exports.getEmailTemplate = getEmailTemplate;

function getEmailTemplate() {
    return new Promise(done => {
        var emailTemplate = {
            Subject: '',
            BodyHtml: ''
        };

        fs.readFile(__dirname + '/mail/subject.txt', (err, data) => {
            if (err) {
                console.log(err);

                setTimeout(() => {
                    getEmailTemplate();
                }, 5000);
            } else {
                emailTemplate.Subject = data.toString();

                fs.readFile(__dirname + '/mail/bodyHtml.txt', (err, data) => {
                    if (err) {
                        console.log(err);

                        setTimeout(() => {
                            getEmailTemplate();
                        }, 5000);
                    } else {
                        emailTemplate.BodyHtml = data.toString().replaceAll('\n', '<br>');

                        done(emailTemplate);
                    }
                });
            }
        });
    });
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};