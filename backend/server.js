const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const postsRoutes = require('./routes/posts');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/posts', postsRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));