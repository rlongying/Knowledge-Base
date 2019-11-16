let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let expressHbs = require("express-handlebars");
let messageRouter = require("./routes/message")
let loginRouter = require("./routes/login");
let homeRouter = require("./routes/home");
const postRouter = require("./routes/post");

let app = express();
let db = require("./util/database");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs"
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(loginRouter);
app.use(homeRouter);

app.use(messageRouter);
app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server is listening on: ${port}`));
