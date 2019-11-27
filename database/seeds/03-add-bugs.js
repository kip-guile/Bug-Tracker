
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('bugs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('bugs').insert([
        {title: 'scary bug', description: 'does scary stuff', severity: 'High', date_reported: '1-09-1234', status: 'New', project_id: '1'},
        {title: 'fat bug', description: 'makes everything fat', severity: 'Medium', date_reported: '2-12-1987', status: 'Assigned', project_id: '2'},
        {title: 'round bug', description: 'robo roboes everything', severity: 'Low', date_reported: '24-03-1993', status: 'Fixed', project_id: '3'}
      ]);
    });
};
