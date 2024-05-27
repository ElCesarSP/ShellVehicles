// server.js
import express from 'express';
import veiculoRoutes from './routes/veiculoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', veiculoRoutes);

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});