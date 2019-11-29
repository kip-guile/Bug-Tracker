// const jwt = require('jsonwebtoken')
const Projects = require('../database/models/user')
const variables = require('../helpers/variables')

const getProjects = async (req, res) => {
    try {
        const projects = await Projects.getProject()
        projects.forEach(project => {
            project.managerName = project.first_name + " " + project.last_name;
            delete project.first_name
            delete project.last_name
        })
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const addProjects = async (req, res) => {
    try {
        const project = await Projects.addProject({ ...req.body, user_id: req.decodedToken.subject})
        res.status(201).json({message: variables.newEntry, project})
    }
    catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id
        const {user_id} = await Projects.getProjectBy({id}).first()
        if (user_id === req.decodedToken.subject) {
            const update = await Projects.updateProject(req.params.id, req.body)
            res.status(200).json({message: variables.updatedEntry, update})
        } else {
            res.status(401).json({message: variables.noAccess})
        }
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id
        const {user_id} = await Projects.getProjectBy({id}).first()
        if (user_id === req.decodedToken.subject) {
            await Projects.deleteproject(req.params.id)
            res.status(200).json({message: variables.entryRemoved('project')})
        } else {
            res.status(401).json({message: variables.noAccess})
        }
    } catch (error) {
        res.status(500).json({message: variables.errorMessage, error: error.message})
    }
}

module.exports = {
    deleteProject,
    updateProject,
    addProjects,
    getProjects
}