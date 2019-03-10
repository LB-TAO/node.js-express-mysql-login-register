var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const userDAO = require('../dao/userDAO');
const result = require('../model/result');
const config = require('../config/mysqlconfig');

router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

module.exports = router;
