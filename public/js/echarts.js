/**
 * Created by NINI on 2017/3/22.
 */
define(['echarts'],function (echarts) {
    // 数据图
    var myChart=echarts.init(document.getElementById("main"));
    var option={
        title:{
            text:"eCharts入门"
        },
        tooltip:{},
        legend:{
            data:['课程']
        },
        xAxis:{
            data:["html","css","javaScript"]
        },
        yAxis:{},
        series:[{
            name:'课时',
            type:"bar",
            data:[5,20,14]
        }]
    };
    myChart.setOption(option);
});