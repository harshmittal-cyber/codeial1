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
      pass: "",
    },
  },
  google_client_id:
    "906700903822-2094shr8ajp9qi090nf6o4e6iaek5lpd.apps.googleusercontent.com",
  google_client_secret: "_fGoUxzktOrGKr-yu9MGP4XQ",
  google_callback_url: "http://localhost:2000/users/auth/google/callback",
  jwt_secret: "codeial",
};

const production = {
  name: process.env.CODEIAL_ENVIRONMENT,
  asset_path: process.env.CODEIAL_ASSET_PATH,
  asset_path: "./assets",
  session_cookie_key: "pOzzH5PUNcXMkoDz5jvnaZNXoD8IfjoO",
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.CODEIAL_GOOGLE_CLIENT_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
};
//aese hi sab property ka banan padega br
module.exports = eval(
  process.env.CODEIAL_ENVIRONMENT == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT)
);
