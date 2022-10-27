<template>
  <div class="box">
    <div class="headerInfo">
      <div class="userInfo">
        <img class="avatar" :src="avatar" id="" />
        <div class="details">
          <div class="welcome">
            你好，{{ userName }}，欢迎使用警长伙伴系统！
          </div>
          <div class="policeCode">
            <span>警号：{{ policeCode }}</span
            ><el-tag class="tag">{{ position }}</el-tag>
          </div>
        </div>
      </div>
      <div class="scoreInfo" v-if="showRank">
        <div class="myScore">
          <div class="myScore_icon">
            <i class="el-icon-c-scale-to-original"></i>
          </div>
          <div class="myScore_text">
            <div class="myScore_label">我的得分</div>
            <div class="myScore_value">{{ socre }}</div>
          </div>
        </div>
        <div class="myRank">
          <div class="myRank_icon">
            <i class="el-icon-s-data"></i>
          </div>
          <div class="myRank_text">
            <div class="myRank_label">我的排名</div>
            <div class="myRank_value">{{ rank }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bodyChart">
      <div class="label">任务完成情况</div>
      <div class="chartsBox">
        <div class="charts">
          <div class="weekTask" ref="weekTask"></div>
          <div class="chartsLabel">周任务</div>
        </div>
        <div class="charts">
          <div class="monthTask" ref="monthTask"></div>
          <div class="chartsLabel">月任务</div>
        </div>
        <div class="charts">
          <div class="seasonTask" ref="seasonTask"></div>
          <div class="chartsLabel">季任务</div>
        </div>
      </div>
    </div>
    <div class="sideContent">
      <div class="date">
        <el-calendar> </el-calendar>
      </div>
      <div class="tasks">
        <div class="title">
          <div class="title_text">待办任务</div>
          <div class="title_checkAll" @click="jump">查看全部</div>
        </div>
        <div class="taskList">
          <div v-for="(item, index) in taskList" :key="index" class="taskCell">
            <div class="taskCell_type">任务类型:{{ item.bigTypeStr }}</div>
            <div class="taskCell_content">内容:{{ item.smallTypeStr }}</div>
            <div class="taskCell_date">期限:{{ item.deadline }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { getStatisticsTask } from "@/api/index/index.js";
import avatar from "@/assets/images/avatar.png";

export default {
  data() {
    return {
      // avatar:
      //   "https://img2.woyaogexing.com/2020/06/19/02d268db09ff4e8e9608fd64adbbeed8!400x400.jpeg",
      avatar,

      showRank: false,
      userName: "神秘人",
      policeCode: "124005793",
      position: "未知",
      socre: "96",
      rank: "6",
      taskList: [], // 本周待办任务list
    };
  },
  mounted() {
    // 测试数据
    // this.makeTestData();

    // 获取数据 - 任务统计
    this.handleGetRealData();
  },
  methods: {
    makeTestData() {
      this.taskList = [
        {
          title: "社区居民走访",
          content: "社区居民走访，我部民警放映群众生活提高，期待下次再访问",
          date: "2020-10-1",
        },
        {
          title: "社区居民走访",
          content: "社区居民走访，我部民警放映群众生活提高，期待下次再访问",
          date: "2020-10-1",
        },
        {
          title: "社区居民走访",
          content: "社区居民走访，我部民警放映群众生活提高，期待下次再访问",
          date: "2020-10-1",
        },
      ];
    },
    async handleGetRealData() {
      let result = await this.getRealData().catch((e) => {
        this.$message.error("获取数据出错");
        return;
      });
      let weekTaskData = [
        { value: result.weekTaskCompleted, name: "已完成" },
        { value: result.weekTaskInComplete, name: "未完成" },
      ];
      let monthTaskData = [
        { value: result.monthTaskCompleted, name: "已完成" },
        { value: result.monthTaskInComplete, name: "未完成" },
      ];
      let seasonTaskData = [
        { value: result.quarterTaskCompleted, name: "已完成" },
        { value: result.quarterTaskInComplete, name: "未完成" },
      ];
      this.drawCharts("weekTask", weekTaskData, result.weekTaskTotal);
      this.drawCharts("monthTask", monthTaskData, result.monthTaskTotal);
      this.drawCharts("seasonTask", seasonTaskData, result.quarterTaskTotal);

      // 获取数据 - 用户信息
      this.userName = result.loginName;
      this.position = result.userType;

      // 获取数据 - 待办任务
      if (result.todoTask) {
        this.taskList = result.todoTask.splice(0, 2);
      }
    },
    getRealData() {
      return new Promise((resolve, reject) => {
        getStatisticsTask().then((res) => {
          if (res.errCode == 200) {
            resolve(res.result);
          } else {
            reject();
          }
        });
      });
    },
    drawCharts(refName, data, total) {
      let dom = this.$refs[refName];
      let myChart = this.$echarts.getInstanceByDom(dom);

      if (myChart != null) {
        myChart.clear();
      } else {
        myChart = this.$echarts.init(dom);
      }

      let colorList = ["#1479EE", "#DCDCDC"];

      let option = {
        tooltip: {
          trigger: "item",
        },
        color: colorList,
        // legend: {
        //   top: "5%",
        //   left: "center",
        // },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "18",
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            label:{
              show: true,
              fontSize:20,
              color: "#000",
              position: 'center',
              formatter: () => `${total}\n总量`,
            },
            // data: [
            //   { value: 1048, name: "Search Engine" },
            //   { value: 735, name: "Direct" },
            // ],
            data: data,
          },
        ],
      };

      // 绘制图表
      myChart.setOption(option);

      // window.onresize = function () {
      //   myChart.resize(); //myChart1.resize();    //若有多个图表变动，可多写
      // };
    },
    jump() {
      router.push({ path: "/assessment/task" });
    },
  },
};
</script>

