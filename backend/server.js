require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 4000;
const mongoURI = process.env.MONGO_URI;

// Підключення до MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Опис схеми поста
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String  // Якщо ви хочете додавати автора в кожен пост
});

// Створення моделі для постів
const Post = mongoose.model('Post', postSchema);

app.use(cors());
app.use(express.json());

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Створення нового поста
app.post('/posts', (req, res) => {
  const { title, description, author } = req.body;
  const newPost = new Post({ title, description, author });

  newPost.save()
    .then(() => res.status(201).json(newPost))
    .catch(error => res.status(400).json({ error }));
});

// Отримання всіх постів
app.get('/posts', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(error => res.status(500).json({ error }));
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
  
    Post.findById(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
      })
      .catch(error => res.status(500).json({ error }));
  });
  

// Оновлення поста
app.put('/posts/:id', (req, res) => {
    console.log('Updating post with ID:', req.params.id);
    console.log('Request body:', req.body)
    const { id } = req.params;
    const { title, description } = req.body;
  
    Post.findByIdAndUpdate(id, { title, description }, { new: true })
      .then(updatedPost => {
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
      })
      .catch(error => res.status(400).json({ error }));
  });
  
  


// Видалення поста за ID
app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(error => res.status(400).json({ error }));
});

// Статичний маршрут для головної сторінки (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Ручки для статичних сторінок (наприклад posts.html) 
// (якщо у вас є потреба в додаткових статичних сторінках)
app.get('/posts.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/posts.html'));
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
