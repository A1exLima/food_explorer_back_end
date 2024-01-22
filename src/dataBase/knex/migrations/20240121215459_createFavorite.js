exports.up = knex => knex.schema.createTable("favoriteDishes", table =>{
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.integer("dish_id")
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = (knex) => knex.schema.dropTable("favoriteDishes")
