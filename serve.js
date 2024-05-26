import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});