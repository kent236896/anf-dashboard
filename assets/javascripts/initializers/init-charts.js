import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "init-charts",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        if (window.location.pathname === "/dashboard") {
          // 如果还没有加载Chart.js，添加CDN版本
          if (typeof Chart === "undefined") {
            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
            script.integrity =
              "sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==";
            script.crossOrigin = "anonymous";
            script.referrerPolicy = "no-referrer";
            document.head.appendChild(script);
          }
        }
      });
    });
  },
};
