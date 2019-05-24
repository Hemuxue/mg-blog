<template>
  <div class="home">
    <div class="survey" ref="survey"></div>
    <div class="statistics" ref="tagStatistics"></div>
    <div class="statistics" ref="typeStatistics"></div>
  </div>
</template>
<script>
let echarts = require("echarts");
import Axios from "axios";
export default {
  data() {
    return {
      surChart: null,
      statisChart: null,
      surChartOption: {},
      statisChartOption: {},
      typeStatisChartOption: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.surChart = echarts.init(this.$refs.survey);
      this.tagStatistics = echarts.init(this.$refs.tagStatistics);
      this.typeStatistics = echarts.init(this.$refs.typeStatistics);
    });
    this.getStatistics();
    this.getBlogStatistic();
    this.getTagStatistic();
    this.getTypeStatistic();
  },
  methods: {
    getStatistics() {
      const promise = Promise.all([
        Axios.get("/api/userCount"),
        Axios.get("/api/getUser")
      ]);
      promise.then(count => {});
    },
    getBlogStatistic() {
      Axios.get("/api/getBlogStatistic").then(data => {
        if (data.data.code === 200) {
          const tempData = data.data.data;
          const xData = [];
          const yData = [];
          tempData.forEach(ele => {
            xData.push(ele.ctime);
            yData.push(ele.views);
          });
          this.surChartOption = {
            title: {
              text: "博客阅读量"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["蒸发量", "降水量"]
            },
            toolbox: {
              show: true,
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar"] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            xAxis: [
              {
                type: "category",
                data: xData
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "阅读量",
                type: "bar",
                data: yData
              }
            ]
          };
          this.surChart.setOption(this.surChartOption);
          // this.surChartOption.xAxis.data = xData;
          // this.surChartOption.series.data = yData;
        }
      });
    },
    getTagStatistic() {
      Axios.get("/api/getTagStatistics").then(data => {
        if (data.data.code === 200) {
          const tempData = data.data.data;
          const legendData = [];
          const seriesData = [];
          tempData.forEach(ele => {
            legendData.push(ele.name);
            seriesData.push({
              name: ele.name,
              value: ele.count
            });
          });
          this.statisChartOption = {
            title: {
              text: "标签分布",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: legendData
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
          this.tagStatistics.setOption(this.statisChartOption);
        }
      });
    },
    getTypeStatistic() {
      Axios.get("/api/getTypeStatistics").then(data => {
        if (data.data.code === 200) {
          const tempData = data.data.data;
          const legendData = [];
          const seriesData = [];
          tempData.forEach(ele => {
            legendData.push(ele.name);
            seriesData.push({
              name: ele.name,
              value: ele.count
            });
          });
          this.typeStatisChartOption = {
            title: {
              text: "分类分布",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: legendData
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
          this.typeStatistics.setOption(this.typeStatisChartOption);
        }
      });
    }
  }
};
</script>
<style lang="less">
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .survey {
    height: 500px;
    width: 700px;
  }
  .statistics {
    margin-top: 50px;
    height: 500px;
    width: 500px;
  }
}
</style>
