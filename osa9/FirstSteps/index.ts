import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi?', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    res.send(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises: exercises, target } = req.body;

    if (exercises === undefined || target === undefined) {
        res
            .status(401)
            .json({
                error: 'parameters missing'
            });
    } else if (isNaN(Number(target)) || !Array.isArray(exercises)) {
        res
            .status(401)
            .json({
                error: 'malformatted parameters'
            });
    } else {
        res.json(exerciseCalculator(exercises, target));
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});