const Message = require('../models/Message');
const Knowledge = require('../models/Knowledge');

exports.processMessage = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Save user message
    const userMessage = new Message({ text, isBot: false });
    await userMessage.save();
    
    // Process message - check knowledge base
    const response = await generateBotResponse(text);
    
    // Save bot response
    const botMessage = new Message({ text: response, isBot: true });
    await botMessage.save();
    
    res.json({ text: response });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

async function generateBotResponse(userInput) {
  // Simple keyword matching - you can enhance this with NLP later
  const knowledge = await Knowledge.findOne({
    $or: [
      { question: { $regex: userInput, $options: 'i' } },
      { tags: { $in: userInput.toLowerCase().split(' ') } }
    ]
  });
  
  if (knowledge) {
    return knowledge.answer;
  }
  
  return "I'm not sure how to respond to that. Can you ask me something else?";
}