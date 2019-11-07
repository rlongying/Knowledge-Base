let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let expressHbs = require("express-handlebars");

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

app.get("/", (req, res) => {
  // use example of database
  db.execute("select * from test")
    .then(([rows, fields]) => {
      console.log("rows:" + JSON.stringify(rows));
    })
    .catch(err => console.log("error: " + err));
  res.render("home");
});

app.listen(port, () => console.log(`Server is listening on: ${port}`));
