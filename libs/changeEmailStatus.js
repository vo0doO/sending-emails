const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings.json');
const helpers = require('./helpers')

module.exports.changeEmailStatus = changeEmailStatus;

function changeEmailStatus(currentUser) {
    return new Promise(done => {
        MongoClient.connect(settings.MongoUrl, function (err, db) {
            if (err) {
                console.log(err);
                console.log('------');

                setTimeout(function () {
                    getEmail()
                }, 5000);
            } else {
                db.collection(settings.DbCollection).findOneAndUpdate({
                        UserName: currentUser
                    }, {
                        $set: {
                            SendMessageStatus: true,
                            DateSent: helpers.getDateAndTime()
                        }
                    })
                    .then(result => {
                        db.close();

                        return done(result);
                    });
            }
        });
    });
}