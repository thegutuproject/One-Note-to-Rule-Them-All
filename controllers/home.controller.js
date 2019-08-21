exports.homePage = (req, res) => {
  // console.log(req);
  res.render('index');
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.notes = (req, res) => {
  res.render('notes', { title: 'Notes' });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About' });
};