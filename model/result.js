// 删除多余的代码
exports.createResult = function(success,data){
    let result = {};
    result.success = success;
    result.data = data;
    return result;
}