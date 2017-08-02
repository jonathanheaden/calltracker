var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.landing);
router.get('/contacts',ctrlMain.allContacts);
router.post('/contacts',ctrlMain.newContact);
router.get('/contacts/:contact',ctrlMain.readContactCalls);
router.post('/contacts/:contact',ctrlMain.newContactCall);
router.put('/contacts',ctrlMain.updateContact);




module.exports = router;
