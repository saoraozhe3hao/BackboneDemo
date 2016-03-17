//定义一个模块
define(function (require, exports, module) {

    //引入左侧导航模块
    var Left = require('../../widget/left/left');

    //返回一个View构造函数
    var Search = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "searchId",
        className: "searchClass",
        //初始化方法，实例化时会调用
        initialize: function () {
            // 实例化左侧导航部件，参数传给 Left 的 initialize
            this.widget.left = new Left({wrapper: this.options.wrapper});
        },
        //绑定DOM事件
        events: {},
        //自定义成员，习惯上的三个自定义成员：options 存放参数 /  widget 引用的其他组件 /  render  渲染  / destroy 清除
        options: {
            wrapper: "#content"
        },
        widget: {},
        render: function () {
            var me = this;
            me.widget.left.render();
            // el 即 这个View 新建的元素节点
            $(me.options.wrapper).append(me.el);

            me.$el.css("width", 900);

            /********************************************* DataTables 组件 ***********************************************************/
            //增加table元素节点
            me.$el.append('<table id="datatable" class="display" cellspacing="0" width="100%"></table>');

            // 设置 DataTables 报错方式，
            $.fn.dataTable.ext.errMode = 'throw'; //另有 alert,none
            // 创建DataTables实例， Datatable 的容器必须是 table 元素节点
            me.widget.dataTable = $("#datatable").DataTable({
                /*************************  显示选项  *****************************/
                paging: true,  // 是否分页
                lengthChange: true, //是否允许选择每页条数
                searching: false, // 是否搜索
                ordering: false, // 是否排序
                info: true, // 是否显示统计信息
                processing: true, // 耗时计算时，是否显示 “正在处理”
                sDom: 'Rlfrtip', // 列可伸缩配置，见 http://legacy.datatables.net/extras/

                /**************************** 尺寸选项 ***************************************/
                scrollX: true,  // 表格超出容器时，是否出现滚动条
                scrollY: "400px", // 表格内容区域高度
                autoWidth: true, // 是否自动计算宽度
                scrollCollapse: true, //数据条数不足时，是否降低高度

                /***********************************  体验优化选项  ************************************/
                deferRender: true, //是否延迟渲染，即获取异步数据以后再渲染
                stateSave: true, //是否把当前页码状态保存到本地存储

                /*********************************** 配置 ********************************************/
                "lengthMenu": [10, 25, 50, 75, 100], // 页条数选项
                "pageLength": 10, // 默认页条数
                "order": [[0, 'asc'], [1, 'asc']], // 默认排序
                "pagingType": "full_numbers", //分页类型，另有numbers、simple 、simple_numbers 、full、full_numbers

                /********************************* 国际化 ***********************************************/
                language:{
                    "decimal":        ".", // 小数点
                    "emptyTable":     "暂无数据", //无数据提示
                    "info":           "当前第 _PAGE_ 页，一共 _PAGES_ 页。当前显示第 _START_ 到第 _END_ 条，一共 _TOTAL_ 条", //统计信息格式
                    "infoEmpty":      "无数据", //无数据的统计信息
                    "infoFiltered":   "(从总数 _MAX_ 过滤而来)", // 搜索时，统计信息 额外提示
                    "infoPostFix":    "", // 统计信息，固定额外提示
                    "thousands":      ",", // 千位分隔符
                    "lengthMenu":     "一页显示 _MENU_ 条", // 条数选择下拉框 两边的提示
                    "loadingRecords": "加载中...", //ajax时的提示
                    "processing":     "处理中...", // 处理数据时的提示
                    "search":         "搜索:", // 搜索框前面的提示
                    "zeroRecords":    "没有匹配的数据", //搜索结果为空的提示
                    "paginate": {
                        "first":      "首页",
                        "last":       "末页",
                        "next":       "下一页",
                        "previous":   "上一页"
                    }
                },

                /*************************************  列配置 **************************************/
                columns: [
                    {
                        cellType: "td", // 格子类型，另有th
                        className: "", // class
                        contentPadding: '5px', //padding
                        data: 'name', // 数据的key
                        defaultContent: '', //默认内容
                        name: '',  //别名
                        orderable: false, //是否允许排序
                        orderData: [0,1], // 用于排序的数据，本列的排序不一定用本列的数据
                        searchable: false, //是否被搜索
                        title: '姓名', //标题
                        visible:true, //是否可见
                        width:"50%", //列宽
                        "render": function ( data, type, full, meta ) {   // 返回显示数据
                            return '<a href="'+data+'">Download</a>';
                        },
                        createdCell: function (td, cellData, rowData, row, col) {   // 创建后回调

                        }
                    },
                    {
                        title: '位置',
                        data: 'position',
                        width:"50%"
                    }
                ],
                "columnDefs": [{    //设置列属性的另一种方式，指定目标列，设置其属性
                    "targets": [0, 1],  //目标列
                    "orderable": false,
                    "searchable": false
                }],

                /************************************ 数据 ******************************************/
                serverSide: false, // 是否服务器模式，false 则为本地模式，影响排序、分页、搜素
                data: [
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3},
                    {name: 1, position: 2},
                    {name: 1, position: 3}
                ],

                /********************************************  回调函数  ********************************************/
                "rowCallback": function (row, data, index) {
                    // 行绘制 回调函数
                    //回调函数另有 footerCallback、createdRow、drawCallback、formatNumber、headerCallback、infoCallback、initComplete、
                    //preDrawCallback、stateLoadCallback、stateLoaded、stateLoadParams、stateSaveCallback、stateSaveParams
                }
            });

            /********************************** DataTables API *******************************************************************/
            /********************************** 核心 *******************************************************************/
            var dataTable = me.widget.dataTable;
            //重绘
            dataTable.draw();
            //获取或设置当前页码
            console.log(dataTable.page());
            // 重置页码后，要重绘，false表示不是完全重绘。page 从 0 开始。除了数字 还可以是 first、next、previous、last
            dataTable.page(1).draw( false );
            // 获得分页信息
            console.log(dataTable.page.info());
            // 获取或设置页条数,-1 表示显示所有数据
            dataTable.page.len(10).draw(false);
            //清空数据
            //dataTable.clear().draw(false);
            // 获得表格数据
            console.log(dataTable.data());
            // 销毁表格
            //dataTable.destroy();
            //获取或设置表格排序方式
            dataTable.order( [ 1, 'asc' ] ).draw();
            //获取表格设置对象
            console.log(dataTable.settings());
            //获取表格最后存储的状态
            dataTable.state();
            //清除表格储存的状态
            dataTable.state.clear();
            //表格初始化的时候读取之前的状态
            dataTable.state.loaded();
            //保存表格的当前状态
            dataTable.state.save();

            /********************************** 单元格、列、行 API *************************************************************/
            $('#datatable tbody').on( 'click', 'td', function () {
                // 获取单元格对象
               var cell = dataTable.cell( this );
                // 获取单元格数据
                console.log( cell.data() );
                // 获取单元格索引
                console.log( cell.index() );
                // 获取单元格DOM
                console.log( cell.node() );
                // 获取单元格 render 过的数据
                console.log( cell.render() );
            });
            // 同时处理多个cell
            dataTable.cells( ".cell" ).data();
            // 处理列对象，另有列对象 row()
            console.log(dataTable.column( 0 ).data());
            // 同时处理多个 column，另有rows()
            dataTable.columns( '.column' ).visible( true );
            //增加一行
            //dataTable.row.add();

            /*********************************************  事件  ************************************************/
            //绘制事件，另有 destro.dt 、init.dt 、error.dt 、length.dt、page.dt、oder.dt、stateLoaded.dt、stateSaveParams.dt 等事件
            $('#datatable').on( 'draw.dt', function () {

            } );
        },
        destroy: function () {
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