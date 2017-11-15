var ctrlShared = require('./shared');
var contactdb = ctrlShared.contact;

var newContactCall = function (req, res) {
    if (req.params.contactid) {
        contactdb
            .findById(req.params.contactid)
            .select('calls')
            .exec(
                function (err, contact) {
                    if (err) {
                        ctrlShared.sendJsonResponse(res, 400, err);
                    } else {
                        doAddCall(req, res, contact);
                    }
                }
            );
    } else {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "Not found, contactid required"
        });
    }
};

var readOneContactCalls = function (req, res) {
    if (req.params && req.params.contactid && req.params.callid) {
        Loc
            .findById(req.params.contactid)
            .select('name calls')
            .exec(function (err, contact) {
                var response, review
                if (!contact) {
                    ctrlShared.sendJsonResponse(res, 404, {
                        message: "contactid not found"
                    });
                    return;
                } else if (err) {
                    ctrlShared.sendJsonResponse(res, 404, err);
                    return;
                }
                if (contact.calls && contact.calls.length > 0) {
                    call = contact.calls.id(req.params.callid);

                    if (!call) {
                        ctrlShared.sendJsonResponse(res, 404, {
                            "message": "callid not found"
                        });
                    } else {
                        response = {
                            contact: {
                                vendor: contact.vendor,
                                id: req.params.contactid
                            },
                            call: call
                        };
                        ctrlShared.sendJsonResponse(res, 200, response);
                    }
                } else {
                    ctrlShared.sendJsonResponse(res, 404, {
                        "message": "No calls found"
                    });
                }
            });
    } else {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "No contactid specified in the request"
        });
    }
};

var updateContactCall = function (req, res) {
    if (!req.params.contactid || !req.params.callid) {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "Not found, contactid and callid are both required"
        });
        return;
    }
    contactdb
        .findById(req.params.contactid)
        .select('calls')
        .exec(
            function (err, contact) {
                var thisReview;
                if (!contact) {
                    ctrlShared.sendJsonResponse(res, 404, {
                        "message": "contactid not found"
                    });
                    return
                } else if (err) {
                    ctrlShared.sendJsonResponse(res, 400, err);
                    return;
                }
                if (contact.review && contact.calls.length > 0) {
                    thisCall = contact.calls.id(req.params.callid);
                    if (!thisCall) {
                        ctrlShared.sendJsonResponse(res, 404, {
                            "message": "callid not found"
                        });
                    } else {
                        thisCall.calledAt = (req.body.date ? req.body.date : new Date());
                        thisCall.notes = req.body.notes ? req.body.notes : '';
                        thisCall.followup = req.body.followup ? req.body.followup : '';
                        thisCall.response = req.body.response ? req.body.response : '';
                        contact.save(function (err, contact) {
                            if (err) {
                                ctrlShared.sendJsonResponse(ress, 404, err);
                            } else {
                                ctrlShared.sendJsonResponse(res, 200, thisCall);
                            }
                        });
                    }
                } else {
                    ctrlShared.sendJsonResponse(res, 404, {
                        "message": "no call to update"
                    });
                }
            }
        )
};

var DeleteContactCall = function (req, res) {
    if (!req.params.contactid || !req.params.callid) {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "Not found, contactid and callid are both required"
        });
        return;
    }
    contactdb
        .findById(req.params.contactid)
        .select('calls')
        .exec(
            function (err, contact) {
                if (!contact) {
                    ctrlShared.sendJsonResponse(res, 404, {
                        "message": "Contactid not found"
                    });
                    return;
                } else if (err) {
                    ctrlShared.sendJsonResponse(res, 400, err);
                    return;
                }
                if (contact.calls && contact.calls.length > 0) {
                    if (!contact.calls.id(req.params.callid)) {
                        ctrlShared.sendJsonResponse(res, 404, {
                            "message": "callid not found"
                        });
                    } else {
                        contact.calls.id(req.params.callid).remove();
                        contact.save(function (err) {
                            if (err) {
                                ctrlShared.sendJsonResponse(res, 404, err);
                            } else {
                                ctrlShared.sendJsonResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    ctrlShared.sendJsonResponse(res, 404, {
                        "message": "No call to delete"
                    });
                }
            }
        );
};

/* other functions */

var doAddCall = function (req, res, contact) {
    if (!contact) {
        ctrlShared.sendJsonResponse(res, 404, {
            "message": "contactid not found"
        });
    } else {
        contact.calls.push({
            calledAt: (req.body.date ? req.body.date : new Date()),
            notes: req.body.notes ? req.body.notes : '',
            followup: req.body.followup ? req.body.followup : '',
            response: req.body.response ? req.body.response : ''
        });
        contact.save(function (err, contact) {
            var thisCall;
            if (err) {
                ctrlShared.sendJsonResponse(res, 400, err);
            } else {
                thisCall = contact.calls[contact.calls.length - 1];
                ctrlShared.sendJsonResponse(res, 201, thisCall);
            }
        });
    }
};

module.exports.readOneContactCalls = readOneContactCalls;
module.exports.newContactCall = newContactCall;
module.exports.updateContactCall = updateContactCall;
module.exports.DeleteContactCall = DeleteContactCall;
