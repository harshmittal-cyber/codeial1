const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blasomething",
  db: "codeial_development1",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: "harshmittal7852",
      pass: "erharsh8492",
    },
  },
  google_client_id:
    "906700903822-2094shr8ajp9qi090nf6o4e6iaek5lpd.apps.googleusercontent.com",
  google_client_secret: "_fGoUxzktOrGKr-yu9MGP4XQ",
  google_callback_url: "http://localhost:2000/users/auth/google/callback",
  jwt_secret: "codeial",
};

const production = {
  name: "production",
};

module.exports = development;
