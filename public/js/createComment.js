const commentFormHandler = async (e) => {
  e.preventDefault();

  const element = e.target;

  if (element.matches('.comment-btn')) {
    const parent = element.closest('.comments');
    const content = parent.querySelector('.comment-content').value.trim();
    const post_id = parent.dataset.id;

    if (content) {
      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        document.location.reload();
      }
    }
  }
};

document.querySelector('.post-comments').addEventListener('click', commentFormHandler);