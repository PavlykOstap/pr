const API_URL = 'http://localhost:4000/api/posts';

document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:4000/posts')
    .then(response => response.json())
    .then(posts => {
      const postsList = document.getElementById('postsList');
      postsList.innerHTML = ''; // Clear existing list

      posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.description}</p>
          <p><strong>Author:</strong> ${post.author}</p>
          <button class="edit" data-id="${post._id}">Edit</button>
          <button class="delete" data-id="${post._id}">Delete</button>
        `;
        postsList.appendChild(li);
      });

      // Add event listeners for Edit and Delete buttons
      document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', function () {
          const postId = this.getAttribute('data-id');
          window.location.href = `editPost.html?id=${postId}`;
        });
      });

      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function () {
          const postId = this.getAttribute('data-id');
          fetch(`http://localhost:4000/posts/${postId}`, {
            method: 'DELETE',
          })
            .then(() => {
              alert('Post deleted');
              location.reload();
            })
            .catch(error => console.error('Error deleting post:', error));
        });
      });
    })
    .catch(error => console.error('Error loading posts:', error));
});

