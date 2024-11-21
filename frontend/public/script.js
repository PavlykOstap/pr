const API_URL = 'http://localhost:4000/api/posts';

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
  
    const postData = {
      title: title,
      description: description,
      author: author
    };
  
    fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      // Перенаправити на сторінку з постами
      window.location.href = '/posts.html';
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  });
  