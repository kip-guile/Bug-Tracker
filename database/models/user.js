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
  getBugs,
  getBugByDevId,
  getBugById,
  getAllBugsById,
  getAllBugs,
  addBug,
  updateBug,
  deleteBug,
  assignBug,
  changeBugStatus
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
    .orderBy('p.id', 'desc')
}

function getProjectBy(filter) {
  return db('projects')
    .where(filter)
}

function getBugByDevId(id) {
  return db('users_bugs as ub')
  .join('bugs as b', 'ub.bug_id', 'b.id')
  .join('users as u', 'ub.user_id', 'u.id')
  .join('projects as p', 'b.project_id', 'p.id')
  .select('b.id', 'b.title as bug_title', 'b.description', 'severity', 'date_reported', 'status', 'p.title as project_title', 'first_name', 'last_name')
  .where('ub.user_id', id)
}

function getBugById(id) {
  return db('users_bugs as ub')
  .join('bugs as b', 'ub.bug_id', 'b.id')
  .join('users as u', 'ub.user_id', 'u.id')
  .join('projects as p', 'b.project_id', 'p.id')
  .select('b.id', 'b.title as bug_title', 'b.description', 'severity', 'date_reported', 'status', 'p.title as project_title', 'first_name', 'last_name')
  .where('b.id', id)
}

function getAssignedBug(id){
  return db('users_bugs as ub')
  .join('bugs as b', 'ub.bug_id', 'b.id')
  .join('users as u', 'ub.user_id', 'u.id')
  .join('projects as p', 'b.project_id', 'p.id')
  .select('b.id', 'b.title as bug_title', 'b.description', 'severity', 'date_reported', 'status', 'p.title as project_title', 'first_name', 'last_name')
  .where('ub.id', id)
}

function getAllBugsById(id) {
  return db('bugs')
  .where({ id })
  .first();
}

function getAllBugs() {
  return db('bugs as b')
  .join('projects as p', 'b.project_id', 'p.id')
  .select('b.id', 'b.title as bug_title', 'b.description', 'severity', 'date_reported', 'status', 'p.title as project_title')
}

function addProject(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => {
      return getProjectBy({id}).first()
    })
}

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = mm + '-' + dd + '-' + yyyy;
  return today
}

function addBug(bug) {
  return db('bugs')
    .insert({bug_title: bug.bug_title, description: bug.description, severity: bug.severity,
              status: bug.status, project_title: bug.project_title, date_reported: getDate()}, 'id')
    .then(([id]) => {
      return getAllBugsById(id).first()
    })
}

function assignBug(ids) {
  return db('users_bugs')
    .insert(ids, 'id')
    .then(([id]) => {
      return getAssignedBug(id).first()
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

function updateBug (id, update) {
  return db('bugs')
    .where({id})
    .update(update, 'id')
    .then(() => {
      return getAllBugsById(id).first()
    })
}

function changeBugStatus(id, body) {
  return db('bugs')
    .where({id})
    .update({status: body.status}, 'id')
    .then(() => {
      return getAllBugsById(id).first()
    })
}

function deleteBug (id) {
  return db('bugs')
    .where({id})
    .delete()
}

function deleteproject(id) {
  return db('projects')
    .where({id})
    .delete()
}