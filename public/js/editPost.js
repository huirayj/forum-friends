const editPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();
  const id = document.querySelector('.edit-btn').getAttribute('data-id');

  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    document.location.replace('/dashboard');
  }
}

document.querySelector('.edit-btn').addEventListener('click', editPostHandler);
