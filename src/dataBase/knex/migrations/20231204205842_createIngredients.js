exports.up = knex => knex.schema.createTable("ingredients", table =>{
  
  table.increments("id");
  table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")
  table.text("name");
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = (knex) => knex.schema.dropTable("ingredients")
