import * as echarts from '../../ec-canvas/echarts';
import * as liquidFill from '../../ec-canvas/echarts-liquidfill.min';



// getrisk 请求服务器得到感染风险
let getrisk = 0.2;
// getzz 请求服务器得到用于填写的症状数据
let getzz = [100, 30, 30, 100, 30, 30, 100, 100];






let zz = [100, 25, 100, 25, 25, 100, 100, 25];
let risk = 0.1;
const zzrisk = [8.7, 13.6, 13.9, 18.6, 38.1, 50, 67.7, 87.9];
let exist = [];
let notexist = [];
let datashow = [];

// 柱状图参数初始化
for (var i = 0; i < 8; i++) {
  if (zz[i] == 100) {
    datashow.push({
      value: zzrisk[i],
      itemStyle: {
        color: '#FDB72F'
      }
    })
    exist.push(datashow[i]);
  } else {
    datashow.push({
      value: zzrisk[i],
      itemStyle: {
        color: '#4DBE61'
      }
    });
    notexist.push(datashow[i]);
  }
}

// 水球颜色根据risk变化
function setcolor(value) {
  if(value < 0.25){
    return '#00FF00';
  }
  else if (value < 0.5){
    return '#4DBE61';
  }
  else if (value < 0.75){
    return '#FDB72F';
  }
  else{
    return '#FF0000';
  }
}

Page({
  data: {
    ec_dispace_charts: {
      lazyLoad: true
    },
    ec_radar_chart:{
      onInit: init_radar_Chart
    },
    ec_bar_chart:{
      onInit: init_bar_Chart
    }
  },
  onLoad: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#dispace_charts');
    this.initCharts(risk);
  },
  initCharts: function (value) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      // let data = [value, value, value, ];
      chart.setOption(setOption(value));
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  }
})



function setOption(value, data) {
  const option = {
    title: {
      text: '健康风险',
    },
    grid:{
      left: 0,
      top: 0,
      bottom: 0
  },
  series: [{
      type: 'liquidFill',
      waveAnimation: true,
      animation: true,
      // color: '#ff8',
      radius: '95%',
      center: ['50%', '50%'],
      data: [
        {
          value: value,
          direction: "left",
          itemStyle: {
            normal: {
            //这里就是根据不同的值显示不同球体的颜色
              color: setcolor(value),
            },
          },
        },
      ],
      label: {
        formatter: value,    //  值
        fontSize: 20,
        fontFamily: 'Lobster Two',
      },
      backgorundStyle:{
        color:setcolor(value)
      },
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 5,
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(69, 73, 240, 0)'
            }, {
              offset: 0.5,
              color: 'rgba(69, 73, 240, .25)'
            }, {
              offset: 1,
              color: 'rgba(69, 73, 240, 1)'
            }],
            globalCoord: false
          },
          shadowBlur: 10,
          shadowColor: '#ffffff',
        }
      },
  }]
  };
  return option
}

function init_radar_Chart (canvas, width, height, dpr) {
  let chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  const option = {
    color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
    title: {
      text: '我的症状'
    },
    legend: {},
    radar: [
      {
        indicator: [
          { text: '发烧', max: 100},
          { text: '气喘', max: 100},
          { text: '身体乏力', max: 100 },
          { text: '咽干咽痛', max: 100 },
          { text: '咽痒咳嗽', max: 100 },
          { text: '肠胃不适', max: 100},
          { text: '流涕鼻塞', max: 100},
          { text: '头痛', max: 100},
        ],
        center: ['50%', '50%'],
        radius: 70,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '【{value}】',
          color: '#428BD4'
        },
        splitArea: {
          areaStyle: {
            // ['#FFFFFF', '#26C3BE', '#64AFE9', '#428BD4'],
            color: ['#FFFFFF', '#4DBE61', '#FDB72F', '#FF0000'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        }
      }
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: zz,
            areaStyle: {
              color: 'rgba(255, 228, 52, 0.6)'
            }
          }
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}


function init_bar_Chart (canvas, width, height, dpr) {
  let chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  const option = {
    title: {
      text: '感染者症状频率'
    },
    grid:{
      left: '20%',
      right: '15%'
    },
    xAxis: {
      name:'频率',
      type: 'value'
    },
    yAxis: {
      name: '症状',
      type: 'category',
      data: [
        '肠胃不适',
        '头痛',
        '咽干咽痛',
        '气喘',
        '身体乏力',
        '流涕鼻塞',
        '咽痒咳嗽',
        '发烧'
      ]
    },
    series: [
      {
        data: datashow,
        type: 'bar',
        label: {
          show: true,
          precision: 1,
          position: 'right',
          formatter: '{c}%'
        }
      },
      
    ]
  };
  chart.setOption(option);
  return chart;
}
