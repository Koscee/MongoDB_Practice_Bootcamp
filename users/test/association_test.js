const mongoose = require('mongoose');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const User = require('../src/user');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Learning Mongodb', content: 'Mongodb is one of the trending NoSQL database' });
    comment = new Comment({ content: 'Wow! great post' });

    joe.blogPosts.push(blogPost);    // hasMany relationship
    blogPost.comments.push(comment);  // hasMany relationship
    comment.user = joe;        // hasOne relationship

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  // "it.only()" tells mocha to run only that test and ignores others
  it.only('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .then((user) => {
        console.log(user);
        done();
      });
  });
});
