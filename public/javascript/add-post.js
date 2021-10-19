// Takes the post-title and post-text values from the form and will send them with a POST request to /api/posts when the form is submitted
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_text = document.getElementById('post-text').value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title, 
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

// Displays modal when button clicked and closes it when the close or background is clicked
const modal = document.getElementById('modal');
const addPostButton = document.getElementById('addPostButton');
const close = document.getElementById('close');

addPostButton.onclick = function() {
  modal.style.display = 'block';
}

close.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);