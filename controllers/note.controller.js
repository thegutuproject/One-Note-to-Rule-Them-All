const { check, validationResult, sanitizeBody } = require('express-validator');
const moment = require('moment');

const User = require('../models/user');

exports.getNotes = async (req, res, next) => {
  if (req.user) {
    const user = await User.query().where({ id: req.user }).first();
    const notes = await user.$relatedQuery('notes');

    res.render('notes', { title: 'Notes', notes });
  }
};

exports.saveNote = async (req, res, next) => {

  let data = {
    user_id: req.params.id,
    title: req.body.title,
    body: req.body.body
  };

  const user = await User.query().first().where({ id: data.user_id });
  const note = await user.$relatedQuery('notes').insert({ title: data.title, body: data.body });

};