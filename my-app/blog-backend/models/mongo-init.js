db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('users');
db.createCollection('blogs');

// Insert sample users
const user1Id = ObjectId();
const user2Id = ObjectId();

// Example bcrypt hashes for password "password123" and "secret456"
db.users.insert({
  _id: user1Id,
  username: 'alice',
  name: 'Alice Example',
  passwordHash: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZag0u6h7dQ6xQ6lQ6lQ6lQ6lQ6lQ6', // replace with a real hash
  blogs: []
});
db.users.insert({
  _id: user2Id,
  username: 'bob',
  name: 'Bob Example',
  passwordHash: '$2b$10$7s8d9f8s7d8f7s8d7f8s7d8f7s8d7f8s7d8f7s8d7f8s7d8f7s8d7', // replace with a real hash
  blogs: []
});

// Insert sample blogs, referencing users
const blog1Id = ObjectId();
const blog2Id = ObjectId();
db.blogs.insert({
  _id: blog1Id,
  title: 'First Blog',
  author: 'Alice Example',
  url: 'http://example.com/first',
  likes: 5,
  user: user1Id,
  comments: ['Great post!', 'Thanks for sharing']
});
db.blogs.insert({
  _id: blog2Id,
  title: 'Second Blog',
  author: 'Bob Example',
  url: 'http://example.com/second',
  likes: 2,
  user: user2Id,
  comments: []
});

// Update users to reference their blogs
db.users.update({ _id: user1Id }, { $push: { blogs: blog1Id } });
db.users.update({ _id: user2Id }, { $push: { blogs: blog2Id } });