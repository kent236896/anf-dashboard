import Component from "@ember/component";
import { scheduleOnce } from "@ember/runloop";

export default Component.extend({
  tagName: "div",
  classNames: ["chart-container"],

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce("afterRender", this, this.renderChart);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    scheduleOnce("afterRender", this, this.renderChart);
  },

  renderChart() {
    const canvas = this.element.querySelector("canvas");
    if (!canvas) {
      return;
    }

    // 检查Chart是否已定义
    if (typeof Chart === "undefined") {
      console.warn("Chart.js is not loaded yet");
      setTimeout(() => this.renderChart(), 1000); // 1秒后重试
      return;
    }

    // 销毁现有图表（如果存在）
    if (this.chart) {
      this.chart.destroy();
    }

    // 准备数据
    const data = this.data || [];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    try {
      // 创建新图表
      this.chart = new Chart(canvas, {
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
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Failed to create chart:", error);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.chart) {
      this.chart.destroy();
    }
  },
});
