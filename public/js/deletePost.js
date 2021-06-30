const deletePostHandler = async (e) => {
  e.preventDefault();
  
  const id = document.querySelector('.delete-btn').getAttribute('data-id');
 
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

const allDelBtns = document.querySelectorAll('.delete-btn');

for (const btn of allDelBtns) {
  btn.addEventListener('click', deletePostHandler);
}

// document.querySelector('.delete-btn').addEventListener('click', deletePostHandler);