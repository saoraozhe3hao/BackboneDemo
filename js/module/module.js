//自运行匿名函数，形成闭包，避免污染全局
(function () {
    /*********************************************** seajs 配置 ***********************************************/
    seajs.config({
        //别名
        alias: {
            'jquery': 'js/lib/jquery'
        },
        //映射
        map: [
            [[ /^(.*\.(?:css|js))(.*)$/i, '$1?20110801' ]]
        ],
        base: './js',
        charset: 'utf-8',
        timeout: 20000
    });

    /******************************************    路由   ********************************************/
    var Router = Backbone.Router.extend({
        initialize: function () {
            //实例化时调用
        },
        routes: {
            '': 'main',  //空路径调用main()
            'search/:key': 'search',  //接受 #search/参数1 ,调用search()
            'search/:key/p:page': 'search', //接受 #search/参数1/p参数2
            '*any': 'main' //任意路径，这个路径会作为参数传到回调函数
        },
        main: function (any) {
            console.log('main');
            console.log(any);
        }
    });
    //实例化路由对象
    var router = new Router();
    //添加路由，三个参数分别为 路径 路由 回调函数
    router.route('detail', 'detail', function () {

    });
    //绑定路由回调函数
    router.on('route:search', function (key, page) {
        console.log(key);
        console.log(page);
    });
    //启用路由功能
    Backbone.history.start();
    //跳转到指定路由
    router.navigate("main");
    //停用路由功能
    Backbone.history.stop();



    /*******************************************  入口 ***********************************************/
    //使用模块，不以 点 或 杠 开通的路径，会与seajs.config 的 base拼接
    seajs.use(['module/people', 'module/man','module/tip'], function (people, man,Tip) {

        //实例化View对象，并设置成员
        var tip = new Tip({model: man});
        tip.render();
        //监听man的change事件，调用initialize。另有listenToOnce
        tip.listenTo(man, 'change', tip.initialize);
        //停止监听
        tip.stopListening(man, 'change');
    });
})();