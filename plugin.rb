# name: anf-dashboard
# about: Analytics Dashboard Plugin for Discourse
# version: 0.1
# authors: Your Name
# url: https://github.com/your-username/anf-dashboard

register_asset "stylesheets/dashboard.scss"

after_initialize do
  module ::AnfDashboard
    PLUGIN_NAME = "anf-dashboard".freeze
  end

  require_dependency "application_controller"
  require_dependency File.expand_path("../app/controllers/anf_dashboard_controller.rb", __FILE__)

  Discourse::Application.routes.append { get "/dashboard" => "anf_dashboard/dashboard#index" }
end
