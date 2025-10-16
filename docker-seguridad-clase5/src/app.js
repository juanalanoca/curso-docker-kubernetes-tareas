// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('¡Hola desde mi app Node.js!');
});

app.get('/health', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('OK - Healthy');
  } else {
    res.status(500).send('ERROR - DB Connection Lost');
  }
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});