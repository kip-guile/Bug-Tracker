
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_bugs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_bugs').insert([
        {user_id: '1', bug_id: '3'},
        {user_id: '2', bug_id: '1'},
        {user_id: '2', bug_id: '2'}
      ]);
    });
};
