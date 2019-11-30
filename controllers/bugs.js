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

const getUnassignedBugs = async (req, res) => {
    try {
        const bugs =  await Projects.getAllBugs()
        res.status(200).json(bugs)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const getUnassignedBugsById = async (req, res) => {
    try {
        const bugs =  await Projects.getAllBugsById(req.params.id)
        res.status(200).json(bugs)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const getBugByDevId = async (req, res) => {
    try {
        let bug = await Projects.getBugByDevId(req.body.id)
        bug.forEach(bug => {
            bug.developer_name = bug.first_name + " " + bug.last_name;
            delete bug.first_name
            delete bug.last_name
        })
        res.status(200).json(bug)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const getBugById = async (req, res) => {
    try {
        let bug = await Projects.getBugById(req.params.id)
        bug.forEach(bug => {
            bug.developer_name = bug.first_name + " " + bug.last_name;
            delete bug.first_name
            delete bug.last_name
        })
        res.status(200).json(bug)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const addBug = async (req, res) => {
    Projects.addBug(req.body)
        .then(bug => {
            res.status(201).json({message: variables.newEntry, bug})
        })
        .catch(error => {
            res.status(500).json({message: variables.errorMessage, error: error.message})
        })
}

module.exports = {
    getBugs,
    getUnassignedBugs,
    getUnassignedBugsById,
    getBugByDevId,
    getBugById,
    addBug
}