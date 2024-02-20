const middleware = {
  requireClinicLogin: (req, res, next) => {
    if (req.session && req.session.clinic) {
      console.log(req.session.clinic);
      next();
    } else {
      res.status(401).json({ error: 'Login required' });
    }
  },

  requireEmployeeLogin: (req, res, next) => {
    if (req.session && req.session.clinic && req.session.clinic.employee) {
      console.log(req.session.clinic.employee);
      next();
    } else {
      res.status(401).json({ error: 'Login required' });
    }
  },
};

module.exports = middleware;
