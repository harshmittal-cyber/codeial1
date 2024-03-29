const express = require("express");
const env = require("./config/environment");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
require("./config/view-helpers")(app);

const port = 2000;
const expresslayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-startegy");
const passportgoogle = require("./config/passport-google-oauth2-strategy");
//mongo store and it require session argument which is in bracket
const MongoStore = require("connect-mongo")(session);

//node-sass-middlewarenpm
const sassMiddleware = require("node-sass-middleware");
//connect flash for pop up message
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port:5000");
const path = require("path");
if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}
//middleware
app.use(express.urlencoded());
app.use(cookieParser());

//use assets
app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));

//using layouts and it is a wrapper of body for which controller is render
app.use(expresslayouts);

//extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//use for session cookie to encrypt the cookie
//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    //todo chenge the secret before deployement in production mode
    secret: env.session_cookie_key,
    //if identity is not established means not login then so it wont store the extra data
    saveUninitialized: false,
    //when identity is established it dont resave if any changes is not done
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //use mongo store for storing cookie
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      //in case connection is not established
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//need to tell to use the passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);
//we use flash for pop up msg
app.use(flash());
//using flash middleware
app.use(customMware.setflash);
//use express router.Put this after passport middleware
//this call router and then router call controller for / then we get a response
app.use("/", require("./routes/index.js"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running a server", err);
  }
  console.log("server is running on port", port);
});
