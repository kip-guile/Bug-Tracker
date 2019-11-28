const db = require('../config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  addProject,
  getProjectBy,
  updateProject,
  deleteproject,
  getProject
};

function find() {
  return db('users').select('id', 'first_name', 'last_name', 'email', 'position', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getProject() {
  return db('projects as p')
    .leftJoin('users as u, p.user_id, u.id')
    .select('p.id', 'title', 'frontend', 'backend', 'client', 'description', 'last_name', 'first_name')
}

function getProjectBy(filter) {
  return db('projects')
    .where(filter)
}

function addProject(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => {
      return getProjectBy({id}).first()
    })
}

function updateProject(id, update) {
  return db('projects')
    .where({id})
    .update(update, 'id')
    .then(() => {
      return getProjectBy({id}).first()
    })
}

function deleteproject(id) {
  return db('projects')
    .where({id})
    .delete()
}