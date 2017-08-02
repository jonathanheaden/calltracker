var ctrlShared = require('./shared');


var landing = function (req, res) {   
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'home page'
    })
}

var allContacts = function (req, res) {
  
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'home page'
    })
}

var newContact = function (req, res) {
    
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'new contact'
    })
}

var readContactCalls = function (req, res) {
    
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'read contact'
    })
}

var newContactCall = function (req, res) {
    
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'new call'
    })
}

var updateContact = function (req, res) {
    
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'update contact'
    })
}

module.exports.landing = landing;
module.exports.allContacts = allContacts;
module.exports.newContact = newContact;
module.exports.newContactCall = newContactCall;
module.exports.readContactCalls = readContactCalls;
module.exports.updateContact = updateContact;