var express = require('express');
var router = express.Router();
var ctrlContacts = require('../controllers/contacts');
var ctrlCalls = require('../controllers/calls');

/* GET home page. */
router.get('/', ctrlContacts.landing);
/* Contacts */
router.get('/contacts',ctrlContacts.allContacts);
router.get('/contacts/:contactid',ctrlContacts.readOneContact)
router.post('/contacts',ctrlContacts.newContact);
router.patch('/contacts/:contactid',ctrlContacts.updateContact);
/* Calls */
router.post('/contacts/:contactid',ctrlCalls.newContactCall);
router.get('/contacts/:contactid/:callid',ctrlCalls.readOneContactCalls);
router.patch('/contacts/:contactid/:callid',ctrlCalls.updateContactCall);
router.delete('/contacts/:contactid/:callid', ctrlCalls.DeleteContactCall);

module.exports = router;
