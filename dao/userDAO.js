const mysql = require('mysql');
const mysqlConf = require('../config/mysqlconfig');
const userSqlMap = require('./userSqlMap');
const pool = mysql.createPool(mysqlConf.mysql);


module.exports = {
    add:(user,callback)=>{
        pool.query(userSqlMap.add,[user.username,user.password],(error,result)=>{
            if(error) throw error;
            callback(result.affectedRows > 0);
        })
    },
    list:(callback)=>{
        pool.query(userSqlMap.list,(error,result)=>{
            if(error) throw error;
            callback(result);
        })
    },
    getByid:(id,callback)=>{
        pool.query(userSqlMap.getByid,id,(error,result)=>{
            if(error) throw error;
            console.log(result[0]);
            callback(result[0]);
        })
    },
    deleteById:(id,callback)=>{
        pool.query(userSqlMap.deleteById,id,(error,result)=>{
            if(error) throw error;
            callback(result.affectedRows>0);
        })
    },
    update:(user,callback)=>{
        pool.query(userSqlMap.update,[user.username,user.password,user.id],(error,result)=>{
            if(error) throw error;
            callback(result.affectedRows>0);
        })
    },
};

