
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'Harry', last_name: 'Dresden', email: 'harry@dresden.com', password: '123456', position: 'Developer'},
        {first_name: 'Kip', last_name: 'Guile', email: 'kip@guile.com', password: '123456', position: 'Developer'},
        {first_name: 'Ron', last_name: 'Weasley', email: 'ron@weasley.com', password: '123456', position: 'Manager'}
      ]);
    });
};
