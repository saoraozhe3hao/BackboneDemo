//定义一个模块
define(function (require, exports, module) {

    //引入左侧导航模块
    var Left = require('../../widget/left/left');

    //返回一个View构造函数
    var Chart = Backbone.View.extend({
        //给this.el 指定一个元素节点，如果没有指定，则新建一个元素节点对象
        //		    el: $("#backbone"),
        //新建节点对象的id和class
        id: "chartId",
        className: "chartClass",
        //初始化方法，实例化时会调用
        initialize: function (options) {
            //传进来的options 会自动覆盖 defaults
            // 实例化左侧导航部件，参数传给 Left 的 initialize
            this.widget.left = new Left({wrapper: this.options.wrapper});
        },
        //绑定DOM事件
        events: {
            'click button': 'action'
        },
        //自定义成员，习惯上的三个自定义成员：options 存放参数 /  data 存放数据 / widget 引用的其他组件 /  render  渲染  / destroy 清除
        options: {
            wrapper: "#content"
        },
        // 在这里定义，那么这个widget是原型里的成员，多个VIew的多个实例共享同一个widget
        widget: {},
        render: function () {
            var me = this;
            me.widget.left.render();
            // $el 即 el对应的jQuery对象。引用全局模板
            me.$el.html(window.templates['project/module/unit/chart/chart.html']);
            // el 即 这个View 新建的元素节点
            $(me.options.wrapper).append(me.el);

            /**************************************************  全局配置 *****************************************************/
            // Chart 函数 与 backbone.js 上下文有冲突，因此得取全局的
            var Charts = window.Chart;
            Charts.defaults.global.responsive = false;  // 是否自动随容器缩放
            Charts.defaults.global.defaultFontColor = '#666';
            Charts.defaults.global.title.position = 'top'; // 标题相关配置在 global.title 里面
            Charts.defaults.global.legend.position = 'top'; // 图例相关配置在 global.legend 里面
            // 另还有 提示 tooltips，动画 animation 的全局配置
            /**************************************************  曲线图、折线图 *****************************************************/
            var lineCtx = me.$("#lineChart").get(0);
            var lineData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],  // 横坐标
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0, // 紧张度，0 表示折线，不是曲线
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40], // 纵坐标
                    },
                    {
                        label: "My Second dataset",
                        fill: true, // 下方是否填充
                        backgroundColor: "rgba(255,205,86,0.4)",
                        borderColor: "rgba(255,205,86,1)",
                        pointBorderColor: "rgba(255,205,86,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,205,86,1)",
                        pointHoverBorderColor: "rgba(255,205,86,1)",
                        pointHoverBorderWidth: 2,
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };

            me.widget.lineChart = new Charts(lineCtx, {
                type: 'line',
                data: lineData,
                options: {
                    showLines: true // 点之间是否连线
                }
            });

            /**************************************************  柱状图 *****************************************************/
            var barCtx = me.$("#barChart").get(0);
            var barData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"], // 横坐标
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]   // 纵坐标
                    },
                    {
                        label: "My Second dataset",
                        backgroundColor: "rgba(54,162,235,0.2)",
                        borderColor: "rgba(54,162,235,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(54,162,235,0.4)",
                        hoverBorderColor: "rgba(54,162,235,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };
            me.widget.barChart = new Charts(barCtx, {
                type: 'bar',
                data: barData,
                options: {}
            });
            /************************************************** 饼图 *****************************************************/
            var pieCtx = me.$("#pieChart").get(0);
            var pieData = {
                labels: ["Red", "Green", "Yellow"],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }
                ]
            };
            me.widget.pieChart = new Charts(pieCtx,{
                type: 'pie',
                data: pieData,  // 数据不能被两个图表同时使用，否则只能显示一个出来
                options: {

                }
            });
            /************************************************** 圈图 *****************************************************/
            var doughnutCtx = me.$("#doughnutChart").get(0);
            var doughnutData = {
                labels: ["Red", "Green", "Yellow"],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }
                ]
            };
            me.widget.doughnutChart = new Charts(doughnutCtx,{
                type: 'doughnut',
                data: doughnutData, // 数据不能被两个图表同时使用，否则只能显示一个出来
                options: {

                }
            });
        },
        destroy: function () {
            this.$el.remove();
            this.widget.left.destroy();
        },
        action: function () {
            var me = this;
            /************************************************** chart 方法 *****************************************************/
                // 修改数据后更新图表
            me.widget.lineChart.data.datasets[0].label = '第一项';
            me.widget.lineChart.update();
            // 停止动画
            me.widget.lineChart.stop();
            // 撑满容器
            me.widget.lineChart.resize();
            //me.widget.lineChart.clear(); // 清空
            //me.widget.lineChart.destroy(); //销毁
        }
    });

    //实例化View对象，并设置成员
    var chart = new Chart();

    //CMD 模块规范，exports 即 要输出的对象。以下是设置这个对象的两种写法
    exports.a = 1;
    module.exports = chart;
});
