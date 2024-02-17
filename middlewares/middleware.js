const middleware = {
  requireLogin: (req, res, next) => {
    console.log(req.session.user);
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ error: 'Login required' });
    }
  },
};

module.exports = middleware;
