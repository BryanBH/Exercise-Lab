import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 4500;
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/exercise-lab';
import { exerciseRouter } from './routes/exerciseRoutes';
import { authRouter } from './routes/auth';

// starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());
// Have Node serve the files for the built React app
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

// connect to mongoDB database
mongoose
  .connect(dbURL)
  .then(() => {
    if (process.env.DB_URL === dbURL)
      console.log(`connected to server mongoose server`);
    else console.log(`connected to server ${dbURL}`);
  })
  .catch((err) => console.log(err));

/**
 * Route Handling
 */
app.use('/exercises', exerciseRouter);
app.use('/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
});

/**
 * Dev route to clean DB
 * everything below this line will eventually be deleted
 */

import { Exercise } from './models/ExerciseModel';
import { data } from './data';

const addExercises = async () => {
  await Exercise.deleteMany({});

  data.map(async (exercise) => {
    const newExercise = new Exercise({
      ...exercise,
      images: [
        `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`,
        `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[1]}`,
      ],
    });
    console.log(newExercise);
    await newExercise.save();
  });

  const total = await Exercise.countDocuments();

  console.log(`created a total of ${total} new documents`);
};

app.get('/cleanDB', (req: Request, res: Response) => {
  addExercises();
  res.send('done');
});
