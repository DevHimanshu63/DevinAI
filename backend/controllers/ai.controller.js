import * as ai from '../services/ai.service.js';


export const getResult = async (req, res) => {
    const { prompt } = req.query;
    if (!prompt) return res.status(400).json({ msg: 'Please provide a prompt' });
    try {
      const result = await ai.generateResult(prompt);
      res.json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
