//定义一个模块
define(function (require, exports, module) {
    var Human = require('module/human');
    var man = require('module/man');

    //定义一个集合构造函数
    var People = Backbone.Collection.extend({
        //并指定集合元素的模型
        model: Human,
        //比较方法，用于sort
        comparator: function (model_1, model_2) {
            // 返回 0 表示 model_1 排在 model_2 前面
            return model_1.get('age') > model_2.get('age') ? 0 : 1;
        },
        //fetch 和 create 时使用
        url: "/api.php",
        //自定义方法
        getOld: function () {
            //调用集合自带方法filter
            return this.filter(function (man) {
                return man.age > 50;
            });
        }
    });
    //实例化一个集合对象，并设置初始元素。传入一个对象，则集合中只有一个元素；传入一个数组，则集合中有多个元素
    //集合元素存在 people.models中
    var people = new People({
        color: 'yellow'
    });
    //调用自定义方法
    people.getOld();
    //移除元素。shift 移除第一个；pop 移除最后一个
    people.remove(people.models[0]);
    //插入元素。unshift 插入到第一个；push插入到最后一个
    people.add(man, {at: 0});
    //获取元素。get 根据ID获取
    var m = people.at(0);
    //查找元素。where 查找多个
    m = people.findWhere({
        age: 1
    });
    //排序
    people.sort();

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = people;
});
