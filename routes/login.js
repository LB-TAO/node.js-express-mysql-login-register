let express = require('express');
let router = express.Router();

let mysql = require('mysql');
let config = require('../config/mysqlconfig');

let pool = mysql.createPool(config.mysql);

router.get('/',function (req,res,next) { 
    res.render('login',{title:'login'});
});


router.post('/userLogin',function (req,res,next) { 
    let username = req.body.username;
    let password = req.body.password;
    pool.getConnection(function (err,connection) { 
        const $sql = "select * from users where username = ?";
        connection.query($sql,[username],function (err,result) { 
            let resultJson = result;
            console.log(resultJson.length);
            if(resultJson.length === 0){
                result = {
                    code:300,
                    msg:'该账号不存在'
                };
                res.json(result);
                connection.release();
            }else{
                const $sql1 = 'select password from users where username = ?';
                connection.query($sql1,[username],function (err,result) { 
                    const temp = result[0].password;
                    console.log(temp);
                    if(temp==password){
                        result={
                            code:200,
                            msg:'密码正确'
                        }
                    }else{
                        result={
                            code:400,
                            msg:'密码错误'
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