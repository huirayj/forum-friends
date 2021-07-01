const loginFormHandler = async (e) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  e.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      // If successful, redirect the browser to the post page
      document.location.replace('/posts');
    }
  }
};

const signupFormHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#user-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      document.location.replace('/posts');
    }
  }
};

document
  .querySelector('.sign-in')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.sign-up')
  .addEventListener('submit', signupFormHandler);

