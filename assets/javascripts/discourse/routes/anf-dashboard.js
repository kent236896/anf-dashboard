import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    // 提供最简单的静态数据
    return {
      stats: {
        users: {
          total: 3,
          active: 1,
          new_this_month: 3,
          growth: 12.5,
        },
        topics: {
          total: 7,
          created_this_month: 7,
          average_posts: 8.3,
          growth: 5.2,
        },
        posts: {
          total: 8,
          this_month: 8,
          average_likes: 4.7,
          growth: 7.8,
        },
        engagement: {
          dau: 234,
          mau: 1872,
          retention: "68%",
          growth: 3.4,
        },
      },
      trends: {
        user_growth: [125, 146, 152, 167, 172, 198],
      },
      recentProjects: [
        {
          id: 1,
          name: "Project Alpha",
          description: "Cloud native application development framework",
        },
        {
          id: 2,
          name: "Project Beta",
          description: "Open source database management system",
        },
      ],
      activities: [],
    };
  },
});
