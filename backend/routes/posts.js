const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../config/db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/create", upload.single("image"), (req, res) => {
  const { title, content, featured } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const sql = "INSERT INTO posts (title, content, image, featured) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, content, imageUrl, featured], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true, id: result.insertId });
  });
});

router.get("/", (req, res) => {
  const { page = 1, limit = 6 } = req.query; // Default to page 1, 6 posts per page
  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Query to count total posts
  db.query("SELECT COUNT(*) as total FROM posts", (err, countResult) => {
    if (err) return res.status(500).send(err);
    const totalPosts = countResult[0].total;
    const totalPages = Math.ceil(totalPosts / parseInt(limit));

    // Query to fetch paginated posts
    db.query(
      "SELECT * FROM posts LIMIT ? OFFSET ?",
      [parseInt(limit), offset],
      (err, results) => {
        if (err) return res.status(500).send(err);
        const formattedPosts = results.map((post) => ({
          id: post.id.toString(),
          title: post.title,
          excerpt: post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content,
          date: new Date().toLocaleDateString(), // Placeholder; use post.date if column added
          image: post.image ? `http://localhost:5000${post.image}` : undefined,
          author: {
            name: "Anonymous", // Placeholder; use post.author_name if column added
            avatar: "/default-avatar.png", // Placeholder; use post.author_avatar if column added
          },
          category: "General", // Placeholder; use post.category if column added
          readingTime: "5 min", // Placeholder; use post.readingTime if column added
          tags: ["blog", "post"], // Placeholder; use post.tags.split(',') if column added
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