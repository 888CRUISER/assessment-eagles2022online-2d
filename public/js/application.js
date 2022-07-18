const authReg = document.querySelector('.reg-form');
const authLog = document.querySelector('.log-form');
const createPost = document.querySelector('.post-upload');
const likePost = document.querySelector('.all-posts-home');
const deleteORchange = document.querySelector('.all-posts');
const editPost = document.querySelector('.edit-post');

authReg?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#inputName').value;
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;

  try {
    const res = await fetch('/auth/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.status === 303) {
      alert(`Такой ${email} уже зарегистрирован!`);
      window.location.href = '/auth/reg';
    } else {
      window.location.href = '/';
    }
  } catch (error) {
    console.log(error.message);
  }
});

authLog?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;

  try {
    const res = await fetch('/auth/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 200) {
      window.location.href = '/';
    } else {
      alert('Не верно введен Email или Password! Попробуйте еще раз');
      window.location.href = '/auth/log';
    }
  } catch (error) {
    console.log(error.message);
  }
});

createPost?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(document.createPostImg);

  try {
    const response = await fetch('/user/upload', {
      method: 'POST',
      body: data,
    });

    if (response.status === 200) {
      window.location.href = '/home';
    } else {
      alert('Что-то пошло не так, попробуйте еще раз!');
      window.location.href = '/user/profile';
    }
  } catch (error) {
    console.log(error.message);
  }
});

likePost?.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(event.target.postId.value);
  const postId = event.target.postId.value;

  try {
    const response = await fetch('/user/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: postId,
      }),
    });

    if (response.status === 200) {
      window.location.href = '/';
    } else {
      alert('Что-то пошло не так, попробуйте еще раз');
      window.location.href = '/';
    }
  } catch (err) {
    console.log(err);
  }
});

deleteORchange?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const postId = event.target.postId.value;
  const formAction = event.target;

  if (formAction.id === 'delete') {
    try {
      const res = await fetch('/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
        }),
      });

      if (res.status === 200) {
        window.location.href = '/user/profile';
      } else {
        alert('Что-то пошло не так, попробуйте еще раз!');
        window.location.href = '/user/profile';
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (formAction.id === 'update') {
    try {
      const res = await fetch(`/user/update/${postId}`, {
        method: 'GET',
      });
      if (res.status === 200) window.location.href = `/user/update/${postId}`;
    } catch (error) {
      console.log(error.message);
    }
  }
});

editPost?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const postId = event.target.postId.value;
  // console.log(postId);
  const data = new FormData(document.createPostImg);
  // data.set('post_id', postId);

  try {
    const response = await fetch('/user/update', {
      method: 'PUT',
      body: data,
    });

    if (response.status === 200) {
      window.location.href = '/user/profile';
    } else {
      alert('Что-то пошло не так, попробуйте еще раз!');
      window.location.href = '/user/profile';
    }
  } catch (error) {
    console.log(error.message);
  }
});
