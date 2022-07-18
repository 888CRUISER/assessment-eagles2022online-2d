const React = require('react');

module.exports = function Layout({ children, username }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/stylesheets/main.css" />
        <script defer src="/js/application.js" />
        <title>Hello, world!</title>
      </head>

      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/home">Щебетатель</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/home">Главная</a>
                </li>
              </ul>
              {username ? (
                <>
                  <div className="reg">
                    <form className="d-flex log-reg" action="/user/profile" method="get">
                      <button className="btn btn-outline-success" type="submit">
                        Привет,
                        {' '}
                        {username}
                      </button>
                    </form>
                  </div>
                  <div className="log">
                    <form className="d-flex" action="/auth/quit" method="get">
                      <button className="btn btn-outline-success" type="submit">Выход</button>
                    </form>
                  </div>

                </>
              ) : (
                <>
                  <div className="reg">
                    <form className="d-flex log-reg" action="/auth/reg" method="get">
                      <button className="btn btn-outline-success" type="submit">
                        Регистрация
                      </button>
                    </form>
                  </div>
                  <div className="log">
                    <form className="d-flex" action="/auth/log" method="get">
                      <button className="btn btn-outline-success" type="submit">Вход</button>
                    </form>
                  </div>

                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <body>
        {children}
      </body>

      <footer />
    </html>
  );
};
