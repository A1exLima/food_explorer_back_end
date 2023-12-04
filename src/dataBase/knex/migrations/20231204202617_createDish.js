exports.up = knex => knex.schema.createTable("dish", table =>{
  
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("name");
  table.text("category");
  table.integer("price")
  table.text("description");
  table.text("image").defaultTo(null);
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
  table.timestamp("updated_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = (knex) => knex.schema.dropTable("dish")
