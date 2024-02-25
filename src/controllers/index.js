const staticPage = {
  getHome: (req, res) => {
    res.render('index');
  },

  getAbout: (req, res) => {
    res.render('about');
  },

  getContact: (req, res) => {
    res.render('contact');
  },

  getServices: (_req, res) => {
    res.render('services');
  },

  getBlog: (_req, res) => {
    res.render('blog');
  }
};

module.exports = staticPage;
