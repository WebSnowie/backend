import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Load environment variables
dotenv.config();

// Initialize express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define types for your data
interface DataRequest {
  message: string;
  value?: number;
}

// Basic route
app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express Backend API' });
});

// Example route with parameters
app.get('/api/hello/:name', (req: Request, res: Response) => {
  res.json({ message: `Hello, ${req.params.name}!` });
});

// Example POST route with typed request body
app.post('/api/data', (req: Request<{}, {}, DataRequest>, res: Response) => {
  const data: DataRequest = req.body;
  res.json({ 
    message: 'Data received successfully',
    data 
  });
});

// Random quote route
app.get('/api/quote', (_: Request, res: Response) => {
  const quotes = [
    "Life is what happens when you're busy making other plans.",
    "The way to get started is to quit talking and begin doing.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "Whoever is happy will make others happy too."
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// Random fact route
app.get('/api/fact', (_: Request, res: Response) => {
  const facts = [
    "Honey never spoils.",
    "Octopuses have three hearts.",
    "A group of flamingos is called a flamboyance.",
    "The shortest war in history lasted 38 minutes.",
    "A day on Venus is longer than a year on Venus."
  ];
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  res.json({ fact: randomFact });
});

// Random joke route
app.get('/api/joke', (_: Request, res: Response) => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why was the math book sad? It had too many problems.",
    "What do you call a fake noodle? An impasta!"
  ];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: randomJoke });
});

// Error handling middleware
app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});