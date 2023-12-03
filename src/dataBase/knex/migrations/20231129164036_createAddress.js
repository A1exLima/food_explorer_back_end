exports.up = knex => knex.schema.createTable("address", table =>{
  
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("street");
  table.text("number");
  table.text("cep");
  table.text("complement");
  table.text("district");
  table.text("city");
  table.specificType("country", "TINYTEXT");
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
  table.timestamp("updated_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = (knex) => knex.schema.dropTable("address")
