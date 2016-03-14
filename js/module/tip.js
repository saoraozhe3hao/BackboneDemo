//定义一个模块，参数分别为 模块ID，依赖模块列表，工厂函数
define(function (require, exports, module) {

    //返回一个View构造函数
    var Tip = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "newId",
        className: "newClass",
        //初始化方法，实例化时会调用
        initialize: function () {
            $("#divTip").html(this.el);
        },
        //绑定DOM事件
        events: {
            'click #divTip': 'clickTip'
        },
        clickTip: function () {
        },
        //自定义成员，习惯上的三个自定义成员：options 存放参数 /  widget 引用的其他组件 /  render  渲染
        options:{

        },
        render: function () {
            //html() 得到一个字符串，作为underscore的模板。template() 返回一个模板函数
            this.template = _.template($("#template").html());
            // $el 即 el对应的jQuery对象。给模板函数传入一个数据对象
            this.$el.html(this.template(this.model.attributes));
            //解除事件
            this.undelegateEvents();
            //绑定事件
            this.delegateEvents(this.events);
        }
    });

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = Tip;
});