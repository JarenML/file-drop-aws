const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/files');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});