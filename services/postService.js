const prisma = require('./prisma');

async function getPublishedPostsWithAuthor() {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function getPostById(id) {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
}

async function createPost({ title, content, authorId }) {
  return prisma.post.create({
    data: { title, content, authorId, published: false },
  });
}

async function publishPostById(id) {
  const existingPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    return null;
  }

  return prisma.post.update({
    where: { id },
    data: { published: true },
  });
}

module.exports = {
  getPublishedPostsWithAuthor,
  getPostById,
  createPost,
  publishPostById,
};
