const userValidation = require('../middlewares/validations');
const tokenHelper = require('../helpers/token');
const { User } = require('../database/models');

const blogService = {
  login: async (email, password) => {
    await userValidation.checkBodyLogin({ email, password });
    const userId = await userValidation.validData(email, password);
    const token = tokenHelper.createToken({ id: userId });
    return token;
  },

  createUser: async (displayName, email, password, image) => {
    await userValidation.checkBodyCreateUser({
      displayName, email, password,
    });

    await userValidation.checkIfExistsEmail(email);
    const user = await User.create(
      { displayName, email, password, image },
    );

    const { id } = user.dataValues;
    const token = tokenHelper.createToken({ id });
    return token;
  },

  getUser: async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  getUserById: async (id) => {
    await userValidation.checkIfExistsId(id);
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  },
};

module.exports = blogService;
