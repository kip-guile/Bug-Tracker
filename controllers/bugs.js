const Projects = require('../database/models/user')
const variables = require('../helpers/variables')

const getBugs = async (req, res) => {
    try {
        const bugs =  await Projects.getBugs()
        bugs.forEach(bug => {
            bug.developer_name = bug.first_name + " " + bug.last_name;
            delete bug.first_name
            delete bug.last_name
        })
        res.status(200).json(bugs)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

module.exports = {
    getBugs
}