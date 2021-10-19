// Login form
async function signupFormHandler(event) {
  event.preventDefault();

  // Get username and password
  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim();

  // Check for username and password entered
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
          username,
          password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // Return to homepage if successful sign up
    if (response.ok) {
      document.location.replace('/');
    } else {
        alert(response.statusText);
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);