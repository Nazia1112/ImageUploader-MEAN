var express = require('express');
var router = express.Router();

var controller = require('../controller/itemcontoller');
/* GET users listing. */


router.post('/',controller.savefiles);

module.exports = router;
