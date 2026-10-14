import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API endpoint returning hello-world
app.get('/api', (req, res) => {
  res.json({ message: 'hello-world' });
});

// Health check endpoint for Kubernetes / monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node-Express backend listening on http://0.0.0.0:${PORT}`);
});
