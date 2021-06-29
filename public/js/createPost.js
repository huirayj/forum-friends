const newFormHandler = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('textarea').value.trim();
    console.log(title, content);
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
  
    // if (res.ok) {
    //   document.location.replace('/post');
    // } else {
    //   alert(res.statusText);
    // }
  }
  
  document.querySelector('.new-msg-form').addEventListener('submit', newFormHandler);