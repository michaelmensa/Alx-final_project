const staticPage = {
  getHome: (req, res) => {
    res.render('index');
  },

  getAbout: (req, res) => {
    res.status(200).json({ status: 'About Us Page' });
  },

  getContact: (req, res) => {
    res.status(200).json({ status: 'Contact Us Page' });
  },
};

module.exports = staticPage;
