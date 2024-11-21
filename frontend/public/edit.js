const API_URL = 'http://localhost:4000/posts';

document.addEventListener('DOMContentLoaded', function () {
    const postId = new URLSearchParams(window.location.search).get('id');
  
    if (postId) {
      fetch(`http://localhost:4000/posts/${postId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.status}`);
          }
          return response.json();
        })
        .then(post => {
          if (post) {
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postDescription').value = post.description;
          }
        })
        .catch(error => {
          console.error('Error loading post:', error);
          alert('Failed to load post. Returning to posts page.');
          window.location.href = 'posts.html';
        });
    } else {
      alert('Invalid Post ID. Returning to posts page.');
      window.location.href = 'posts.html';
    }
  });
  
  function savePost() {
    const postId = new URLSearchParams(window.location.search).get('id');
    if (postId) {
      const updatedPost = {
        title: document.getElementById('postTitle').value.trim(),
        description: document.getElementById('postDescription').value.trim(),
      };
  
      console.log('Saving post with ID:', postId);
      console.log('Updated data:', updatedPost);
  
      fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to update post: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          alert('Post updated successfully!');
          window.location.href = 'posts.html';
        })
        .catch(error => console.error('Error updating post:', error));
    }
  }
  