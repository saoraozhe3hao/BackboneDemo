//定义一个模块，参数分别为 模块ID，依赖模块列表，工厂函数
//模块ID说明：如果本文件里定义的模块 所声明的ID 都与本文件不同名，那么本文件最后一个没声明ID的模块 的ID 与本文件 同名
//依赖模块列表说明：未被下载的文件会被下载下来，但是不会执行模块function里的内容，只在被use 或 require时，才会被执行
define('project/module/unit/ztree/ztree',['../../widget/left/left'],function (require, exports, module) {

    //该模块定义写了依赖，那么在这个模块里除了 module.dependencies 里的模块，不能require 其他模块
    var Left = require(module.dependencies[0]);

    //返回一个View构造函数
    var Detail = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "detail",
        className: "detail",
        //初始化方法，实例化时会调用
        initialize: function (options) {
			//传进来的options 会自动赋给 this.options
            // 实例化左侧导航部件，参数传给 Left 的 initialize
            this.widget.left = new Left({wrapper:this.options.wrapper});
        },
        //绑定DOM事件
        events: {
        },
        //自定义成员，习惯上的三个自定义成员：options 存放参数 / data 存放数据 / widget 引用的其他组件 /  render  渲染  / destroy 清除
        options:{
            wrapper:"#content"
        },
		// 在这里定义，那么这个widget是原型里的成员，多个VIew的多个实例共享同一个widget
        widget:{

        },
        render: function () {
            var me = this;
            me.widget.left.render();
            // $el 即 el对应的jQuery对象。引用全局模板
            me.$el.html(window.templates['project/module/unit/ztree/ztree.html']);
            // el 即 这个View 新建的元素节点
            $(me.options.wrapper).append(me.el);

            /******************************* zTree http://www.ztree.me/v3/main.php ，除了核心库以为，还可以使用扩展：编辑，移动，选择 ，拖动，隐藏 ***********************************************/
            /******************************** zTree 配置 *******************************************/
            var setting = {
                //回调函数配置
                callback: {
                    // 点击之后，onClick 之前调用。另有 beforeDblClick 双击、beforeMouseDown、beforeMouseUp、beforeRightClick 右键
                    beforeClick: function(treeId, treeNode, clickFlag) {
                        return true; // 返回false 则不调用 onClick
                    },
                    // 点击折叠之后，onCollapse 之前调用。另有 beforeExpand 展开
                    beforeCollapse:function(treeId, treeNode) {
                        return true; // 返回false 则不折叠
                    },
                    onNodeCreated:function(event, treeId, treeNode) {
                        // 节点创建事件
                    }
                },
                // 节点数据配置
                data: {
                    keep: {
                        leaf: true, //叶节点保持叶节点状态，即不能添加子节点
                        parent: true // 父节点 保持父节点状态，即没有子节点仍保持父节点状态
                    },
                    key: {
                        children: "children", // 节点数据中，子节点数据 对应的 key
                        name: "name",  // 节点数据中，节点名称 对应的 key
                        title: "name" // 节点数据中，显示名称 对应的 key
                    },
                    simpleData: {
                        enable: false, //是否开启 简单数据模式，简单数据模式下，数据 的格式为 [{"id":1, "pId":0, "name":"test1"}]
                        idKey: "id",  // 简单数据 中，节点ID 对应的 key
                        pIdKey: "pId", // 简单数据 中，父节点ID 对应的 key
                        rootPId: 0 // 简单数据 中，根节点ID
                    }
                },
                // 显示配置
                view: {
                    addDiyDom: function(treeId, treeNode) {
                        // 添加自定义dom 。 可以由 treeId 拼接出DOM 节点的ID
                    },
                    // 双击是否展开，可以配置成 true 或 false
                    dblClickExpand: function(treeId, treeNode) {
                        return treeNode.level > 0;
                    },
                    expandSpeed: "normal", //展开速度，另有"slow" 、 "fast"和毫秒数
                    nameIsHTML: true, // 名称是否支持 HTML，需要防范XSS
                    selectedMulti: false, //是否允许按Ctrl键时选中多个节点
                    showIcon: true, //是否显示图标，可以配置成一个function
                    showLine: true, //是否显示节点连线
                    showTitle: true, // 是否设置 节点的 title 属性
                    txtSelectedEnable: true //是否允许选择文本
                }
            };


            /******************************** zTree 数据 *****************************************/
            var zNodes = [
                {
                    name:"root_1",   //节点名称
                    click:"console.log('test');", // 简单点击回调
                    open:false,         //是否展开
                    icon:"",  //节点图标，另有 iconClose 收起图标，iconOpen 展开图标,iconSkin 图标样式
                    isParent:true, //是否父节点
                    children:[          //子节点
                        {id:1,name:"leaf_1"}, {name:"leaf_2"}
                    ]
                },
                {
                    name:"root_2",
                    open:true,
                    children:[
                        {name:"leaf_3"}, {name:"leaf_4"}
                    ]
                }
            ];

            /******************************** 创建、获取、销毁 *****************************************/
            // 创建 树对象
            var zTreeObj = $.fn.zTree.init($("#ztree"), setting, zNodes);
            //获取已经存在的树对象，传入 zTree 容器的ID
            var treeObj = $.fn.zTree.getZTreeObj("ztree");
            //销毁树
            //$.fn.zTree.destroy("ztree");

            /******************************** zTree 对象方法 *****************************************/
            //销毁树，刷新树
            //treeObj.destroy(); treeObj.refresh();
            //展开所有节点，false为折叠
            treeObj.expandAll(true);
            //根据节点tid 获取节点，这个ID是zTree拼接的ID
            var parentNode = treeObj.getNodeByTId("tree_1");
            //搜索节点，传入 key ,value , 父节点。传入父节点对象，则返回节点对象；传入父节点JSON，则返回节点JSON。
            var node = treeObj.getNodeByParam("id", 1, parentNode);  // 另有 getNodesByParam 获取多个，getNodesByParamFuzzy 模糊匹配
            var nodeData = treeObj.getNodeByParam("id", 1, zNodes[0]);
            //添加节点，传入 父节点对象，排位，新节点JSON或对象，是否不展开父节点
            treeObj.addNodes(parentNode,0, node,false);
            treeObj.addNodes(parentNode,3, nodeData,false);
            //展开或折叠节点，传入节点对象、展开还是折叠、是否向子节点传递、展开或折叠后是否聚焦、是否触发展开折叠回调函数
            treeObj.expandNode(parentNode, false, true, true,true);
            //获取节点在同级中的排号
            console.log(treeObj.getNodeIndex(node));
            //获取所有根节点，子节点在其children中
            console.log(treeObj.getNodes());  // 另有 getSelectedNodes() 选中节点
            // 将嵌套格式转换为数组格式，另有transformTozTreeNodes
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            //过滤出所要节点，传入过滤函数，是否只查找一个
            var filterNode = treeObj.getNodesByFilter(filter, true);
            function filter(node) {
                return true;
            }
            // 移除指定父节点的所有子节点，传入一个父节点
            //treeObj.removeChildNodes(parentNode);
            //移除指定节点，传入节点，是否触发移除事件
            treeObj.removeNode(node,false);
            //选中一个节点，传入节点，是否保持之前的选中
            treeObj.selectNode(parentNode,false);
            //改变节点数据以后，更新视图
            parentNode.name = "新名字";
            treeObj.updateNode(parentNode);

            /******************************** zTree 节点对象，在节点数据JSON的基础上增加成员而来 ************************************/
            //获取在同级中的排号，另有getNextNode() 下个节点，getPreNode() 前一个节点，getParentNode() 父节点，getPath() 祖先节点集合
            console.log(parentNode.getIndex());
            // 只读属性。另有isLastNode ，level 节点层次，parentTId，tId
            console.log(parentNode.isFirstNode);
        },
		destroy: function(){
			this.$el.remove();
		}
    });

    //实例化View对象，并设置成员
    var detail = new Detail();

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = detail;
});

