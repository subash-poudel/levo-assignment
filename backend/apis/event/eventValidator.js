const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  participants: Joi.string().allow(""), // Allow an empty string
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  cron: Joi.string(),
});

function createEventValidator(req, res, next) {
  return validate(req.body, createEventSchema)
    .then(() => next())
    .catch((err) => {
      console.log(' in schema catch block');
      next(err)
    });
}

function validate(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

module.exports = { createEventValidator };
