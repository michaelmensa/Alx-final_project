import dbClient from '../config/db';

const empController = {
  postNew: async (req, res) => {
    const name = req.body ? req.body.name : null;
    const type = req.body ? req.body.type : null;
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    if (!name) {
      res.status(400).json({ error: 'Employee Name is missing' });
      return;
    }
    if (!email) {
      res.status(400).json({ error: 'Employee Email is missing' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Employee Password is missing' });
      return;
    }
    if (!type) {
      res.status(400).json({ error: 'Employee type is missing' });
      return;
    }

    try {
      // check if clinic exists
      const existingEmp = await dbClient.findEmp(email);
      if (!existingEmp) {
        await dbClient.createEmp(name, type, email, password);
        const newEmp = await dbClient.findEmp(email);
        console.log('New employee created:', newEmp._id.toString());
        res.status(201).json({ id: newEmp._id.toString(), email: newEmp.email });
      } else {
        res.status(400).json({ error: 'Employee Already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};

module.exports = empController;
