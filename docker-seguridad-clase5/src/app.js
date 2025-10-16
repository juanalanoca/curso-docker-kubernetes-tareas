const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://mongodb:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const ItemSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('Item', ItemSchema);

app.get('/', (req, res) => {
  res.send('¡Hola desde mi aplicación Dockerizada!');
});

app.get('/health', (req, res) => {
  // Verificar la conexión a la base de datos como parte del health check
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('OK - Healthy');
  } else {
    res.status(500).send('Not Healthy - DB Disconnected');
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error al obtener los items');
  }
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});