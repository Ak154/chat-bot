const express = require('express');
const router = express.Router();
const Knowledge = require('../models/Knowledge');

// Add to knowledge base
router.post('/', async (req, res) => {
  try {
    const { question, answer, tags } = req.body;
    
    const newKnowledge = new Knowledge({
      question,
      answer,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    await newKnowledge.save();
    res.json(newKnowledge);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all knowledge items
router.get('/', async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({ createdAt: -1 });
    res.json(knowledge);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;