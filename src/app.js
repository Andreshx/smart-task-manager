import express from 'express';
import cors from 'cors';
import "./db/database.js";
import taskRoutes from './routes/taskRoutes.js';




const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);


// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Smart Task Manager API is running" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 

