
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
        users.increments()
        users
            .string('first_name')
            .notNullable()
        users
            .string('last_name')
            .notNullable()
        users
            .string('email')
            .notNullable()
            .unique()
        users
            .string('password', 128)
            .notNullable()
        users
            .string('position')
            .notNullable()
    })

    .createTable('projects', function(projects) {
        projects.increments()
        projects
            .string('title')
            .notNullable()
        projects
            .string('frontend')
            .notNullable()
        projects
            .string('backend')
            .notNullable()
        projects
            .string('client')
            .notNullable()
        projects
            .text('description')
            .notNullable()
        projects
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })

    .createTable('bugs', function(bugs) {
        bugs.increments()
        bugs
            .string('title')
            .notNullable()
        bugs
            .string('description')
            .notNullable()
        bugs
            .string('severity')
            .notNullable()
        bugs
            .string('date_reported')
            .notNullable()
        bugs
            .string('status')
            .notNullable()
        bugs
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })

    .createTable('users_bugs', function(users_bugs) {
        users_bugs.increments()
        users_bugs
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        users_bugs
            .integer('bug_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('bugs')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('projects')
    .dropTableIfExists('bugs')
    .dropTableIfExists('users_bugs')
};
