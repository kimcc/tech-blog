// Login form
async function loginFormHandler(event) {
  event.preventDefault();

  // Get username and password
  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim();

  // Check for username and password entered
  if (username && password) {
    const response = await fetch('/api/users/login', {
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

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);