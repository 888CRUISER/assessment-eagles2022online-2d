const React = require('react');
const Layout = require('../Layout');

module.exports = function Edit({ username, post }) {
  return (
    <Layout username={username}>
      <div>
        <div className="mb-3 edit-post">
          <form action="/user/update" method="PUT" encType="multipart/form-data" name="createPostImg">
            <h3>Измените щебет</h3>
            <textarea className="form-control" id="exampleFormControlTextarea1" name="body" rows="3" />
            <input id="file-upload" name="avatar" type="file" className="sr-only" />
            <input className="btn btn-primary" type="submit" value="Изменить" />
            <input type="hidden" name="postId" value={post.id} />
          </form>
        </div>
      </div>
    </Layout>
  );
};
