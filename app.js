const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());

app.get(['/', '/get'], (req, res) => {
	res.json({
		message: 'API is running',
		routes: [
			'GET /users',
			'GET /users/:id',
			'POST /users',
			'DELETE /users/:id',
			'GET /posts',
			'GET /posts/:id',
			'POST /posts',
			'PATCH /posts/:id/publish',
		],
	});
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use((req, res) => {
	res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(3000, () => console.log('Server running on port 3000'));
