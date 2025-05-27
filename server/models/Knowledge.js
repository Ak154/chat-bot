const mongoose = require('mongoose');

const KnowledgeSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model('Knowledge', KnowledgeSchema);