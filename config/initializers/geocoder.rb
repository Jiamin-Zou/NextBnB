Geocoder.configure(
  lookup: :bing,
  api_key: Rails.application.credentials.bing[:api_key]
)