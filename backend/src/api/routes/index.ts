import { Router } from 'express';

const indexRouter = Router();

let highestScore: number | null = null;

// POST endpoint to submit the score
indexRouter.post('/submit-score', (req, res) => {
  const { score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).send('Invalid score');
  }

  if (highestScore === null || score < highestScore) {
    highestScore = score;
  }

  return res.status(200).send({ message: 'Score submitted successfully', score, highestScore });
});

// GET endpoint to retrieve the highest score
indexRouter.get('/highest-score', (req, res) => res.status(200).send({ highestScore }));

export { indexRouter };
