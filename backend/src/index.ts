import express from 'express'
import loginRouter from './controllers/login.js';
import authMiddleware from './middlewares/auth.js'
import User from './models/user.js';
import { dbSync } from './services/database.js';
import BookOneRouter from './controllers/BookOneController.js'
import cors from 'cors';
import chatbotRouter from './controllers/chatbot.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/chatbot', authMiddleware, chatbotRouter)
app.use('/bookones', authMiddleware, BookOneRouter);

app.get('/', authMiddleware, async (_, res) => {
  res.status(200).send('Success');
})

app.get('/me', authMiddleware, async (req, res) => {
  const user: User | null = await User.findOne({
    where: {
      id: req.user?.id
    }
  });
  console.log(user)
  res.json(user);
})



const PORT = process.env.port || 8080

dbSync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync the database:', error);
  process.exit(1);
});



