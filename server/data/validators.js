const { check, oneOf, validationResult } = require('express-validator');


const NTahitiRegex = /^[T][a-zA-Z0-9][0-9][0-9][0-9][0-9]$/g;

// Each field has one validator
const validators = {
  NTahiti : [
    // check('NTahiti').isLength({min : 6 , max :  6}),
    check('NTahiti').custom((value, { req }) => {
      if (value.match(NTahitiRegex)) 
        return true;
      else 
        throw new Error('Rejected NTahiti format');
    }) 
  ],
  email :  [check('email').isEmail(), check('email').isLength({min : 3})],
  service : check('service').exists(),
  text : check('text').isLength({ max : 1000 }),
}

module.exports = { validators : validators, NTahitiRegex : NTahitiRegex};