const blogService = require('../services/blogService');

const blogController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await blogService.login(email, password);
    res.status(200).json({ token });
  },

  createUser: async (req, res) => {
    const {
      displayName, email, password, image,
    } = req.body;
    const token = await blogService.createUser(
      displayName, email, password, image,
    );
    res.status(201).json({ token });
  },

  getUser: async (req, res) => {
    const users = await blogService.getUser();
    res.status(200).json(users);
  },
};

module.exports = blogController;
