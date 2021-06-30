const commentFormHandler = async (e) => {
  e.preventDefault();

  const content = document.querySelector('#textarea1').value.trim();
  const post_id = document.querySelector('.comment-btn').getAttribute('data-id');
  console.log(post_id);

  // if (content) {
  //   const res = await fetch('/api/comments', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       post_id,
  //       content
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   if (res.ok) {
  //     document.location.reload();
  //   } else {
  //     alert(res.statusText);
  //   }
  // }
};

const newCommentBtns = document.querySelectorAll('.comment-btn');

for (const btn of newCommentBtns) {
  btn.addEventListener('click', commentFormHandler);
}
// document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);