const express = require("express");
const app = express();
const path = require("path");
const methodoverride = require("method-override");

app.set("views" ,path.join(__dirname ,"/views"));
app.set("view engine" ," ejs");
app.use(express.static(path.join(__dirname ,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));

app.get("/" ,(req ,res)=>{
res.render("home.ejs");
});

app.get("/todoapp" ,(req ,res)=>{
    res.render("todo-list/todoapp.ejs");
})
app.get("/spotify" ,(req ,res)=>{
    res.render("spotify/spotify-clone.ejs");
})
app.get("/simon-says" ,(req ,res)=>{
    res.render("simon-says-game/simon-says.ejs");
})
let alarms = [
    {
        tob: "05:20 AM",
        scheduale: "Once"
    },
    {
        tob: "08:00 AM",
        scheduale: "Once"
    },
    {
        tob: "07:30 AM",
        scheduale: "Once"
    }
];
app.get("/alarms", (req, res) => {
    res.render("alarm/index.ejs", { alarms });
})
app.get("/alarms/new", (req, res) => {
    res.render("alarm/new.ejs");
})
app.post("/alarms", (req, res) => {
    let { tob, scheduale } = req.body;
    alarms.push({ tob, scheduale });
    res.redirect("/alarms");
})
app.get("/alarms/edit", (req, res) => {
    let { dt } = req.params;
    let alarm = alarms.find((a) => dt === a.dt);
    res.render("alarm/edit.ejs", { alarm });
});
app.put("/alarms", (req, res) => {
    let { dt } = req.params;
    let newtime = req.body.tob;
    let newalarm = req.body.scheduale;
    let alarm = alarms.find((a) => dt === a.dt);
    alarm.tob = newtime;
    alarm.scheduale = newalarm;
    console.log(alarm);
    res.redirect("/alarms");
})

app.listen(8080 ,(req ,res )=>{
    console.log("listening on port");
})
