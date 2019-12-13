const router = require('express').Router();
const Column = require('../models/column.model');

router.route('/').get((req, res) => {
  Column.find()
    .then((columns) => res.json(columns))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const color = req.body.color;
  const priority = Number(req.body.priority);

  const newColumn = new Column({
    title,
    color,
    priority,
  });

  newColumn.save()
    .then(() => res.json('Column added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  Column.findById(req.params.id)
    .then((column) => res.json(column))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  Column.findByIdAndDelete(req.params.id)
    .then(() => res.json('Column deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
  Column.findById(req.params.id)
    .then((column) => {
      column.title = req.body.title;
      column.color = req.body.color;
      column.priority = Number(req.body.priority);

      column.save()
        .then(() => res.json('Column updated!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// TODO task CRUD
// TODO comment CRUD

module.exports = router;
