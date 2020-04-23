
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        { name: 'DadJoke1', username: 'DadJokes1', password: 'dadjoke1'},
        { name: 'DadJoke2', username: 'DadJokes2', password: 'dadjoke2'},
        { name: 'DadJoke3', username: 'DadJokes3', password: 'dadjoke3'},
      ]);
    });
};
