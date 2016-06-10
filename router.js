define(function (require, exports, module) {
    // 把该模块下面的模板JS 引入，该文件由grunt将HTML 打包而来
    require('project/module/templates');
    /******************************************    路由   ********************************************/
    var Router = Backbone.Router.extend({
        initialize: function () {
            //实例化时调用
        },
        // 每个路由对应一个
        routes: {
            '': 'main',  //空路径调用main()
            'datatables': 'datatables',  //接受 #search ,调用search()
            'datatables/:key': 'datatables',  //接受 #search/参数1 ,调用search()
            'datatables/:key/p:page': 'datatables', //接受 #search/参数1/p参数2
            '*any': 'main' //任意路径，这个路径会作为参数传到回调函数
        },
        main: function (any) {
            //跳转到指定路由
            router.navigate("main");
            console.log('main');
            console.log(any);
        }
    });
    //实例化路由对象
    var router = new Router();
    //绑定路由回调函数
    router.on('route:datatables', function (key, page) {
        console.log(key);
        console.log(page);
        // 引入一个文件、得到里面定义的模块，并使用ID 为 business/module/unit/datatables/datatables 的模块。如果里面没有声明该ID的模块，那么该ID的模块就是文件里最后一个没有声明ID的模块
        seajs.use('project/module/unit/datatables/datatables',function(view){view.render()});
    });
    //添加路由，三个参数分别为 路径 路由 回调函数
    router.route('ztree', 'ztree', function(){
        // require 或 use 模块，构造模块的代码之后执行一次。因此需要每次都render
        seajs.use('project/module/unit/ztree/ztree',function(view){view.render()});
    });
    //添加路由，三个参数分别为 路径 路由 回调函数
    router.route('chart', 'chart', function(){
        // require 或 use 模块，构造模块的代码之后执行一次。因此需要每次都render
        seajs.use('project/module/unit/chart/chart',function(view){view.render()});
    });
    //启用路由功能
    Backbone.history.start();
    //停用路由功能
    //Backbone.history.stop();
});