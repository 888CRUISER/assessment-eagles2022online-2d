const React = require('react');
const Layout = require('../Layout');

module.exports = function AuthReg() {
  return (
    <Layout>
      <div className="reg-form">
        <div className="reg-form-centr">
          <form method="post" action="/auth/reg">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
              <input type="name" className="form-control" id="inputName" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Регистрация</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
