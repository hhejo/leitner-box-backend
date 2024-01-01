import express from "express";
import cors from "cors";
import db, { ObjectId } from "./conn.mjs";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", async (_, res) => {
  const findResult = await db.collection("cards").find().toArray();
  return res.json(findResult);
});

app.post("/cards", async (req, res) => {
  const { question, answer } = req.body;
  const level = 1;
  const createdAt = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const testAt = new Date(new Date().setUTCHours(24, 0, 0, 0));
  const newCard = { question, answer, level, createdAt, testAt };
  const insertResult = await db.collection("cards").insertOne(newCard);
  const result = { ...newCard, _id: insertResult.insertedId };
  return res.json(result);
});

app.delete("/cards/:cardId", async (req, res) => {
  const cardId = req.params.cardId;
  await db.collection("cards").findOneAndDelete({ _id: new ObjectId(cardId) });
  return res.json({ result: "success", _id: cardId });
});

app.get("/today", async (_, res) => {
  const findResult = await db.collection("cards").find({}).toArray();
  return res.json(findResult);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
