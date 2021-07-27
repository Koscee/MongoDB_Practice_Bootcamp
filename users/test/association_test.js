const mongoose = require('mongoose');
const assert = require('assert');
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


  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Learning Mongodb');
        done();
      }).catch(done);
  });
});
