import express from "express";
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoute.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (if needed for frontend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/forms', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Form API is running with Prisma' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database connected via Prisma');
});
