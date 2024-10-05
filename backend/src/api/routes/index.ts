import { Router } from 'express';

import { HighScoreModel } from '../../models/highest-score';

const indexRouter = Router();

// POST endpoint to submit the score
indexRouter.post('/submit-score', async (req, res) => {
  const { score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).send('Invalid score');
  }

  let highestScoreObj = await HighScoreModel.findOne({
    ip: req.ip,
  });

  if (highestScoreObj === null || score < highestScoreObj.highScore) {
    highestScoreObj = await HighScoreModel.findOneAndUpdate(
      { ip: req.ip },
      { ip: req.ip, highScore: score },
      { upsert: true, new: true },
    );
  }

  return res
    .status(200)
    .send({ message: 'Score submitted successfully', score, highestScore: highestScoreObj!.highScore });
});

// GET highest score based on ip
indexRouter.get('/highest-score', async (req, res) => {
  const highestScoreObj = await HighScoreModel.findOne({
    ip: req.ip,
  });
  return res.status(200).send({ highestScore: highestScoreObj?.highScore || null });
});

export { indexRouter };
