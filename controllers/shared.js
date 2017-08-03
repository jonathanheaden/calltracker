var mongoose = require('mongoose');


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
var contact = mongoose.model('Contact');

module.exports.sendJsonResponse = sendJsonResponse;
module.exports.contact = contact;
