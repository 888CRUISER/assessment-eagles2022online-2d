const React = require('react');
const Layout = require('../Layout');

module.exports = function Profile({ username, post }) {
  return (
    <Layout username={username}>
      <div className="mb-3 post-upload">
        <form action="/user/upload" method="post" encType="multipart/form-data" name="createPostImg">
          <h3>Новый щебет</h3>
          <textarea className="form-control" id="exampleFormControlTextarea1" name="body" rows="3" />
          <input id="file-upload" name="avatar" type="file" className="sr-only" />
          <input className="btn btn-primary" type="submit" value="Создать" />
        </form>
      </div>

      <div className="all-posts">
        <h3>Ваши щебеты</h3>
        {post?.map((post) => (
          <div className="post">
            <p>
              {post['User.name']}
              {' '}
              щебечет...
            </p>
            <p>{post.body}</p>
            <div className="profile-photo"><img src={post.photo} alt="" /></div>
            <form action="/user/delete" method="delete" id="delete">
              <button type="submit" className="btn btn-primary">Удалить</button>
              <input type="hidden" name="postId" value={post.id} />
            </form>
            <form action="/user/change" method="post" id="update">
              <button type="submit" className="btn btn-primary">Редактировать</button>
              <input type="hidden" name="postId" value={post.id} />
            </form>
          </div>
        ))}
      </div>
    </Layout>
  );
};
