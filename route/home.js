const express = require('express');
const router = express.Router();
const { response_list, language_list } = require('../controller/home');



router
    .get('/', response_list)
    .get('/languagelist', language_list);
module.exports = router;