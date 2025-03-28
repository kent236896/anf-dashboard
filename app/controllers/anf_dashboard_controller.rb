# frozen_string_literal: true

module AnfDashboard
  class DashboardController < ::ApplicationController
    requires_plugin AnfDashboard::PLUGIN_NAME

    skip_before_action :check_xhr

    def index
      respond_to do |format|
        format.html { render html: "", layout: true }

        format.json do
          render json: {
                   success: true,
                   stats: generate_stats,
                   trends: generate_trends,
                   activities: generate_activities,
                 }
        end
      end
    end

    private

    def generate_stats
      {
        users: {
          total: User.count,
          active: User.where("last_seen_at > ?", 30.days.ago).count,
          new_this_month: User.where("created_at > ?", 30.days.ago).count,
          growth: 12.5,
        },
        topics: {
          total: Topic.count,
          created_this_month: Topic.where("created_at > ?", 30.days.ago).count,
          average_posts: 8.3,
          growth: 5.2,
        },
        posts: {
          total: Post.count,
          this_month: Post.where("created_at > ?", 30.days.ago).count,
          average_likes: 4.7,
          growth: 7.8,
        },
        engagement: {
          dau: 234,
          mau: 1872,
          retention: "68%",
          growth: 3.4,
        },
      }
    end

    def generate_trends
      {
        user_growth: [125, 146, 152, 167, 172, 198, 212, 230, 243, 256, 278, 289],
        topic_activity: [67, 72, 85, 56, 73, 94, 63, 58, 87, 103, 95, 78],
        engagement_rate: [53, 55, 54, 57, 59, 62, 65, 64, 66, 68, 69, 70],
        traffic_sources: [
          { name: "Organic Search", value: 42.5 },
          { name: "Direct", value: 25.8 },
          { name: "Referral", value: 18.2 },
          { name: "Social", value: 13.5 },
        ],
      }
    end

    def generate_activities
      [
        {
          id: 1,
          user: "david_miller",
          action: "created a new topic",
          content: "Getting Started with Discourse API",
          time: "2 hours ago",
          avatar: "https://avatars.discourse.org/v4/letter/d/81c274/{size}.png",
        },
        {
          id: 2,
          user: "sarah_parker",
          action: "replied to",
          content: "Setting up SSO with Auth0",
          time: "3 hours ago",
          avatar: "https://avatars.discourse.org/v4/letter/s/9de053/{size}.png",
        },
        {
          id: 3,
          user: "john_smith",
          action: "liked",
          content: "Best practices for community moderation",
          time: "5 hours ago",
          avatar: "https://avatars.discourse.org/v4/letter/j/c2e384/{size}.png",
        },
        {
          id: 4,
          user: "admin",
          action: "pinned topic",
          content: "Welcome to our community!",
          time: "6 hours ago",
          avatar: "https://avatars.discourse.org/v4/letter/a/ed755f/{size}.png",
        },
        {
          id: 5,
          user: "emma_wilson",
          action: "created a new topic",
          content: "Improving site performance tips",
          time: "8 hours ago",
          avatar: "https://avatars.discourse.org/v4/letter/e/67e9fc/{size}.png",
        },
      ]
    end
  end
end
