const Post = require('../models/post');

// Отримання всіх постів
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Створення нового поста
exports.createPost = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newPost = new Post({ title, description, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Оновлення поста
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, description, author }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Видалення поста
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
