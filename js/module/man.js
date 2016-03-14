//定义一个模块，参数分别为 模块ID，依赖模块列表，工厂函数
define('man',[],function (require, exports, module) {

    //引用其他模块
    var Human = require('./human');

    //实例化一个模型对象，并设置初始属性。属性存在man.attributes中
    var man = new Human({
        sex: '2'
    });
    //访问自定义成员
    man.print();
    //模型对象变化事件。除了on还可以用once，只执行一次
    man.on('change:sex change:age', function (model, value) {
        //获取修改前的值
        console.log(model.previous("sex"));
    });
    //绑定事件的另一种方式
    man.on({
        //校验错误事件
        "invalid": function (model, error) {
            console.log(error);
        }
    });
    //触发一个自定义事件
    man.trigger("change_age_sex");
    //移除事件,all表示全部事件
    man.off("all");
    //设置属性，并开启校验
    man.set({age: 2}, {validate: true});
    //静默修改属性，不触发任何事件
    man.set("age", 3, {silent: true});
    //删除属性
    man.unset("sex");
    //Post请求，fetch则是get请求，destroy则是delete请求
    man.save({color: "white"}, {
        success: function (model, response) {
            //成功回调
        },
        error: function () {
            //失败回调
        },
        wait: true //发送前进行校验
    });

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = man;
});
