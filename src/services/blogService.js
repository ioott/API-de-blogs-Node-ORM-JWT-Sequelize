const userValidation = require('../middlewares/validations');
const tokenHelper = require('../helpers/token');

const blogService = {
  login: async (email, password) => {
    await userValidation.checkBody({ email, password });
    const userId = await userValidation.validData(email, password);
    const token = tokenHelper.createToken({ id: userId });
    return token;
  },
};

module.exports = blogService;
