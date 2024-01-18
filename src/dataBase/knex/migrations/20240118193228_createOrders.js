exports.up = knex => knex.schema.createTable("orders", table =>{
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.enum("paymentType", ["creditCard","pix"], {useNative: true, enumName: "typesOfPayments"}).notNullable();
  table.float("payment");
  table.integer("numberInstallments").default(0);
  table.enum("deliveryType", ["economic","free"], {useNative: true, enumName: "typesOfDelivery"}).notNullable();
  table.boolean("orderCompleted").default(false);
  table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
})

exports.down = knex => knex.schema.dropTable("orders")
