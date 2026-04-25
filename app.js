const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
