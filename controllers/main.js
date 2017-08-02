var ctrlShared = require('./shared');


var landing = function (req, res) {
    
    ctrlShared.sendJsonResponse(res, 201, {
        'message': 'home page'
    })
}