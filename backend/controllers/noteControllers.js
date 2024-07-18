const Note = require("../models/noteModule");
const asyncHandler = require("express-async-handler");
// Controller to get notes
const getNotes = asyncHandler(async (req, res) => {
  // Debugging: Log the value of req.user
  console.log("req.user:", req.user);

  // Check if req.user is defined and has an _id property
  if (!req.user || !req.user._id) {
    res.status(401); // Unauthorized
    throw new Error("User not authenticated");
  }

  // Find all notes for the authenticated user
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});


// Controller to create a note
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Create a new note with the authenticated user's ID
  const note = new Note({ user: req.user._id, title, content, category });

  // Save the note to the database
  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

//getting single note by id
const getNoteById = asyncHandler(async (req, res) => {
  //fetching id from url that we have in noteRoute.js
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  }
  else {
    res.status(404).json({ message: "Note not found" });
  }
});

//update note function 
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  note.title = title || note.title;
  note.content = content || note.content;
  note.category = category || note.category;

  const updatedNote = await note.save();
  res.json(updatedNote);
});

//delete Notes

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  await Note.deleteOne({ _id: req.params.id });

  res.json({ message: "Note removed" });
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
