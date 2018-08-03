const express = require("express");
const app = express();
const queries = require("./queries");
cors = require("cors");
port = process.env.PORT || 3000;
const methodOverride = require("method-override");

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res, next) => {
    res.redirect("/students");
});

app.get("/students", (req, res, next) => {
    queries.list().then(student => res.render("index", { student: student }));
});

app.get("/students/new", (req, res) => {
    res.render("new");
});

app.post("/students", (req, res) => {
    queries
        .create(req.body.student)
        .then(newStudent => {
            res.redirect("/");
        })
        .catch(err => {
            res.send("error: ", err);
        });
});

app.get("/students/:id", (req, res, next) => {
    queries
        .read(req.params.id)
        .then(student => {
            res.render("show", { student: student });
        })
        .catch(next);
});

app.get("/students/:id/edit", (req, res) => {
    queries
        .read(req.params.id)
        .then(student => res.render("edit", { student: student }));
});

app.put("/students/:id", (req, res) => {
    queries.update(req.params.id, req.body.student).then(student => {
        res.redirect("/");
    });
});

app.delete("/students/:id", (req, res, next) => {
    queries
        .delete(req.params.id)
        .then(student => {
            res.redirect("/");
        })
        .catch(next);
});

app.listen(port, function() {
    console.log("listening on port " + port);
});
