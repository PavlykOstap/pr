const API_URL = 'http://localhost:4000/api/posts';

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

function fetchPosts() {
    fetch('http://localhost:4000/posts')
        .then(response => response.json())
        .then(posts => {
            const postsList = document.getElementById('postsList');
            postsList.innerHTML = ''; // Очищаємо список перед оновленням
            posts.forEach(post => {
                const postItem = document.createElement('li');
                postItem.classList.add('post-item');
                postItem.setAttribute('data-id', post._id);  // Додаємо атрибут data-id

                postItem.innerHTML = `
                    <h2 contenteditable="true" class="post-title">${post.title}</h2>
                    <p contenteditable="true" class="post-description">${post.description}</p>
                    <button class="save-button" onclick="savePost('${post._id}')">Save</button>
                    <button class="edit-button" onclick="editPost('${post._id}')">Edit</button>
                    <button class="delete-button" onclick="deletePost('${post._id}')">Delete</button>
                `;
                postsList.appendChild(postItem);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Збереження змін у пості
function savePost(postId) {
    // Оновлюємо пошук елемента поста з правильним data-id
    const postItem = document.querySelector(`#postsList .post-item[data-id="${postId}"]`);
    const postTitle = postItem.querySelector('.post-title').innerText;
    const postDescription = postItem.querySelector('.post-description').innerText;

    const updatedPost = {
        title: postTitle,
        description: postDescription
    };

    fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(updatedPost => {
        alert('Post updated successfully!');
        fetchPosts(); // Повторно завантажуємо пости
    })
    .catch(error => console.error('Error updating post:', error));
}

// Видалення поста
function deletePost(postId) {
    fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        alert('Post deleted successfully!');
        fetchPosts(); // Повторно завантажуємо пости
    })
    .catch(error => console.error('Error deleting post:', error));
}

// Режим редагування (це вже робиться через contenteditable, тому окремої функції не потрібно)
function editPost(postId) {
    const postItem = document.querySelector(`#postsList .post-item[data-id="${postId}"]`);
    const title = postItem.querySelector('.post-title');
    const description = postItem.querySelector('.post-description');

    // Можна додати тут додаткову логіку для редагування, якщо необхідно
}
