// /api/index.js
import express, { RequestHandler } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Initialize app
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Login route
const loginHandler: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Check if user exists
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check if password matches (no encryption for now)
    if (user.password !== password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate a simple token (will be replaced with proper JWT later)
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Return user data with token
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

app.post('/api/login', loginHandler);

// Welcome route
app.get('/', (_, res) => {
  res.json({ message: 'Welcome to the Express Backend API' });
});

// Export the Express API
export default app;