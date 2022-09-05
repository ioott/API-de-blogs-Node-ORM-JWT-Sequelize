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

  getUsers: async (req, res) => {
    const users = await blogService.getUsers();
    res.status(200).json(users);
  },

  getUserById: async (req, res) => {
    const user = await blogService.getUserById(req.params.id);
    res.status(200).json(user);
  },

  createCategory: async (req, res) => {
    const { name } = req.body;
    const newCategory = await blogService.createCategory(name);
    res.status(201).json(newCategory);
  },

  getCategories: async (req, res) => {
    const categories = await blogService.getCategories();
    res.status(200).json(categories);
  },

  getPosts: async (req, res) => {
    const posts = await blogService.getPosts();
    res.status(200).json(posts);
  },

  getPostById: async (req, res) => {
    const post = await blogService.getPostById(req.params.id);
    res.status(200).json(post);
  },
};

module.exports = blogController;
