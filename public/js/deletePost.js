const deletePostHandler = async (e) => {

  const element = e.target;

  if (element.matches(".delete-btn")) {
    const id = element.dataset.id;

    const res = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      document.location.replace('/dashboard');
    }
  }
}

document.querySelector('.posts').addEventListener('click', deletePostHandler);