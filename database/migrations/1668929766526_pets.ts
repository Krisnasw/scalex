import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('master_id').unsigned().index()
      table.foreign('master_id').references('masters.id').onDelete('CASCADE')
      table.integer('category_id').unsigned().index()
      table.foreign('category_id').references('categories.id').onDelete('CASCADE')
      table.string('name').index()
      table.dateTime('dob').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
