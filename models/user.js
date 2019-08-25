const { Model, mixin } = require('objection');
const { BaseModel } = require('./baseModel');

// Plugins
const { DBErrors } = require('objection-db-errors');
const Password = require('objection-password') ();
const guid = require('objection-guid')();
const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id']
});

class User extends mixin(BaseModel, [
  DBErrors,
  guid,
  Password,
  unique
]) {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      }
    }
  }

  static relationMappings = {
    notes: {
      relation: Model.HasManyRelation,
      modelClass: 'Note',
      join: {
        from: 'users.id',
        to: 'notes.user_id'
      }
    }
  }
}

module.exports = User;
