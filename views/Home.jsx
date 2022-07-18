const React = require('react');
const Layout = require('./Layout');

module.exports = function Home({ username, allPosts }) {
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

      <div className="all-posts-home">
        <h3>Все щебеты</h3>
        {allPosts?.map((post) => (
          <div className="post">
            <form action="/user/like" method="post">
              <div>
                <p>
                  <p>
                    Кол-во лайков:
                    {' '}
                    {post.like}
                  </p>
                  {post['User.name']}
                  {' '}
                  щебечет...
                  <button type="submit" sclassName="btn btn-primary like"><img src="https://pixsector.com/cache/5f5275bf/av83bcb11eee42d2ca6cd.png" alt="" className="img-heart" /></button>
                </p>
              </div>
              <p>{post.body}</p>
              <div className="profile-photo">
                <img src={post.photo} alt="" />
              </div>
              <input type="hidden" name="postId" className="postId" value={post.id} />
            </form>
          </div>
        ))}
      </div>
    </Layout>
  );
};
