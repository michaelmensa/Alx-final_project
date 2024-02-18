const middleware = {
  requireClinicLogin: (req, res, next) => {
    console.log(req.session.clinic);
    if (req.session && req.session.clinic) {
      next();
    } else {
      res.status(401).json({ error: 'Login required' });
    }
  },

  requireEmployeeLogin: (req, res, next) => {
    console.log(req.session.clinic.employee);
    if (!req.session && !req.session.clinic) {
      res.status(401).json({ error: 'Login required' });
    }
    if (req.session.clinic.employee) {
      next();
    }
  },
};

module.exports = middleware;
