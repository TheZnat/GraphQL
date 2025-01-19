import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
const URL =
  "mongodb+srv://workznat:Password123@cluster0.eewxs.mongodb.net/moviebox?retryWrites=true&w=majority";

// Подключение к MongoDB с проверкой подключения
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, (err) => {
  err
    ? console.log(`Error: ${err}`)
    : console.log(`Сервер запущен на http://localhost:${PORT}`);
});
