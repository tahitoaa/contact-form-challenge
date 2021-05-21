const { check, oneOf, validationResult } = require('express-validator');


const NTahitiRegex = /^[T][a-zA-Z0-9][0-9][0-9][0-9][0-9]$/g;

// Each field has one validator
const validators = {
  NTahiti : [
    // check('NTahiti').isLength({min : 6 , max :  6}),
    check('NTahiti').custom((value, { req }) => {
      if (value.match(NTahitiRegex)) 
        return true;
      else {
        console.log("Rejected NTahiti format");
        throw new Error('Password confirmation does not match password');
      }

      // Indicates the success of this synchronous custom validator
      return false;
    }) 
  ],
  email :  [check('email').isEmail(), check('email').isLength({min : 3})],
  service : check('service').exists(),
  text : check('text').isLength({ max : 1000 }),
  attachment : check('attachment').exists()
}

module.exports = { validators : validators, NTahitiRegex : NTahitiRegex};