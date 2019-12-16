const mongoose = require('mongoose');

const { Schema } = mongoose;

const columnSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  tasks: [{
    name: { type: String, required: true },
    desc: { type: String, default: '' },
    status: { type: Boolean, default: false },
    priority: { type: Number, required: true },
    comments: [{
      text: { type: String, require: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now },
    }],
  }],
  priority: { type: Number, required: true },
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
