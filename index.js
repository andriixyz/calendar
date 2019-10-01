const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.listen(5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const MongoClient = require("mongodb").MongoClient;
const urlMongo = "mongodb://localhost:27017/local";
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.post("/changeState", (req, res) => {
  const body = req.body;
  MongoClient.connect(urlMongo, async function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    const user = await dbo.collection("users").findOne({ name: body.login });
    await dbo.collection("events").deleteMany({ user_id: user._id });
    for (let i = 0; i < body.events.length; ++i) {
      await dbo.collection("events").insertOne({
        start: body.events[i].start,
        duration: body.events[i].duration,
        title: body.events[i].title,
        user_id: user._id
      });
    }
    db.close();
  });
});
app.post("/getEvents", (req, res) => {
  const body = req.body;
  MongoClient.connect(urlMongo, async function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    const user = await dbo.collection("users").findOne({ name: body.login });
    await dbo
      .collection("events")
      .find({ user_id: user._id })
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).send(JSON.stringify(result));
        db.close();
      });

    db.close();
  });
});

app.post("/login", (req, res) => {
  MongoClient.connect(urlMongo, async function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    await dbo
      .collection("users")
      .find({ name: req.body.login })
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
          res
            .status(400)
            .send(JSON.stringify({ response: "User does not exist!" }));
        } else {
          res.status(200).send(JSON.stringify({ response: "Login in" }));
        }
        db.close();
      });
  });
});
