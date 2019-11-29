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
  getProject,
  getBugs
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

// select 
// id, title, description, 
// severity, date_reported, status,
// first_name, last_name, p.title as project_title
// from users_bugs ub
// inner join bugs b
// on ub.bug_id = b.id
// inner join users u
// on ub.user_id = u.id
// inner join projects p
// on b.project_id = p.id

function getBugs() {
  return db('users_bugs as ub')
    .join('bugs as b', 'ub.bug_id', 'b.id')
    .join('users as u', 'ub.user_id', 'u.id')
    .join('projects as p', 'b.project_id', 'p.id')
    .select('b.id', 'b.title as bug_title', 'severity', 'date_reported', 'status', 'p.title as project_title', 'first_name', 'last_name')
}

function getProject() {
  return db('projects as p')
    .join('users as u', 'p.user_id', 'u.id')
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