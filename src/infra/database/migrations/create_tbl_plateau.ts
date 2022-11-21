import { Knex } from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('plateau', table => {
    table.uuid('uuid').unique().notNullable()
    table.integer('xMaxCoordinate').notNullable
    table.integer('yMaxCoordinate').notNullable
    table.integer('xMinCoordinate').notNullable
    table.integer('yMinCoordinate').notNullable
  })
}


export async function down(knex: Knex) {
  return knex.schema.dropTable('plateau')
}