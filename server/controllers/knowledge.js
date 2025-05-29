const express = require("express");
const Knowledge = require("../models/Knowledge");

exports.KnowledgeReq = async (req, res) => {
  try {
    const { question, answer, tags } = req.body;

    const newKnowledge = new Knowledge({
      question,
      answer,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });

    await newKnowledge.save();
    res.json(newKnowledge);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.konwledgeData = async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({ createdAt: -1 });
    res.json(knowledge);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
