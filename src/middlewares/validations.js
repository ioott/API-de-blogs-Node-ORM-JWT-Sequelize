const Joi = require('joi');
const { User } = require('../database/models');
const { BlogPost } = require('../database/models');

const validations = {
  checkBodyLogin: (obj) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(obj);
    if (error) {
      const err = new Error();
      err.code = 400;
      err.message = 'Some required fields are missing';
      throw err;
    }
    return value;
  },

  checkBodyCreateUser: (obj) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

    });
    const { error, value } = schema.validate(obj);

    if (error) {
      const err = new Error();
      err.code = 400;
      err.message = error.message;
      throw err;
    }
    return value;
  },

  checkBodyCreateCategory: (obj) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(obj);

    if (error) {
      const err = new Error();
      err.code = 400;
      err.message = error.message;
      throw err;
    }
    return value;
  },

  checkIfExistsEmail: async (email) => {
    const exists = await User.findOne({
      where: { email },
      raw: true,
    });

    if (exists) {
      const err = new Error();
      err.code = 409;
      err.message = 'User already registered';
      throw err;
    }
  },

  checkIfExistsUserId: async (id) => {
    const exists = await User.findByPk(id);
    if (!exists) {
      const err = new Error();
      err.code = 404;
      err.message = 'User does not exist';
      throw err;
    }
  },

  checkIfExistsPostId: async (id) => {
    const exists = await BlogPost.findByPk(id);
    if (!exists) {
      const err = new Error();
      err.code = 404;
      err.message = 'Post does not exist';
      throw err;
    }
  },

  validData: async (email, password) => {
    const exists = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!exists || exists.password !== password) {
      const err = new Error();
      err.code = 400;
      err.message = 'Invalid fields';
      throw err;
    }
    return exists.id;
  },

};

module.exports = validations;
