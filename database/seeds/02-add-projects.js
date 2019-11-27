
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {title: 'Split the bill', frontend: 'React', backend: 'Node', client: 'Nicodemus', description: 'split bill between users', user_id: '3'},
        {title: 'Ill serve soup', frontend: 'Vue', backend: 'Java', client: 'Andross', description: 'serve soup', user_id: '3'},
        {title: 'Expat Journal', frontend: 'Angular', backend: 'Python', client: 'Snape', description: 'take pictures', user_id: '3'}
      ]);
    });
};
