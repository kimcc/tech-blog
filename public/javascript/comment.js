async function commentFormHandler(event) {
  event.preventDefault();

  const commentText = document.getElementById('comment-text').value.trim();


  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  //If the comment text exists (not blank), then add the comment

  if (commentText) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
          comment_text: commentText,
          post_id: post_id,
      }),
      headers: { 
        'Content-Type': 'application/json'
      }
    })

    if(response.ok) {
        console.log('Comment added!');
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);