import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// To add some test data
async function seed() {
  // deletes previous posts and users
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const kyle = await prisma.user.create({
    data: {
      name: "Vipul",
      email: "test1@gmail.com",
      password: "1234",
      dob: new Date(),
    },
  });
  const sally = await prisma.user.create({
    data: {
      name: "Waghmare",
      email: "test2@gmail.com",
      password: "1234",
      dob: new Date(),
    },
  });

  const post1 = await prisma.post.create({
    data: {
      body: "This is first post",
      title: "Post 1",
    },
  });
  const post2 = await prisma.post.create({
    data: {
      body: "This is second post",
      title: "Post 2",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "I am a root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "I am a nested comment",
      userId: sally.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message: "I am another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
}

seed();
