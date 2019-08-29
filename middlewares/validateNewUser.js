var Joi = require("joi");
module.exports = function validateUser(userData) {
  const schema = {
    first_name: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .min(3)
      .required()
      .error(errors => {
        return {
          message: "First Name should contain alphabet only."
        };
      }),
    last_name: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .min(3)
      .required()
      .error(errors => {
        return {
          message: "Last Name should contain alphabet only."
        };
      }),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/)
      .min(5)
      .required()
      .error(errors => {
        return {
          message:
            "Password should be minimum 5 characters, at least one letter, one number and one special character."
        };
      })
  };

  return Joi.validate(userData, schema);
};
