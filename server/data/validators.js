const { check, oneOf, validationResult } = require('express-validator');

// Each field has one validator
const validators = {
  NTahiti : check('NTahiti').isLength({min : 6 , max :  6}),
  email :  [check('email').isEmail(), check('email').isLength({min : 3})],
  service : check('service').exists(),
  text : check('text').isLength({ max : 1000 }),
  attachment : check('attachment').exists()
}

module.exports = validators;