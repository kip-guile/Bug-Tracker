// const Users = require('../database/models/user')
const variables = require('../helpers/variables')


const validateBody = (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
        next();
    } else {
        res.status(400).json({ message: variables.noBodyData });
    }
}


module.exports = {
    validateBody
}