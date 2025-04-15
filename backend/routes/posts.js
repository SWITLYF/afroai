const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../config/db");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create post
router.post("/create", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const featured = req.body.featured === "1" ? 1 : 0;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  console.log({ title, content, imageUrl, featured }); // Debug logging

  const sql = "INSERT INTO posts (title, content, image, featured) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, content, imageUrl, featured], (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Fetch paginated posts
router.get("/", (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  db.query("SELECT COUNT(*) as total FROM posts", (err, countResult) => {
    if (err) return res.status(500).send(err);

    const totalPosts = countResult[0].total;
    const totalPages = Math.ceil(totalPosts / parseInt(limit));

    db.query(
      "SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?",
      [parseInt(limit), offset],
      (err, results) => {
        if (err) return res.status(500).send(err);

        const formattedPosts = results.map((post) => ({
          id: post.id.toString(),
          title: post.title,
          excerpt: post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content,
          date: new Date().toLocaleDateString(),
          image: post.image ? `http://localhost:5000${post.image}` : undefined,
          author: {
            name: "Anonymous",
            avatar: "/default-avatar.png",
          },
          category: "General",
          readingTime: "5 min",
          tags: ["blog", "post"],
        }));

        res.json({
          posts: formattedPosts,
          totalPages,
          currentPage: parseInt(page),
          totalPosts,
        });
      }
    );
  });
});

// Fetch single post
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length) return res.status(404).json({ error: "Post not found" });

    const post = results[0];
    res.json({
      id: post.id.toString(),
      title: post.title,
      excerpt: post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content,
      content: post.content,
      date: new Date().toLocaleDateString(),
      image: post.image ? `http://localhost:5000${post.image}` : undefined,
      author: { name: "Anonymous", avatar: "/default-avatar.png" },
      category: "General",
      readingTime: "5 min",
      tags: ["blog", "post"],
    });
  });
});

module.exports = router;
