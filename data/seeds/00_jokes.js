
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        { name: 'DadJoke1'},
        { name: 'DadJoke2'},
        { name: 'DadJoke3'}
      ]);
    });
};
