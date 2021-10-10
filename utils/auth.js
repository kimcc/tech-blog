// This is a middleware function to authguard routes, meaning that only authenticated users can access them
// Checks if there is a user session (i.e. the user is logged in), and if not, will take them back to the login page
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next(); // next() can be used to chain another function, or can be the final function that will render the template. If the user is not redirected, they will continue on to the next function. Otherwise, they will be redirected and we won't need the other functions.
  }
};

module.exports = withAuth;