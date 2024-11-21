const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Отримання всіх постів
router.get('/', postController.getAllPosts);

// Створення нового поста
router.post('/', postController.createPost);

// Оновлення поста
router.put('/:id', postController.updatePost);

// Видалення поста
router.delete('/:id', postController.deletePost);

module.exports = router;
