import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('rover', table => {
    table.uuid('uuid').unique().notNullable()
    table.uuid('plateauUuid').notNullable()
    table.string('direction').notNullable()
    table.integer('xCoordinate').notNullable
    table.integer('yCoordinate').notNullable
  })
}


export async function down(knex: Knex) {
  return knex.schema.dropTable('rover')
}