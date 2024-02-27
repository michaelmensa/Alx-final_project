const middleware = {
  requireClinicLogin: (req, res, next) => {
    if (req.session && req.session.clinic) {
      console.log(req.session.clinic);
      next();
    } else {
      res.redirect('/login');
    }
  },

  requireEmployeeLogin: (req, res, next) => {
    if (req.session && req.session.clinic && req.session.clinic.employee) {
      console.log(req.session.clinic.employee);
      next();
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = middleware;
