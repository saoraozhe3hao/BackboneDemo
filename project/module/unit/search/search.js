//定义一个模块
define(function (require, exports, module) {

    //引入左侧导航模块
    var Left = require('../../widget/left/left');

    //返回一个View构造函数
    var Search = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "newId",
        className: "newClass",
        //初始化方法，实例化时会调用
        initialize: function () {
            // 实例化左侧导航部件，参数传给 Left 的 initialize
            this.widget.left = new Left({wrapper:this.options.wrapper});
        },
        //绑定DOM事件
        events: {
        },
        //自定义成员，习惯上的三个自定义成员：options 存放参数 /  widget 引用的其他组件 /  render  渲染  / destroy 清除
        options:{
            wrapper:"#content"
        },
        widget:{

        },
        render: function () {
            var me = this;
            me.widget.left.render();
            // $el 即 el对应的jQuery对象。
            me.$el.html('<div>搜索页面</div>');
            // el 即 这个View 新建的元素节点
            $(me.options.wrapper).append(me.el);
        },
		destroy: function(){
			this.$el.remove();
			this.widget.left.destroy();
		}
    });

    //实例化View对象，并设置成员
    var search = new Search();

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = search;
});