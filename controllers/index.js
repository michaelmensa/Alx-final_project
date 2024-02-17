const staticPage = {
  getHome: (req, res) => {
    res.status(200).json({ status: 'Home Page' });
  },

  getAbout: (req, res) => {
    res.status(200).json({ status: 'About Us Page' });
  },

  getContact: (req, res) => {
    res.status(200).json({ status: 'Contact Us Page' });
  },
};

module.exports = staticPage;
