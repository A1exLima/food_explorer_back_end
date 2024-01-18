exports.up = knex => knex.schema.createTable("orderItems", table =>{
  table.increments("id");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE")
  table.integer("user_id")
  table.integer("dish_id")
  table.integer("count")
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = (knex) => knex.schema.dropTable("orderItems")
