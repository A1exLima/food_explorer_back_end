exports.up = knex => knex.schema.createTable("users", table =>{
  table.enum("role", ["admin","customer"], {useNative: true, enumName: "roles"}).notNullable().default("customer")
  table.increments("id");
  table.text("name");
  table.text("email");
  table.text("password");
  table.text("avatar").defaultTo(null);
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
  table.timestamp("updated_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = knex => knex.schema.dropTable("users")
