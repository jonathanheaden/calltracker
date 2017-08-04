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
var readOneContact = function (req, res) {
    contactdb
        .findById(req.params.contactid)
        .exec(
            function (err, contact) {
                if (err) {
                    ctrlShared.sendJsonResponse(res, 400, err);
                } else {
                    ctrlShared.sendJsonResponse(res, 200, contact);
                }
            })
}

var newContact = function (req, res) {
    contactdb
        .create({
            vendor: req.body.vendor,
            contactname: req.body.contactname ? req.body.contactname : '',
            number: req.body.number ? req.body.number : '',
            address: req.body.address ? req.body.address : '',
            createdAt: new Date(),
            description: req.body.description ? req.body.description : '',
            trade: req.body.trade ? req.body.trade : '',
            email: req.body.email ? req.body.email : '',
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
    if (req.params.contactid) {
        contactdb
            .findById(req.params.contactid)
            .exec(
                function (err, contact) {
                    if (err) {
                        ctrlShared.sendJsonResponse(res, 400, err);
                    } else {
                        contact.vendor = req.body.vendor ? req.body.vendor : contact.vendor;
                        contact.contactname = req.body.contactname ? req.body.contactname : contact.contactname;
                        contact.number = req.body.number ? req.body.number : contact.number;
                        contact.address = req.body.address ? req.body.address : contact.address;
                        contact.description = req.body.description ? req.body.description : contact.description;
                        contact.trade = req.body.trade ? req.body.trade : contact.trade;
                        contact.email = req.body.email ? req.body.email : contact.email;
                        contact.save(function (err, contact) {
                            if (err) {
                                sendJsonResponse(res, 400, err);
                            } else {
                                sendJsonResponse(res, 200, contact);
                            }
                        })
                    }
                }
            );
    } else {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "Not found, contactid required"
        });
    }
}

module.exports.landing = landing;
module.exports.allContacts = allContacts;
module.exports.readOneContact = readOneContact;
module.exports.newContact = newContact;
module.exports.updateContact = updateContact;