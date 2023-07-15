const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/notesDB");
const notesSchema = {
  title: String,
  content: String,
};
const Note = new mongoose.model("Note", notesSchema);

app.get("/", (req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error" + err));
});
app.post("/add", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const newNote = new Note({ title, content });
  newNote
    .save()
    .then(() => res.json("Note added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then(() => res.json("Blog deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
