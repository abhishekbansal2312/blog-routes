const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blogpost");
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /blogs/:id - Retrieve a blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /blogs - Create a new blog
router.post("/", async (req, res) => {
  const blog = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /blogs/:id - Delete a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    console.log(`Attempting to delete blog with ID: ${req.params.id}`);
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      console.log(`Blog with ID ${req.params.id} not found`);
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.remove();
    console.log(`Blog with ID ${req.params.id} deleted successfully`);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(`Error deleting blog with ID ${req.params.id}:`, err.message);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
