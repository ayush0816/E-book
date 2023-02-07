const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const Joi = require("joi");

//get all notes GET
router.get("/getnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.id });
  console.log(notes);
  res.send(notes);
});

router.post("/addnote", fetchUser, async (req, res) => {
  const result = validate(req.body);
  if (!result) return res.status(401).send("ENTER VALID TEXT");
  const note = new Notes({
    user: req.id,
    title: req.body.title,
    description: req.body.description,
  });

  const savedNote = await note.save();
  res.send(savedNote);
});

router.put("/update/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  let note = await Notes.findById(req.params.id);
  if (!note) return res.status(400).send("Note not found");

  if (note.user.toString() !== req.id) {
    return res.status(400).send("Access denied");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.send(note);
});

router.delete("/delete/:id", fetchUser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  if (!note) return res.status(300).send("Note not found");

  if (note.user.toString() !== req.id) {
    return res.status(400).send("Access denied");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.send(note);
});

function validate(result) {
  const Schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().required(),
  });

  return Schema.validate(result);
}
module.exports = router;
