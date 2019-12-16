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

router.route('/:id/addtask').post((req, res) => {
  Column.findById(req.params.id).exec((err, column) => {
    const { tasks } = column;
    const { name } = req.body;
    const { desc } = req.body;
    const { status } = req.body;
    const priority = (Array.isArray(tasks) && tasks.length)
      ? tasks.reduce((max, o) => (o.priority > max ? o.priority : max), tasks[0].priority) + 1
      : 0;

    const task = {
      name,
      desc,
      status,
      priority,
      comments: [],
    };
    Column.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { tasks: task } },
      (serr, result) => {
        if (serr) {
          res.send(serr);
        } else {
          res.send(result);
        }
      },
    );
  });
});

router.route('/:id/edittask').put((req, res) => {
  const task = {
    _id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    status: req.body.status,
    priority: req.body.priority,
    comments: req.body.comments,
  };
  Column.findOneAndUpdate({ _id: req.params.id, 'tasks._id': req.body.id },
    {
      $set: {
        'tasks.$': task,
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

router.route('/:id/toggletask/:task_id').patch((req, res) => {
  const { status } = req.body;
  console.log(req.params.id, req.params.task_id, status);
  Column.findOneAndUpdate({ _id: req.params.id, 'tasks._id': req.params.task_id },
    {
      $set: {
        'tasks.$.status': status,
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

router.route('/:id/deletetask/:task_id').delete((req, res) => {
  Column.findOneAndUpdate({ _id: req.params.id },
    {
      $pull: {
        tasks: { _id: req.params.task_id },
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});


// TODO comment CRUD

module.exports = router;
