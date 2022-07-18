const React = require('react');
const Layout = require('../Layout');

module.exports = function AuthLog() {
  return (
    <Layout>
      <div className="log-form">
        <div className="reg-form-centr">
          <form method="post" action="/auth/log">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="inputPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Вход</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};