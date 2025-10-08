const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint 1: Saludar
app.get('/', (req, res) => {
    res.send('¡Hola desde mi API Dockerizada!');
});

// Endpoint 2: Obtener datos
app.get('/data', (req, res) => {
    res.json({ message: "Esto es un JSON de prueba", version: "1.0" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
