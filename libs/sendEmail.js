var nodemailer = require('nodemailer');
const settings = require('../settings.json');

module.exports.sendEmail = sendEmail;

function sendEmail(email, emailTemplate) {
    return new Promise(done => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: settings.MailGunUser,
                pass: settings.MailGunPass
            }
        });

        var mailOptions = {
            from: settings.SendEmailFrom,
            to: email,
            subject: emailTemplate.Subject,
            html: emailTemplate.BodyHtml
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);

                setTimeout(() => {
                    sendEmail(email, emailTemplate)
                }, 5000);
            } else {
                console.log('Message %s sent: %s', info.messageId, info.response);

                return done();
            }
        });
    });
}