const prisma = require('./prisma');

async function getActiveUsersWithPosts() {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { posts: true },
  });

  return users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function createUser({ firstName, lastName, email }) {
  return prisma.user.create({
    data: { firstName, lastName, email, isActive: true },
  });
}

async function deactivateUserById(id) {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
}

async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

module.exports = {
  getActiveUsersWithPosts,
  getUserById,
  findUserByEmail,
  createUser,
  deactivateUserById,
  findUserById,
};
