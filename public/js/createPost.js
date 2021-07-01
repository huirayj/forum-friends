const createPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('textarea').value.trim();

  const res = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    document.location.replace('/posts');
  }
}
document.querySelector('.new-msg-form').addEventListener('submit', createPostHandler);