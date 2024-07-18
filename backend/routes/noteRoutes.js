const express = require("express");
const { getNotes, createNote,getNoteById ,updateNote,deleteNote} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();

// Getting notes from user request (protected route)
router.route("/").get( protect,getNotes);

// Creating notes and posting it (protected route)
router.route("/create").post(protect,createNote);

// From id, we can fetch the notes
router.route("/:id")
  // Read
  .get(getNoteById)
  // Update
  .put(protect,updateNote)
  // // Delete
  .delete(protect,deleteNote);

module.exports = router;

