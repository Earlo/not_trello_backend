const router = require('express').Router();
const Column = require('../models/column.model');

router.route('/').get((req, res) => {
  Column.find()
    .then((columns) => res.json(columns))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { title } = req.body;
  const { color } = req.body;
  let priority = 0;
  Column
    .findOne({})
    .sort('-priority')
    .exec((err, member) => {
      if (err) {
        priority = 0;
      }
      if (member) {
        priority = member.priority + 1;
      }
      const newColumn = new Column({
        title,
        color,
        priority,
      });
      newColumn.save()
        .then(() => res.json('Column added!'))
        .catch((serr) => res.status(400).json(`Error: ${serr}`));
    });
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

router.route('/update/:id').put((req, res) => {
  console.log(req.params.id);
  Column.findByIdAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, color: req.body.color, priority: req.body.priority },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    },
  );
});

// TODO task CRUD
// TODO comment CRUD

module.exports = router;
