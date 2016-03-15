//定义一个模块，参数分别为 模块ID，依赖模块列表，工厂函数
define(function (require, exports, module) {

    //返回一个View构造函数
    var Detail = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "detail",
        className: "detail",
        //初始化方法，实例化时会调用
        initialize: function () {
            console.log();
        },
        //绑定DOM事件
        events: {
        },
        //自定义成员，习惯上的三个自定义成员：options 存放参数 /  widget 引用的其他组件 /  render  渲染
        options:{

        },
        render: function () {
            var me = this;
            // $el 即 el对应的jQuery对象。
            me.$el.append('<div>详情页面</div>');
            // el 即 这个View 新建的元素节点
            $("#content").append(me.el);
        }
    });

    //实例化View对象，并设置成员
    var detail = new Detail();
    detail.render();

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = detail;
});