import express from "express";
import cors from "cors";
import db from "./conn.mjs";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  let findResult = null;
  (async () => {
    const cards = db.collection("cards");
    findResult = await cards.find({}).toArray();
    console.log(findResult);
    res.send({ findResult });
  })();
});

app.post("/cards", (req, res) => {
  const { question, answer } = req.body;
  // let ddate = new Date();
  // let [date, time] = ddate.toISOString().split(".")[0].split("T");
  // console.log(date, time);
  console.log(question, answer);
  (async () => {
    const cards = db.collection("cards");
    await cards.insertOne({ question, answer });
  })();
  res.send({ result: "success" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
