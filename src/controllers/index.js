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
  },

  getSingleBlog: (req, res) => {
    res.render('single');
  },
};

module.exports = staticPage;
