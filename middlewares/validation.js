const Users = require('../database/models/user')
const variables = require('../helpers/variables')


const validateBody = (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
        next();
    } else {
        res.status(400).json({ message: variables.noBodyData });
    }
}

function validateBugById(req, res, next) {
 Users.getAllBugsById(req.params.id)
 .then(post => {
     if (post.length !== 0) {
         next()
     } else {
         res.status(400).json({message: "invalid bug ID"})
     }
 })
 .catch(error => {
    res.status(500).json({message: 'Something terrible happend while checking bug id: ' + error.message,})
})
}

module.exports = {
    validateBody,
    validateBugById
}