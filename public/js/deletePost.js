const deletePostHandler = async (e) => {
  e.preventDefault();
  
  const id = document.querySelector('.delete-btn').getAttribute('data-id');
  console.log(id);
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
    document.location.replace('/dashboard/');
  } else {
    alert(res.statusText);
  }
}

document.querySelector('.delete-btn').addEventListener('click', deletePostHandler);