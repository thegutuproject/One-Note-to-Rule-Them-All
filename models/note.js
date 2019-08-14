const { Model, mixin } = require('objection');
const { BaseModel } = require('./baseModel');

// Plugins
const { DBErrors } = require('objection-db-errors');
const guid = require('objection-guid')();
const unique = require('objection-unique')({
  fields: ['id'],
  identifiers: ['id']
});

class Note extends mixin(BaseModel, [
  DBErrors,
  guid,
  unique
]) {
  static get tableName() {
    return 'notes';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      }
    }
  }
}

module.exports = Note;
