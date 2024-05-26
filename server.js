import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', clienteRoutes);
app.use(express.json());
app.use('/api', vendaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
