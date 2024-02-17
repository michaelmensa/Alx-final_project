const staticPage = {
    getHome: (req, res) => {
        console.log(`${req.method}: ${req.url}`);
        res.status(200).json({ status: 'Home Page' })
    },

    getAbout: (req, res) => {
        console.log(`${req.method}: ${req.url}`);
        res.status(200).json({ status: 'About Us Page' })
    },

    getContact: (req, res) => {
        console.log(`${req.method}: ${req.url}`);
        res.status(200).json({ status: 'Contact Us Page' })
    },
};

module.exports = staticPage;