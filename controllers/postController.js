const postService = require('../services/postService');
const userService = require('../services/userService');

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
}

async function getPosts(req, res) {
  try {
    const posts = await postService.getPublishedPostsWithAuthor();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPostById(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createPost(req, res) {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !authorId) {
      return res.status(400).json({ error: 'title and authorId are required' });
    }

    const parsedAuthorId = Number.parseInt(authorId, 10);
    if (Number.isNaN(parsedAuthorId)) {
      return res.status(400).json({ error: 'authorId must be a valid integer' });
    }

    const author = await userService.findUserById(parsedAuthorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const post = await postService.createPost({
      title,
      content,
      authorId: parsedAuthorId,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function publishPost(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await postService.publishPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post published', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  publishPost,
};
