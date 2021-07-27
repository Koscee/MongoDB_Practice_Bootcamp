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
  });

});
