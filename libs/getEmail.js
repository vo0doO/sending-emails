const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings.json');
const helpers = require('./helpers')

module.exports.getEmail = getEmail;

function getEmail(status, emailsLimit) {
    return new Promise(done => {
        MongoClient.connect(settings.MongoUrl, function (err, db) {
            if (err) {
                console.log(err);
                console.log('------');

                setTimeout(function () {
                    getEmail(status, emailTemplateCountm, emailsLimit)
                }, 5000);
            } else {
                db.collection(settings.DbCollection).find({
                        SendMessageStatus: true
                    }).count()
                    .then(count => {
                        if (count >= emailsLimit) {
                            db.close();

                            return done(false);
                        } else {
                            console.log('Status count: ', count);
                            db.collection(settings.DbCollection).findOneAndUpdate({
                                    SendMessageStatus: false,
                                }, {
                                    $set: {
                                        SendMessageStatus: status,
                                    }
                                })
                                .then(result => {
                                    db.close();

                                    return done(result);
                                });
                        }
                    })

            }
        });
    });
}