const validations = require('../middlewares/validations');
const tokenHelper = require('../helpers/token');
const { User } = require('../database/models');
const { Category } = require('../database/models');
const { BlogPost } = require('../database/models');
const { PostCategory } = require('../database/models');

const blogService = {
  login: async (email, password) => {
    await validations.checkBodyLogin({ email, password });
    const userId = await validations.validData(email, password);
    const token = tokenHelper.createToken({ id: userId });
    return token;
  },

  createUser: async (displayName, email, password, image) => {
    await validations.checkBodyCreateUser({
      displayName, email, password,
    });

    await validations.checkIfExistsEmail(email);
    const user = await User.create(
      { displayName, email, password, image },
    );

    const { id } = user.dataValues;
    const token = tokenHelper.createToken({ id });
    return token;
  },

  getUsers: async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  getUserById: async (id) => {
    await validations.checkIfExistsUserId(id);
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  },

  createCategory: async (name) => {
    await validations.checkBodyCreateCategory({ name });

    const category = await Category.create({ name });

    return category;
  },

  getCategories: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  getPosts: async () => {
    const posts = await BlogPost.findAll({
      include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: {
            model: PostCategory,
            as: 'posts',
            attributes: { exclude: ['postId', 'categoryId'] },
          },
        }],
    });
    return posts;
  },

  getPostById: async (id) => {
    await validations.checkIfExistsPostId(id);
    const post = await BlogPost.findByPk(id, {
      include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: {
            model: PostCategory,
            as: 'posts',
            attributes: { exclude: ['postId', 'categoryId'] },
          },
        }],
    });
    return post;
  },
};

module.exports = blogService;
