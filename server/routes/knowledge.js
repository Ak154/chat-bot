const express = require('express');
const router = express.Router();
const { KnowledgeReq, konwledgeData } = require("../controllers/knowledge")

// Add to knowledge base
router.post('/', KnowledgeReq);

// Get all knowledge items
router.get('/', konwledgeData);

router.post("/", )

module.exports = router;