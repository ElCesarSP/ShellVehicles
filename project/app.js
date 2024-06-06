const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', veiculoRoutes);
app.use('/api', vendaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});