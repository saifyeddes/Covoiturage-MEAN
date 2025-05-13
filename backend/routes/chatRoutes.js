const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('❌ Erreur OpenAI:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de l’appel à OpenAI' });
  }
});

module.exports = router;
