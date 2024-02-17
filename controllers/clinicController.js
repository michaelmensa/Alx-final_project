import dbClient from '../config/db';

const clinicController = {
  postNew: async (req, res) => {
    const name = req.body ? req.body.name : null;
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    if (!name) {
      res.status(400).json({ error: 'Clinic Name is missing' });
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Clinic Email is missing' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Clinic Password is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingClinic = await dbClient.findClinic(email);
      if (!existingClinic) {
        await dbClient.createClinic(name, email, password);
        const newClinic = await dbClient.findClinic(email);
        console.log(newClinic._id.toString());
        res.status(201).json({ id: newClinic._id.toString(), email: newClinic.email });
      } else {
        res.status(400).json({ error: 'Clinic Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};

module.exports = clinicController;
