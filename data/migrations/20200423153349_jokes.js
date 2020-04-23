
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jokes', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable();
      tbl.string('username', 128).notNullable().unique();
      tbl.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('jokes');
};
