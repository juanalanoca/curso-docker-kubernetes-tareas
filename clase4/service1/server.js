const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './.env' }); // Carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema de Post
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', PostSchema);

// Conexión a Redis
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redisClient.on('connect', () => console.log('Conectado a Redis'));
redisClient.on('error', (err) => console.error('Error de conexión a Redis:', err));

// Claves de caché
const CACHE_KEY_ALL_POSTS = 'all_posts';

// --- Endpoints ---

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Posts API' });
});

// GET /api/posts - Listar posts (con cache)
app.get('/api/posts', async (req, res) => {
  try {
    // Intentar obtener de la caché
    redisClient.get(CACHE_KEY_ALL_POSTS, async (err, data) => {
      if (err) {
        console.error('Error al obtener de Redis:', err);
      }
      if (data) {
        console.log('Cache HIT para todos los posts');
        return res.json({ source: 'cache', data: JSON.parse(data) });
      }

      // Si no está en caché, obtener de la base de datos
      console.log('Cache MISS para todos los posts. Obteniendo de DB...');
      const posts = await Post.find().sort({ createdAt: -1 });
      
      // Guardar en caché con expiración (ej. 60 segundos)
      redisClient.setex(CACHE_KEY_ALL_POSTS, 60, JSON.stringify(posts));
      
      res.json({ source: 'database', data: posts });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/posts/:id - Ver post (con cache)
app.get('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const cacheKey = `post_${postId}`;

  try {
    redisClient.get(cacheKey, async (err, data) => {
      if (err) {
        console.error('Error al obtener de Redis:', err);
      }
      if (data) {
        console.log(`Cache HIT para post ID: ${postId}`);
        return res.json({ source: 'cache', data: JSON.parse(data) });
      }

      console.log(`Cache MISS para post ID: ${postId}. Obteniendo de DB...`);
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post no encontrado' });
      }

      redisClient.setex(cacheKey, 60, JSON.stringify(post));
      res.json({ source: 'database', data: post });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/posts - Crear post (invalida cache)
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });

  try {
    const savedPost = await newPost.save();
    
    // Invalidar caché de todos los posts
    redisClient.del(CACHE_KEY_ALL_POSTS, (err, reply) => {
      if (err) console.error('Error al invalidar caché:', err);
      if (reply) console.log('Caché de todos los posts invalidada.');
    });

    // Invalida la caché de ese post específico si estuviera en caché
    const cacheKey = `post_${savedPost._id}`;
    redisClient.del(cacheKey, (err, reply) => {
        if (err) console.error('Error al invalidar caché de post específico:', err);
        if (reply) console.log(`Caché de post ID: ${savedPost._id} invalidada.`);
    });
    
    res.status(201).json({ message: 'Post creado y caché invalidada', post: savedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Posts API corriendo en el puerto ${PORT}`);
});