//定义一个模块，参数分别为 模块ID，依赖模块列表，工厂函数
define('human',[],function (require, exports, module) {

    //定义一个模型构造函数
    var Human = Backbone.Model.extend({
        //默认属性
        defaults: {
            age: '1'
        },
        //实例化时调用
        initialize: function () {

        },
        //设值开启校验时调用
        validate: function (attrs) {
            //返回错误信息
            if (attrs.age > 100) return '错误';
        },
        //调用save 和 fetch 时使用
        url: "/api.php",
        //指定哪个属性作为ID
        idAttribute: "name",
        //自定义成员
        print: function () {
            //获取属性
            console.log(this.get('age'));
        }
    });

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = Human;
});
