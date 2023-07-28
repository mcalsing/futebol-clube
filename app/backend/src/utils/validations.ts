// import Joi from 'joi';
import Joi = require('joi');
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

const CUSTOM_MSG = 'All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': CUSTOM_MSG,
    'string.empty': CUSTOM_MSG,
    // 'string.email': 'Invalid email or password',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': CUSTOM_MSG,
    'string.empty': CUSTOM_MSG,
    // 'string.min': 'Invalid email or password',
  }),
});

export default { loginSchema };
