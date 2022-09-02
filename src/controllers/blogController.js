const blogService = require('../services/blogService');

const blogController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await blogService.login(email, password);
    res.status(200).json({ token });
  },
};

module.exports = blogController;
