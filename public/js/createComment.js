const commentFormHandler = async (e) => {
    e.preventDefault();
  
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
    const location = window.location.toString().split('/');
    const post_id = location[location.length - 1];
  
    if (comment) {
        const res = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (res.ok) {
          document.location.reload();
        } else {
          alert(res.statusText);
        }
      }
  };
  
  document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);