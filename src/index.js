import express from "express";
import cors from "cors";
import db from "./conn.mjs";

const app = express();
const port = 3000;

const cardList = [];

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  // console.log(req);
  (async () => {
    const cards = db.collection("cards");
    console.log(cards);
  })();
  res.send("Hello World!");
});

app.post("/cards", (req, res) => {
  const { question, answer } = req.body;
  let ddate = new Date();
  let [date, time] = ddate.toISOString().split(".")[0].split("T");
  console.log(date, time);
  // const card = {
  //   question,
  //   answer,
  //   createdAt: new Date()
  // }
  console.log(question, answer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