<style lang="scss" scoped>
$padding: 20px;

.box {
  width: 100%;
  height: 100%;
  background-color: #f5f5fc;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-rows: 200px 1fr;
  grid-template-areas:
    "headerInfo sideContent"
    "bodyChart sideContent";
  gap: $padding $padding;
}

.headerInfo {
  grid-area: headerInfo;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userInfo {
    display: flex;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50px;
      margin-left: 50px;
    }
    .details {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 16px;
      .welcome {
        font-size: 20px;
        font-weight: 600;
      }
      .policeCode {
        font-size: 12px;
        color: #423e3e;
        .tag {
          margin-left: 10px;
          height: 20px;
          line-height: 16px;
          font-size: 16px;
        }
      }
    }
  }
  .scoreInfo {
    display: flex;
    margin-right: 30px;
    .myScore {
      display: flex;
      align-items: center;
      .myScore_icon {
        width: 40px;
        height: 40px;
        background-color: #e09494;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i {
        font-size: 18px;
        color: #f93333;
      }
      .myScore_text {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        .myScore_label {
          font-size: 12px;
        }
        .myScore_value {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    .myRank {
      display: flex;
      align-items: center;
      margin-left: 20px;
      .myRank_icon {
        width: 40px;
        height: 40px;
        background-color: #8ec274;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i {
        font-size: 18px;
        color: #74f434;
      }
      .myRank_text {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        .myRank_label {
          font-size: 12px;
        }
        .myRank_value {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
}

.bodyChart {
  grid-area: bodyChart;
  border-radius: 5px;
  background-color: #fff;
  padding-top: 20px;
  .label {
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }
  .chartsBox {
    display: flex;
    width: 100%;
    .charts {
      margin-top: 20px;
      width: 100%;
      .weekTask,
      .monthTask,
      .seasonTask {
        width: 100%;
        height: 200px;
      }
      .monthTask {
        border-left: 1px solid rgba(128, 128, 128, 0.3);
        border-right: 1px solid rgba(128, 128, 128, 0.3);
      }
      .chartsLabel {
        font-size: 14px;
        font-weight: 600;
        margin: 20px 0px;
        text-align: center;
      }
    }
  }
}

.sideContent {
  grid-area: sideContent;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
  .date {
    width: 100%;
    // height: 50%;
    ::v-deep .el-calendar {
      background-color: rgba(255, 255, 255, 0);
    }
    ::v-deep .el-calendar-table .el-calendar-day {
      height: 30px;
      font-size: 12px;
    }
    ::v-deep .el-calendar__button-group {
      display: none;
    }
  }
  .tasks {
    width: 100%;
    height: 48%;
    .title {
      display: flex;
      justify-content: space-between;
      .title_text {
        font-size: 18px;
        font-weight: 600;
      }
      .title_checkAll {
        font-size: 12px;
        line-height: 24px;
        color: #999999;
      }
      .title_checkAll:hover {
        cursor: pointer;
      }
    }
    .taskCell {
      margin: 5px;
      padding: 5px;
      background-color: #f9f9f9;
      .taskCell_type {
        font-size: 16px;
        font-weight: 600;
      }
      .taskCell_content {
        // font-weight: 600;
        font-size: 14px;
      }
      .taskCell_date {
        font-size: 12px;
        color: #999999;
        // font-weight: 600;
      }
    }
  }
}
</style>