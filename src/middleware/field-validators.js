const { request, response } = require('express');
const {validationResult} = require('express-validator');

/**
 * @param next executes whenever the validation result is successful to continue with the following check validation 
 */
const validateFields = (req=request, res=response, next) => {

    const errors = validationResult(req);
    // console.log(JSON.stringify(errors, null, 3));

    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped() 
        })
    }
    next();
}

module.exports = {
    validateFields
}

