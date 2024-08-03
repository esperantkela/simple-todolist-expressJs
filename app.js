const express = require("express");

const app = express();
const session = require("express-session");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (!req.session.tasks) {
    req.session.tasks = [];
  }
  res.render("pages/todolist", { tasks: req.session.tasks });
});

app.post("/task", (req, res) => {
  if (req.body.title) {
    req.session.tasks.push({
      title: req.body.title,
      done: false,
    });
  }

  res.redirect("/");
});

app.get("/task/:id/done", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks[req.params.id].done = true;
  }
  res.redirect("/");
});

app.get("/task/:id/delete", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks.splice(req.params.id, 1);
  }
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`listening in port ${port}`);
});
