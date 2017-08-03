var ctrlShared = require('./shared');
contactdb = ctrlShared.contact;

var landing = function (req, res) {
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'home page'
    })
}

var allContacts = function (req, res) {
    contactdb
        .find()
        .exec(function (err, contact) {
            if (!contact) {
                ctrlShared.sendJsonResponse(res, 404, {
                    message: "no contacts found"
                });
                return;
            } else if (err) {
                ctrlShared.sendJsonResponse(res, 404, err);
                return;
            }
            ctrlShared.sendJsonResponse(res, 200, contact);
        });
}

var newContact = function (req, res) {
    contactdb
        .create({
            name: req.body.name,
            number: req.body.number,
            address: req.body.address,
            createdAt: new Date(),
            description: req.body.description,
            trade: req.body.trade,
            email: req.body.email,
            calls: []
        }, function (err, contact) {
            if (err) {
                ctrlShared.sendJsonResponse(res, 400, err);
            } else {
                ctrlShared.sendJsonResponse(res, 201, contact);
            }
        });
}


var updateContact = function (req, res) {

    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'update contact'
    })
}

module.exports.landing = landing;
module.exports.allContacts = allContacts;
module.exports.newContact = newContact;
module.exports.updateContact = updateContact;