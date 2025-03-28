import Controller from "@ember/controller";
import { action } from "@ember/object";
import { scheduleOnce } from "@ember/runloop";

export default Controller.extend({
  init() {
    this._super(...arguments);
    console.log("Dashboard controller initialized");
    this.refreshInterval = setInterval(() => {
      this.refreshData();
    }, 300000); // 每5分钟刷新一次
  },

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce("afterRender", this, this.initCharts);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    scheduleOnce("afterRender", this, this.initCharts);
  },

  // 添加图表初始化方法
  initCharts() {
    scheduleOnce("afterRender", this, () => {
      this.renderUserGrowthChart();
    });
  },

  renderUserGrowthChart() {
    const canvas = document.getElementById("userGrowthChart");
    if (!canvas) {
      return;
    }

    // 销毁现有图表（如果存在）
    if (this.userGrowthChart) {
      this.userGrowthChart.destroy();
    }

    // 准备数据
    const data = this.model.trends.user_growth;
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    // 创建新图表
    this.userGrowthChart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "User Growth",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },

  willDestroy() {
    this._super(...arguments);
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // 销毁图表
    if (this.userGrowthChart) {
      this.userGrowthChart.destroy();
    }
  },

  refreshData() {
    this.send("refreshModel");
  },

  actions: {
    refreshModel() {
      console.log("Refresh model action called");
      // 简单地刷新页面而不是异步加载
      window.location.reload();
    },

    switchTimeframe(timeframe) {
      console.log(`Switching to timeframe: ${timeframe}`);
      // 可以在这里添加更新图表数据的逻辑
      scheduleOnce("afterRender", this, this.initCharts);
    },

    changeView(view) {
      console.log(`Changing to view: ${view}`);
    },
  },
});
