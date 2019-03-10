let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let config = require('../config/mysqlconfig');

let pool = mysql.createPool(config.mysql);

router.get('/',function(req,res,next){
    res.render('register',{title:'register'});
})

router.post('/userRegister',function (req,res,next) { 
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;

    pool.getConnection(function (err,connection) { 
        const $sql = "select * from users where username=?";
        connection.query($sql,[username],function (err,result) { 
            const resultJson = result;
            console.log(resultJson.length);
            if(resultJson.length !== 0){
                result = {
                    code:300,
                    msg:'该账号已存在'
                };
                res.json(result);
                connection.release();
            }else{
                const $sql1 = "INSERT INTO users(id,username,password,name) VALUES(0,?,?,?)";
                connection.query($sql1,[username,password,name],function (err,result) { 
                    console.log(result);
                    if(result){
                        result = {
                            code:200,
                            msg:'注册成功'
                        }
                    }else{
                        result = {
                            code:400,
                            msg:'注册失败'
                        }
                    };
                    res.json(result);
                    connection.release();
                 })
            }
         })
     })
 })

 module.exports = router;